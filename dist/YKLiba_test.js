
function test_dtermin(){
  ret11 = determine("NOT_BLANK", "");
  ret12 = determine("NOT_BLANK", " ");
  ret13 = determine("NOT_BLANK", " A ");
  ret21 = determine("BLANK", "");
  ret22 = determine("_BLANK", " ");
  ret23 = determine("_BLANK", " A ");

  display_log(`ret11=${ret11}`);
  display_log(`ret12=${ret12}`);
  display_log(`ret12=${ret13}`);
  display_log(`ret21=${ret21}`);
  display_log(`ret22=${ret22}`);
  display_log(`ret22=${ret23}`);
}

function test_detect_record(){
  const array = [[], []];
  const array2 = [["A"], []];
  const array3 = [[], ["A"], []];
  const array4 = [[], ["A"], ['B']];
  const array5 = [[], ["A"], ['B'], []];
  const array6 = [[], ["A"], [], ['B'], []];

  let ret;
  ret = detect_record(array, "NOT_BLANK", 0, 0, 2);
  display_log(`ret=${ret}`);

  ret = detect_record(array2, "NOT_BLANK", 0, 0, 2);
  display_log(`ret=${ret}`);

  ret = detect_record(array3, "NOT_BLANK", 0, 0, 3);
  display_log(`ret=${ret}`);

  ret = detect_record(array4, "NOT_BLANK", 0, 0, 3);
  display_log(`ret=${ret}`);

  ret = detect_record(array5, "NOT_BLANK", 0, 0, 3);
  display_log(`ret=${ret}`);

  ret = detect_record(array6, "NOT_BLANK", 0, 0, 3);
  display_log(`ret=${ret}`);
  //
  display_log(`================`);
  //  
  ret = detect_record(array, "NOT_BLANK", 0, 1, 2);
  display_log(`ret=${ret}`);

  ret = detect_record(array2, "NOT_BLANK", 0, 1, 2);
  display_log(`ret=${ret}`);

  ret = detect_record(array3, "NOT_BLANK", 0, 1, 3);
  display_log(`ret=${ret}`);

  ret = detect_record(array4, "NOT_BLANK", 0, 1, 3);
  display_log(`ret=${ret}`);

  ret = detect_record(array5, "NOT_BLANK", 0, 1, 3);
  display_log(`ret=${ret}`);

  ret = detect_record(array6, "NOT_BLANK", 0, 1, 3);
  display_log(`ret=${ret}`);
  //
  display_log(`================`);
  //  
  ret = detect_record(array, "NOT_BLANK", 0, 2, 2);
  display_log(`ret=${ret}`);

  ret = detect_record(array2, "NOT_BLANK", 0, 2, 2);
  display_log(`ret=${ret}`);

  ret = detect_record(array3, "NOT_BLANK", 0, 2, 3);
  display_log(`ret=${ret}`);

  ret = detect_record(array4, "NOT_BLANK", 0, 2, 3);
  display_log(`ret=${ret}`);

  ret = detect_record(array5, "NOT_BLANK", 0, 2, 3);
  display_log(`ret=${ret}`);

  ret = detect_record(array6, "NOT_BLANK", 0, 2, 3);
  display_log(`ret=${ret}`);

  //

}

function test_arrayShape(){
  const array = [[], []];
  const array2 = [["A"], []];
  const array3 = [[], ["A"], []];
  const array4 = [[], ["A"], ['B']];
  const array5 = [[], ["A"], ['B'], []];
  const array6 = [[], ["A"], [], ['B'], []];

  let ret;
  ret = arrayShape(array);
  display_log(`ret=${ret}`);

  ret = arrayShape(array2);
  display_log(`ret=${ret}`);

  ret = arrayShape(array3);
  display_log(`ret=${ret}`);

  ret = arrayShape(array4);
  display_log(`ret=${ret}`);

  ret = arrayShape(array5);
  display_log(`ret=${ret}`);

  ret = arrayShape(array6);
  display_log(`ret=${ret}`);

}

function test_getRelativeCordinatesOfTopLeft_simple(){
  const array = [[], []];
  const array2 = [["A"], []];
  const array3 = [[], ["A"], []];
  const array4 = [[], ["A"], ['B']];
  const array5 = [[], ["A"], ['B'], []];
  const array6 = [[], ["A"], [], ['B'], []];

  let ret;
  let start_x;
  let start_y;
  start_x = -1;
  start_y = -1;

  [size, len_max, len_min] = arrayShape(array);
  display_log(`size=${size} len_max=${len_max} len_min=${len_min}`)
  ret = getRelativeCordinatesOfTopLeft_simple(array, len_max, size, start_x, start_y, len_min);
  display_log(`ret=${ret}`);
  
  [size, len_max, len_min] = arrayShape(array2);
  display_log(`size=${size} len_max=${len_max} len_min=${len_min}`)
  ret = getRelativeCordinatesOfTopLeft_simple(array2, len_max, size, start_x, start_y, len_min);
  display_log(`ret=${ret}`);
  
  [size, len_max, len_min] = arrayShape(array3);
  display_log(`size=${size} len_max=${len_max} len_min=${len_min}`)
  ret = getRelativeCordinatesOfTopLeft_simple(array3, len_max, size, start_x, start_y, len_min);
  display_log(`ret=${ret}`);
  
  [size, len_max, len_min] = arrayShape(array4);
  display_log(`size=${size} len_max=${len_max} len_min=${len_min}`)
  ret = getRelativeCordinatesOfTopLeft_simple(array3, len_max, size, start_x, start_y, len_min);
  display_log(`ret=${ret}`);
  
  [size, len_max, len_min] = arrayShape(array5);
  display_log(`size=${size} len_max=${len_max} len_min=${len_min}`)
  ret = getRelativeCordinatesOfTopLeft_simple(array3, len_max, size, start_x, start_y, len_min);
  display_log(`ret=${ret}`);
  
  [size, len_max, len_min] = arrayShape(array6);
  display_log(`size=${size} len_max=${len_max} len_min=${len_min}`)
  ret = getRelativeCordinatesOfTopLeft_simple(array3, len_max, size, start_x, start_y, len_min);
  display_log(`ret=${ret}`);
}

function test_getRelativeCordinatesOfBottomLeft_simple(){
  const array = [[], []];
  const array2 = [["A"], []];
  const array3 = [[], ["A"], []];
  const array4 = [[], ["A"], ['B']];
  const array5 = [[], ["A"], ['B'], []];
  const array6 = [[], ["A"], [], ['B'], []];

  let ret;
  let start_x;
  let start_y;
  start_x = -1;
  start_y = -1;

  [size, len_max, len_min] = arrayShape(array);
  display_log(`size=${size} len_max=${len_max} len_min=${len_min}`)
  ret = getRelativeCordinatesOfBottomLeft_simple(array, len_max, size, start_x, start_y, len_min);
  display_log(`ret=${ret}`);

  start_x = 0;
  start_y = 0;
  [size, len_max, len_min] = arrayShape(array2);
  display_log(`size=${size} len_max=${len_max} len_min=${len_min}`)
  ret = getRelativeCordinatesOfBottomLeft_simple(array2, len_max, size, start_x, start_y, len_min);
  display_log(`ret=${ret}`);

  start_x = 0;
  start_y = 1;
  [size, len_max, len_min] = arrayShape(array3);
  display_log(`size=${size} len_max=${len_max} len_min=${len_min}`)
  ret = getRelativeCordinatesOfBottomLeft_simple(array2, len_max, size, start_x, start_y, len_min);
  display_log(`ret=${ret}`);

  start_x = 0;
  start_y = 1;
  [size, len_max, len_min] = arrayShape(array4);
  display_log(`size=${size} len_max=${len_max} len_min=${len_min}`)
  ret = getRelativeCordinatesOfBottomLeft_simple(array2, len_max, size, start_x, start_y, len_min);
  display_log(`ret=${ret}`);

  start_x = 0;
  start_y = 1;
  [size, len_max, len_min] = arrayShape(array5);
  display_log(`size=${size} len_max=${len_max} len_min=${len_min}`)
  ret = getRelativeCordinatesOfBottomLeft_simple(array2, len_max, size, start_x, start_y, len_min);
  display_log(`ret=${ret}`);

  start_x = 0;
  start_y = 1;
  [size, len_max, len_min] = arrayShape(array6);
  display_log(`size=${size} len_max=${len_max} len_min=${len_min}`)
  ret = getRelativeCordinatesOfBottomLeft_simple(array2, len_max, size, start_x, start_y, len_min);
  display_log(`ret=${ret}`);
}

function test_getRelativeCordinatesOfTLandBL(){
  const array = [[], []];
  const array2 = [["A"], []];
  const array3 = [[], ["A"], []];
  const array4 = [[], ["A"], ['B']];
  const array5 = [[], ["A"], ['B'], []];
  const array6 = [[], ["A"], [], ['B'], []];

  let ret;

  ret = getRelativeCordinatesOfTLandBL(array);
  display_log(`ret=${ret}`);

  ret = getRelativeCordinatesOfTLandBL(array2);
  display_log(`ret=${ret}`);

  ret = getRelativeCordinatesOfTLandBL(array3);
  display_log(`ret=${ret}`);

  ret = getRelativeCordinatesOfTLandBL(array4);
  display_log(`ret=${ret}`);

  ret = getRelativeCordinatesOfTLandBL(array5);
  display_log(`ret=${ret}`);

  ret = getRelativeCordinatesOfTLandBL(array6);
  display_log(`ret=${ret}`);
}

function test_get_column_code(){
  [null, '', 'A','Z','a','z', 'AA', 'ZZ'].map( ch => {
    const code = get_column_number(ch);
    display_log(`ch=${ch} code=${code}`);
  })
}

