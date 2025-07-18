/**
 * フォルダ内のファイルを削除するテスト関数
 * 'Frontend Focus'フォルダ内のすべてのファイルを削除する
 */
function test_remove_files_unser_folder() {
  const folder = get_folder_by_key('Frontend Focus');
  remove_files_under_folder(folder);
}
