/**
 * 環境設定を使用してシートからシンプルな行データを取得する
 * @param {Object} env - 環境設定オブジェクト（ss_id, sheet_nameを含む）
 * @param {Object} maxRange - 最大範囲制限（h, wプロパティを含む）
 * @returns {Array} シートの値の配列
 */
function get_simple_rows_with_env(env, maxRange = null) {
  const [ss, sheet] = get_spreadsheet(env.ss_id, env.sheet_name);
  const values = get_simple_rows(sheet, maxRange);
  return values;
}

/**
 * シートからシンプルな行の範囲を取得する
 * @param {Object} sheetx - シートオブジェクト
 * @returns {Range} 調整された範囲オブジェクト
 */
function simple_rows_range_x(sheetx) {
  const [values, range] = get_simple_rows_and_range(sheetx);

  const tl_bl_Point = Arrayx.getRelativeCordinatesOfTLandBL(values);

  const rindex = Utils.getRindex(values[0]);
  const simple_width = rindex;
  const shape = Arrayx.getRelativeCordinatesOfTLandBlandTRandBR(values);
  const simple_range = range.offset(shape.tl.y, shape.tl.x, (shape.bl.y - shape.tl.y), simple_width);
  return simple_range;
}

/**
 * シートからシンプルな行データを取得する
 * @param {Object} sheetx - シートオブジェクト
 * @returns {Array} シートの値の配列
 */
function simple_rows_x(sheetx) {
  const simple_range = simple_rows_range_x(sheetx);
  const v = simple_range.getValues();
  return v;
}

/**
 * シートから有効な範囲を取得する
 * @param {Sheet} sheet - スプレッドシートのシート
 * @returns {Range} 有効な範囲オブジェクト
 */
function get_simple_rows_range(sheet) {
  return getValidRange(sheet);
}

/**
 * 範囲を指定された最大高さ・幅に調整する
 * @param {Range} range - 調整対象の範囲
 * @param {number} maxH - 最大高さ
 * @param {number} maxW - 最大幅
 * @returns {Range} 調整された範囲オブジェクト
 */
function adjustRange(range, maxH, maxW){
  rangeShape = getRangeShape(range)
  w = 0
  h = 0
  if( maxH < rangeShape.h){
    h = maxH
  }
  else{
    h = rangeShape.h
  }
  if( maxW < rangeShape.w){
    w = maxW
  }
  else{
    w = rangeShape.w
  }
  return range.offset(0, 0, h, w)
}

/**
 * シートからシンプルな行データを取得する（範囲制限付き）
 * @param {Sheet} sheet - スプレッドシートのシート
 * @param {Object} maxRange - 最大範囲制限（h, wプロパティを含む）
 * @returns {Array} シートの値の配列
 */
function get_simple_rows(sheet, maxRange = null) {
  const range = get_simple_rows_range(sheet);
  let values = [];
  YKLiblog.Log.debug(`YKLiba_simple.js get_simple_rows 0 range=${range}`);
  if (range !== null){
    if (maxRange !== null) {
      newRange = adjustRange(range, maxRange.h, maxRange.w)
      values = newRange.getValues();
    }
    else{
      values = range.getValues();
    }
    YKLiblog.Log.debug(`YKLiba_simple.js get_simple_rows 1`);
  }
  return values;
}

/**
 * シートからシンプルな行データと範囲を取得する
 * @param {Sheet} sheet - スプレッドシートのシート
 * @param {Object} maxRange - 最大範囲制限（h, wプロパティを含む）
 * @returns {Array} [値の配列, 範囲オブジェクト]の配列
 */
function get_simple_rows_and_range(sheet, maxRange = null) {
  const range = get_valid_range(sheet);
  let values = [];
  if (range !== null && maxRange !== null) {
    newRange = adjustRange(range, maxRange.h, maxRange.w)
    values = newRange.getValues();
  }
  return [values, newRange];
}

/**
 * スプレッドシートIDとシート名からシンプルな行データと範囲を取得する
 * @param {string} ss_id - スプレッドシートID
 * @param {string} sheet_name - シート名
 * @param {Object} maxRange - 最大範囲制限（h, wプロパティを含む）
 * @returns {Array} [値の配列, 範囲オブジェクト]の配列
 */
function get_simple_rows_and_range_x(ss_id, sheet_name, maxRange = null) {
  const [ss, sheet, sheets, sheets_by_name] = get_spreadsheet_ex(ss_id, sheet_name);
  const sheetx = sheets_by_name[sheet_name];
  return get_simple_rows_and_range(sheetx, maxRange);
}
