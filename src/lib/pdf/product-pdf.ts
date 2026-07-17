import { PDFDocument, StandardFonts, PDFPage, PDFFont, PDFImage, rgb, RGB } from "pdf-lib";
import { AVEN_LOGO_FULL_BASE64 } from "./aven-logo-base64";

interface ProductPdfData {
  productName: string;
  categoryName: string;
  shortDescription?: string | null;
  description?: string | null;
  specifications?: string | null;
  features?: string | null;
  applications?: string | null;
}

// Brand palette (matches the email templates)
const COLORS = {
  primary: rgb(0.059, 0.153, 0.278), // #0F2747
  primaryDark: rgb(0.039, 0.106, 0.2), // #0A1B33
  accent: rgb(0.969, 0.58, 0.114), // #F7941D
  background: rgb(0.973, 0.98, 0.988), // #F8FAFC
  white: rgb(1, 1, 1),
  border: rgb(0.906, 0.918, 0.941), // #E7EAF0
  textDark: rgb(0.063, 0.094, 0.157), // #101828
  textMuted: rgb(0.361, 0.42, 0.51), // #5C6B82
  tableHeaderBg: rgb(0.93, 0.95, 0.98),
  rowAltBg: rgb(0.976, 0.984, 0.992),
  rowLine: rgb(0.88, 0.89, 0.92),
};

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN = 40;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2; // 515
const BOTTOM_MARGIN = 70; // reserved for footer
const HEADER_HEIGHT = 92;
const COMPACT_HEADER_HEIGHT = 46;

export async function generateProductPdf(data: ProductPdfData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Embed the full logo — icon + wordmark + tagline already baked in (base64, safe for Vercel/serverless)
  const logoBytes = Buffer.from(AVEN_LOGO_FULL_BASE64, "base64");
  const logoImage: PDFImage = await pdfDoc.embedPng(logoBytes);
  const logoAspect = logoImage.width / logoImage.height;

  let currentPage: PDFPage;
  let y = 0;

  /* ---------------------------------------------------------
     Header — white background with brand logo
     --------------------------------------------------------- */
  const drawHeader = (page: PDFPage, first: boolean) => {
    const headerHeight = first ? HEADER_HEIGHT : COMPACT_HEADER_HEIGHT;

    // Header background
    page.drawRectangle({
      x: 0,
      y: PAGE_HEIGHT - headerHeight,
      width: PAGE_WIDTH,
      height: headerHeight,
      color: COLORS.white,
    });

    // Accent underline
    page.drawRectangle({
      x: 0,
      y: PAGE_HEIGHT - headerHeight - 3,
      width: PAGE_WIDTH,
      height: 3,
      color: COLORS.accent,
    });

    const logoHeight = first ? 42 : 24;
    const logoWidth = logoHeight * logoAspect;
    const logoY = PAGE_HEIGHT - headerHeight + (headerHeight - logoHeight) / 2;

    page.drawImage(logoImage, {
      x: MARGIN,
      y: logoY,
      width: logoWidth,
      height: logoHeight,
    });

    const labelSize = first ? 9.5 : 9;
    const label = first
      ? `Product Data Sheet  |  ${new Date().toLocaleDateString()}`
      : "Product Data Sheet";
    const labelWidth = font.widthOfTextAtSize(label, labelSize);
    page.drawText(label, {
      x: PAGE_WIDTH - MARGIN - labelWidth,
      y: PAGE_HEIGHT - headerHeight / 2 - labelSize / 2 + 1,
      size: labelSize,
      font,
      color: COLORS.textMuted,
    });

    return PAGE_HEIGHT - headerHeight - 28;
  };

  const addNewPage = () => {
    currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = drawHeader(currentPage, false);
  };

  currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  y = drawHeader(currentPage, true);

  const checkPageSpace = (neededHeight: number) => {
    if (y - neededHeight < BOTTOM_MARGIN) {
      addNewPage();
    }
  };

  /* ---------------------------------------------------------
     Section heading with accent tab
     --------------------------------------------------------- */
  const drawSectionTitle = (title: string) => {
    checkPageSpace(34);
    currentPage.drawRectangle({
      x: MARGIN,
      y: y - 4,
      width: 4,
      height: 16,
      color: COLORS.accent,
    });
    currentPage.drawText(title, {
      x: MARGIN + 12,
      y,
      size: 13.5,
      font: boldFont,
      color: COLORS.primary,
    });
    y -= 22;
    currentPage.drawLine({
      start: { x: MARGIN, y },
      end: { x: MARGIN + CONTENT_WIDTH, y },
      thickness: 0.75,
      color: COLORS.border,
    });
    y -= 16;
  };

  /**
   * Safe Text Wrapping Utility
   */
  const wrapTextAndGetLines = (
    text: string,
    maxWidth: number,
    fontSize: number,
    textFont: PDFFont
  ): string[] => {
    const paragraphs = text.split("\n");
    const lines: string[] = [];

    paragraphs.forEach((paragraph) => {
      const words = paragraph.split(" ");
      let currentLine = "";

      words.forEach((word) => {
        const testLine = currentLine ? currentLine + " " + word : word;
        const testWidth = textFont.widthOfTextAtSize(testLine, fontSize);

        if (testWidth > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      if (currentLine) lines.push(currentLine);
    });
    return lines;
  };

  const drawBulletListTwoCols = (items: string[], bulletColor: RGB) => {
    const colGap = 20;
    const colWidth = (CONTENT_WIDTH - colGap) / 2;
    const bulletFontSize = 10;
    const lineHeight = 14;
    const rowGap = 8;
    const rightX = MARGIN + colWidth + colGap;

    const rowCount = Math.ceil(items.length / 2);

    for (let row = 0; row < rowCount; row++) {
      const leftText = items[row * 2];
      const rightText = items[row * 2 + 1];

      const leftLines = wrapTextAndGetLines(leftText, colWidth - 16, bulletFontSize, font);
      const rightLines = rightText
        ? wrapTextAndGetLines(rightText, colWidth - 16, bulletFontSize, font)
        : [];

      const maxLines = Math.max(leftLines.length, rightLines.length, 1);
      const rowHeight = maxLines * lineHeight + rowGap;

      checkPageSpace(rowHeight);
      const rowTopY = y;

      // Left column
      currentPage.drawCircle({
        x: MARGIN + 4,
        y: rowTopY - 4,
        size: 2.4,
        color: bulletColor,
      });
      leftLines.forEach((line, idx) => {
        currentPage.drawText(line, {
          x: MARGIN + 14,
          y: rowTopY - idx * lineHeight,
          size: bulletFontSize,
          font,
          color: COLORS.textDark,
        });
      });

      // Right column
      if (rightText) {
        currentPage.drawCircle({
          x: rightX + 4,
          y: rowTopY - 4,
          size: 2.4,
          color: bulletColor,
        });
        rightLines.forEach((line, idx) => {
          currentPage.drawText(line, {
            x: rightX + 14,
            y: rowTopY - idx * lineHeight,
            size: bulletFontSize,
            font,
            color: COLORS.textDark,
          });
        });
      }

      y -= rowHeight;
    }
  };

  const parseField = (field: unknown) => {
    if (!field) return null;
    return typeof field === "string" ? JSON.parse(field) : field;
  };

  const specifications = parseField(data.specifications) || {};
  const features = parseField(data.features) || [];
  const applications = parseField(data.applications) || [];

  /* ---------------------------------------------------------
     Title block — product name in large type
     --------------------------------------------------------- */
  checkPageSpace(70);
  currentPage.drawText(data.productName, {
    x: MARGIN,
    y,
    size: 20,
    font: boldFont,
    color: COLORS.textDark,
  });
  y -= 22;

  // Category pill
  const categoryLabel = data.categoryName;
  const pillPaddingX = 10;
  const pillWidth = boldFont.widthOfTextAtSize(categoryLabel, 9.5) + pillPaddingX * 2;
  currentPage.drawRectangle({
    x: MARGIN,
    y: y - 14,
    width: pillWidth,
    height: 20,
    color: COLORS.background,
    borderColor: COLORS.border,
    borderWidth: 0.75,
  });
  currentPage.drawText(categoryLabel, {
    x: MARGIN + pillPaddingX,
    y: y - 8,
    size: 9.5,
    font: boldFont,
    color: COLORS.primary,
  });
  y -= 40;

  // --- Short Description ---
  if (data.shortDescription) {
    const lines = wrapTextAndGetLines(data.shortDescription, CONTENT_WIDTH, 11, font);
    lines.forEach((line) => {
      checkPageSpace(17);
      currentPage.drawText(line, {
        x: MARGIN,
        y,
        size: 11,
        font,
        color: COLORS.textMuted,
      });
      y -= 17;
    });
    y -= 14;
  }

  // --- Detailed Description ---
  if (data.description) {
    drawSectionTitle("Description");
    const lines = wrapTextAndGetLines(data.description, CONTENT_WIDTH, 10.5, font);
    lines.forEach((line) => {
      checkPageSpace(15);
      currentPage.drawText(line, {
        x: MARGIN,
        y,
        size: 10.5,
        font,
        color: COLORS.textDark,
      });
      y -= 15;
    });
    y -= 15;
  }

  /* ---------------------------------------------------------
     Specifications table
     --------------------------------------------------------- */
  drawSectionTitle("Specifications");

  const specEntries = Object.entries(specifications);
  if (specEntries.length === 0) {
    currentPage.drawText("Not Available", {
      x: MARGIN,
      y,
      size: 10.5,
      font,
      color: COLORS.textMuted,
    });
    y -= 20;
  } else {
    const tableWidth = CONTENT_WIDTH;
    const col1Width = 170;
    const col2Width = tableWidth - col1Width;
    const cellPadding = 10;
    const tableLineHeight = 14;

    const drawTableHeader = () => {
      checkPageSpace(30);
      currentPage.drawRectangle({
        x: MARGIN,
        y: y - 22,
        width: tableWidth,
        height: 22,
        color: COLORS.primary,
      });
      currentPage.drawText("PARAMETER", {
        x: MARGIN + cellPadding,
        y: y - 15,
        size: 9,
        font: boldFont,
        color: COLORS.white,
      });
      currentPage.drawText("SPECIFICATION DETAILS", {
        x: MARGIN + col1Width + cellPadding,
        y: y - 15,
        size: 9,
        font: boldFont,
        color: COLORS.white,
      });
      y -= 22;
    };

    drawTableHeader();

    specEntries.forEach(([key, value], rowIndex) => {
      const valStr = typeof value === "object" ? JSON.stringify(value) : String(value);

      const keyLines = wrapTextAndGetLines(String(key), col1Width - cellPadding * 2, 9.5, boldFont);
      const valLines = wrapTextAndGetLines(valStr, col2Width - cellPadding * 2, 9.5, font);

      const maxLines = Math.max(keyLines.length, valLines.length);
      const rowHeight = maxLines * tableLineHeight + cellPadding * 1.6;

      if (y - rowHeight < BOTTOM_MARGIN) {
        addNewPage();
        drawSectionTitle("Specifications (continued)");
        drawTableHeader();
      }

      const rowTopY = y;

      // Alternating row background
      if (rowIndex % 2 === 1) {
        currentPage.drawRectangle({
          x: MARGIN,
          y: rowTopY - rowHeight,
          width: tableWidth,
          height: rowHeight,
          color: COLORS.rowAltBg,
        });
      }

      keyLines.forEach((line, idx) => {
        currentPage.drawText(line, {
          x: MARGIN + cellPadding,
          y: rowTopY - cellPadding - idx * tableLineHeight,
          size: 9.5,
          font: boldFont,
          color: COLORS.primary,
        });
      });

      valLines.forEach((line, idx) => {
        currentPage.drawText(line, {
          x: MARGIN + col1Width + cellPadding,
          y: rowTopY - cellPadding - idx * tableLineHeight,
          size: 9.5,
          font,
          color: COLORS.textDark,
        });
      });

      y -= rowHeight;

      currentPage.drawLine({
        start: { x: MARGIN, y },
        end: { x: MARGIN + tableWidth, y },
        thickness: 0.5,
        color: COLORS.rowLine,
      });
    });

    y -= 20;
  }

  // --- Features ---
  if (features.length > 0) {
    drawSectionTitle("Features");
    drawBulletListTwoCols(
      features.map((f: string) => f),
      COLORS.accent
    );
    y -= 6;
  }

  // --- Applications ---
  if (applications.length > 0) {
    drawSectionTitle("Applications");
    drawBulletListTwoCols(
      applications.map((a: string) => a),
      COLORS.primary
    );
    y -= 6;
  }

  /* ---------------------------------------------------------
     Footer — drawn on every page after all content is placed
     --------------------------------------------------------- */
  const allPages = pdfDoc.getPages();
  const totalPages = allPages.length;
  const footerHeight = 46;

  allPages.forEach((page, index) => {
    page.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE_WIDTH,
      height: footerHeight,
      color: COLORS.primaryDark,
    });

    page.drawText("Aven Automation", {
      x: MARGIN,
      y: 26,
      size: 10,
      font: boldFont,
      color: COLORS.white,
    });
    page.drawText("sales@avenautomation.in  |  +91 87669188920  |  avenautomation.in", {
      x: MARGIN,
      y: 12,
      size: 8.5,
      font,
      color: rgb(0.72, 0.78, 0.88),
    });

    const pageLabel = `Page ${index + 1} of ${totalPages}`;
    const pageLabelWidth = font.widthOfTextAtSize(pageLabel, 8.5);
    page.drawText(pageLabel, {
      x: PAGE_WIDTH - MARGIN - pageLabelWidth,
      y: 18,
      size: 8.5,
      font,
      color: rgb(0.72, 0.78, 0.88),
    });
  });

  return await pdfDoc.save();
}