import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface CustomerContactTemplateProps {
  name: string;
  email: string;
  mobile: string;
  company?: string;
  city?: string;
  products: string;
  message: string;
}

const COLORS = {
  primary: "#0F2747",
  primaryDark: "#0A1B33",
  accent: "#F7941D",
  background: "#F8FAFC",
  card: "#FFFFFF",
  border: "#E7EAF0",
  textDark: "#101828",
  textMuted: "#5C6B82",
  success: "#16A34A",
  successBg: "#EAF7EE",
};


const LOGO_URL = "https://avenautomation.in/aven/aven-logo-1.png";

export const CustomerContactTemplate = ({
  name,
  email,
  mobile,
  company,
  city,
  products,
  message,
}: CustomerContactTemplateProps) => {
  const previewText = `Thank you ${name}, we have received your enquiry. Our technical team is reviewing your requirements.`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={styles.body}>
        <Container style={styles.outerContainer}>
          {/* ===================== HEADER ===================== */}
          <Section style={styles.header}>
            <Row>
              <Column align="center">
                <Img
                  src={LOGO_URL}
                  alt="Aven Automation"
                  width="52"
                  height="52"
                  style={styles.logo}
                />
                <Text style={styles.headerCompanyName}>
                  AVEN AUTOMATION
                </Text>
                <Text style={styles.headerTagline}>
                  Industrial Entrance Automation.
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ===================== HERO ===================== */}
          <Section style={styles.heroSection}>
            <Heading style={styles.heroHeading}>
              Thank You {name}
            </Heading>
            <Text style={styles.heroSubtitle}>
              We have successfully received your enquiry.
              <br />
              Our technical team is reviewing your requirements.
            </Text>
          </Section>

          {/* ===================== BODY WRAPPER ===================== */}
          <Section style={styles.bodyWrapper}>
            {/* Success Card */}
            <Section style={styles.successCard}>
              <Row>
                <Column style={{ width: 40 }}>
                  <table
                    role="presentation"
                    cellPadding={0}
                    cellSpacing={0}
                    style={styles.successIconWrap}
                  >
                    <tr>
                      <td style={styles.successIconCell}>
                        <Text style={styles.successIconCheck}>✓</Text>
                      </td>
                    </tr>
                  </table>
                </Column>
                <Column>
                  <Text style={styles.successText}>
                    Enquiry Received Successfully
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Enquiry Details Card */}
            <Section style={styles.detailsCard}>
              <Text style={styles.cardTitle}>Enquiry Details</Text>
              <Hr style={styles.cardDivider} />

              <DetailRow label="Name" value={name} />
              <DetailRow label="Email" value={email} />
              <DetailRow label="Mobile" value={mobile} />
              <DetailRow label="Company" value={company || "-"} />
              <DetailRow label="City" value={city || "-"} />
              <DetailRow label="Products" value={products || "-"} />
              <DetailRow
                label="Message"
                value={message}
                isLast
              />
            </Section>

            {/* CTA Button */}
            <Section style={styles.ctaSection}>
              <Button
                href="https://avenautomation.in/products"
                style={styles.ctaButton}
              >
                View Products
              </Button>
            </Section>

            {/* Contact Section */}
            <Section style={styles.contactCard}>
              <Text style={styles.cardTitle}>Get in Touch</Text>
              <Hr style={styles.cardDivider} />

              <Row>
                <Column align="center" style={styles.contactColumn}>
                  <Text style={styles.contactIcon}>📞</Text>
                  <Text style={styles.contactLabel}>Sales</Text>
                  <Text style={styles.contactValue}>
                    sales@avenautomation.in
                  </Text>
                </Column>
                <Column align="center" style={styles.contactColumn}>
                  <Text style={styles.contactIcon}>✉️</Text>
                  <Text style={styles.contactLabel}>Support</Text>
                  <Text style={styles.contactValue}>
                    info@avenautomation.in
                  </Text>
                </Column>
                <Column align="center" style={styles.contactColumn}>
                  <Text style={styles.contactIcon}>🌐</Text>
                  <Text style={styles.contactLabel}>Website</Text>
                  <Text style={styles.contactValue}>
                    avenautomation.in
                  </Text>
                </Column>
              </Row>
            </Section>
          </Section>

          {/* ===================== FOOTER ===================== */}
          <Section style={styles.footer}>
            <Text style={styles.footerCompanyName}>Aven Automation</Text>
            <Text style={styles.footerTagline}>
              Reliable Industrial Entrance Automation.
            </Text>
            <Hr style={styles.footerDivider} />
            <Text style={styles.footerCopyright}>
              © 2026 Aven Automation. All Rights Reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default CustomerContactTemplate;

/* ============================================================
   Reusable Sub-Components
   ============================================================ */

const DetailRow = ({
  label,
  value,
  isLast,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) => (
  <Row style={isLast ? undefined : styles.detailRow}>
    <Column style={styles.detailLabelColumn}>
      <Text style={styles.detailLabel}>{label}</Text>
    </Column>
    <Column>
      <Text style={styles.detailValue}>{value}</Text>
    </Column>
  </Row>
);

const TimelineItem = ({
  step,
  title,
  description,
  isLast,
}: {
  step: string;
  title: string;
  description: string;
  isLast?: boolean;
}) => (
  <Row style={isLast ? undefined : styles.timelineRow}>
    <Column style={{ width: 36, verticalAlign: "top" }}>
      <table role="presentation" cellPadding={0} cellSpacing={0}>
        <tr>
          <td style={styles.timelineStepCircle}>
            <Text style={styles.timelineStepNumber}>{step}</Text>
          </td>
        </tr>
      </table>
    </Column>
    <Column style={{ verticalAlign: "top", paddingLeft: 12 }}>
      <Text style={styles.timelineTitle}>{title}</Text>
      <Text style={styles.timelineDescription}>{description}</Text>
    </Column>
  </Row>
);

/* ============================================================
   Styles (inline objects, Gmail / Outlook / Zoho safe)
   ============================================================ */

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: COLORS.background,
    fontFamily:
      "'Segoe UI', Helvetica, Arial, sans-serif",
    margin: 0,
    padding: "24px 0",
  },
  outerContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: COLORS.background,
  },

  /* Header */
  header: {
    backgroundColor: COLORS.primary,
    backgroundImage: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
    padding: "36px 24px",
    borderRadius: "12px 12px 0 0",
    textAlign: "center" as const,
  },
  logo: {
    margin: "0 auto 12px auto",
    display: "block",
    borderRadius: "8px",
  },
  headerCompanyName: {
    color: "#FFFFFF",
    fontSize: "22px",
    fontWeight: 700,
    letterSpacing: "1px",
    margin: "0 0 4px 0",
    textAlign: "center" as const,
  },
  headerTagline: {
    color: "#C9D4E5",
    fontSize: "13px",
    fontWeight: 400,
    margin: 0,
    textAlign: "center" as const,
  },

  /* Hero */
  heroSection: {
    backgroundColor: COLORS.card,
    padding: "40px 32px 24px 32px",
    textAlign: "center" as const,
  },
  heroHeading: {
    color: COLORS.textDark,
    fontSize: "28px",
    fontWeight: 700,
    margin: "0 0 12px 0",
    textAlign: "center" as const,
  },
  heroSubtitle: {
    color: COLORS.textMuted,
    fontSize: "15px",
    lineHeight: "24px",
    margin: 0,
    textAlign: "center" as const,
  },

  bodyWrapper: {
    backgroundColor: COLORS.card,
    padding: "0 32px 32px 32px",
  },

  /* Success Card */
  successCard: {
    backgroundColor: COLORS.successBg,
    border: `1px solid ${COLORS.success}`,
    borderRadius: "10px",
    padding: "16px 20px",
    marginBottom: "24px",
  },
  successIconWrap: {
    borderCollapse: "collapse" as const,
  },
  successIconCell: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    backgroundColor: COLORS.success,
    textAlign: "center" as const,
    verticalAlign: "middle" as const,
  },
  successIconCheck: {
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "28px",
    margin: 0,
    textAlign: "center" as const,
  },
  successText: {
    color: COLORS.success,
    fontSize: "15px",
    fontWeight: 600,
    margin: 0,
    lineHeight: "28px",
  },

  /* Generic Card */
  detailsCard: {
    backgroundColor: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "20px",
    boxShadow: "0 1px 3px rgba(15, 39, 71, 0.06)",
  },
  timelineCard: {
    backgroundColor: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "20px",
    boxShadow: "0 1px 3px rgba(15, 39, 71, 0.06)",
  },
  contactCard: {
    backgroundColor: COLORS.background,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "12px",
    padding: "24px",
    marginTop: "8px",
  },
  cardTitle: {
    color: COLORS.primary,
    fontSize: "16px",
    fontWeight: 700,
    margin: "0 0 4px 0",
  },
  cardDivider: {
    borderColor: COLORS.border,
    margin: "12px 0 16px 0",
  },

  /* Detail Rows */
  detailRow: {
    marginBottom: "14px",
  },
  detailLabelColumn: {
    width: "110px",
    verticalAlign: "top" as const,
  },
  detailLabel: {
    color: COLORS.textMuted,
    fontSize: "13px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.4px",
    margin: 0,
  },
  detailValue: {
    color: COLORS.textDark,
    fontSize: "14px",
    fontWeight: 500,
    margin: 0,
    lineHeight: "20px",
  },

  /* Timeline */
  timelineRow: {
    marginBottom: "16px",
  },
  timelineStepCircle: {
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    backgroundColor: COLORS.primary,
    textAlign: "center" as const,
    verticalAlign: "middle" as const,
  },
  timelineStepNumber: {
    color: "#FFFFFF",
    fontSize: "12px",
    fontWeight: 700,
    lineHeight: "26px",
    margin: 0,
    textAlign: "center" as const,
  },
  timelineTitle: {
    color: COLORS.textDark,
    fontSize: "14px",
    fontWeight: 600,
    margin: "0 0 2px 0",
  },
  timelineDescription: {
    color: COLORS.textMuted,
    fontSize: "13px",
    lineHeight: "18px",
    margin: 0,
  },

  /* CTA */
  ctaSection: {
    textAlign: "center" as const,
    margin: "8px 0 28px 0",
  },
  ctaButton: {
    backgroundColor: COLORS.accent,
    borderRadius: "8px",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: 700,
    textDecoration: "none",
    textAlign: "center" as const,
    padding: "14px 36px",
    display: "inline-block",
  },

  /* Contact */
  contactColumn: {
    padding: "0 8px",
  },
  contactIcon: {
    fontSize: "20px",
    margin: "0 0 6px 0",
    textAlign: "center" as const,
  },
  contactLabel: {
    color: COLORS.textMuted,
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.4px",
    margin: "0 0 2px 0",
    textAlign: "center" as const,
  },
  contactValue: {
    color: COLORS.primary,
    fontSize: "12px",
    fontWeight: 600,
    margin: 0,
    textAlign: "center" as const,
    wordBreak: "break-word" as const,
  },

  /* Footer */
  footer: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: "0 0 12px 12px",
    padding: "28px 24px",
    textAlign: "center" as const,
  },
  footerCompanyName: {
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: 700,
    margin: "0 0 4px 0",
    textAlign: "center" as const,
  },
  footerTagline: {
    color: "#9FAEC4",
    fontSize: "12px",
    margin: 0,
    textAlign: "center" as const,
  },
  footerDivider: {
    borderColor: "#22375A",
    margin: "16px 0",
  },
  footerCopyright: {
    color: "#7C8CA8",
    fontSize: "11px",
    margin: 0,
    textAlign: "center" as const,
  },
};