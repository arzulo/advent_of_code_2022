const { group } = require('console');
const fs = require('fs');
// Read file in synchronously
let input_data;
try {
	input_data = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
	console.error(err);
	exit;
}

let priority_sum = 0;
// Build a complete file mapping
input_data.split(/\r?\n/).forEach(line => {

	var len = line.length;
	line = line.split('');
	var comp1 = line.splice(0,len/2);
	var comp2 = line; // remainder is comp2 after splicing

	// for(let i in comp1) {
	for(var i = 0; i < comp1.length; i++) {
		if(comp2.includes(comp1[i])) {

			if(comp1[i].charCodeAt(0) >=97) { // lowercase
				priority_sum += (comp1[i].charCodeAt(0)-96);
				break;
			} else { // Uppercase
				priority_sum += (comp1[i].charCodeAt(0)-38);
				break;
			}

		}
	}
});

// Part 2 answer 
let priority_sum2 = 0;
let group_buffer = [];
let group1, group2, group3;
// Build a complete file mapping
input_data.split(/\r?\n/).forEach(line => {

	group_buffer.push(line);
	// Loop until we buffer 3 groups to search through
	if(group_buffer.length != 3) {
		return;
	}
	// Separate the groups
	group1 = group_buffer[0];
	group2 = group_buffer[1];
	group3 = group_buffer[2];

	for(var i = 0; i < group1.length; i++) {
		if(group2.includes(group1[i]) && group3.includes(group1[i])) {

			if(group1[i].charCodeAt(0) >=97) { // lowercase
				priority_sum2 += (group1[i].charCodeAt(0)-96);
				break;
			} else { // Uppercase
				priority_sum2 += (group1[i].charCodeAt(0)-38);
				break;
			}

		}
	}
	// Reset the buffer
	group_buffer = [];
});

// Part 1 answer
console.log(`Priority sum for part 1: ${priority_sum}`);
// Part 2 answer
console.log(`Priority sum for part 2: ${priority_sum2}`);