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
  const [range, values] = get_range_and_values(sheet);
  if ( (range !== null && typeof(range) !== "undefined") && values !== null){
    const shape = getRangeShape(range);
    const tlRelative
     = getRelativeCordinatesOfTopLeft(values);

    const new_height = shape.h - tlRelative.y;
    const new_width = shape.w - tlRelative.x;
    newRange = range.offset(tlRelative.y,  tlRelative.x, new_height, new_width);
  }
  return newRange;
}

function getRangeShape(range){
  const column = range.getColumn();
  const row = range.getRow();
  const height = range.getHeight();
  const width = range.getWidth();

  return make_shape({r:row, c:column, h:height, w:width} );
}

function setValues(range, values){
  range.setValues(values);
}

function get_column(data_range, index){
  let data_array = data_range.getValues();
  return data_array.map( row => row[index] );
}

function insertOneRow(sheet, arg_adjust=null){
  const [header_range, data_range] = get_range_of_header_and_data(sheet, arg_adjust);
  const shape = getRangeShape(data_range);
  const target_range = data_range.offset(0, 0, 1, shape.w);
  target_range.insertCells(SpreadsheetApp.Dimension.COLUMNS);
}

function grouping(values, op){
  // Log.display_log(values)
  return values.reduce((hash, curVal, index) => {
    // Log.display_log(curVal)

    const [key, value] = op(curVal);
    if( typeof(hash[key]) === "undefined" ){
      hash[key] = [value];
    }
    else{
      hash[key] = [...hash[key], value];
    }
    return hash;
  }, {} );
}

function valid_string( value ){
  if( typeof(value) === "undefined" ){
    return "";
  }
  return value.toString();
}

function compare_with_string(a,b){
  const aStr = valid_string(a);
  const bStr = valid_string(b);
  if( aStr < bStr ){
    return -1;
  }
  if( aStr > bStr ){
    return 1;
  }
  return 0;
}

function sortx(array, op){
  return array.sort(op);
}

function grouping_with_range(range, op){
  const values = range.getValues();
  return grouping(values, op);
}

function divide_range_x(range, grouping_op, link_op){
  const hash = grouping_with_range(range, grouping_op );
  // const index = 0
  // const cond_value = 2
  const values = range.getValues();
  const result = linkedRegion(values, link_op);
  // Log.display_log(result)
  const width = values[0].length;
  const targetRange = range.offset(result[0][0], 0, result[0][1] - result[0][0] + 1, width);
  const shape = getRangeShape(targetRange);
  dump_object(shape);
  return targetRange;
}
