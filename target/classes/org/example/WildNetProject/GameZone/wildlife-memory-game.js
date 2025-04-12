document.addEventListener('DOMContentLoaded', () => {
    const levelSelectionButtons = document.querySelectorAll('.level-selection button');
    const gameContainer = document.querySelector('.game-container');
    const memoryGame = document.getElementById('memory-game');
    const timerElement = document.getElementById('timer');
    let timer;
    let countdown;
    let level;
    let matchedPairs = 0;

    const cardsArray = [
        { name: 'lion', img: 'images/lion.jpg' },
        { name: 'elephant', img: 'images/elephant.jpg' },
        { name: 'giraffe', img: 'images/giraffe.jpg' },
        { name: 'tiger', img: 'images/tiger.jpg' },
        { name: 'zebra', img: 'images/zebra.jpg' },
        { name: 'bear', img: 'images/bear.jpg' }
    ];

    const levels = {
        easy: { pairs: 3, time: 30 },
        medium: { pairs: 6, time: 60 },
        hard: { pairs: 6, time: 45 }
    };

    levelSelectionButtons.forEach(button => {
        button.addEventListener('click', () => {
            level = button.dataset.level;
            matchedPairs = 0;
            startGame(level);
            highlightSelectedLevel(button);
        });
    });

    function highlightSelectedLevel(selectedButton) {
        levelSelectionButtons.forEach(button => {
            button.classList.remove('active');
        });
        selectedButton.classList.add('active');
    }

    function startGame(level) {
        const levelConfig = levels[level];
        const gameGrid = cardsArray.slice(0, levelConfig.pairs).concat(cardsArray.slice(0, levelConfig.pairs)).sort(() => 0.5 - Math.random());

        memoryGame.innerHTML = '';
        gameGrid.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.name = item.name;

            const front = document.createElement('div');
            front.classList.add('front-face');
            front.innerHTML = '<img src="SystemImages/question-mark.png" alt="Question Mark">';

            const back = document.createElement('div');
            back.classList.add('back-face');
            back.innerHTML = `<img src="${item.img}" alt="${item.name}">`;
            back.style.display = 'none'; // Initially hide the back face

            card.appendChild(front);
            card.appendChild(back);
            memoryGame.appendChild(card);
        });

        memoryGame.style.gridTemplateColumns = `repeat(${Math.min(levelConfig.pairs, 4)}, 100px)`;
        startTimer(levelConfig.time);
        addCardListeners();
    }

    function startTimer(time) {
        clearInterval(countdown);
        timerElement.textContent = `Time left: ${time}s`;
        timer = time;
        countdown = setInterval(() => {
            timer--;
            timerElement.textContent = `Time left: ${timer}s`;
            if (timer <= 0) {
                clearInterval(countdown);
                endGame(false);
            }
        }, 1000);
    }

    function endGame(success) {
        showModal(success ? 'Congratulations! You completed the game.' : 'Time is up! Retry?');
    }

    let firstCard, secondCard;
    let hasFlippedCard = false;
    let lockBoard = false;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        const backFace = this.querySelector('.back-face');
        const frontFace = this.querySelector('.front-face');

        if (frontFace.style.display !== 'none') {
            frontFace.style.display = 'none';
            backFace.style.display = 'block';
        }

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        matchedPairs++;
        if (matchedPairs === levels[level].pairs) {
            clearInterval(countdown);
            endGame(true);
        }

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.querySelector('.back-face').style.display = 'none';
            firstCard.querySelector('.front-face').style.display = 'block';
            secondCard.querySelector('.back-face').style.display = 'none';
            secondCard.querySelector('.front-face').style.display = 'block';
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function addCardListeners() {
        const cards = document.querySelectorAll('.memory-card');
        cards.forEach(card => card.addEventListener('click', flipCard));
    }

    function showModal(message) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <p>${message}</p>
                <button id="close-modal">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('close-modal').addEventListener('click', () => {
            modal.remove();
            if (!success) {
                startGame(level);
            }
        });
    }
});
