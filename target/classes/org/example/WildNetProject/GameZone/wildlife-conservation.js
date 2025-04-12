document.addEventListener('DOMContentLoaded', () => {
    const gameStatus = document.getElementById('game-status');
    const eventText = document.getElementById('event-text');
    const options = document.getElementById('options');

    const modal = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
    const closeButton = document.querySelector('.close-button');

    const gameState = {
        funds: 100000,
        animalsSaved: 0,
        spentMoney: false,
        events: [
            { text: "Fund an anti-poaching unit for $20,000, saving 20 animals.", cost: 20000, benefit: 20 },
            { text: "Protect a forest area from deforestation for $50,000, saving 20 animals.", cost: 50000, benefit: 20 },
            { text: "Invest in wildlife awareness for $20,000, saving 5 animals.", cost: 20000, benefit: 5 },
            { text: "Create a wildlife sanctuary for $70,000, saving 25 animals.", cost: 70000, benefit: 25 },
            { text: "Support wildlife protection laws with $40,000, saving 15 animals.", cost: 40000, benefit: 15 },
            { text: "Improve fencing in a wildlife reserve for $10,000, saving 5 animals.", cost: 10000, benefit: 5 },
            { text: "Fund a breeding program for rare species with $60,000, saving 30 animals.", cost: 60000, benefit: 30 }
        ],
        currentEventIndex: 0
    };

    function updateGameStatus() {
        gameStatus.innerHTML = `
            <span id="funds">Funds: $${gameState.funds}</span>
            <span id="animals-saved">Animals Saved: ${gameState.animalsSaved}</span>
        `;
    }

    function displayEvent() {
        const event = gameState.events[gameState.currentEventIndex];
        eventText.textContent = event.text;
        options.innerHTML = '';
        createOptionButton("Yes", event);
        createOptionButton("No", { cost: 0, benefit: 0 });
    }

    function createOptionButton(text, event) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', () => handleOption(event));
        options.appendChild(button);
    }

    function handleOption(event) {
        if (event.cost <= gameState.funds) {
            gameState.funds -= event.cost;
            gameState.animalsSaved += event.benefit;
            gameState.spentMoney = gameState.spentMoney || event.cost > 0;

            gameState.currentEventIndex++;
            if (gameState.currentEventIndex < gameState.events.length) {
                displayEvent();
            } else {
                showFinalStatusButton();
            }
        } else {
            showCustomAlert("Insufficient funds to proceed with this option!");
        }
        updateGameStatus();
    }

    function showFinalStatusButton() {
        options.innerHTML = '';
        const statusButton = document.createElement('button');
        statusButton.textContent = 'Show Final Status';
        statusButton.addEventListener('click', displayFinalStatus);
        options.appendChild(statusButton);
    }

    function displayFinalStatus() {
        let message = '';

        if (gameState.funds <= 0) {
            message = `<span style="color: red;">Game Over! You went bankrupt. Try again to manage your funds better.</span>`;
        } else if (!gameState.spentMoney) {
            message = `<span style="color: red;">Game Over! Don't be rude, we need to save our wildlife!</span>`;
        } else if (gameState.animalsSaved >= 50) {
            message = `<span style="color: green;">Congratulations! You are a Wildlife Saver, having saved ${gameState.animalsSaved} animals!</span>`;
        } else if (gameState.animalsSaved >= 30) {
            message = `<span style="color: green;">You are a great wildlife supporter, saving ${gameState.animalsSaved} animals!</span>`;
        } else {
            message = `<span style="color: gray;">Game Over! You saved ${gameState.animalsSaved} animals. Consider saving more next time.</span>`;
        }

        gameStatus.innerHTML += `<br>${message}`;
        options.innerHTML = '';
    }

    function showCustomAlert(message) {
        alertMessage.textContent = message;
        modal.style.display = "block";
    }

    closeButton.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    updateGameStatus();
    displayEvent();
});
