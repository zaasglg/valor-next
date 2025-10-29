const fs = require('fs');
const path = require('path');

// Читаем маппинг изображений
const mappingPath = path.join(__dirname, '..', 'public', 'game-images', 'games-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Читаем файл casino page
const casinoPagePath = path.join(__dirname, '..', 'src', 'app', 'casino', 'page.tsx');
let casinoPageContent = fs.readFileSync(casinoPagePath, 'utf8');

console.log('Обновляем URL изображений в casino page...');

// Создаем маппинг по имени игры
const gameMapping = {};
mapping.forEach(game => {
    gameMapping[game.name] = game.localPath;
});

// Обновляем каждое изображение
let updatedCount = 0;
mapping.forEach(game => {
    const oldUrl = game.originalUrl;
    const newUrl = game.localPath;
    
    if (casinoPageContent.includes(oldUrl)) {
        casinoPageContent = casinoPageContent.replace(oldUrl, newUrl);
        console.log(`✓ Обновлено: ${game.name}`);
        updatedCount++;
    }
});

// Записываем обновленный файл
fs.writeFileSync(casinoPagePath, casinoPageContent);

console.log(`\nОбновление завершено!`);
console.log(`Обновлено изображений: ${updatedCount}`);
console.log(`Всего игр в маппинге: ${mapping.length}`);

// Проверяем, остались ли внешние URL
const remainingExternalUrls = casinoPageContent.match(/https:\/\/valorbetxxl\.top\/cdn-cgi\/imagedelivery/g);
if (remainingExternalUrls) {
    console.log(`\nВнимание: Остались внешние URL: ${remainingExternalUrls.length}`);
} else {
    console.log(`\n✅ Все внешние URL успешно заменены на локальные!`);
}