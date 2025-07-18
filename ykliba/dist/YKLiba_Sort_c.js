class Sort {
  /**
   * 環境設定とソートオプション配列を受け取り、設定を構築してソートを実行する
   * @param {Object} env - 環境設定オブジェクト
   * @param {Array} sort_option_array - ソートオプションの配列
   * @returns {Range} ソートされた範囲
   */
  static sortCuiX(env, sort_option_array) {
    const config = make_config_2(env, sort_option_array);
    Log.debug(config);
    return Sort.sortCui(config);
  }

  /**
   * 設定オブジェクトを受け取り、スプレッドシートを取得してソートを実行する
   * @param {Object} config - ソート設定オブジェクト
   * @returns {Range} ソートされた範囲
   */
  static sortCui(config) {
    const [ss, sheet] = get_spreadsheet(config.ss_id, config.sheet_name);
    return Sort.sortX(sheet, config);
  }

  /**
   * 環境設定と配列を受け取り、設定を構築してGUIソートを実行する
   * @param {Object} env - 環境設定オブジェクト
   * @param {Array} array - ソート設定の配列
   * @returns {Range} ソートされた範囲
   */
  static sortGuiX(env, array) {
    const config = makeConfig2(env, array);
    return Sort.sortGui(config);
  }

  /**
   * 設定オブジェクトを受け取り、アクティブシートでソートを実行する
   * @param {Object} config - ソート設定オブジェクト
   * @returns {Range} ソートされた範囲
   */
  static sortGui(config) {
    const sheet = SpreadsheetApp.getActiveSheet();
    return Sort.sortX(sheet, config);
  }

  /**
   * データ範囲とソートオプションを受け取り、範囲内でソートを実行する
   * @param {Range} dataRange - ソート対象のデータ範囲
   * @param {Object} sortOptions - ソートオプション
   * @returns {Range} ソートされた範囲
   */
  static sortXInRangeX(dataRange, sortOptions) {
    const sortOptionArray = make_field_condition_2(sortOptions);

    Log.debug(`sortXInRange sortOptionArray=${JSON.stringify(sortOptionArray)}`);
    dataRange.activate()
      .sort(sortOptionArray);
    return dataRange;
  }

  /**
   * データ範囲と設定オブジェクトを受け取り、範囲内でソートを実行する
   * @param {Range} dataRange - ソート対象のデータ範囲
   * @param {Object} config - ソート設定オブジェクト
   * @returns {Range} ソートされた範囲
   */
  static sortXInRange(dataRange, config) {
    const column = dataRange.getColumn();

    Log.debug(`sortXInRange config=${JSON.stringify(config)}`);
    Log.debug(`sortXInRange column=${column} config.sortOptions=${config.sortOptions}`);

    return Sort.sortXInRangeX(dataRange, config.sortOptions);
  }

  /**
   * シートと設定オブジェクトを受け取り、ヘッダーとデータ範囲を取得してソートを実行する
   * @param {Sheet} sheet - 対象シート
   * @param {Object} config - ソート設定オブジェクト
   * @param {Object} adujst - 調整オブジェクト（オプション）
   * @returns {Range} ソートされた範囲
   */
  static sortX(sheet, config, adujst = null) {
    const [headerRange, dataRange] = get_range_of_header_and_data(sheet, adujst);
    const range = Sort.sortXInRange(dataRange, config);
    return range;
  }

  /**
   * 範囲をヘッダー部分とデータ部分に分割する
   * @param {Range} range - 分割対象の範囲
   * @param {Object} arg_adjust - 調整オブジェクト（オプション）
   * @returns {Array} [ヘッダー範囲, データ範囲]の配列
   */
  static divideRange(range, arg_adjust = null) {
    const shape = getRangeShape(range);
    const adjust = get_valid_adjust(arg_adjust);

    const newRange = range.offset(adjust.r, adjust.c, shape.h + adjust.h, shape.w + adjust.w);
    const height = newRange.getHeight();
    const header_range = newRange.offset(0, 0, 1);
    const data_range = newRange.offset(1, 0, height - 1);

    return [header_range, data_range];
  }

  /**
   * 範囲、環境設定、ソートオプションを受け取り、範囲内でソートを実行する
   * @param {Range} range - ソート対象の範囲
   * @param {Object} env - 環境設定オブジェクト
   * @param {Object} sortOption - ソートオプション
   * @returns {Range} ソートされた範囲
   */
  static sortOp(range, env, sortOption) {
    const config = make_config_2(env, sortOption);
    const sortedRange = Sort.sortXInRange(range, config);
    return sortedRange;
  }
}
this.Sort = Sort;