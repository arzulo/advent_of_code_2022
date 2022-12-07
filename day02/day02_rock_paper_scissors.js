const fs = require('fs');

// Read file in synchronously
let input_data;
try {
	input_data = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
	console.error(err);
	exit;
}


function encryptedMethod1() {
	let points = 0;

	// Reach each line one by one
	input_data.split(/\r?\n/).forEach(line => {
	let plays = line.split(' ');
	switch (plays[1]) {
		case 'X':
			// Points for round outcome
			points += (plays[0] == 'A') ? 3 : ((plays[0] == 'B') ? 0 : 6);
			// Points for hand played
			points += 1;
			break;
		case 'Y':
			// Points for round outcome
			points += (plays[0] == 'B') ? 3 : ((plays[0] == 'C') ? 0 : 6);
			// Points for hand played
			points += 2;
			break;
		case 'Z':
			// Points for round outcome
			points += (plays[0] == 'C') ? 3 : ((plays[0] == 'A') ? 0 : 6);
			// Points for hand played
			points += 3;
			break;
	}
	});
	console.log(`With encryption method #1, you earned a total of ${points} points!`);
}

function encryptedMethod2() {
	let points = 0;

	// Reach each line one by one
	input_data.split(/\r?\n/).forEach(line => {
	let plays = line.split(' ');
	switch (plays[1]) {
		case 'X':
			// Points for round outcome
			points += (plays[0] == 'A') ? 3 : ((plays[0] == 'B') ? 1 : 2);
			// Points for loss
			points += 0;
			break;
		case 'Y':
			// Points for round outcome
			points += (plays[0] == 'B') ? 2 : ((plays[0] == 'C') ? 3 : 1);
			// Points for draw
			points += 3;
			break;
		case 'Z':
			// Points for round outcome
			points += (plays[0] == 'C') ? 1 : ((plays[0] == 'A') ? 2 : 3);
			// Points for win 
			points += 6;
			break;
	}
	});
	console.log(`With encryption method #2, you earned a total of ${points} points!`);
}

encryptedMethod1();
encryptedMethod2();