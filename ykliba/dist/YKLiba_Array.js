/**
 * 値が条件に合致するかどうかを判定する
 * @param {string} cond 条件 ('NOT_BLANK' または 'BLANK')
 * @param {any} value 判定する値
 * @return {boolean} 条件に合致するかどうか
 */
function determine(cond, value) {
  let ret;
  if (value === null) {
    if (cond === 'NOT_BLANK') {
      return true;
    }

    return false;
  }
  if (typeof (value) === 'undefined') {
    if (cond === 'NOT_BLANK') {
      return false;
    }

    return true;
  }
  if (typeof (value) === 'string') {
    const str = value.trim();
    if (cond === 'NOT_BLANK') {
      ret = (str !== '');
      return ret;
    }

    ret = (str === '');
    return ret;
  }
  if (cond === 'NOT_BLANK') {
    ret = (value !== '');
    return ret;
  }

  ret = (value === '');
  return ret;
}

/**
 * 配列内で条件に合致するレコードを検出する
 * @param {Array} array 検索対象の配列
 * @param {string} cond 条件 ('NOT_BLANK' または 'BLANK')
 * @param {number} detectIndex 検索する列のインデックス
 * @param {number} startY 検索開始行
 * @param {number} h 検索終了行
 * @return {Array} [detectIndex, 見つかった行のインデックス]
 */
function detectRecord(array, cond, detectIndex, startY, h) {
  let index = -1;
  if (startY < 0) {
    return [-1, -1];
  }
  for (let i = startY; i < h; i++) {
    const ret = determine(cond, array[i][detectIndex]);
    if (ret) {
      index = i;
      break;
    }
  }
  return [detectIndex, index];
}

/**
 * 配列の形状情報を取得する
 * @param {Array} array 対象の配列
 * @return {Object} {size: 行数, lenMax: 最大列数, lenMin: 最小列数}
 */
function arrayShape(array) {
  const sizeArray = array.map((list) => list.length);
  let lenMax;
  let lenMin;
  if (sizeArray.length > 0) {
    [lenMax, lenMin] = getMaxAndMin(sizeArray);
  } else {
    lenMin = 0;
    lenMax = 0;
  }
  const size = array.length;

  return { size, lenMax, lenMin };
}

/**
 * 配列の左上の座標を取得する（シンプル版）
 * @param {Array} array 対象の配列
 * @param {Object} shape 配列の形状情報
 * @param {Object} startPoint 開始点
 * @return {Object} {x: 列インデックス, y: 行インデックス}
 */
function getRelativeCordinatesOfTopLeftSimple(array, shape, startPoint) {
  let { x } = startPoint;
  let { y } = startPoint;
  for (let i = 0; i < shape.lenMax; i++) {
    [x, y] = detectRecord(array, 'NOT_BLANK', i, 0, shape.size);
    if (y !== -1) {
      break;
    }
  }
  return { x, y };
}
// function detect_record(array, cond, detect_index, start_y, h){
/**
 * 配列の左下の座標を取得する（シンプル版）
 * @param {Array} array 対象の配列
 * @param {number} lenMax 最大列数
 * @param {number} size 行数
 * @param {number} startX 開始列
 * @param {number} startY 開始行
 * @param {number} len_min 最小列数
 * @return {Array} [x: 列インデックス, y: 行インデックス]
 */
function getRelativeCordinatesOfBottomLeftSimple(array, lenMax, size, startX, startY, len_min) {
  let x = startX;
  let y = startY;
  for (let i = startY; i < lenMax; i++) {
    [x, y] = detectRecord(array, 'BLANK', startX, i, size);
    if (y != -1) {
      y -= 1;
      break;
    }
  }
  return [x, y];
}

/**
 * 配列の左上の座標を取得する
 * @param {Array} array 対象の配列
 * @return {Object} {x: 列インデックス, y: 行インデックス}
 */
function getRelativeCordinatesOfTopLeft(array) {
  // let [size, len_max, len_min] = arrayShape(array);
  const shape = arrayShape(array);
  const startPoint = { x: -1, y: -1 };
  return getRelativeCordinatesOfTopLeftSimple(array, shape, startPoint);
}

/**
 * 配列の左下の座標を取得する
 * @param {Array} array 対象の配列
 * @return {Array} [x: 列インデックス, y: 行インデックス]
 */
function getRelativeCordinatesOfBottomLeft(array) {
  const shape = arrayShape(array);
  const startPoint = { x: -1, y: -1 };

  const tlPoint = getRelativeCordinatesOfTopLeft_simple(array, shape, startPoint);

  const blPoint = getRelativeCordinatesOfBottomLeft_simple(array, shape, tlPoint);

  return blPoint;
}

/**
 * 配列の左上と左下の座標を取得する
 * @param {Array} array 対象の配列
 * @return {Object} {tl: 左上座標, bl: 左下座標}
 */
function getRelativeCordinatesOfTLandBL(array) {
  const shape = arrayShape(array);
  const startPoint = { x: -1, y: -1 };

  const tlPoint = getRelativeCordinatesOfTopLeft_simple(array, shape, startPoint);
  const blPoint = getRelativeCordinatesOfBottomLeft_simple(array, shape, tlPoint);

  return { tl: tlPoint, bl: blPoint };
}

/**
 * 配列の右上の座標を取得する（シンプル版）
 * @param {Array} array 対象の配列
 * @param {Object} shape 配列の形状情報
 * @param {Object} startPoint 開始点
 * @return {Object} {x: 列インデックス, y: 行インデックス}
 */
function getRelativeCordinatesOfTopRight_simple(array, shape, startPoint) {
  return { x: shape.lenMin, y: 0 };
}

/**
 * 配列の右下の座標を取得する（シンプル版）
 * @param {Array} array 対象の配列
 * @param {Object} shape 配列の形状情報
 * @param {Object} startPoint 開始点
 * @return {Object} {x: 列インデックス, y: 行インデックス}
 */
function getRelativeCordinatesOfBottomRight_simple(array, shape, startPoint) {
  return { x: shape.lenMin, y: shape.size };
}

/**
 * 配列の右上の座標を取得する
 * @param {Array} array 対象の配列
 * @return {Object} {x: 列インデックス, y: 行インデックス}
 */
function getRelativeCordinatesOfTopRight(array) {
  const shape = arrayShape(array);
  return { x: shape.lenMin, y: 0 };
}

/**
 * 配列の右下の座標を取得する
 * @param {Array} array 対象の配列
 * @return {Object} {x: 列インデックス, y: 行インデックス}
 */
function getRelativeCordinatesOfBottomRight(array) {
  const shape = arrayShape(array);
  return { x: shape.lenMin, y: shape.size };
}

/**
 * 配列の右上と右下の座標を取得する
 * @param {Array} array 対象の配列
 * @return {Object} {tr: 右上座標, br: 右下座標}
 */
function getRelativeCordinatesOfTRandBR(array) {
  const shape = arrayShape(array);
  const trShape = { x: shape.lenMin, y: 0 };
  const brShape = { x: shape.lenMin, y: shape.size };

  return { tr: trShape, br: brShape };
}

/**
 * 配列の四隅の座標を取得する
 * @param {Array} array 対象の配列
 * @return {Object} {tl: 左上座標, bl: 左下座標, tr: 右上座標, br: 右下座標}
 */
function getRelativeCordinatesOfTLandBlandTRandBR(array) {
  const shape = arrayShape(array);
  const startPoint = { x: -1, y: -1 };

  const tlPoint = getRelativeCordinatesOfTopLeft_simple(array, shape, startPoint);
  // let [tl_x, tl_y] =getRelativeCordinatesOfTopLeft_simple(array, len_max, size, -1, -1, len_min);

  const trPoint = { x: shape.lenMin, y: 0 };
  const blPoint = getRelativeCordinatesOfBottomLeft_simple(array, shape, tlPoint);
  // [bl_x, bl_y] =getRelativeCordinatesOfBottomLeft_simple(array, len_max, size, tl_x, tl_y, len_min);
  const brPoint = { x: shape.lenMin, y: blPoint.y };
  return {
    tl: tlPoint, bl: blPoint, tr: trPoint, br: brPoint,
  };
}

/**
 * 日付データを整形する
 * @param {Array} row_data 日付データの配列
 * @return {Array} 整形された日付文字列の配列 (YYYY/MM/DD形式)
 */
function get_reform_data(row_data) {
  return row_data.map((row) => {
    const date = new Date(row);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const datex = (date.getDate()).toString().padStart(2, '0');

    return `${year}/${month}/${datex}`;
  });
}

/**
 * Googleドキュメントに文字列を追加する
 * @param {object} doc Googleドキュメント
 * @param {string} text 追加する文字列
 * @return {number} 追加結果（0: 成功, 1: 文字列長0, -1: 失敗）
 */
function output_to_document(doc, text) {
  // 返値を種類別に変数に保持
  var SUCCESS = 0;
  var NO_TEXT = 1;
  var FAILURE = -1;

  // 文字列長が0の場合は追加しない
  if (text.length === 0) {
    YKLiblog.Log.debug("文字列長が0のため、ドキュメントへの追加をスキップしました。");
    return NO_TEXT;
  }

  try {
    // 本文を取得
    var body = doc.getBody();
    // 文字列を追加
    body.appendParagraph(text);
    YKLiblog.Log.debug("ドキュメントへの文字列追加に成功しました。");
    return SUCCESS;
  } catch (e) {
    YKLiblog.Log.error("ドキュメントへの文字列追加に失敗しました。エラー: " + e.toString());
    return FAILURE;
  }
}
/**
 * 条件に合致する連続した領域を検出する
 * @param {Array} values 検索対象の配列
 * @param {Function} op 条件判定関数
 * @return {Array} 連続領域の開始・終了インデックスの配列
 */
function linkedRegion(values, op) {
  if (values === null) {
    return [];
  }
  return values.reduce((accumlator, currentValue, currentIndex, array) => {
    if (currentIndex === 0) {
      if (op(currentValue)) {
        accumlator.push([0, -1]);
      } else {
        accumlator.push([-1, -1]);
      }
    } else {
      array = accumlator[accumlator.length - 1];
      if (op(currentValue)) {
        if (array[0] === -1) {
          array[0] = currentIndex;
          if ((accumlator.length - 1) === currentIndex) {
            array[1] = currentIndex;
          }
        } else {
          array[1] = currentIndex;
        }
      } else if (array[0] === -1) {
        // do nothing
      } else if (array[1] === -1) {
        array[1] = array[0];
      } else {
        accumlator.push([-1, -1]);
      }
    }
    return accumlator;
  }, []);
}

/**
 * 1次元配列の妥当性を検証する
 * @param {Array} array 検証対象の配列
 * @return {Array} [妥当性, メッセージ, エラーコード]
 */
function is_valid_1d_array(array) {
  let ret = is_valid_object(array);
  if (ret[0] === false) {
    return ret;
  }
  if (array.length === 0) {
    return [false, 'first element of Array is empty array', 10];
  }
  if (array.length === 1) {
    ret = is_valid_object(array[0]);
    if (ret[0] === false) {
      return [false, 'first element of Array is null or undefined', 11];
    }

    if (typeof (array) === 'object') {
      if (typeof (array[0]) === 'object') {
        return [false, 'nested Array', 12];
      }

      return [true, '1x1 array', 13];
    }

    return [false, 'anything else', 14];
  }
  if (array.length > 1) {
    if (typeof (array[0]) === 'object') {
      if (array[0].length > 1) {
        return [false, 'multipule dimension Array', 15];
      }
      if (array[0].length === 1) {
        return [false, '1 x 1 Array', 16];
      }

      return [false, 'first element of Array is empty array', 17];
    }

    return [true, '1d Array', 18];
  }

  ret = is_valid_object(array[0]);
  if (ret[0] === false) {
    return [false, 'first element of Array is null or undefined', 19];
  }

  if (typeof (array[0]) === 'object') {
    if (array[0].length == 0) {
      return [false, 'empty array', 21];
    }
    if (array[0].length == 1) {
      return [false, '1 x 1 Array', 22];
    }

    return [true, 'first element of Array is 1d Array', 23];
  }

  return [false, 'Unknown', 24];
}

/**
 * 2次元配列の妥当性を検証する
 * @param {Array} array 検証対象の配列
 * @return {Array} [妥当性, メッセージ, エラーコード]
 */
function is_valid_2d_array(array) {
  let ret = is_valid_object(array);
  if (ret[0] === false) {
    return ret;
  }
  if (array.length === 1) {
    ret = is_valid_object(array[0]);
    if (ret[0] === false) {
      return [false, 'first element of Array is null or undefined', 1];
    }

    if (typeof (array) === 'object') {
      if (typeof (array[0]) === 'object') {
        return [false, 'nested Array', 2];
      }

      return [true, '11x1 array', 21];
    }

    return [false, 'anything else', 22];
  }
  if (array.length > 1) {
    if (typeof (array[0]) === 'object') {
      if (array[0].length > 1) {
        return [false, 'multipule dimension Array', 4];
      }
      if (array[0].length === 1) {
        return [true, '1 x 1 Array', 5];
      }

      return [true, 'first element of Array is empty array', 6];
    }

    return [true, '1d Array', 7];
  }

  ret = is_valid_object(array[0]);
  if (ret[0] === false) {
    return [false, 'first element of Array is null or undefined', 8];
  }

  if (array[0].length === 0) {
    return [false, 'first element of Array is empty Array', 9];
  }
  if (typeof (array[0]) === 'object') {
    if (array[0].length == 1) {
      return [true, '1 x 1 Array', 10];
    }

    return [true, 'first element of Array is 1d Array', 11];
  }
}

/**
 * 1次元配列の等価性を判定する
 * @param {Array} arrayA 比較対象の配列A
 * @param {Array} arrayB 比較対象の配列B
 * @return {Array} [等価性, [メッセージ, 詳細情報]]
 */
function is_equal_array_one_dim(arrayA, arrayB) {
  const lengthA = arrayA.length;
  const lengthB = arrayB.length;
  if (lengthA !== lengthB) {
    return [false, ['length of array are different', heightA, heightB]];
  }

  for (let x = 0; x < lengthA; x++) {
    if (arrayA[x] !== arrayB[x]) {
      return [false, ['element of array are different, x', arrayA[x], arrayB[x]]];
    }
  }
  return [true, ['same array', 0, 0]];
}

/**
 * 2次元配列の等価性を判定する
 * @param {Array} arrayA 比較対象の配列A
 * @param {Array} arrayB 比較対象の配列B
 * @return {Array} [等価性, [エラーコード, 詳細情報]]
 */
function is_equal_array_two_dim(arrayA, arrayB) {
  const heightA = arrayA.length;
  const heightB = arrayB.length;
  if (heightA !== heightB) {
    return [false, [1, heightA, heightB]];
  }

  const widthA = arrayA[0].length;
  const widthB = arrayB[0].length;
  if (widthA !== widthB) {
    return [false, [2, widthA, widthB]];
  }

  for (let y = 0; y < heightA; y++) {
    for (let x = 0; x < widthA; x++) {
      if (arrayA[y][x] !== arrayB[y][x]) {
        return [false, [3, x, y, arrayA[y][x], arrayB[y][x]]];
      }
    }
  }
  return [true, [0, 0, 0]];
}

/**
 * 配列の等価性を判定する
 * @param {Array} arrayA 比較対象の配列A
 * @param {Array} arrayB 比較対象の配列B
 * @return {Array} 等価性判定結果
 */
function is_equal_array(arrayA, arrayB) {
  if (typeof (arrayA[0]) === 'object') {
    return is_equal_array_two_dim(arrayA, arrayB);
  }

  return is_equal_array_one_dim(array_a, array_b);
}

/**
 * 配列の最大値と最小値を取得する
 * @param {Array} array 対象の配列
 * @return {Array} [最大値, 最小値]
 */
function getMaxAndMin(array) {
  YKLiblog.Log.debug(`getMaxAndMin array=${array}`)
  const aryMax = function (a, b) { return Math.max(a, b); };
  const aryMin = function (a, b) { return Math.min(a, b); };
  const max = array.reduce(aryMax);
  const min = array.reduce(aryMin);

  YKLiblog.Log.debug(`getMaxAndMin max=${max} min=${min}`)
  return [max, min];
}

/**
 * ネストした配列から条件に基づいて最大値と最小値を取得する
 * @param {Array} array 対象の配列
 * @param {Function} op 比較に使用する関数
 * @return {Array} [最大値, 最小値]
 */
function getMaxAndMinFromNestedArray(array, op) {
  const aryMax = function (a, b) {
    if (op(a) >= op(b)) {
      return a;
    }

    return b;
  };
  const aryMin = function (a, b) {
    if (op(a) >= op(b)) {
      return b;
    }

    return a;
  };
  const max = array.reduce(aryMax);
  const min = array.reduce(aryMin);

  return [max, min];
}
