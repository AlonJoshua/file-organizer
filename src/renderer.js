const fs = window.myAPI.fs;

function filesOrganizer() {
    console.log('test')
}

function createDir() {
    const filesInput = document.getElementById('files')
    const folderName = '/users/alonjoshua/desktop/image-organizer';

    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
    } catch (err) {
        console.error(err);
    }
    [...filesInput.files].forEach(file => {
        const fileDate = new Date(fs.statSync(file.path).birthtimeMs);
        const fileMonth = fileDate.toLocaleString('default', { month: 'long' });
        console.log(folderName);

        // get file year
        // check if year exists in the folder
        // if not, create, else enter that folder
        // check if month is exists in the year folder
        // if not, create, else enter that folder
        // check which week is in that month, (week folder name should be like "03/02 - 10/02")
        // if week folder not exists, create, else enter that folder
        // create the file

        // try {
        //     fs.copyFile(file.path, `${folderName}/${file.name}`, (error) => {
        //        console.log(error); 
        //     })
        //     console.log('success!')
        // } catch (err) {
        //     console.error(err)
        // }
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