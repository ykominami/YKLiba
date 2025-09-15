// Import required classes
// Utils class for utility functions
// YKLiblog class for logging operations

/**
 * 配列操作に関する機能を提供するクラス
 * 2次元配列の座標計算、配列の妥当性検証、データ変換などの機能を含む
 * Google Apps Script環境での配列処理に特化した実装を提供する
 */
class Arrayx {
  /**
   * 条件に基づいて値の判定を行う
   * @param {string} cond - 判定条件 ('NOT_BLANK' または 'BLANK')
   * @param {*} value - 判定対象の値
   * @returns {boolean} 判定結果
   */
  static determine(cond, value) {
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
   * 配列内で指定された条件に一致するレコードを検出する
   * @param {Array} array - 検索対象の配列
   * @param {string} cond - 検索条件 ('NOT_BLANK' または 'BLANK')
   * @param {number} detectIndex - 検索対象の列インデックス
   * @param {number} startY - 検索開始行
   * @param {number} h - 検索終了行
   * @returns {Array} [列インデックス, 行インデックス] の配列
   */
  static detectRecord(array, cond, detectIndex, startY, h) {
    let index = -1;
    if (startY < 0) {
      return [-1, -1];
    }
    for (let i = startY; i < h; i++) {
      const ret = Arrayx.determine(cond, array[i][detectIndex]);
      if (ret) {
        index = i;
        break;
      }
    }
    return [detectIndex, index];
  }

  /**
   * 配列の形状情報を取得する
   * @param {Array} array - 対象配列
   * @returns {Object} 配列のサイズ情報 {size, lenMax, lenMin}
   */
  static arrayShape(array) {
    const sizeArray = array.map((list) => list.length);
    let lenMax;
    let lenMin;
    if (sizeArray.length > 0) {
      [lenMax, lenMin] = Arrayx.getMaxAndMin(sizeArray);
    } else {
      lenMin = 0;
      lenMax = 0;
    }
    const size = array.length;
    return { size, lenMax, lenMin };
  }

  /**
   * 配列の左上座標を取得する（簡易版）
   * @param {Array} array - 対象配列
   * @param {Object} shape - 配列の形状情報
   * @param {Object} startPoint - 開始点
   * @returns {Object} 左上座標 {x, y}
   */
  static getRelativeCoordinatesOfTopLeftSimple(array, shape, startPoint) {
    let { x } = startPoint;
    let { y } = startPoint;
    for (let i = 0; i < shape.lenMax; i++) {
      [x, y] = Arrayx.detectRecord(array, 'NOT_BLANK', i, 0, shape.size);
      if (y !== -1) {
        break;
      }
    }
    return { x, y };
  }

  /**
   * 配列の左下座標を取得する（簡易版）
   * @param {Array} array - 対象配列
   * @param {number} lenMax - 最大長
   * @param {number} size - 配列サイズ
   * @param {number} startX - 開始X座標
   * @param {number} startY - 開始Y座標
   * @param {number} lenMin - 最小長
   * @returns {Array} 左下座標 [x, y]
   */
  static getRelativeCoordinatesOfBottomLeftSimple(array, lenMax, size, startX, startY, lenMin) {
    let x = startX;
    let y = startY;
    for (let i = startY; i < lenMax; i++) {
      [x, y] = Arrayx.detectRecord(array, 'BLANK', startX, i, size);
      if (y != -1) {
        y -= 1;
        break;
      }
    }
    return [x, y];
  }

  /**
   * 配列の左上座標を取得する
   * @param {Array} array - 対象配列
   * @returns {Object} 左上座標 {x, y}
   */
  static getRelativeCoordinatesOfTopLeft(array) {
    const shape = Arrayx.arrayShape(array);
    const startPoint = { x: -1, y: -1 };
    return Arrayx.getRelativeCoordinatesOfTopLeftSimple(array, shape, startPoint);
  }

  /**
   * 配列の左下座標を取得する
   * @param {Array} array - 対象配列
   * @returns {Array} 左下座標 [x, y]
   */
  static getRelativeCoordinatesOfBottomLeft(array) {
    const shape = Arrayx.arrayShape(array);
    const startPoint = { x: -1, y: -1 };
    const tlPoint = Arrayx.getRelativeCoordinatesOfTopLeftSimple(array, shape, startPoint);
    const blPoint = Arrayx.getRelativeCoordinatesOfBottomLeftSimple(array, shape, tlPoint);
    return blPoint;
  }

  /**
   * 配列の左上と左下座標を取得する
   * @param {Array} array - 対象配列
   * @returns {Object} 左上と左下座標 {tl, bl}
   */
  static getRelativeCoordinatesOfTLandBL(array) {
    const shape = Arrayx.arrayShape(array);
    const startPoint = { x: -1, y: -1 };
    const tlPoint = Arrayx.getRelativeCoordinatesOfTopLeftSimple(array, shape, startPoint);
    const blPoint = Arrayx.getRelativeCoordinatesOfBottomLeftSimple(array, shape, tlPoint);
    return { tl: tlPoint, bl: blPoint };
  }

  /**
   * 配列の右上座標を取得する（簡易版）
   * @param {Array} array - 対象配列
   * @param {Object} shape - 配列の形状情報
   * @param {Object} startPoint - 開始点
   * @returns {Object} 右上座標 {x, y}
   */
  static getRelativeCoordinatesOfTopRightSimple(array, shape, startPoint) {
    return { x: shape.lenMin, y: 0 };
  }

  /**
   * 配列の右下座標を取得する（簡易版）
   * @param {Array} array - 対象配列
   * @param {Object} shape - 配列の形状情報
   * @param {Object} startPoint - 開始点
   * @returns {Object} 右下座標 {x, y}
   */
  static getRelativeCoordinatesOfBottomRightSimple(array, shape, startPoint) {
    return { x: shape.lenMin, y: shape.size };
  }

  /**
   * 配列の右上座標を取得する
   * @param {Array} array - 対象配列
   * @returns {Object} 右上座標 {x, y}
   */
  static getRelativeCoordinatesOfTopRight(array) {
    const shape = Arrayx.arrayShape(array);
    return { x: shape.lenMin, y: 0 };
  }

  /**
   * 配列の右下座標を取得する
   * @param {Array} array - 対象配列
   * @returns {Object} 右下座標 {x, y}
   */
  static getRelativeCoordinatesOfBottomRight(array) {
    const shape = Arrayx.arrayShape(array);
    return { x: shape.lenMin, y: shape.size };
  }

  /**
   * 配列の右上と右下座標を取得する
   * @param {Array} array - 対象配列
   * @returns {Object} 右上と右下座標 {tr, br}
   */
  static getRelativeCoordinatesOfTRandBR(array) {
    const shape = Arrayx.arrayShape(array);
    const trShape = { x: shape.lenMin, y: 0 };
    const brShape = { x: shape.lenMin, y: shape.size };
    return { tr: trShape, br: brShape };
  }

  /**
   * 配列の四隅の座標を取得する
   * @param {Array} array - 対象配列
   * @returns {Object} 四隅の座標 {tl, bl, tr, br}
   */
  static getRelativeCoordinatesOfTLandBlandTRandBR(array) {
    const shape = Arrayx.arrayShape(array);
    const startPoint = { x: -1, y: -1 };
    const tlPoint = Arrayx.getRelativeCoordinatesOfTopLeftSimple(array, shape, startPoint);
    const trPoint = { x: shape.lenMin, y: 0 };
    const blPoint = Arrayx.getRelativeCoordinatesOfBottomLeftSimple(array, shape, tlPoint);
    const brPoint = { x: shape.lenMin, y: blPoint.y };
    return {
      tl: tlPoint, bl: blPoint, tr: trPoint, br: brPoint,
    };
  }

  /**
   * 日付データをフォーマットする
   * @param {Array} rowData - 日付データの配列
   * @returns {Array} フォーマットされた日付文字列の配列
   */
  static getReformData(rowData) {
    return rowData.map((row) => {
      const date = new Date(row);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const datex = (date.getDate()).toString().padStart(2, '0');
      return `${year}/${month}/${datex}`;
    });
  }

  /**
   * ドキュメントにテキストを出力する
   * @param {Object} doc - Google Docs ドキュメントオブジェクト
   * @param {string} text - 出力するテキスト
   * @returns {number} 実行結果 (0: 成功, 1: テキストなし, -1: 失敗)
   */
  static outputToDocument(doc, text) {
    var SUCCESS = 0;
    var NO_TEXT = 1;
    var FAILURE = -1;
    if (text.length === 0) {
      YKLiblog.Log.debug("文字列長が0のため、ドキュメントへの追加をスキップしました。");
      return NO_TEXT;
    }
    try {
      var body = doc.getBody();
      body.appendParagraph(text);
      YKLiblog.Log.debug("ドキュメントへの文字列追加に成功しました。");
      return SUCCESS;
    } catch (e) {
      YKLiblog.Log.error("ドキュメントへの文字列追加に失敗しました。エラー: " + e.toString());
      return FAILURE;
    }
  }

  /**
   * 連続する領域を検出する
   * @param {Array} values - 検出対象の配列
   * @param {Function} op - 判定関数
   * @returns {Array} 連続領域の開始・終了インデックスの配列
   */
  static linkedRegion(values, op) {
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
   * @param {Array} array - 検証対象の配列
   * @returns {Array} [妥当性, メッセージ, エラーコード]
   */
  static isValid1dArray(array) {
    let ret = Utils.isValidObject(array);
    if (ret[0] === false) {
      return ret;
    }
    if (array.length === 0) {
      return [false, 'first element of Array is empty array', 10];
    }
    if (array.length === 1) {
      ret = Utils.isValidObject(array[0]);
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
    ret = Utils.isValidObject(array[0]);
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
   * @param {Array} array - 検証対象の配列
   * @returns {Array} [妥当性, メッセージ, エラーコード]
   */
  static isValid2dArray(array) {
    let ret = Utils.isValidObject(array);
    if (ret[0] === false) {
      return ret;
    }
    if (array.length === 1) {
      ret = Utils.isValidObject(array[0]);
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
    ret = Utils.isValidObject(array[0]);
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
   * @param {Array} arrayA - 比較対象配列A
   * @param {Array} arrayB - 比較対象配列B
   * @returns {Array} [等価性, [メッセージ, 詳細情報]]
   */
  static isEqualArrayOneDim(arrayA, arrayB) {
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
   * @param {Array} arrayA - 比較対象配列A
   * @param {Array} arrayB - 比較対象配列B
   * @returns {Array} [等価性, [エラーコード, 詳細情報]]
   */
  static isEqualArrayTwoDim(arrayA, arrayB) {
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
   * 配列の等価性を判定する（1次元・2次元自動判定）
   * @param {Array} arrayA - 比較対象配列A
   * @param {Array} arrayB - 比較対象配列B
   * @returns {Array} [等価性, [詳細情報]]
   */
  static isEqualArray(arrayA, arrayB) {
    if (typeof (arrayA[0]) === 'object') {
      return Arrayx.isEqualArrayTwoDim(arrayA, arrayB);
    }
    return Arrayx.isEqualArrayOneDim(arrayA, arrayB);
  }

  /**
   * 配列から最大値と最小値を取得する
   * @param {Array} array - 対象配列
   * @returns {Array} [最大値, 最小値]
   */
  static getMaxAndMin(array) {
    YKLiblog.Log.debug(`getMaxAndMin array=${array}`)
    const aryMax = function (a, b) { return Math.max(a, b); };
    const aryMin = function (a, b) { return Math.min(a, b); };
    const max = array.reduce(aryMax);
    const min = array.reduce(aryMin);
    YKLiblog.Log.debug(`getMaxAndMin max=${max} min=${min}`)
    return [max, min];
  }

  /**
   * ネストした配列から条件に基づく最大値と最小値を取得する
   * @param {Array} array - 対象配列
   * @param {Function} op - 比較に使用する関数
   * @returns {Array} [最大値, 最小値]
   */
  static getMaxAndMinFromNestedArray(array, op) {
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

}

this.Arrayx = Arrayx;
