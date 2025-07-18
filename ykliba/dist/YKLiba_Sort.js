/**
 * Sorts data using CUI (Command User Interface) with environment and sort options
 * @param {Object} env - Environment configuration object
 * @param {Array} sort_option_array - Array of sort options
 * @returns {Range} The sorted range
 */
function SortCUI_x(env, sort_option_array) {
  const config = make_config_2(env, sort_option_array);
  Log.debug(config);
  return SortCUI(config);
}

/**
 * Sorts data using CUI (Command User Interface) with configuration
 * @param {Object} config - Configuration object containing spreadsheet and sort settings
 * @returns {Range} The sorted range
 */
function SortCUI(config) {
  const [ss, sheet] = get_spreadsheet(config.ss_id, config.sheet_name);
  return Sortx(sheet, config);
}

/**
 * Sorts data using GUI (Graphical User Interface) with environment and array
 * @param {Object} env - Environment configuration object
 * @param {Array} array - Array of sort options
 * @returns {Range} The sorted range
 */
function SortGUI_x(env, array) {
  const config = makeConfig2(env, array);
  return SortGUI(config);
}

/**
 * Sorts data using GUI (Graphical User Interface) with configuration
 * @param {Object} config - Configuration object containing sort settings
 * @returns {Range} The sorted range
 */
function SortGUI(config) {
  const sheet = SpreadsheetApp.getActiveSheet();
  return Sortx(sheet, config);
}

/**
 * Sorts data within a specific range using sort options
 * @param {Range} dataRange - The range to be sorted
 * @param {Object} sortOptions - Sort options configuration
 * @returns {Range} The sorted range
 */
function Sortx_in_range_x(dataRange, sortOptions) {
  const sortOptionArray = make_field_condition_2(sortOptions);

  Log.debug(`Sortx_in_range sortOptionArray=${JSON.stringify(sortOptionArray)}`);
  dataRange.activate()
    .sort(sortOptionArray);
  return dataRange;
}

/**
 * Sorts data within a specific range using configuration
 * @param {Range} dataRange - The range to be sorted
 * @param {Object} config - Configuration object containing sort settings
 * @returns {Range} The sorted range
 */
function Sortx_in_range(dataRange, config) {
  const column = dataRange.getColumn();

  Log.debug(`Sortx_in_range config=${JSON.stringify(config)}`);
  Log.debug(`Sortx_in_range column=${column} config.sortOptions=${config.sortOptions}`);

  return Sortx_in_range_x(dataRange, config.sortOptions);
}

/**
 * Sorts data in a sheet using configuration
 * @param {Sheet} sheet - The sheet to sort
 * @param {Object} config - Configuration object containing sort settings
 * @param {Object} adujst - Optional adjustment parameters
 * @returns {Range} The sorted range
 */
function Sortx(sheet, config, adujst = null) {
  const [headerRange, dataRange] = get_range_of_header_and_data(sheet, adujst);
  const range = Sortx_in_range(dataRange, config);
  return range;
}

/**
 * Divides a range into header and data ranges with optional adjustment
 * @param {Range} range - The range to divide
 * @param {Object} arg_adjust - Optional adjustment parameters
 * @returns {Array} Array containing [header_range, data_range]
 */
function divide_range(range, arg_adjust = null) {
  const shape = getRangeShape(range);
  const adjust = get_valid_adjust(arg_adjust);

  const newRange = range.offset(adjust.r, adjust.c, shape.h + adjust.h, shape.w + adjust.w);
  const height = newRange.getHeight();
  const header_range = newRange.offset(0, 0, 1);
  const data_range = newRange.offset(1, 0, height - 1);

  return [header_range, data_range];
}

/**
 * Sorts a range using environment and sort option
 * @param {Range} range - The range to sort
 * @param {Object} env - Environment configuration object
 * @param {Object} sortOption - Sort option configuration
 * @returns {Range} The sorted range
 */
function sortOp(range, env, sortOption) {
  const config = make_config_2(env, sortOption);
  const sortedRange = Sortx_in_range(range, config);
  return sortedRange;
}
