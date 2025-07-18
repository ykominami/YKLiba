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

  Log.debug(`ret11=${ret11}`);
  Log.debug(`ret12=${ret12}`);
  Log.debug(`ret12=${ret13}`);
  Log.debug(`ret21=${ret21}`);
  Log.debug(`ret22=${ret22}`);
  Log.debug(`ret22=${ret23}`);
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
  ret = detect_record(array, 'NOT_BLANK', 0, 0, 2);
  Log.debug(`ret=${ret}`);

  ret = detect_record(array2, 'NOT_BLANK', 0, 0, 2);
  Log.debug(`ret=${ret}`);

  ret = detect_record(array3, 'NOT_BLANK', 0, 0, 3);
  Log.debug(`ret=${ret}`);

  ret = detect_record(array4, 'NOT_BLANK', 0, 0, 3);
  Log.debug(`ret=${ret}`);

  ret = detect_record(array5, 'NOT_BLANK', 0, 0, 3);
  Log.debug(`ret=${ret}`);

  ret = detect_record(array6, 'NOT_BLANK', 0, 0, 3);
  Log.debug(`ret=${ret}`);
  //
  Log.debug('================');
  //
  ret = detect_record(array, 'NOT_BLANK', 0, 1, 2);
  Log.debug(`ret=${ret}`);

  ret = detect_record(array2, 'NOT_BLANK', 0, 1, 2);
  Log.debug(`ret=${ret}`);

  ret = detect_record(array3, 'NOT_BLANK', 0, 1, 3);
  Log.debug(`ret=${ret}`);

  ret = detect_record(array4, 'NOT_BLANK', 0, 1, 3);
  Log.debug(`ret=${ret}`);

  ret = detect_record(array5, 'NOT_BLANK', 0, 1, 3);
  Log.debug(`ret=${ret}`);

  ret = detect_record(array6, 'NOT_BLANK', 0, 1, 3);
  Log.debug(`ret=${ret}`);
  //
  Log.debug('================');
  //
  ret = detect_record(array, 'NOT_BLANK', 0, 2, 2);
  Log.debug(`ret=${ret}`);

  ret = detect_record(array2, 'NOT_BLANK', 0, 2, 2);
  Log.debug(`ret=${ret}`);

  ret = detect_record(array3, 'NOT_BLANK', 0, 2, 3);
  Log.debug(`ret=${ret}`);

  ret = detect_record(array4, 'NOT_BLANK', 0, 2, 3);
  Log.debug(`ret=${ret}`);

  ret = detect_record(array5, 'NOT_BLANK', 0, 2, 3);
  Log.debug(`ret=${ret}`);

  ret = detect_record(array6, 'NOT_BLANK', 0, 2, 3);
  Log.debug(`ret=${ret}`);

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
  Log.debug(`ret=${ret}`);

  ret = arrayShape(array2);
  Log.debug(`ret=${ret}`);

  ret = arrayShape(array3);
  Log.debug(`ret=${ret}`);

  ret = arrayShape(array4);
  Log.debug(`ret=${ret}`);

  ret = arrayShape(array5);
  Log.debug(`ret=${ret}`);

  ret = arrayShape(array6);
  Log.debug(`ret=${ret}`);
}

/**
 * テスト関数: getRelativeCordinatesOfTopLeft_simple関数の動作をテストする
 * 配列の左上座標を取得する機能を検証
 */
function test_getRelativeCordinatesOfTopLeft_simple() {
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

  [size, len_max, len_min] = arrayShape(array);
  Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = getRelativeCordinatesOfTopLeft_simple(array, len_max, size, start_x, start_y, len_min);
  Log.debug(`ret=${ret}`);

  [size, len_max, len_min] = arrayShape(array2);
  Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = getRelativeCordinatesOfTopLeft_simple(array2, len_max, size, start_x, start_y, len_min);
  Log.debug(`ret=${ret}`);

  [size, len_max, len_min] = arrayShape(array3);
  Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = getRelativeCordinatesOfTopLeft_simple(array3, len_max, size, start_x, start_y, len_min);
  Log.debug(`ret=${ret}`);

  [size, len_max, len_min] = arrayShape(array4);
  Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = getRelativeCordinatesOfTopLeft_simple(array3, len_max, size, start_x, start_y, len_min);
  Log.debug(`ret=${ret}`);

  [size, len_max, len_min] = arrayShape(array5);
  Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = getRelativeCordinatesOfTopLeft_simple(array3, len_max, size, start_x, start_y, len_min);
  Log.debug(`ret=${ret}`);

  [size, len_max, len_min] = arrayShape(array6);
  Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = getRelativeCordinatesOfTopLeft_simple(array3, len_max, size, start_x, start_y, len_min);
  Log.debug(`ret=${ret}`);
}

/**
 * テスト関数: getRelativeCordinatesOfBottomLeft_simple関数の動作をテストする
 * 配列の左下座標を取得する機能を検証
 */
function test_getRelativeCordinatesOfBottomLeft_simple() {
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

  [size, len_max, len_min] = arrayShape(array);
  Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = getRelativeCordinatesOfBottomLeft_simple(array, len_max, size, start_x, start_y, len_min);
  Log.debug(`ret=${ret}`);

  start_x = 0;
  start_y = 0;
  [size, len_max, len_min] = arrayShape(array2);
  Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = getRelativeCordinatesOfBottomLeft_simple(array2, len_max, size, start_x, start_y, len_min);
  Log.debug(`ret=${ret}`);

  start_x = 0;
  start_y = 1;
  [size, len_max, len_min] = arrayShape(array3);
  Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = getRelativeCordinatesOfBottomLeft_simple(array2, len_max, size, start_x, start_y, len_min);
  Log.debug(`ret=${ret}`);

  start_x = 0;
  start_y = 1;
  [size, len_max, len_min] = arrayShape(array4);
  Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = getRelativeCordinatesOfBottomLeft_simple(array2, len_max, size, start_x, start_y, len_min);
  Log.debug(`ret=${ret}`);

  start_x = 0;
  start_y = 1;
  [size, len_max, len_min] = arrayShape(array5);
  Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = getRelativeCordinatesOfBottomLeft_simple(array2, len_max, size, start_x, start_y, len_min);
  Log.debug(`ret=${ret}`);

  start_x = 0;
  start_y = 1;
  [size, len_max, len_min] = arrayShape(array6);
  Log.debug(`size=${size} len_max=${len_max} len_min=${len_min}`);
  ret = getRelativeCordinatesOfBottomLeft_simple(array2, len_max, size, start_x, start_y, len_min);
  Log.debug(`ret=${ret}`);
}

/**
 * テスト関数: getRelativeCordinatesOfTLandBL関数の動作をテストする
 * 配列の左上と左下座標を同時に取得する機能を検証
 */
function test_getRelativeCordinatesOfTLandBL() {
  const array = [[], []];
  const array2 = [['A'], []];
  const array3 = [[], ['A'], []];
  const array4 = [[], ['A'], ['B']];
  const array5 = [[], ['A'], ['B'], []];
  const array6 = [[], ['A'], [], ['B'], []];

  let ret;

  ret = getRelativeCordinatesOfTLandBL(array);
  Log.debug(`ret=${ret}`);

  ret = getRelativeCordinatesOfTLandBL(array2);
  Log.debug(`ret=${ret}`);

  ret = getRelativeCordinatesOfTLandBL(array3);
  Log.debug(`ret=${ret}`);

  ret = getRelativeCordinatesOfTLandBL(array4);
  Log.debug(`ret=${ret}`);

  ret = getRelativeCordinatesOfTLandBL(array5);
  Log.debug(`ret=${ret}`);

  ret = getRelativeCordinatesOfTLandBL(array6);
  Log.debug(`ret=${ret}`);
}

/**
 * テスト関数: get_column_code関数の動作をテストする
 * 列番号を取得する機能を検証
 */
function test_get_column_code() {
  [null, '', 'A', 'Z', 'a', 'z', 'AA', 'ZZ'].map((ch) => {
    const code = get_column_number(ch);
    Log.debug(`ch=${ch} code=${code}`);
  });
}
