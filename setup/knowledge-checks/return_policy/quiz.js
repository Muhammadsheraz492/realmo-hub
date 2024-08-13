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
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            questionElement.appendChild(label);
        });

        quizContainer.appendChild(questionElement);
    });

    // Add CSS for highlighting correct and incorrect answers
    const style = document.createElement('style');
    style.innerHTML = `
        .correct {
            color: green;
        }
        .incorrect {
            color: red;
        }
    `;
    document.head.appendChild(style);
});

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        advocate: params.get('advocate'),
        location: params.get('location')
    };
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
                // Highlight the correct answer in green
                options[answerIndex].classList.add("correct");
            } else {
                // Highlight the wrong answer in red
                options[answerIndex].classList.add("incorrect");
                // Highlight the correct answer in green
                options[question.correctAnswer].classList.add("correct");
            }
        }
    });
    return score;
}

document.getElementById('submit-button').addEventListener("click", () => {
    const score = calculateScore();
    document.getElementById('score').textContent = score;
    document.getElementById('submit-button').disabled = true;

    const allOptions = document.querySelectorAll('input[type="radio"]');
    allOptions.forEach(option => {
        option.disabled = true;
    });

    const { advocate, location } = getQueryParams();
    const results = {
        advocateName: advocate,
        locationId: location,
        score: score
    };

    sendResultsEmail(results);
});

function sendResultsEmail(results) {
    console.log("Quiz Results:", results);
    alert("Quiz submitted! Results have been logged to the console.");
}
