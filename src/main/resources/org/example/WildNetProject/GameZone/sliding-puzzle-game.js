document.addEventListener('DOMContentLoaded', () => {
    let imageSrc = 'images/lion.jpg';  // Ensure this path is correct
    let puzzleBoard, gridSize, pieces;

    const startButton = document.getElementById('start-btn');
    const gridSizeSelect = document.getElementById('grid-size');

    startButton.addEventListener('click', () => {
        gridSize = parseInt(gridSizeSelect.value);
        puzzleBoard = document.getElementById('puzzle-board');
        createPuzzle();
    });

    function createPuzzle() {
        puzzleBoard.innerHTML = '';
        let pieceCount = gridSize * gridSize;
        pieces = [];

        for (let i = 0; i < pieceCount; i++) {
            const piece = document.createElement('div');
            piece.classList.add('piece');
            piece.style.width = `${100 / gridSize}%`;
            piece.style.height = `${100 / gridSize}%`;

            if (i < pieceCount - 1) {
                piece.style.backgroundImage = `url(${imageSrc})`;
                piece.style.backgroundSize = `${gridSize * 100}% ${gridSize * 100}%`;
                piece.style.backgroundPosition = `${(i % gridSize) * 100 / (gridSize - 1)}% ${Math.floor(i / gridSize) * 100 / (gridSize - 1)}%`;
                piece.textContent = i + 1;
                piece.dataset.position = i;
                piece.dataset.correct = i;
            } else {
                piece.classList.add('empty');
                piece.style.background = 'none';
                piece.dataset.position = i;
                piece.dataset.correct = i;
            }
            pieces.push(piece);
        }

        do {
            shufflePieces(pieces);
        } while (!isSolvable(pieces, gridSize));

        pieces.forEach(piece => puzzleBoard.appendChild(piece));
        puzzleBoard.addEventListener('click', movePiece);
    }

    function movePiece(e) {
        const piece = e.target;
        if (!piece.classList.contains('piece') || piece.classList.contains('empty')) return;

        const emptyPiece = document.querySelector('.empty');
        const canMove = isAdjacent(piece, emptyPiece, gridSize);

        if (canMove) {
            swapPieces(piece, emptyPiece);
            checkCompletion(pieces);
        } else {
            piece.classList.add('clicked');
            setTimeout(() => piece.classList.remove('clicked'), 200);
        }
    }

    function isAdjacent(piece1, piece2, gridSize) {
        const pos1 = parseInt(piece1.dataset.position);
        const pos2 = parseInt(piece2.dataset.position);
        const row1 = Math.floor(pos1 / gridSize);
        const col1 = pos1 % gridSize;
        const row2 = Math.floor(pos2 / gridSize);
        const col2 = pos2 % gridSize;
        return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
    }

    function swapPieces(piece1, piece2) {
        const tempStyle = piece1.style.cssText;
        const tempText = piece1.textContent;
        piece1.style.cssText = piece2.style.cssText;
        piece2.style.cssText = tempStyle;
        piece1.textContent = piece2.textContent;
        piece2.textContent = tempText;

        const tempPosition = piece1.dataset.position;
        piece1.dataset.position = piece2.dataset.position;
        piece2.dataset.position = tempPosition;
    }

    function shufflePieces(pieces) {
        for (let i = pieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
        }
        pieces.forEach((piece, index) => piece.dataset.position = index);
    }

    function isSolvable(pieces, gridSize) {
        let inversions = 0;
        const arr = pieces.map(p => parseInt(p.dataset.correct));
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] > arr[j] && arr[j] !== arr.length - 1) {
                    inversions++;
                }
            }
        }
        const emptyRowFromBottom = gridSize - Math.floor(arr.indexOf(gridSize * gridSize - 1) / gridSize);
        if (gridSize % 2 === 1) {
            return inversions % 2 === 0;
        } else {
            return (emptyRowFromBottom % 2 === 1) === (inversions % 2 === 0);
        }
    }

    function checkCompletion(pieces) {
        const isComplete = pieces.every((piece, i) => parseInt(piece.dataset.position) === i);
        if (isComplete) {
            document.getElementById('puzzle-result').textContent = 'Puzzle Completed!';
        }
    }
});
