import { PDFDocument, StandardFonts, PDFPage, PDFFont, rgb } from "pdf-lib";

interface ProductPdfData {
  productName: string;
  categoryName: string;
  shortDescription?: string | null;
  description?: string | null;
  specifications?: string | null;
  features?: string | null;
  applications?: string | null;
}

export async function generateProductPdf(data: ProductPdfData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let currentPage = pdfDoc.addPage([595, 842]); // Standard A4 Dimensions
  let y = 790; 
  const margin = 40;
  const bottomMargin = 55;

  const addNewPage = () => {
    currentPage = pdfDoc.addPage([595, 842]);
    y = 790;
    
    currentPage.drawText("Industrial Automation Solutions", { x: margin, y, size: 10, font: boldFont });
    currentPage.drawLine({ start: { x: margin, y: y - 8 }, end: { x: 555, y: y - 8 }, thickness: 0.5, color: rgb(0.7, 0.7, 0.7) });
    y -= 35;
  };

  const checkPageSpace = (neededHeight: number) => {
    if (y - neededHeight < bottomMargin) {
      addNewPage();
    }
  };

  /**
   * Safe Text Wrapping Utility
   * Wraps text and returns how many lines were rendered so we can compute table cell heights.
   */
  const wrapTextAndGetLines = (text: string, maxWidth: number, fontSize: number, textFont: PDFFont): string[] => {
    const paragraphs = text.split('\n');
    const lines: string[] = [];

    paragraphs.forEach(paragraph => {
      const words = paragraph.split(' ');
      let currentLine = "";

      words.forEach(word => {
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

  const parseField = (field: unknown) => {
    if (!field) return null;
    return typeof field === "string" ? JSON.parse(field) : field;
  };

  const specifications = parseField(data.specifications) || {};
  const features = parseField(data.features) || [];
  const applications = parseField(data.applications) || [];

  // --- Document Header ---
  currentPage.drawText("Industrial Automation Solutions", { x: margin, y, size: 22, font: boldFont });
  y -= 22;
  currentPage.drawText(`Generated: ${new Date().toLocaleDateString()}`, { x: margin, y, size: 9, font });
  y -= 45;

  // --- Primary Info Block ---
  checkPageSpace(75);
  currentPage.drawText("Product Information", { x: margin, y, size: 14, font: boldFont });
  y -= 24;
  currentPage.drawText(`Product Name: ${data.productName}`, { x: margin, y, size: 11, font });
  y -= 18;
  currentPage.drawText(`Category: ${data.categoryName}`, { x: margin, y, size: 11, font });
  y -= 35;

  // --- Short Description Section ---
  if (data.shortDescription) {
    checkPageSpace(40);
    currentPage.drawText("Short Description", { x: margin, y, size: 13, font: boldFont });
    y -= 22;
    const lines = wrapTextAndGetLines(data.shortDescription, 515, 10.5, font);
    lines.forEach(line => {
      checkPageSpace(15);
      currentPage.drawText(line, { x: margin, y, size: 10.5, font });
      y -= 15;
    });
    y -= 15;
  }

  // --- Detailed Body Description ---
  if (data.description) {
    checkPageSpace(40);
    currentPage.drawText("Description", { x: margin, y, size: 13, font: boldFont });
    y -= 22;
    const lines = wrapTextAndGetLines(data.description, 515, 10.5, font);
    lines.forEach(line => {
      checkPageSpace(15);
      currentPage.drawText(line, { x: margin, y, size: 10.5, font });
      y -= 15;
    });
    y -= 15;
  }

  // --- Specifications Table Grid ---
  checkPageSpace(60);
  currentPage.drawText("Specifications", { x: margin, y, size: 13, font: boldFont });
  y -= 25;

  const specEntries = Object.entries(specifications);
  if (specEntries.length === 0) {
    currentPage.drawText("Not Available", { x: margin, y, size: 10.5, font });
    y -= 20;
  } else {
    const tableWidth = 515;
    const col1Width = 180;
    const col2Width = tableWidth - col1Width; // 335
    const cellPadding = 8;
    const tableLineHeight = 14;

    // FIXED: Corrected method call from fillRect to drawRectangle to remove IDE errors
    checkPageSpace(30);
    currentPage.drawRectangle({ x: margin, y: y - 20, width: tableWidth, height: 20, color: rgb(0.93, 0.95, 0.98) });
    currentPage.drawText("Parameter", { x: margin + cellPadding, y: y - 14, size: 10, font: boldFont });
    currentPage.drawText("Specification Details", { x: margin + col1Width + cellPadding, y: y - 14, size: 10, font: boldFont });
    
    // Header Outer Borders
    currentPage.drawLine({ start: { x: margin, y }, end: { x: margin + tableWidth, y }, thickness: 1, color: rgb(0.7, 0.7, 0.7) });
    currentPage.drawLine({ start: { x: margin, y: y - 20 }, end: { x: margin + tableWidth, y: y - 20 }, thickness: 1, color: rgb(0.7, 0.7, 0.7) });
    y -= 20;

    for (const [key, value] of specEntries) {
      const valStr = typeof value === 'object' ? JSON.stringify(value) : String(value);

      const keyLines = wrapTextAndGetLines(String(key), col1Width - (cellPadding * 2), 9.5, boldFont);
      const valLines = wrapTextAndGetLines(valStr, col2Width - (cellPadding * 2), 9.5, font);

      const maxLines = Math.max(keyLines.length, valLines.length);
      const rowHeight = (maxLines * tableLineHeight) + (cellPadding * 2);

      if (y - rowHeight < bottomMargin) {
        addNewPage();
        // Redraw Header on fresh pages
        currentPage.drawRectangle({ x: margin, y: y - 20, width: tableWidth, height: 20, color: rgb(0.93, 0.95, 0.98) });
        currentPage.drawText("Parameter", { x: margin + cellPadding, y: y - 14, size: 10, font: boldFont });
        currentPage.drawText("Specification Details", { x: margin + col1Width + cellPadding, y: y - 14, size: 10, font: boldFont });
        currentPage.drawLine({ start: { x: margin, y }, end: { x: margin + tableWidth, y }, thickness: 1, color: rgb(0.7, 0.7, 0.7) });
        currentPage.drawLine({ start: { x: margin, y: y - 20 }, end: { x: margin + tableWidth, y: y - 20 }, thickness: 1, color: rgb(0.7, 0.7, 0.7) });
        y -= 20;
      }

      const rowTopY = y;

      // Column 1 values
      keyLines.forEach((line, idx) => {
        currentPage.drawText(line, { x: margin + cellPadding, y: rowTopY - cellPadding - (idx * tableLineHeight) - 8, size: 9.5, font: boldFont });
      });

      // Column 2 values
      valLines.forEach((line, idx) => {
        currentPage.drawText(line, { x: margin + col1Width + cellPadding, y: rowTopY - cellPadding - (idx * tableLineHeight) - 8, size: 9.5, font });
      });

      y -= rowHeight;

      // Structural lines per row
      currentPage.drawLine({ start: { x: margin, y }, end: { x: margin + tableWidth, y }, thickness: 0.5, color: rgb(0.8, 0.8, 0.8) });
      currentPage.drawLine({ start: { x: margin, y: rowTopY }, end: { x: margin, y }, thickness: 0.5, color: rgb(0.8, 0.8, 0.8) });
      currentPage.drawLine({ start: { x: margin + col1Width, y: rowTopY }, end: { x: margin + col1Width, y }, thickness: 0.5, color: rgb(0.8, 0.8, 0.8) });
      currentPage.drawLine({ start: { x: margin + tableWidth, y: rowTopY }, end: { x: margin + tableWidth, y }, thickness: 0.5, color: rgb(0.8, 0.8, 0.8) });
    }
    y -= 20;
  }

  // --- Features ---
  if (features.length > 0) {
    checkPageSpace(40);
    currentPage.drawText("Features", { x: margin, y, size: 13, font: boldFont });
    y -= 25;
    features.forEach((feature: string) => {
      const lines = wrapTextAndGetLines(`•  ${feature}`, 515, 10.5, font);
      lines.forEach(line => {
        checkPageSpace(16);
        currentPage.drawText(line, { x: margin, y, size: 10.5, font });
        y -= 16;
      });
      y -= 4;
    });
    y -= 15;
  }

  // --- Applications ---
  if (applications.length > 0) {
    checkPageSpace(40);
    currentPage.drawText("Applications", { x: margin, y, size: 13, font: boldFont });
    y -= 25;
    applications.forEach((app: string) => {
      const lines = wrapTextAndGetLines(`•  ${app}`, 515, 10.5, font);
      lines.forEach(line => {
        checkPageSpace(16);
        currentPage.drawText(line, { x: margin, y, size: 10.5, font });
        y -= 16;
      });
      y -= 4;
    });
    y -= 15;
  }

  // --- Footer Details ---
  checkPageSpace(95);
  currentPage.drawText("Contact Information", { x: margin, y, size: 12, font: boldFont });
  y -= 22;
  currentPage.drawText("Industrial Automation Solutions", { x: margin, y, size: 11, font });
  y -= 18;
  currentPage.drawText("Email: info@industrialautomation.com | Phone: +91 9876543210", { x: margin, y, size: 10, font });

  return await pdfDoc.save();
}