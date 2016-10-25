import moment from 'moment';

const MESSAGE = 'a message';

window.moment = moment;

window.tick = () => {
  console.log(`The time is ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
};

(function() {
  console.log(MESSAGE);
  window.tick();
}());
