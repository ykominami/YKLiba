function get_config_ss_id() {
  const ss_id = "1KtGdnnpj8k_bkxfYITalK193nRlVXiN0o_YiASO5KNs"
  return ss_id
}
function get_config_sheetname(){
  return "INFO"
}

function get_values_from_config_sheet_x(){
  const sheet = get_config_sheet()
  return get_values_from_config_sheet(sheet)
}

function get_folder_info_hash(values){
  const [folder_info_list, folder_info_hash] = get_folder_info_list(values)
  return folder_info_hash
}

function get_config_sheet(){
  const ss_id = get_config_ss_id()
  const sheetname = get_config_sheetname()
  const [ss, sheet] = get_spreadsheet(ss_id, sheetname)

  return sheet
}

function get_values_from_config_sheet(sheet){
  return get_simple_rows(sheet)
}

function update_folder_info_list_at_last_date(values, key, update_value){
  update_folder_info_list(values, 4, key, update_value)
}

function make_folder_info( name, id, url, last_date ){
  return  { 
    name: name,
    folder_id: id,
    folder_url: url,
    last_date: last_date
  }
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

function get_folder_info_list(values){
  const folder_info_list = values.map( (item) => {
    if ( item[0] === "folder" ){
      const name = item[1]
      const id = item[2]
      const url = item[3]
      const last_date = item[4]
      return make_folder_info(name, id, url, last_date)
    }
  } )

  const folder_info_hash = {}
  folder_info_list.map( (info) => {
    folder_info_hash[info.name] = info
  } )
  // Log.debug( folder_info_list )
  return [folder_info_list, folder_info_hash]
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

function get_folder_id_by_key(key, arg_folder_info_hash = null){
  let folder_info_hash
  if( arg_folder_info_hash === null){
    const values = get_values_from_config_sheet_x()
    Log.debug(values)
    folder_info_hash = get_folder_info_hash(values)
  }
  else{
    folder_info_hash = arg_get_folder_info_hash
  }
  Log.debug(folder_info_hash)
  const folder_info = folder_info_hash[key]
  return folder_info.folder_id
}

function get_folder_by_id(folder_id){
  return DriveApp.getFolderById(folder_id)
}

function get_folder_by_key(key){
  const folder_id = get_folder_id_by_key(key)
  return get_folder_by_id(folder_id)
}

