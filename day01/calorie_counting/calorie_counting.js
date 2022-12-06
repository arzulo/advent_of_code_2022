const fs = require('fs');

// Read file in synchronously
let input_data;
try {
  input_data = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
  console.error(err);
  exit;
}
// Array of arrays
let elves_calories_grid = new Array(new Array()); // initialize 2d grid
let calorie_sums        = new Array();
let curr_elf_ind = 0;
let curr_cal;

// Reach each line one by one
input_data.split(/\r?\n/).forEach( line => {
  // Convert the string to base 10 int
  curr_cal = parseInt(line, 10);
  // If the line read back NaN, it's a new elf. Otherwise push to current elf
  if(isNaN(curr_cal)) {
    calorie_sums.push(elves_calories_grid[curr_elf_ind].reduce((partialSum, a) => partialSum + a, 0));
    curr_elf_ind++;
    elves_calories_grid.push(new Array());
  } else {
    elves_calories_grid[curr_elf_ind].push(curr_cal);
  }
})

// Find the max value
let elf_largest_calories = Math.max(...calorie_sums);

// Report the result
console.log(`The elf with the largest calorie collection has ${elf_largest_calories} calories!`)