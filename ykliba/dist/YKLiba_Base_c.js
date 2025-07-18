class Base {
  /**
   * アクティブなスプレッドシートのIDを取得する
   * @returns {string} スプレッドシートのID（アクティブなスプレッドシートがない場合は空文字）
   */
  static getSsId() {
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
   * @returns {Array} [スプレッドシート, シート]の配列
   */
  static getSpreadsheet(ssId, sheetName = null) {
    const ss = SpreadsheetApp.openById(ssId);
    let sheet = null;
    if (sheetName != null) {
      sheet = ss.getSheetByName(sheetName);
    }
    return [ss, sheet];
  }

  /**
   * 指定されたIDのスプレッドシート、シート、全シート、シート名マップを取得する
   * @param {string} ssId - スプレッドシートのID
   * @param {string|null} sheetName - シート名（省略時はnull）
   * @returns {Array} [スプレッドシート, シート, 全シート配列, シート名マップ]の配列
   */
  static getSpreadsheetEx(ssId, sheetName = null) {
    const ss = SpreadsheetApp.openById(ssId);
    let sheet = null;
    if (sheetName !== null) {
      sheet = ss.getSheetByName(sheetName);
    }
    const sheets = ss.getSheets();
    const sheetsByName = {};
    for (const sheetx of sheets) {
      sheetsByName[sheetx.getName()] = sheetx;
    }
    return [ss, sheet, sheets, sheetsByName];
  }

  /**
   * 指定されたIDのスプレッドシートと全シート情報を取得する
   * @param {string} ssId - スプレッドシートのID
   * @returns {Array} [スプレッドシート, 最初のシート, 全シート配列, シート名マップ]の配列
   */
  static getSheets(ssId) {
    const ss = SpreadsheetApp.openById(ssId);
    const sheets = ss.getSheets();
    const sheetsByName = {};
    for (const sheetx of sheets) {
      sheetsByName[sheetx.getName()] = sheetx;
    }
    return [ss, sheets[0], sheets, sheetsByName];
  }
}
this.Base = Base;