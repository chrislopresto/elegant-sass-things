import moment from 'moment';

const MESSAGE = 'a message';

window.moment = moment;

(function() {
  console.log(MESSAGE);
  console.log('the time is ', moment().format());
}());
