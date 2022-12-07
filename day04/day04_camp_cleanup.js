const fs = require('fs');
// Read file in synchronously
let input_data;
try {
	input_data = fs.readFileSync('./day04/input.txt', 'utf8');
} catch (err) {
	console.error(err);
	exit;
}

let ranges, elf1_range, elf2_range, elf1_min, elf1_max, elf2_min, elf2_max;
let overlaps_part1 = 0;
let overlaps_part2 = 0;

// Build a complete file mapping
input_data.split(/\r?\n/).forEach(line => {

	// Just read in each min/max number and compare
	ranges = line.split(',');
	elf1_range = ranges[0].split('-');
	elf2_range = ranges[1].split('-');
	elf1_min = Number(elf1_range[0]);
	elf1_max = Number(elf1_range[1]);
	elf2_min = Number(elf2_range[0]);
	elf2_max = Number(elf2_range[1]);

	// Part 1
	if (((elf1_max <= elf2_max) && (elf1_min >= elf2_min)) ||
		((elf2_max <= elf1_max) && (elf2_min >= elf1_min))) {
		overlaps_part1++;
	}
	// Part 2 
	if (
		(((elf1_max <= elf2_max) && (elf1_max >= elf2_min)) ||
		((elf1_min <= elf2_max) && (elf1_min >= elf2_min))) ||
		(((elf2_max <= elf1_max) && (elf2_max >= elf1_min)) ||
		((elf2_min <= elf1_max) && (elf2_min >= elf1_min)))) {
		overlaps_part2++;
	}
});


console.log(`The amount of overlaps (part 1) is ${overlaps_part1}`);
console.log(`The amount of overlaps (part 2) is ${overlaps_part2}`);