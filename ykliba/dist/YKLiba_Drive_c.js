class Drive {
  /**
   * フォルダIDからフォルダオブジェクトを取得する
   * @param {string} folder_id - 取得するフォルダのID
   * @return {Folder} フォルダオブジェクト
   */
  static getFolder(folder_id) {
    return DriveApp.getFolderById(folder_id);
  }

  /**
   * 指定されたフォルダにファイルを作成する
   * @param {Folder} folder - ファイルを作成するフォルダ
   * @param {string} name - 作成するファイル名
   * @param {string} content - ファイルの内容
   */
  static createFile(folder, name, content) {
    folder.createFile(name, content);
  }

  /**
   * 指定されたフォルダ内の指定名のファイルを取得する
   * @param {Folder} folder - 検索対象のフォルダ
   * @param {string} name - 取得するファイル名
   * @return {File|null} ファイルオブジェクト、見つからない場合はnull
   */
  static getFile(folder, name) {
    Log.debug(`folder=${folder}`);
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
   * 指定されたフォルダ内の全ファイルを削除（ゴミ箱に移動）する
   * @param {Folder} folder - ファイルを削除するフォルダ
   * @return {boolean} 処理が完了した場合はtrue
   */
  static removeFilesUnderFolder(folder) {
    files = folder.getFiles();
    while (files.hasNext()) {
      const file = files.next();
      file.setTrashed(true);
    }
    return true;
  }

  /**
   * スプレッドシートの内容をクリアする（ヘッダー行を除く）
   * @param {Sheet} sheet - クリアするスプレッドシート
   */
  static clearSheet(sheet) {
    const lastRow = sheet.getLastRow();
    if( lastRow > 1 ){
      sheet.deleteRows(1, lastRow);
    }
  }

  /**
   * ファイルパスの区切り文字を取得する
   * @return {string} ファイル区切り文字（"/"）
   */
  static fileSeparator(){
    return "/"
  }
}
this.Drive = Drive;