/**
 * アクティブなスプレッドシートのIDを取得する
 * @return {string} スプレッドシートのID（アクティブなスプレッドシートがない場合は空文字）
 */
function get_ss_id() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let ret = '';
  if (ss !== null) {
    ret = ss.getId();
  }
  return ret;
}

/**
 * 指定されたIDのスプレッドシートとシートを取得する
 * @param {string} ssId - スプレッドシートのID
 * @param {string|null} sheetName - シート名（省略時はnull）
 * @return {Array} [スプレッドシートオブジェクト, シートオブジェクト]
 */
function get_spreadsheet(ssId, sheetName = null) {
  const ss = SpreadsheetApp.openById(ssId);
  let sheet = null;
  if (sheetName != null) {
    sheet = ss.getSheetByName(sheetName);
  }
  return [ss, sheet];
}

/**
 * 指定されたIDのスプレッドシートとシートを取得する（拡張版）
 * @param {string} ss_id - スプレッドシートのID
 * @param {string|null} sheet_name - シート名（省略時はnull）
 * @return {Array} [スプレッドシートオブジェクト, シートオブジェクト, 全シート配列, シート名をキーとしたオブジェクト]
 */
function get_spreadsheet_ex(ss_id, sheet_name = null) {
  const ss = SpreadsheetApp.openById(ss_id);
  let sheet = null;
  if (sheet_name !== null) {
    sheet = ss.getSheetByName(sheet_name);
  }
  const sheets = ss.getSheets();
  const sheets_by_name = {};
  for (const sheetx of sheets) {
    sheets_by_name[sheetx.getName()] = sheetx;
  }
  return [ss, sheet, sheets, sheets_by_name];
}

/**
 * 指定されたIDのスプレッドシートの全シート情報を取得する
 * @param {string} ss_id - スプレッドシートのID
 * @return {Array} [スプレッドシートオブジェクト, 最初のシートオブジェクト, 全シート配列, シート名をキーとしたオブジェクト]
 */
function get_sheets(ss_id) {
  const ss = SpreadsheetApp.openById(ss_id);
  const sheets = ss.getSheets();
  const sheets_by_name = {};
  for (const sheetx of sheets) {
    sheets_by_name[sheetx.getName()] = sheetx;
  }
  return [ss, sheets[0], sheets, sheets_by_name];
}
