// ==UserScript==
// @name         Google Form Timer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add a timer to the title of Google Forms pages.
// @author       AbdullahMRiad & ChatGPT
// @match        https://docs.google.com/forms/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Initialize the start time
    const startTime = Date.now();

    // Function to format the elapsed time
    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours > 0 ? hours + ':' : ''}${hours > 0 && minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Function to update the page title with the timer
    function updateTitle() {
        const elapsedTime = Date.now() - startTime;
        const formattedTime = formatTime(elapsedTime);
        document.title = `[${formattedTime}] ${originalTitle}`;
    }

    // Store the original title
    const originalTitle = document.title;

    // Start the timer
    setInterval(updateTitle, 1000);
})();