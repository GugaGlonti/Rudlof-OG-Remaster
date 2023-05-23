const fieldGrid = document.querySelector('.fields-grid');
const wheelBorder = document.querySelector('.wheel-border');
const board = document.querySelector('.board');

const mainText = document.querySelector('h1');
const spinText = document.querySelector('h2');
const balanceText = document.querySelector('.balanceText');

const asideLeft = document.querySelector('.aside--left');
const asideRight = document.querySelector('.aside--right');

const compoundRed = document.querySelector('.compound-red');
const compoundBlack = document.querySelector('.compound-black');

const compoundEven = document.querySelector('.compound-even');
const compoundOdd = document.querySelector('.compound-odd');

const compound1to18 = document.querySelector('.compound-1to18');
const compound19to36 = document.querySelector('.compound-19to36');

const fisrtTwelve = document.querySelector('.twelve-1');
const secondTwelve = document.querySelector('.twelve-2');
const thirdTwelve = document.querySelector('.twelve-3');

const column1 = document.querySelector('.column--1');
const column2 = document.querySelector('.column--2');
const column3 = document.querySelector('.column--3');

const chips = document.querySelector('.chips');

const betAmmount = document.getElementById('bet-ammount');
const clearBetAmmount = document.querySelector('.clear-bet-ammount');

const placedBets = document.querySelector('.placed-bets');
const betResults = document.querySelector('.bet-results');

//--------------------------------------------------------------------------//
// random stuff, not final labels yet

let balance = 1000;
balanceText.textContent = balance;

let currentBets = [];
let currentWins = [];

const europeanNumber = [
  26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27,
  6, 34, 17, 25, 2, 21, 4, 19, 15, 32,
];
const blacks = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

// ------------------------------------------------------------------------- //
// BOARD INITIALIZER BOARD INITIALIZER BOARD INITIALIZER BOARD INITIALIZER - //
// ------------------------------------------------------------------------- //
function fillFieldsGrid() {
  for (let i = 0; i < 36; i++) {
    fieldGrid.insertAdjacentHTML(
      'beforeend',
      `<div class="field-square">
                <div class="field" data-number="${i + 1}"><p>${i + 1}</p></div>
            </div>`
    );
    const currentField = document.querySelector(`[data-number='${i + 1}']`);
    if (i + 1 < 10) {
      currentField.style.backgroundColor = (i + 1) % 2 === 0 ? '#000000' : '#E0080B';
    }
    if (i + 1 === 10) {
      currentField.style.backgroundColor = '#000000';
    }
    if (i + 1 > 10 && i + 1 < 19) {
      currentField.style.backgroundColor = (i + 1) % 2 === 0 ? '#E0080B' : '#000000';
    }
    if (i + 1 >= 19 && i + 1 < 28) {
      currentField.style.backgroundColor = (i + 1) % 2 === 0 ? '#000000' : '#E0080B';
    }
    if (i + 1 === 28) {
      currentField.style.backgroundColor = '#000000';
    }
    if (i + 1 >= 29) {
      currentField.style.backgroundColor = (i + 1) % 2 === 0 ? '#E0080B' : '#000000';
    }
  }
}

// ------------------------------------------------------------------------- //
// WHEEL INITIALIZER WHEEL INITIALIZER WHEEL INITIALIZER WHEEL INITIALIZER - //
// ------------------------------------------------------------------------- //
function fillFieldsWheel() {
  // green first
  wheelBorder.insertAdjacentHTML(
    'beforeend',
    `<div class="wheel-field" style="background-color: #09E044" data-wheelindex="${0}"><p>${0}</p></div>`
  );
  // then Red and Black
  europeanNumber.forEach((num, i) => {
    wheelBorder.insertAdjacentHTML(
      'beforeend',
      `<div class="wheel-field" data-wheelindex="${i + 1}"><p>${num}</p></div>`
    ); // color Red and Black
    const currentField = document.querySelector(`*[data-wheelindex="${i + 1}"]`);
    currentField.style.backgroundColor = i % 2 === 0 ? '#000000' : '#E0080B';
  });
}

// CALL initializing functions
fillFieldsGrid();
fillFieldsWheel();

const wheelFields = [...wheelBorder.children];
let middleField;
let currentField;
let currentNumber;

let currentBoardField;
let previousBoardField = document.querySelector(`*[data-wheelindex="${19}"]`);

// ------------------------------------------------------------------------- //
// SPIN SPIN SPIN SPIN SPIN SPIN SPIN SPIN SPIN SPIN SPIN SPIN SPIN SPIN --- //
// ------------------------------------------------------------------------- //
const spin = function (interval, mode) {
  wheelFields.forEach(wheelField => {
    // set spin interval
    wheelField.style.transition = `all ${interval}ms ${mode}`;

    // get current index
    const CurrentI = Number(wheelField.dataset.wheelindex);
    if (CurrentI != 37) {
      // shift right >>>>
      wheelField.style.left = `${Number(wheelField.dataset.wheelindex++)}0rem`;
    } else {
      // shift to start <<<<
      wheelField.style.left = '0rem';
      wheelField.dataset.wheelindex = '1';
    }

    // turn out-of-window fields invisible
    // index 29 is out of bounds!
    if (CurrentI === 30) wheelField.style.opacity = 0;
    if (CurrentI === 8) wheelField.style.opacity = 1;
  });

  currentField = document.querySelector(`*[data-wheelindex="${19}"]`);
  currentNumber = Number(currentField.textContent);

  // number fields ----------------------------------------------------------------
  if (currentNumber === 0) {
    currentBoardField = document.querySelector('.greens');
  } else {
    currentBoardField = document.querySelector(`[data-number='${currentNumber}']`).parentElement;
  }

  if (previousBoardField === document.querySelector('.greens')) {
    document.querySelector('.greens').style.removeProperty('border');
  } else {
    previousBoardField.style.border = '0.2rem solid #fff';
  }
  currentBoardField.style.border = '0.5rem solid #f3c620';
  previousBoardField = currentBoardField;
  highLightFields();
};

// ------------------------------------------------------------------------- //
// HIGHLIGHT FIELDS HIGHLIGHT FIELDS HIGHLIGHT FIELDS HIGHLIGHT FIELDS ----- //
// ------------------------------------------------------------------------- //
function highLightFields() {
  // RED and BLACK ----------------------------------------------------------------
  if (currentField.style.backgroundColor === 'rgb(224, 8, 11)') {
    compoundRed.style.border = '0.2rem solid #f3c620';
    compoundBlack.style.border = '0.2rem solid #fff';
  } else if (currentField.style.backgroundColor === 'rgb(0, 0, 0)') {
    compoundBlack.style.border = '0.2rem solid #f3c620';
    compoundRed.style.border = '0.2rem solid #fff';
  } else {
    compoundBlack.style.border = '0.2rem solid #fff';
    compoundRed.style.border = '0.2rem solid #fff';
  }
  // ODD and EVEN -----------------------------------------------------------------
  if (currentNumber !== 0) {
    if (currentNumber % 2 === 0) {
      compoundEven.style.border = '0.2rem solid #f3c620';
      compoundOdd.style.border = '0.2rem solid #fff';
    } else {
      compoundOdd.style.border = '0.2rem solid #f3c620';
      compoundEven.style.border = '0.2rem solid #fff';
    }
  } else {
    compoundOdd.style.border = '0.2rem solid #fff';
    compoundEven.style.border = '0.2rem solid #fff';
  }
  // 1to18 and 19to36 -------------------------------------------------------------
  if (currentNumber !== 0) {
    if (currentNumber < 19) {
      compound1to18.style.border = '0.2rem solid #f3c620';
      compound19to36.style.border = '0.2rem solid #fff';
    } else {
      compound19to36.style.border = '0.2rem solid #f3c620';
      compound1to18.style.border = '0.2rem solid #fff';
    }
  } else {
    compound19to36.style.border = '0.2rem solid #fff';
    compound1to18.style.border = '0.2rem solid #fff';
  }

  // 1st, 2nd and 3rd 12 ----------------------------------------------------------
  if (currentNumber !== 0) {
    if (currentNumber < 15) {
      fisrtTwelve.style.border = '0.2rem solid #f3c620';
      secondTwelve.style.border = '0.2rem solid #fff';
      thirdTwelve.style.border = '0.2rem solid #fff';
    } else if (currentNumber >= 15 && currentNumber < 27) {
      fisrtTwelve.style.border = '0.2rem solid #fff';
      secondTwelve.style.border = '0.2rem solid #f3c620';
      thirdTwelve.style.border = '0.2rem solid #fff';
    } else {
      fisrtTwelve.style.border = '0.2rem solid #fff';
      secondTwelve.style.border = '0.2rem solid #fff';
      thirdTwelve.style.border = '0.2rem solid #f3c620';
    }
  } else {
    fisrtTwelve.style.border = '0.2rem solid #fff';
    secondTwelve.style.border = '0.2rem solid #fff';
    thirdTwelve.style.border = '0.2rem solid #fff';
  }
  // Column 1, 2 and 3 ------------------------------------------------------------
  if (currentNumber !== 0) {
    if (currentNumber % 3 === 0) {
      column1.style.border = '0.2rem solid #f3c620';
      column2.style.border = '0.2rem solid #fff';
      column3.style.border = '0.2rem solid #fff';
    } else if ((currentNumber + 1) % 3 === 0) {
      column1.style.border = '0.2rem solid #fff';
      column2.style.border = '0.2rem solid #f3c620';
      column3.style.border = '0.2rem solid #fff';
    } else {
      column1.style.border = '0.2rem solid #fff';
      column2.style.border = '0.2rem solid #fff';
      column3.style.border = '0.2rem solid #f3c620';
    }
  } else {
    column1.style.border = '0.2rem solid #fff';
    column2.style.border = '0.2rem solid #fff';
    column3.style.border = '0.2rem solid #fff';
  }
}

// break in spin (NOT SURE IF NEEDED)
/* 
spin(50, 'linear');
 */

// ------------------------------------------------------------------------- //
// SPIN HANDLER SPIN HANDLER SPIN HANDLER SPIN HANDLER SPIN HANDLER -------- //
// ------------------------------------------------------------------------- //
const spinHandler = function () {
  if (spinText.textContent === 'Next') {
    spinText.textContent = 'Spin!';

    // remove aside contents
    placedBets.innerHTML = '';
    betResults.innerHTML = '';

    // clear arrays
    currentBets = [];
    currentWins = [];
    totalWinnings = 0;

    return;
  }

  // ANIMATION --- ANIMATION --- ANIMATION --- ANIMATION --- ANIMATION //
  // push down roulette.
  wheelBorder.style.transform = `translate(-50%, 20rem)`;

  // push down and scale up board
  board.style.marginTop = '0rem';
  board.style.scale = '1.5';

  // remove spinText
  spinText.classList.add('hidden');
  blinkerManager(false);

  // move asides out of frame
  asideLeft.style.transform = 'translate(-100%, -50%)';
  asideRight.style.transform = 'translate(100%, -50%)';

  // move chips down
  chips.style.transform = 'translateY(20rem)';
  // ANIMATION --- ANIMATION --- ANIMATION --- ANIMATION --- ANIMATION //

  // roll: 0-36
  const roll = Math.floor(Math.random() * 37);
  // spins: 2-4                                     2!
  const rotations = Math.floor(Math.random() * 3) + 2;
  // spins: 72-180
  const spins = rotations * 36 + roll;
  const firstSpinsAmmount = spins - 36;
  let firstSpinCounter = spins - 36;
  // rotation function:
  // spins % 36 | 36 | 36 | ... -> end

  // interval static at first, then decreases
  let interval = 50;

  const firstSpinTimer = setInterval(firstSpin, interval);
  function firstSpin() {
    spin(interval, 'linear');
    if (!firstSpinCounter) clearInterval(firstSpinTimer);
    firstSpinCounter--;
  }

  // DO NOT CHANGE!!!!!
  let speed = 1.05;
  let counter = 0;
  // DO NOT CHANGE!!!!!

  function start(mode) {
    setTimeout(function () {
      interval = interval * speed;
      speed += 0.001;
      if (mode !== 'ease-out') {
        spin(interval, 'linear');
      } else {
        // LAST SPIN
        spin(interval + 100, 'ease-out');
      }
      counter++;
      if (interval <= 500) {
        if (counter === 35) {
          start('ease-out');
          return;
        }
        start();
      } else {
        spinEnd();
      }
    }, interval);
  }

  const timeUntilSecondSpin = firstSpinsAmmount * interval;
  setTimeout(start, timeUntilSecondSpin);

  function spinEnd() {
    console.log('SPIN END');
    middleField = document.querySelector(`*[data-wheelindex="${19}"]`);
    const rolledNumber = Number(middleField.textContent);
    setTimeout(function () {
      // ANIMATION --- ANIMATION --- ANIMATION --- ANIMATION --- ANIMATION //
      // push up roulette.
      wheelBorder.style.transform = `translate(-50%, -40rem)`;
      // push up and sclae down board.
      board.style.marginTop = '0';
      board.style.scale = '1';
      // remove spinText
      setTimeout(function () {
        spinText.classList.remove('hidden');
        blinkerManager(true);
      }, 1000);

      // move asides in frame
      asideLeft.style.transform = 'translate(0, -50%)';
      asideRight.style.transform = 'translate(0, -50%)';

      // move chips up
      chips.style.transform = 'translateY(0rem)';

      // ANIMATION --- ANIMATION --- ANIMATION --- ANIMATION --- ANIMATION //
      cashout(rolledNumber);
    }, 2000);
  }
};

const test = async function () {
  await fetch('asdas');
  return;
};

// ------------------------------------------------------------------------- //
// BLINKING BLINK>ING BLINKING BLINKING BLINKING BLINKING BLINKING BLINKING - //
// ------------------------------------------------------------------------- //
let blinking = false;
let blinkInterval = null;

// ------------------------------------------------------------------------- //
// BLINK MANAGER BLINK MANAGER BLINK MANAGER BLINK MANAGER BLINK MANAGER --- //
// ------------------------------------------------------------------------- //
const blinkerManager = function (switch_param) {
  if (switch_param) {
    blinkInterval = setInterval(function () {
      mainText.classList.toggle('no-glow');
    }, 1000);
    mainText.classList.remove('hidden');
  } else {
    mainText.classList.add('no-glow');
    mainText.classList.add('hidden');
    clearInterval(blinkInterval);
  }
};
// start blinking
blinkerManager(true);

// ------------------------------------------------------------------------- //
// CASHOUT // CASHOUT // CASHOUT // CASHOUT // CASHOUT // CASHOUT // CASHOUT //
// ------------------------------------------------------------------------- //
// executed after spin
const cashout = function (rolledNumber) {
  // display rolled number for a few seconds
  mainText.textContent = `${rolledNumber}`;
  setTimeout(function () {
    mainText.textContent = 'Place your Bet!';
  }, 6000);

  // start
  console.log('CASHOUT');
  console.log(rolledNumber);

  // check if win
  currentBets.forEach(bet => {
    // push betting costs
    currentWins.push([-bet.ammount, 'cost']);
    // push winnings
    switch (bet.on) {
      //------------------------------------------//
      //---- Green -------------------------------//
      case 'Green':
        if (rolledNumber === 0) currentWins.push([bet.ammount * 37, 'Green']);
        break;
      //------------------------------------------//
      //---- BLACK OR RED ------------------------//
      case 'Black':
        if (blacks.includes(rolledNumber)) currentWins.push([bet.ammount * 2, 'Black']);
        break;
      case 'Red':
        if (reds.includes(rolledNumber)) currentWins.push([bet.ammount * 2, 'Red']);
        break;
      //------------------------------------------//
      //---- ODD OR EVEN -------------------------//
      case 'Even':
        if (rolledNumber % 2 === 0 && rolledNumber != 0)
          currentWins.push([bet.ammount * 2, 'Even']);
        break;
      case 'Odd':
        if (rolledNumber % 2 === 1) currentWins.push([bet.ammount * 2, 'Odd']);
        break;
      //------------------------------------------//
      //---- first or second half ----------------//
      case '1to18':
        if (rolledNumber < 19) currentWins.push([bet.ammount * 2, '1to18']);
        break;
      case '19to36':
        if (rolledNumber > 18) currentWins.push([bet.ammount * 2, '19to36']);
        break;
      //------------------------------------------//
      //---- 1st, 2nd or 3rd 12 ------------------//
      case '1st 12':
        if (rolledNumber <= 12) currentWins.push([bet.ammount * 3, '1st 12']);
        break;
      case '2nd 12':
        if (rolledNumber >= 13 && rolledNumber <= 25) currentWins.push([bet.ammount * 3, '2nd 12']);
        break;
      case '3rd 12':
        if (rolledNumber >= 25) currentWins.push([bet.ammount * 3, '3rd 12']);
        break;
      //------------------------------------------//
      //---- COLUMNS -----------------------------//
      case '1st col.':
        if (rolledNumber % 3 === 0) currentWins.push([bet.ammount * 3, '1st col.']);
        break;
      case '2nd col.':
        if (rolledNumber % 3 === 2) currentWins.push([bet.ammount * 3, '2nd col.']);
        break;
      case '3rd col.':
        if (rolledNumber % 3 === 1) currentWins.push([bet.ammount * 3, '3rd col.']);
        break;
    }
    if (typeof bet.on === 'number' && bet.on != 0) {
      if (rolledNumber === bet.on) currentWins.push([bet.ammount * 37, bet.on]);
    }
  });
  console.log(currentBets);
  console.log(currentWins);

  const bettingCosts = currentWins
    .filter(value => value[0] <= 0)
    .map(array => array[0])
    .reduce((accumulator, value) => accumulator + value, 0);
  console.log(bettingCosts);

  const winnings = currentWins.filter(value => value[0] >= 0);
  console.log(winnings);

  // update balance and balanceText
  if (winnings.length !== 0) {
    totalWinnings = winnings
      .map(winning => winning[0])
      .reduce((accumulator, winning) => accumulator + winning, 0);
  } else {
    totalWinnings = 0;
  }
  balance += Number(bettingCosts) + Number(totalWinnings);
  balanceText.textContent = balance;

  // update Spintext
  spinText.textContent = 'Next';

  // add results to left aside
  betResults.insertAdjacentHTML(
    'afterbegin',
    `<div class="placed-bet">
      <p class="aside-bet-ammount" style="color: red">${bettingCosts}</p>
      <p class="aside-bet-on" style="color: red">total Costs</p>
    </div>`
  );

  winnings.forEach(winning => {
    betResults.insertAdjacentHTML(
      'beforeend',
      `<div class="placed-bet">
        <p class="aside-bet-ammount" style="color: green">+${winning[0]}</p>
        <p class="aside-bet-on" style="color: green">on ${winning[1]}</p>
      </div>`
    );
  });

  if (winnings.length === 0) {
    betResults.insertAdjacentHTML(
      'beforeend',
      `<div class="placed-bet">
        <p class="aside-bet-ammount">No winnings.</p>
      </div>`
    );
  } else {
    betResults.insertAdjacentHTML(
      'beforeend',
      `<div class="placed-bet">
        <p class="aside-bet-ammount">Total: ${totalWinnings + bettingCosts}</p>
      </div>`
    );
  }
};

spinText.addEventListener('click', spinHandler);

// ------------------------------------------------------------------------- //
// PLACE BETS PLACE BETS PLACE BETS PLACE BETS PLACE BETS PLACE BETS ------- //
// ------------------------------------------------------------------------- //

// chips add ammount to bet ammount
[...chips.children].forEach(chip => {
  chip.addEventListener('click', function () {
    betAmmount.value = Number(betAmmount.value) + Number(chip.textContent);
  });
});

clearBetAmmount.addEventListener('click', function (e) {
  e.preventDefault();
  betAmmount.value = '';
});

const addBet = function () {
  const currentBet = betAmmount.value;
  if (!currentBet) return;
  // add html to aside
  placedBets.insertAdjacentHTML(
    'afterbegin',
    `<div class="placed-bet placed-bet-shifted">
      <p class="aside-bet-ammount">${currentBet}</p>
      <p class="aside-bet-on">on ${this[0]}</p>
    </div>`
  );
  // push bet to array
  currentBets.push({ ammount: Number(currentBet), on: this[0], winMultiplier: this[1] });
  console.log(currentBets);

  // clear betting ammount value
  betAmmount.value = '';

  // move bet into frame
  setTimeout(function () {
    const currentAsideBet = document.querySelector('.placed-bet');
    currentAsideBet.classList.remove('placed-bet-shifted');
  }, 50);
};

compoundBlack.addEventListener('click', addBet.bind(['Black', 2]));
compoundRed.addEventListener('click', addBet.bind(['Red', 2]));

compoundEven.addEventListener('click', addBet.bind(['Even', 2]));
compoundOdd.addEventListener('click', addBet.bind(['Odd', 2]));

compound1to18.addEventListener('click', addBet.bind(['1to18', 2]));
compound19to36.addEventListener('click', addBet.bind(['19to36', 2]));

fisrtTwelve.addEventListener('click', addBet.bind(['1st 12', 3]));
secondTwelve.addEventListener('click', addBet.bind(['2nd 12', 3]));
thirdTwelve.addEventListener('click', addBet.bind(['3rd 12', 3]));

column1.addEventListener('click', addBet.bind(['1st col.', 3]));
column2.addEventListener('click', addBet.bind(['2nd col.', 3]));
column3.addEventListener('click', addBet.bind(['3rd col.', 3]));

const fieldSquares = document.querySelectorAll('.field-square');
[...fieldSquares].forEach(fieldSquare => {
  fieldSquare.addEventListener(
    'click',
    addBet.bind([Number(fieldSquare.children[0].dataset.number), 36])
  );
});

document.querySelector('.greens').addEventListener('click', addBet.bind(['Green', 36]));
