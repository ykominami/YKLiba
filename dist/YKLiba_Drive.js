function get_folder(folder_id) {
  return DriveApp.getFolderById(folder_id);
}

function create_file(folder, name, content) {
  folder.createFile(name, content);
}

function get_file(folder, name) {
  Log.debug(`folder=${folder}`);
  files = folder.getFilesByName(name);
  while (files.hasNext()) {
    const file = files.next();
    Log.debug(file.getName());
    Log.debug(file.getId());
    return file;
  }
  return null;
}

function remove_files_under_folder(folder) {
  files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    file.setTrashed(true);
  }
  return true;
}

function clear_sheet(sheet) {
  const lastRow = sheet.getLastRow();
  if( lastRow > 1 ){
    sheet.deleteRows(1, lastRow);
  }
}
