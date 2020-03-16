'use strict'


let imageIndex;
let arrayExcludeNumbers;
let arrayRandomImageIndex;
let arrayGeneratedImage;
let defaultButtons = undefined;
let counters;
let countPairFound;
let counterHighestScore;
const listImages = ["images/arrows.svg",
    "images/back.svg",
    "images/down-arrow(1).svg",
    "images/down-arrow.svg",
    "images/refresh.svg",
    "images/right.svg",
    "images/turn(1).svg",
    "images/turn.svg"];



function closeAllCards() {
    for (let j = 0; j < defaultButtons.length; j++) {
        defaultButtons[j].src = "images/plain-circle.svg";
        defaultButtons[j].setAttribute('status', "closed");

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

    updateTime();
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
        let status = defaultButtons[i].getAttribute('status');
        if (status === 'opened') {
            countOpenCard++;
        }
    }
    return countOpenCard;
}

function updateTime() {
    /*$("#lblTimer").text(h + " : " + m + " : " + s);
    setTimeout(function () {
        updateTime();
    }, 500);*/
}

/**This function will called when click happen first time. It takes selected image, it's index and array of all buttons as parameter */
function addFirstClickListner(selectedImage, defaultButtons, cuurentOpenedposition) {

    selectedImage.src = getRandomImage();
    arrayGeneratedImage[cuurentOpenedposition] = defaultButtons[cuurentOpenedposition].src;
    selectedImage.setAttribute('status', 'opened');
    selectedImage.setAttribute('isFirstClick', "false");

    for (let symbolCounter = 0; symbolCounter < defaultButtons.length; symbolCounter++) {

        if (defaultButtons[symbolCounter].getAttribute('status') === 'opened' && symbolCounter != cuurentOpenedposition) {

            let timerPreviousImage = addTimer(defaultButtons[symbolCounter]);
            let timerCurrentImage = addTimer(defaultButtons[cuurentOpenedposition]);
            checkSameImage(defaultButtons, cuurentOpenedposition, timerCurrentImage);
        }
    }
}

/** This function will called when click is not first time. It takes selected image, it's index and array of all buttons as parameter. */
function addMultiClickListener(selectedImage, defaultButtons, cuurentOpenedposition) {

    selectedImage.src = arrayGeneratedImage[cuurentOpenedposition];
    if (selectedImage.getAttribute('status') === 'closed') {
        selectedImage.setAttribute('status', 'opened');
    }

    for (let symbolCounter = 0; symbolCounter < defaultButtons.length; symbolCounter++) {
        if (defaultButtons[symbolCounter].getAttribute('status') === 'opened' && symbolCounter != cuurentOpenedposition) {
            let timerPreviousImage = addTimer(defaultButtons[symbolCounter]);
            let timerCurrentImage = addTimer(defaultButtons[cuurentOpenedposition]);
            checkSameImage(defaultButtons, cuurentOpenedposition, timerPreviousImage, timerCurrentImage);
        }
    }
}

/** This function takes selected Image as parameter and set timer for it. */
function addTimer(selectedImage) {
    return setTimeout(function () {
        if (selectedImage.getAttribute('status') != 'solved') {
            selectedImage.setAttribute('status', 'closed');
            selectedImage.src = "images/plain-circle.svg";
        }
    }, 2000);
}

/** This function takes all default buttons, selected button's index and it's timer as parameter. It checks wheher the opened image is same as previosly opned image by checking attribute.*/
function checkSameImage(defaultButtons, justOpenedPosition, timerPreviousImage, timerCurrentImage) {

    for (let symbolCounter = 0; symbolCounter < defaultButtons.length; symbolCounter++) {

        let cardStatus = defaultButtons[symbolCounter].getAttribute('status');

        if (cardStatus === 'opened') {

            if (symbolCounter != justOpenedPosition) { //To not match itself

                if (defaultButtons[symbolCounter].src === defaultButtons[justOpenedPosition].src) {

                    clearTimeout(timerPreviousImage);
                    clearTimeout(timerCurrentImage);
                    defaultButtons[symbolCounter].setAttribute('status', 'solved');
                    defaultButtons[justOpenedPosition].setAttribute('status', 'solved');
                    countPairFound++;
                    $('#lblPairFound').html(countPairFound);

                    if (countPairFound === 8) {
                        alert("All images are found");
                        $('#btnNewGame').value = 'New game';
                        $('#lblPairFound').html(0);
                        closeAllCards();
                        initVariables();
                        initGame();

                    }
                    counterHighestScore += 5;
                    $('#lblHighestScore').html(counterHighestScore);

                } else {
                    if (counterHighestScore < 1) {
                        $('#lblHighestScore').html(0);
                    } else {
                        counterHighestScore--;
                        $('#lblHighestScore').html(counterHighestScore);
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
            if (excludeArray[i] == randomNumber) {
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
        if (btnText == 'New game') {
            this.value = 'Quit game';
        } else {
            this.value = 'New game';
        }
        closeAllCards();
        initVariables();
        initGame();
    });
});