document.addEventListener('DOMContentLoaded', () => {
    const animals = document.querySelectorAll('.animal');
    const classifications = document.querySelectorAll('.classification');
    const result = document.getElementById('classification-result');
    const submitButton = document.getElementById('submit-button');

    let draggedAnimal = null;

    // Set up drag events for animals
    animals.forEach(animal => {
        animal.addEventListener('dragstart', (e) => {
            draggedAnimal = animal;  // store the whole animal div for dragging
        });
    });

    // Allow classifications to receive an animal
    classifications.forEach(classification => {
        classification.addEventListener('dragover', (e) => {
            e.preventDefault();  // Necessary to allow dropping
        });

        classification.addEventListener('drop', (e) => {
            e.preventDefault();
            if (!classification.contains(draggedAnimal)) {  // Prevent re-dropping in the same classification
                classification.appendChild(draggedAnimal);
            }
        });
    });

    // Check classifications on submit
    submitButton.addEventListener('click', () => {
        let allCorrect = true;
        classifications.forEach(classification => {
            Array.from(classification.children).forEach(child => {
                // Check each child's data-class against the classification's data-class
                if (child.dataset.class !== classification.dataset.class) {
                    allCorrect = false;
                }
            });
        });

        if (allCorrect) {
            result.textContent = 'Well done! You classified all the animals correctly!';
            result.style.color = 'green';
        } else {
            result.textContent = 'Some classifications are incorrect. Please try again.';
            result.style.color = 'red';
        }
    });
});
