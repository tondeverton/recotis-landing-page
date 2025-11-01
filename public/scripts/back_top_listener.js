/*
This file is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
You may obtain a copy of the license at https://creativecommons.org/licenses/by-nc/4.0/legalcode.txt
*/

/**
 * @param {Window} window 
 * @param {HTMLElement} homeElement 
 * @param {HTMLElement} backTopButton 
 * @returns {void}
 */
function showBackTopButtonGivenScrollOnWindow(window, homeElement, backTopButton) {
    const rectHome = homeElement.getBoundingClientRect();
    const isHomeVisible = rectHome.top <= window.innerHeight && rectHome.bottom >= 0;

    if (isHomeVisible)
        backTopButton.classList.remove('show');
    else
        backTopButton.classList.add('show');
}

function startupSetupBackTopButton() {
    window.addEventListener('scroll', () => {
        showBackTopButtonGivenScrollOnWindow(
            window,
            document.getElementById('home'),
            document.getElementById('back-top')
        )
    })
}
