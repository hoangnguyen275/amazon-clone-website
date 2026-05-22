import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

  deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId){
        deliveryOption = option;
      }
    });
  return deliveryOption || deliveryOptions[0];
}

export function isWeekend(date){
  const dateNeededChecked = date.format('dddd');
  if (dateNeededChecked === 'Saturday' || dateNeededChecked === 'Sunday'){
    return true;
  }
  return false;
}

export function calculateDeliveryDate(deliveryOption, orderDate, deliveryOptionDays){
  const today = (!orderDate) ? dayjs() : orderDate;
  let deliveryDays = 0;
  let remainingDays = deliveryOption?.deliveryDays ?? deliveryOptionDays;
  while (remainingDays > 0){
    deliveryDays += 1;
    if (isWeekend(today.add(deliveryDays, 'days'))){
      continue;
    }
    remainingDays -= 1;
  }
  let deliveryDate = today.add(deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}