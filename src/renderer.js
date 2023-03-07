const fs = window.myAPI.fs;

function filesOrganizer() {
    console.log('test')
}

function createDir() {
    const filesInput = document.getElementById('files')
    // console.log(filesInput.files)
    const folderName = '/users/alonjoshua/desktop/image-organizer';

    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
    } catch (err) {
        console.error(err);
    }
    [...filesInput.files].forEach(file => {
        console.log(file.path);
        try {
            fs.copyFile(file.path, folderName, { overwrite: true })
            console.log('success!')
          } catch (err) {
            console.error(err)
          }
    });
    // fs.readdir(filesInput, (err, files) => {
    //     if (err) {
    //         console.error(err)
    //         return
    //     }
        
    // }) 
}

// async function getDir() {
//     const dirHandle = await window.showDirectoryPicker();
//     console.log(dirHandle.getDirectoryHandle());
    // run code for dirHandle
//   }