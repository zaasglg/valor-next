const fs = require('fs');
const path = require('path');

// Создаем простую заглушку для недостающих изображений
const createPlaceholder = (gameName, filename) => {
    const imagesDir = path.join(__dirname, '..', 'public', 'game-images');
    const filePath = path.join(imagesDir, filename);
    
    // Создаем SVG заглушку
    const svgContent = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f0f0f0"/>
  <rect x="10" y="10" width="280" height="180" fill="#e0e0e0" stroke="#ccc" stroke-width="2"/>
  <text x="150" y="90" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#666">
    ${gameName}
  </text>
  <text x="150" y="110" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="#999">
    Image not available
  </text>
</svg>`;
    
    // Сохраняем как SVG файл
    const svgPath = filePath.replace('.jpg', '.svg');
    fs.writeFileSync(svgPath, svgContent);
    
    console.log(`Создана заглушка: ${path.basename(svgPath)}`);
    return svgPath;
};

// Проверяем недостающие изображения
const mappingPath = path.join(__dirname, '..', 'public', 'game-images', 'games-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

const imagesDir = path.join(__dirname, '..', 'public', 'game-images');

mapping.forEach(game => {
    const filePath = path.join(imagesDir, game.filename);
    
    if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
        console.log(`Недостающее изображение: ${game.name}`);
        createPlaceholder(game.name, game.filename);
    }
});

console.log('Проверка завершена!');