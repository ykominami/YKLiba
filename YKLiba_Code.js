function get_headerless_range(range) {
  const newRange = range.offset(1, 0);
  const shape = getRangeShape(newRange);
  dump_object(shape);
  return newRange;
}

function get_data_as_records_with_header(env, adjust = null) {
  let ss;
  let values;
  [ss, sheet] = get_spreadsheet(env.ss_id, env.sheet_name);

  if (typeof (env.header) === 'undefined') {
    values = get_records_with_header(sheet, adjust);
  } else {
    values = get_record_by_header(sheet, env.header);
  }
  return values;
}

function get_records_with_header(sheet, adjust = null) {
  Logger.log(`YKLiba_Code.gs get_records_with_header adjust=${adjust}`)
  const [header_range, data_range] = get_range_of_header_and_data(sheet, adjust);
  const header = header_range.getValues().pop();
  const data = data_range.getValues();
  data_hash = data.map((row) => {
    const hash = {};
    for (let i = 0; i < header.length; i++) {
      hash[header[i]] = row[i];
    }
    return hash;
  });
  return [header_range, data_range, data_hash]
}

function get_record_by_header(sheet, header) {
  // header = ["id","misc","misc2","purchase_date","price","misc3","category","sub_category","title"];
  // Log.debug(`header=${header}`);

  const [range, values] = getRangeAndValues(sheet);
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
function transformRange2(range, height, width){
  const shape = getRangeShape(range)
  r2 = shape.r;
  c2 = shape.c;
  h2 = height;
  w2 = width;
  Logger.log(`transformRange2 r2=${r2} c2=${c2} h2=${h2} w2=${w2}`);
  return range.offset(r2, c2, h2, w2);
}

function transformRange(range, argAdjust){
  Logger.log(`transformRange range=${range}`);
  Logger.log(`transformRange range.r=${range.r} range.c=${range.c} range.h=${range.h} range.w=${range.w}`);
  const shape = getRangeShape(range)
  Logger.log(`transformRange shape=${shape}`);
  Logger.log(`transformRange shape.r=${shape.r} shape.c=${shape.c} shape.h=${shape.h} shape.w=${shape.w}`);
  Logger.log(`transformRange argAdjust=${argAdjust}`);
  const adjust = get_valid_adjust(argAdjust);
  Logger.log(`transformRange adjust=${adjust}`);
  Logger.log(`transformRange adjust.r=${adjust.r} adjust.c=${adjust.c} adjust.h=${adjust.h} adjust.w=${adjust.w}`);
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
  Logger.log(`transformRange r2=${r2} c2=${c2} h2=${h2} w2=${w2}`);
  return range.offset(r2, c2, h2, w2);
}

function get_range_of_header_and_data(sheet, argAdjust = null) {
  const range = getValidRange(sheet);
  Logger.log(`YKLiba_Code.js get_range_of_header_and_data range.r=${range.r} range.c=${range.c} range.h=${range.h} range.w=${range.w}`);
  const shape = getRangeShape(range);
  Logger.log(`YKLiba_Code.js get_range_of_header_and_data shape.r=${shape.r} shape.c=${shape.c} shape.h=${shape.h} shape.w=${shape.w}`);
  Logger.log(`YKLiba_Code.js get_range_of_header_and_data argAdjust.r=${argAdjust.r} argAdjust.c=${argAdjust.c} argAdjust.h=${argAdjust.h} argAdjust.w=${argAdjust.w}`);
  const newRange = transformRange(range, argAdjust)
  const height = newRange.getHeight();
  const headerRange = newRange.offset(0, 0, 1);
  const dataRange = newRange.offset(1, 0, height - 1);

  return [headerRange, dataRange];
}

function get_range_of_header_and_data_with_width(sheet, adjust = null) {
  Logger.log(`YKLiba_Code.js get_range_of_header_and_data_with_width argAdjust.r=${argAdjust.r} argAdjust.c=${argAdjust.c} argAdjust.h=${argAdjust.h}`);
  
  const [header_range, data_range] = get_range_of_header_and_data(sheet, adjust);
  const shape = getRangeShape(data_range);
  const new_header_range = header_range.offset(0, 0, shape.h, specified_width);
  const new_data_range = data_range.offset(0, 0, shape.ht, specified_width);
  return [new_header_range, new_data_range];
}

function get_records_with_header_from_sheet_first(ss_id, sheet_name, adjust = null) {
  const [ss, sheet, sheets, sheets_by_name] = get_spreadsheet_ex(ss_id, sheet_name);
  const sheetx = sheets[0];
  const v = get_records_with_header(sheetx, adjust);
  return v;
}

function set_format_to_named_column(sheet, column_name, format, adjust = null) {
  Logger.log(`YKLiba_Code.js set_format_to_named_column  argAdjust.r=${argAdjust.r} argAdjust.c=${argAdjust.c} argAdjust.h=${argAdjust.h}`);
  const [header_range, data_range] = get_range_of_header_and_data(sheet, adjust);
  const headers = header_range.getValues().pop();
  const index = headers.indexOf(column_name);
  if (index < 0) {
    return [];
  }
  const shape = getRangeShape(data_range);
  const column_range = data_range.offset(0, index, shape.h, 1);
  const format_array = [];
  for (let i = 0; i < height; i++) {
    format_array.push([format]);
  }
  column_range.setNumberFormat(format_array);
}

function set_format_to_named_rows_sheet_by_sheetname(ss_id, sheetname, column_name, format) {
  const [ss, sheet, sheets, sheets_by_name] = get_sheets(ss_id);
  const sheetx = sheets_by_name[sheetname];
  set_format_to_named_column(sheetx, column_name, format);
}
