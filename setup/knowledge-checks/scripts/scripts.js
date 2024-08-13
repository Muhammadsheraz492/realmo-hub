const questions = [
    {
        question: "What are 3 benefits of AutoPay?",
        options: [
            "Saves Time, Saves Money, Peace of Mind",
            "Free Phone, Free Accessory, Waived Activation Fee",
            "Wait in Line, Drive to Store, Late Fees",
            "3 Free Months of Service, Free Cricket Protect, Free Max"
        ],
        correctAnswer: 0
    },
    {
        question: "Your customer's bill cycle date is the 23rd of each month. Which date will Cricket first attempt to draft the payment from the customer's card?",
        options: [
            "21st",
            "22nd",
            "23rd",
            "24th"
        ],
        correctAnswer: 0
    },
    {
        question: "True or False: Customers can text autopay to 2860 from their Cricket phone if they have questions?",
        options: [
            "True",
            "False"
            ],
        correctAnswer: 0
    },
    {
        question: "Your Auto Pay customer needed to take advantage of Bridge pay last month. True or False:Since they typically pay their bill each month on autopay, their next bill will automatically be deducted from the card on file.",
        options: [
            "True",
            "False"
        ],
        correctAnswer: 1
    },
    {
        question: "Your customer says they would set up Auto Pay but decides against it because they get paid on the 1st of each month, but their bill cycle date is the 15th. What could you do to make Auto Pay work for this customer?",
        options: [
            "Change their bill cycle date",
            "Enroll customer in autopay anyways",
            "Cancel that account and start a new one",
            "Autopay will not be an option for this customer"
        ],
        correctAnswer: 0
    },
    {
        question: "Which single-line plans qualify for the $5 ABP discount?",
        options: [
            "All rate plans",
            "$60",
            "$55, $60",
            "$40, $55, $60"
        ],
        correctAnswer: 3
    },
    {
        question: "True or False: Multi-line accounts are eligible for the $5 ABP discount?",
        options: [
            "Ture",
            "False"
        ],
        correctAnswer: 1
    },
    {
        question: "When helping a customer change their cycle date, which dates are unavailable?",
        options: [
            "3rd & 15th",
            "1st- 15th",
            "30th-10th",
            "29th - 3rd, & 15th"
        ],
        correctAnswer: 3
    },
    {
        question: "Your customer wants to set up AutoPay but does not want the monthly charge coming out of their regular bank account. What alternative solution could you recommend?",
        options: [
            "Setup AutoPay anyways",
            "Use a prepaid card",
            "AutoPay is not an option for this customer",
            "Change the bill cycle date"
        ],
        correctAnswer: 1
    },
    {
        question: "True or False: Customers enrolled in AutoPay can still pay cash in store?",
        options: [
            "True",
            "False"
        ],
        correctAnswer: 0
    }
];

const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const questionsContainer = document.getElementById("questions-container");
const submitButton = document.getElementById("submit-btn");
const scoreElement = document.getElementById("score");
const startForm = document.getElementById("start-form");

let advocateName = "";
let locationId = "";

startForm.addEventListener("submit", (e) => {
    e.preventDefault();
    advocateName = document.getElementById("advocate-name").value;
    locationId = document.getElementById("location-id").value;
    startContainer.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestions();
});

function loadQuestions() {
    questionsContainer.innerHTML = ""; // Clear existing questions
    questions.forEach((question, index) => {
        let html = `
            <div class="question" id="question-${index}">
                <h2>${index + 1}. ${question.question}</h2>
                <div class="options">
        `;

        for (let i = 0; i < question.options.length; i++) {
            html += `
                <label class="option">
                    <input type="radio" name="question-${index}" value="${i}">
                    ${String.fromCharCode(97 + i)}. ${question.options[i]}
                </label>
            `;
        }

        html += `
                </div>
            </div>
        `;

        questionsContainer.innerHTML += html;
    });
}

function calculateScore() {
    let score = 0;
    questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedAnswer) {
            const answerIndex = parseInt(selectedAnswer.value);
            const questionElement = document.getElementById(`question-${index}`);
            const options = questionElement.querySelectorAll('.option');

            if (answerIndex === question.correctAnswer) {
                score += 10;
                options[answerIndex].classList.add("correct");
            } else {
                options[answerIndex].classList.add("incorrect");
                options[question.correctAnswer].classList.add("correct");
            }
        }
    });
    return score;
}

submitButton.addEventListener("click", () => {
    const score = calculateScore();
    scoreElement.textContent = score;
    submitButton.disabled = true;

    const allOptions = document.querySelectorAll('input[type="radio"]');
    allOptions.forEach(option => {
        option.disabled = true;
    });

    const results = {
        advocateName: advocateName,
        locationId: locationId,
        score: score
    };

    sendResultsEmail(results);
});

function sendResultsEmail(results) {
    console.log("Quiz Results:", results);
    alert("Quiz submitted! Results have been logged to the console.");
}
