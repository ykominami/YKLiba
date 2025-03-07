function get_values_from_config_sheet_x(){
  const sheet = get_config_sheet()
  Logger.log(`YKLiba_Config.js get_values_from_config_sheet_x 0 sheet=${sheet}`)
  return get_values_from_config_sheet(sheet)
}

function get_values_from_config_sheet_y(){
  const sheetname = PropertiesService.getScriptProperties().getProperty('CONFIG2_SHEETNAME');
  const sheet = get_config_sheet(sheetname);
  Logger.log(`YKLiba_Config.js get_values_from_config_sheet_y 0 sheet=${sheet}`)
  return get_values_from_config_sheet(sheet)
}

function get_folder_info_hash(values){
  const [folder_info_list, folder_info_hash] = get_folder_info_list(values)
  return folder_info_hash
}

function get_config_sheet(sheetname = null){
  const ss_id = PropertiesService.getScriptProperties().getProperty('CONFIG_SPREADSHEET_ID');
  if( sheetname === null){
    sheetname = PropertiesService.getScriptProperties().getProperty('CONFIG_SHEETNAME');
  }

  const [ss, sheet] = get_spreadsheet(ss_id, sheetname)

  return sheet
}

function get_values_from_config_sheet(sheet){
  return get_simple_rows(sheet)
}

function get_folder_info_list(values){
  let folder_info_list = []
  let item
  let index, index_name, index_condition, index_id, index_url, index_last_date
  for( let i=0; i<values.length; i++ ) {
    item = values[i]
    if ( item[0] === "folder" ){
      folder_info_list << convertItemToFolderInfo(i, item);
    }
  }

  const folder_info_hash = {}
  folder_info_list.map( (info) => {
    folder_info_hash[info.name] = info
  } )
  // Log.debug( folder_info_list )
  return [folder_info_list, folder_info_hash]
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

