function test_get_folder(){
  const folder_id = get_folder_id_by_key("Frontend Focus")
  const folder = get_folder_by_id(folder_id)
}

function get_headerless_range(range){
  const newRange = range.offset(1,  0);
  [new_column, new_row, new_height, new_width] = getRangeShape(newRange);
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

function get_records_with_header(sheet){
  [header_range, data_range] = get_range_of_header_and_data(sheet)
  const header = header_range.getValues().pop();
  const data = data_range.getValues();
  return data.map( row => { 
    hash = {};
    for (let i = 0; i < header.length; i++){
      hash[ header[i] ] = row[i]; 
    }
    return hash;
  } )
}

function get_record_by_header(sheet, header){
  // header = ["id","misc","misc2","purchase_date","price","misc3","category","sub_category","title"];
  // display_log(`header=${header}`);

  [range, values] = get_range_and_values(sheet);
  const buffer = [];
  // display_log( `1 buffer=${buffer}` );
  if (range !== null && values !== null){
    // display_log( [range, values])
    let index = 0;

    for (const item of values){
      // display_log( item );
      const hash = {};
      for(let i = 0; i<header.length; i++){
        index = i + 1;
        hash[ header[i] ] = item[index];
      }
      // display_log( `2 buffer=${buffer}` );

      buffer.push(hash);
    }
    // display_log( buffer[0] );
  }
  // display_log( `Z buffer=${buffer}` );
  return buffer;
}

function get_range_of_header_and_data(sheet){
  const range = get_valid_range(sheet);
  const height = range.getHeight();
  const header_range = range.offset(0, 0, 1);
  const data_range = range.offset(1, 0, height - 1);

  return [header_range, data_range];
}

function get_range_of_header_and_data_with_width(sheet, specified_width){
  [header_range, data_range] = get_range_of_header_and_data(sheet);
  [column, row, height, width] = getRangeShape(data_range);
  const new_header_range = header_range.offset(0, 0, height, specified_width)
  const new_data_range = data_range.offset(0, 0, height, specified_width)
  return [new_header_range, new_data_range];
}
function Sortx_in_range_x(data_range, sort_options) {
  sort_option_array = make_field_condition_2( sort_options );

  display_log(`Sortx_in_range sort_option_array=${ JSON.stringify(sort_option_array) }`)
  data_range.activate()
  .sort(sort_option_array);

  return data_range;
}
function Sortx_in_range(data_range,config) {
  let sort_option_array;
  const column = data_range.getColumn();

  display_log(`Sortx_in_range config=${JSON.stringify(config)}`);

  display_log(`Sortx_in_range column=${column} config.sort_options=${config.sort_options}`)
  return Sortx_in_range_x(data_range, config.sort_options);

/*
  sort_option_array = make_field_condition_2( config.sort_options );

  display_log(`Sortx_in_range sort_option_array=${ JSON.stringify(sort_option_array) }`)
  data_range.activate()
  .sort(sort_option_array);

  return [data_range];
  */
}

function Sortx(sheet,config) {
  [header_range, data_range] = get_range_of_header_and_data(sheet)
  return Sortx_in_range(data_range, config);
}

function get_records_with_header_from_sheet_first(ss_id, sheet_name){
  [ss, sheet, sheets, sheets_by_name] = get_spreadsheet_ex(ss_id, sheet_name);
  const sheetx = sheets[0];
  const v = get_records_with_header(sheetx);
  return v;
}

function set_format_to_named_column(sheet, column_name, format){
  [header_range, data_range] = get_range_of_header_and_data(sheet);
  headers = header_range.getValues().pop();
  const index = headers.indexOf(column_name);
  if(index < 0){
    return [];
  }
  [column, row, height, width] = getRangeShape(data_range);
  const column_range = data_range.offset(0, index, height, 1);
  const format_array = [];
  for(let i=0; i<height; i++){
    format_array.push( [format] );
  }
  column_range.setNumberFormat(format_array);
}

function set_format_to_named_rows_sheet_by_sheetname(ss_id, sheetname, column_name, format){
  [ss, sheet, sheets, sheets_by_name] = get_sheets(ss_id)
  const sheetx = sheets_by_name[sheetname]
  set_format_to_named_column(sheetx, column_name, format);
}

