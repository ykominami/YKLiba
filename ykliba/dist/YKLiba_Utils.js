/**
 * 引数がnullまたは空文字列かどうかをチェックする
 * @param {*} arg - チェックする値
 * @return {boolean} nullまたは空文字列の場合true、それ以外はfalse
 */
function isNullOrWhitespace(arg){
  return arg === null || arg === "";
}

/**
 * 2つの日付を比較し、date1がdate2より後かどうかを判定する
 * @param {Date|number} date1 - 比較する日付1
 * @param {Date|number} date2 - 比較する日付2
 * @return {boolean} date1がdate2より後の場合はtrue、それ以外はfalse
 */
function isAfterDate(date1, date2){
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
 * オブジェクトがundefinedかどうかをチェックする
 * @param {*} obj - チェックするオブジェクト
 * @return {boolean} undefinedの場合はtrue、それ以外はfalse
 */
function is_undefined(obj){
  if( (typeof obj) == "undefined" ){
    return true;
  }
  else {
    return false;
  }
}

/**
 * 2つの配列が等しいかどうかを比較する
 * @param {Array} array_a - 比較する配列1
 * @param {Array} array_b - 比較する配列2
 * @return {boolean} 配列が等しい場合はtrue、それ以外はfalse
 */
function isEqual(array_a, array_b) {
  return JSON.stringify(array_a) === JSON.stringify(array_b);
}

/**
 * 配列をJSON文字列に変換する
 * @param {Array} array - 変換する配列
 * @return {string} JSON文字列
 */
function tojson(array) {
  return JSON.stringify(array);
}

/**
 * オブジェクトが有効かどうかをチェックし、結果とメッセージを返す
 * @param {*} array - チェックするオブジェクト
 * @return {Array} [有効性, メッセージ, コード]の配列
 */
function is_valid_object(array) {
  if (array === null) {
    return [false, 'null', 1];
  }
  if (typeof (array) === 'undefined') {
    return [false, 'message: undefined', 2];
  }

  return [true, 'true', 3];
}

/**
 * スプレッドシートの範囲の値をデバッグ出力する
 * @param {Range} range - スプレッドシートの範囲
 */
function dump_range(range) {
  const array = range.getValues();
  const h = array.length;
  for (let i = 0; i < h; i++) {
    YKLiblog.Log.debug(`${i}=${array[i]}`);
  }
}

/**
 * 配列の内容をデバッグ出力する
 * @param {Array} array - 出力する配列
 */
function dump_array(array) {
  for (const row of array) {
    YKLiblog.Log.debug(row);
  }
}

/**
 * オブジェクトの内容をデバッグ出力する
 * @param {Object} obj - 出力するオブジェクト
 */
function dump_object(obj) {
  for (const key in obj) {
    YKLiblog.Log.debug(`${key}: ${obj[key]}`);
  }
}

/**
 * 1次元配列を2次元配列（列形式）に変換する
 * @param {Array} data - 変換する1次元配列
 * @return {Array} 2次元配列（各要素が配列に変換される）
 */
function make_column(data) {
  return data.map((row) => [row]);
}

/**
 * 配列内の最初の非空白要素のインデックスを検出する
 * @param {Array} values - 検索する配列
 * @return {number} 最初の非空白要素のインデックス、見つからない場合は-1
 */
function detect_blank(values) {
  const max = values.length;

  for (let i = 0; i < max; i++) {
    if (values[i][0] !== '') {
      return i;
    }
  }
  return -1;
}

/**
 * 配列の末尾から最初の非空白要素のインデックスを取得する
 * @param {Array} array - 検索する配列
 * @return {number} 最後の非空白要素のインデックス、見つからない場合は-1
 */
function get_rindex(array) {
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
 * @param {string} ch - 文字コードを取得する文字
 * @return {number} 文字の文字コード
 */
function char_code(ch) {
  return ch.charCodeAt(0);
}

/**
 * 文字列の指定位置の文字を列番号に変換する
 * @param {string} ch - 変換する文字列
 * @param {number} order_num - 文字の位置（0から開始）
 * @param {number} a_code - 基準となる'A'の文字コード（デフォルト: 'A'の文字コード）
 * @return {number} 列番号（A=1, B=2, ...）
 */
function column_number(ch, order_num, a_code = null) {
  if (a_code == null) {
    a_code = char_code('A');
  }
  return ch.toUpperCase().charCodeAt(order_num) - a_code + 1;
}

/**
 * Excelの列名（A, B, C, AA, AB等）を列番号に変換する
 * @param {string} ch - 変換する列名
 * @return {number|null} 列番号、変換できない場合はnull
 */
function get_column_number(ch) {
  if (ch == null) {
    return null;
  }
  if (typeof (ch) === 'undefined') {
    return null;
  }
  let num = null;
  let num1 = null;
  let num2 = null;
  const a_code = char_code('A');
  const z_code = char_code('Z');
  const z_num = z_code - a_code + 1;

  const width = ch.length;
  switch (width) {
    case 1:
      num = column_number(ch, 0, a_code);
      break;
    case 2:
      num1 = column_number(ch, 0, a_code);
      num2 = column_number(ch, 1, a_code);
      num = num2 * z_num + num1;
      break;

    default:
      // num = null;
  }
  return num;
}

/**
 * 配列内で指定した列の値が一致する行の開始と終了インデックスを検出する
 * @param {Array} array - 検索する2次元配列
 * @param {number} col_num - 検索する列番号
 * @param {*} value - 検索する値
 * @return {Array} [開始インデックス, 終了インデックス]の配列、見つからない場合は[-1, -1]
 */
function detect_row_index(array, col_num, value) {
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
 * 2次元配列を右側と下側に拡張する
 * @param {Array} base_array - 基準となる2次元配列
 * @param {Array} right_side_array - 右側に追加する配列
 * @param {Array} bottom_side_array - 下側に追加する配列
 * @return {Array|null} 拡張された配列、拡張できない場合はnull
 */
function extend_array(base_array, right_side_array, bottom_side_array) {
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
 * 2次元配列の各行と各列の合計を計算する
 * @param {Array} array - 計算する2次元配列
 * @return {Array} [行の合計配列, 列の合計配列]の配列
 */
function sum_row_and_sum_column(array) {
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
 * @param {Date} date - 変換する日付
 * @return {string} YYYY-MM-DD形式の日付文字列
 */
function make_date_string(date) {
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
 * 2つのメッセージ配列の差分を取得する（IDベースで比較）
 * @param {Array} array1 - 比較元のメッセージ配列
 * @param {Array} array2 - 比較先のメッセージ配列
 * @return {Array} array1に存在しarray2に存在しないメッセージの配列
 */
function messageArrayDiff(array1, array2) {
  return array1.filter((item1) => !array2.some((item2) => item1.getId() === item2.getId()));
}

/**
 * 指定したフォルダ内にファイルを作成または更新する
 * @param {Folder} folder - 対象フォルダ
 * @param {string} file_name - ファイル名
 * @param {string} content - ファイルの内容
 */
function output_file_under_folder(folder, file_name, content) {
  let document = null;
  // file_name = "d"
  content = '';
  let file = get_file(folder, file_name);
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
  output_to_document(document, content);
}

/**
 * 2つの日付の差分をミリ秒で取得する
 * @param {Date} date1 - 比較する日付1
 * @param {Date} date2 - 比較する日付2
 * @return {number} 日付の差分（ミリ秒）
 */
function diff_date(date1, date2) {
  const diffInMs = Math.abs(date1.getTime() - date2.getTime()); // ミリ秒の差分
  return diffInMs;
}

/**
 * 日付をYYYY-MM-DD-HH-MM-SS形式の文字列に変換する
 * @param {Date} date - 変換する日付
 * @return {string} YYYY-MM-DD-HH-MM-SS形式の日時文字列
 */
function formatDateTimeManual(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}-${hour}-${minute}-${second}`;
}

