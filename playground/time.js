// Unix epic -> UTC
// millisenconds from January 1st 1970 00:00 

const moment = require('moment')

// var date = new Date()
// console.log(date.getMonth());

var date = moment();
// nifty operators
// date.add(100, 'year').subtract(9,'months')
console.log(date.format('Do MMM YYYY'))

var time = moment();
console.log(time.format('h:mm a'))