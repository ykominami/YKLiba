class Store {
  static init(){
    if( typeof(Store.counts) === "undefined"){
      Store.stores = {};
      Store.counts = 0;
    }
  }
  static add(hash){
    const count = Store.counts;
    Store.stores[count] = hash;
    Store.counts++;
    return count;
  }
  static set( index, key, value ){
    Store.stores[index][key] = value;
    Log.debug(`Store.stores`, Store.stores);
  }
  static get( index, key ){
    Log.debug(`Store.get index=${index} key=${key}`);
    Log.debug(Store.stores);
    Log.debug(`Store.set index=${index} key=${key}`);
    Log.debug(Store.stores);

    return Store.stores[index][key];
  }
}
this.Store = Store;