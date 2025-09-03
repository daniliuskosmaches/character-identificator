const fs = require('fs');
const path = require('path');

// your folder
const IMAGES_DIR = './images';

// check is dir exist
if (!fs.existsSync(IMAGES_DIR)) {
    console.log('❌ Папка images не найдена!');
    console.log('📁 Создайте папку images и положите туда картинки');
    process.exit(1);
}

// read file 
const imageFiles = fs.readdirSync(IMAGES_DIR);

if (imageFiles.length === 0) {
    console.log('В папке images нихуя нет!');
    console.log('не ленись или отьебись');
    process.exit(1);
}

console.log(`📁 изображение : ${imageFiles.length}`);

// character database on this it will generate the new characters
const CHARACTER_DATABASE = {
    'amurika': { name: 'Капитан Америка', desc: 'Капитан Бургера', price: 5000 },
    'tonysrark': { name: 'Железный Человек', desc: 'Гений, миллиардер, плейбой, филантроп', price: 6000 },
    'batgerrl': { name: 'Бэтгерл', desc: 'Отважная героиня Готэма', price: 5500 },
    'minicraftblyat': { name: 'Майнкрафт', desc: 'Тюринг полная игра', price: 4500 },
    'piero': { name: 'Пьеро', desc: 'Дед инсайд с ссср', price: 6500 },
    'ronaldo': { name: 'Футболист', desc: 'Отец роналдо', price: 5000 },
    'garypotter': { name: 'Гарри Поттер', desc: 'Юный волшебник из Хогвартса', price: 6000 },
    'shrek': { name: 'Шрек', desc: 'Кто проживает на дне болота', price: 8000 },
    'superpidor': { name: 'Супермен', desc: 'Лунтик в плаще', price: 5500 },
    'fredy': { name: 'Фредди Фазбер', desc: 'Поиграй с медведем', price: 5500 },
    'belosnezhka': { name: 'Белоснежка', desc: 'Самая добрая принцесса', price: 5500 },
    'halk': { name: 'Халк', desc: 'Зеленный качок', price: 5000 }
};

const charactersData = [];

// reading all files
imageFiles.forEach(imageFile => {
    const filename = path.parse(imageFile).name.toLowerCase();
    console.log(`🔍 Обрабатываю: ${imageFile}`);
    
    // Ищем соответствие в базе данных
    let characterData = null;
    
    for (const [key, data] of Object.entries(CHARACTER_DATABASE)) {
        if (filename.includes(key)) {
            characterData = { ...data };
            break;
        }
    }
    
    // if there is generate
    if (!characterData) {
        const name = generateNameFromFilename(filename);
        characterData = {
            name: name,
            desc: `Описание для ${name}`,
            price: generateRandomPrice(4500, 8000)
        };
        console.log(`   ⚡ Автоопределение: ${name}`);
    } else {
        console.log(`   ✅ Найдено в базе: ${characterData.name}`);
    }
    
    charactersData.push({
        name: characterData.name,
        desc: characterData.desc,
        image: `images/${imageFile}`,
        price: characterData.price
    });
});

// plus function
function generateNameFromFilename(filename) {
    return filename
        .replace(/[^a-zA-Zа-яА-Я]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .trim();
}

function generateRandomPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// saving result in the same directory
const output = `const charactersData = ${JSON.stringify(charactersData, null, 2)};\n\nexport default charactersData;`;
fs.writeFileSync('./charactersData.js', output);

console.log('\n✅ Готово!');
console.log(`📊 Сгенерировано персонажей: ${charactersData.length}`);
console.log('💾 Файл сохранен: charactersData.js');
