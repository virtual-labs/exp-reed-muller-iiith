// Global variables
let m = 0;  // Number of variables
let r = 0;  // Order of Reed-Muller code
let generatorMatrix = [];
let parityCheckMatrix = [];
let currentLRow = 0;
let currentPRow = 0;
let matrixLength = 0;

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    generateReedMullerCode();
});

// Generate random Reed-Muller code parameters and matrices
function generateReedMullerCode() {
    // Generate random m (number of variables) between 2 and 5
    m = Math.floor(Math.random() * 4) + 2;
    
    // Generate random r (order) between 0 and m-1
    r = Math.floor(Math.random() * m);
    
    // Calculate code parameters
    matrixLength = Math.pow(2, m);
    
    // Generate matrices
    generatorMatrix = generateReedMullerGeneratorMatrix(r, m);
    parityCheckMatrix = generateReedMullerGeneratorMatrix(m-r-1, m);
    
    // Choose random row indices for testing
    currentLRow = Math.floor(Math.random() * generatorMatrix.length);
    currentPRow = Math.floor(Math.random() * parityCheckMatrix.length);
    
    // Display parameters and matrix information
    displayCodeParameters();
    displayMatrixInfo();
}

// Generate Reed-Muller generator matrix recursively
function generateReedMullerGeneratorMatrix(r, m) {
    // Base cases
    if (r === 0) {
        // RM(0,m) has only the all-ones vector
        return [Array(Math.pow(2, m)).fill(1)];
    }
    
    if (r === m) {
        // RM(m,m) contains all binary vectors of length 2^m
        const matrix = [];
        const size = Math.pow(2, m);
        
        // First row is all ones (RM(0,m))
        matrix.push(Array(size).fill(1));
        
        // Add identity matrix rows
        for (let i = 0; i < size - 1; i++) {
            const row = Array(size).fill(0);
            row[i + 1] = 1;
            matrix.push(row);
        }
        
        return matrix;
    }
    
    // Recursive case using Plotkin construction
    const upperMatrix = generateReedMullerGeneratorMatrix(r, m-1);
    const lowerMatrix = generateReedMullerGeneratorMatrix(r-1, m-1);
    
    const matrix = [];
    const halfSize = Math.pow(2, m-1);
    
    // Add [RM(r,m-1) | RM(r,m-1)]
    for (let i = 0; i < upperMatrix.length; i++) {
        const row = [...upperMatrix[i], ...upperMatrix[i]];
        matrix.push(row);
    }
    
    // Add [0 | RM(r-1,m-1)]
    for (let i = 0; i < lowerMatrix.length; i++) {
        const row = Array(halfSize).fill(0).concat(lowerMatrix[i]);
        matrix.push(row);
    }
    
    return matrix;
}

// Display Reed-Muller code parameters
function displayCodeParameters() {
    const codeParamsElement = document.getElementById('codeParameters');
    
    // Calculate dimension of the code (number of rows in generator matrix)
    const dimension = generatorMatrix.length;
    
    // Calculate minimum distance
    const minDistance = Math.pow(2, m-r);
    
    // Format parameters display
    let paramsHTML = `
        <p><strong>Reed-Muller Code: RM(${r}, ${m})</strong></p>
        <p>Code length: ${matrixLength}</p>
        <p>Dimension: ${dimension}</p>
        <p>Minimum distance: ${minDistance}</p>
        <p>Dual code: RM(${m-r-1}, ${m})</p>
        <p>Generator matrix dimensions: ${dimension} × ${matrixLength}</p>
        <p>Parity check matrix dimensions: ${parityCheckMatrix.length} × ${matrixLength}</p>
        <p>Selected rows for testing: Generator[${currentLRow}], Parity[${currentPRow}]</p>
    `;
    
    // Update the HTML
    codeParamsElement.innerHTML = paramsHTML;
}

// Display matrix information
function displayMatrixInfo() {
    const matrixInfoElement = document.getElementById('matrixInfo');
    
    // Only display a limited number of rows if matrices are large
    const maxRowsToShow = 5;
    const genRowsToShow = Math.min(generatorMatrix.length, maxRowsToShow);
    const parityRowsToShow = Math.min(parityCheckMatrix.length, maxRowsToShow);
    
    let matrixHTML = "<p><strong>Matrix Information:</strong></p>";
    
    // Generator matrix preview
    matrixHTML += "<p>Generator Matrix (first few rows):</p>";
    for (let i = 0; i < genRowsToShow; i++) {
        if (i === currentLRow) {
            matrixHTML += `<p><strong>Row ${i} (selected): [${generatorMatrix[i].join(" ")}]</strong></p>`;
        } else {
            matrixHTML += `<p>Row ${i}: [${generatorMatrix[i].join(" ")}]</p>`;
        }
    }
    if (generatorMatrix.length > maxRowsToShow) {
        matrixHTML += "<p>... (more rows not shown)</p>";
    }
    
    // Parity check matrix preview
    matrixHTML += "<p>Parity Check Matrix (first few rows):</p>";
    for (let i = 0; i < parityRowsToShow; i++) {
        if (i === currentPRow) {
            matrixHTML += `<p><strong>Row ${i} (selected): [${parityCheckMatrix[i].join(" ")}]</strong></p>`;
        } else {
            matrixHTML += `<p>Row ${i}: [${parityCheckMatrix[i].join(" ")}]</p>`;
        }
    }
    if (parityCheckMatrix.length > maxRowsToShow) {
        matrixHTML += "<p>... (more rows not shown)</p>";
    }
    
    // Update the HTML
    matrixInfoElement.innerHTML = matrixHTML;
}