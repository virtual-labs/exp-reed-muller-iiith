// Constants for polynomial generation
const maxDegree = 3;
const maxVariables = 3;
let polynomial = []; // Array of monomials, where each monomial is an array of variables
let maxPolynomialDegree = 0;

// Global variables to store state
let currentEvalVectors = [];
let correctAnswers = [];

// Function to format monomial in LaTeX
function formatMonomial(monomial) {
    if (!monomial) return '';
    if (monomial.length === 0) return '\\(1\\)';
    return `\\(X_{${monomial.join('}X_{')}}\\)`;
}

// Function to generate monomials of specific degree
function generateMonomials(degree, m) {
    const monomials = [];

    function generateCombinations(arr, size, start = 0, current = []) {
        if (current.length === size) {
            monomials.push([...current]);
            return;
        }
        for (let i = start; i < arr.length; i++) {
            current.push(arr[i]);
            generateCombinations(arr, size, i + 1, current);
            current.pop();
        }
    }

    if (degree === 0) {
        monomials.push([]); // Constant term
    } else {
        const variables = Array.from({ length: m }, (_, i) => i + 1);
        generateCombinations(variables, degree);
    }
    return monomials;
}

// Function to generate a random binary polynomial
function generateRandomBinaryPolynomial() {
    // Generate random number of terms (1 to 4)
    const numTerms = Math.floor(Math.random() * 4) + 1;

    // Clear previous polynomial
    polynomial = [];
    maxPolynomialDegree = 0;

    // Generate terms
    for (let i = 0; i < numTerms; i++) {
        // For each term, decide if it's a constant (1) or a monomial
        const isConstant = Math.random() < 0.2; // 20% chance of being constant

        if (isConstant) {
            polynomial.push([]); // Empty array represents constant term 1
        } else {
            // Generate random degree (1 to maxDegree) for this monomial
            const degree = Math.floor(Math.random() * maxDegree) + 1;
            maxPolynomialDegree = Math.max(maxPolynomialDegree, degree);

            // Get all possible monomials of this degree
            const possibleMonomials = generateMonomials(degree, maxVariables);
            // Select a random monomial
            const selectedMonomial = possibleMonomials[Math.floor(Math.random() * possibleMonomials.length)];

            // add only if selected monomial is not already present
            if (!polynomial.find(m => m.join('') === selectedMonomial.join(''))) { polynomial.push(selectedMonomial); }
        }
    }

    // Format the polynomial for display
    return formatPolynomial(polynomial);
}

function formatPolynomial(poly) {
    if (poly.length === 0) return "0";

    // Sort the polynomial terms by degree (length of the term array)
    poly.sort((a, b) => a.length - b.length);

    let constantTerm = true;

    let result = [];

    poly.forEach((term) => {
        if (term.length === 0 && constantTerm) {
            constantTerm = false;
            result.push("1"); // Add "1" for the constant term
        } else if (term.length > 0) {
            // Format the term
            const formattedTerm = term.length === 1
                ? `X_{${term[0]}}`  // Single exponent
                : `X_{${term.join('}X_{')}}`; // Multiple exponents
            result.push(formattedTerm);
        }
    });

    // Join the terms with " + " to form the final polynomial string
    return result.join(' + ');
}


// Function to initialize and display the polynomial
function initializePolynomial() {
    const polynomialElement = document.getElementById('monomial');
    if (polynomialElement) {
        const randomPolynomial = generateRandomBinaryPolynomial();
        console.log(polynomialElement)
        // MathJax.typesetClear([polynomialElement]);
        polynomialElement.innerHTML = `\\(P (\\mathbf{X}) = ${randomPolynomial}\\)`;

        if (window.MathJax) {
            console.log(polynomialElement)
            MathJax.typesetPromise([polynomialElement])
                .then(() => {
                    console.log('MathJax typeset completed successfully');
                })
                .catch((err) => {
                    console.log('MathJax encountered an error during typesetting:', err);
                });
        }
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

// Function to evaluate a polynomial for given variable values
function evaluatePolynomial(variableValues) {
    let result = 0;

    console.log("Evaluating polynomial with variable values:", variableValues);
    console.log("Polynomial:", polynomial);

    // Evaluate each monomial in the polynomial
    for (const monomial of polynomial) {
        let monomialResult = 1;

        // If monomial is empty array (constant term 1), keep monomialResult as 1
        if (monomial.length > 0) {
            for (const variable of monomial) {
                monomialResult *= variableValues[variable - 1];
            }
        }

        // XOR the results (addition in F2)
        result ^= monomialResult;
    }

    return result;
}

function checkDegree() {
    const degreeElement = document.getElementById('degreeInput');
    const degreeValue = parseInt(degreeElement.value);
    const observations = document.getElementById('observation');

    if (degreeValue === maxPolynomialDegree) {
        observations.innerHTML = "Correct!";
        observations.style.color = "green";
        document.getElementById('degreeQuestion').style.display = 'none';
        document.getElementById('evaluationQuestion').style.display = 'block';
    } else {
        observations.innerHTML = "Incorrect!";
        observations.style.color = "red";
    }
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

// Function to initialize the evaluation table horizontally,
// grouping each tuple and its input into the same wrapper div
function initializeEvalTable() {
    const tuples = generateBinaryTuples(maxVariables);
    currentEvalVectors = tuples;
    correctAnswers = tuples.map(tuple => evaluatePolynomial(tuple));

    const container = document.querySelector('.eval-vector-inputs');
    container.innerHTML = '';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    // container.style.flexDirection = 'column';
    container.style.alignItems = 'center';

    // Outer flex container to lay out each tuple+input group in a row
    const flexContainer = document.createElement('div');
    flexContainer.style.display = 'flex';
    // applies the flex‑wrap style
    flexContainer.style.flexWrap = 'wrap';
    flexContainer.style.gap = '20px';
    flexContainer.style.alignItems = 'center';
    flexContainer.style.padding = '20px';
    // flexContainer.style.overflowX = 'auto';

    tuples.forEach((tuple, index) => {
        // Wrapper for one tuple + its input
        const groupDiv = document.createElement('div');
        // groupDiv.style.display = 'flex';
        // groupDiv.style.flexDirection = 'column';
        groupDiv.style.alignItems = 'center';
        groupDiv.style.gap = '8px';

        // Tuple display
        const tupleDiv = document.createElement('div');
        tupleDiv.style.textAlign = 'center';
        tupleDiv.innerHTML = `\\((${tuple.join(',')})\\)`;
        groupDiv.appendChild(tupleDiv);

        // Input cell
        const input = createInputCell();
        input.id = `eval-${index}`;
        groupDiv.appendChild(input);

        flexContainer.appendChild(groupDiv);
    });

    container.appendChild(flexContainer);

    // Re-typeset MathJax in the new content
    if (window.MathJax) {
        MathJax.typesetPromise([container]);
    }
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
            input.style.backgroundColor = '#ffebee';
        } else {
            input.style.backgroundColor = '#e8f5e9';
        }
    });

    if (isCorrect) {
        observations.innerHTML = "Correct! All function evaluations are correct.";
        observations.style.color = "green";
    } else {
        observations.innerHTML = "Some evaluations are incorrect. Please check the highlighted cells.";
        observations.style.color = "red";
    }
}

// Function to go to previous question
function prevRMQuestion() {
    document.getElementById('degreeQuestion').style.display = 'block';
    document.getElementById('evaluationQuestion').style.display = 'none';

    const observations = document.getElementById('observation');
    observations.innerHTML = "";
    document.getElementById('degreeInput').value = "";

    // Reset input cell backgrounds
    document.querySelectorAll('.eval-input').forEach(input => {
        input.style.backgroundColor = '';
        input.value = '';
    });
}

// Function to reset the question
function resetQuestion() {
    // Reset polynomial and evaluation table
    initializePolynomial();
    initializeEvalTable();

    // Reset degree input and observations
    const degreeInput = document.getElementById('degreeInput');
    degreeInput.value = '';
    const observations = document.getElementById('observation');
    observations.innerHTML = '';

    // Reset input cell backgrounds
    document.querySelectorAll('.eval-input').forEach(input => {
        input.style.backgroundColor = '';
        input.value = '';
    });

    // Show the degree question again
    document.getElementById('degreeQuestion').style.display = 'block';
    document.getElementById('evaluationQuestion').style.display = 'none';

    // Re-typeset MathJax
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
    console.log("Question reset successfully.");
    // Re-initialize polynomial to ensure new question
    initializePolynomial();
    // console.log("Polynomial re-initialized.");
    // Reset currentEvalVectors and correctAnswers
    currentEvalVectors = [];
    correctAnswers = [];
    // console.log("Current evaluation vectors and correct answers reset.");
    // Re-initialize evaluation table
    initializeEvalTable();
    // console.log("Evaluation table re-initialized.");
    // Log reset completion
    // console.log("Reset question completed.");
    // Log the current state of polynomial and evaluation vectors
    console.log("Current polynomial:", polynomial);
    console.log("Current evaluation vectors:", currentEvalVectors);
    console.log("Current correct answers:", correctAnswers);
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    // Update question text to reflect polynomial instead of monomial
    const questionElement = document.getElementById('monomialQuestion');
    if (questionElement) {
        questionElement.innerHTML = `Consider the given Polynomial : `;
    }

    // Typeset initial MathJax content
    if (window.MathJax) {
        MathJax.typesetPromise();
    }

    initializePolynomial();
    initializeEvalTable();


});

// Export functions for global access
window.checkDegree = checkDegree;
window.checkRMEvaluation = checkRMEvaluation;
window.prevRMQuestion = prevRMQuestion;
window.initializePolynomial = initializePolynomial;