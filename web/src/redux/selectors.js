import moment from 'moment'; // https://momentjs.com/docs/#/displaying/format/

// function to define if the events is in progress, to come or finished (in eventDetails)
export const getEventStatus = (dateStart, dateEnd) => {
  const now = new Date();
  const start = new Date(dateStart);
  const end = new Date(dateEnd);

  let eventState = 'A venir';
  if (moment(start).isBefore(now) && moment(end).isAfter(now)) {
    eventState = 'En cours';
  }
  if (moment(now).isAfter(end)) {
    eventState = 'Terminé';
  }
  return eventState;
};

// function to display the end date of the event if this event lasts more one day (in eventDetails)
export const getEventDate = (dateStart, dateEnd) => {
  let start = new Date(dateStart);
  let end = new Date(dateEnd);

  start = moment(start, 'YYYY-MM-DD').locale('fr').format('dddd DD/MM/YYYY');
  end = moment(end, 'YYYY-MM-DD').locale('fr').format('dddd DD/MM/YYYY');

  if (end !== start) {
    return `Du ${start} au ${end}`;
  }
  return start;
};


/**
 * @param {number} totalElt total number of the elements in the slider
 * @param {number} slide css left value of the block who content the elements
 * @param {number} width
 * @param {function} action to the dispatch
 * @param {string} dir direction
 */
export const slider = (totalElt, slide, width, action, dir) => {

  // for slide to the right
  if (dir === 'right' && (totalElt * -width) !== slide) {
    slide -= width;
    action(slide);
  }

  // for slide to the left
  if (dir === 'left' && slide !== 0) {
    slide += width;
    action(slide);
  }
};

/**
 * @param {string} address
 * @var addressArray return an array with an address for each line
 * @var lastIndex get the element number of the table - 1, the last index
 */
export const getCity = (address) => {
  const addressArray = address.split('<br />');
  const lastIndex = addressArray.length - 1;
  return addressArray[lastIndex];
};
