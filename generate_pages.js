const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

// Завантаження шаблону
const template = fs.readFileSync('templates/restaurant_template.html', 'utf-8');

// Читання CSV-файлу
const csvFile = fs.readFileSync('data/Restaurants.csv', 'utf-8');

Papa.parse(csvFile, {
    header: true,
    complete: function (results) {
        const restaurants = results.data;
        generatePages(restaurants);
    }
});

function generatePages(restaurants) {
    restaurants.forEach(restaurant => {
        let pageContent = template;
        Object.keys(restaurant).forEach(key => {
            const placeholder = `{{${key}}}`;
            const value = restaurant[key];
            pageContent = pageContent.replace(new RegExp(placeholder, 'g'), value);
        });

        const outputPath = path.join(__dirname, 'restaurants', `restaurant_${restaurant.Google_ID}.html`);
        fs.writeFileSync(outputPath, pageContent);
    });
}
