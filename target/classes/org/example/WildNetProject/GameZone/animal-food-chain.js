document.addEventListener('DOMContentLoaded', () => {
    const animals = document.querySelectorAll('.animal');
    const levels = document.querySelectorAll('.level');
    const result = document.getElementById('level-result');
    const submitButton = document.getElementById('submit-button');

    let draggedAnimal = null;
    let currentLevel = 0;

    const foodChains = [
        [
            { src: "images/grass.jpg", level: "producer" },
            { src: "images/rabbit.jpg", level: "primary-consumer" },
            { src: "images/fox.jpg", level: "secondary-consumer" },
            { src: "images/eagle.jpg", level: "tertiary-consumer" }
        ],
        [
            { src: "images/algae.jpg", level: "producer" },
            { src: "images/fish.jpg", level: "primary-consumer" },
            { src: "images/seal.jpg", level: "secondary-consumer" },
            { src: "images/shark.jpg", level: "tertiary-consumer" }
        ],
        [
            { src: "images/plant.jpg", level: "producer" },
            { src: "images/grasshopper.jpg", level: "primary-consumer" },
            { src: "images/frog.jpg", level: "secondary-consumer" },
            { src: "images/snake.jpg", level: "tertiary-consumer" }
        ]
    ];

    function loadNextLevel() {
        if (currentLevel < foodChains.length) {
            const currentFoodChain = foodChains[currentLevel];
            const animalContainer = document.querySelector('.animals');
            animalContainer.innerHTML = '';

            currentFoodChain.forEach(animal => {
                const animalDiv = document.createElement('div');
                animalDiv.classList.add('animal');
                animalDiv.setAttribute('draggable', 'true');
                animalDiv.setAttribute('data-level', animal.level);
                animalDiv.innerHTML = `<img src="${animal.src}" alt="${animal.level}">`;
                animalContainer.appendChild(animalDiv);

                animalDiv.addEventListener('dragstart', (e) => {
                    draggedAnimal = animalDiv;
                    e.dataTransfer.setData('text/plain', animal.level);
                });
            });

            result.textContent = '';
            currentLevel++;
        } else {
            result.textContent = 'Congratulations! You have completed all the levels!';
            result.style.color = 'green';
        }
    }

    levels.forEach(level => {
        level.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        level.addEventListener('drop', (e) => {
            e.preventDefault();
            if (!level.contains(draggedAnimal)) {
                level.appendChild(draggedAnimal);
            }
        });
    });

    submitButton.addEventListener('click', () => {
        checkCompletion();
    });

    function checkCompletion() {
        let allCorrect = true;
        levels.forEach(level => {
            Array.from(level.children).forEach(child => {
                if (child.classList.contains('animal') && child.dataset.level !== level.dataset.level) {
                    allCorrect = false;
                }
            });
        });

        if (allCorrect) {
            result.textContent = 'Well done! You matched all the animals correctly!';
            result.style.color = 'green';
            setTimeout(loadNextLevel, 2000); // Load the next level after a short delay
        } else {
            result.textContent = 'Some level placements are incorrect. Please try again.';
            result.style.color = 'red';
        }
    }

    loadNextLevel(); // Start with the first level
});
