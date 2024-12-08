function SortCUI_x(env, sort_option_array){
  const config = make_config_2(env, sort_option_array);
  Log.debug( config );
  return SortCUI(config);
}

function SortCUI(config){
  let [ss, sheet] = get_spreadsheet(config.ss_id, config.sheet_name);
  return Sortx(sheet, config);
}

function SortGUI_x(env, array){
  const config = make_config_2(env, array);
  return SortGUI(config);
}

function SortGUI(config){
  const sheet = SpreadsheetApp.getActiveSheet();
  return Sortx(sheet, config);
}

function Sortx_in_range_x(data_range, sort_options) {
  let sort_option_array = make_field_condition_2( sort_options );

  Log.debug(`Sortx_in_range sort_option_array=${ JSON.stringify(sort_option_array) }`);
  data_range.activate()
  .sort(sort_option_array);
  return data_range;
}
function Sortx_in_range(data_range, config) {
  const column = data_range.getColumn();

  Log.debug(`Sortx_in_range config=${JSON.stringify(config)}`);
  Log.debug(`Sortx_in_range column=${column} config.sort_options=${config.sort_options}`);

  return Sortx_in_range_x(data_range, config.sort_options);
}
function Sortx(sheet,config, adujst=null) {
  let [header_range, data_range] = get_range_of_header_and_data(sheet,adujst);
  const range = Sortx_in_range(data_range, config);
  return range;
}
function divide_range(range, arg_adjust=null){
  const shape = getRangeShape(range);
  const adjust = get_valid_adjust(arg_adjust);

  const newRange = range.offset(adjust.r, adjust.c, shape.h + adjust.h, shape.w + adjust.w);
  const height = newRange.getHeight();
  const header_range = newRange.offset(0, 0, 1);
  const data_range = newRange.offset(1, 0, height - 1);

  return [header_range, data_range];
}

function sortOp(range, env, sortOption){
  const config = make_config_2(env, sortOption);
  const sortedRange = Sortx_in_range(range, config);
  return sortedRange;
}

