function get_ss_id(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ret = "";
  if (ss !== null){
    ret = ss.getId();
  }
  return ret;
}

function get_spreadsheet(ss_id, sheet_name = null){
  const ss = SpreadsheetApp.openById(ss_id);
  let sheet = null;
  if( sheet_name != null ){
    sheet = ss.getSheetByName(sheet_name);
  }
  return [ss, sheet];
}

function get_spreadsheet_ex(ss_id, sheet_name = null){
  const ss = SpreadsheetApp.openById(ss_id);
  let sheet = null;
  if( sheet_name !== null ){
    sheet = ss.getSheetByName(sheet_name);
  }
  const sheets = ss.getSheets();
  const sheets_by_name = {}
  for(let sheetx of sheets){
    sheets_by_name[sheetx.getName()] = sheetx;
  }
  return [ss, sheet, sheets, sheets_by_name];
}

function get_sheets(ss_id){
  const ss = SpreadsheetApp.openById(ss_id);
  const sheets = ss.getSheets();
  const sheets_by_name = {}
  for(let sheetx of sheets){
    sheets_by_name[sheetx.getName()] = sheetx;
  }
  return [ss, sheets[0], sheets, sheets_by_name];
}

function get_range_and_values(sheet){
  let range = null;
  let values = null;
  if ( sheet !== null && typeof(sheet) !== "undefined" ){
    range = sheet.getDataRange();
    values = range.getValues();
  }
  return [range, values];
}

function get_valid_range(sheet){
  let newRange = null;
  let range;
  let values;
  [range, values] = get_range_and_values(sheet);
  if ( (range !== null && typeof(range) !== "undefined") && values !== null){
    const right = range.getLastColumn();
    [column, row, height, width] = getRangeShape(range);

    [top_left_relative_x, top_left_relative_y] = getRelativeCordinatesOfTopLeft(values);

    const new_height = height - (top_left_relative_y);
    const new_width = width - (top_left_relative_x);
    newRange = range.offset(top_left_relative_y,  top_left_relative_x, new_height, new_width);
  }
  return newRange;
}

function determine(cond, value){
  let ret;
  if( value === null ){
    if(cond === "NOT_BLANK"){
      return true;
    }
    else{
      return false;
    }
  }
  if( typeof(value) === "undefined" ){
    if(cond === "NOT_BLANK"){
      return false;
    }
    else{
      return true;
    }
  }
  if( typeof(value) === "string" ){
    const str = value.trim();
    if(cond === "NOT_BLANK"){
      ret = (str !== "");
      return ret;
    }
    else {
      ret = (str === "");
      return ret;
    }
  }
  if(cond === "NOT_BLANK"){
    ret = (value !== "");
    return ret;
  }
  else {
    ret = (value === "");
    return ret;
  }
}

function detect_record(array, cond, detect_index, start_y, h){
  let index = -1;
  if( start_y < 0 ){
    return [-1,-1];
  }
  for(let i = start_y; i < h; i++){
    ret = determine(cond, array[i][detect_index]);
    if( ret ){
      index = i;
      break
    }
  }
  return [detect_index, index];
}

function arrayShape(array){
  const size_array = array.map( list => list.length );
  if(size_array.length > 0){
    [len_max, len_min] = get_max_and_min(size_array);
  }
  else{
    len_min = len_max = 0
  }
  const size = array.length;

  return [size, len_max, len_min];
}

function getRelativeCordinatesOfTopLeft_simple(array, len_max, size, start_x, start_y, len_min){
  let x = start_x;
  let y = start_y;
  for(let i = 0; i < len_max; i++){
    [x, y] = detect_record(array, "NOT_BLANK", i, 0, size);
    if (y !== -1){
      break;
    }
  }
  return [x, y];
}
// function detect_record(array, cond, detect_index, start_y, h){
function getRelativeCordinatesOfBottomLeft_simple(array, len_max, size, start_x, start_y, len_min){
  let x = start_x;
  let y = start_y;
  for(let i = start_y; i < len_max; i++){
    [x, y] = detect_record(array, "BLANK", start_x, i, size);
    if (y != -1){
      y -= 1;
      break;
    }
  }
  return [x, y];
}

function getRelativeCordinatesOfTopLeft(array){
  [size, len_max, len_min] = arrayShape(array);

  return getRelativeCordinatesOfTopLeft_simple(array, len_max, size, len_min);
}

function getRelativeCordinatesOfBottomLeft(array){
  [size, len_max, len_min] = arrayShape(array);

  [tl_x, tl_y] =getRelativeCordinatesOfTopLeft_simple(array, len_max, size, -1, -1, len_min);

  [bl_x, bl_y] =getRelativeCordinatesOfBottomLeft_simple(array, len_max, size, tl_x, tl_y, len_min);

  return [bl_x, bl_y];
}

function getRelativeCordinatesOfTLandBL(array){
  [size, len_max, len_min] = arrayShape(array);

  [tl_x, tl_y] =getRelativeCordinatesOfTopLeft_simple(array, len_max, size, -1, -1, len_min);

  [bl_x, bl_y] =getRelativeCordinatesOfBottomLeft_simple(array, len_max, size, tl_x, tl_y, len_min);

  return [tl_x, tl_y, bl_x, bl_y];
}

function getRelativeCordinatesOfTopRight_simple(array, len_max, size, start_x, start_y, len_min){
  return [len_min, 0]
}

function getRelativeCordinatesOfBottomRight_simple(array, len_max, size, start_x, start_y, len_min){
  return [len_min, size]
}

function getRelativeCordinatesOfTopRight(array){
  [size, len_max, len_min] = arrayShape(array);

  // return getRelativeCordinatesOfTopRight_simple(array, len_max, size, len_min);
  return [len_min, 0];
}

function getRelativeCordinatesOfBottomRight(array){
  [size, len_max, len_min] = arrayShape(array);
  /*
  [tr_x, tr_y] =getRelativeCordinatesOfTopRight_simple(array, len_max, size, -1, -1, len_min);

  [br_x, br_y] =getRelativeCordinatesOfBottomRight_simple(array, len_max, size, tl_x, tl_y, len_min);
  */
  return [len_min, size];
}

function getRelativeCordinatesOfTRandBR(array){
  [size, len_max, len_min] = arrayShape(array);

  return [len_min, 0, len_min, size];
}

function getRelativeCordinatesOfTLandBlandTRandBR(array){
  [size, len_max, len_min] = arrayShape(array);

  [tl_x, tl_y] =getRelativeCordinatesOfTopLeft_simple(array, len_max, size, -1, -1, len_min);

  // [bl_x, bl_y] =getRelativeCordinatesOfBottomLeft_simple(array, len_max, size, tl_x, tl_y, len_min);
  const br_y = bl_y;
  return [tl_x, tl_y, bl_x, bl_y, len_min, 0, len_min, br_y];
}

function getRangeShape(range){
  const column = range.getColumn();
  const row = range.getRow();
  const height = range.getHeight();
  const width = range.getWidth();

  return [column, row, height, width];
}

function setValues(range, values){
  range.setValues(values);
}

function get_column(data_range, index){
  data_array = data_range.getValues();
  return data_array.map( row => row[index] )
}

function get_reform_data(row_data){
  return row_data.map( row => {
    const date = new Date(row);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const datex = (date.getDate()).toString().padStart(2, '0');

    return `${ year }/${ month }/${ datex }`
  } )
}

function output_to_document(document, content){
  const body = document.getActiveTab().asDocumentTab().getBody();
  body.appendParagraph(content);
  // body.appendParagraph('{address}');
  // body.appendParagraph('{city} {state} {zip}');

}

function get_folder(folder_id){
  return DriveApp.getFolderById(folder_id)
}

function create_file(folder, name, content){
  folder.createFile(name, content)
}

function get_file(folder, name){
  display_log(`folder=${folder}`)
  files = folder.getFilesByName(name)
  while (files.hasNext()) {
    const file = files.next();
    Logger.log(file.getName());
    Logger.log(file.getId());
    return file
  }
  return null;
}

function test_remove_files_unser_folder(){
  const folder = get_folder_by_key("Frontend Focus")
  remove_files_under_folder(folder)
}

function remove_files_under_folder(folder){
  files = folder.getFiles()
  while (files.hasNext()) {
    const file = files.next();
    file.setTrashed(true)
  }
  return true  
}

function clear_sheet(sheet){
  const lastRow = sheet.getLastRow()
  sheet.deleteRows(0, lastRow)
}
