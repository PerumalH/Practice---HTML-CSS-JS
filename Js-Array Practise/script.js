'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
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

const displayMovements = (movements, sort = false) => {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    let type;
    mov > 0 ? (type = 'deposit') : (type = 'withdrawal');
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          
          <div class="movements__value">${mov}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

const calcPrintBalance = acc => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance} EUR`;
};

calcPrintBalance(account1);

const calcDisplaySummary = acc => {
  const incomes = acc.movements
    .filter(m => m > 0)
    .reduce((acc, i) => acc + i, 0);
  labelSumIn.textContent = `${incomes}`;
  const outCome = acc.movements
    .filter(m => m < 0)
    .reduce((acc, i) => acc + i, 0);
  const interest = acc.movements
    .filter(m => m > 0)
    .map(v => (v * acc.interestRate) / 100)
    .filter(i => i >= 1)
    .reduce((acc, i) => acc + i, 0);
  labelSumOut.textContent = `${Math.abs(outCome)}`;

  labelSumInterest.textContent = `${interest}`;
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
  displayMovements(acc.movements);
};

let currentAccount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    containerApp.style.opacity = '1';
    labelWelcome.textContent = `Hey! ${currentAccount.owner.split(' ')[0]}`;
    update(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
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

    update(currentAccount);
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some(value => value >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    update(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
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
  displayMovements(currentAccount.movements, !sort);
  sort = !sort;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const checkAgeForDog = (dogsJulie, dogKate) => {
//   const OnlyDogsJulie = dogsJulie.slice(1, dogsJulie.length - 2);
//   const Dogs = [...OnlyDogsJulie, ...dogKate];
//   Dogs.forEach((dog, i) => {
//     dog >= 3
//       ? console.log(`Dog number ${i + 1} is an adult, and is ${dog} year old`)
//       : console.log(`Dog number ${i + 1} is still a puppy🤔`);
//   });

//   console.log(dogsJulie, dogKate, OnlyDogsJulie);
// };

// checkAgeForDog([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// const eurtoUsd = 1.1;

// const USD = movements.map(value => {
//   return (value * eurtoUsd).toFixed(2);
// });

// console.log(USD);

// const dogHumanAge = Arr => {
//   const CovOne = Arr.map(value => {
//     return value <= 2 ? 2 * value : 16 + value + 4;
//   });

//   const filterOne = CovOne.filter(v => v > 18);
// };

// dogHumanAge([5, 2, 4, 1, 15, 8, 3]);
