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