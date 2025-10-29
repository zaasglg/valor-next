const fs = require('fs');
const path = require('path');

console.log('🔍 Проверка изображений во всех файлах...\n');

// Проверяем наличие всех изображений
const imagesDir = path.join(__dirname, '..', 'public', 'game-images');
const mappingPath = path.join(imagesDir, 'games-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

console.log('📁 Проверка файлов изображений:');
let missingImages = 0;
mapping.forEach(game => {
    const imagePath = path.join(imagesDir, game.filename);
    const svgPath = imagePath.replace('.jpg', '.svg');
    
    if (fs.existsSync(imagePath)) {
        const stats = fs.statSync(imagePath);
        if (stats.size > 0) {
            console.log(`✅ ${game.filename} (${Math.round(stats.size / 1024)} KB)`);
        } else {
            console.log(`⚠️  ${game.filename} (0 KB - пустой файл)`);
            missingImages++;
        }
    } else if (fs.existsSync(svgPath)) {
        console.log(`✅ ${game.filename.replace('.jpg', '.svg')} (SVG заглушка)`);
    } else {
        console.log(`❌ ${game.filename} (отсутствует)`);
        missingImages++;
    }
});

console.log(`\n📊 Статистика изображений:`);
console.log(`   Всего игр: ${mapping.length}`);
console.log(`   Доступных изображений: ${mapping.length - missingImages}`);
console.log(`   Отсутствующих: ${missingImages}`);

// Проверяем использование в файлах
const filesToCheck = [
    'src/app/casino/page.tsx',
    'src/app/live/page.tsx', 
    'src/app/all_games/page.tsx'
];

console.log('\n🔗 Проверка ссылок в файлах:');
filesToCheck.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    
    if (!fs.existsSync(fullPath)) {
        console.log(`❌ ${filePath} - файл не найден`);
        return;
    }
    
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Проверяем наличие внешних URL
    const externalUrls = content.match(/https:\/\/valorbetxxl\.top\/cdn-cgi\/imagedelivery/g);
    const localPaths = content.match(/\/game-images\/[^"]+/g);
    
    if (externalUrls) {
        console.log(`⚠️  ${filePath} - найдено ${externalUrls.length} внешних URL`);
    } else {
        console.log(`✅ ${filePath} - все URL локальные`);
    }
    
    if (localPaths) {
        console.log(`   📷 Найдено ${localPaths.length} локальных изображений`);
    }
});

console.log('\n🎯 Проверка завершена!');

if (missingImages === 0) {
    console.log('🎉 Все изображения на месте!');
} else {
    console.log(`⚠️  Внимание: ${missingImages} изображений отсутствует`);
}