document.querySelectorAll('.team-member').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.member-info').style.transform = 'translateY(0)';
        item.querySelector('img').style.transform = 'translateY(-20%)';
    });

    item.addEventListener('mouseleave', () => {
        item.querySelector('.member-info').style.transform = 'translateY(100%)';
        item.querySelector('img').style.transform = 'translateY(0)';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const photo = document.getElementById('photo');

    // Зміна зображення після завершення анімації
    photo.addEventListener('animationend', function() {
        // Замість 'path/to/empty/screen.jpg' вкажіть шлях до зображення порожнього екрану
        photo.src = 'Photo/Picture 1.svg';
    });
});
