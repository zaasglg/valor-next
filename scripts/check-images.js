const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'game-images');
const files = fs.readdirSync(imagesDir).filter(file => file.endsWith('.jpg'));

console.log(`Проверка ${files.length} изображений...`);
console.log('');

let totalSize = 0;
let minSize = Infinity;
let maxSize = 0;
let minFile = '';
let maxFile = '';

files.forEach(file => {
    const filePath = path.join(imagesDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = Math.round(stats.size / 1024);
    
    totalSize += stats.size;
    
    if (stats.size < minSize) {
        minSize = stats.size;
        minFile = file;
    }
    
    if (stats.size > maxSize) {
        maxSize = stats.size;
        maxFile = file;
    }
    
    console.log(`${file.padEnd(35)} ${sizeKB.toString().padStart(4)} KB`);
});

console.log('');
console.log('='.repeat(50));
console.log(`Общий размер: ${Math.round(totalSize / 1024 / 1024 * 100) / 100} MB`);
console.log(`Средний размер: ${Math.round(totalSize / files.length / 1024)} KB`);
console.log(`Самый маленький: ${minFile} (${Math.round(minSize / 1024)} KB)`);
console.log(`Самый большой: ${maxFile} (${Math.round(maxSize / 1024)} KB)`);
console.log(`Всего файлов: ${files.length}`);