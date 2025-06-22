class Range {
  static getRangeAndValues(sheet) {
    let range = null;
    let values = null;
    if (sheet !== null && typeof (sheet) !== 'undefined') {
      range = sheet.getDataRange();
      values = range.getValues();
    }
    return [range, values];
  }

  static getValidRange(sheet) {
    let newRange = null;
    const [range, values] = Range.getRangeAndValues(sheet);
    if ((range !== null && typeof (range) !== 'undefined') && values !== null) {
      const shape = Range.getRangeShape(range);
      const tlRelative = Range.getRelativeCordinatesOfTopLeft(values);

      const newHeight = shape.h - tlRelative.y;
      const newWidth = shape.w - tlRelative.x;
      newRange = range.offset(tlRelative.y, tlRelative.x, newHeight, newWidth);
    }
    return newRange;
  }

  static getRangeShape(range) {
    const column = range.getColumn();
    const row = range.getRow();
    const height = range.getHeight();
    const width = range.getWidth();

    return Misc.makeShape({
      r: row, c: column, h: height, w: width,
    });
  }

  static setValues(range, values) {
    range.setValues(values);
  }

  static getColumn(dataRange, index) {
    const dataArray = dataRange.getValues();
    return dataArray.map((row) => row[index]);
  }

  static insertOneRow(sheet, argAdjust = null) {
    const [header_range, dataRange] = Range.getRangeOfHeaderAndData(sheet, argAdjust);
    const shape = Range.getRangeShape(dataRange);
    const targetRange = dataRange.offset(0, 0, 1, shape.w);
    targetRange.insertCells(SpreadsheetApp.Dimension.COLUMNS);
  }

  static grouping(values, op) {
    return values.reduce((hash, curVal, index) => {
      const [key, value] = op(curVal);
      if (typeof (hash[key]) === 'undefined') {
        hash[key] = [value];
      } else {
        hash[key] = [...hash[key], value];
      }
      return hash;
    }, {});
  }

  static validString(value) {
    if (typeof (value) === 'undefined') {
      return '';
    }
    return value.toString();
  }

  static compareWithString(a, b) {
    const aStr = Range.validString(a);
    const bStr = Range.validString(b);
    if (aStr < bStr) {
      return -1;
    }
    if (aStr > bStr) {
      return 1;
    }
    return 0;
  }

  static sortx(array, op) {
    return array.sort(op);
  }

  static groupingWithRange(range, op) {
    const values = range.getValues();
    return Range.grouping(values, op);
  }

  static divideRangeX(range, grouping_op, link_op) {
    const hash = Range.groupingWithRange(range, grouping_op);
    const values = range.getValues();
    const result = Range.linkedRegion(values, link_op);
    const width = values[0].length;
    const targetRange = range.offset(result[0][0], 0, result[0][1] - result[0][0] + 1, width);
    const shape = Range.getRangeShape(targetRange);
    Range.dumpObject(shape);
    return targetRange;
  }
}
this.Range = Range; 