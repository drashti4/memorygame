'use strict'

window.addEventListener('DOMContentLoaded', (event) => {

    let index, rand;
    var excludeArray = [];
    let array = [];
    var counters = [];

    let defaultButtons = document.getElementsByClassName('default');

    for (let i = 0; i < defaultButtons.length; i++) {
        defaultButtons[i].addEventListener('click', () => {
            defaultButtons[i].src = getRandomImage();
        });
    }


    function getRandomImage() {

        for (let i = 0; i < 17; i++) {
            counters[i] = 0;
        }

        let listImages = ["file:///C:/isi/JavaScript/MemoryGame/images/arrows.svg",
            "file:///C:/isi/JavaScript/MemoryGame/images/back.svg",
            "file:///C:/isi/JavaScript/MemoryGame/images/down-arrow(1).svg",
            "file:///C:/isi/JavaScript/MemoryGame/images/down-arrow.svg",
            "file:///C:/isi/JavaScript/MemoryGame/images/refresh.svg",
            "file:///C:/isi/JavaScript/MemoryGame/images/right.svg",
            "file:///C:/isi/JavaScript/MemoryGame/images/turn(1).svg",
            "file:///C:/isi/JavaScript/MemoryGame/images/turn.svg"
        ];

        let flag = false;
        let i = 0;
        index = getRandomInt(8, excludeArray);
        array.push(index);

        do {
            if (index == array[i]) {

                console.log("Incrementing old counter ", counters[index], "for index", index);
                counters[index]++;
                console.log("Incrementing new counter ", counters[index], "for index", index);

                if (counters[index] > 2) {

                    console.log("DISCARD IMAGE array index", index, "With counter", counters[index]);
                    excludeArray.push(index);
                    index = getRandomInt(9, excludeArray);
                    for (let i = 0; i < excludeArray.length; i++) {
                        console.log("ADDED 2 TIMES " + excludeArray[i]);
                    }
                    console.log("NEW DIS IMAGE array index ", index);
                    array.push(index);
                    flag = true;
                    break;
                }
            }
            i++;
        } while (i < array.length);
        if (flag) {
            console.log("New index is " + index);
        }
        for (let i = 0; i < 17; i++) {
            if (counters[i] != 0)
                console.log("Counter " + i + " val " + counters[i]);
        }
        return listImages[index];
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
            console.log("Again number generated is " + temp);
            return temp;
        } else {
            console.log("Generated number is " + randomNumber);
            return randomNumber;
        }
    }
});