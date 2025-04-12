(function() {
    const animalPictures = [
        { src: "images/lion.jpg", name: "lion" },
        { src: "images/elephant.jpg", name: "elephant" },
        { src: "images/giraffe.jpg", name: "giraffe" },
        { src: "images/eagle.jpg", name: "eagle" }, // New animal
        { src: "images/zebra.jpg", name: "zebra" }  // New animal
    ];

    let currentPictureIndex = 0;

    const animalPic = document.getElementById('animal-pic');
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const feedback = document.getElementById('feedback');

    function showNextPicture() {
        currentPictureIndex = (currentPictureIndex + 1) % animalPictures.length;
        animalPic.src = animalPictures[currentPictureIndex].src;
        animalPic.alt = "Guess the animal"; // Add a dynamic alt tag for accessibility
        guessInput.value = '';
        feedback.textContent = '';
    }

    guessButton.addEventListener('click', () => {
        const userGuess = guessInput.value.toLowerCase();
        const correctAnswer = animalPictures[currentPictureIndex].name;
        if (userGuess === correctAnswer) {
            feedback.textContent = "Correct!";
            feedback.style.color = 'green';
            setTimeout(showNextPicture, 2000); // Show next picture after a delay
        } else {
            feedback.textContent = "Try again!";
            feedback.style.color = 'red';
        }
    });

    showNextPicture();
})();
