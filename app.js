import music from './music.js';

const player = document.querySelector('#player');
const musicName = document.querySelector('.musicName');
const autorName = document.querySelector('.autorName');
const prevBtn = document.querySelector('.prev');
const playBtn = document.querySelector('.play');
const nextBtn = document.querySelector('.next');
const progress = document.querySelector('.progress');
const current = document.querySelector('.current');
const duration = document.querySelector('.duration');
const medidor = document.querySelector('.medidor');

let index = 0;
player.volume = medidor.value / 100;

function load(i){
    player.src = music[i].src;
    musicName.textContent = music[i].name;
    autorName.textContent = music[i].band;
}

function playPause(){
    player.paused ? player.play() : player.pause();
    playBtn.textContent = player.paused ? '▶︎' : '⏸︎';
}

function next(){ index = (index+1)%music.length; load(index); player.play(); playBtn.textContent='⏸︎'; }
function prev(){ index = (index-1+music.length)%music.length; load(index); player.play(); playBtn.textContent='⏸︎'; }

player.ontimeupdate = () => {
    progress.style.width = player.duration ? (player.currentTime/player.duration)*100+'%' : '0%';
    const cM = Math.floor(player.currentTime/60).toString().padStart(2,'0');
    const cS = Math.floor(player.currentTime%60).toString().padStart(2,'0');
    const dM = Math.floor(player.duration/60||0).toString().padStart(2,'0');
    const dS = Math.floor(player.duration%60||0).toString().padStart(2,'0');
    current.textContent=`${cM}:${cS}`;
    duration.textContent=`${dM}:${dS}`;
}

playBtn.onclick = playPause;
nextBtn.onclick = next;
prevBtn.onclick = prev;
medidor.oninput = () => player.volume = medidor.value/100;

load(index);
