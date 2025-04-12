(function() {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    const quizQuestions = [
        {
            question: "Which of these species is critically endangered?",
            answers: {
                a: "African Elephant",
                b: "Amur Leopard",
                c: "Bald Eagle"
            },
            correctAnswer: "b"
        },
        {
            question: "The Giant Panda is native to which country?",
            answers: {
                a: "China",
                b: "India",
                c: "Australia"
            },
            correctAnswer: "a"
        },
        {
            question: "What is the main threat to the survival of the polar bear?",
            answers: {
                a: "Poaching",
                b: "Climate Change",
                c: "Deforestation"
            },
            correctAnswer: "b"
        },
        {
            question: "Which species was officially declared extinct in 2020?",
            answers: {
                a: "Northern White Rhino",
                b: "Pinta Island Tortoise",
                c: "Sumatran Rhino"
            },
            correctAnswer: "b"
        },
        {
            question: "What conservation status is the Blue Whale currently listed under?",
            answers: {
                a: "Endangered",
                b: "Vulnerable",
                c: "Not endangered"
            },
            correctAnswer: "a"
        }
    ];

    function buildQuiz() {
        const output = [];
        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            for (let letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter}: ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join('')}</div>`
            );
        });
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        let numCorrect = 0;

        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainers[questionNumber].style.color = 'green';
            } else {
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        const totalQuestions = quizQuestions.length;
        const percentage = ((numCorrect / totalQuestions) * 100).toFixed(2);
        resultsContainer.innerHTML = `<br>You scored ${percentage}% (${numCorrect} out of ${totalQuestions} correct)`;
    }

    buildQuiz();
    submitButton.addEventListener('click', showResults);
})();
