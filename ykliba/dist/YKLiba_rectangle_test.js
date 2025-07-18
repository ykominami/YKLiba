/**
 * マスクパターンのテスト関数
 * 配列の空文字列を0、それ以外を1に変換するマスクパターンの生成をテストする
 */
function test_mask_pattern() {
  Util.set_log_level(Util.DEBUG());

  array = [
    ['', '', 'a', 'b'],
    ['c', '', 'a', 'b'],
    ['', '', 'a', 'b'],
    ['', '', 'a', 'b'],
  ];
  expected_array = [
    [0, 0, 1, 1],
    [1, 0, 1, 1],
    [0, 0, 1, 1],
    [0, 0, 1, 1],
  ];
  const mask_pattern = make_mask_pattern(array);
  Util.debug(mask_pattern);

  const [ret, state] = is_equal_array(mask_pattern, expected_array);
  Util.debug(`ret=${ret} state=${state}`);
}

/**
 * 行と列のカウントテスト関数
 * @param {Array} array - テスト対象の2次元配列
 * @param {Array} expect_row_count - 期待される行のカウント結果
 * @param {Array} expect_column_count - 期待される列のカウント結果
 * @returns {Array} 行と列のテスト結果
 */
function test_count_row_and_column(array, expect_row_count, expect_column_count) {
  let row_count;
  [row_count, column_count] = sum_row_and_sum_column(array);

  const ret_row = is_equal_array(row_count, expect_row_count);
  const ret_column = is_equal_array(column_count, expect_column_count);

  return [ret_row, ret_column];
}

/**
 * 複数の行と列のカウントテスト関数
 * 様々なパターンの配列で行と列のカウント機能をテストする
 */
function test_count_row_and_column_x_x() {
  Util.set_log_level(Util.DEBUG());

  array = [
    [0, 0, 1, 1],
    [1, 0, 1, 1],
    [0, 0, 1, 1],
    [0, 0, 1, 1],
  ];
  expect_row_count = [1, 0, 4, 4];
  expect_column_count = [2, 3, 2, 2];
  test_count_row_and_column_x(array, expect_row_count, expect_column_count);

  array = [
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0],
  ];
  expect_row_count = [2, 2, 2, 2];
  expect_column_count = [2, 2, 2, 2];
  test_count_row_and_column_x(array, expect_row_count, expect_column_count);

  array = [
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  expect_row_count = [0, 0, 2, 2];
  expect_column_count = [2, 2, 0, 0];
  test_count_row_and_column_x(array, expect_row_count, expect_column_count);

  array = [
    [0, 1, 1, 1],
    [0, 1, 1, 1],
    [0, 1, 1, 1],
    [0, 0, 0, 0],
  ];
  expect_row_count = [0, 3, 3, 3];
  expect_column_count = [3, 3, 3, 0];
  test_count_row_and_column_x(array, expect_row_count, expect_column_count);

  array = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ];
  expect_row_count = [4, 4, 4, 4];
  expect_column_count = [4, 4, 4, 4];
  test_count_row_and_column_x(array, expect_row_count, expect_column_count);
}

/**
 * 行と列のカウントテスト関数（ヘルパー）
 * @param {Array} array - テスト対象の2次元配列
 * @param {Array} expect_row_count - 期待される行のカウント結果
 * @param {Array} expect_column_count - 期待される列のカウント結果
 */
function test_count_row_and_column_x(array, expect_row_count, expect_column_count) {
  let ret;

  [ret, state] = test_count_row_and_column(array, expect_row_count, expect_column_count);
}

/**
 * 隣接配列のテスト関数
 * @param {Array} array - テスト対象の2次元配列
 * @param {Array} expected_array - 期待される隣接配列の結果
 */
function test_make_adjacency_array(array, expected_array) {
  ret_array = make_adjacency_array(array);

  const [ret, state] = is_qual_array(ret_array, expected_array);
  Util.debug(`ret=${ret} state=${state}`);
}
