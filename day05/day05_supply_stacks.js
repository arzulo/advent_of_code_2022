const fs = require('fs');

// Read file in synchronously
let input_data;
try {
	input_data = fs.readFileSync('./day05/input.txt', 'utf8');
} catch (err) {
	console.error(err);
	exit;
}

// Initialize a 2d array that contains the crate info
let col_data = [];
let col_data_9001 = []; // for part 2
let num_elves = 9;
for(var i = 0; i < num_elves; i++) {
	col_data.push([]);
	col_data_9001.push([]);
}

// Regexp patterns for matching instructions
let pat = /move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)/;
// let pat2 = /move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)/;
let tokens;

// Flag for initialization read
let init = true;
let row;
input_data.split(/\r?\n/).forEach(line => {

	// There are a couple of blank lines in the input, skip over those
	if(line == '') {
		return;
	}
	// Build the starting conditions first
	// Figure out the starting letters in each row
	if(init) {
		// If we are past the initialization phase, set flag and exit
		// if(line[0] == ' ') {
		if(!line.includes("[")) {
			init = false;
			return;
		}
		row = line.replace(/[\[\]]/g, '').replace(/\s\s\s\s/g, ' ').split(' ')
		for(var i = 0; i<num_elves; i++) {
			if(row[i] != '') {
				col_data[i].unshift(row[i]);
				col_data_9001[i].unshift(row[i]);
			}
		}
		return;
	}

	// Execute the regular expression on the line to get the instruction parsed into tokens
	tokens 		= pat.exec(line);
	try { 
	var moves 	= Number(tokens[1]);
	} catch{
		console.log('test');
	}
	var from_ind 	= Number(tokens[2])-1;
	var to_ind	= Number(tokens[3])-1;
	
	// Execute the instructions (part 1)
	for(var i = 0; i < moves; i++) {
		var popped = col_data[from_ind].pop();
		col_data[to_ind].push(popped);
	}

	// Run machine 9001 (question part 2)
	var crates_9001 = col_data_9001[from_ind].splice(-moves);
	col_data_9001[to_ind].push(...crates_9001);
})

let final_msg = [];
let final_msg_9001 = [];
for(var i = 0; i<num_elves; i++) {
	var popped = col_data[i].pop();
	var popped_9001 = col_data_9001[i].pop();
	final_msg.push(popped);
	final_msg_9001.push(popped_9001);
}

console.log(`The final message part 1 is ${final_msg.join('')}`);
console.log(`The final message part 2 is ${final_msg_9001.join('')}`);