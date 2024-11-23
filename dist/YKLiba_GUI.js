function SortGUI_x(env, array){
  const config = make_config_2(env, array);
  return SortGUI(config)
}

function SortGUI(config){
  const sheet = SpreadsheetApp.getActiveSheet();
  return Sortx(sheet, config);
}
