class Simple {
  static getSimpleRowsWithEnv(env, maxRange = null) {
    const [ss, sheet] = get_spreadsheet(env.ss_id, env.sheet_name);
    const values = this.getSimpleRows(sheet, maxRange);
    return values;
  }

  static simpleRowsRangeX(sheetx) {
    const [values, range] = this.getSimpleRowsAndRange(sheetx);

    const tl_bl_Point = getRelativeCordinatesOfTLandBL(values);

    const rindex = get_rindex(values[0]);
    const simple_width = rindex;
    const shape = getRelativeCordinatesOfTLandBlandTRandBR(values);
    const simple_range = range.offset(shape.tl.y, shape.tl.x, (shape.bl.y - shape.tl.y), simple_width);
    return simple_range;
  }

  static simpleRowsX(sheetx) {
    const simple_range = this.simpleRowsRangeX(sheetx);
    const v = simple_range.getValues();
    return v;
  }

  static getSimpleRowsRange(sheet) {
    return getValidRange(sheet);
  }

  static adjustRange(range, maxH, maxW) {
    const rangeShape = getRangeShape(range);
    let w = 0;
    let h = 0;
    if (maxH < rangeShape.h) {
      h = maxH;
    }
    else {
      h = rangeShape.h;
    }
    if (maxW < rangeShape.w) {
      w = maxW;
    }
    else {
      w = rangeShape.w;
    }
    return range.offset(0, 0, h, w);
  }

  static getSimpleRows(sheet, maxRange = null) {
    const range = this.getSimpleRowsRange(sheet);
    let values = [];
    Logger.log(`YKLiba_simple.js getSimpleRows 0 range=${range}`);
    if (range !== null) {
      if (maxRange !== null) {
        const newRange = this.adjustRange(range, maxRange.h, maxRange.w);
        values = newRange.getValues();
      }
      else {
        values = range.getValues();
      }
      Logger.log(`YKLiba_simple.js getSimpleRows 1`);
    }
    return values;
  }

  static getSimpleRowsAndRange(sheet, maxRange = null) {
    const range = get_valid_range(sheet);
    let values = [];
    if (range !== null && maxRange !== null) {
      const newRange = this.adjustRange(range, maxRange.h, maxRange.w);
      values = newRange.getValues();
    }
    return [values, newRange];
  }

  static getSimpleRowsAndRangeX(ss_id, sheet_name, maxRange = null) {
    const [ss, sheet, sheets, sheets_by_name] = get_spreadsheet_ex(ss_id, sheet_name);
    const sheetx = sheets_by_name[sheet_name];
    return this.getSimpleRowsAndRange(sheetx, maxRange);
  }
}
this.Simple = Simple;