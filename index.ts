#! /usr/bin/env node

import inquirer from 'inquirer';

// Initialize ATM balance and PIN
let balance = 1000;
const correctPin = '1122';

// ATM options
const options = [
  { name: 'Check Balance', value: 'checkBalance' },
  { name: 'Withdraw Money', value: 'withdrawMoney' },
  { name: 'Exit', value: 'exit' }
];

// Main ATM function
async function atm() {
  const pinAnswer = await inquirer.prompt({
    type: 'password',
    name: 'pin',
    message: 'Enter your PIN code:',
    mask: '*' // Mask PIN input
  });

  if (pinAnswer.pin !== correctPin) {
    console.log('Incorrect PIN. Please try again.');
    atm();
    return;
  }

  const answer = await inquirer.prompt({
    type: 'list',
    name: 'option',
    message: 'Select an option:',
    choices: options
  });

  switch (answer.option) {
    case 'checkBalance':
      console.log(`Your balance: $${balance}`);
      break;
    case 'withdrawMoney':
      const amountAnswer = await inquirer.prompt({
        type: 'number',
        name: 'amount',
        message: 'Enter the amount to withdraw:',
        validate: (input) => input > 0 && input <= balance || 'Invalid amount'
      });
      balance -= amountAnswer.amount;
      console.log(`Withdrawn: $${amountAnswer.amount}, Remaining balance: $${balance}`);
      break;
    case 'exit':
      console.log('Exiting...');
      return;
  }

  // Recursively call the ATM function to continue
  atm();
}

// Start the ATM
atm();
