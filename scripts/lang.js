const translations = {
    es: {
        mainTitle: 'Mi Pequeña Página',
        mainSubtitle: 'Me aburría e hice esta página en la que puedes ver que estoy haciendo.<br> Si tego el PC encendido y si me apetece que lo veas claro.',
        discordStatusTitle: '<br>Estado en Discord',
        aboutMeTitle: 'Sobre Mí',
        aboutMeP1: 'Estudio Ingeniería Informática, o lo intento. En mi tiempo libre hago cosas como esta página o mato el tiempo en algún jueguito, como estarás viendo arriba. <br> Si estoy ausente o offline, estoy en el gym o haciendome el interesante.',
        aboutMeP2: ' También puedes ver lo que estoy escuchando en Spotify en caso de que seas más cotilla. <br> <br> Por cierto no sé quién es de la foto pero va dura.',
        myThingsTitle: 'Mis Cosas',
        cvDesc: 'Curriculum Vitae, para tenerlo a mano.',
        menuDesc: 'Menú para un restaurante ficticio por si algún día alguno real me contrata para digitalizar el suyo. <br> (Cuidado con el modo oscuro)',
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
