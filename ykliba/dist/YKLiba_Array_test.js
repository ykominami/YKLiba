/**
 * 連続する条件を満たす領域のテストを実行する
 * 異なる配列サイズでlinkedRegion関数の動作をテストする
 */
function testLinkedRegionX() {
  const index = 0;
  const condValue = 1;
  values = [[1, 0, 0], [1, 0, 0]];
  op = (x) => x[index] === condValue;
  testLinkedRegion(values, op);
  values = [[1, 0, 0], [1, 0, 0], [1, 0, 0]];
  testLinkedRegion(values, op);
  values = [[1, 0, 0], [1, 0, 0], [1, 0, 0], [0, 0, 0]];
  testLinkedRegion(values, op);
  values = [[1, 0, 0], [1, 0, 0], [1, 0, 0], [0, 0, 0], [1, 0, 0]];
  testLinkedRegion(values, op);
  values = [[1, 0, 0], [1, 0, 0], [1, 0, 0], [0, 0, 0], [1, 0, 0], [0, 0, 0]];
  testLinkedRegion(values, op);
}

/**
 * 連続する条件を満たす領域をテストする
 * @param {Array} values - テスト対象の配列
 * @param {Function} op - 条件判定関数
 */
function testLinkedRegion(values, op) {
  const index = 0;
  const ret = linkedRegion(values, op);
  Log.displayLog(ret);
}

/**
 * ネストした配列から最大値と最小値を取得するテストを実行する
 * 配列の3番目の要素（インデックス2）を基準に最大値と最小値を取得する
 */
function testGetMaxAndMinFromNestedArrayX() {
  const array = [[0, 1, 10], [3, 4, 5], [10, 20, 0], [3, 4, 5], [6, 7, 8]];
  const ret = Arrayx.getMaxAndMinFromNestedArray(array, (x) => x[2]);
  Log.displayLog(ret);
}

