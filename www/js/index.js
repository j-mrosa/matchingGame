document.addEventListener('deviceready', onDeviceReady, false);

//global array of images
const imgArr =[
    'clownfish.png',
    'octopus.png', 
    'seahorse.png',
    'seal.png',
    'shark.png',
    'starfish.png',
    'turtle.png',
    'dolphin.png'
    ]

//global variables    
let score = 0;
let imgToCompare = "";
let completePairs = 0;

function onDeviceReady() {
    //assign event handlers to the cards
    document.querySelector('.mainGame').addEventListener('click', cardClickHandler);

    //assign event handler to the developer mode checkbox
    document.querySelector('#devModeCheckbox').addEventListener('change', devModeHandler);

    //assign event handler to button restart game
    document.querySelector('#restartBtn').addEventListener('click',restartGame);

    restartGame();
}

function devModeHandler(){
    //select the style tag
    let styleTag = document.querySelector('#hiddenStyle');    

    //verify if checkbox is checked, and change style tag contents accordingly
    if (document.querySelector('#devModeCheckbox').checked) {
        styleTag.innerHTML = '.hidden { opacity: 0.3 }';
    } else {
        styleTag.innerHTML = '.hidden { opacity: 0 }';
    }     
}

function restartGame(){
    //assign randon images
    assignImages();

    //hide all cards
    hideAllImg();

    //restart variables
    score = 0;
    completePairs = 0;

    //display score
    document.querySelector('.score').innerHTML = score;

    //uncheck dev mode
    document.querySelector('#devModeCheckbox').checked = false;
    document.querySelector('#hiddenStyle').innerHTML = '.hidden { opacity: 0 }';
}

//this function contains all logic about clicking cards
function cardClickHandler(e){

    //check if img is revealed
    if (e.target.classList.contains('hidden')) {
        //reveal img        
        e.target.classList.remove('hidden');

        //if so, check if imgToCompare is empty
        if (imgToCompare === "") {
            //if so, add img to imgToCompare
            imgToCompare = e.target;        
        } else {
            //else, compare to imgToCompare
            if (imgToCompare.src !== e.target.src) {
                //if imgs are different, show popup + score++ + hide imgs + empty imgToCompare
                navigator.notification.alert(
                    'Sorry, not a match!',
                    cb,
                    'Try Again'
                );

                function cb(){
                    //update score
                    score++;
                    document.querySelector('.score').innerHTML = score;
                    
                    //hide both imgs
                    e.target.classList.add('hidden');
                    imgToCompare.classList.add('hidden');

                    //empty variable
                    imgToCompare = "";
                }                
            }else{
                //if imgs are the same, empty imgToCompare 
                imgToCompare = ""; 
               
                //increase completePairs
                completePairs++;
               
                //check if all imgs are revealed
                if (completePairs === imgArr.length) {
                   //if so, show pop up                   
                    navigator.notification.confirm(
                        `Your score is ${score}. Would you like to play again?`, // message
                        onConfirm,            // callback to invoke with index of button pressed
                        'Game Over',           // title
                        ['YES','NO']     // buttonLabels
                    );

                    function onConfirm(choice){
                        //if user choose yes, restart the game
                        if(choice === 1){
                            restartGame();
                        }
                    }
                } 
            }          
        }
    } else {
       //else, show popup 
       navigator.notification.alert(
            'That square is already revealed!',
            null,
            'Invalid Move'
        );
    }
}

function hideAllImg(){
    //select all images 
    let allImg = document.querySelectorAll('img');

    //add class hidden
    allImg.forEach(img => {
        img.classList.add('hidden');
    });
}

function assignImages(){
    //get all the cards
    let allCards = document.querySelectorAll('.box');

    //duplicate array of images
    let doubleImgArr = imgArr.concat(imgArr);

    //shuffle the duplicate array
    shuffleArray(doubleImgArr);

    //insert images from array in each card
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].innerHTML = `<img class="img-fluid w-100 rounded" src="./img/animals-resized/${doubleImgArr[i]}" alt="animalPicture">`;        
    }
}

// Fisher-Yates Shuffle
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}


