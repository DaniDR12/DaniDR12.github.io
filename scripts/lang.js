const translations = {
    es: {
        heroKicker: 'DISPONIBLE PARA PRÁCTICAS / ERASMUS · OTOÑO 2026',
        heroTitle: 'Construyo y aseguro<br>infraestructura <span class="hl">de verdad</span>.',
        heroSub: 'Estudiante de Ingeniería Informática enfocado en administración de sistemas, automatización y seguridad. Fuera de clase, gestiono mi propio homelab, entreno modelos de trading algorítmico y aprendo a romper (y proteger) las cosas que construyo.',
        ctaCv: 'Descargar CV',
        ctaContact: 'Contacto',
        ctaCv2: 'CV',
        statusTitle: 'Estado en tiempo real',
        activityLabel: 'ACTUALMENTE',
        spotifyLabel: 'ESCUCHANDO EN SPOTIFY',
        aboutTitle: 'Sobre mí',
        aboutP1: '<strong>Estudio Ingeniería Informática</strong> y dedico buena parte de mi tiempo libre a levantar y mantener infraestructura propia: un homelab con Proxmox, contenedores Docker, monitorización (Grafana, Prometheus, Uptime Kuma) y una VPN mesh con Tailscale para acceder a todo desde cualquier sitio.',
        aboutP2: 'También desarrollo un <strong>bot de trading algorítmico</strong> sobre Freqtrade con modelos propios de machine learning (LightGBM), y me interesa cada vez más el lado ofensivo y defensivo de la seguridad: redes, hardening de servicios expuestos y buenas prácticas de despliegue.',
        aboutP3: 'Cómodo trabajando en Linux, Docker Compose, Windows y macOS. Si el estado de arriba marca "ausente", probablemente esté en el gimnasio o depurando algo que rompí yo mismo.',
        stackInfra: 'Infraestructura & Self-Hosting',
        stackDev: 'Desarrollo & Automatización',
        stackSec: 'Seguridad (en progreso)',
        projectsTitle: 'Proyectos',
        cvTitle: 'Curriculum Vitae',
        cvDesc: 'Formación, proyectos y experiencia, siempre a mano y actualizado.',
        cvLink: '$ ./open →',
        gasTitle: 'Monitor de Consumo de Combustible',
        gasDesc: 'Aplicación web full-stack (frontend, backend y base de datos) construida íntegramente con IA como ejercicio de "vibecoding" — puesta a prueba deliberada del enfoque.',
        gasLink: '$ ./deploy →',
        grouptaskTitle: 'Group Task',
        grouptaskDesc: 'Gestor de proyectos colaborativo: invitación de usuarios, asignación de tareas y seguimiento de progreso en equipo.',
        grouptaskLink: '$ ./deploy →',
        menuTitle: 'Menú Digital de Restaurante',
        menuDesc: 'Maqueta de digitalización de carta para un restaurante ficticio, con soporte de modo oscuro — pensada como muestra reutilizable para clientes reales.',
        menuLink: '$ ./open →',
        contactTitle: 'Hablemos',
        contactSub: '¿Prácticas, colaboración o simplemente hablar de infraestructura? Escríbeme.',
        footerText: '© 2026 dani · construido a mano, desplegado con GitHub Pages',
    },
    en: {
        heroKicker: 'OPEN TO INTERNSHIPS / ERASMUS · FALL 2026',
        heroTitle: 'I build and secure<br>infrastructure <span class="hl">for real</span>.',
        heroSub: 'Computer Engineering student focused on systems administration, automation and security. Outside class, I run my own homelab, train algorithmic trading models, and learn to break (and protect) the things I build.',
        ctaCv: 'Download CV',
        ctaContact: 'Contact',
        ctaCv2: 'CV',
        statusTitle: 'Live status',
        activityLabel: 'CURRENTLY',
        spotifyLabel: 'LISTENING ON SPOTIFY',
        aboutTitle: 'About me',
        aboutP1: '<strong>I study Computer Engineering</strong> and spend a good chunk of my free time building and maintaining my own infrastructure: a homelab running Proxmox, Docker containers, monitoring (Grafana, Prometheus, Uptime Kuma) and a Tailscale mesh VPN to reach everything from anywhere.',
        aboutP2: 'I also run an <strong>algorithmic trading bot</strong> on Freqtrade with my own machine learning models (LightGBM), and I\'m increasingly interested in both the offensive and defensive sides of security: networking, hardening exposed services, and secure deployment practices.',
        aboutP3: 'Comfortable across Linux, Docker Compose, Windows and macOS. If the status above says "idle", I\'m probably at the gym or debugging something I broke myself.',
        stackInfra: 'Infrastructure & Self-Hosting',
        stackDev: 'Development & Automation',
        stackSec: 'Security (in progress)',
        projectsTitle: 'Projects',
        cvTitle: 'Curriculum Vitae',
        cvDesc: 'Background, projects and experience, always up to date and on hand.',
        cvLink: '$ ./open →',
        gasTitle: 'Fuel Consumption Monitor',
        gasDesc: 'Full-stack web app (frontend, backend and database) built entirely with AI as a deliberate "vibecoding" stress test.',
        gasLink: '$ ./deploy →',
        grouptaskTitle: 'Group Task',
        grouptaskDesc: 'Collaborative project manager: invite teammates, assign tasks and track progress as a group.',
        grouptaskLink: '$ ./deploy →',
        menuTitle: 'Digital Restaurant Menu',
        menuDesc: 'Menu digitization mockup for a fictional restaurant, with dark mode support — built as a reusable sample for real clients.',
        menuLink: '$ ./open →',
        contactTitle: "Let's talk",
        contactSub: 'Internships, collaboration, or just want to talk infrastructure? Reach out.',
        footerText: '© 2026 dani · built by hand, deployed on GitHub Pages',
    }
};

let currentLanguage = 'es';

// Helpers defensivos: si un id no existe en el DOM, avisan en consola
// en vez de lanzar un error que corte el resto de la función a mitad.
function setText(id, value) {
    const node = document.getElementById(id);
    if (!node) { console.warn(`[lang.js] No existe #${id} en el DOM`); return; }
    node.textContent = value;
}
function setHTML(id, value) {
    const node = document.getElementById(id);
    if (!node) { console.warn(`[lang.js] No existe #${id} en el DOM`); return; }
    node.innerHTML = value;
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    document.documentElement.lang = currentLanguage;
    const t = translations[currentLanguage];

    const btn = document.getElementById('lang-toggle-btn');
    if (btn) btn.textContent = currentLanguage === 'es' ? 'EN' : 'ES';

    setText('hero-kicker', t.heroKicker);
    setHTML('hero-title', t.heroTitle);
    setText('hero-sub', t.heroSub);
    setText('cta-cv', t.ctaCv);
    setText('cta-contact', t.ctaContact);
    setText('cta-cv-2', t.ctaCv2);

    setText('status-title', t.statusTitle);
    setText('activity-label', t.activityLabel);
    setText('spotify-label', t.spotifyLabel);

    setText('about-title', t.aboutTitle);
    setHTML('about-p1', t.aboutP1);
    setHTML('about-p2', t.aboutP2);
    setHTML('about-p3', t.aboutP3);
    setText('stack-infra', t.stackInfra);
    setText('stack-dev', t.stackDev);
    setText('stack-sec', t.stackSec);

    setText('projects-title', t.projectsTitle);
    setText('cv-title', t.cvTitle);
    setText('cv-desc', t.cvDesc);
    setText('cv-link', t.cvLink);
    setText('gas-title', t.gasTitle);
    setText('gas-desc', t.gasDesc);
    setText('gas-link', t.gasLink);
    setText('grouptask-title', t.grouptaskTitle);
    setText('grouptask-desc', t.grouptaskDesc);
    setText('grouptask-link', t.grouptaskLink);
    setText('menu-title', t.menuTitle);
    setText('menu-desc', t.menuDesc);
    setText('menu-link', t.menuLink);

    setText('contact-title', t.contactTitle);
    setText('contact-sub', t.contactSub);
    setText('footer-text', t.footerText);
}

// Confirma en consola que el script se ha cargado correctamente.
console.log('[lang.js] cargado correctamente — botón de idioma listo.');