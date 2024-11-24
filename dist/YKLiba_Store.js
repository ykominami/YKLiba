class Store {
  static init(){
    if( typeof(Store.counts) === "undefined"){
      Store.stores = {}
      Store.counts = 0
    }
  }
  static add(hash){
    const count = Store.counts
    Store.stores[count] = hash
    Store.counts++
    return count
  }
  static set( index, key, value ){
    /*
    Util.debug(`Store.set index=${index} key=${key} value=${value}`)
    Util.debug(Store.stores)
    Util.display_log(`Store.set index=${index} key=${key} value=${value}`)
    Util.display_log(`=================1`)
    Util.display_log(Store.stores)
    Util.display_log(Store.stores[index])
    Util.display_log(Store.stores[index][key])
    Util.display_log(`=================2`)
    */
    Store.stores[index][key] = value
    Util.display_log_1(`Store.stores`, Store.stores)
    /*
    Util.display_log(`=================3`)
    Util.display_log(Store.stores)
    Util.display_log(Store.stores[index])
    Util.display_log(Store.stores[index][key])
    Util.display_log(`=================4`)
    */
  }
  static get( index, key ){
    Util.debug(`Store.get index=${index} key=${key}`)
    Util.debug(Store.stores)
    Util.display_log(`Store.set index=${index} key=${key}`)
    Util.display_log(Store.stores)

    return Store.stores[index][key]
  }
}
this.Store = Store