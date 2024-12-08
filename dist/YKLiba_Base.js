function get_ss_id(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let ret = "";
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
  const sheets_by_name = {};
  for(let sheetx of sheets){
    sheets_by_name[sheetx.getName()] = sheetx;
  }
  return [ss, sheet, sheets, sheets_by_name];
}

function get_sheets(ss_id){
  const ss = SpreadsheetApp.openById(ss_id);
  const sheets = ss.getSheets();
  const sheets_by_name = {};
  for(let sheetx of sheets){
    sheets_by_name[sheetx.getName()] = sheetx;
  }
  return [ss, sheets[0], sheets, sheets_by_name];
}

