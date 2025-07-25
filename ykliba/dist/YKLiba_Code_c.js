class Code {
  /**
   * 指定された範囲からヘッダー行を除いた範囲を取得する
   * @param {Range} range - 対象の範囲
   * @returns {Range} ヘッダー行を除いた範囲
   */
  static getHeaderlessRange(range) {
    const newRange = range.offset(1, 0);
    const shape = Range.getRangeShape(newRange);
    dump_object(shape);
    return newRange;
  }

  /**
   * 環境設定に基づいてヘッダー付きまたはヘッダー指定でデータをレコード形式で取得する
   * @param {Object} env - 環境設定オブジェクト（ss_id, sheet_name, header等）
   * @param {Object} adjust - 調整パラメータ（オプション）
   * @returns {Array} レコード形式のデータ
   */
  static getDataAsRecordsWithHeader(env, adjust = null) {
    let ss;
    let values;
    [ss, sheet] = Code.getSpreadsheet(env.ss_id, env.sheet_name);

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
   */
  static transformRange2(range, height, width){
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
   */
  static transformRange(range, argAdjust){
    YKLiblog.Log.debug(`transformRange range=${range}`);
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
   */
  static getRangeOfHeaderAndData(sheet, argAdjust = null) {
    const range = Range.getValidRange(sheet);
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
   */
  static getRangeOfHeaderAndDataWithWidth(sheet, adjust = null) {
    YKLiblog.Log.debug(`YKLiba_Code.js getRangeOfHeaderAndDataWithWidth argAdjust.r=${argAdjust.r} argAdjust.c=${argAdjust.c} argAdjust.h=${argAdjust.h}`);
    
    const [header_range, data_range] = Code.getRangeOfHeaderAndData(sheet, adjust);
    const shape = Range.getRangeShape(data_range);
    const new_header_range = header_range.offset(0, 0, shape.h, specified_width);
    const new_data_range = data_range.offset(0, 0, shape.ht, specified_width);
    return [new_header_range, new_data_range];
  }

  /**
   * スプレッドシートの最初のシートからヘッダー付きレコードを取得する
   * @param {string} ss_id - スプレッドシートID
   * @param {string} sheet_name - シート名
   * @param {Object} adjust - 調整パラメータ（オプション）
   * @returns {Array} ヘッダー付きレコードデータ
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
   */
  static setFormatToNamedColumn(sheet, column_name, format, adjust = null) {
    YKLiblog.Log.debug(`YKLiba_Code.js setFormatToNamedColumn  argAdjust.r=${argAdjust.r} argAdjust.c=${argAdjust.c} argAdjust.h=${argAdjust.h}`);
    const [header_range, data_range] = Code.getRangeOfHeaderAndData(sheet, adjust);
    const headers = header_range.getValues().pop();
    const index = headers.indexOf(column_name);
    if (index < 0) {
      return [];
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
   */
  static setFormatToNamedRowsSheetBySheetname(ss_id, sheetname, column_name, format) {
    const [ss, sheet, sheets, sheets_by_name] = Code.getSheets(ss_id);
    const sheetx = sheets_by_name[sheetname];
    Code.setFormatToNamedColumn(sheetx, column_name, format);
  }
}
this.Code = Code;
// 既存の関数定義は削除
