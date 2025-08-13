const translations = {
    es: {
        mainTitle: 'Mi Pequeña Página',
        mainSubtitle: 'Me aburría e hice esta página...',
        discordStatusTitle: '<br>Estado en Discord',
        aboutMeTitle: 'Sobre Mí',
        aboutMeP1: 'Estudio Ingeniería Informática en la Universidad de XYZ.',
        aboutMeP2: 'También puedes ver lo que estoy escuchando en Spotify.',
        myThingsTitle: 'Mis Cosas',
        cvDesc: 'Curriculum Vitae, para tenerlo a mano.',
        menuDesc: 'Menú para un restaurante ficticio, solo por diversión.',
        photoDesc: 'Ser fotógrafo no es un trabajo.',
        footerText: 'Jason no es un lenguaje de programación legítimo'
    },
    en: {
        mainTitle: 'My Little Page',
        mainSubtitle: 'I was bored and made this page...',
        discordStatusTitle: '<br>Discord Status',
        aboutMeTitle: 'About Me',
        aboutMeP1: 'I study Computer Engineering at XYZ University.',
        aboutMeP2: 'You can also see what I\'m listening to on Spotify.',
        myThingsTitle: 'My Stuff',
        cvDesc: 'Curriculum Vitae, to keep it handy.',
        menuDesc: 'Menu for a fictional restaurant, just for fun.',
        photoDesc: 'Being a photographer is not a job.',
        footerText: 'Jason is not a legitimate programming language'
    }
};

let currentLanguage = 'es';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    const t = translations[currentLanguage];

    document.getElementById('main-title').textContent = t.mainTitle;
    document.getElementById('main-subtitle').innerHTML = t.mainSubtitle;
    document.getElementById('discord-status-title').innerHTML = t.discordStatusTitle;
    document.getElementById('about-me-title').textContent = t.aboutMeTitle;
    document.getElementById('about-me-p1').innerHTML = t.aboutMeP1;
    document.getElementById('about-me-p2').innerHTML = t.aboutMeP2;
    document.getElementById('my-things-title').textContent = t.myThingsTitle;
    document.getElementById('cv-desc').innerHTML = t.cvDesc;
    document.getElementById('menu-desc').innerHTML = t.menuDesc;
    document.getElementById('photo-desc').innerHTML = t.photoDesc;
    document.getElementById('footer-text').textContent = t.footerText;
}
