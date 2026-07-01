// ============================================================
// dani@portfolio — interactive terminal
// Boot sequence + real command handling (navigation, easter eggs)
// ============================================================

(function () {
    const bootLines = [
        { text: 'Booting dani-os v2.6.0...', cls: 'muted', delay: 15 },
        { text: '[  OK  ] Mounting /home/dani', cls: 'ok', delay: 12 },
        { text: '[  OK  ] Starting proxmox-vm-manager.service', cls: 'ok', delay: 12 },
        { text: '[  OK  ] Starting docker.service', cls: 'ok', delay: 12 },
        { text: '[  OK  ] Starting freqtrade-bot.service (dry-run)', cls: 'ok', delay: 12 },
        { text: '[ WARN ] tailscale0: reconnecting mesh peers...', cls: 'warn', delay: 10 },
        { text: '[  OK  ] tailscale0: connected (3 peers)', cls: 'ok', delay: 10 },
        { text: '', cls: '', delay: 4 },
        { text: 'Bienvenido. Escribe "help" para ver los comandos disponibles.', cls: 'accent', delay: 8 },
    ];

    const commands = {
        help: () => [
            { text: 'Comandos disponibles:', cls: 'accent' },
            { text: '  whoami        — quién soy', cls: 'muted' },
            { text: '  about         — ir a la sección "Sobre mí"', cls: 'muted' },
            { text: '  ls projects   — listar proyectos', cls: 'muted' },
            { text: '  cat cv.txt    — abrir el CV', cls: 'muted' },
            { text: '  status        — ver estado en vivo (Discord/Spotify)', cls: 'muted' },
            { text: '  contact       — ir a contacto', cls: 'muted' },
            { text: '  clear         — limpiar la terminal', cls: 'muted' },
            { text: '  sudo su       — inténtalo...', cls: 'muted' },
        ],
        whoami: () => [
            { text: 'dani — estudiante de Ingeniería Informática', cls: 'accent' },
            { text: 'especialidad: infraestructura, automatización y seguridad', cls: 'text' },
            { text: 'ubicación: España · disponible para Erasmus, otoño 2026', cls: 'muted' },
        ],
        about: () => (scrollToId('about'), [{ text: 'Navegando a #about...', cls: 'ok' }]),
        contact: () => (scrollToId('contact'), [{ text: 'Navegando a #contact...', cls: 'ok' }]),
        status: () => (scrollToId('status'), [{ text: 'Navegando a #status...', cls: 'ok' }]),
        projects: () => (scrollToId('projects'), [{ text: 'Navegando a #projects...', cls: 'ok' }]),
        'ls': (args) => {
            if (args[0] === 'projects' || !args.length) {
                scrollToId('projects');
                return [
                    { text: 'cv.pdf  fuel-monitor/  group-task/  menu-app/', cls: 'alt' },
                    { text: 'Navegando a #projects...', cls: 'ok' },
                ];
            }
            return [{ text: `ls: no se puede acceder a '${args.join(' ')}': No existe el archivo o directorio`, cls: 'warn' }];
        },
        cat: (args) => {
            const target = args.join(' ');
            if (target === 'cv.txt' || target === 'cv') {
                window.open('./docs/cv.pdf', '_blank');
                return [{ text: 'Abriendo cv.pdf...', cls: 'ok' }];
            }
            if (target === 'about.txt' || target === 'about') {
                scrollToId('about');
                return [{ text: 'Navegando a #about...', cls: 'ok' }];
            }
            return [{ text: `cat: ${target || '(vacío)'}: No existe el archivo o directorio`, cls: 'warn' }];
        },
        clear: () => 'CLEAR',
        'sudo': (args) => {
            if (args.join(' ') === 'su') {
                return [
                    { text: '[sudo] password for dani: ', cls: 'muted' },
                    { text: 'dani no está en el archivo sudoers. Este incidente será reportado. (no, no es verdad)', cls: 'warn' },
                ];
            }
            return [{ text: `sudo: ${args.join(' ')}: orden no encontrada`, cls: 'warn' }];
        },
        matrix: () => {
            document.body.classList.toggle('matrix-flash');
            return [{ text: 'wake up, dani...', cls: 'accent' }];
        },
    };

    function scrollToId(id) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function el(tag, cls, text) {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        if (text !== undefined) e.textContent = text;
        return e;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const body = document.getElementById('term-body');
        const input = document.getElementById('term-input');
        if (!body || !input) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function printLine(line) {
            const p = document.createElement('p');
            p.className = 'term-line';
            if (line.cls) {
                const span = document.createElement('span');
                span.className = line.cls;
                span.textContent = line.text;
                p.appendChild(span);
            } else {
                p.textContent = line.text;
            }
            body.appendChild(p);
            body.scrollTop = body.scrollHeight;
        }

        function runBoot(lines, cb) {
            if (prefersReducedMotion) {
                lines.forEach(printLine);
                cb && cb();
                return;
            }
            let i = 0;
            function next() {
                if (i >= lines.length) { cb && cb(); return; }
                printLine(lines[i]);
                i++;
                setTimeout(next, lines[i - 1] ? lines[i - 1].delay * 10 : 10);
            }
            next();
        }

        runBoot(bootLines, () => input.focus());

        const history = [];
        let historyIndex = -1;

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const raw = input.value.trim();
                if (!raw) return;
                printLine({ text: `dani@portfolio:~$ ${raw}`, cls: 'text' });
                history.unshift(raw);
                historyIndex = -1;
                input.value = '';

                const parts = raw.split(/\s+/);
                const cmd = parts[0].toLowerCase();
                const args = parts.slice(1);

                if (cmd === 'clear') {
                    body.innerHTML = '';
                    return;
                }

                if (commands[cmd]) {
                    const result = commands[cmd](args);
                    if (Array.isArray(result)) result.forEach(printLine);
                } else {
                    printLine({ text: `bash: ${cmd}: orden no encontrada. Escribe "help".`, cls: 'warn' });
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (history.length === 0) return;
                historyIndex = Math.min(historyIndex + 1, history.length - 1);
                input.value = history[historyIndex] || '';
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                historyIndex = Math.max(historyIndex - 1, -1);
                input.value = historyIndex === -1 ? '' : history[historyIndex];
            } else if (e.key === 'Tab') {
                e.preventDefault();
                const partial = input.value.toLowerCase();
                const match = Object.keys(commands).find(c => c.startsWith(partial));
                if (match) input.value = match;
            }
        });

        // clicking anywhere in the terminal focuses the input
        document.getElementById('terminal').addEventListener('click', () => input.focus());
    });
})();
