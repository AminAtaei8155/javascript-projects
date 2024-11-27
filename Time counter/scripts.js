let startBox = document.querySelector('.start-box');
let inputCounter = document.querySelector('#input-counter');
let startCounter = document.querySelector('#start-counter');
let errorElement = document.querySelector('#error-massage');
let timerCircle = document.querySelector('.c100');
let timerNum = document.querySelector('.timer-num');
let loadingMassage = document.querySelector('.message .loading');
let successMassage = document.querySelector('.message .success');

startCounter.addEventListener('click' , function (e) {
    let seconds = parseInt(inputCounter.value);

    if (isNaN(seconds)){
        errorElement.textContent = 'زمان را به درستی وارد کنید';
        errorElement.classList.add('active');
        return;
    }
    errorElement.classList.remove('active');
    startBox.classList.remove ('active');
    timerCircle.style.display = 'block';
    timerNum.textContent = seconds;
    loadingMassage.style.display = 'block';
    successMassage.style.display = 'none';

    let originalSeconds = seconds;
    let lastPercent = 'p100';
    let timerId = setInterval(() => {
        if (lastPercent){
            timerCircle.classList.remove(lastPercent);
        }



        if (seconds <= 0){
            clearInterval(timerId);
            startBox.classList.add('active');
            timerCircle.style.display = 'none';
            loadingMassage.style.display = 'none';
            successMassage.style.display = 'block';
            inputCounter.value = '';
            return;

        }
        if (lastPercent) timerCircle.classList.remove(lastPercent);
        seconds-= 1;
        let percent = Math.abs(Math.floor(( ( (originalSeconds - seconds) / originalSeconds) * 100) - 100) );
        lastPercent = `p${percent}`;
        timerCircle.classList.add(`p${percent}`);
        timerNum.textContent = seconds;
    }, 1000);
});