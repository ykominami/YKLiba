function make_shape(obj){
  return {
    r: obj.r,
    c: obj.c,
    h: obj.h,
    w: obj.w
  };
}
function make_adjust(obj){
  return {
    r: obj.r,
    c: obj.c,
    h: obj.h,
    w: obj.w
  };
}
function get_valid_adjust(arg_adjust){
  let adjust;
  if( arg_adjust === null ){
    adjust = make_adjust({r:0, c:0, h:0, w:0});
  }
  else{
    adjust = arg_adjust;
  }
  return adjust;
}
function make_funcion_get_env(){
  const ss_id = get_ss_id();
  const message = `function get_env() {
  return {
    ss_id: "${ss_id}",
    sheet_name:"Sheet1",
    display_mode: false
  }
}`;
  return message;
}

function make_config(env, ...fields){
  return { display_mode: env.display_mode, ss_id: env.ss_id, sheet_name: env.sheet_name, sort_options: null, column_index: env.column_index, fields: fields.pop() };
}

function make_config_2(env, sort_options, ...fields){
  if( sort_options != null ){
    obj = { display_mode: env.display_mode, ss_id: env.ss_id, sheet_name: env.sheet_name, sort_options: sort_options, column_index: -1, fields: fields };    
  }
  else{
    obj = { display_mode: env.display_mode, ss_id: env.ss_id, sheet_name: env.sheet_name, sort_options: null, column_index: env.column_index, fields: fields };
  }
  return obj;
}

function convert_ascending_sort_option(ch){
  sort_char = ch.toLowerCase();
  if( sort_char === 'a' ){
    sort_option = true;
  }
  else{
    sort_option = false;
  }
  return sort_option;
}

function convert_column_number(ch){
  let column_number = ch;

  if(typeof(ch) === "string"){
    column_number = get_column_number(ch);
  }
  return column_number;
}

function make_ascending_sort_option_in_array(item){
  const column_number = convert_column_number(item[0]);
  const sort_option = convert_ascending_sort_option(item[1]);

  return [column_number, sort_option];
}

function make_ascending_sort_option_array_2(array){
  let sort_char;
  let sort_option;

  let column_number = -1;

  const array2 = array.map( item => {
    if (item !== null){
      const typeof_item = typeof(item);
      if( typeof_item === "array" || typeof_item === "object" ){
        return make_ascending_sort_option_in_array(item);
      }
      else{
        return [];
      }
    }
    else{
      return null;
    }
  } );
  return array2;
}

function make_ascending_sort_option_array(array){
  let sort_char;
  let sort_option;

  const v = array.map( item => {
    if (item !== null){
      sort_char = item[0].toLowerCase();
      if( sort_char === 'a' ){
        sort_option = true;
      }
      else{
        sort_option = false;
      }
    }
    else{
      sort_option = null;
    }
    return sort_option;
  } );
  return v;
}

function make_field_condition_2(array ){
  // Log.debug(`make_field_condition_2 array=${ JSON.stringify(array) }`)
  const sort_option_array = make_ascending_sort_option_array_2(array);
  // Log.debug(`make_field_condition_2 sort_option_array=${ JSON.stringify(sort_option_array) }`)
  // return sort_option_array;
  const ret = sort_option_array.filter( item => {
        return item !== null;
  }).map( item => {
    return {column: item[0], ascending: item[1]};
  });
  // Log.debug(`make_field_condition_2 ret=${JSON.stringify(ret)}`);
  return ret;
}

function make_field_condition( column_index, array ){
  // Log.debug(`make_field_condition column_index=${column_index} array=${array}`);
  const ret_array = [];
  const sort_option_array = make_ascending_sort_option_array(array);
  for( let i = 0; i < sort_option_array.length; i++ ){
    if (sort_option_array[i] !== null){
      ret_array.push({column: column_index + i, ascending: sort_option_array[i]} );
    }
  }

  return ret_array;
}
