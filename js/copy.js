const questions = [
    {
        question: "Which is the largest animal?",
        answer: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ],
    },
    {
        question: "Which is the smallest country?",
        answer: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Sri Lanka", correct: false },
        ],
    },
    {
        question: "Which is the largest desert?",
        answer: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answer.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add(
            "btn",
            "bg-white",
            "text-black",
            "border-2",
            "border-gray-700",
            "cursor-pointer",
            "p-3",
            "w-full"
        );
        answerButton.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.classList.add("hidden");
    answerButton.innerHTML = "";
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // Reset all buttons to default style
    Array.from(answerButton.children).forEach((button) => {
        button.classList.remove(
            "bg-green-500",
            "bg-red-500",
            "text-white",
            "border-none"
        );
        button.classList.add("bg-white", "border-gray-700", "text-black");
        button.style.border = ""; // Reset inline border style
        button.disabled = false; // Keep buttons active
    });

    // Apply styles to the selected button
    if (isCorrect) {
        selectedButton.classList.add("bg-green-500", "text-white");
        score++;}  //increment the score } 
        else {
        selectedButton.classList.add("bg-red-500", "text-white");
    }
    selectedButton.style.border = "none"; // Remove border for the selected button

    nextButton.classList.remove("hidden"); // Show the Next button
}



function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = "Restart";
    nextButton.classList.remove("hidden");
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});


// Start the quiz
startQuiz();
