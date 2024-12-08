function test_linkedRegion_x(){
  const index = 0;
  const cond_value = 1;
  /*
  let values = null
  test_linkedRegion(values)
  values = []
  test_linkedRegion(values)
  values = [[]]
  test_linkedRegion(values)
  values = [[0]]
  test_linkedRegion(values)
  values = [[1]]
  test_linkedRegion(values)
  values = [[1,0,0]]
  test_linkedRegion(values)
  */
  values = [[1,0,0], [1,0,0]];
  // test_linkedRegion(values, x => x[index] === cond_value )
  op = x => x[index] === cond_value;
  test_linkedRegion(values, op );
  values = [[1,0,0], [1,0,0], [1,0,0]];
  test_linkedRegion(values, op);
  values = [[1,0,0], [1,0,0], [1,0,0], [0,0,0]];
  test_linkedRegion(values, op);
  values = [[1,0,0], [1,0,0], [1,0,0], [0,0,0], [1,0,0]];
  test_linkedRegion(values, op);
  values = [[1,0,0], [1,0,0], [1,0,0], [0,0,0], [1,0,0], [0,0,0]];
  test_linkedRegion(values, op );
}

function test_linkedRegion(values, op){
  const index = 0;
  const ret = linkedRegion( values, op);
  Log.display_log(ret);
}

function test_get_max_and_min_from_nested_array(){
  const array=[[0,1,10], [3,4,5], [10,20,0], [3,4,5], [6,7,8]];
  const ret = get_max_and_min_from_nested_array(array, x=>x[2]);
  Log.display_log( ret );
}
