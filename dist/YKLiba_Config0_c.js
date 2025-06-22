class Config0 {
  static getConfigSheet(sheetname = null) {
    const ss_id = PropertiesService.getScriptProperties().getProperty('CONFIG_SPREADSHEET_ID');
    if (sheetname === null) {
      sheetname = PropertiesService.getScriptProperties().getProperty('CONFIG_SHEETNAME');
    }

    const [ss, sheet] = Base.getSpreadsheet(ss_id, sheetname)

    return sheet
  }

  static getValuesFromConfigSheetX() {
    const sheet = this.getConfigSheet()
    Log.debug(`YKLiba_Config.js getValuesFromConfigSheetX 0 sheet=${sheet}`)
    return this.getValuesFromConfigSheet(sheet)
  }

  static getValuesFromConfigSheetY() {
    const sheetname = PropertiesService.getScriptProperties().getProperty('CONFIG2_SHEETNAME');
    const sheet = this.getConfigSheet(sheetname);
    Log.debug(`YKLiba_Config.js getValuesFromConfigSheetY 0 sheet=${sheet}`)
    return this.getValuesFromConfigSheet(sheet)
  }

  static getValuesFromConfigSheet(sheet) {
    return Base.getSimpleRows(sheet)
  }

  static getFolderById(folderId) {
    return DriveApp.getFolderById(folderId)
  }
}

this.Config0 = Config0;