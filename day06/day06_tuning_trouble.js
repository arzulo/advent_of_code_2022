const fs = require('fs');
// Read input file synchronously
let input_data;
try {
  input_data = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
  console.error(err);
  exit;
}

// Subroutine to find marker location for given sequence and sequence difference length
function findMarker(seq, seq_diff) {
    // starting marker location can't be any earlier than the seq length
    let seqlen = seq.length;
    let substr, setsize;
    // Loop through the length of seq - diff length.  Keep slicing and finding set size
    for(var i = 0; i < seqlen-seq_diff; i++) {
        substr = seq.slice(i, i+seq_diff);
        setsize = new Set(substr).size;
        if(setsize == seq_diff) {
            console.log(`Marker location for sequence length ${seq_diff} found at index: ${i+seq_diff}`);
            return;
        }
    }
}

// Split the input string into array elements
input_data = input_data.split('');

// Find the marker spot for 4 unique values
findMarker(input_data, 4);
findMarker(input_data, 14);
