// Import required classes
// Drive class for file operations
// Arrayx class for array operations
// YKLiblog class for logging operations

/**
 * 汎用的なユーティリティ機能を提供するクラス
 * 文字列処理、日付操作、配列操作、ファイル出力、データ変換などの機能を提供する
 * Google Apps Script環境での共通処理を集約した基盤ユーティリティクラス
 */
class Utils {
  /**
   * 引数がnullまたは空文字列かどうかを判定する
   * @param {*} arg - 判定対象の値
   * @return {boolean} nullまたは空文字列の場合true、それ以外の場合false
   */
  static isNullOrWhitespace(arg){
    return arg === null || arg === "";
  }

  /**
   * 2つの日付を比較し、date1がdate2より後かどうかを判定する
   * @param {Date|number} date1 - 比較対象の日付1
   * @param {Date|number} date2 - 比較対象の日付2
   * @return {boolean} date1がdate2より後の場合true、それ以外の場合false
   */
  static isAfterDate(date1, date2){
    let time1, time2;
    try{
      if( typeof(date1) === "number" ){
        time1 = date1;
      }
      else{
        time1 = date1.getTime();
      }
    } catch(e){
      time1 = date1;
    }
    try{
      if( typeof(date2) === "number" ){
        time2 = date2;
      }
      else{
        time2 = date2.getTime();
      }
    } catch(e){
      time2 = date2;
    }
    
    return time1 < time2;
  }

  /**
   * オブジェクトがundefinedかどうかを判定する
   * @param {*} obj - 判定対象のオブジェクト
   * @return {boolean} undefinedの場合true、それ以外の場合false
   */
  static isUndefined(obj){
    if( (typeof obj) == "undefined" ){
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * 2つの配列が等しいかどうかを判定する
   * @param {Array} array_a - 比較対象の配列1
   * @param {Array} array_b - 比較対象の配列2
   * @return {boolean} 配列が等しい場合true、それ以外の場合false
   */
  static isEqual(array_a, array_b) {
    return JSON.stringify(array_a) === JSON.stringify(array_b);
  }

  /**
   * 配列をJSON文字列に変換する
   * @param {Array} array - 変換対象の配列
   * @return {string} JSON文字列
   */
  static toJson(array) {
    return JSON.stringify(array);
  }

  /**
   * スプレッドシートの範囲の値をデバッグ出力する
   * @param {Range} range - 出力対象の範囲
   */
  static dumpRange(range) {
    const array = range.getValues();
    const h = array.length;
    for (let i = 0; i < h; i++) {
      YKLiblog.Log.debug(`${i}=${array[i]}`);
    }
  }

  /**
   * 配列の内容をデバッグ出力する
   * @param {Array} array - 出力対象の配列
   */
  static dumpArray(array) {
    for (const row of array) {
      YKLiblog.Log.debug(row);
    }
  }

  /**
   * オブジェクトの内容をデバッグ出力する
   * @param {Object} obj - 出力対象のオブジェクト
   */
  static dumpObject(obj) {
    for (const key in obj) {
      YKLiblog.Log.debug(`${key}: ${obj[key]}`);
    }
  }

  /**
   * 1次元配列を2次元配列（列形式）に変換する
   * @param {Array} data - 変換対象の1次元配列
   * @return {Array} 2次元配列（各要素が配列に変換される）
   */
  static makeColumn(data) {
    return data.map((row) => [row]);
  }

  /**
   * 配列内で最初に空でない要素のインデックスを検出する
   * @param {Array} values - 検索対象の配列
   * @return {number} 最初に空でない要素のインデックス、見つからない場合は-1
   */
  static detectBlank(values) {
    const max = values.length;

    for (let i = 0; i < max; i++) {
      if (values[i][0] !== '') {
        return i;
      }
    }
    return -1;
  }

  /**
   * 配列の末尾から空でない要素のインデックスを取得する
   * @param {Array} array - 検索対象の配列
   * @return {number} 末尾から最初に空でない要素のインデックス、見つからない場合は-1
   */
  static getRindex(array) {
    let str;
    const w = array.length - 1;
    let rindex = -1;
    for (let i = w; i >= 0; i--) {
      str = array[i].trim();
      if (str !== '') {
        rindex = i;
        break;
      } else {
        // YKLiblog.Log.debug(`i=${i} str=${str}`)
      }
    }
    return rindex;
  }

  /**
   * 文字の文字コードを取得する
   * @param {string} ch - 対象の文字
   * @return {number} 文字コード
   */
  static charCode(ch) {
    return ch.charCodeAt(0);
  }

  /**
   * 文字列の指定位置の文字を列番号に変換する
   * @param {string} ch - 対象の文字列
   * @param {number} order_num - 文字の位置（0から開始）
   * @param {number} a_code - 基準となるAの文字コード（デフォルト: 'A'の文字コード）
   * @return {number} 列番号（A=1, B=2, ...）
   */
  static columnNumber(ch, order_num, a_code = null) {
    if (a_code == null) {
      a_code = Utils.charCode('A');
    }
    return ch.toUpperCase().charCodeAt(order_num) - a_code + 1;
  }

  /**
   * 列名（A, B, C, AA, AB等）を列番号に変換する
   * @param {string} ch - 列名
   * @return {number|null} 列番号、変換できない場合はnull
   */
  static getColumnNumber(ch) {
    if (ch == null) {
      return null;
    }
    if (typeof (ch) === 'undefined') {
      return null;
    }
    let num = null;
    let num1 = null;
    let num2 = null;
    const a_code = Utils.charCode('A');
    const z_code = Utils.charCode('Z');
    const z_num = z_code - a_code + 1;

    const width = ch.length;
    switch (width) {
      case 1:
        num = Utils.columnNumber(ch, 0, a_code);
        break;
      case 2:
        num1 = Utils.columnNumber(ch, 0, a_code);
        num2 = Utils.columnNumber(ch, 1, a_code);
        num = num2 * z_num + num1;
        break;

      default:
        // num = null;
    }
    return num;
  }

  /**
   * 配列内で指定した値を持つ行の開始と終了インデックスを検出する
   * @param {Array} array - 検索対象の2次元配列
   * @param {number} col_num - 検索対象の列番号
   * @param {*} value - 検索する値
   * @return {Array} [開始インデックス, 終了インデックス] の形式で返す
   */
  static detectRowIndex(array, col_num, value) {
    const height = array.length;
    let start_index = -1;
    let end_index = -1;
    for (let y = 0; y < height; y++) {
      if (array[y][col_num] == value) {
        if (start_index < 0) {
          start_index = y;
          end_index = start_index;
        } else {
          end_index = y;
        }
      }
    }
    return [start_index, end_index];
  }

  /**
   * 配列を右側と下側に拡張する
   * @param {Array} base_array - 基準となる配列
   * @param {Array} right_side_array - 右側に追加する配列
   * @param {Array} bottom_side_array - 下側に追加する配列
   * @return {Array|null} 拡張された配列、拡張できない場合はnull
   */
  static extendArray(base_array, right_side_array, bottom_side_array) {
    const height = right_side_array.length;
    if (height !== base_array.length) {
      return null;
    }
    const width = bottom_side_array.length;
    if (width !== base_array[0].length) {
      return null;
    }

    const ret_array_height = height + 1;
    // const ret_array_width = width + 1;
    const ret_array = Array(ret_array_height);
    for (let y = 0; y < height; y++) {
      ret_array[y] = [...base_array[y], right_side_array[y]];
    }
    ret_array[ret_array_height - 1] = [...bottom_side_array, 0];

    return ret_array;
  }

  /**
   * 配列の行と列の合計を計算する
   * @param {Array} array - 計算対象の2次元配列
   * @return {Array} [行の合計配列, 列の合計配列] の形式で返す
   */
  static sumRowAndSumColumn(array) {
    const height = array.length;
    if (typeof (array[0]) === 'undefined') {
      return [[], []];
    }
    const width = array[0].length;
    const row_length = width;
    const column_length = height;
    const row_count = Array(row_length).fill(0);
    const column_count = Array(column_length).fill(0);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        row_count[x] += array[y][x];
        column_count[y] += array[y][x];
      }
    }
    return [row_count, column_count];
  }

  /**
   * 日付をYYYY-MM-DD形式の文字列に変換する
   * @param {Date} date - 変換対象の日付
   * @return {string} YYYY-MM-DD形式の文字列
   */
  static makeDateString(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    // console.log(formattedDate); // 出力例: 2024-11-21
    return formattedDate;
  }

  /**
   * 2つのメッセージ配列の差分を取得する
   * @param {Array} array1 - 比較対象の配列1
   * @param {Array} array2 - 比較対象の配列2
   * @return {Array} array1に存在しarray2に存在しない要素の配列
   */
  static messageArrayDiff(array1, array2) {
    return array1.filter((item1) => !array2.some((item2) => item1.getId() === item2.getId()));
  }

  /**
   * フォルダ内にファイルを出力する
   * @param {Folder} folder - 出力先フォルダ
   * @param {string} file_name - ファイル名
   * @param {string} content - 出力内容
   */
  static outputFileUnderFolder(folder, file_name, content) {
    let document = null;
    // file_name = "d"
    content = '';
    let file = Drive.getFile(folder, file_name);
    let file_id = null;
    if (file === null) {
      document = DocumentApp.create(file_name);
      file_id = document.getId();
      file = DriveApp.getFileById(file_id);
      file.moveTo(folder);
    } else {
      file_id = file.getId();
      document = DocumentApp.openById(file_id);
    }
    Arrayx.outputToDocument(document, content);
  }

  /**
   * 2つの日付の差分をミリ秒で取得する
   * @param {Date} date1 - 比較対象の日付1
   * @param {Date} date2 - 比較対象の日付2
   * @return {number} 差分のミリ秒
   */
  static diffDate(date1, date2) {
    const diffInMs = Math.abs(date1.getTime() - date2.getTime()); // ミリ秒の差分
    return diffInMs;
  }

  /**
   * 日付をYYYY-MM-DD-HH-MM-SS形式の文字列に変換する
   * @param {Date} date - 変換対象の日付
   * @return {string} YYYY-MM-DD-HH-MM-SS形式の文字列
   */
  static formatDateTimeManual(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}-${hour}-${minute}-${second}`;
  }

  /**
   * オブジェクトの妥当性を検証する
   * @param {*} obj - 検証対象のオブジェクト
   * @returns {Array} [妥当性, メッセージ]
   */
  static isValidObject(obj) {
    if (obj === null || typeof obj === 'undefined') {
      return [false, 'object is null or undefined'];
    }
    return [true, 'object is valid'];
  }
}
this.Utils = Utils;
