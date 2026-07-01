// Configuración - ID de Discord (Lanyard)
const DISCORD_USER_ID = '409474987750326293';

function connectToLanyard(updateDiscordStatus) {
    const socket = new WebSocket('wss://api.lanyard.rest/socket');

    socket.addEventListener('open', () => {
        socket.send(JSON.stringify({
            op: 2,
            d: { subscribe_to_id: DISCORD_USER_ID }
        }));
    });

    socket.addEventListener('message', ({ data }) => {
        const packet = JSON.parse(data);
        if (packet.t === 'INIT_STATE' || packet.t === 'PRESENCE_UPDATE') {
            updateDiscordStatus(packet.d);
        }
    });

    socket.addEventListener('close', () => {
        setTimeout(() => connectToLanyard(updateDiscordStatus), 5000);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const discordUsername = document.getElementById('discord-username');
    const statusBadge = document.getElementById('status-badge');
    const statusText = document.getElementById('status-text');
    const statusPill = document.getElementById('status-pill');
    const avatarImg = document.getElementById('avatar-img');
    const discordActivity = document.getElementById('discord-activity');
    const activityContent = document.getElementById('activity-content');
    const discordSpotify = document.getElementById('discord-spotify');
    const spotifyContent = document.getElementById('spotify-content');

    if (!discordUsername) return;

    function updateDiscordStatus(data) {
        const user = data.discord_user;
        if (user) {
            discordUsername.textContent = user.username;
            if (user.avatar) {
                const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
                avatarImg.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
                avatarImg.alt = `Avatar de Discord de ${user.username}`;
            }
        }

        const status = data.discord_status || 'offline';
        statusBadge.className = 'status-circle ' + status;

        const statusMap = {
            online: 'En línea',
            idle: 'Ausente',
            dnd: 'No molestar',
            offline: 'Desconectado'
        };
        statusText.textContent = statusMap[status] || 'Desconocido';
        if (statusPill) statusPill.textContent = `● ${statusMap[status] || 'desconocido'}`;

        const activities = data.activities || [];
        const spotify = activities.find(a => a.id === 'spotify:1');
        const otherActivities = activities.filter(a => a.id !== 'spotify:1' && a.type !== 4);

        if (spotify && status !== 'offline') {
            discordSpotify.classList.remove('hidden');
            const pct = Math.min(100, Math.max(0,
                (Date.now() - spotify.timestamps.start) / (spotify.timestamps.end - spotify.timestamps.start) * 100));
            spotifyContent.innerHTML = `
                <img src="${spotify.assets.large_image.replace('spotify:', 'https://i.scdn.co/image/')}"
                    alt="Portada del álbum ${spotify.details} de ${spotify.state}"
                    style="width:56px;height:56px;border-radius:6px;object-fit:cover;flex-shrink:0;">
                <div style="flex:1;min-width:0;">
                    <div style="font-weight:600;font-size:14px;">${spotify.details}</div>
                    <div style="font-size:12.5px;color:var(--text-dim);">${spotify.state}</div>
                    <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
                </div>
            `;
        } else {
            discordSpotify.classList.add('hidden');
        }

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
                            iconUrl = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${largeImage}.png`;
                        }
                    } else if (activity.application_id) {
                        iconUrl = `https://cdn.discordapp.com/app-icons/${activity.application_id}.png`;
                    }
                }
                return `
                    <div style="display:flex;align-items:center;gap:12px;">
                        ${iconUrl ? `<img src="${iconUrl}" alt="Icono de ${activity.name}" class="activity-icon" style="width:48px;height:48px;">` : ''}
                        <div>
                            <div style="font-weight:600;font-size:14px;">${activity.name}</div>
                            ${activity.details ? `<div style="font-size:12.5px;color:var(--text-dim);">${activity.details}</div>` : ''}
                            ${activity.state ? `<div style="font-size:11.5px;color:var(--text-faint);">${activity.state}</div>` : ''}
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            discordActivity.classList.add('hidden');
        }
    }

    if (!DISCORD_USER_ID) {
        statusText.textContent = 'ID de Discord no configurado';
        return;
    }

    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`)
        .then(res => res.json())
        .then(data => data.success && updateDiscordStatus(data.data))
        .catch(() => { statusText.textContent = 'No se pudo conectar'; });

    connectToLanyard(updateDiscordStatus);
});
