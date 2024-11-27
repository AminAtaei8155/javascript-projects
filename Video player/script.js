let playerArea = document.querySelector('.myplayer');
let media = playerArea.querySelector('video');
let controls = playerArea.querySelector('.myplayer__controls');

let play = controls.querySelector('.play');
let rwd = controls.querySelector('.rewind');
let fwd = controls.querySelector('.forward');
let fullScreen = controls.querySelector('.fullscreen');
let timerArea = controls.querySelector('.timer');
let volumeIcon = controls.querySelector('.volume .icon');
let volumeProgressBar = controls.querySelector('.volume .volume__progress');
let volumeProgressBarInput = volumeProgressBar.querySelector('input');

let currentTime = timerArea.querySelector('.currentTime');
let videoTime = timerArea.querySelector('.videoTime');
let timerBar = controls.querySelector('.controls__progressbar-current');




media.addEventListener("timeupdate", function () {

    currentTime.textContent = getTime(media.currentTime);

    let barLength = (media.currentTime / media.duration) * 100;
    timerBar.style = `background : linear-gradient(90deg, rgba(230,126,34,1) ${barLength}%, #e1e1e1 0%);`;
    timerBar.value = barLength;

});

play.addEventListener('click' , function () {
    videoTime.textContent = getTime(media.duration);
    media.volume = .5;
    if (media.paused){
        togglePlayIcon();
        media.play();
    }else {
        togglePlayIcon();
        media.pause();
    }
});

rwd.addEventListener('click',function () {
    media.currentTime = media.currentTime - 5;
});
fwd.addEventListener('click',function () {
    media.currentTime = media.currentTime + 5;
});

timerBar.addEventListener('input' , function () {
    media.currentTime = (this.value / 100) * media.duration;

});

volumeIcon.addEventListener('click' , function () {
    volumeProgressBar.classList.toggle('active')
});

volumeProgressBarInput.addEventListener('input' , function () {
    media.volume = this.value / 100;
    this.style = `background : linear-gradient(90deg, rgba(230,126,34,1) ${this.value}%, #e1e1e1 0%);`
});

fullScreen.addEventListener('click' , function () {
    if (!document.fullscreenElement) {
        if (playerArea.requestFullscreen){
            playerArea.requestFullscreen();
        }else if (playerArea.mozFullScreenElement){
            playerArea.mozFullScreenElement();
        }else if (playerArea.msFullscreenElement){
            playerArea.msFullscreenElement();
        }else if (playerArea.webkitFullscreenElement){
            playerArea.webkitFullscreenElement();
        }
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }else if (document.mozFullScreenElement){
        document.mozFullScreenElement();
    }else if (document.msFullscreenElement){
        document.msFullscreenElement();
    }else if (document.webkitFullscreenElement){
        document.webkitFullscreenElement();
    }
});

function togglePlayIcon() {
    let icon = play.querySelector('i');
    icon.classList.toggle('ion-md-pause');
    icon.classList.toggle('ion-md-play');
}

function getTime(time) {
    let minutes = Math.floor(time / 60);
    let secends = Math.floor(time - (minutes * 60));
    let minuteValue;
    let secendsValue;

    if (minutes < 10){
        minuteValue = '0' + minutes;
    }else{
        minuteValue = minutes;
    }
    if (secends < 10){
        secendsValue = '0' + secends;
    }else{
        secendsValue = secends;
    }

    return  minuteValue + ':' + secendsValue;
}