// Configuración - Reemplaza con tu ID de Discord
const DISCORD_USER_ID = '409474987750326293'; // Ejemplo: '123456789012345678'

// Conectar a la API de Lanyard usando WebSocket para actualizaciones en tiempo real
function connectToLanyard(updateDiscordStatus) {
    const socket = new WebSocket('wss://api.lanyard.rest/socket');

    socket.addEventListener('open', () => {
        console.log('Conectado al WebSocket de Lanyard');
        socket.send(JSON.stringify({
            op: 2,
            d: {
                subscribe_to_id: DISCORD_USER_ID
            }
        }));
    });

    socket.addEventListener('message', ({ data }) => {
        const packet = JSON.parse(data);

        if (packet.t === 'INIT_STATE' || packet.t === 'PRESENCE_UPDATE') {
            updateDiscordStatus(packet.d);
        }
    });

    socket.addEventListener('close', () => {
        console.log('Conexión WebSocket cerrada, reconectando...');
        setTimeout(() => connectToLanyard(updateDiscordStatus), 5000);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const discordUsername = document.getElementById('discord-username');
    const statusBadge = document.getElementById('status-badge');
    const statusText = document.getElementById('status-text');
    const avatarImg = document.getElementById('avatar-img');
    const discordActivity = document.getElementById('discord-activity');
    const activityContent = document.getElementById('activity-content');
    const discordSpotify = document.getElementById('discord-spotify');
    const spotifyContent = document.getElementById('spotify-content');

    // Actualizar la UI con los datos de Discord
    function updateDiscordStatus(data) {
        const user = data.discord_user;
        if (user) {
            discordUsername.textContent = `${user.username}`;
            if (user.avatar) {
                const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=256`;
                avatarImg.src = avatarUrl;
                avatarImg.alt = `Avatar de Discord de ${user.username}`;
            }
        }

        // Estado de conexión
        const status = data.discord_status || 'offline';
        statusBadge.className = 'status-circle ' + status;

        const statusMap = {
            online: 'En línea',
            idle: 'Ausente',
            dnd: 'No molestar',
            offline: 'Desconectado'
        };
        statusText.textContent = statusMap[status] || 'Desconocido';

        // Actividades
        const activities = data.activities || [];
        const spotify = activities.find(a => a.id === 'spotify:1');
        const otherActivities = activities.filter(a => a.id !== 'spotify:1');

        // Spotify
        if (spotify && status === 'online') {
            discordSpotify.classList.remove('hidden');
            spotifyContent.innerHTML = `
                <img src="${spotify.assets.large_image.replace('spotify:', 'https://i.scdn.co/image/')}" 
                    alt="Portada del álbum ${spotify.details} de ${spotify.state}" 
                    class="w-16 h-16 rounded-md">
                <div class="flex-1 pb-1">
                    <div class="font-medium">${spotify.details}</div>
                    <div class="text-sm text-gray-400">${spotify.state}</div>
                    <div class="w-full bg-gray-700 rounded-full h-1.5 mt-2 mb-1">
                        <div class="bg-green-500 h-1.5 rounded-full" 
                            style="width: ${((Date.now() - spotify.timestamps.start) / (spotify.timestamps.end - spotify.timestamps.start) * 100)}%">
                        </div>
                    </div>
                </div>
            `;
        } else {
            discordSpotify.classList.add('hidden');
        }

        // Otras actividades
        if (otherActivities.length > 0) {
            discordActivity.classList.remove('hidden');
            activityContent.innerHTML = otherActivities.map(activity => {
                let iconUrl = '';
                if (activity.assets) {
                    if (activity.assets.large_image) {
                        const largeImage = activity.assets.large_image;
                        if (largeImage.startsWith('mp:external/')) {
                            iconUrl = `https://media.discordapp.net/${largeImage.replace('mp:external/', '')}`;
                        } else {
                            const appId = activity.application_id;
                            iconUrl = `https://cdn.discordapp.com/app-assets/${appId}/${largeImage}.png`;
                        }
                    } else if (activity.application_id) {
                        iconUrl = `https://cdn.discordapp.com/app-icons/${activity.application_id}.png`;
                    }
                }
                return `
                    <div class="flex items-center space-x-3 p-2 bg-gray-800 rounded-lg w-full">
                        ${iconUrl ? `<img src="${iconUrl}" alt="Icono de ${activity.name}" class="w-12 h-12 activity-icon">` : ''}
                        <div>
                            <div class="font-medium">${activity.name}</div>
                            ${activity.details ? `<div class="text-sm text-gray-400">${activity.details}</div>` : ''}
                            ${activity.state ? `<div class="text-xs text-gray-500">${activity.state}</div>` : ''}
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            discordActivity.classList.add('hidden');
        }
    }

    // Cargar estado inicial
    if (!DISCORD_USER_ID) {
        statusText.textContent = 'ID de Discord no configurado';
        return;
    }

    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`)
        .then(res => res.json())
        .then(data => data.success && updateDiscordStatus(data.data))
        .catch(console.error);

    // Conectar WebSocket
    connectToLanyard(updateDiscordStatus);
});
