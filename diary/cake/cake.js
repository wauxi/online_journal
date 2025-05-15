const showCake = () => {
    document.querySelector('#cake-holder').classList.add('done');

    const birthdayText = document.querySelector('#birthday-text');
    if (birthdayText) {
        birthdayText.classList.add('visible');
        birthdayText.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}