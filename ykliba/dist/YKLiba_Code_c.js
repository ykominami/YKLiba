// Import required classes
// Base class for spreadsheet operations
// Range class for range operations  
// Misc class for utility functions
// YKLiblog class for logging operations

/**
 * スプレッドシートのデータ処理とコード操作を提供するクラス
 * ヘッダー付きデータの取得、範囲の変換、フォーマット設定機能を提供する
 * Google Apps Scriptでのスプレッドシート操作に特化した高レベルAPIを実装
 */
class Code {
  /**
   * 指定された範囲からヘッダー行を除いた範囲を取得する
   * @param {Range} range - 対象の範囲
   * @returns {Range} ヘッダー行を除いた範囲
   * @throws {Error} rangeがnullの場合、またはoffsetメソッドで範囲外のオフセットを指定した場合
   */
  static getHeaderlessRange(range) {
    const newRange = range.offset(1, 0);
    if( newRange === null ){
      return null
    }
    // const shape = Range.getRangeShape(newRange);
    // dump_object(shape);
    return newRange;
  }

  /**
   * 環境設定に基づいてヘッダー付きまたはヘッダー指定でデータをレコード形式で取得する
   * @param {Object} env - 環境設定オブジェクト（ss_id, sheet_name, header等）
   * @param {Object} adjust - 調整パラメータ（オプション）
   * @returns {Array} レコード形式のデータ
   * @throws {Error} Base.getSpreadsheetが無効なスプレッドシートIDまたはシート名でエラーを投げた場合
   * @throws {Error} envオブジェクトのプロパティアクセスでエラーが発生した場合
   */
  static getDataAsRecordsWithHeader(env, adjust = null) {
    let ss;
    let values;
    [ss, sheet] = Base.getSpreadsheet(env.ss_id, env.sheet_name);

    if (typeof (env.header) === 'undefined') {
      values = Code.getRecordsWithHeader(sheet, adjust);
    } else {
      values = Code.getRecordByHeader(sheet, env.header);
    }
    return values;
  }

  /**
   * シートからヘッダー行とデータ行を分離してレコード形式で取得する
   * @param {Sheet} sheet - 対象のシート
   * @param {Object} adjust - 調整パラメータ（オプション）
   * @returns {Array} [ヘッダー範囲, データ範囲, データハッシュ配列]
   * @throws {Error} getRangeOfHeaderAndDataでシート取得に失敗した場合
   * @throws {Error} 範囲のgetValues()メソッド呼び出しが失敗した場合
   * @throws {Error} header配列やdata配列へのアクセスでエラーが発生した場合
   */
  static getRecordsWithHeader(sheet, adjust = null) {
    YKLiblog.Log.debug(`YKLiba_Code.gs getRecordsWithHeader adjust=${adjust}`)
    const [header_range, data_range] = Code.getRangeOfHeaderAndData(sheet, adjust);
    const header = header_range.getValues().pop();
    const data = data_range.getValues();
    const data_hash = data.map((row) => {
      const hash = {};
      for (let i = 0; i < header.length; i++) {
        hash[header[i]] = row[i];
      }
      return hash;
    });
    return [header_range, data_range, data_hash]
  }

  /**
   * 指定されたヘッダー配列に基づいてシートからデータをレコード形式で取得する
   * @param {Sheet} sheet - 対象のシート
   * @param {Array} header - ヘッダー名の配列
   * @returns {Array} レコード形式のデータ配列
   * @throws {Error} Range.getRangeAndValuesでシート取得に失敗した場合
   * @throws {Error} 配列のインデックスアクセスで範囲外エラーが発生した場合
   */
  static getRecordByHeader(sheet, header) {
    // header = ["id","misc","misc2","purchase_date","price","misc3","category","sub_category","title"];
    // Log.debug(`header=${header}`);

    const [range, values] = Range.getRangeAndValues(sheet);
    const buffer = [];
    // Log.debug( `1 buffer=${buffer}` );
    if (range !== null && values !== null) {
      // Log.debug( [range, values])
      let index = 0;

      for (const item of values) {
        // Log.debug( item );
        const hash = {};
        for (let i = 0; i < header.length; i++) {
          index = i + 1;
          hash[header[i]] = item[index];
        }
        // Log.debug( `2 buffer=${buffer}` );

        buffer.push(hash);
      }
      // Log.debug( buffer[0] );
    }
    // Log.debug( `Z buffer=${buffer}` );
    return buffer;
  }

  /**
   * 範囲を指定された高さと幅で変換する
   * @param {Range} range - 対象の範囲
   * @param {number} height - 新しい高さ
   * @param {number} width - 新しい幅
   * @returns {Range} 変換された範囲
   * @throws {Error} rangeがnullの場合
   * @throws {Error} Range.getRangeShapeやrange.offsetメソッドで範囲外のオフセットを指定した場合
   */
  static transformRange2(range, height, width){
    if( range === null ){
      return null
    }
    const shape = Range.getRangeShape(range)
    const r2 = shape.r;
    const c2 = shape.c;
    const h2 = height;
    const w2 = width;
    YKLiblog.Log.debug(`transformRange2 r2=${r2} c2=${c2} h2=${h2} w2=${w2}`);
    return range.offset(r2, c2, h2, w2);
  }

  /**
   * 範囲を調整パラメータに基づいて変換する
   * @param {Range} range - 対象の範囲
   * @param {Object} argAdjust - 調整パラメータ（r, c, h, w）
   * @returns {Range} 変換された範囲
   * @throws {Error} rangeがnullの場合
   * @throws {Error} Range.getRangeShapeやMisc.getValidAdjustメソッドでエラーが発生した場合
   * @throws {Error} range.offsetメソッドで範囲外のオフセットを指定した場合
   */
  static transformRange(range, argAdjust){
    YKLiblog.Log.debug(`transformRange range=${range}`);
    if( range === null){
      return null
    }
    YKLiblog.Log.debug(`transformRange range.r=${range.r} range.c=${range.c} range.h=${range.h} range.w=${range.w}`);
    const shape = Range.getRangeShape(range)
    YKLiblog.Log.debug(`transformRange shape=${shape}`);
    YKLiblog.Log.debug(`transformRange shape.r=${shape.r} shape.c=${shape.c} shape.h=${shape.h} shape.w=${shape.w}`);
    YKLiblog.Log.debug(`transformRange argAdjust=${argAdjust}`);
    const adjust = Misc.getValidAdjust(argAdjust);
    YKLiblog.Log.debug(`transformRange adjust=${adjust}`);
    YKLiblog.Log.debug(`transformRange adjust.r=${adjust.r} adjust.c=${adjust.c} adjust.h=${adjust.h} adjust.w=${adjust.w}`);
    let r = adjust.r;
    if( r == null){ r = 0 }
    let c = adjust.c; 
    if( c == null){ c = 0 }
    let h = adjust.h;
    if( h == null ){ h = 0 }
    let w = adjust.w;
    if( w == null){ w = 0 }
    let r2 = r;
    let c2 = c;
    let h2= shape.h + h;
    let w2 = shape.w + w
    YKLiblog.Log.debug(`transformRange r2=${r2} c2=${c2} h2=${h2} w2=${w2}`);
    return range.offset(r2, c2, h2, w2);
  }

  /**
   * シートからヘッダー範囲とデータ範囲を取得する
   * @param {Sheet} sheet - 対象のシート
   * @param {Object} argAdjust - 調整パラメータ（オプション）
   * @returns {Array} [ヘッダー範囲, データ範囲]
   * @throws {Error} Range.getValidRangeでシート取得に失敗した場合
   * @throws {Error} Code.transformRangeで変換に失敗した場合
   * @throws {Error} 範囲のgetHeight()やoffset()メソッドでエラーが発生した場合
   */
  static getRangeOfHeaderAndData(sheet, argAdjust = null) {
    const range = Range.getValidRange(sheet);
    if( range === null ){
      return [null, null]
    }
    YKLiblog.Log.debug(`YKLiba_Code.js getRangeOfHeaderAndData range.r=${range.r} range.c=${range.c} range.h=${range.h} range.w=${range.w}`);
    const shape = Range.getRangeShape(range);
    YKLiblog.Log.debug(`YKLiba_Code.js getRangeOfHeaderAndData shape.r=${shape.r} shape.c=${shape.c} shape.h=${shape.h} shape.w=${shape.w}`);
    YKLiblog.Log.debug(`YKLiba_Code.js getRangeOfHeaderAndData argAdjust.r=${argAdjust.r} argAdjust.c=${argAdjust.c} argAdjust.h=${argAdjust.h} argAdjust.w=${argAdjust.w}`);
    const newRange = Code.transformRange(range, argAdjust)
    const height = newRange.getHeight();
    const headerRange = newRange.offset(0, 0, 1);
    const dataRange = newRange.offset(1, 0, height - 1);

    return [headerRange, dataRange];
  }

  /**
   * シートからヘッダー範囲とデータ範囲を指定幅で取得する
   * @param {Sheet} sheet - 対象のシート
   * @param {Object} adjust - 調整パラメータ（オプション）
   * @returns {Array} [ヘッダー範囲, データ範囲]
   * @throws {Error} Code.getRangeOfHeaderAndDataで取得に失敗した場合
   * @throws {Error} Range.getRangeShapeやoffset()メソッドでエラーが発生した場合
   */
  static getRangeOfHeaderAndDataWithWidth(sheet, adjust = null) {
    YKLiblog.Log.debug(`YKLiba_Code.js getRangeOfHeaderAndDataWithWidth argAdjust.r=${argAdjust.r} argAdjust.c=${argAdjust.c} argAdjust.h=${argAdjust.h}`);
    
    const [header_range, data_range] = Code.getRangeOfHeaderAndData(sheet, adjust);
    if( data_range === null ){
      return [null, null]
    }
    const shape = Range.getRangeShape(data_range);
    const new_header_range = header_range.offset(0, 0, shape.h, shape.w);
    const new_data_range = data_range.offset(0, 0, shape.ht, shape.w);
    return [new_header_range, new_data_range];
  }

  /**
   * スプレッドシートの最初のシートからヘッダー付きレコードを取得する
   * @param {string} ss_id - スプレッドシートID
   * @param {string} sheet_name - シート名
   * @param {Object} adjust - 調整パラメータ（オプション）
   * @returns {Array} ヘッダー付きレコードデータ
   * @throws {Error} Base.getSpreadsheetExで無効なスプレッドシートIDまたはシート名でエラーが発生した場合
   * @throws {Error} sheetsが空配列の場合、配列のインデックスアクセスでエラーが発生した場合
   */
  static getRecordsWithHeaderFromSheetFirst(ss_id, sheet_name, adjust = null) {
    const [ss, sheet, sheets, sheets_by_name] = Base.getSpreadsheetEx(ss_id, sheet_name);
    const sheetx = sheets[0];
    const v = Code.getRecordsWithHeader(sheetx, adjust);
    return v;
  }

  /**
   * 指定された列名のセルにフォーマットを適用する
   * @param {Sheet} sheet - 対象のシート
   * @param {string} column_name - 列名
   * @param {string} format - 適用するフォーマット
   * @param {Object} adjust - 調整パラメータ（オプション）
   * @throws {Error} Code.getRangeOfHeaderAndDataで範囲取得に失敗した場合
   * @throws {Error} header_rangeのgetValues()メソッド呼び出しが失敗した場合
   * @throws {Error} setNumberFormat()メソッドで無効なフォーマットを指定した場合
   */
  static setFormatToNamedColumn(sheet, column_name, format, adjust = null) {
    YKLiblog.Log.debug(`YKLiba_Code.js setFormatToNamedColumn  argAdjust.r=${argAdjust.r} argAdjust.c=${argAdjust.c} argAdjust.h=${argAdjust.h}`);
    const [header_range, data_range] = Code.getRangeOfHeaderAndData(sheet, adjust);
    const headers = header_range.getValues().pop();
    const index = headers.indexOf(column_name);
    if (index < 0) {
      return [];
    }
    if( data_range === null){
      return []
    }
    const shape = Range.getRangeShape(data_range);
    const column_range = data_range.offset(0, index, shape.h, 1);
    const format_array = [];
    for (let i = 0; i < height; i++) {
      format_array.push([format]);
    }
    column_range.setNumberFormat(format_array);
  }

  /**
   * 指定されたシート名の指定列にフォーマットを適用する
   * @param {string} ss_id - スプレッドシートID
   * @param {string} sheetname - シート名
   * @param {string} column_name - 列名
   * @param {string} format - 適用するフォーマット
   * @throws {Error} Base.getSheetsで無効なスプレッドシートIDでエラーが発生した場合
   * @throws {Error} sheets_by_nameに指定されたsheetnameが存在しない場合
   */
  static setFormatToNamedRowsSheetBySheetname(ss_id, sheetname, column_name, format) {
    const [ss, sheet, sheets, sheets_by_name] = Base.getSheets(ss_id);
    const sheetx = sheets_by_name[sheetname];
    Code.setFormatToNamedColumn(sheetx, column_name, format);
  }
}
this.Code = Code;
// 既存の関数定義は削除
