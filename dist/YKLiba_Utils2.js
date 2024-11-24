
function display_log(message){
  display(message, 'CUI', true);
}

function display_alert(message){
  display(message, 'GUI', true);
}

function display(message, kind, mode){
  if(mode != true){
    return;
  }
  if(kind == "GUI"){
    const ui = SpreadsheetApp.getUi();
    ui.alert( message )
  }
  else{
    Logger.log( message );    
  }
}

function isEqual(array_a, array_b){
  return JSON.stringify(array_a) === JSON.stringify(array_b)
}
function tojson(array){
  return JSON.stringify(array)
}
function is_valid_object(array){
  if( array === null ){
    return [false, "null", 1]
  }
  else if( typeof(array) === "undefined"){
    return [false, "message: undefined", 2]
  }
  else {
    return [true, "true", 3]
  }
}

function is_valid_1d_array(array){
  let ret = is_valid_object(array)
  if( ret[0]  === false){
    return ret
  }
  else if( array.length === 0 ){
    return [false, 'first element of Array is empty array', 10]
  }
  else if( array.length === 1 ){
    ret = is_valid_object(array[0])
    if( ret[0] === false ){
      return [false, 'first element of Array is null or undefined', 11]
    }
    else{
      if( typeof( array ) === "object"){
        if( typeof(array[0] ) === "object" ){
          return [false, "nested Array", 12]
        }
        else{
          return [true, "1x1 array", 13]
        }
      }
      else{
          return [false, "anything else", 14]
      }
    }
  }
  else if( array.length > 1 ){
    if( typeof(array[0]) === "object" ){
      if( array[0].length > 1 ){
        return [false, "multipule dimension Array", 15]
      }
      else if( array[0].length === 1) {
        return [false, "1 x 1 Array", 16]
      }
      else{
        return [false, "first element of Array is empty array", 17]
      }
    }
    else{
      return [true, `1d Array`, 18]
    }
  }
  else {
    ret = is_valid_object(array[0])
    if( ret[0] === false ){
      return [false, 'first element of Array is null or undefined', 19]
    }
    else{
      if( typeof(array[0]) === "object" ){
        if( array[0].length == 0){
          return [false, "empty array", 21]
        }
        else if( array[0].length == 1){
          return [false, "1 x 1 Array", 22]
        }
        else{
          return [true , "first element of Array is 1d Array", 23]
        }
      }
      else{
        return [false, "Unknown", 24]
      }
    }
  }
}


function is_valid_2d_array(array){
  let ret = is_valid_object(array)
  if( ret[0]  === false){
    return ret
  }
  else if( array.length === 1 ){
    ret = is_valid_object(array[0])
    if( ret[0] === false ){
      return [false, 'first element of Array is null or undefined', 1]
    }
    else{
      if( typeof( array ) === "object"){
        if( typeof(array[0] ) === "object" ){
          return [false, "nested Array", 2]
        }
        else{
          return [true, "11x1 array", 21]
        }
      }
      else{
          return [false, "anything else", 22]
      }
    }
  }
  else if( array.length > 1 ){
    if( typeof(array[0]) === "object" ){
      if( array[0].length > 1 ){
        return [false, "multipule dimension Array", 4]
      }
      else if( array[0].length === 1) {
        return [true, "1 x 1 Array", 5]
      }
      else{
        return [true, "first element of Array is empty array", 6]
      }
    }
    else{
      return [true, `1d Array`, 7]
    }
  }
  else {
    ret = is_valid_object(array[0])
    if( ret[0] === false ){
      return [false, 'first element of Array is null or undefined', 8]
    }
    else{
      if( array[0].length === 0 ){
        return [false, "first element of Array is empty Array", 9]
      }
      if( typeof(array[0]) === "object" ){
        if( array[0].length == 1){
          return [true, "1 x 1 Array", 10]
        }
        else{
          return [true, "first element of Array is 1d Array", 11]
        }
      }
    }
  }
}

function is_equal_array_one_dim(array_a, array_b){
  const length_a = array_a.length;
  const length_b = array_b.length;
  if( length_a !== length_b ){
    return [false, ['length of array are different', height_a, height_b]];
  }

  for(let x=0; x<length_a; x++){
    if( array_a[x] !== array_b[x] ){
      return [false, ['element of array are different, x', array_a[x], array_b[x]] ];
    }
  }
  return [true, ['same array', 0, 0]];
}

function is_equal_array_two_dim(array_a, array_b){
  const height_a = array_a.length;
  const height_b = array_b.length;
  if( height_a !== height_b ){
    return [false, [1, height_a, height_b]];
  }

  const width_a = array_a[0].length;
  const width_b = array_b[0].length;
  if( width_a !== width_b ){
    return [false, [2, width_a, width_b]];
  }

  for(let y=0; y<height_a; y++){
    for(let x=0; x<width_a; x++){
      if( array_a[y][x] !== array_b[y][x] ){
        return [false, [3, x, y, array_a[y][x], array_b[y][x]]];
      }
    }
  }
  return [true, [0, 0, 0]];
}

function is_equal_array(array_a, array_b){
  // const ret_check = is_valid_2d_array(array_a)
  if( typeof( array_a[0]) === "object" ){
    return is_equal_array_two_dim(array_a, array_b);
  }
  else{
    return is_equal_array_one_dim(array_a, array_b);
  }
}


function get_max_and_min(array){
  const aryMax = function (a, b) {return Math.max(a, b);}
  const aryMin = function (a, b) {return Math.min(a, b);}
  let max = array.reduce(aryMax);
  let min = array.reduce(aryMin);

  return [max, min];
}

function dump_range(range){
  const array = range.getValues();
  const h = array.length;
  for( let i = 0; i<h; i++){
    display_log(`${i}=${array[i]}`);
  }
}

function dump_array(array){
  for (let row of array){
    display_log( row );
  }
}

function make_column(data){
  return data.map( row => [row] );
}

function detect_blank(values){
  const max = values.length;

  for(let i=0; i<max; i++){
    if( values[i][0] !== '' ){
      return i;
    }
  }
  return -1;
}

function get_rindex(array){
  let str;
  const w = array.length - 1;
  rindex = -1;
  // display_log(`w=${w} array=${array}`)
  for(let i = w; 0 <= i; i--){
    // display_log(`array[${i}] = ${array[i]}`)
    str = array[i].trim();
    if( str !== ""){
      rindex = i;
      break;
    }
    else{
      // display_log(`i=${i} str=${str}`)
    }
  }
  return rindex;
}

function char_code(ch){
  return ch.charCodeAt(0);
}

function column_number(ch, order_num, a_code = null){
  if( a_code == null ){
    a_code = char_code('A');
  }
  return ch.toUpperCase().charCodeAt(order_num) - a_code + 1;
}

function get_column_number(ch){
  if(ch == null){
    return null;
  }
  if( typeof(ch) == "undefined"){
    return null;
  }
  let num = null;
  let num1 = null;
  let num2 = null;
  const a_code = char_code('A');
  const z_code = char_code('Z');
  const z_num = z_code - a_code + 1;

  const width = ch.length;
  switch(width){
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

function detect_row_index(array, col_num, value){
  const height = array.length;
  let start_index = -1;
  let end_index = -1;
  for(let y = 0; y < height; y++){
    if (array[y][col_num] == value){
      if( start_index < 0 ){
        start_index = y;
        end_index = start_index;
      }
      else{
        end_index = y;
      }
    }
  }
  return [start_index, end_index];
}

function extend_array( base_array, right_side_array, bottom_side_array){
  const height = right_side_array.length;
  if(height !== base_array.length){
    return null;
  }
  const width = bottom_side_array.length;
  if(width !== base_array[0].length){
    return null;
  }

  const ret_array_height = height + 1;
  // const ret_array_width = width + 1;
  ret_array = Array(ret_array_height);
  for(let y=0; y<height; y++){
    ret_array[y] = [...base_array[y], right_side_array[y] ];
  }
  ret_array[ ret_array_height - 1 ] = [...bottom_side_array , 0];

  return ret_array;
}

function sum_row_and_sum_column(array){
  const height = array.length;
  if( typeof(array[0]) === "undefined" ){
    return [[], []]
  }
  const width = array[0].length;
  const row_length = width;
  const column_length = height;
  const row_count = Array(row_length).fill(0);
  const column_count = Array(column_length).fill(0);;

  for(let y=0; y<height; y++){
    for(let x=0; x<width; x++){
      row_count[x]    += array[y][x];
      column_count[y] += array[y][x];
    }
  }
  return [row_count, column_count];
}

function test_date_staring(){
  const today = new Date()
  const date_str = make_date_string(today)
  display_log(`date_str=${date_str}` )
}

function make_date_string(date){
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
  // console.log(formattedDate); // 出力例: 2024-11-21
  return formattedDate
}

function messageArrayDiff(array1, array2) {
  return array1.filter(item1 => 
    !array2.some(item2 => item1.getId() === item2.getId())
  );
}

function output_file_under_folder(folder, file_name, content){
  let document = null
  // file_name = "d"
  content = ""
  file = get_file(folder, file_name)
  if( file === null ){
    document = DocumentApp.create(file_name)
    file_id = document.getId()
    file = DriveApp.getFileById(file_id)
    file.moveTo(folder)
    // display_log(`1`)
  }
  else {
    file_id = file.getId()
    document = DocumentApp.openById(file_id)
    // display_log(`2`)
  }
  output_to_document(document, content)
}
function diff_date(date1, date2){
   const diffInMs = Math.abs(date1.getTime() - date2.getTime()); // ミリ秒の差分
   return diffInms
}
