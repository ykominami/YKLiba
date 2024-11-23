function SortCUI_x(env, array){
  const config = make_config_2(env, array);
  display_log( config );
  // SortCUI_a_a_a(env);
  return SortCUI(config)
}

function SortCUI(config){
  [ss, sheet] = get_spreadsheet(config.ss_id, config.sheet_name)
  return Sortx(sheet, config);
}
