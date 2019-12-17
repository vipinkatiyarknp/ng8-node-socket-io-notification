const moment = require('moment');

const marketPositions = [
	{ "date": "10-05-2012", "close": 68.55, "open": 74.55, 'bg':'#FFF' },
	{ "date": "09-05-2012", "close": 74.55, "open": 69.55, 'bg':'#FFF' },
	{ "date": "08-05-2012", "close": 69.55, "open": 62.55, 'bg':'#FFF' },
	{ "date": "07-05-2012", "close": 62.55, "open": 56.55, 'bg':'#FFF' },
	{ "date": "06-05-2012", "close": 56.55, "open": 59.55, 'bg':'#FFF' }
];

let counter = 0;

function updateMarket() {
	const diff = Math.floor(Math.random() * 1000) / 100;
	const lastDay = moment(marketPositions[0].date, 'DD-MM-YYYY').add(1, 'days');
	let open;
	let close;

	if (counter % 2 === 0) {
		open = marketPositions[0].open + diff;
		close = marketPositions[0].close + diff;
	} else {
		open = Math.abs(marketPositions[0].open - diff);
		close = Math.abs(marketPositions[0].close - diff);
	}

	marketPositions.unshift({
		date: lastDay.format('DD-MM-YYYY'),
		open,
		close
	});
	counter++;
}

module.exports = {
	marketPositions,
	updateMarket
};