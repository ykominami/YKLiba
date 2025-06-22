class Arrayx {
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

  static getRelativeCoordinatesOfTopLeft(array) {
    const shape = Arrayx.arrayShape(array);
    const startPoint = { x: -1, y: -1 };
    return Arrayx.getRelativeCoordinatesOfTopLeftSimple(array, shape, startPoint);
  }

  static getRelativeCoordinatesOfBottomLeft(array) {
    const shape = Arrayx.arrayShape(array);
    const startPoint = { x: -1, y: -1 };
    const tlPoint = Arrayx.getRelativeCoordinatesOfTopLeftSimple(array, shape, startPoint);
    const blPoint = Arrayx.getRelativeCoordinatesOfBottomLeftSimple(array, shape, tlPoint);
    return blPoint;
  }

  static getRelativeCoordinatesOfTLandBL(array) {
    const shape = Arrayx.arrayShape(array);
    const startPoint = { x: -1, y: -1 };
    const tlPoint = Arrax.getRelativeCoordinatesOfTopLeftSimple(array, shape, startPoint);
    const blPoint = Arrayx.getRelativeCoordinatesOfBottomLeftSimple(array, shape, tlPoint);
    return { tl: tlPoint, bl: blPoint };
  }

  static getRelativeCoordinatesOfTopRightSimple(array, shape, startPoint) {
    return { x: shape.lenMin, y: 0 };
  }

  static getRelativeCoordinatesOfBottomRightSimple(array, shape, startPoint) {
    return { x: shape.lenMin, y: shape.size };
  }

  static getRelativeCoordinatesOfTopRight(array) {
    const shape = Arrayx.arrayShape(array);
    return { x: shape.lenMin, y: 0 };
  }

  static getRelativeCoordinatesOfBottomRight(array) {
    const shape = Arrayx.arrayShape(array);
    return { x: shape.lenMin, y: shape.size };
  }

  static getRelativeCoordinatesOfTRandBR(array) {
    const shape = Arrayx.arrayShape(array);
    const trShape = { x: shape.lenMin, y: 0 };
    const brShape = { x: shape.lenMin, y: shape.size };
    return { tr: trShape, br: brShape };
  }

  static getRelativeCoordinatesOfTLandBlandTRandBR(array) {
    const shape = Arrax.arrayShape(array);
    const startPoint = { x: -1, y: -1 };
    const tlPoint = Arrayx.getRelativeCoordinatesOfTopLeftSimple(array, shape, startPoint);
    const trPoint = { x: shape.lenMin, y: 0 };
    const blPoint = Arrayx.getRelativeCoordinatesOfBottomLeftSimple(array, shape, tlPoint);
    const brPoint = { x: shape.lenMin, y: blPoint.y };
    return {
      tl: tlPoint, bl: blPoint, tr: trPoint, br: brPoint,
    };
  }

  static getReformData(rowData) {
    return rowData.map((row) => {
      const date = new Date(row);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const datex = (date.getDate()).toString().padStart(2, '0');
      return `${year}/${month}/${datex}`;
    });
  }

  static outputToDocument(doc, text) {
    var SUCCESS = 0;
    var NO_TEXT = 1;
    var FAILURE = -1;
    if (text.length === 0) {
      Logger.log("文字列長が0のため、ドキュメントへの追加をスキップしました。");
      return NO_TEXT;
    }
    try {
      var body = doc.getBody();
      body.appendParagraph(text);
      Logger.log("ドキュメントへの文字列追加に成功しました。");
      return SUCCESS;
    } catch (e) {
      Logger.log("ドキュメントへの文字列追加に失敗しました。エラー: " + e.toString());
      return FAILURE;
    }
  }

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

  static isValid1dArray(array) {
    let ret = Arrayx.isValidObject(array);
    if (ret[0] === false) {
      return ret;
    }
    if (array.length === 0) {
      return [false, 'first element of Array is empty array', 10];
    }
    if (array.length === 1) {
      ret = Arrax.isValidObject(array[0]);
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
    ret = Arrayx.isValidObject(array[0]);
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

  static isValid2dArray(array) {
    let ret = Arrayx.isValidObject(array);
    if (ret[0] === false) {
      return ret;
    }
    if (array.length === 1) {
      ret = Arrayx.isValidObject(array[0]);
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
    ret = Arrayx.isValidObject(array[0]);
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

  static isEqualArray(arrayA, arrayB) {
    if (typeof (arrayA[0]) === 'object') {
      return Arrayx.isEqualArrayTwoDim(arrayA, arrayB);
    }
    return Arrayx.isEqualArrayOneDim(arrayA, arrayB);
  }

  static getMaxAndMin(array) {
    Logger.log(`getMaxAndMin array=${array}`)
    const aryMax = function (a, b) { return Math.max(a, b); };
    const aryMin = function (a, b) { return Math.min(a, b); };
    const max = array.reduce(aryMax);
    const min = array.reduce(aryMin);
    Logger.log(`getMaxAndMin max=${max} min=${min}`)
    return [max, min];
  }

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

  static isValidObject(obj) {
    if (obj === null || typeof obj === 'undefined') {
      return [false, 'object is null or undefined'];
    }
    return [true, 'object is valid'];
  }
}

this.Arrayx = Arrayx;
