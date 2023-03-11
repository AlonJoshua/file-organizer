const fs = window.myAPI.fs;

document.addEventListener('DOMContentLoaded', () => {
    const submitOrganizer = document.getElementById('submit-organizer');
    submitOrganizer.addEventListener('click', createDir);
})

function createDir() {
    const filesInput = document.getElementById('files')
    const mainFolderPath = '/users/alonjoshua/desktop/image-organizer';
    try {
        if (!fs.existsSync(mainFolderPath)) {
            fs.mkdirSync(mainFolderPath);
        }
    } catch (err) {
        console.error(err);
    }
    [...filesInput.files].forEach(file => {
        const fileDate = new Date(fs.statSync(file.path).birthtimeMs);
        const yearFolderPath = `${mainFolderPath}/${fileDate.getFullYear()}`;
        if (!fs.existsSync(yearFolderPath)) {
            fs.mkdirSync(yearFolderPath);
        }
        const monthFolderPath = `${yearFolderPath}/${fileDate.toLocaleString('default', { month: 'long' })}`;
        if (!fs.existsSync(monthFolderPath)) {
            fs.mkdirSync(monthFolderPath);
        }
        const weekFolderPath = `${monthFolderPath}/week ${Math.ceil((fileDate.getDate()) / 7)}`;
        if (!fs.existsSync(weekFolderPath)) {
            fs.mkdirSync(weekFolderPath);
        }

        try {
            fs.copyFile(file.path, `${weekFolderPath}/${file.name}`, (error) => {
               console.log(error); 
            })
            console.log('success!')
        } catch (err) {
            console.error(err)
        }
    });
}