const fs = require('fs');

// Read file in synchronously
let input_data;
try {
	input_data = fs.readFileSync('./day07/input.txt', 'utf8');
} catch (err) {
	console.error(err);
	exit;
}


let dir_map = {};
let working_dir;
let dir_stack = [];
let cmd;

// Build a complete file mapping
input_data.split(/\r?\n/).forEach(line => {
	cmd = line.split(' ');
	// Figure out if a command was done
	if(cmd[0] == '$') {
		// split the command arguments
		switch(cmd[1]) {
			case 'cd':
				switch(cmd[2]) {

					case '/':
						working_dir = dir_map;
						dir_stack.push(dir_map);
						break;

					case '..':
						// Remove the directoy from the stack.
						// Figure out the one at the end, go there (cd down)
						dir_stack.pop();
						working_dir = dir_stack[dir_stack.length-1];
						break;
					default:
						// CD into the next directory, then add it to the stack
						working_dir = working_dir[cmd[2]];
						dir_stack.push(working_dir);
						break;

				}
			break;
			case 'ls':
				// do nothing
				break;
		}
	} else {

		if(cmd[0] == 'dir') {
			// Create new directory if we haven't made a mention of it yet
			!(cmd[1] in working_dir) && (working_dir[cmd[1]] = {});
		} else { // has to be a file
			var filesize = Number(cmd[0]);
			var filename = cmd[1];
			working_dir[filename] = filesize;
		}



	}

});


let directory_sizes = [];
function recursive_size(curr_dir) {
	var size = 0;
	Object.keys(curr_dir).forEach(key => {
		if((typeof curr_dir[key]) == 'object') {
			size += recursive_size(curr_dir[key]);
		} else {
			size += curr_dir[key];
		}
	});
	directory_sizes.push(size);
	return size;

}

// Now recursively compute the sizes. Make a list of computed directory sizes
recursive_size(dir_map);


// Get the answer to part 1
let final_sum = 0;
// Sum up all directory sizes that are less than or equal to 100000
for(var i = 0; i < directory_sizes.length-1; i++) {
	if(directory_sizes[i] <= 100000) {
		final_sum += directory_sizes[i];
	}
}

// Get the answer to part 2
let total_used_space = directory_sizes[directory_sizes.length-1]; // root will be at end
let unused_space = 70000000 - total_used_space;
let space_needed = 30000000 - unused_space;
// Loop through all dirs to find the one we should delete
let winner_ind = 0;
let winner_val = 10000000000;
for(var i = 0; i < directory_sizes.length-1; i++) {
	if(directory_sizes[i] >= space_needed && directory_sizes[i] < winner_val) {
		winner_ind = i;
		winner_val = directory_sizes[i];
	}

}

console.log(`The sum for the sizes of directories less than 100000 is ${final_sum}`);
console.log(`To free up enough space for the update, we should delete dir with space ${winner_val}`);