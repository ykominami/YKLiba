function configADD_UNDER_ROW(){
  return 1;
}
function configREWRITE(){
  return 2;
}
function update_folder_info_list_at_last_date(values, key, update_value){
  update_folder_info_list(values, 4, key, update_value)
}

function update_folder_info_list(values, index, key, update_value){
  for(let i = 0; i < values.length; i++ ){
    if ( values[i][0] === "folder" ){
      if ( values[i][1] === key ){
        values[i][index] = update_value
      }
    }
  }
}
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
