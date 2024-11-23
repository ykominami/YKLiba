function make_mask_pattern(array){
  const ret_check = is_valid_2d_array(array)
  if( ret_check[0] === false ){
    return []
  }
  const height = array.length;
  const width = array[0].length;
  const buffer = [];

  for(let y = 0; y < height; y++ ){
    buffer[y] = [];
    for(let x = 0; x < width; x++ ){
      if( array[y][x] == ""){
        buffer[y].push(0);
      }
      else{
        buffer[y].push(1);
      }
    }
  }
  return buffer;
}

function detect_adjacency_top_left(array, ret_array, x, y){
  ret_array[y][x] = array[y][x+1] + array[y+1][x];
}
function detect_adjacency_top_right(array, ret_array, x, y){
  ret_array[y][x] = array[y][x - 1] + array[y+1][x];
}
function detect_adjacency_bottom_left(array, ret_array, x, y){
  ret_array[y][x] = array[y][x+1] + array[y-1][x];
}
function detect_adjacency_bottom_right(array, ret_array, x, y){
  ret_array[y][x] = array[y][x-1] + array[y-1][x];
}
function detect_adjacency_top_side(array, ret_array, x, y){
  ret_array[y][x] = array[y][x+1] + array[y][x-1] + array[y+1][x];
}
function detect_adjacency_bottom_side(array, ret_array, x, y){
  ret_array[y][x] = array[y][x+1] + array[y][x-1] + array[y-1][x];
}
function detect_adjacency_left_side(array, ret_array, x, y){
  ret_array[y][x] = array[y-1][x] +  array[y][x+1] + array[y+1][x];
}
function detect_adjacency_right_side(array, ret_array, x, y){
  ret_array[y][x] = array[y-1][x] + array[y][x-1] + array[y+1][x];
}

function detect_adjacency_interior(array, ret_array, x, y){
  ret_array[y][x] = array[y][x-1] + array[y][x+1] + array[y+1][x]  + array[y-1][x];
}

function detect_adjacency_row(array, ret_array, width){
  for(let x=0; x<width; x++){
    if( x === 0){
      ret_array[0][x] = array[0][x+1]
    }
    else if( x === (width - 1)){
      ret_array[0][x] = array[0][x-1]
    }
    else{
      ret_array[0][x] = array[0][x-1] + array[0][x+1]
    }
  }
  return ret_array;
}

function detect_adjacency_column(array, ret_array, height){
  for(let y=0; y<height; y++){
    if( y === 0){
      ret_array[y][0] = array[y+1][0]
    }
    else if( y === (height - 1)){
      ret_array[y][0] = array[y-1][0]
    }
    else{
      ret_array[y][0] = array[y-1][0] + array[y+1][0]
    }
  }
}

function make_adjacency_array(array){
  const ret_check = is_valid_2d_array(array)
  if( ret_check[0] === false ){
    return [];
  }
  const height = array.length
  const width = array[0].length
  const ret_array = [];

  for(let i=0; i<height; i++){
    const row = Array(width).fill(0);
    ret_array.push(row);
  }

  if( width === 1){
    if( height === 1){
      ret_array.push([1])
      return ret_array;
    }
    else{
      detect_adjacency_column(array, ret_array, height)
      return ret_array;
    }
  }
  else if( height === 1){
    if (width === 1){
      ret_array.push([1])
      return ret_array;
    }
    else{
      detect_adjacency_row(array, ret_array, width)
      return ret_array;
    }
  }

  // const ret_array = Array(height).fill(...row);

  for(let y=0; y<height; y++){
    for(let x=0; x<width; x++){
      if( y == 0 ){
        if( x == 0 ){
          detect_adjacency_top_left(array, ret_array, x, y)
        }
        else if(x == (width - 1)){
          detect_adjacency_top_right(array, ret_array, x, y)
        }
        else{
          detect_adjacency_top_side(array, ret_array, x, y)
        }
      } else if(y == (height - 1)){
        if( x == 0 ){
          detect_adjacency_bottom_left(array, ret_array, x, y)
        }
        else if(x == (width - 1)){
          detect_adjacency_bottom_right(array, ret_array, x, y)
        }
        else {
          detect_adjacency_bottom_side(array, ret_array, x, y)
        }
      } else {
        if( x == 0 ){
          detect_adjacency_left_side(array, ret_array, x, y)
        }
        else if(x == (width - 1)){
          detect_adjacency_right_side(array, ret_array, x, y)
        }
        else{
          detect_adjacency_interior(array, ret_array, x, y)
        }
      }
    }
  }
  return ret_array;
}
