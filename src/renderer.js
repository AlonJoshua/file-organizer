const fs = window.myAPI.fs;

document.addEventListener('DOMContentLoaded', () => {
  const submitOrganizer = document.getElementById('submit-organizer');
  submitOrganizer.addEventListener('click', createDir);
});

function createDir() {
  const filesInput = document.getElementById('files');
  const mainFolderPath = '/users/alonjoshua/desktop/file-organizer';
  
  try {
    if (!fs.existsSync(mainFolderPath)) {
      fs.mkdirSync(mainFolderPath);
    }
  } catch (err) {
    console.error(err);
    return;
  }

  for (const file of filesInput.files) {
    const fileDate = new Date(fs.statSync(file.path).birthtimeMs);
    const yearFolderPath = `${mainFolderPath}/${fileDate.getFullYear()}`;
    createFolderIfNotExists(yearFolderPath);
    
    const monthFolderPath = `${yearFolderPath}/${fileDate.toLocaleString('default', { month: 'long' })}`;
    createFolderIfNotExists(monthFolderPath);

    const weekFolderPath = `${monthFolderPath}/week ${Math.ceil(fileDate.getDate() / 7)}`;
    createFolderIfNotExists(weekFolderPath);

    copyFile(file, weekFolderPath);
  }
}

function createFolderIfNotExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
}

function copyFile(file, folderPath) {
  const fileName = file.name;
  const filePath = file.path;
  const targetPath = `${folderPath}/${fileName}`;

  try {
    fs.copyFile(filePath, targetPath, (error) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`File ${fileName} was copied to ${targetPath}`);
    });
  } catch (err) {
    console.error(err);
  }
}
