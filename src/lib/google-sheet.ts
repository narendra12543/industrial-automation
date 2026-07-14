import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    project_id: process.env.GOOGLE_PROJECT_ID,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

google.options({
  auth,
});

const sheets = google.sheets("v4");

export async function appendToSheet(
  sheetName: string,
  values: (string | number | null | undefined)[]
) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `${sheetName}!A:Z`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });

  console.log("Spreadsheet ID:", process.env.GOOGLE_SHEET_ID);
  console.log("Sheet Name:", sheetName);
}