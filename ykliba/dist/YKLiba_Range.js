/**
 * シートからデータ範囲とその値を取得する
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - 対象のシート
 * @returns {Array} [range, values] - データ範囲とその値の配列
 */
function getRangeAndValues(sheet) {
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
 * @returns {GoogleAppsScript.Spreadsheet.Range|null} 有効なデータ範囲、またはnull
 */
function getValidRange(sheet) {
  let newRange = null;
  const [range, values] = getRangeAndValues(sheet);
  if ((range !== null && typeof (range) !== 'undefined') && values !== null) {
    const shape = Range.getRangeShape(range);
    const tlRelative = Arrayx.getRelativeCoordinatesOfTopLeft(values);

    const newHeight = shape.h - tlRelative.y;
    const newWidth = shape.w - tlRelative.x;
    newRange = range.offset(tlRelative.y, tlRelative.x, newHeight, newWidth);
  }
  return newRange;
}

/**
 * 範囲の形状情報を取得する
 * @param {GoogleAppsScript.Spreadsheet.Range} range - 対象の範囲
 * @returns {Object} 範囲の形状情報 {r: row, c: column, h: height, w: width}
 */
function getRangeShape(range) {
  const column = range.getColumn();
  const row = range.getRow();
  const height = range.getHeight();
  const width = range.getWidth();

  return Misc.makeShape({
    r: row, c: column, h: height, w: width,
  });
}

/**
 * 範囲に値を設定する
 * @param {GoogleAppsScript.Spreadsheet.Range} range - 対象の範囲
 * @param {Array} values - 設定する値の配列
 */
function setValues(range, values) {
  range.setValues(values);
}

/**
 * データ範囲から指定された列の値を取得する
 * @param {GoogleAppsScript.Spreadsheet.Range} dataRange - データ範囲
 * @param {number} index - 列のインデックス
 * @returns {Array} 指定された列の値の配列
 */
function getColumn(dataRange, index) {
  const dataArray = dataRange.getValues();
  return dataArray.map((row) => row[index]);
}

/**
 * シートに1行を挿入する
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - 対象のシート
 * @param {Object} argAdjust - 調整用の引数（オプション）
 */
function insertOneRow(sheet, argAdjust = null) {
  const [header_range, dataRange] = Code.getRangeOfHeaderAndData(sheet, argAdjust);
  const shape = Range.getRangeShape(dataRange);
  const targetRange = dataRange.offset(0, 0, 1, shape.w);
  targetRange.insertCells(SpreadsheetApp.Dimension.COLUMNS);
}

/**
 * 配列の値をグループ化する
 * @param {Array} values - グループ化する値の配列
 * @param {Function} op - グループ化操作を行う関数 [key, value]を返す
 * @returns {Object} グループ化された結果のハッシュ
 */
function grouping(values, op) {
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
 * 値を文字列として有効化する（undefinedの場合は空文字を返す）
 * @param {*} value - 変換する値
 * @returns {string} 有効な文字列
 */
function validString(value) {
  if (typeof (value) === 'undefined') {
    return '';
  }
  return value.toString();
}

/**
 * 2つの値を文字列として比較する
 * @param {*} a - 比較対象の値1
 * @param {*} b - 比較対象の値2
 * @returns {number} 比較結果（-1: a < b, 0: a = b, 1: a > b）
 */
function compareWithString(a, b) {
  const aStr = validString(a);
  const bStr = validString(b);
  if (aStr < bStr) {
    return -1;
  }
  if (aStr > bStr) {
    return 1;
  }
  return 0;
}

/**
 * 配列を指定された操作でソートする
 * @param {Array} array - ソートする配列
 * @param {Function} op - ソート操作を行う関数
 * @returns {Array} ソートされた配列
 */
function sortx(array, op) {
  return array.sort(op);
}

/**
 * 範囲の値をグループ化する
 * @param {GoogleAppsScript.Spreadsheet.Range} range - 対象の範囲
 * @param {Function} op - グループ化操作を行う関数
 * @returns {Object} グループ化された結果のハッシュ
 */
function groupingWithRange(range, op) {
  const values = range.getValues();
  return grouping(values, op);
}

/**
 * 範囲をグループ化操作とリンク操作で分割する
 * @param {GoogleAppsScript.Spreadsheet.Range} range - 対象の範囲
 * @param {Function} grouping_op - グループ化操作を行う関数
 * @param {Function} link_op - リンク操作を行う関数
 * @returns {GoogleAppsScript.Spreadsheet.Range} 分割された範囲
 */
function divideRangeX(range, grouping_op, link_op) {
  const hash = Range.groupingWithRange(range, grouping_op);
  // const index = 0
  // const cond_value = 2
  const values = range.getValues();
  const result = Arrayx.linkedRegion(values, link_op);
  const width = values[0].length;
  const targetRange = range.offset(result[0][0], 0, result[0][1] - result[0][0] + 1, width);
  const shape = getRangeShape(targetRange);
  Utils.dumpObject(shape);
  return targetRange;
}
