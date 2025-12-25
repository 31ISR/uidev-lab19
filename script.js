// У меня по какой-то причине от апишки приходит заглушка NGINX-а, по этому попросил нейронку написать заглушку-замену, и уже с ней работал
async function fetchData() {
    const demoData = [
        {
            "name": "плохохорошо",
            "artists": [{ "name": "iskrit" }, { "name": "ioneweb" }],
            "album": {
                "name": "плохохорошо",
                "images": [{ "url": "https://i.scdn.co/image/ab67616d000048516f51139efce47d2e01da8052" }]
            },
            "duration_ms": 179000,
            "popularity": 30
        },
        {
            "name": "Dance Monkey",
            "artists": [{ "name": "Tones And I" }],
            "album": {
                "name": "The Kids Are Coming",
                "images": [{ "url": "https://i.scdn.co/image/ab67616d00001e02a48964b5d9a3d6968ae3e0de" }]
            },
            "duration_ms": 209000,
            "popularity": 88
        },
        {
            "name": "Blinding Lights",
            "artists": [{ "name": "The Weeknd" }],
            "album": {
                "name": "After Hours",
                "images": [{ "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" }]
            },
            "duration_ms": 200000,
            "popularity": 95
        },
        {
            "name": "Bohemian Rhapsody",
            "artists": [{ "name": "Queen" }],
            "album": {
                "name": "A Night at the Opera",
                "images": [{ "url": "https://ir.ozone.ru/s3/multimedia-e/6827824418.jpg" }]
            },
            "duration_ms": 354000,
            "popularity": 99
        },
        {
            "name": "Billie Jean",
            "artists": [{ "name": "Michael Jackson" }],
            "album": {
                "name": "Thriller",
                "images": [{ "url": "https://i.pinimg.com/736x/df/c5/e3/dfc5e30893073f3bddef3e0f6eebb927.jpg" }]
            },
            "duration_ms": 294000,
            "popularity": 97
        }
    ];
    return demoData;
}

async function renderTracks() {
    const tracks = await fetchData()
    
    const container = document.getElementById("tracksContainer")
    const statsContainer = document.getElementById("statsContainer")

    const totalMs = tracks.reduce((sum, track) => sum + track.duration_ms, 0)
    const minutes = Math.floor(totalMs / 60000)
    const seconds = Math.floor((totalMs % 60000) / 1000)
    
    
    statsContainer.innerHTML = `
        <div class="total-tracks">Треков: ${tracks.length}</div>
        <div class="total-duration">Общая длительность: ${minutes}:${seconds.toString().padStart(2, '0')}</div>
    `
    const html = tracks
        .map(
            (track, index) => `
                <li class="track-item">
                    <div class="track-number">${index + 1}</div>
                    <div class="track-main">
                        <img
                            src="${track.album.images[0].url}"
                            alt="${track.album.name}"
                            class="album-art"
                            loading="lazy"
                        />
                        <div class="track-info">
                            <div class="track-name">${track.name}</div>
                            <div class="track-artists">${track.artists.map(artist => artist.name).join(', ')}</div>
                            <div class="track-album">${track.album.name}</div>
                        </div>
                    </div>
                    <div class="track-meta">
                        <div class="duration">${Math.floor(track.duration_ms / 60000)}:${Math.floor((track.duration_ms % 60000) / 1000).toString().padStart(2, '0')}</div>
                        <div class="popularity">♪ ${track.popularity}</div>
                    </div>
                </li>
            `
        )
        .join("")
    
    container.innerHTML = html
}


document.addEventListener("DOMContentLoaded", renderTracks)



