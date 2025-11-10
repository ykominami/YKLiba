// Import required classes
// Base class for spreadsheet operations
// Misc class for utility functions
// Code class for code operations
// Range class for range operations
// YKLiblog class for logging operations

/**
 * スプレッドシートのソート機能を提供するクラス
 * CUIとGUIの両方でのソート操作、複数条件でのソート、範囲指定ソート機能を提供する
 * Google Apps Scriptのスプレッドシートソート機能を拡張した高度なソート操作を実装
 */
class Sort {
  /**
   * 設定オブジェクトを受け取り、スプレッドシートを取得してソートを実行する
   * @param {Object} config - ソート設定オブジェクト
   * @returns {Range} ソートされた範囲
   * @throws {Error} Base.getSpreadsheetで無効なスプレッドシートIDまたはシート名でエラーが発生した場合
   * @throws {Error} Sort.sortXメソッドでエラーが発生した場合
   */
  static sortCui(config) {
    const [ss, sheet] = Base.getSpreadsheet(config.ss_id, config.sheet_name);
    return Sort.sortX(sheet, config);
  }

  /**
   * 環境設定と配列を受け取り、設定を構築してGUIソートを実行する
   * @param {Object} env - 環境設定オブジェクト
   * @param {Array} array - ソート設定の配列
   * @returns {Range} ソートされた範囲
   * @throws {Error} Misc.makeConfig2メソッドでエラーが発生した場合
   * @throws {Error} Sort.sortGuiメソッドでエラーが発生した場合
   */
  static sortGuiX(env, array) {
    const config = Misc.makeConfig2(env, array);
    return Sort.sortGui(config);
  }

  /**
   * 設定オブジェクトを受け取り、アクティブシートでソートを実行する
   * @param {Object} config - ソート設定オブジェクト
   * @returns {Range} ソートされた範囲
   * @throws {Error} SpreadsheetApp.getActiveSheet()でアクティブシートが取得できない場合
   * @throws {Error} Sort.sortXメソッドでエラーが発生した場合
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
   * @throws {Error} Misc.makeFieldCondition2メソッドでエラーが発生した場合
   * @throws {Error} dataRange.activate()やsort()メソッド呼び出しが失敗した場合
   */
  static sortXInRangeX(dataRange, sortOptions) {
    const sortOptionArray = Misc.makeFieldCondition2(sortOptions);

    YKLiblog.Log.debug(`sortXInRange sortOptionArray=${JSON.stringify(sortOptionArray)}`);
    dataRange.activate()
      .sort(sortOptionArray);
    return dataRange;
  }

  /**
   * データ範囲と設定オブジェクトを受け取り、範囲内でソートを実行する
   * @param {Range} dataRange - ソート対象のデータ範囲
   * @param {Object} config - ソート設定オブジェクト
   * @returns {Range} ソートされた範囲
   * @throws {Error} dataRange.getColumn()メソッド呼び出しが失敗した場合
   * @throws {Error} Sort.sortXInRangeXメソッドでエラーが発生した場合
   */
  static sortXInRange(dataRange, config) {
    const column = dataRange.getColumn();

    YKLiblog.Log.debug(`sortXInRange config=${JSON.stringify(config)}`);
    YKLiblog.Log.debug(`sortXInRange column=${column} config.sortOptions=${config.sortOptions}`);

    return Sort.sortXInRangeX(dataRange, config.sortOptions);
  }

  /**
   * シートと設定オブジェクトを受け取り、ヘッダーとデータ範囲を取得してソートを実行する
   * @param {Sheet} sheet - 対象シート
   * @param {Object} config - ソート設定オブジェクト
   * @param {Object} adujst - 調整オブジェクト（オプション）
   * @returns {Range} ソートされた範囲
   * @throws {Error} Code.getRangeOfHeaderAndDataでエラーが発生した場合
   * @throws {Error} Sort.sortXInRangeメソッドでエラーが発生した場合
   */
  static sortX(sheet, config, adujst = null) {
    const [headerRange, dataRange] = Code.getRangeOfHeaderAndData(sheet, adujst);
    const range = Sort.sortXInRange(dataRange, config);
    return range;
  }

  /**
   * 範囲をヘッダー部分とデータ部分に分割する
   * @param {Range} range - 分割対象の範囲
   * @param {Object} arg_adjust - 調整オブジェクト（オプション）
   * @returns {Array} [ヘッダー範囲, データ範囲]の配列
   * @throws {Error} rangeがnullの場合
   * @throws {Error} Range.getRangeShapeやMisc.getValidAdjustメソッドでエラーが発生した場合
   * @throws {Error} range.offset()やgetHeight()メソッド呼び出しが失敗した場合
   */
  static divideRange(range, arg_adjust = null) {
    if( range === null){
      return [null, null]
    }
    const shape = Range.getRangeShape(range);
    const adjust = Misc.getValidAdjust(arg_adjust);

    const newRange = range.offset(adjust.r, adjust.c, shape.h + adjust.h, shape.w + adjust.w);
    const height = newRange.getHeight();
    const header_range = newRange.offset(0, 0, 1);
    const data_range = newRange.offset(1, 0, height - 1);

    return [header_range, data_range];
  }
}
this.Sort = Sort;