/* eslint-env browser */

const dB = (signal) => - Math.round( 20 * Math.log10( 1 / signal ) )

/* Add confetti creation function */
const createConfetti = () => {
  const confettiContainer = document.getElementById('confetti-container');
  const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff', '#fff', '#ff69b4', '#9d3ff0', '#ff3855']; // Расширенный набор цветов
  const shapes = ['square', 'circle', 'triangle']; // Разные формы

  // Очистить предыдущие конфетти если они были
  confettiContainer.innerHTML = '';

  for (let i = 0; i < 150; i++) { // Увеличено количество конфетти
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');

    // Случайная форма
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    confetti.classList.add(shape);

    confetti.style.left = Math.random() * 100 + 'vw'; // Случайная горизонтальная позиция

    const color = colors[Math.floor(Math.random() * colors.length)];
    if (shape === 'triangle') {
      confetti.style.borderBottomColor = color;
    } else {
      confetti.style.backgroundColor = color;
    }

    // Разные размеры
    const size = Math.random() * 8 + 5;
    confetti.style.width = size + 'px';
    if (shape !== 'triangle') {
      confetti.style.height = size + 'px';
    }

    // Различные анимации
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's'; // От 2 до 5 секунд

    // Разные начальные повороты и масштабы
    confetti.style.transform = `rotateZ(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`;

    confettiContainer.appendChild(confetti);

    // Удалить элемент после завершения анимации
    confetti.addEventListener('animationend', () => {
      confetti.remove();
    });
  }

  // Добавим звуковой эффект праздника при задувании свечей
  playPartySound();
};

// Функция воспроизведения звука праздника
const playPartySound = () => {
  try {
    // Создаем простой звуковой эффект с помощью Web Audio API
    const context = new (window.AudioContext || window.webkitAudioContext)();

    // Играем серию веселых нот
    const playNote = (frequency, time, duration) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gain.gain.value = 0.1; // Тихий звук

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.start(context.currentTime + time);
      oscillator.stop(context.currentTime + time + duration);
    };

    // Играем мелодию
    playNote(523.25, 0.0, 0.2);  // C5
    playNote(587.33, 0.2, 0.2);  // D5
    playNote(659.25, 0.4, 0.2);  // E5
    playNote(698.46, 0.6, 0.2);  // F5
    playNote(783.99, 0.8, 0.3);  // G5
    playNote(880.00, 1.1, 0.6);  // A5
  } catch (e) {
    console.log("Аудио не поддерживается или отключено");
  }
};

// Улучшенная интерактивность свечей
let candlesInitialized = false;

function initCandleInteractivity() {
  if (candlesInitialized) return; // Предотвращаем двойную инициализацию

  const candles = document.querySelectorAll('.candle');
  if (candles.length === 0) {
    // Если свечи еще не загружены, пробуем позже
    setTimeout(initCandleInteractivity, 500);
    return;
  }

  console.log('Инициализация интерактивности свечей');
  candlesInitialized = true;

  // Добавляем обработчик клика для каждой свечи
  candles.forEach(candle => {
    // Увеличиваем область клика для лучшего попадания
    candle.style.cursor = 'pointer';

    // Используем mousedown вместо click для более быстрого отклика
    candle.addEventListener('mousedown', handleCandleClick);
    // Также добавляем touchstart для мобильных устройств
    candle.addEventListener('touchstart', handleCandleClick);
  });
}

function handleCandleClick(e) {
  // Останавливаем всплытие события
  e.preventDefault();
  e.stopPropagation();

  // Находим пламя внутри свечи
  const candle = this;
  const flame = candle.querySelector('.flame');

  if (!flame) return;

  // Проверяем, не задуты ли уже все свечи
  if (document.getElementById('cake-holder').classList.contains('done')) {
    return;
  }

  // Задуваем эту свечу
  flame.style.opacity = '0';

  // Воспроизводим небольшой звук задувания
  playBlowSound();

  // Добавляем небольшой эффект подсветки свечи при задувании
  // Вместо изменения transform используем тень
  candle.style.boxShadow = '0 0 15px rgba(255, 100, 0, 0.9)';
  setTimeout(() => {
    candle.style.boxShadow = '';
  }, 300);

  // Проверяем, все ли свечи потушены
  checkAllCandles();
}

function playBlowSound() {
  try {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.frequency.value = 150;
    oscillator.type = 'sine';

    gain.gain.setValueAtTime(0.1, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.3);
  } catch (e) {
    console.log("Аудио не поддерживается");
  }
}

function checkAllCandles() {
  const allFlames = document.querySelectorAll('.flame');
  // Проверяем видимые пламена (opacity != 0)
  const visibleFlames = Array.from(allFlames).filter(flame =>
      window.getComputedStyle(flame).opacity !== '0'
  );

  console.log(`Осталось ${visibleFlames.length} неpотушенных свечей`);

  // Если осталось менее 5 незадутых свечей, заставляем пламя дрожать сильнее
  if (visibleFlames.length < 5 && visibleFlames.length > 0) {
    visibleFlames.forEach(flame => {
      flame.style.animation = 'flicker 0.5s ease-in-out alternate infinite';
    });
  }

  // Если все свечи задуты, показываем поздравление
  if (visibleFlames.length === 0) {
    showCake();
    createConfetti();
  }
}

// Запускаем инициализацию при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  // Пробуем инициализировать сразу после загрузки DOM
  initCandleInteractivity();

  // И еще раз через некоторое время для надежности
  setTimeout(initCandleInteractivity, 1000);
  setTimeout(initCandleInteractivity, 2000);
});

// Также запускаем инициализацию при клике на кнопку Start
document.getElementById('start').addEventListener('click', () => {
  setTimeout(initCandleInteractivity, 500);
});

/**
 * speechDetectionListeners
 *
 */

function hystogramLine( value ) {

  const maxCharsperLine = 200
  const valueInChars = maxCharsperLine * value
  const char = '█'

  return char.repeat(valueInChars)

}


function showConfiguration() {

  // document.querySelector('#SAMPLE_POLLING_MSECS').textContent = SAMPLE_POLLING_MSECS
  // document.querySelector('#MAX_INTERSPEECH_SILENCE_MSECS').textContent = MAX_INTERSPEECH_SILENCE_MSECS
  // document.querySelector('#MIN_SIGNAL_DURATION').textContent = MIN_SIGNAL_DURATION
  // document.querySelector('#VOLUME_SIGNAL').textContent = VOLUME_SIGNAL
  // document.querySelector('#VOLUME_SILENCE').textContent = VOLUME_SILENCE
  // document.querySelector('#VOLUME_MUTE').textContent = VOLUME_MUTE
  // document.querySelector('#MIN_AVERAGE_SIGNAL_VOLUME').textContent = MIN_AVERAGE_SIGNAL_VOLUME

}


//
// signal handler
//
document.addEventListener('signal', event => {

  const volume = event.detail.volume.toFixed(9)
  const timestamp = event.detail.timestamp
  const items = event.detail.items.toString().padEnd(3)
  const dBV = dB(event.detail.volume)

  const line = hystogramLine(volume)
  console.log('dbV',dBV)
  // Check if the cake hasn't been shown yet to prevent multiple triggers
  const cakeHolder = document.getElementById('cake-holder');
  if (dBV >= -17 && !cakeHolder.classList.contains('done')){
    console.log('Happy Birth Day')
    showCake() // Show cake and message (defined in cake.js)
    createConfetti() // Trigger confetti animation
  }
  if (debuglog)
    console.log(`signal  ${timestamp} ${items} ${volume} ${dBV} ${line}`)

  // document.querySelector('#audiostatuscell').style.background = 'green'
  // document.querySelector('#audiostatuscell').style.color = 'black'
  // document.querySelector('#audiostatus').style.background = 'green'
  // document.querySelector('#audiostatus').textContent = 'signal'

  //const theDiv = document.getElementById('log')
  //const content = document.createTextNode(text)
  //theDiv.appendChild(content)

})

//
// silence handler
//
document.addEventListener('silence', event => {

  const volume = event.detail.volume.toFixed(9)
  const timestamp = event.detail.timestamp
  const items = event.detail.items.toString().padEnd(3)
  const dBV = dB(event.detail.volume)

  if (debuglog)
    console.log(`silence ${timestamp} ${items} ${volume} ${dBV}`)

  // document.querySelector('#audiostatuscell').style.background = 'black'
  // document.querySelector('#audiostatuscell').style.color = 'white'
  // document.querySelector('#audiostatus').style.background = 'black'
  // document.querySelector('#audiostatus').textContent = 'silence'

})

//
// mute handler
//
document.addEventListener('mute', event => {

  const volume = event.detail.volume.toFixed(9)
  const timestamp = event.detail.timestamp
  const dBV = dB(event.detail.volume)

  if (debuglog)
    console.log(`mute    ${timestamp} ${volume} ${dBV}`)

  // document.querySelector('#audiostatus').textContent = 'mute'

})


//
// prespeechstart handler
//
document.addEventListener('prespeechstart', event => {

  if (debuglog) {

    //const volume = event.detail.volume.toFixed(9)
    const timestamp = event.detail.timestamp
    //const dBV = dB(event.detail.volume)

    //console.log(`%cPRE SPEECH START    ${timestamp} ${volume} ${dBV}`, 'color:yellow')
    console.log(`%cPRE SPEECH START   ${timestamp}`, 'color:blue')

  }

  restartRecording()

})


//
// speechstart handler
//
document.addEventListener('speechstart', event => {

  if (debuglog) {

    //speechstartTime = event.detail.timestamp
    console.log('%cSPEECH START', 'color:greenyellow')
  }

  // document.querySelector('#recordingcell').style.background = 'green'
  // document.querySelector('#recordingcell').style.color = 'white'
  // document.querySelector('#recording').style.background = 'green'
  // document.querySelector('#recording').style.color = 'white'
  // document.querySelector('#recording').textContent = 'start'

  //startRecording()

})

//
// speechstop handler
//
document.addEventListener('speechstop', event => {

  const duration = event.detail.duration

  if (debuglog) {

    const averageSignalLevel = averageSignal()

    console.log('%cSPEECH STOP', 'color:lime')
    console.log(`Total Duration in msecs  : ${duration}`)
    console.log(`Signal Duration in msecs : ${duration - MAX_INTERSPEECH_SILENCE_MSECS }`)
    console.log(`Average Signal level     : ${averageSignalLevel}`)
    console.log(`Average Signal dB        : ${dB(averageSignalLevel)}`)
    console.log(' ')
  }

  // document.querySelector('#recordingcell').style.color = 'white'
  // document.querySelector('#recordingcell').style.background = 'black'
  // document.querySelector('#recording').style.color = 'white'
  // document.querySelector('#recording').style.background = 'black'
  // document.querySelector('#recording').textContent = `stop. len: ${duration} msecs`

  stopRecording()

})

//
// speechabort handler
//
document.addEventListener('speechabort', event => {

  const abort = event.detail.abort

  if (debuglog) {

    const duration = event.detail.duration
    const averageSignalLevel = averageSignal()

    console.log('%cSPEECH ABORT', 'color:red')
    console.log(`Abort reason             : ${abort}`)
    console.log(`Total Duration in msecs  : ${duration}`)
    console.log(`Signal Duration in msecs : ${duration - MAX_INTERSPEECH_SILENCE_MSECS }`)
    console.log(`Average Signal level     : ${averageSignalLevel}`)
    console.log(`Average Signal dB        : ${dB(averageSignalLevel)}`)
    console.log(' ')
  }

  // document.querySelector('#recordingcell').style.color = 'white'
  // document.querySelector('#recordingcell').style.background = 'red'
  // document.querySelector('#recording').style.color = 'white'
  // document.querySelector('#recording').style.background = 'red'
  // document.querySelector('#recording').textContent = `abort. ${abort}`

  abortRecording()

})

//
// mutedmic handler
//
document.addEventListener('mutedmic', event => {

  // document.querySelector('#microphonestatus').textContent = 'muted (off)'
  // document.querySelector('#microphonestatus').style.background = 'red'
  // document.querySelector('#microphonestatuscell').style.background = 'red'

  console.log('%cMICROPHONE MUTED', 'color:red')
  console.log(' ')

})

//
// unmutedmic handler
//
document.addEventListener('unmutedmic', event => {

  // document.querySelector('#microphonestatus').textContent = 'unmuted (on)'
  // document.querySelector('#microphonestatus').style.background = 'green'
  // document.querySelector('#microphonestatuscell').style.background = 'green'
  document.getElementById('cake-holder').style.opacity=1
  console.log('%cMICROPHONE UNMUTED', 'color:green')
  console.log(' ')

})


// showConfiguration()

