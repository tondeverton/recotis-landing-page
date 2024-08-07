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
