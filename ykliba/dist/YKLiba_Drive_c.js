class Drive {
  static getFolder(folder_id) {
    return DriveApp.getFolderById(folder_id);
  }

  static createFile(folder, name, content) {
    folder.createFile(name, content);
  }

  static getFile(folder, name) {
    Log.debug(`folder=${folder}`);
    files = folder.getFilesByName(name);
    while (files.hasNext()) {
      const file = files.next();
      Logger.log(file.getName());
      Logger.log(file.getId());
      return file;
    }
    return null;
  }

  static removeFilesUnderFolder(folder) {
    files = folder.getFiles();
    while (files.hasNext()) {
      const file = files.next();
      file.setTrashed(true);
    }
    return true;
  }

  static clearSheet(sheet) {
    const lastRow = sheet.getLastRow();
    if( lastRow > 1 ){
      sheet.deleteRows(1, lastRow);
    }
  }
}
this.Drive = Drive;