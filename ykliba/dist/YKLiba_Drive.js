/**
 * 指定されたIDのGoogle Driveフォルダを取得する
 * @param {string} folder_id - フォルダのID
 * @return {GoogleAppsScript.Drive.Folder} フォルダオブジェクト
 */
function get_folder(folder_id) {
  return DriveApp.getFolderById(folder_id);
}

/**
 * 指定されたフォルダにファイルを作成する
 * @param {GoogleAppsScript.Drive.Folder} folder - 対象フォルダ
 * @param {string} name - ファイル名
 * @param {string} content - ファイルの内容
 */
function create_file(folder, name, content) {
  folder.createFile(name, content);
}

/**
 * 指定されたフォルダから指定された名前のファイルを取得する
 * @param {GoogleAppsScript.Drive.Folder} folder - 対象フォルダ
 * @param {string} name - ファイル名
 * @return {GoogleAppsScript.Drive.File|null} ファイルオブジェクト、見つからない場合はnull
 */
function get_file(folder, name) {
  YKLiblog.Log.debug(`folder=${folder}`);
  files = folder.getFilesByName(name);
  while (files.hasNext()) {
    const file = files.next();
    YKLiblog.Log.debug(file.getName());
    YKLiblog.Log.debug(file.getId());
    return file;
  }
  return null;
}

/**
 * 指定されたフォルダ内のすべてのファイルを削除する
 * @param {GoogleAppsScript.Drive.Folder} folder - 対象フォルダ
 * @return {boolean} 処理が完了した場合はtrue
 */
function remove_files_under_folder(folder) {
  files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    file.setTrashed(true);
  }
  return true;
}

/**
 * スプレッドシートの内容をクリアする（ヘッダー行を除く）
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - 対象シート
 */
function clear_sheet(sheet) {
  const lastRow = sheet.getLastRow();
  if( lastRow > 1 ){
    sheet.deleteRows(1, lastRow);
  }
}

/**
 * ファイルパスの区切り文字を取得する
 * @return {string} ファイルパスの区切り文字
 */
function fileSaparator(){
  return "/"
}
