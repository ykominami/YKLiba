// Import required classes
// Base class for spreadsheet operations
// YKLiblog class for logging operations

class Config0 {
  /**
   * 設定シートを取得する
   * @param {string|null} sheetname - シート名（nullの場合はデフォルトシート名を使用）
   * @returns {GoogleAppsScript.Spreadsheet.Sheet} 設定シート
   */
  static getConfigSheet(sheetname = null) {
    const ss_id = PropertiesService.getScriptProperties().getProperty('CONFIG_SPREADSHEET_ID');
    if (sheetname === null) {
      sheetname = PropertiesService.getScriptProperties().getProperty('CONFIG_SHEETNAME');
    }

    const [ss, sheet] = Base.getSpreadsheet(ss_id, sheetname)

    return sheet
  }

  /**
   * デフォルト設定シートから値を取得する
   * @returns {Array} 設定シートの値
   */
  static getValuesFromConfigSheetX() {
    const sheet = Config0.getConfigSheet()
    YKLiblog.Log.debug(`YKLiba_Config.js getValuesFromConfigSheetX 0 sheet=${sheet}`)
    return Config0.getValuesFromConfigSheet(sheet)
  }

  /**
   * 2番目の設定シートから値を取得する
   * @returns {Array} 設定シートの値
   */
  static getValuesFromConfigSheetY() {
    const sheetname = PropertiesService.getScriptProperties().getProperty('CONFIG2_SHEETNAME');
    const sheet = Config0.getConfigSheet(sheetname);
    YKLiblog.Log.debug(`YKLiba_Config.js getValuesFromConfigSheetY 0 sheet=${sheet}`)
    return Config0.getValuesFromConfigSheet(sheet)
  }

  /**
   * 指定されたシートから値を取得する
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - 対象のシート
   * @returns {Array} シートの値
   */
  static getValuesFromConfigSheet(sheet) {
    return Base.getSimpleRows(sheet)
  }

  /**
   * 指定されたIDでフォルダを取得する
   * @param {string} folderId - フォルダID
   * @returns {GoogleAppsScript.Drive.Folder} フォルダオブジェクト
   */
  static getFolderById(folderId) {
    return DriveApp.getFolderById(folderId)
  }
}

this.Config0 = Config0;