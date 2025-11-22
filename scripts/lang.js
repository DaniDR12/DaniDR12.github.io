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
        menuTitle: 'Menú de Restaurante',
        menuDesc: 'Menú para un restaurante ficticio por si algún día alguno real me contrata para digitalizar el suyo. <br> (Cuidado con el modo oscuro)',
        gasTitle: 'Aplicación Web de Monitoreo de Combustible',
        gasDesc: 'Debido a la nueva moda o tendencia del "vibecoding" me he propuesto crear esta pequeña app, tanto front como back y una pequeña BD, usando exclusivamente IA sin tocar yo nada de código',
        photoTitle: 'Para futuros "proyectos"',
        photoDesc: 'Ser fotógrafo no es un trabajo.',
        grouptaskTitle: 'Group Task',
                grouptaskDesc: 'Aplicación web para la gestión de proyectos, permitiendo la invitación al proyecto a otros usuarios y la incorporación de tareas al mismo.<br>',
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
                menuTitle: 'Restaurant Menu',
                menuDesc: 'Menu for a fictional restaurant, just for fun.',
                gasTitle: 'Fuel Monitoring Web App',
                gasDesc: 'Vibecode',
                photoTitle: 'For Future "Projects"',
                photoDesc: 'Being a photographer is not a job.',
                grouptaskTitle: 'Group Task',
                grouptaskDesc: 'Web application for project management, allowing project invitations and task assignments.<br>',
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
            document.getElementById('menu-title').innerHTML = t.menuTitle;
            document.getElementById('menu-desc').innerHTML = t.menuDesc;
            document.getElementById('photo-title').innerHTML = t.photoTitle;
            document.getElementById('photo-desc').innerHTML = t.photoDesc;
            document.getElementById('gas-title').innerHTML = t.gasTitle;
            document.getElementById('gas-desc').innerHTML = t.gasDesc;
            document.getElementById('grouptask-title').textContent = t.grouptaskTitle;
            document.getElementById('grouptask-desc').innerHTML = t.grouptaskDesc;
            document.getElementById('footer-text').textContent = t.footerText;    

    
}
