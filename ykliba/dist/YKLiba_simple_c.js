class Simple {
  /**
   * 環境設定を使用してシートからシンプルな行データを取得する
   * @param {Object} env - 環境設定オブジェクト（ss_id, sheet_nameを含む）
   * @param {Object|null} maxRange - 最大範囲制限（h, wプロパティを含む）
   * @returns {Array} シートの値の配列
   */
  static getSimpleRowsWithEnv(env, maxRange = null) {
    const [ss, sheet] = get_spreadsheet(env.ss_id, env.sheet_name);
    const values = this.getSimpleRows(sheet, maxRange);
    return values;
  }

  /**
   * シートからシンプルな行の範囲を計算して取得する
   * @param {Object} sheetx - シートオブジェクト
   * @returns {Range} シンプルな行の範囲
   */
  static simpleRowsRangeX(sheetx) {
    const [values, range] = this.getSimpleRowsAndRange(sheetx);

    const tl_bl_Point = getRelativeCordinatesOfTLandBL(values);

    const rindex = get_rindex(values[0]);
    const simple_width = rindex;
    const shape = getRelativeCordinatesOfTLandBlandTRandBR(values);
    const simple_range = range.offset(shape.tl.y, shape.tl.x, (shape.bl.y - shape.tl.y), simple_width);
    return simple_range;
  }

  /**
   * シートからシンプルな行の値を取得する
   * @param {Object} sheetx - シートオブジェクト
   * @returns {Array} シンプルな行の値の配列
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
   */
  static getSimpleRowsRange(sheet) {
    return getValidRange(sheet);
  }

  /**
   * 範囲を指定された最大高さ・幅に調整する
   * @param {Range} range - 調整対象の範囲
   * @param {number} maxH - 最大高さ
   * @param {number} maxW - 最大幅
   * @returns {Range} 調整された範囲
   */
  static adjustRange(range, maxH, maxW) {
    const rangeShape = getRangeShape(range);
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
   */
  static getSimpleRows(sheet, maxRange = null) {
    const range = this.getSimpleRowsRange(sheet);
    let values = [];
    YKLiblog.Log.debug(`YKLiba_simple.js getSimpleRows 0 range=${range}`);
    if (range !== null) {
      if (maxRange !== null) {
        const newRange = this.adjustRange(range, maxRange.h, maxRange.w);
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
   */
  static getSimpleRowsAndRange(sheet, maxRange = null) {
    const range = get_valid_range(sheet);
    let values = [];
    if (range !== null && maxRange !== null) {
      const newRange = this.adjustRange(range, maxRange.h, maxRange.w);
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
   */
  static getSimpleRowsAndRangeX(ss_id, sheet_name, maxRange = null) {
    const [ss, sheet, sheets, sheets_by_name] = get_spreadsheet_ex(ss_id, sheet_name);
    const sheetx = sheets_by_name[sheet_name];
    return this.getSimpleRowsAndRange(sheetx, maxRange);
  }
}
this.Simple = Simple;