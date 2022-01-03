'use strict';

/////////////////////////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Phie Raditya',
  movements: [
    200000, 450000, -400000, 3000000, -650000, -130000, 70000, 1300000,
  ],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Bima Arya',
  movements: [
    5000000, 3400000, -150000, -790000, -3210000, -1000000, 8500000, -30000,
  ],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Nike Nora',
  movements: [200000, -200000, 340000, -300000, -20000, 50000, 400000, -460000],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Ayi Pratiwi',
  movements: [430000, 1000000, 700000, 50000, 90000],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////
// Functions
const displayMovements = function (movements) {
  containerMovements.innerHTML = null;

  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUsernames(accounts);

/////////////////////////////////////////////////////////////////////
// Event handlers
