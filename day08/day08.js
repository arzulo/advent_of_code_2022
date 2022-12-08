const fs = require('fs');
// Read file in synchronously
let input_data;
try {
	input_data = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
	console.error(err);
	exit;
}

let forest = [];
let visible_mask = [];
// Build a complete file mapping
input_data.split(/\r?\n/).forEach(line => {
	var row_nums = line.split('').map(element => {
		return Number(element);
	});
	// Add this row to the first
	forest.push(row_nums);
	visible_mask.push(new Array(row_nums.length).fill(0));
});

let forest_len_dim1 = forest.length;
let forest_len_dim2 = forest[0].length;
// let visible_trees = (forest_len_dim2-1)*2 + (forest_len_dim1-1)*2;
let visible_trees = 0;
let visible;


// Figure out part 1
let edge_val = -1;
for(var i = 0; i < forest_len_dim1; i++) {
	edge_val = -1;
	for(var j = 0; j < forest_len_dim2; j++) {

		if(forest[i][j] > edge_val) {
			visible_mask[i][j] = 1;
			edge_val = forest[i][j];
		} else {
		}

	}
}
for(var i = 0; i < forest_len_dim1; i++) {
	edge_val = -1;
	for(var j = forest_len_dim2-1; j >= 0; j--) {

		if(forest[i][j] > edge_val) {
			visible_mask[i][j] = 1;
			edge_val = forest[i][j];
		} else {
		}

	}
}

for(var j = 0; j < forest_len_dim2; j++) {
	edge_val = -1;
	for(var i = 0; i < forest_len_dim1; i++) {

		if(forest[i][j] > edge_val) {
			visible_mask[i][j] = 1;
			edge_val = forest[i][j];
		} else {
		}

	}
}

for(var j = 0; j < forest_len_dim2; j++) {
	edge_val = -1;
	for(var i = forest_len_dim1-1; i >= 0; i--) {

		if(forest[i][j] > edge_val) {
			visible_mask[i][j] = 1;
			edge_val = forest[i][j];
		} else {
		}

	}
}

// Helper function for part 2
function findVisiblity(dir, _i, _j) {
	let height = forest[_i][_j];
	let dist = 0;
	switch(dir) {
		case 'r':
			for(var z = _j+1; z<forest_len_dim2; z++) {
				if(forest[_i][z] < height) {
					dist++;
				} else if(forest[_i][z] == height) {
					dist++;
					break;
				} else {
					break;
				}
			}
			return dist;

		break;
		case 'l':
			for(var z = _j-1; z>=0; z--) {
				if(forest[_i][z] < height) {
					dist++;
				} else if(forest[_i][z] == height) {
					dist++;
					break;
				} else {
					break;
				}
			}
			return dist;
		break;

		case 'u':
			for(var z = _i-1; z>=0; z--) {
				if(forest[z][_j] < height) {
					dist++;
				} else if(forest[z][_j] == height) {
					dist++;
					break;
				} else {
					break;
				}
			}
			return dist;
		break;
		case 'd':
			for(var z = _i+1; z<forest_len_dim1; z++) {
				if(forest[z][_j] < height) {
					dist++;
				} else if(forest[z][_j] == height) {
					dist++;
					break;
				} else {
					break;
				}
			}
			return dist;

		break;
	}
	return dist;
}


// sum up the bit mask
let sum = 0;
for(var i = 0; i<forest_len_dim1; i++) {
	sum += visible_mask[i].reduce((partialSum, a) => partialSum + a, 0);
}

// Figure out the best visiblity score
let bestscore = 0;
let curr_score ;
for(var i = 0; i<forest_len_dim1; i++) {
	for(var j = 0; j<forest_len_dim2; j++) {
		curr_score = findVisiblity('r', i, j)*findVisiblity('d', i, j)*findVisiblity('l', i, j)*findVisiblity('u', i, j);
		if(curr_score > bestscore) {
			bestscore = curr_score;
		}
	}
}



console.log(sum);
console.log(bestscore);