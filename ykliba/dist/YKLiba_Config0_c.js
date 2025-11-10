// Import required classes
// Base class for spreadsheet operations
// YKLiblog class for logging operations

/**
 * 基本的な設定操作機能を提供するクラス
 * 設定シートの取得、設定値の読み込み、フォルダ操作機能を提供する
 * Google Apps Scriptの設定管理の基盤機能を実装
 */
class Config0 {
  /**
   * 設定シートを取得する
   * @param {string|null} sheetname - シート名（nullの場合はデフォルトシート名を使用）
   * @returns {GoogleAppsScript.Spreadsheet.Sheet} 設定シート
   * @throws {Error} PropertiesService.getScriptProperties().getProperty()でプロパティが取得できない場合
   * @throws {Error} Base.getSpreadsheetで無効なスプレッドシートIDまたはシート名でエラーが発生した場合
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
   * @throws {Error} Config0.getConfigSheetメソッドでエラーが発生した場合
   * @throws {Error} Config0.getValuesFromConfigSheetメソッドでエラーが発生した場合
   */
  static getValuesFromConfigSheetX() {
    const sheet = Config0.getConfigSheet()
    YKLiblog.Log.debug(`YKLiba_Config.js getValuesFromConfigSheetX 0 sheet=${sheet}`)
    return Config0.getValuesFromConfigSheet(sheet)
  }

  /**
   * 2番目の設定シートから値を取得する
   * @returns {Array} 設定シートの値
   * @throws {Error} PropertiesService.getScriptProperties().getProperty()でプロパティが取得できない場合
   * @throws {Error} Config0.getConfigSheetメソッドでエラーが発生した場合
   * @throws {Error} Config0.getValuesFromConfigSheetメソッドでエラーが発生した場合
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
   * @throws {Error} Base.getSimpleRowsメソッドでエラーが発生した場合
   */
  static getValuesFromConfigSheet(sheet) {
    return Base.getSimpleRows(sheet)
  }

  /**
   * 指定されたIDでフォルダを取得する
   * @param {string} folderId - フォルダID
   * @returns {GoogleAppsScript.Drive.Folder} フォルダオブジェクト
   * @throws {Error} DriveApp.getFolderById()で無効なフォルダIDが指定された場合
   * @throws {Error} フォルダが存在しない、またはアクセス権限がない場合
   */
  static getFolderById(folderId) {
    return DriveApp.getFolderById(folderId)
  }
}

this.Config0 = Config0;