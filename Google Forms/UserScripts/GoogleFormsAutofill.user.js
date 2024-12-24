// ==UserScript==
// @name         Google Forms Autofill
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Autofill name and check a specific checkbox on a Google Form if certain text is present
// @match        *://docs.google.com/forms/*/*/*/viewform*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function log(message) {
        console.log("Google Forms Autofill: " + message);
    }

    // Put your name between the double quotes
    const name = "Replace this"

    // Function to attempt autofill once elements are detected
    function autofillForm() {
        if (document.body.textContent.includes("محوسب أغسطس")) {
            // Target input field by locating the nearest "Your answer" sibling
            const inputElement = Array.from(document.querySelectorAll("input[type='text']")).find(input => {
                const label = input.closest("div").parentNode.querySelector("div");
                return label && label.textContent.includes("Your answer");
            });

            if (inputElement) {
                // Autofill name in the input field
                inputElement.focus(); // Focus to ensure the field is active
                inputElement.value = name; // Put your name in the variable above
                inputElement.dispatchEvent(new Event("input", { bubbles: true })); // Trigger event to make the change register
                log("Autofilled name");
            }

            // Check the checkbox with the specific data-answer-value
            const checkbox = document.querySelector('[data-answer-value="اقسم انني مشترك بدورة محوسب أغسطس الجديدة (2024) للأستاذ : إيهاب عبد العظيم"]');
            if (checkbox) {
                checkbox.click();
                log("Clicked checkbox");
            }

            // Click next after a delay
            const nextBtn = document.querySelector('[role=button]');
            if (nextBtn && nextBtn.textContent === 'Next') {
                setTimeout(() => {
                    nextBtn.click();
                    log("Clicked Next");
                }, 500); // 500 ms = 0.5 seconds delay
            }

            // Stop observing once the autofill has executed
            observer.disconnect();
        }
    }

    // Create an observer to monitor changes to the DOM
    const observer = new MutationObserver(autofillForm);

    // Start observing the document
    observer.observe(document.body, { childList: true, subtree: true });

    log("Finished");
})();
