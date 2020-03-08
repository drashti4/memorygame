'use strict'


let imageIndex;
let arrayExcludeNumbers = [];
let arrayRandomImageIndex = [];
let counters = [];
for (let i = 0; i < 17; i++) {
    counters[i] = 0;
}

window.addEventListener('DOMContentLoaded', (event) => {

    let defaultButtons = document.getElementsByClassName('default');

    for (let i = 0; i < defaultButtons.length; i++) {

        let defaultBtn = this;
        defaultButtons[i].addEventListener('click', () => {
            defaultButtons[i].src = getRandomImage();
        }, {
            once: true
        });
    }



    function getRandomImage() {

        let listImages = ["file:///C:/isi/JavaScript/MemoryGame/images/arrows.svg",
            "file:///C:/isi/JavaScript/MemoryGame/images/back.svg",
            "file:///C:/isi/JavaScript/MemoryGame/images/down-arrow(1).svg",
            "file:///C:/isi/JavaScript/MemoryGame/images/down-arrow.svg",
            "file:///C:/isi/JavaScript/MemoryGame/images/refresh.svg",
            "file:///C:/isi/JavaScript/MemoryGame/images/right.svg",
            "file:///C:/isi/JavaScript/MemoryGame/images/turn(1).svg",
            "file:///C:/isi/JavaScript/MemoryGame/images/turn.svg"
        ];

        do {
            imageIndex = getRandomInt(listImages.length, arrayExcludeNumbers);
        } while (counters[imageIndex] >= 2);

        arrayRandomImageIndex.push(imageIndex);
        counters[imageIndex]++;

        if (counters[imageIndex] === 2) {
            arrayExcludeNumbers.push(imageIndex);
        }
        console.log("Counter " + imageIndex + " val " + counters[imageIndex]);
        return listImages[imageIndex];
    }

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