'use strict';

// get csv file
const fileInput = document.getElementById("csv");

fileInput.addEventListener('change', () => {

    const reader = new FileReader();
    reader.onload = () => {
        let csvData = reader.result;
        console.log('CSV data loaded.', csvData);
    };

    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
});