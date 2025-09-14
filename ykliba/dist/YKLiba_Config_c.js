// Import required classes
// Config0 class for configuration operations

class Config {
  /**
   * 行を追加する操作を表す定数値を返す
   * @returns {number} 行追加操作を示す値（1）
   */
  static ADDUNDERROW() {
    return 1;
  }

  /**
   * 書き換え操作を表す定数値を返す
   * @returns {number} 書き換え操作を示す値（2）
   */
  static REWRITE() {
    return 2;
  }

  /**
   * 指定されたキーのフォルダ情報の最後の日付を更新する
   * @param {Array} values - 設定シートの値配列
   * @param {string} key - 更新対象のフォルダキー
   * @param {*} update_value - 更新する値
   */
  static updateFolderInfoListAtLastDate(values, key, update_value) {
    this.updateFolderInfoList(values, 4, key, update_value);
  }

  /**
   * フォルダ情報リストの指定されたインデックスの値を更新する
   * @param {Array} values - 設定シートの値配列
   * @param {number} index - 更新する配列のインデックス
   * @param {string} key - 更新対象のフォルダキー
   * @param {*} update_value - 更新する値
   */
  static updateFolderInfoList(values, index, key, update_value) {
    for(let i = 0; i < values.length; i++ ) {
      if ( values[i][0] === "folder" ) {
        if ( values[i][1] === key ) {
          values[i][index] = update_value;
        }
      }
    }
  }

  /**
   * 指定されたキーのフォルダ情報から最後の日付を取得する
   * @param {string} key - 取得対象のフォルダキー
   * @param {Object|null} arg_folder_info_hash - フォルダ情報ハッシュ（省略時は設定シートから取得）
   * @returns {*} フォルダ情報の最後の日付
   */
  static getLastDateByKey(key, arg_folder_info_hash = null) {
    let folder_info_hash;
    if( arg_folder_info_hash === null) {
      // const values = Config0.getValuesFromConfigSheetX();
      // folder_info_hash = Config0.getFolderInfoHash(values);
      folder_info_hash = {};
    }
    else {
      folder_info_hash = arg_folder_info_hash;
    }
    const folder_info = folder_info_hash[key];
    return folder_info.last_date;
  }
}
this.Config = Config;