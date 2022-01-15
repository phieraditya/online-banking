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
  movementDates: [
    '2021-01-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2021-05-27T17:01:17.194Z',
    '2021-07-11T23:36:17.929Z',
    '2021-12-18T21:31:17.178Z',
    '2022-01-05T07:42:02.383Z',
    '2022-01-09T14:11:59.604Z',
    '2022-01-10T10:51:36.790Z',
  ],
  currency: 'IDR',
  locale: 'id-ID',
};

const account2 = {
  owner: 'Bima Arya',
  movements: [
    5000000, 3400000, -150000, -790000, -3210000, -1000000, 8500000, -30000,
  ],
  interestRate: 1.5,
  pin: 2222,
  movementDates: [
    '2021-01-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2021-05-27T17:01:17.194Z',
    '2021-06-27T17:01:17.194Z',
    '2021-07-11T23:36:17.929Z',
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2022-01-08T14:11:59.604Z',
    '2022-01-10T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Nike Nora',
  movements: [200000, -200000, 340000, -300000, -20000, 50000, 400000, -460000],
  interestRate: 0.7,
  pin: 3333,
  movementDates: [
    '2021-01-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2021-05-27T17:01:17.194Z',
    '2021-06-27T17:01:17.194Z',
    '2021-07-11T23:36:17.929Z',
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2022-01-08T14:11:59.604Z',
    '2022-01-10T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'de-DE',
};

const account4 = {
  owner: 'Ayi Pratiwi',
  movements: [430000, 1000000, 700000, 50000, 90000],
  interestRate: 1,
  pin: 4444,
  movementDates: [
    '2021-07-11T23:36:17.929Z',
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2022-01-08T14:11:59.604Z',
    '2022-01-10T10:51:36.790Z',
  ],
  currency: 'SEK',
  locale: 'sv-SE',
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
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 1) return 'Today';
  if (daysPassed === 2) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = null;

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCurrency(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(
    Math.abs(outcomes),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1000)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
};

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

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
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }!`;
    containerApp.style.opacity = 1;

    // Create current date and time
    const now = new Date();
    const options = {
      // weekday: 'long',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    // const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = now.getMinutes();
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = null;

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // Clear input fields
  inputTransferTo.value = inputTransferAmount.value = null;

  // Check if transfer valid
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementDates.push(new Date().toISOString());
    receiverAcc.movementDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 5000);
  }
  // Clear input fields
  inputLoanAmount.value = null;
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  // Clear input fields
  inputCloseUsername.value = inputClosePin.value = null;
});

let sorted = false;
btnSort.addEventListener('click', function () {
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
