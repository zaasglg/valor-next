const fs = require('fs');
const path = require('path');

// Читаем маппинг изображений
const mappingPath = path.join(__dirname, '..', 'public', 'game-images', 'games-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Создаем маппинг по имени игры
const gameMapping = {};
mapping.forEach(game => {
    gameMapping[game.name] = game.localPath;
});

// Список файлов для обновления
const filesToUpdate = [
    'src/app/casino/page.tsx',
    'src/app/live/page.tsx',
    'src/app/all_games/page.tsx'
];

console.log('Обновляем URL изображений во всех страницах...');

filesToUpdate.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    
    if (!fs.existsSync(fullPath)) {
        console.log(`⚠️  Файл не найден: ${filePath}`);
        return;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    let updatedCount = 0;
    
    // Обновляем каждое изображение
    mapping.forEach(game => {
        const oldUrl = game.originalUrl;
        const newUrl = game.localPath;
        
        if (content.includes(oldUrl)) {
            content = content.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
            updatedCount++;
        }
    });
    
    // Записываем обновленный файл
    fs.writeFileSync(fullPath, content);
    
    console.log(`✓ ${filePath}: обновлено ${updatedCount} изображений`);
});

console.log('\nОбновление всех страниц завершено!');