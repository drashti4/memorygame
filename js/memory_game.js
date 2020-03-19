'use strict'


let imageIndex;
let arrayExcludeNumbers;
let arrayRandomImageIndex;
let arrayGeneratedImage;
let defaultButtons = undefined;
let counters;
let countPairFound;
let counterHighestScore;
let globalHighestScore = 0;
let timer;
const NEW_GAME = 'New Game';
const QUIT_GAME = 'Quit Game';
const OPENED = 'opened';
const SOLVED = 'solved';
const STATUS = 'status'

const listImages = ["images/arrows.svg",
    "images/back.svg",
    "images/down-arrow(1).svg",
    "images/down-arrow.svg",
    "images/refresh.svg",
    "images/right.svg",
    "images/turn(1).svg",
    "images/turn.svg"];

/**Closing all cards*/
function closeAllCards() {
    for (let j = 0; j < defaultButtons.length; j++) {
        defaultButtons[j].src = "images/plain-circle.svg";
        defaultButtons[j].setAttribute(STATUS, "closed");
    }
}

function initVariables() {
    arrayExcludeNumbers = [];
    arrayRandomImageIndex = [];
    arrayGeneratedImage = [];
    counters = [];
    countPairFound = 0;
    counterHighestScore = 0;
}

/** Call click function according to number of clicks */
function initGame() {

    let countOpenCard = 0;
    /** Initialize all image counter by 0 */

    for (let j = 0; j < defaultButtons.length; j++) {
        counters[j] = 0;
        defaultButtons[j].setAttribute('isFirstClick', "true");
    }

    /**Add listener according to click */
    for (let i = 0; i < defaultButtons.length; i++) {

        defaultButtons[i].addEventListener('click', function () {

            countOpenCard = getNumberOfOpenedImage(defaultButtons);
            if (countOpenCard >= 2) {
                return;
            }
            if (defaultButtons[i].getAttribute('isFirstClick') === "true") {
                addFirstClickListner(defaultButtons[i], defaultButtons, i);
            } else {
                addMultiClickListener(defaultButtons[i], defaultButtons, i);
            }
        });
    }

}

/**This function returns number of image which has opened status*/
function getNumberOfOpenedImage() {
    let countOpenCard = 0;
    for (let i = 0; i < defaultButtons.length; i++) {
        let status = defaultButtons[i].getAttribute(STATUS);
        if (status === OPENED) {
            countOpenCard++;
        }
    }
    return countOpenCard;
}

function updateTime() {
    let start = new Date();
     timer = setInterval(() => {
        let now = new Date()
        now.setTime(new Date().getTime() - start.getTime());
        console.log(now.getMinutes() + ':' + now.getSeconds());
        $('#lblTimer').html(now.getMinutes() + ':' + now.getSeconds());
    }, 100)
}

/**This function will called when click happen first time. It takes selected image, it's index and array of all buttons as parameter */
function addFirstClickListner(selectedImage, defaultButtons, cuurentOpenedposition) {

    selectedImage.src = getRandomImage();
    arrayGeneratedImage[cuurentOpenedposition] = defaultButtons[cuurentOpenedposition].src;
    selectedImage.setAttribute(STATUS, OPENED);
    selectedImage.setAttribute('isFirstClick', "false");

    for (let symbolCounter = 0; symbolCounter < defaultButtons.length; symbolCounter++) {

        if (defaultButtons[symbolCounter].getAttribute(STATUS) === OPENED && symbolCounter != cuurentOpenedposition) {

            let timerPreviousImage = addTimer(defaultButtons[symbolCounter]);
            let timerCurrentImage = addTimer(defaultButtons[cuurentOpenedposition]);
            checkSameImage(defaultButtons, cuurentOpenedposition, timerCurrentImage);
        }
    }
}

/** This function will called when click is not first time. It takes selected image, it's index and array of all buttons as parameter. */
function addMultiClickListener(selectedImage, defaultButtons, cuurentOpenedposition) {

    selectedImage.src = arrayGeneratedImage[cuurentOpenedposition];
    if (selectedImage.getAttribute(STATUS) === 'closed') {
        selectedImage.setAttribute(STATUS,  OPENED);
    }

    for (let symbolCounter = 0; symbolCounter < defaultButtons.length; symbolCounter++) {
        if (defaultButtons[symbolCounter].getAttribute(STATUS) === OPENED && symbolCounter != cuurentOpenedposition) {
            let timerPreviousImage = addTimer(defaultButtons[symbolCounter]);
            let timerCurrentImage = addTimer(defaultButtons[cuurentOpenedposition]);
            checkSameImage(defaultButtons, cuurentOpenedposition, timerPreviousImage, timerCurrentImage);
        }
    }
}

/** This function takes selected Image as parameter and set timer for it. */
function addTimer(selectedImage) {
    return setTimeout(function () {
        if (selectedImage.getAttribute(STATUS) != SOLVED) {
            selectedImage.setAttribute(STATUS, 'closed');
            selectedImage.src = "images/plain-circle.svg";
        }
    }, 2000);
}

/** This function takes all default buttons, selected button's index and it's timer as parameter. It checks wheher the opened image is same as previosly opned image by checking attribute.*/
function checkSameImage(defaultButtons, justOpenedPosition, timerPreviousImage, timerCurrentImage) {

    for (let symbolCounter = 0; symbolCounter < defaultButtons.length; symbolCounter++) {

        let cardStatus = defaultButtons[symbolCounter].getAttribute(STATUS);

        if (cardStatus === OPENED) {

            if (symbolCounter != justOpenedPosition) { //To not match itself

                if (defaultButtons[symbolCounter].src === defaultButtons[justOpenedPosition].src) { // if two images are equal and position are different.

                    clearTimeout(timerPreviousImage);
                    clearTimeout(timerCurrentImage);
                    defaultButtons[symbolCounter].setAttribute(STATUS, SOLVED);
                    defaultButtons[justOpenedPosition].setAttribute(STATUS, SOLVED);
                    countPairFound++;
                    $('#lblPairFound').html(countPairFound);

                    if (countPairFound === 8) {  // if all pairs are found
                        if(globalHighestScore<counterHighestScore){
                            globalHighestScore = counterHighestScore;
                            alert("You created new high score " + globalHighestScore);
                            clearInterval(timer);
                            $('#lblTimer').html('0:0');
                        }
                        alert("All images are found");
                        $('#btnNewGame').value = NEW_GAME;
                        $('#lblPairFound').html(0);
                        closeAllCards();
                        initVariables();
                        initGame();
                    }

                    counterHighestScore += 5;

                    $('#lblHighestScore').html(globalHighestScore);

                } else {
                    if (counterHighestScore < 1) {
                        $('#lblScore').html(0);
                    } else {
                        counterHighestScore--;
                        $('#lblScore').html(counterHighestScore);
                    }
                }
            }
        }
    }
}

/** This function will return random image from array.*/
function getRandomImage() {

    do {
        imageIndex = getRandomInt(listImages.length, arrayExcludeNumbers);
    } while (counters[imageIndex] >= 2);

    arrayRandomImageIndex.push(imageIndex);
    counters[imageIndex]++;

    if (counters[imageIndex] === 2) {
        arrayExcludeNumbers.push(imageIndex);
    }
    return listImages[imageIndex];
}

/**This function will take parameter as limit and excluded numbers and return random number */
function getRandomInt(max, excludeArray) {
    let randomNumber = Math.floor(Math.random() * Math.floor(max));
    let flag = false;

    if (excludeArray != null) {
        for (let i = 0; i < excludeArray.length; i++) {
            if (excludeArray[i] === randomNumber) {
                flag = true;
                break;
            } else {
                flag = false;
            }
        }
    }

    if (flag) {
        let temp = getRandomInt(max, excludeArray);
        return temp;
    } else {
        return randomNumber;
    }
}
$(window).load(function () {
    defaultButtons = document.getElementsByClassName('btnDefault');
    $('#btnNewGame').click(function () {
        let btnText = this.value;
        if (btnText === NEW_GAME) {
            this.value = QUIT_GAME;
            updateTime();
           // $('#sectionRule').style.display='block';
        } else {
            clearInterval(timer);
            $('#lblTimer').html('0:0');
            this.value = NEW_GAME;
        }
        closeAllCards();
        initVariables();
        initGame();
    });

    $('cancelRules').click(function () {
        $('#sectionRule').style.display='none';
    });
});