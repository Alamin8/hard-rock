const searchButton = () => {
    const searchText = document.getElementById('search-text').value
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data)) //data.data means -first data is my aspected response and second data is objects element
}

const displaySongs = songs => {
    const allSongDisplay = document.getElementById('allSongDisplay')
    allSongDisplay.innerHTML = ''
    document.getElementById('get-song-lyrics').innerText=''
    songs.forEach(song => {
        const songDisplay = document.createElement('div')
        songDisplay.className = 'single-result row align-items-center my-3 p-3'
        songDisplay.innerHTML = `
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls
            src="${song.preview}">
        </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button class="btn btn-success" onclick="getLyrics('${song.artist.name}','${song.title}')">Get Lyrics</button>
        </div>
        `
        allSongDisplay.appendChild(songDisplay)
    });
}

const getLyrics= (artist, title)=>{
    const url=`https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then(res =>res.json())
    .then(data=> getSongLyric(data.lyrics))
}

const getSongLyric= lyrics =>{
    document.getElementById('get-song-lyrics').innerText=lyrics;
}