/**
 * Google Apps Script endpoint that stores received JSON into a Google Sheet.
 *
 * Setup (high-level):
 * 1) Create a Google Sheet. Copy its ID from the URL.
 * 2) In Apps Script, create a new project, paste this file.
 * 3) Set SHEET_ID and TAB_NAME.
 * 4) Deploy as Web app (execute as you; access: anyone).
 * 5) Use the Web app URL as the "Endpoint URL" on index.html.
 *
 * CORS: This script responds with Access-Control-Allow-Origin: * for demo purposes.
 */

const SHEET_ID = "PASTE_YOUR_SHEET_ID_HERE";
const TAB_NAME = "pings";

function ensureHeader_(sheet) {
  const header = [
    "receivedAt",
    "type",
    "reason",
    "sentAt",
    "sessionId",
    "latitude",
    "longitude",
    "accuracyMeters",
    "pageUrl",
    "userAgent"
  ];
  const firstRow = sheet.getRange(1, 1, 1, header.length).getValues()[0];
  const isEmpty = firstRow.join("") === "";
  if (isEmpty) sheet.getRange(1, 1, 1, header.length).setValues([header]);
}

function doOptions() {
  // Handle CORS preflight
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "content-type");
}

function doPost(e) {
  let body = {};
  try {
    body = JSON.parse(e.postData.contents || "{}");
  } catch (err) {
    return ContentService.createTextOutput("Invalid JSON")
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeader("Access-Control-Allow-Origin", "*");
  }

  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(TAB_NAME) || ss.insertSheet(TAB_NAME);
  ensureHeader_(sheet);

  const coords = body.coords || {};
  const row = [
    new Date().toISOString(),
    body.type || "",
    body.reason || "",
    body.sentAt || "",
    body.sessionId || "",
    coords.latitude ?? "",
    coords.longitude ?? "",
    coords.accuracyMeters ?? "",
    body.pageUrl || "",
    body.userAgent || ""
  ];

  sheet.appendRow(row);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "content-type");
}

