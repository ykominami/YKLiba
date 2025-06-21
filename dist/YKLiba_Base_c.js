class Base {
  static getSsId() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let ret = '';
    if (ss !== null) {
      ret = ss.getId();
    }
    return ret;
  }

  static getSpreadsheet(ssId, sheetName = null) {
    const ss = SpreadsheetApp.openById(ssId);
    let sheet = null;
    if (sheetName != null) {
      sheet = ss.getSheetByName(sheetName);
    }
    return [ss, sheet];
  }

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