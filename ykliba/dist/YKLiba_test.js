/**
 * テスト関数: determine関数の動作をテストする
 * NOT_BLANKとBLANKの判定ロジックを検証
 */
function test_dtermin() {
  ret11 = determine('NOT_BLANK', '');
  ret12 = determine('NOT_BLANK', ' ');
  ret13 = determine('NOT_BLANK', ' A ');
  ret21 = determine('BLANK', '');
  ret22 = determine('_BLANK', ' ');
  ret23 = determine('_BLANK', ' A ');

  YKLiblog.Log.debug(`ret11=${ret11}`);
  YKLiblog.Log.debug(`ret12=${ret12}`);
  YKLiblog.Log.debug(`ret12=${ret13}`);
  YKLiblog.Log.debug(`ret21=${ret21}`);
  YKLiblog.Log.debug(`ret22=${ret22}`);
  YKLiblog.Log.debug(`ret22=${ret23}`);
}

/**
 * テスト関数: detect_record関数の動作をテストする
 * 配列内のレコード検出ロジックを検証
 */
function test_detect_record() {
  const array = [[], []];
  const array2 = [['A'], []];
  const array3 = [[], ['A'], []];
  const array4 = [[], ['A'], ['B']];
  const array5 = [[], ['A'], ['B'], []];
  const array6 = [[], ['A'], [], ['B'], []];

  let ret;
  ret = Arrayx.detectRecord(array, 'NOT_BLANK', 0, 0, 2);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.detectRecord(array2, 'NOT_BLANK', 0, 0, 2);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.detectRecord(array3, 'NOT_BLANK', 0, 0, 3);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.detectRecord(array4, 'NOT_BLANK', 0, 0, 3);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.detectRecord(array5, 'NOT_BLANK', 0, 0, 3);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.detectRecord(array6, 'NOT_BLANK', 0, 0, 3);
  YKLiblog.Log.debug(`ret=${ret}`);
  //
  YKLiblog.Log.debug('================');
  //
  ret = Arrayx.detectRecord(array, 'NOT_BLANK', 0, 1, 2);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.detectRecord(array2, 'NOT_BLANK', 0, 1, 2);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.detectRecord(array3, 'NOT_BLANK', 0, 1, 3);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.detectRecord(array4, 'NOT_BLANK', 0, 1, 3);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.detectRecord(array5, 'NOT_BLANK', 0, 1, 3);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.detectRecord(array6, 'NOT_BLANK', 0, 1, 3);
  YKLiblog.Log.debug(`ret=${ret}`);
  //
  YKLiblog.Log.debug('================');
  //
  ret = Arrayx.detectRecord(array, 'NOT_BLANK', 0, 2, 2);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.detectRecord(array2, 'NOT_BLANK', 0, 2, 2);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.detectRecord(array3, 'NOT_BLANK', 0, 2, 3);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.detectRecord(array4, 'NOT_BLANK', 0, 2, 3);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.detectRecord(array5, 'NOT_BLANK', 0, 2, 3);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.detectRecord(array6, 'NOT_BLANK', 0, 2, 3);
  YKLiblog.Log.debug(`ret=${ret}`);

  //
}

/**
 * テスト関数: arrayShape関数の動作をテストする
 * 配列の形状（サイズ、最大長、最小長）を取得する機能を検証
 */
function test_arrayShape() {
  const array = [[], []];
  const array2 = [['A'], []];
  const array3 = [[], ['A'], []];
  const array4 = [[], ['A'], ['B']];
  const array5 = [[], ['A'], ['B'], []];
  const array6 = [[], ['A'], [], ['B'], []];

  let ret;
  ret = arrayShape(array);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = arrayShape(array2);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = arrayShape(array3);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = arrayShape(array4);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = arrayShape(array5);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = arrayShape(array6);
  YKLiblog.Log.debug(`ret=${ret}`);
}

function arrayShape2(array) {
  const sizeArray = array.map((list) => list.length);
  let lenMax;
  let lenMin;
  if (sizeArray.length > 0) {
    [lenMax, lenMin] = Arrayx.getMaxAndMin(sizeArray);
  } else {
    lenMin = 0;
    lenMax = 0;
  }
  const size = array.length;
  return { size, lenMax, lenMin };
}

/**
 * テスト関数: getRelativeCordinatesOfTopLeft_simple関数の動作をテストする
 * 配列の左上座標を取得する機能を検証
 */
function test_getRelativeCoordinatesOfTopLeft_simple() {
  let ret;
  let start_x;
  let start_y;
  start_x = -1;
  start_y = -1;

  let size, len_max, len_min;

  const array0 = [1,2,3];
  const array1 = [[], []];
  const array2 = [['A'], []];
  const array3 = [[], ['A'], []];
  const array4 = [[], ['A'], ['B']];
  const array5 = [[], ['A'], ['B'], []];
  const array6 = [[], ['A'], [], ['B'], []];

  const str = typeof(array0)
  Logger.log(`str=${str}`)
  Logger.log(array0)
  let reta = Array.isArray(array0)
  Logger.log(`reta=${reta}`)
  for( n in array0 ){
    Logger.log( n )
  }
  for( n in array1 ){
    Logger.log( n )
  }
  for( n in array2 ){
    Logger.log( n )
    Logger.log( array2[n] )
  }
  let array1x = array1.map( item => item )
  Logger.log( array1x )
  let array1x2 = array2.map( item => item )
  Logger.log( array1x2 )

  // [size, len_max, len_min] = Arrayx.arrayShape(array1);
  // YKLiblog.Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  // ret = getRelativeCordinatesOfTopLeft_simple(array1, len_max, size, start_x, start_y, len_min);
  // YKLiblog.Log.debug(`ret=${ret}`);

  // [size, len_max, len_min] = Arrayx.arrayShape(array2);
  [size, len_max, len_min] = Arrayx.arrayShape(array1x2);
  YKLiblog.Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  // ret = getRelativeCoordinatesOfTopLeftSimple(array2, len_max, size, start_x, start_y, len_min);
  let shape = { lenMax: len_max, size: size}
  ret = getRelativeCoordinatesOfTopLeftSimple(array2, shape, start_x);
  YKLiblog.Log.debug(`ret=${ret}`);

  const array3x = array3.map( item => item )
  [size, len_max, len_min] = Arrayx.arrayShape(array3);
  YKLiblog.Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  shape = { lenMax: len_max, size: size}
  // ret = getRelativeCoordinatesOfTopLeftSimple(array3, len_max, size, start_x, start_y, len_min);
  ret = getRelativeCoordinatesOfTopLeftSimple(array3, shape, start_x);
  YKLiblog.Log.debug(`ret=${ret}`);

  const array4x = array4.map( item => item )
  [size, len_max, len_min] = Arrayx.arrayShape(array4);
  YKLiblog.Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  shape = { lenMax: len_max, size: size}
  ret = getRelativeCoordinatesOfTopLeftSimple(array4, shape, start_x);
  YKLiblog.Log.debug(`ret=${ret}`);

  const array5x = array5.map( item => item )
  [size, len_max, len_min] = Arrayx.arrayShape(array5);
  YKLiblog.Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  shape = { lenMax: len_max, size: size}
  ret = getRelativeCoordinatesOfTopLeftSimple(array5, shape, start_x);
  YKLiblog.Log.debug(`ret=${ret}`);

  const array6x = array6.map( item => item )
  [size, len_max, len_min] = Arrayx.arrayShape(array6);
  YKLiblog.Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  shape = { lenMax: len_max, size: size}
  ret = getRelativeCoordinatesOfTopLeftSimple(array3, shape, start_x);
  YKLiblog.Log.debug(`ret=${ret}`);
}

/**
 * テスト関数: getRelativeCordinatesOfBottomLeft_simple関数の動作をテストする
 * 配列の左下座標を取得する機能を検証
 */
function test_getRelativeCoordinatesOfBottomLeft_simple() {
  const array = [[], []];
  const array2 = [['A'], []];
  const array3 = [[], ['A'], []];
  const array4 = [[], ['A'], ['B']];
  const array5 = [[], ['A'], ['B'], []];
  const array6 = [[], ['A'], [], ['B'], []];

  let ret;
  let start_x;
  let start_y;
  start_x = -1;
  start_y = -1;
  let size, len_max, len_min;

  // const arrayx = array.map( item => item )
  let sizeArray
  sizeArray = array.map((list) => list.length);

  [size, len_max, len_min] = Arrayx.arrayShape(array);
  YKLiblog.Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = Arrayx.getRelativeCoordinatesOfBottomLeftSimple(array, len_max, size, start_x, start_y, len_min);
  YKLiblog.Log.debug(`ret=${ret}`);

  start_x = 0;
  start_y = 0;
  const array1x2 = array2.map( item => item )
  [size, len_max, len_min] = Arrayx.arrayShape(array2);
  YKLiblog.Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = Arrayx.getRelativeCoordinatesOfBottomLeftSimple(array2, len_max, size, start_x, start_y, len_min);
  YKLiblog.Log.debug(`ret=${ret}`);

  start_x = 0;
  start_y = 1;
  const array1x3 = array3.map( item => item )
  [size, len_max, len_min] = Arrayx.arrayShape(array3);
  YKLiblog.Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = Arrayx.getRelativeCoordinatesOfBottomLeftSimple(array2, len_max, size, start_x, start_y, len_min);
  YKLiblog.Log.debug(`ret=${ret}`);

  start_x = 0;
  start_y = 1;
  const array1x4 = array4.map( item => item )
  [size, len_max, len_min] = Arrayx.arrayShape(array4);
  YKLiblog.Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = Arrayx.getRelativeCoordinatesOfBottomLeftSimple(array2, len_max, size, start_x, start_y, len_min);
  YKLiblog.Log.debug(`ret=${ret}`);

  start_x = 0;
  start_y = 1;
  const array1x5 = array5.map( item => item )
  [size, len_max, len_min] = Arrayx.arrayShape(array5);
  YKLiblog.Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = Arrayx.getRelativeCoordinatesOfBottomLeftSimple(array2, len_max, size, start_x, start_y, len_min);
  YKLiblog.Log.debug(`ret=${ret}`);

  start_x = 0;
  start_y = 1;
  const array1x6 = array5.map( item => item )
  [size, len_max, len_min] = Arrayx.arrayShape(array6);
  YKLiblog.Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = Arrayx.getRelativeCoordinatesOfBottomLeftSimple(array2, len_max, size, start_x, start_y, len_min);
  YKLiblog.Log.debug(`ret=${ret}`);
}

/**
 * テスト関数: getRelativeCoordinatesOfTLandBL関数の動作をテストする
 * 配列の左上と左下座標を同時に取得する機能を検証
 */
function test_getRelativeCoordinatesOfTLandBL() {
  const array = [[], []];
  const array2 = [['A'], []];
  const array3 = [[], ['A'], []];
  const array4 = [[], ['A'], ['B']];
  const array5 = [[], ['A'], ['B'], []];
  const array6 = [[], ['A'], [], ['B'], []];

  let ret;

  ret = Arrayx.getRelativeCoordinatesOfTLandBL(array);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.getRelativeCoordinatesOfTLandBL(array2);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.getRelativeCoordinatesOfTLandBL(array3);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.getRelativeCoordinatesOfTLandBL(array4);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.getRelativeCoordinatesOfTLandBL(array5);
  YKLiblog.Log.debug(`ret=${ret}`);

  ret = Arrayx.getRelativeCoordinatesOfTLandBL(array6);
  YKLiblog.Log.debug(`ret=${ret}`);
}

/**
 * テスト関数: get_column_code関数の動作をテストする
 * 列番号を取得する機能を検証
 */
function test_get_column_code() {
  [null, '', 'A', 'Z', 'a', 'z', 'AA', 'ZZ'].map((ch) => {
    const code = get_column_number(ch);
    YKLiblog.Log.debug(`ch=${ch} code=${code}`);
  });
}
