'use strict'

$(window).load(function () {

    let imageIndex;
    let arrayExcludeNumbers = [];
    let arrayRandomImageIndex = [];
    let arrayGeneratedImage = [];
    let counters = [];
    let isOpenedOnce = false
    /* Initialize all image counter by 0 */


    const listImages = ["file:///C:/isi/JavaScript/MemoryGame/images/arrows.svg",
        "file:///C:/isi/JavaScript/MemoryGame/images/back.svg",
        "file:///C:/isi/JavaScript/MemoryGame/images/down-arrow(1).svg",
        "file:///C:/isi/JavaScript/MemoryGame/images/down-arrow.svg",
        "file:///C:/isi/JavaScript/MemoryGame/images/refresh.svg",
        "file:///C:/isi/JavaScript/MemoryGame/images/right.svg",
        "file:///C:/isi/JavaScript/MemoryGame/images/turn(1).svg",
        "file:///C:/isi/JavaScript/MemoryGame/images/turn.svg"
    ];

    let defaultButtons = document.getElementsByClassName('btnDefault');
    console.log('LOG ' + defaultButtons.length);

    for (let j = 0; j < defaultButtons.length; j++) {
        counters[j] = 0;
        defaultButtons[j].setAttribute('isFirstClick', false);
    }

    for (let i = 0; i < defaultButtons.length; i++) {

        defaultButtons[i].addEventListener('click', function () {

            console.log('check value ' + defaultButtons[i].getAttribute('isFirstClick')); // print false
            if (defaultButtons[i].getAttribute('isFirstClick') == false) {
                console.log('first')
                addFirstClickListner(defaultButtons[i], defaultButtons, i);
            }

            if (!defaultButtons[i].getAttribute('isFirstClick')) {
                console.log('first')
                addFirstClickListner(defaultButtons[i], defaultButtons, i);
            }

            if (defaultButtons[i].getAttribute('isFirstClick')) {
                console.log('second')
                addMultiClickListener(defaultButtons[i], defaultButtons, i);
            }
        });
    }

    function addFirstClickListner(selectedImage, defaultButtons, index) {
        console.log('first click index is ' + index);
        selectedImage.src = getRandomImage();
        arrayGeneratedImage.push(defaultButtons[index].src);
        selectedImage.setAttribute('status', 'opened');
        let timer = addTimer(selectedImage);
        checkSameImage(defaultButtons, index, timer);
        selectedImage.setAttribute('isFirstClick', false);
    }

    function addMultiClickListener(selectedImage, defaultButtons, index) {
        console.log('second click index is ' + index);
        selectedImage.src = arrayGeneratedImage[index];
        selectedImage.setAttribute('status', 'opened');
        selectedImage.setAttribute('isFirstClick', true);
        let timer = addTimer(selectedImage);
        checkSameImage(defaultButtons, index, timer);

    }

    function addTimer(selectedImage) {
        return setInterval(function () {
            selectedImage.setAttribute('status', 'closed');
            selectedImage.src = "images/plain-circle.svg";
        }, 5000);

    }

    function checkSameImage(defaultButtons, index, timer) {
        for (let i = 0; i < defaultButtons.length; i++) {
            if (defaultButtons[i].getAttribute('status') === 'opened') {
                if (i != index) {
                    if (defaultButtons[i].src == defaultButtons[index].src) {
                        console.log("Match found with " + i);
                        defaultButtons[i].src = arrayGeneratedImage[index];
                        defaultButtons[i].setAttribute('status', 'solved');
                        defaultButtons[index].setAttribute('status', 'solved');
                        clearTimeout(timer);
                    }
                }
            }
        }
    }

    /* This function will return random image from array.*/
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

    /*This function will take parameter as limit and excluded numbers and return random number */
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
});