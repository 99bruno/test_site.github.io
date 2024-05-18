const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

// Завантаження шаблону
const template = fs.readFileSync('templates/restaurant_template.html', 'utf-8');

// Читання CSV-файлів
const restaurantsCsvFile = fs.readFileSync('data/Restaurants.csv', 'utf-8');
const menuCsvFile = fs.readFileSync('data/Menu.csv', 'utf-8');

let restaurants = [];
let menus = [];
let idCounter = 0; // Лічильник ID

// Парсинг файлів CSV
Papa.parse(restaurantsCsvFile, {
    header: true,
    complete: function (results) {
        restaurants = results.data;
        if (menus.length > 0) {
            generatePages(restaurants, menus);
        }
    }
});

Papa.parse(menuCsvFile, {
    header: true,
    complete: function (results) {
        menus = results.data;
        if (restaurants.length > 0) {
            generatePages(restaurants, menus);
        }
    }
});

function generatePages(restaurants, menus) {
    for (let i = 0; i < restaurants.length; i++) {
        const restaurant = restaurants[i];
        let pageContent = template;

        // Додавання ID та збільшення лічильника
        restaurant.id = idCounter++;

        const imageSrc = `../Photos/${restaurant.id}.png`;
        pageContent = pageContent.replace('<a href="../restaurants.html" class="back-link">← Повернутись до ресторанів</a>', `<a href="../restaurants.html" class="back-link">← Повернутись до ресторанів</a><img src="${imageSrc}" alt="Restaurant Image">`);


        // Заміна плейсхолдерів в шаблоні на дані з ресторану
        Object.keys(restaurant).forEach(key => {
            const placeholder = `{{${key}}}`;
            const value = restaurant[key];
            pageContent = pageContent.replace(new RegExp(placeholder, 'g'), value);
        });

        // Фільтрування меню для поточного ресторану
        const restaurantMenus = menus.filter(menu => menu.ID_Rest === `${restaurant.id}`);
        // Додаємо інформацію про меню до сторінки
        let menuContent = '<h2 style="font-family: Montserrat">Меню</h2>';
        // console.log(restaurantMenus);
        restaurantMenus.forEach(menu => {
            menuContent += `
                <p style="font-family: Montserrat"><strong>Позиція:</strong> ${menu.Name}</p>
                <p style="font-family: Montserrat"><strong>Опис:</strong> ${menu.Description}</p>
                <p style="font-family: Montserrat"><strong>Ціна:</strong> ${menu.Price}</p>
                <p style="font-family: Montserrat"><strong>Тип:</strong> ${menu.Category}</p>
                <hr>`;
        });

        // Додаємо блок меню до сторінки
        pageContent = pageContent.replace('<!-- Додано блок для виведення інформації про меню --></div>', `${menuContent}</div>`);

        // Запис згенерованого HTML у файл
        const outputPath = path.join(__dirname, 'restaurants', `restaurant_${restaurant.Google_ID}.html`);
        fs.writeFileSync(outputPath, pageContent);
    }
}
