/**
 * 設定で行の下に追加する場合の値を返す
 * @returns {number} 1
 */
function configADD_UNDER_ROW(){
  return 1;
}

/**
 * 設定で書き換える場合の値を返す
 * @returns {number} 2
 */
function configREWRITE(){
  return 2;
}

/**
 * フォルダ情報リストの最終日付を更新する
 * @param {Array} values - フォルダ情報の配列
 * @param {string} key - 更新対象のキー
 * @param {string} update_value - 更新する値
 */
function update_folder_info_list_at_last_date(values, key, update_value){
  update_folder_info_list(values, 4, key, update_value)
}

/**
 * フォルダ情報リストの指定されたインデックスの値を更新する
 * @param {Array} values - フォルダ情報の配列
 * @param {number} index - 更新するインデックス
 * @param {string} key - 更新対象のキー
 * @param {string} update_value - 更新する値
 */
function update_folder_info_list(values, index, key, update_value){
  for(let i = 0; i < values.length; i++ ){
    if ( values[i][0] === "folder" ){
      if ( values[i][1] === key ){
        values[i][index] = update_value
      }
    }
  }
}

/**
 * 指定されたキーの最終日付を取得する
 * @param {string} key - 取得対象のキー
 * @param {Object|null} arg_folder_info_hash - フォルダ情報ハッシュ（省略時は設定シートから取得）
 * @returns {string} 最終日付
 */
function get_last_date_by_key(key, arg_folder_info_hash = null){
  let folder_info_hash
  if( arg_folder_info_hash === null){
    const values = get_values_from_config_sheet_x()
    folder_info_hash = get_folder_info_hash(values)
  }
  else{
    folder_info_hash = arg_folder_info_hash
  }
  const folder_info = folder_info_hash[key]
  return folder_info.last_date
}
