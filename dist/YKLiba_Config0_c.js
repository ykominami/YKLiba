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
    Logger.log(`YKLiba_Config.js getValuesFromConfigSheetX 0 sheet=${sheet}`)
    return this.getValuesFromConfigSheet(sheet)
  }

  static getValuesFromConfigSheetY() {
    const sheetname = PropertiesService.getScriptProperties().getProperty('CONFIG2_SHEETNAME');
    const sheet = this.getConfigSheet(sheetname);
    Logger.log(`YKLiba_Config.js getValuesFromConfigSheetY 0 sheet=${sheet}`)
    return this.getValuesFromConfigSheet(sheet)
  }

  static getFolderInfoList(values) {
    let folderInfoList = []
    let item
    for (let i = 0; i < values.length; i++) {
      item = values[i]
      if (item[0] === "folder") {
        folderInfoList << Code.convertItemToFolderInfo(i, item);
      }
    }

    const folderInfoHash = {}
    folderInfoList.forEach((info) => {
      folderInfoHash[info.name] = info
    })
    return [folderInfoList, folderInfoHash]
  }

  static getFolderInfoHash(values) {
    const [folderInfoList, folderInfoHash] = this.getFolderInfoList(values)
    return folderInfoHash
  }

  static getValuesFromConfigSheet(sheet) {
    return Base.getSimpleRows(sheet)
  }

  static getFolderIdByKey(key, argFolderInfoHash = null) {
    let folderInfoHash
    if (argFolderInfoHash === null) {
      const values = this.getValuesFromConfigSheetX()
      Log.debug(values)
      folderInfoHash = this.getFolderInfoHash(values)
    }
    else {
      folderInfoHash = argGetFolderInfoHash
    }
    Log.debug(folderInfoHash)
    const folderInfo = folderInfoHash[key]
    return folderInfo.folder_id
  }

  static getFolderById(folderId) {
    return DriveApp.getFolderById(folderId)
  }

  static getFolderByKey(key) {
    const folderId = this.getFolderIdByKey(key)
    return this.getFolderById(folderId)
  }
}

this.Config0 = Config0;