import _ from 'lodash';
import { print } from './utils';
import './index.less';

console.log(_.join(['Another', 'module', 'loaded!'], ' '));

const run = () => {
  const appendSeconds = document.getElementById('secs');
  const appendTens = document.getElementById('tens');
  const timeStartBtn = document.getElementById('start-button');
  const timePauseBtn = document.getElementById('pause-button');
  const timeResetBtn = document.getElementById('reset-button');
  let secs = '00';
  let tens = '00';
  let interval;

  const timeStart = () => {
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
  }

  const timePause = () => {
    clearInterval(interval);
  }

  const timeReset = () => {
    clearInterval(interval);
    tens = '00';
    secs = '00';
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = secs;
  }

  const startTimer = () => {
    tens++; 
    
    if(tens <= 9){
      appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
      appendTens.innerHTML = tens;
    } 
    
    if (tens > 99) {
      print('#orange');
      secs++;
      appendSeconds.innerHTML = "0" + secs;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    
    if (secs > 9){
      appendSeconds.innerHTML = secs;
    }
  }

  timeStartBtn.addEventListener('click', timeStart);
  timePauseBtn.addEventListener('click', timePause);
  timeResetBtn.addEventListener('click', timeReset);
};

run();