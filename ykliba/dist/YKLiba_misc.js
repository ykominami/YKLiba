/**
 * オブジェクトからシェイプ情報を抽出して返す
 * @param {Object} obj - シェイプ情報を含むオブジェクト
 * @returns {Object} シェイプ情報（r, c, h, w）
 */
function makeShape(obj) {
  return {
    r: obj.r,
    c: obj.c,
    h: obj.h,
    w: obj.w,
  };
}

/**
 * オブジェクトからレンジ調整情報を抽出して返す（makeRangeAdjustの短縮版）
 * @param {Object} obj - レンジ調整情報を含むオブジェクト
 * @returns {Object} レンジ調整情報（r, c, h, w）
 */
function mRA(obj) {
  return {
    r: obj.r,
    c: obj.c,
    h: obj.h,
    w: obj.w,
  };
}

/**
 * 調整パラメータを検証し、有効な調整オブジェクトを返す
 * @param {Object|null} arg_adjust - 調整パラメータ
 * @returns {Object} 有効な調整オブジェクト
 */
function get_valid_adjust(arg_adjust) {
  let adjust;
  if (arg_adjust === null) {
    adjust = mRA({
      r: 0, c: 0, h: 0, w: 0,
    });
  } else {
    adjust = arg_adjust;
  }
  return adjust;
}

/**
 * get_env関数を生成する関数を作成
 * @returns {string} get_env関数のコード文字列
 */
function make_funcion_get_env() {
  const ssId = get_ss_id();
  const message = `function get_env() {
  return {
    ssId: "${ssId}",
    sheetName:"Sheet1",
    display_mode: false
  }
}`;
  return message;
}

/**
 * 設定オブジェクトを作成
 * @param {Object} env - 環境設定オブジェクト
 * @param {...any} fields - フィールド情報
 * @returns {Object} 設定オブジェクト
 */
function make_config(env, ...fields) {
  return {
    displayMode: env.displayMode, ssId: env.ssId, sheetName: env.sheetName, sortOptions: null, columnIndex: env.columnIndex, fields: fields.pop(),
  };
}

/**
 * 設定オブジェクトを作成（バージョン2）
 * @param {Object} env - 環境設定オブジェクト
 * @param {Object|null} sortOptions - ソートオプション
 * @param {...any} fields - フィールド情報
 * @returns {Object} 設定オブジェクト
 */
function makeConfig2(env, sortOptions, ...fields) {
  if (sortOptions != null) {
    obj = {
      displayMode: env.displayMode, ssId: env.ssId, sheetName: env.sheetName, sortOptions, columnIndex: -1, fields,
    };
  } else {
    obj = {
      displayMode: env.displayMode, ssId: env.ssId, sheetName: env.sheetName, sort_options: null, column_index: env.column_index, fields,
    };
  }
  Log.debug(`YKLiba_misc makeConfig2 obj=${JSON.stringify(obj)}`)
  return obj;
}

/**
 * 文字を昇順ソートオプションに変換
 * @param {string} ch - ソート文字（'a'または'd'）
 * @returns {boolean} 昇順フラグ（true: 昇順, false: 降順）
 */
function convert_ascending_sort_option(ch) {
  sort_char = ch.toLowerCase();
  if (sort_char === 'a') {
    sort_option = true;
  } else {
    sort_option = false;
  }
  return sort_option;
}

/**
 * 列番号を変換（文字列の場合は数値に変換）
 * @param {string|number} ch - 列番号または列文字
 * @returns {number} 列番号
 */
function convert_column_number(ch) {
  let column_number = ch;

  if (typeof (ch) === 'string') {
    column_number = get_column_number(ch);
  }
  return column_number;
}

/**
 * 配列アイテムから昇順ソートオプションを作成
 * @param {Array} item - [列番号, ソート文字]の配列
 * @returns {Array} [列番号, 昇順フラグ]の配列
 */
function make_ascending_sort_option_in_array(item) {
  const column_number = convert_column_number(item[0]);
  const sort_option = convert_ascending_sort_option(item[1]);

  return [column_number, sort_option];
}

/**
 * 配列から昇順ソートオプション配列を作成（バージョン2）
 * @param {Array} array - ソート情報の配列
 * @returns {Array} 昇順ソートオプションの配列
 */
function make_ascending_sort_option_array_2(array) {
  let sort_char;
  let sort_option;

  const column_number = -1;

  const array2 = array.map((item) => {
    if (item !== null) {
      const typeof_item = typeof (item);
      if (typeof_item === 'array' || typeof_item === 'object') {
        return make_ascending_sort_option_in_array(item);
      }
      return [];
    }
    return null;
  });
  return array2;
}

/**
 * 配列から昇順ソートオプション配列を作成
 * @param {Array} array - ソート情報の配列
 * @returns {Array} 昇順フラグの配列
 */
function make_ascending_sort_option_array(array) {
  let sort_char;
  let sort_option;

  const v = array.map((item) => {
    if (item !== null) {
      sort_char = item[0].toLowerCase();
      if (sort_char === 'a') {
        sort_option = true;
      } else {
        sort_option = false;
      }
    } else {
      sort_option = null;
    }
    return sort_option;
  });
  return v;
}

/**
 * フィールド条件を作成（バージョン2）
 * @param {Array} array - ソート情報の配列
 * @returns {Array} フィールド条件の配列
 */
function make_field_condition_2(array) {
  const sort_option_array = make_ascending_sort_option_array_2(array);
  const ret = sort_option_array.filter((item) => item !== null).map((item) => ({ column: item[0], ascending: item[1] }));
  return ret;
}

/**
 * フィールド条件を作成
 * @param {number} column_index - 開始列インデックス
 * @param {Array} array - ソート情報の配列
 * @returns {Array} フィールド条件の配列
 */
function make_field_condition(column_index, array) {
  const ret_array = [];
  const sort_option_array = make_ascending_sort_option_array(array);
  for (let i = 0; i < sort_option_array.length; i++) {
    if (sort_option_array[i] !== null) {
      ret_array.push({ column: column_index + i, ascending: sort_option_array[i] });
    }
  }

  return ret_array;
}
