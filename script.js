///Referêcias do HTML-------------------------------------------------
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name')
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const progressBar = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shufleButon = document.getElementById('shuflle');
const repeatButon = document.getElementById('repeat');
const likeButon = document.getElementById('like');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

///---------------------------------------------------------------------


/// Variáveis----------------------------------------------------------- 

const SejaParaMim = {
    songName : 'Seja para mim',
    artist :'maneva',
    file : 'maneva',
    like : false,
};

const Pachamama = {
    songName : 'Pachamama',
    artist :'Astral Flowers',
    file : 'Astral Flowers',
    like : false,
};

const DentroDeTudo = {
    songName : 'Dentro de tudo que se pode sentir',
    artist :'Dentro de Tudo que se Pode Sentir',
    file : 'Dentro de Tudo que se Pode Sentir',
    like : false,
};

let isPlay = false;
let isShuffle = false;
let isRepeat = false;


const original_Playlist = [SejaParaMim,Pachamama,DentroDeTudo];
let sortePlaylist = [...original_Playlist];
let index = 0;

///-------------------------------------------------------------------------

///Criação de Funcões-------------------------------------------------------
function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlay = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlay = false; 
}


function playPauseDecider(){
    if (isPlay === true){
        pauseSong();
    }
    else{
        playSong();
    }
}

function buttonlike(){
    if (sortePlaylist[index].like === true){
        likeButon.querySelector('.bi').classList.remove('bi-heart');
        likeButon.querySelector('.bi').classList.add('bi-heart-fill');
        likeButon.classList.add('button-active');
    }
    else{
        likeButon.querySelector('.bi').classList.add('bi-heart');
        likeButon.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButon.classList.remove('button-active');
    }
}


function initializeSong(){
    cover.src = `images/${sortePlaylist[index].file}.jpeg`;
    song.src = `songs/${sortePlaylist[index].file}.mp3`;
    songName.innerText = sortePlaylist[index].songName;
    bandName.innerText = sortePlaylist[index].artist;
    buttonlike();
}


function previousSong(){
    if(index === 0){

        index = playlist.length -1 ;
    }
    
    else{
        index -= 1; 
    }
    initializeSong();
    playSong();
    previous.querySelector('.bi').classList.add('bi-skip-start-fill');
}


function nextSong(){
    if(index === sortePlaylist.length -1 ){
        index = 0;
    }
    else{
        index += 1; 
    }
    initializeSong();
    playSong();
    next.querySelector('.bi').classList.add('bi-skip-end-fill');
}


function updateProgress(){
    const barWidht = (song.currentTime/song.duration)* 100;
    progressBar.style.setProperty('--progress', `${barWidht}%`);
    songTime.innerText = toHHMMSS(song.currentTime);

}

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
}


function shuffleArray(preShuffleArray){
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex]  = aux;
        currentIndex -= 1;
    }
}


function shuffleButonClick(){
    if(isShuffle === false){
        isShuffle = true;
        shuffleArray(sortePlaylist);
        shufleButon.classList.add('button-active');
    }
    else{
        isShuffle = false;
        sortePlaylist = [...original_Playlist];
        shufleButon.classList.remove('button-active');
    }
}


function repeatButonClick(){
    if(isRepeat === false){
        isRepeat = true;
        repeatButon.classList.add('button-active');
    }
    else{
        isRepeat = false;
        repeatButon.classList.remove('button-active');
    }
}

function nextOrRepeat(){
    if(isRepeat == false){
        nextSong();
    }
    else{
        playSong();

    }
}

function toHHMMSS(originalNumber){
    let hours = Math.floor(originalNumber / 3600);
    let minutes = Math.floor((originalNumber -  hours * 3600) / 60);
    let seconds = Math.floor(originalNumber - hours * 3600 - minutes * 60);
    return(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    
}



function updateTotalTime(){
    toHHMMSS(song.duration)
    totalTime.innerText = toHHMMSS(song.duration);
}


function likeButonClicked() {
    if (sortePlaylist[index].like === false){
        sortePlaylist[index].like = true;
    } else {
        sortePlaylist[index].like = false;

    }
    likeButon();

}


initializeSong();



/// Eventos: clicks,
play.addEventListener('click',playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click',nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click',jumpTo);
shufleButon.addEventListener('click',shuffleButonClick);
repeatButon.addEventListener('click', repeatButonClick);
likeButon.addEventListener('click', likeButonClicked);
