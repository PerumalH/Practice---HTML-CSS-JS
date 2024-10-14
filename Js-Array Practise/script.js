'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2024-10-11T23:36:17.929Z',
    '2024-10-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const startLogout = () => {
  let time = 5 * 60;

  const tick = () => {
    const min = Math.trunc(time / 60);
    const sec = time % 60;
    labelTimer.textContent = `${String(min).padStart(2, 0)}:${String(
      sec
    ).padStart(2, 0)}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';

      containerApp.style.opacity = 0;
    }
    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

const calcDates = (date, locale) => {
  const calcDayPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDayPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = date.getDate();
    // const month = date.getMonth() + 1;
    // const year = date.getFullYear();

    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurrency = num => {
  return new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'INR',
  }).format(num);
};

const displayMovements = (acc, sort = false) => {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    let type;
    mov > 0 ? (type = 'deposit') : (type = 'withdrawal');

    const now = new Date(acc.movementsDates[i]);
    const display = calcDates(now, acc.locale);

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
     <div class="movements__date">${display}</div>
          
          <div class="movements__value">${formatCurrency(mov)}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1);

const calcPrintBalance = acc => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${formatCurrency(acc.balance)}`;
};

calcPrintBalance(account1);

const calcDisplaySummary = acc => {
  const incomes = acc.movements
    .filter(m => m > 0)
    .reduce((acc, i) => acc + i, 0);
  labelSumIn.textContent = `${formatCurrency(Math.abs(incomes))}`;
  const outCome = acc.movements
    .filter(m => m < 0)
    .reduce((acc, i) => acc + i, 0);
  const interest = acc.movements
    .filter(m => m > 0)
    .map(v => (v * acc.interestRate) / 100)
    .filter(i => i >= 1)
    .reduce((acc, i) => acc + i, 0);
  labelSumOut.textContent = `${formatCurrency(Math.abs(outCome))}`;

  labelSumInterest.textContent = `${formatCurrency(interest)}`;
};

// calcDisplaySummary(account1.movements);

const createUserName = acc => {
  acc.forEach((Acc, i) => {
    Acc.username = Acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserName(accounts);

const update = acc => {
  calcDisplaySummary(acc);
  calcPrintBalance(acc);
  displayMovements(acc);
};

let currentAccount, timer;

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours();
    const min = now.getMinutes();

    timer && clearInterval(timer);
    timer = startLogout();
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    containerApp.style.opacity = '1';
    labelWelcome.textContent = `Hey! ${currentAccount.owner.split(' ')[0]}`;
    update(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    currentAccount.username !== receiverAccount?.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());

    update(currentAccount);
    clearInterval(timer);
    timer = startLogout();
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some(value => value >= amount * 0.1)
  ) {
    setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      update(currentAccount);
      clearInterval(timer);
      timer = startLogout();
    }, 3000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log('delete');

    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sort = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount, !sort);
  sort = !sort;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const randomINt = (min, max) => {
//   console.log(max - min);
//   return Math.trunc(Math.random() * (max - min) + 1) + min;
// };

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(randomINt(99, 88));
// /////////////////////////////////////////////////

// // const checkAgeForDog = (dogsJulie, dogKate) => {
// //   const OnlyDogsJulie = dogsJulie.slice(1, dogsJulie.length - 2);
// //   const Dogs = [...OnlyDogsJulie, ...dogKate];
// //   Dogs.forEach((dog, i) => {
// //     dog >= 3
// //       ? console.log(`Dog + ${i + 1} is an adult, and is ${dog} year old`)
// //       : console.log(`Dog + ${i + 1} is still a puppy🤔`);
// //   });

// //   console.log(dogsJulie, dogKate, OnlyDogsJulie);
// // };

// // checkAgeForDog([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// // const eurtoUsd = 1.1;

// // const USD = movements.map(value => {
// //   return (value * eurtoUsd).toFixed(2);
// // });

// // console.log(USD);

// // const dogHumanAge = Arr => {
// //   const CovOne = Arr.map(value => {
// //     return value <= 2 ? 2 * value : 16 + value + 4;
// //   });

// //   const filterOne = CovOne.filter(v => v > 18);
// // };

// // dogHumanAge([5, 2, 4, 1, 15, 8, 3]);

// const y = Array.from({ length: 7 }, () => 1);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);

// console.log(y, z);
// const k = '';

// console.log(Array.from(k));

// labelBalance.addEventListener('click', () => {
//   const mov = Array.from(
//     document.querySelectorAll('.movements__value'),
//     e => e.textContent
//   );

//   console.log(mov.sort((a, b) => a - b));
// });

// const dia = 1500;
// console.log(dia, 'dk');

// console.log(new Date(account1.movementsDates[0]));
// console.log(new Date(2037, 10, 19, 15, 23, 5));
// console.log(new Date(9));

// // working with dates

// const future = new Date(20);

// const future1 = new Date(2037, 10, 19, 15, 23);
// console.log(+future);

// // for difference

// const calcDayPassed = (date1, date2) => {
//   return Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
// };

// const days1 = calcDayPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));

// console.log(days1);

// // checking the API

// const new1 = new Date();

// labelDate.textContent = new Intl.DateTimeFormat('en-IN', {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long',
//   year: '2-digit',
//   weekday: 'short',
// }).format(new1);

// console.log('Current Date', labelDate.textContent);

// const locale = navigator.language;

// console.log(locale);

// const NumberCheck = new Intl.NumberFormat(navigator.language, {
//   style: 'currency',
//   currency: 'INR',
// }).format(32);

// console.log(NumberCheck);

// settimeout

// const ingredients = ['olives', 'spinach'];

// const pizzaTimer = setTimeout(() => console.log("I'm back with Pizza!"), 3000);
// console.log('Waiting,....');
// ingredients.includes('olive') && clearTimeout(pizzaTimer);

// // setinterval - in period of interval time it'll execute

// setInterval(() => {
//   const clock = new Date();

//   console.log(
//     `${clock.getHours()}:${clock.getMinutes()}:${clock.getSeconds()}`
//   );
//   console.log(clock.getTime());
// }, 4000);

//timestamp - gettime. date.now();
