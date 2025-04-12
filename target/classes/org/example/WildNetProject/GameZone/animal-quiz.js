(function() {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const nextButton = document.getElementById('next');
    const submitButton = document.getElementById('submit');

    let currentSet = 0;
    const allQuizQuestions = [
        [
            {
                question: "Which animal is known as the 'King of the Jungle'?",
                answers: { a: "Lion", b: "Tiger", c: "Elephant" },
                correctAnswer: "a"
            },
            {
                question: "What is the largest mammal in the world?",
                answers: { a: "Elephant", b: "Blue Whale", c: "Giraffe" },
                correctAnswer: "b"
            },
            {
                question: "Which bird is known for its colorful feathers?",
                answers: { a: "Peacock", b: "Penguin", c: "Ostrich" },
                correctAnswer: "a"
            }
        ],
        [
            {
                question: "Which animal is the fastest on land?",
                answers: { a: "Cheetah", b: "Lion", c: "Horse" },
                correctAnswer: "a"
            },
            {
                question: "Which fish is known for its ability to change colors?",
                answers: { a: "Clown Fish", b: "Chameleon Fish", c: "Goldfish" },
                correctAnswer: "b"
            },
            {
                question: "What type of animal is a Komodo dragon?",
                answers: { a: "Lizard", b: "Bird", c: "Mammal" },
                correctAnswer: "a"
            }
        ],
        [
            {
                question: "Which animal is known for its impressive memory?",
                answers: { a: "Elephant", b: "Dolphin", c: "Cat" },
                correctAnswer: "a"
            },
            {
                question: "What is the only bird known to fly backwards?",
                answers: { a: "Eagle", b: "Hummingbird", c: "Parrot" },
                correctAnswer: "b"
            },
            {
                question: "Which animal has the highest blood pressure?",
                answers: { a: "Giraffe", b: "Elephant", c: "Whale" },
                correctAnswer: "a"
            }
        ],
        [
            {
                question: "Which mammal has no vocal cords?",
                answers: { a: "Giraffe", b: "Orangutan", c: "Hyena" },
                correctAnswer: "a"
            },
            {
                question: "What animal is known to spend 90% of its day sleeping?",
                answers: { a: "Cat", b: "Koala", c: "Bat" },
                correctAnswer: "b"
            },
            {
                question: "Which animal is incapable of jumping?",
                answers: { a: "Elephant", b: "Kangaroo", c: "Frog" },
                correctAnswer: "a"
            }
        ],
        [
            {
                question: "Which bird can mimic almost any sound it hears?",
                answers: { a: "Parrot", b: "Lyrebird", c: "Crow" },
                correctAnswer: "b"
            },
            {
                question: "Which animal's fingerprints are nearly identical to humans'?",
                answers: { a: "Gorilla", b: "Chimpanzee", c: "Koala" },
                correctAnswer: "c"
            },
            {
                question: "What animal is known as the ship of the desert?",
                answers: { a: "Horse", b: "Camel", c: "Donkey" },
                correctAnswer: "b"
            }
        ]
    ];

    function buildQuiz() {
        const output = [];
        allQuizQuestions[currentSet].forEach((currentQuestion, questionNumber) => {
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
        let totalQuestions = 0;

        allQuizQuestions.forEach(questionSet => {
            questionSet.forEach((currentQuestion, questionNumber) => {
                const answerContainer = answerContainers[questionNumber];
                const selector = `input[name=question${questionNumber}]:checked`;
                const userAnswer = (answerContainer.querySelector(selector) || {}).value;
                if (userAnswer === currentQuestion.correctAnswer) {
                    numCorrect++;
                }
                totalQuestions++;
            });
        });

        const percentage = ((numCorrect / totalQuestions) * 100).toFixed(2);
        resultsContainer.innerHTML = `<br>You scored ${percentage}% (${numCorrect} out of ${totalQuestions} correct)`;
        resultsContainer.style.display = 'block';
    }

    function showNextSet() {
        currentSet++;
        if (currentSet >= allQuizQuestions.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'block';
        }
        buildQuiz();
    }

    buildQuiz();
    nextButton.addEventListener('click', showNextSet);
    submitButton.addEventListener('click', showResults);
})();
