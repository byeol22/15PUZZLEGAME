window.addEventListener('DOMContentLoaded', () => {    //You need to handle the DOMContentLoaded event when you place the 
                                                         //JavaScript in the head of the page but referencing elements in the body. So we use DOMCONTENTLOADED
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');  //document.querySelector() will return the element that contains the inside
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');  // element

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';  
    let isGameActive = true;  

    const PLAYERX_WON = 'PLAYERX_WON';    //winning condition
    const PLAYERO_WON = 'PLAYERO_WON';     //winning condition
    const TIE = 'DRAW';   
//winning conditions in the 3*3 matrix marked with arrays
    const winningConditions = [
      [0, 1, 2],         // x x x 0 0 0 0 0 0 
        [3, 4, 5],         //0 0 0 x x x 0 0 0
        [6, 7, 8],         // 0 0 0 0 0 0 x x x
        [0, 3, 6],         //x 0 0 x 0 0 x 0 0 
        [1, 4, 7],         // 0 x 0 0 x 0 0 x 0
        [2, 5, 8],         //0 0 x 0 0 x 0 0 x
        [0, 4, 8],         //x 0 0 0 x 0 0 x 0
        [2, 4, 6]          //0 0 x 0 x 0 x 0 0
    ];

    function handleResultValidation() {    //To check whether the game end with win or draw.
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {    //Check the all conditions by placing them in loops
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {  //If there are empty strings then again continue the loop
                continue;
            }
            if (a === b && b === c) {     //If the values are true, then the round is won
                roundWon = true;
                break;
            }
        }

    if (roundWon) {      //As round is won, we announce the winner
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;    //Game is no longer active
            return;
        }

    if (!board.includes(''))    //If there are no more empty places left, then it is considered as Draw
        announce(TIE);
    }

    const announce = (type) => {     //Helper function : announce the winner on the page
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){   //If already the tile is filled with x or o
            return false;
        }

        return true;   //else
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';    //To change the current player x or o based on conditional statement
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {     //By checking whether the click done is valid function or not
        if(isValidAction(tile) && isGameActive) {  //if both the conditions are true, then we set the inner commands to be taken by the 
            tile.innerText = currentPlayer;  
            tile.classList.add(`player${currentPlayer}`);  //can be x or o depends on the current player
            updateBoard(index);
            handleResultValidation();   //To check if the move is done is correct or not
            changePlayer();    //To give the chance to the next player
        }
    }
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }
 
    tiles.forEach( (tile, index) => {     //Reference to the index of the tile will correspond to the tile library
        tile.addEventListener('click', () => userAction(tile, index));  //user action is used i.e event is handled
    });

    resetButton.addEventListener('click', resetBoard);
});
