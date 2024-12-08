function test_grouping(){
  const values = [
    [1, "jkl"],
    [,"ghi"],
    [3,"wbdf"],
    [,"def"],
    [2,"zbdf"],
    [1,"abc"],
    [2,"bdf"],
    [3,"dfa"],
  ];
  const index = 0;
  const values2 = test_sortx(values, (x) => x[index] );
  let ret = test_grouping_1(values2, (x) => x[index] );
  const keys = Object.keys(ret);
  keys.sort();
  Log.display_log(keys);
  const rev_keys = keys.reverse();
  Log.display_log(rev_keys);
  keys.map( key=> Log.display_log(ret[key]) );

  let ret2 = [];
  rev_keys.map( key => ret2 = [...ret2, ...ret[key] ] );
  Log.display_log(ret2);
}

function test_grouping_1(values, op){
  return grouping(values, item => { return [valid_string( op(item) ), item]; } );
}

function test_sortx(values, op){
  return values.sort( (a,b) => compare_with_string( op(a), op(b) ) );
}
