// Constants for monomial generation
const maxDegree = 3;
const maxVariables = 3;
let monomial = [];
let degreeSelected = 0;

// Global variables to store state
let currentEvalVectors = [];
let correctAnswers = [];


// Function to generate a random binary monomial
function generateRandomBinaryMonomial() {
    // Generate random degree (1 to maxDegree)
    // In binary case, degree = number of variables used
    const degree = Math.floor(Math.random() * maxDegree) + 1;

    // Create array of all possible variables
    let allVariables = Array.from({ length: maxVariables }, (_, i) => i + 1);

    // Randomly select 'degree' number of variables
    let selectedVariables = [];
    for (let i = 0; i < degree; i++) {
        const randomIndex = Math.floor(Math.random() * allVariables.length);
        selectedVariables.push(allVariables[randomIndex]);
        // Remove the selected variable to avoid repetition
        allVariables.splice(randomIndex, 1);
    }

    // Sort variables for consistent display
    selectedVariables.sort((a, b) => a - b);

    monomial = selectedVariables; // Save the monomial for later use
    degreeSelected = degree; // Save the degree for later use

    // Format the monomial
    const formattedMonomial = selectedVariables
        .map(num => `X_${num}`)
        .join('');

    return formattedMonomial;
}

// Function to initialize and display the monomial
function initializeMonomial() {
    const monomialElement = document.getElementById('monomial');
    if (monomialElement) {
        const randomMonomial = generateRandomBinaryMonomial();
        // Using MathJax formatting
        monomialElement.innerHTML = `\\(${randomMonomial}\\)`;
        // Trigger MathJax to process the new content
        if (window.MathJax) {
            MathJax.typesetPromise([monomialElement]);
        }
    }
}


function checkDegree() {
    const degreeElement = document.getElementById('degreeInput');
    const degreeValue = parseInt(degreeElement.value);
    const observations = document.getElementById('observation');

    if (degreeValue === degreeSelected) {
        observations.innerHTML = "Correct!";
        observations.style.color = "green";
        document.getElementById('degreeQuestion').style.display = 'none';
        document.getElementById('evaluationQuestion').style.display = 'block';

    }
    else {
        observations.innerHTML = "Incorrect!";
        observations.style.color = "red";
    }
}


// Function to generate all possible binary tuples for given length
function generateBinaryTuples(length) {
    const tuples = [];
    const total = Math.pow(2, length);

    for (let i = 0; i < total; i++) {
        const binary = i.toString(2).padStart(length, '0');
        tuples.push(binary.split('').map(Number));
    }

    return tuples;
}

// Function to evaluate a monomial for given variable values
function evaluateMonomial(monomial, variableValues) {
    // If monomial is empty or 1, return 1
    if (!monomial || monomial === '1') {
        return 1;
    }

    // Split the monomial into individual variables
    const variables = monomial.split('');

    // Initialize result to 1 (multiplicative identity)
    let result = 1;

    // Process each variable in the monomial
    for (let variable of variables) {
        // Convert variable (e.g., 'x1', 'x2', etc.) to array index
        const index = parseInt(variable.replace('X', '')) - 1;

        // If the index is valid, multiply result by the variable's value
        if (index >= 0 && index < variableValues.length) {
            result *= variableValues[index];
        } else {
            console.error(`Invalid variable index in monomial: ${variable}`);
            return 0;
        }
    }

    return result;
}

// Function to evaluate all possible values for a monomial
function evaluateMonomialForAllTuples(monomial, tuples) {
    return tuples.map(tuple => evaluateMonomial(monomial, tuple));
}

// Function to create a styled input cell
function createInputCell() {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.max = '1';
    input.className = 'eval-input';
    input.style.width = '40px';
    input.style.height = '40px';
    input.style.margin = '0 5px';
    input.style.textAlign = 'center';
    input.style.fontSize = '16px';
    return input;
}

// Function to initialize the evaluation table horizontally
function initializeEvalTable() {
    const tuples = generateBinaryTuples(maxVariables);
    currentEvalVectors = tuples;
    correctAnswers = evaluateMonomialForAllTuples(monomial.join(''), currentEvalVectors);


    const container = document.querySelector('.eval-vector-inputs');
    container.innerHTML = ''; // Clear existing content

    // Create a flex container
    const flexContainer = document.createElement('div');
    flexContainer.style.display = 'flex';
    flexContainer.style.flexDirection = 'column';
    flexContainer.style.gap = '20px';
    flexContainer.style.alignItems = 'center';

    // Create tuples row
    const tuplesRow = document.createElement('div');
    tuplesRow.style.display = 'flex';
    tuplesRow.style.gap = '20px';
    tuplesRow.style.alignItems = 'center';

    // Create inputs row
    const inputsRow = document.createElement('div');
    inputsRow.style.display = 'flex';
    inputsRow.style.gap = '20px';
    inputsRow.style.alignItems = 'center';

    tuples.forEach((tuple, index) => {
        // Create tuple display
        const tupleDiv = document.createElement('div');
        tupleDiv.style.width = '50px';
        tupleDiv.style.textAlign = 'center';
        tupleDiv.textContent = `(${tuple.join(',')})`;
        tuplesRow.appendChild(tupleDiv);

        // Create input cell
        const inputContainer = document.createElement('div');
        inputContainer.style.width = '50px';
        inputContainer.style.textAlign = 'center';
        const input = createInputCell();
        input.id = `eval-${index}`;
        inputContainer.appendChild(input);
        inputsRow.appendChild(inputContainer);
    });

    flexContainer.appendChild(tuplesRow);
    flexContainer.appendChild(inputsRow);
    container.appendChild(flexContainer);

    // Add some basic styles to container
    container.style.padding = '20px';
    container.style.overflowX = 'auto';
}

// Function to check the evaluation answers
function checkRMEvaluation() {
    const inputs = document.querySelectorAll('.eval-input');
    const userAnswers = Array.from(inputs).map(input => parseInt(input.value));
    const observations = document.getElementById('observation');

    let isCorrect = true;
    inputs.forEach((input, index) => {
        if (parseInt(input.value) !== correctAnswers[index]) {
            isCorrect = false;
            input.style.backgroundColor = '#ffebee'; // Light red for wrong answers
        } else {
            input.style.backgroundColor = '#e8f5e9'; // Light green for correct answers
        }
    });

    console.log(isCorrect);
    console.log('Correct Answers:', correctAnswers);

    if (isCorrect) {
        observations.innerHTML = "Correct!";
        observations.style.color = "green";
    }
    else {
        observations.innerHTML = "Incorrect!";
        observations.style.color = "red";
    }
}

// Function to go to previous question
function prevRMQuestion() {
    document.getElementById('degreeQuestion').style.display = 'block';
    document.getElementById('evaluationQuestion').style.display = 'none';

    // reset the observation
    const observations = document.getElementById('observation');
    observations.innerHTML = "";
    // reset the monomial and reload the
    
}

// // Function to set correct answers
// function setCorrectAnswers(answers) {
//     correctAnswers = evaluateMonomialForAllTuples(monomial.join(''), currentEvalVectors);
// }

// Call initialization when the document is ready
document.addEventListener('DOMContentLoaded', initializeMonomial);

// Initialize the table when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeEvalTable();

    // Example: Set some correct answers
    // Replace this with your actual correct answers
    // setCorrectAnswers([0, 1, 1, 0, 1, 0, 0, 1]);

    // // Add basic styles to the buttons
    // const buttons = document.querySelectorAll('.v-button');
    // buttons.forEach(button => {
    //     button.style.margin = '10px';
    //     button.style.padding = '8px 16px';
    //     button.style.cursor = 'pointer';
    // });
});