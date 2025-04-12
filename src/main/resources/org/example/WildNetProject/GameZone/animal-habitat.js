document.addEventListener('DOMContentLoaded', () => {
    const animals = document.querySelectorAll('.animal');
    const habitats = document.querySelectorAll('.habitat');
    const result = document.getElementById('habitat-result');
    const submitButton = document.getElementById('submit-button');

    let draggedAnimal = null;

    // Set up drag events for animals
    animals.forEach(animal => {
        animal.addEventListener('dragstart', (e) => {
            draggedAnimal = animal;  // Store the whole animal div for dragging
            e.dataTransfer.setData('text/plain', animal.dataset.habitat); // Use data transfer to pass the animal's habitat
        });
    });

    // Allow habitats to receive an animal
    habitats.forEach(habitat => {
        habitat.addEventListener('dragover', (e) => {
            e.preventDefault();  // Necessary to allow dropping
        });

        habitat.addEventListener('drop', (e) => {
            e.preventDefault();
            if (!habitat.contains(draggedAnimal)) {  // Prevent re-dropping in the same habitat
                habitat.appendChild(draggedAnimal);
            }
        });
    });

    // Check habitats on submit
    submitButton.addEventListener('click', () => {
        let allCorrect = true;
        habitats.forEach(habitat => {
            Array.from(habitat.children).forEach(child => {
                // Check if the child is an animal and if its data-habitat matches the habitat's data-habitat
                if (child.classList.contains('animal') && child.dataset.habitat !== habitat.dataset.habitat) {
                    allCorrect = false;
                }
            });
        });

        if (allCorrect) {
            result.textContent = 'Well done! You matched all the animals correctly to their habitats!';
            result.style.color = 'green';
        } else {
            result.textContent = 'Some placements are incorrect. Please try again.';
            result.style.color = 'red';
        }
    });
});
