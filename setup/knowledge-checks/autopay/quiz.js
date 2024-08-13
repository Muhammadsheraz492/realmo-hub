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
        question: "Your Auto Pay customer needed to take advantage of Bridge pay last month. True or False: Since they typically pay their bill each month on autopay, their next bill will automatically be deducted from the card on file.",
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
            "True",
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

document.addEventListener('DOMContentLoaded', () => {
    const { advocate, location } = getQueryParams();
    document.getElementById('info').innerHTML = `
        <p><strong>Advocate Name:</strong> ${advocate}</p>
        <p><strong>Location ID:</strong> ${location}</p>
    `;

    const quizContainer = document.getElementById('quiz');
    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.id = `question-${index}`;

        const questionText = document.createElement('p');
        questionText.textContent = question.question;
        questionElement.appendChild(questionText);

        question.options.forEach((option, optionIndex) => {
            const label = document.createElement('label');
            label.className = 'option';
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question-${index}`;
            input.value = optionIndex;
            input.addEventListener('change', () => {
                handleOptionChange(index, optionIndex);
            });
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            questionElement.appendChild(label);
        });

        quizContainer.appendChild(questionElement);
    });
});

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        advocate: params.get('advocate'),
        location: params.get('location')
    };
}

function handleOptionChange(questionIndex, selectedOptionIndex) {
    const questionElement = document.getElementById(`question-${questionIndex}`);
    const options = questionElement.querySelectorAll('.option');
    const correctOptionIndex = questions[questionIndex].correctAnswer;

    options.forEach((option, index) => {
        option.classList.remove('correct', 'incorrect');
        const input = option.querySelector('input');
        if (input) {
            input.disabled = true;
        }
    });

    if (selectedOptionIndex === correctOptionIndex) {
        options[selectedOptionIndex].classList.add('correct');
    } else {
        options[selectedOptionIndex].classList.add('incorrect');
        options[correctOptionIndex].classList.add('correct');
    }
}

function calculateScore() {
    let score = 0;
    questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedAnswer) {
            const answerIndex = parseInt(selectedAnswer.value);
            if (answerIndex === question.correctAnswer) {
                score += 10;
            }
        }
    });
    return score;
}

document.getElementById('submit-button').addEventListener('click', () => {
    const score = calculateScore();
    document.getElementById('score').textContent = score;

    // Disable all options to prevent changes
    const allOptions = document.querySelectorAll('input[type="radio"]');
    allOptions.forEach(option => {
        option.disabled = true;
    });

    const { advocate, location } = getQueryParams();
    
    // Populate hidden fields
    document.getElementById('form-advocate').value = advocate;
    document.getElementById('form-location').value = location;
    document.getElementById('form-score').value = score;

    // Generate HTML content
    const htmlContent = generateHtmlContent();
    document.getElementById('form-html-content').value = htmlContent;

    // Submit the form programmatically
    document.getElementById('quiz-form').submit();
});

function generateHtmlContent() {
    let htmlContent = '<h2>Quiz Results</h2>';
    htmlContent += `<p><strong>Advocate Name:</strong> ${getQueryParams().advocate}</p>`;
    htmlContent += `<p><strong>Location ID:</strong> ${getQueryParams().location}</p>`;
    htmlContent += `<p><strong>Score:</strong> ${document.getElementById('score').textContent}</p>`;

    questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="question-${index}"]:checked`);
        const answerText = selectedAnswer ? selectedAnswer.nextSibling.textContent : 'Not Answered';
        const isCorrect = selectedAnswer && parseInt(selectedAnswer.value) === question.correctAnswer;
        
        htmlContent += `<h3>${question.question}</h3>`;
        htmlContent += `<p><strong>Your Answer:</strong> ${answerText}</p>`;
        htmlContent += `<p><strong>Correct Answer:</strong> ${question.options[question.correctAnswer]}</p>`;
        htmlContent += `<p><strong>Status:</strong> ${isCorrect ? 'Correct' : 'Incorrect'}</p>`;
    });

    return htmlContent;
}
