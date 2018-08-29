class Helpers {
	static formatDate = (date) => {
		var months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		]

		var dayOfWeek = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		]

		var array = date.split('-');
		var month = Number(array[1]);
		var day = Number(array[2]);
		var cc = Number(array[0].slice(0, 2));
		var yy = Number(array[0].slice(2));
		var mm;
		var result;
		cc = (Math.floor(cc / 4)) - (2 * cc) - 1;
		yy = Math.floor((5 * yy) / 4);
		mm = Math.floor((26 * (month + 1)) / 10);
		result = (yy + cc + mm + day) % 7;

		return (dayOfWeek[result] + " " + months[month - 1] + " " + array[2]);
	}

	static convertTime = (time) => {
		var array = time.split(':');

		var hours = Number(array[0]);
		var minutes = Number(array[1]);

		var timeValue;

		if (hours > 0 && hours <= 12) {
			timeValue= "" + hours;
		} else if (hours > 12) {
			timeValue= "" + (hours - 12);
		} else if (hours === 0) {
			timeValue= "12";
		}

		timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
		timeValue += (hours >= 12) ? " pm" : " am";

		return (timeValue);
	}
}

export default Helpers;
