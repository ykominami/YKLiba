class Utils {
  static isNullOrWhitespace(arg){
    return arg === null || arg === "";
  }

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

  static isUndefined(obj){
    if( (typeof obj) == "undefined" ){
      return true;
    }
    else {
      return false;
    }
  }

  static isEqual(array_a, array_b) {
    return JSON.stringify(array_a) === JSON.stringify(array_b);
  }

  static toJson(array) {
    return JSON.stringify(array);
  }

  static isValidObject(array) {
    if (array === null) {
      return [false, 'null', 1];
    }
    if (typeof (array) === 'undefined') {
      return [false, 'message: undefined', 2];
    }

    return [true, 'true', 3];
  }

  static dumpRange(range) {
    const array = range.getValues();
    const h = array.length;
    for (let i = 0; i < h; i++) {
      Log.debug(`${i}=${array[i]}`);
    }
  }

  static dumpArray(array) {
    for (const row of array) {
      Log.debug(row);
    }
  }

  static dumpObject(obj) {
    for (const key in obj) {
      Log.debug(`${key}: ${obj[key]}`);
    }
  }

  static makeColumn(data) {
    return data.map((row) => [row]);
  }

  static detectBlank(values) {
    const max = values.length;

    for (let i = 0; i < max; i++) {
      if (values[i][0] !== '') {
        return i;
      }
    }
    return -1;
  }

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
        // Log.debug(`i=${i} str=${str}`)
      }
    }
    return rindex;
  }

  static charCode(ch) {
    return ch.charCodeAt(0);
  }

  static columnNumber(ch, order_num, a_code = null) {
    if (a_code == null) {
      a_code = Utils.charCode('A');
    }
    return ch.toUpperCase().charCodeAt(order_num) - a_code + 1;
  }

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

  static messageArrayDiff(array1, array2) {
    return array1.filter((item1) => !array2.some((item2) => item1.getId() === item2.getId()));
  }

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

  static diffDate(date1, date2) {
    const diffInMs = Math.abs(date1.getTime() - date2.getTime()); // ミリ秒の差分
    return diffInMs;
  }

  static formatDateTimeManual(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}-${hour}-${minute}-${second}`;
  }
}
this.Utils = Utils;
