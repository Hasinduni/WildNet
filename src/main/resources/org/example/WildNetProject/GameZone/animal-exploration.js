document.addEventListener('DOMContentLoaded', () => {
    const terrainMap = document.getElementById('terrain-map');
    const animalInfo = document.getElementById('animal-info');
    const animalImageContainer = document.getElementById('animal-image-container');
    const exploreButton = document.getElementById('explore-button');

    const terrains = ['Forest', 'Savannah', 'Desert', 'Mountain'];
    const animals = {
        'Forest': [{ name: 'Tiger', img: 'images/tiger.jpg' }, { name: 'Monkey', img: 'images/monkey.jpg' }, { name: 'Parrot', img: 'images/parrot.jpg' }],
        'Savannah': [{ name: 'Lion', img: 'images/lion.jpg' }, { name: 'Elephant', img: 'images/elephant.jpg' }, { name: 'Giraffe', img: 'images/giraffe.jpg' }],
        'Desert': [{ name: 'Camel', img: 'images/camel.jpg' }, { name: 'Fennec Fox', img: 'images/fennec-fox.jpg' }, { name: 'Scorpion', img: 'images/scorpion.jpg' }],
        'Mountain': [{ name: 'Snow Leopard', img: 'images/snow-leopard.jpg' }, { name: 'Mountain Goat', img: 'images/mountain-goat.jpg' }, { name: 'Eagle', img: 'images/eagle.jpg' }]
    };

    function explore() {
        const terrain = terrains[Math.floor(Math.random() * terrains.length)];
        const animal = animals[terrain][Math.floor(Math.random() * animals[terrain].length)];
        
        terrainMap.textContent = `Terrain: ${terrain}`;
        animalInfo.textContent = `You discovered a ${animal.name}!`;
        animalImageContainer.innerHTML = `<img src="${animal.img}" alt="${animal.name}">`;

        terrainMap.classList.remove('active');
        animalInfo.classList.remove('active');
        animalImageContainer.classList.remove('active');
        
        setTimeout(() => {
            terrainMap.classList.add('active');
            animalInfo.classList.add('active');
            animalImageContainer.classList.add('active');
        }, 10);  // Short delay to trigger animation
    }

    exploreButton.addEventListener('click', explore);
});
