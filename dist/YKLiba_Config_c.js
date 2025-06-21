class Config {
  static addUnderRow() {
    return 1;
  }

  static rewrite() {
    return 2;
  }

  static updateFolderInfoListAtLastDate(values, key, update_value) {
    this.updateFolderInfoList(values, 4, key, update_value);
  }

  static updateFolderInfoList(values, index, key, update_value) {
    for(let i = 0; i < values.length; i++ ) {
      if ( values[i][0] === "folder" ) {
        if ( values[i][1] === key ) {
          values[i][index] = update_value;
        }
      }
    }
  }

  static getLastDateByKey(key, arg_folder_info_hash = null) {
    let folder_info_hash;
    if( arg_folder_info_hash === null) {
      const values = Config0.getValuesFromConfigSheetX();
      folder_info_hash = Config0.getFolderInfoHash(values);
    }
    else {
      folder_info_hash = arg_folder_info_hash;
    }
    const folder_info = folder_info_hash[key];
    return folder_info.last_date;
  }
}
this.Config = Config;