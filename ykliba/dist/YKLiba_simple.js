function get_simple_rows_with_env(env, maxRange = null) {
  const [ss, sheet] = get_spreadsheet(env.ss_id, env.sheet_name);
  const values = get_simple_rows(sheet, maxRange);
  return values;
}

function simple_rows_range_x(sheetx) {
  const [values, range] = get_simple_rows_and_range(sheetx);

  const tl_bl_Point = getRelativeCordinatesOfTLandBL(values);

  const rindex = get_rindex(values[0]);
  const simple_width = rindex;
  const shape = getRelativeCordinatesOfTLandBlandTRandBR(values);
  const simple_range = range.offset(shape.tl.y, shape.tl.x, (shape.bl.y - shape.tl.y), simple_width);
  return simple_range;
}

function simple_rows_x(sheetx) {
  const simple_range = simple_rows_range_x(sheetx);
  const v = simple_range.getValues();
  return v;
}

function get_simple_rows_range(sheet) {
  return getValidRange(sheet);
}

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

function get_simple_rows_and_range(sheet, maxRange = null) {
  const range = get_valid_range(sheet);
  let values = [];
  if (range !== null && maxRange !== null) {
    newRange = adjustRange(range, maxRange.h, maxRange.w)
    values = newRange.getValues();
  }
  return [values, newRange];
}

function get_simple_rows_and_range_x(ss_id, sheet_name, maxRange = null) {
  const [ss, sheet, sheets, sheets_by_name] = get_spreadsheet_ex(ss_id, sheet_name);
  const sheetx = sheets_by_name[sheet_name];
  return get_simple_rows_and_range(sheetx, maxRange);
}
