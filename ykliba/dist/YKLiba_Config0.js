/**
 * 設定シートを取得する
 * @param {string|null} sheetname - シート名（nullの場合はデフォルトのシート名を使用）
 * @return {Sheet} 設定シートオブジェクト
 */
function get_config_sheet(sheetname = null){
  const ss_id = PropertiesService.getScriptProperties().getProperty('CONFIG_SPREADSHEET_ID');
  if( sheetname === null){
    sheetname = PropertiesService.getScriptProperties().getProperty('CONFIG_SHEETNAME');
  }

  const [ss, sheet] = get_spreadsheet(ss_id, sheetname)

  return sheet
}

/**
 * デフォルト設定シートから値を取得する
 * @return {Array} 設定シートの値配列
 */
function get_values_from_config_sheet_x(){
  const sheet = get_config_sheet()
  YKLiblog.Log.debug(`YKLiba_Config0.js get_values_from_config_sheet_x 0 sheet=${sheet}`)
  return get_values_from_config_sheet(sheet)
}

/**
 * 設定2シートから値を取得する
 * @return {Array} 設定2シートの値配列
 */
function get_values_from_config_sheet_y(){
  const sheetname = PropertiesService.getScriptProperties().getProperty('CONFIG2_SHEETNAME');
  const sheet = get_config_sheet(sheetname);
  YKLiblog.Log.debug(`YKLiba_Config.js get_values_from_config_sheet_y 0 sheet=${sheet}`)
  return get_values_from_config_sheet(sheet)
}

/**
 * 設定シートから値を取得する
 * @param {Sheet} sheet - 設定シートオブジェクト
 * @return {Array} シートの値配列
 */
function get_values_from_config_sheet(sheet){
  return get_simple_rows(sheet)
}

/**
 * フォルダIDからフォルダオブジェクトを取得する
 * @param {string} folderId - フォルダID
 * @return {Folder} フォルダオブジェクト
 */
function get_folder_by_id(folderId){
  return DriveApp.getFolderById(folderId)
}

