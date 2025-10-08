// Import required classes
// Base class for spreadsheet operations
// Arrayx class for array operations
// Utils class for utility functions
// Range class for range operations
// YKLiblog class for logging operations

/**
 * シンプルなスプレッドシート操作を提供するクラス
 * 基本的なデータ取得、範囲調整、環境設定ベースの操作機能を提供する
 * 簡潔なAPIでスプレッドシートの行データを効率的に処理する機能を実装
 */
class Simple {
  /**
   * 環境設定を使用してシートからシンプルな行データを取得する
   * @param {Object} env - 環境設定オブジェクト（ss_id, sheet_nameを含む）
   * @param {Object|null} maxRange - 最大範囲制限（h, wプロパティを含む）
   * @returns {Array} シートの値の配列
   * @throws {Error} Base.getSpreadsheetで無効なスプレッドシートIDまたはシート名でエラーが発生した場合
   * @throws {Error} Simple.getSimpleRowsメソッドでエラーが発生した場合
   */
  static getSimpleRowsWithEnv(env, maxRange = null) {
    const [ss, sheet] = Base.getSpreadsheet(env.ss_id, env.sheet_name);
    const values = Simple.getSimpleRows(sheet, maxRange);
    return values;
  }

  /**
   * シートからシンプルな行の範囲を計算して取得する
   * @param {Object} sheetx - シートオブジェクト
   * @returns {Range} シンプルな行の範囲
   * @throws {Error} Simple.getSimpleRowsAndRangeメソッドでエラーが発生した場合
   * @throws {Error} Arrayx.getRelativeCordinatesOfTLandBLやUtils.getRindexメソッドでエラーが発生した場合
   * @throws {Error} range.offset()メソッドで範囲外のオフセットを指定した場合
   */
  static simpleRowsRangeX(sheetx) {
    const [values, range] = Simple.getSimpleRowsAndRange(sheetx);

    const tl_bl_Point = Arrayx.getRelativeCordinatesOfTLandBL(values);

    const rindex = Utils.getRindex(values[0]);
    const simple_width = rindex;
    const shape = Arrayx.getRelativeCordinatesOfTLandBlandTRandBR(values);
    const simple_range = range.offset(shape.tl.y, shape.tl.x, (shape.bl.y - shape.tl.y), simple_width);
    return simple_range;
  }

  /**
   * シートからシンプルな行の値を取得する
   * @param {Object} sheetx - シートオブジェクト
   * @returns {Array} シンプルな行の値の配列
   * @throws {Error} simpleRowsRangeXメソッドでエラーが発生した場合
   * @throws {Error} simple_range.getValues()メソッド呼び出しが失敗した場合
   */
  static simpleRowsX(sheetx) {
    const simple_range = this.simpleRowsRangeX(sheetx);
    const v = simple_range.getValues();
    return v;
  }

  /**
   * シートから有効な範囲を取得する
   * @param {Object} sheet - シートオブジェクト
   * @returns {Range} 有効な範囲
   * @throws {Error} Range.getValidRangeメソッドでエラーが発生した場合
   */
  static getSimpleRowsRange(sheet) {
    return Range.getValidRange(sheet);
  }

  /**
   * 範囲を指定された最大高さ・幅に調整する
   * @param {Range} range - 調整対象の範囲
   * @param {number} maxH - 最大高さ
   * @param {number} maxW - 最大幅
   * @returns {Range} 調整された範囲
   * @throws {Error} rangeがnullの場合
   * @throws {Error} Range.getRangeShapeやrange.offset()メソッドでエラーが発生した場合
   */
  static adjustRange(range, maxH, maxW) {
    if( range === null){
      return null
    }
    const rangeShape = Range.getRangeShape(range);
    let w = 0;
    let h = 0;
    if (maxH < rangeShape.h) {
      h = maxH;
    }
    else {
      h = rangeShape.h;
    }
    if (maxW < rangeShape.w) {
      w = maxW;
    }
    else {
      w = rangeShape.w;
    }
    return range.offset(0, 0, h, w);
  }

  /**
   * シートからシンプルな行データを取得する
   * @param {Object} sheet - シートオブジェクト
   * @param {Object|null} maxRange - 最大範囲制限（h, wプロパティを含む）
   * @returns {Array} シートの値の配列
   * @throws {Error} getSimpleRowsRangeメソッドでエラーが発生した場合
   * @throws {Error} Simple.adjustRangeやgetValues()メソッドでエラーが発生した場合
   */
  static getSimpleRows(sheet, maxRange = null) {
    const range = this.getSimpleRowsRange(sheet);
    let values = [];
    YKLiblog.Log.debug(`YKLiba_simple.js getSimpleRows 0 range=${range}`);
    if (range !== null) {
      if (maxRange !== null) {
        const newRange = Simple.adjustRange(range, maxRange.h, maxRange.w);
        values = newRange.getValues();
      }
      else {
        values = range.getValues();
      }
      YKLiblog.Log.debug(`YKLiba_simple.js getSimpleRows 1`);
    }
    return values;
  }

  /**
   * シートからシンプルな行データと範囲を取得する
   * @param {Object} sheet - シートオブジェクト
   * @param {Object|null} maxRange - 最大範囲制限（h, wプロパティを含む）
   * @returns {Array} [値の配列, 範囲]の配列
   * @throws {Error} Range.getValidRangeメソッドでエラーが発生した場合
   * @throws {Error} Simple.adjustRangeやgetValues()メソッドでエラーが発生した場合
   */
  static getSimpleRowsAndRange(sheet, maxRange = null) {
    const range = Range.getValidRange(sheet);
    let values = [];
    if (range !== null && maxRange !== null) {
      const newRange = Simple.adjustRange(range, maxRange.h, maxRange.w);
      values = newRange.getValues();
    }
    return [values, newRange];
  }

  /**
   * スプレッドシートIDとシート名を使用してシンプルな行データと範囲を取得する
   * @param {string} ss_id - スプレッドシートID
   * @param {string} sheet_name - シート名
   * @param {Object|null} maxRange - 最大範囲制限（h, wプロパティを含む）
   * @returns {Array} [値の配列, 範囲]の配列
   * @throws {Error} Base.getSpreadsheetExで無効なスプレッドシートIDまたはシート名でエラーが発生した場合
   * @throws {Error} sheets_by_nameに指定されたsheet_nameが存在しない場合
   * @throws {Error} Simple.getSimpleRowsAndRangeメソッドでエラーが発生した場合
   */
  static getSimpleRowsAndRangeX(ss_id, sheet_name, maxRange = null) {
    const [ss, sheet, sheets, sheets_by_name] = Base.getSpreadsheetEx(ss_id, sheet_name);
    const sheetx = sheets_by_name[sheet_name];
    return Simple.getSimpleRowsAndRange(sheetx, maxRange);
  }
}
this.Simple = Simple;