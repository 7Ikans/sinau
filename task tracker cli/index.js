const fs = require("fs");
const filepath = './tasks.json';

const command = process.argv[2]; 
const argument = process.argv[3]; 

// Fungsi Load
const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filepath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

// Fungsi Save
const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(filepath, dataJSON);
}

// --- LOGIKA UTAMA ---

if (command === 'add') {
    const tasks = loadTasks();
    const newTask = {
        id: tasks.length + 1,
        description: argument,
        status: 'todo',
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Sukses! Tugas "${argument}" ditambahkan (ID: ${newTask.id})`);

} else if (command === 'list') {
    const tasks = loadTasks();
    console.log("--- DAFTAR TUGAS ---");
    tasks.forEach(task => {
        const symbol = task.status === 'done' ? '[v]' : '[ ]';
        console.log(`${symbol} ID:${task.id} - ${task.description}`);
    });

} else if (command === 'done') {
    const tasks = loadTasks();
    const idDicari = parseInt(argument); 
    const task = tasks.find(t => t.id === idDicari);

    if (task) {
        task.status = 'done'; 
        saveTasks(tasks);     
        console.log(`Done masseh! Tugas ID ${idDicari} telah selesai.`);
    } else {
        console.log(`Tugas dengan ID ${idDicari} tidak ditemukan.`);
    }

} else if (command === 'delete') {
    const tasks = loadTasks();
    const idDicari = parseInt(argument);
    const sisaTugas = tasks.filter(t => t.id !== idDicari);

    if (tasks.length > sisaTugas.length) { 
        saveTasks(sisaTugas);
        console.log(`Tugas ID ${idDicari} berhasil dihapus.`);
    } else {
        console.log(`Gagal hapus. ID ${idDicari} tidak ditemukan.`);
    }

} else {
    console.log("Perintah salah! Gunakan: add, list, done, atau delete");
}