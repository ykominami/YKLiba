function get_headerless_range(range){
  const newRange = range.offset(1,  0);
  const shape = getRangeShape(newRange);
  dump_object(shape);
  return newRange;
}

function get_data_as_records_with_header(env){
  let ss;
  let values;
  [ss, sheet] = get_spreadsheet(env.ss_id, env.sheet_name);

  if( typeof(env.header) == "undefined" ){
    values = get_records_with_header(sheet);
  }
  else{
    values = get_record_by_header(sheet, env.header);
  }
  return values;
}

function get_records_with_header(sheet, adjust=null){
  let [header_range, data_range] = get_range_of_header_and_data(sheet, adjust);
  const header = header_range.getValues().pop();
  const data = data_range.getValues();
  return data.map( row => { 
    let hash = {};
    for (let i = 0; i < header.length; i++){
      hash[ header[i] ] = row[i]; 
    }
    return hash;
  } );
}

function get_record_by_header(sheet, header){
  // header = ["id","misc","misc2","purchase_date","price","misc3","category","sub_category","title"];
  // Log.debug(`header=${header}`);

  let [range, values] = get_range_and_values(sheet);
  const buffer = [];
  // Log.debug( `1 buffer=${buffer}` );
  if (range !== null && values !== null){
    // Log.debug( [range, values])
    let index = 0;

    for (const item of values){
      // Log.debug( item );
      const hash = {};
      for(let i = 0; i<header.length; i++){
        index = i + 1;
        hash[ header[i] ] = item[index];
      }
      // Log.debug( `2 buffer=${buffer}` );

      buffer.push(hash);
    }
    // Log.debug( buffer[0] );
  }
  // Log.debug( `Z buffer=${buffer}` );
  return buffer;
}

function get_range_of_header_and_data(sheet, arg_adjust=null){
  const range = get_valid_range(sheet);
  const shape = getRangeShape(range);
  Log.debug(`----- get_range_of_header_and_data`);
  dump_object(shape);
  Log.debug(`-----`);
  const adjust = get_valid_adjust(arg_adjust);
  dump_object(adjust);

  const newRange = range.offset(adjust.r, adjust.c, shape.h + adjust.h, shape.w + adjust.w);
  const height = newRange.getHeight();
  const header_range = newRange.offset(0, 0, 1);
  const data_range = newRange.offset(1, 0, height - 1);

  return [header_range, data_range];
}

function get_range_of_header_and_data_with_width(sheet, adjust=null){
  let [header_range, data_range] = get_range_of_header_and_data(sheet, adjust);
  const shape = getRangeShape(data_range);
  const new_header_range = header_range.offset(0, 0, shape.h, specified_width);
  const new_data_range = data_range.offset(0, 0, shape.ht, specified_width);
  return [new_header_range, new_data_range];
}

function get_records_with_header_from_sheet_first(ss_id, sheet_name){
  let [ss, sheet, sheets, sheets_by_name] = get_spreadsheet_ex(ss_id, sheet_name);
  const sheetx = sheets[0];
  const v = get_records_with_header(sheetx);
  return v;
}

function set_format_to_named_column(sheet, column_name, format, adjust=null){
  let [header_range, data_range] = get_range_of_header_and_data(sheet, adjust);
  let headers = header_range.getValues().pop();
  const index = headers.indexOf(column_name);
  if(index < 0){
    return [];
  }
  const shape = getRangeShape(data_range);
  const column_range = data_range.offset(0, index, shape.h, 1);
  const format_array = [];
  for(let i=0; i<height; i++){
    format_array.push( [format] );
  }
  column_range.setNumberFormat(format_array);
}

function set_format_to_named_rows_sheet_by_sheetname(ss_id, sheetname, column_name, format){
  const [ss, sheet, sheets, sheets_by_name] = get_sheets(ss_id);
  const sheetx = sheets_by_name[sheetname];
  set_format_to_named_column(sheetx, column_name, format);
}

