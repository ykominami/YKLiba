function testGrouping() {
  const values = [
    [1, 'jkl'],
    [, 'ghi'],
    [3, 'wbdf'],
    [, 'def'],
    [2, 'zbdf'],
    [1, 'abc'],
    [2, 'bdf'],
    [3, 'dfa'],
  ];
  const index = 0;
  const values2 = testSortx(values, (x) => x[index]);
  const ret = testGrouping1(values2, (x) => x[index]);
  const keys = Object.keys(ret);
  keys.sort();
  Log.display_log(keys);
  const rev_keys = keys.reverse();
  Log.display_log(rev_keys);
  keys.map((key) => Log.display_log(ret[key]));

  let ret2 = [];
  rev_keys.map((key) => ret2 = [...ret2, ...ret[key]]);
  Log.display_log(ret2);
}

function testGrouping1(values, op) {
  return grouping(values, (item) => [validString(op(item)), item]);
}

function test_sortx(values, op) {
  return values.sort((a, b) => compare_with_string(op(a), op(b)));
}
