function get_simple_rows_with_env(env){
  let [ss, sheet] = get_spreadsheet(env.ss_id, env.sheet_name);
  const values = get_simple_rows(sheet);
  return values;
}

function simple_rows_range_x(sheetx){
  let [values, range] = get_simple_rows_and_range(sheetx);

  let tl_bl_Point = getRelativeCordinatesOfTLandBL(values);

  let rindex = get_rindex(values[0]);
  let simple_width = rindex;
  let shape = getRelativeCordinatesOfTLandBlandTRandBR(values);
  const simple_range = range.offset(shape.tl.y, shape.tl.x, (shape.bl.y - shape.tl.y), simple_width);
  return simple_range;
}

function simple_rows_x(sheetx){
  const simple_range = simple_rows_range_x(sheetx);
  const v = simple_range.getValues();
  return v;
}

function get_simple_rows_range(sheet) {
  return get_valid_range(sheet);
}

function get_simple_rows(sheet) {
  const range = get_simple_rows_range(sheet);
  let values = [];
  if (range !== null){
    values = range.getValues();
  }
  return values;
}

function get_simple_rows_and_range(sheet) {
  const range = get_valid_range(sheet);
  let values = [];
  if (range !== null){
    values = range.getValues();
  }
  return [values, range];
}

function get_simple_rows_x(ss_id, sheet_name){
  let [ss, sheet, sheets, sheets_by_name] = get_spreadsheet_ex(ss_id, sheet_name);
  const sheetx = sheets_by_name[sheet_name];
  const v = get_simple_rows(sheetx);
  return v;
}
