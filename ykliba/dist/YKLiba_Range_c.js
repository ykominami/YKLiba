class Range {
  /**
   * シートからデータ範囲とその値を取得する
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - 対象のシート
   * @returns {Array} [range, values] - データ範囲とその値の配列
   */
  static getRangeAndValues(sheet) {
    let range = null;
    let values = null;
    if (sheet !== null && typeof (sheet) !== 'undefined') {
      range = sheet.getDataRange();
      values = range.getValues();
    }
    return [range, values];
  }

  /**
   * シートから有効なデータ範囲を取得する（空の行や列を除く）
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - 対象のシート
   * @returns {GoogleAppsScript.Spreadsheet.Range|null} 有効なデータ範囲
   */
  static getValidRange(sheet) {
    let newRange = null;
    const [range, values] = Range.getRangeAndValues(sheet);
    if ((range !== null && typeof (range) !== 'undefined') && values !== null) {
      const shape = Range.getRangeShape(range);
      const tlRelative = Range.getRelativeCordinatesOfTopLeft(values);

      const newHeight = shape.h - tlRelative.y;
      const newWidth = shape.w - tlRelative.x;
      newRange = range.offset(tlRelative.y, tlRelative.x, newHeight, newWidth);
    }
    return newRange;
  }

  /**
   * 範囲の形状情報を取得する
   * @param {GoogleAppsScript.Spreadsheet.Range} range - 対象の範囲
   * @returns {Object} 形状情報 {r: row, c: column, h: height, w: width}
   */
  static getRangeShape(range) {
    const column = range.getColumn();
    const row = range.getRow();
    const height = range.getHeight();
    const width = range.getWidth();

    return Misc.makeShape({
      r: row, c: column, h: height, w: width,
    });
  }

  /**
   * 範囲の形状情報をログに出力する
   * @param {Object} shape - 形状情報オブジェクト
   */
  static showRangeShape(shape) {
    Logger.log(`shape.r=${shape.r} shape.c=${shape.c} shape.h=${shape.h} shape.w=${shape.w}`)
  }

  /**
   * 範囲に値を設定する
   * @param {GoogleAppsScript.Spreadsheet.Range} range - 対象の範囲
   * @param {Array} values - 設定する値の2次元配列
   */
  static setValues(range, values) {
    range.setValues(values);
  }

  /**
   * データ範囲から指定した列の値を取得する
   * @param {GoogleAppsScript.Spreadsheet.Range} dataRange - データ範囲
   * @param {number} index - 列のインデックス
   * @returns {Array} 指定した列の値の配列
   */
  static getColumn(dataRange, index) {
    const dataArray = dataRange.getValues();
    return dataArray.map((row) => row[index]);
  }

  /**
   * シートに1行を挿入する
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - 対象のシート
   * @param {Object|null} argAdjust - 調整オプション
   */
  static insertOneRow(sheet, argAdjust = null) {
    const [header_range, dataRange] = Range.getRangeOfHeaderAndData(sheet, argAdjust);
    const shape = Range.getRangeShape(dataRange);
    const targetRange = dataRange.offset(0, 0, 1, shape.w);
    targetRange.insertCells(SpreadsheetApp.Dimension.COLUMNS);
  }

  /**
   * 配列をグループ化する
   * @param {Array} values - グループ化対象の配列
   * @param {Function} op - グループ化操作関数 (curVal) => [key, value]
   * @returns {Object} グループ化された結果のハッシュ
   */
  static grouping(values, op) {
    return values.reduce((hash, curVal, index) => {
      const [key, value] = op(curVal);
      if (typeof (hash[key]) === 'undefined') {
        hash[key] = [value];
      } else {
        hash[key] = [...hash[key], value];
      }
      return hash;
    }, {});
  }

  /**
   * 値を有効な文字列に変換する
   * @param {*} value - 変換対象の値
   * @returns {string} 文字列に変換された値（undefinedの場合は空文字）
   */
  static validString(value) {
    if (typeof (value) === 'undefined') {
      return '';
    }
    return value.toString();
  }

  /**
   * 2つの値を文字列として比較する
   * @param {*} a - 比較対象の値1
   * @param {*} b - 比較対象の値2
   * @returns {number} 比較結果（-1: a < b, 0: a == b, 1: a > b）
   */
  static compareWithString(a, b) {
    const aStr = Range.validString(a);
    const bStr = Range.validString(b);
    if (aStr < bStr) {
      return -1;
    }
    if (aStr > bStr) {
      return 1;
    }
    return 0;
  }

  /**
   * 配列をソートする
   * @param {Array} array - ソート対象の配列
   * @param {Function} op - ソート比較関数
   * @returns {Array} ソートされた配列
   */
  static sortx(array, op) {
    return array.sort(op);
  }

  /**
   * 範囲の値をグループ化する
   * @param {GoogleAppsScript.Spreadsheet.Range} range - 対象の範囲
   * @param {Function} op - グループ化操作関数
   * @returns {Object} グループ化された結果のハッシュ
   */
  static groupingWithRange(range, op) {
    const values = range.getValues();
    return Range.grouping(values, op);
  }

  /**
   * 範囲を分割する
   * @param {GoogleAppsScript.Spreadsheet.Range} range - 対象の範囲
   * @param {Function} grouping_op - グループ化操作関数
   * @param {Function} link_op - リンク操作関数
   * @returns {GoogleAppsScript.Spreadsheet.Range} 分割された範囲
   */
  static divideRangeX(range, grouping_op, link_op) {
    const hash = Range.groupingWithRange(range, grouping_op);
    const values = range.getValues();
    const result = Range.linkedRegion(values, link_op);
    const width = values[0].length;
    const targetRange = range.offset(result[0][0], 0, result[0][1] - result[0][0] + 1, width);
    const shape = Range.getRangeShape(targetRange);
    Range.dumpObject(shape);
    return targetRange;
  }
}
this.Range = Range; 