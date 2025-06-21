class Sort {
  static sortCuiX(env, sort_option_array) {
    const config = make_config_2(env, sort_option_array);
    Log.debug(config);
    return Sort.sortCui(config);
  }

  static sortCui(config) {
    const [ss, sheet] = get_spreadsheet(config.ss_id, config.sheet_name);
    return Sort.sortX(sheet, config);
  }

  static sortGuiX(env, array) {
    const config = makeConfig2(env, array);
    return Sort.sortGui(config);
  }

  static sortGui(config) {
    const sheet = SpreadsheetApp.getActiveSheet();
    return Sort.sortX(sheet, config);
  }

  static sortXInRangeX(dataRange, sortOptions) {
    const sortOptionArray = make_field_condition_2(sortOptions);

    Log.debug(`sortXInRange sortOptionArray=${JSON.stringify(sortOptionArray)}`);
    dataRange.activate()
      .sort(sortOptionArray);
    return dataRange;
  }

  static sortXInRange(dataRange, config) {
    const column = dataRange.getColumn();

    Log.debug(`sortXInRange config=${JSON.stringify(config)}`);
    Log.debug(`sortXInRange column=${column} config.sortOptions=${config.sortOptions}`);

    return Sort.sortXInRangeX(dataRange, config.sortOptions);
  }

  static sortX(sheet, config, adujst = null) {
    const [headerRange, dataRange] = get_range_of_header_and_data(sheet, adujst);
    const range = Sort.sortXInRange(dataRange, config);
    return range;
  }

  static divideRange(range, arg_adjust = null) {
    const shape = getRangeShape(range);
    const adjust = get_valid_adjust(arg_adjust);

    const newRange = range.offset(adjust.r, adjust.c, shape.h + adjust.h, shape.w + adjust.w);
    const height = newRange.getHeight();
    const header_range = newRange.offset(0, 0, 1);
    const data_range = newRange.offset(1, 0, height - 1);

    return [header_range, data_range];
  }

  static sortOp(range, env, sortOption) {
    const config = make_config_2(env, sortOption);
    const sortedRange = Sort.sortXInRange(range, config);
    return sortedRange;
  }
}
this.Sort = Sort;