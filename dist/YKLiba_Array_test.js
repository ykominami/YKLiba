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

function testLinkedRegion(values, op) {
  const index = 0;
  const ret = linkedRegion(values, op);
  Log.displayLog(ret);
}

function testGetMaxAndMinFromNestedArrayX() {
  const array = [[0, 1, 10], [3, 4, 5], [10, 20, 0], [3, 4, 5], [6, 7, 8]];
  const ret = getMaxAndMinFromNestedArray(array, (x) => x[2]);
  Log.displayLog(ret);
}

