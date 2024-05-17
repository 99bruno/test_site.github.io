const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

// Завантаження шаблону
const template = fs.readFileSync('templates/events_template.html', 'utf-8');

// Читання CSV-файлу
const csvFile = fs.readFileSync('data/Events.csv', 'utf-8');

Papa.parse(csvFile, {
    header: true,
    complete: function (results) {
        const events = results.data;
        generatePages(events);
    }
});

function generatePages(events) {
    events.forEach(event => {
        let pageContent = template;
        Object.keys(event).forEach(key => {
            const placeholder = `{{${key}}}`;
            const value = event[key];
            pageContent = pageContent.replace(new RegExp(placeholder, 'g'), value);
        });

        const outputPath = path.join(__dirname, 'events', `event_${event.Name}.html`);
        fs.writeFileSync(outputPath, pageContent);
    });
}
