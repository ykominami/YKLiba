function get_config_sheet(sheetname = null){
  const ss_id = PropertiesService.getScriptProperties().getProperty('CONFIG_SPREADSHEET_ID');
  if( sheetname === null){
    sheetname = PropertiesService.getScriptProperties().getProperty('CONFIG_SHEETNAME');
  }

  const [ss, sheet] = get_spreadsheet(ss_id, sheetname)

  return sheet
}

function get_values_from_config_sheet_x(){
  const sheet = get_config_sheet()
  Log.debug(`YKLiba_Config.js get_values_from_config_sheet_x 0 sheet=${sheet}`)
  return get_values_from_config_sheet(sheet)
}

function get_values_from_config_sheet_y(){
  const sheetname = PropertiesService.getScriptProperties().getProperty('CONFIG2_SHEETNAME');
  const sheet = get_config_sheet(sheetname);
  Log.debug(`YKLiba_Config.js get_values_from_config_sheet_y 0 sheet=${sheet}`)
  return get_values_from_config_sheet(sheet)
}

function get_values_from_config_sheet(sheet){
  return get_simple_rows(sheet)
}

function get_folder_by_id(folderId){
  return DriveApp.getFolderById(folderId)
}

