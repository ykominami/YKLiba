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
    let ret = determine(cond, array[i][detect_index]);
    if( ret ){
      index = i;
      break;
    }
  }
  return [detect_index, index];
}

function arrayShape(array){
  const size_array = array.map( list => list.length );
  let len_max, len_min;
  if(size_array.length > 0){
    [len_max, len_min] = get_max_and_min(size_array);
  }
  else{
    len_min = len_max = 0;
  }
  const size = array.length;

  return {size: size, len_max: len_max, len_min: len_min};
}

// function getRelativeCordinatesOfTopLeft_simple(array, len_max, size, start_x, start_y, len_min){
function getRelativeCordinatesOfTopLeft_simple(array, shape, startPoint){
    let x = startPoint.x;
  let y = startPoint.y;
  for(let i = 0; i < shape.len_max; i++){
    [x, y] = detect_record(array, "NOT_BLANK", i, 0, shape.size);
    if (y !== -1){
      break;
    }
  }
  return {x:x, y:y};
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
  // let [size, len_max, len_min] = arrayShape(array);
  let shape = arrayShape(array);
  let startPoint = {x:-1, y:-1};
  return getRelativeCordinatesOfTopLeft_simple(array, shape, startPoint);
}

function getRelativeCordinatesOfBottomLeft(array){
  const shape = arrayShape(array);
  let startPoint = {x:-1, y:-1};

  let tlPoint = getRelativeCordinatesOfTopLeft_simple(array, shape, startPoint);

  let blPoint = getRelativeCordinatesOfBottomLeft_simple(array, shape, tlPoint );
  
  return blPoint;
}

function getRelativeCordinatesOfTLandBL(array){
  const shape = arrayShape(array);
  let startPoint = {x:-1, y:-1};

  let tlPoint = getRelativeCordinatesOfTopLeft_simple(array, shape, startPoint);
  let blPoint = getRelativeCordinatesOfBottomLeft_simple(array, shape, tlPoint);

  return { tl: tlPoint, bl: blPoint };
}

function getRelativeCordinatesOfTopRight_simple(array, shape, startPoint){
  return {x:shape.len_min, y:0};
}

function getRelativeCordinatesOfBottomRight_simple(array, shape, startPoint){
  return {x:shape.len_min, y:shape.size};
}

function getRelativeCordinatesOfTopRight(array){
  const shape = arrayShape(array);
  return {x:shape.len_min, y:0};
}

function getRelativeCordinatesOfBottomRight(array){
  const shape = arrayShape(array);
  return {x:shape.len_min, y:shape.size};
}

function getRelativeCordinatesOfTRandBR(array){
  const shape = arrayShape(array);
  const trShape = {x: shape.len_min, y: 0};
  const brShape = {x: shape.len_min, y: shape.size};

  return {tr: trShape, br: brShape};
}

function getRelativeCordinatesOfTLandBlandTRandBR(array){
  const shape = arrayShape(array);
  let startPoint = {x:-1, y:-1};

  let tlPoint = getRelativeCordinatesOfTopLeft_simple(array, shape, startPoint);
  // let [tl_x, tl_y] =getRelativeCordinatesOfTopLeft_simple(array, len_max, size, -1, -1, len_min);

  const trPoint = {x: shape.len_min, y: 0};
  const blPoint = getRelativeCordinatesOfBottomLeft_simple(array, shape, tlPoint);
  // [bl_x, bl_y] =getRelativeCordinatesOfBottomLeft_simple(array, len_max, size, tl_x, tl_y, len_min);
  const brPoint = {x: shape.len_min, y: blPoint.y};
  // const br_y = blShape.y;
  return {tl: tlPoint, bl: blPoint, tr: trPoint, br: brPoint };
  // return [tl_x, tl_y, bl_x, bl_y, len_min, 0, len_min, br_y];
}

function get_reform_data(row_data){
  return row_data.map( row => {
    const date = new Date(row);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const datex = (date.getDate()).toString().padStart(2, '0');

    return `${ year }/${ month }/${ datex }`;
  } );
}

function output_to_document(document, content){
  const body = document.getActiveTab().asDocumentTab().getBody();
  body.appendParagraph(content);
}

function linkedRegion(values, op){
  if( values === null){
    return [];
  }
  return values.reduce( (accumlator, currentValue, currentIndex, array) => {
    if( currentIndex === 0 ){
      if( op(currentValue) ){
        accumlator.push([0, -1]);
        // Log.display_log(`1`)
      }
      else{
        accumlator.push([-1, -1]);
        // Log.display_log(`2`)
      }      
    }
    else{
      array = accumlator[accumlator.length - 1];
      if( op(currentValue) ){
        if( array[0] === -1 ){
          array[0] = currentIndex;
          if( (accumlator.length - 1) === currentIndex ){
            array[1] = currentIndex;
          }
          // Log.display_log(`3`)
        }
        else {
          array[1] = currentIndex;
          // Log.display_log(`4`)
        }
      }
      else{
        if( array[0] === -1 ){
          // do nothing
        }
        else{
          if( array[1] === -1 ){
            array[1] = array[0];
            // Log.display_log(`5`)
          }
          else{
            accumlator.push([-1, -1]);
            // Log.display_log(`6`)
          }
        }
      }      
    }
    return accumlator;
  }, [] );
}

function is_valid_1d_array(array){
  let ret = is_valid_object(array);
  if( ret[0]  === false){
    return ret;
  }
  else if( array.length === 0 ){
    return [false, 'first element of Array is empty array', 10];
  }
  else if( array.length === 1 ){
    ret = is_valid_object(array[0]);
    if( ret[0] === false ){
      return [false, 'first element of Array is null or undefined', 11];
    }
    else{
      if( typeof( array ) === "object"){
        if( typeof(array[0] ) === "object" ){
          return [false, "nested Array", 12];
        }
        else{
          return [true, "1x1 array", 13];
        }
      }
      else{
          return [false, "anything else", 14];
      }
    }
  }
  else if( array.length > 1 ){
    if( typeof(array[0]) === "object" ){
      if( array[0].length > 1 ){
        return [false, "multipule dimension Array", 15];
      }
      else if( array[0].length === 1) {
        return [false, "1 x 1 Array", 16];
      }
      else{
        return [false, "first element of Array is empty array", 17];
      }
    }
    else{
      return [true, `1d Array`, 18];
    }
  }
  else {
    ret = is_valid_object(array[0]);
    if( ret[0] === false ){
      return [false, 'first element of Array is null or undefined', 19];
    }
    else{
      if( typeof(array[0]) === "object" ){
        if( array[0].length == 0){
          return [false, "empty array", 21];
        }
        else if( array[0].length == 1){
          return [false, "1 x 1 Array", 22];
        }
        else{
          return [true , "first element of Array is 1d Array", 23];
        }
      }
      else{
        return [false, "Unknown", 24];
      }
    }
  }
}

function is_valid_2d_array(array){
  let ret = is_valid_object(array);
  if( ret[0]  === false){
    return ret;
  }
  else if( array.length === 1 ){
    ret = is_valid_object(array[0]);
    if( ret[0] === false ){
      return [false, 'first element of Array is null or undefined', 1];
    }
    else{
      if( typeof( array ) === "object"){
        if( typeof(array[0] ) === "object" ){
          return [false, "nested Array", 2];
        }
        else{
          return [true, "11x1 array", 21];
        }
      }
      else{
          return [false, "anything else", 22];
      }
    }
  }
  else if( array.length > 1 ){
    if( typeof(array[0]) === "object" ){
      if( array[0].length > 1 ){
        return [false, "multipule dimension Array", 4];
      }
      else if( array[0].length === 1) {
        return [true, "1 x 1 Array", 5];
      }
      else{
        return [true, "first element of Array is empty array", 6];
      }
    }
    else{
      return [true, `1d Array`, 7];
    }
  }
  else {
    ret = is_valid_object(array[0]);
    if( ret[0] === false ){
      return [false, 'first element of Array is null or undefined', 8];
    }
    else{
      if( array[0].length === 0 ){
        return [false, "first element of Array is empty Array", 9];
      }
      if( typeof(array[0]) === "object" ){
        if( array[0].length == 1){
          return [true, "1 x 1 Array", 10];
        }
        else{
          return [true, "first element of Array is 1d Array", 11];
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
  const aryMax = function (a, b) {return Math.max(a, b);};
  const aryMin = function (a, b) {return Math.min(a, b);};
  let max = array.reduce(aryMax);
  let min = array.reduce(aryMin);

  return [max, min];
}

function get_max_and_min_from_nested_array(array, op){
  const aryMax = function (a, b) {
    if( op(a) >= op(b) ){
      return a;
    }
    else{
      return b;
    }
  };
  const aryMin = function (a, b) {
    if( op(a) >= op(b) ){
      return b;
    }
    else{
      return a;
    }
  };
  let max = array.reduce(aryMax);
  let min = array.reduce(aryMin);

  return [max, min];
}

