// Import required classes
// Code class for code operations

/**
 * 書籍管理に関する機能を提供するクラス
 * スプレッドシートのbookシートの操作、日付フォーマット設定機能を提供する
 * 書籍データの管理と表示形式の調整に特化した機能を実装
 */
class Book {
  /**
   * bookシートのpurchase_date列のフォーマットをyyyy-mm-ddに設定する
   * @param {string} ss_id - スプレッドシートID
   * @throws {Error} Code.setFormatToNamedRowsSheetBySheetnameで無効なスプレッドシートIDまたはシート名でエラーが発生した場合
   */
  static setFormatToNamedRowsSheetBySheetnameX(ss_id) {
    const sheetname = 'book';
    const column_name = 'purchase_date';
    const format = 'yyyy-mm-dd';
    Code.setFormatToNamedRowsSheetBySheetname(ss_id, sheetname, column_name, format);
  }
}
this.Book = Book;
