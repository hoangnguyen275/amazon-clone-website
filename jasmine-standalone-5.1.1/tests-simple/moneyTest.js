import {formatCurrency} from '../../scripts/utils/money.js';


console.log('test suite: formatCurrency');

console.log('case 1: 2095');
if (formatCurrency(2095) === '20.95'){
  console.log('passed');
} else {
  console.log('falied');
}

console.log('case 2: 0');
if (formatCurrency(0) === '0.00'){
  console.log('passed');
} else {
  console.log('falied');
}

console.log('case 3: 2000.5');
if (formatCurrency(2000.5) === '20.01'){
  console.log('passed');
} else {
  console.log('falied');
}

console.log('case 4: 2000.4')
if (formatCurrency(2000.4) === '20.00'){
  console.log('passed');
} else {
  console.log('falied');
}

console.log('case 5: -1000')
if (formatCurrency(-1000) === '-10.00'){
  console.log('passed');
} else {
  console.log('falied');
}
console.log(formatCurrency(-1000));