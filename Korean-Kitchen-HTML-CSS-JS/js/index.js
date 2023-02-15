// Korean Kitchen Site

// Adds the functionality for the mobile menu =================================

// Gets the header so position: sticky via CSS class
const header = document.getElementById("header__main");

// Gets the button that will operate the menu by ID and stores in variable
const mobileBtn = document.getElementById("mob-menu-btn");

// Gets the navigation wrapper by ID and stores in variable
const navWrapper = document.getElementById("primary-nav-wrapper");

// Gets the navigation li's and stores as an array in listItems
const listItems = document.querySelectorAll(
    "#primary-navigation.header__main-nav-ul > .nav-link"
);

// toggleNav reads the custom data-attribute & executes the relevant code block.
// The aria-expanded label & data attribute is updated, CSS applied based on attribute
function toggleNav(e) {
    let menuOpen = navWrapper.getAttribute("data-menu-open");

    // Adds security by checking source off code before execution
    if (e.isTrusted) {
        // Opens and closes the mobile menu & changes the mobile menu icon
        if (menuOpen === "false") {
            navWrapper.setAttribute("data-menu-open", true);
            mobileBtn.setAttribute("aria-expanded", true);
            header.classList.toggle("sticky");
        } else {
            navWrapper.setAttribute("data-menu-open", false);
            mobileBtn.setAttribute("aria-expanded", false);
            header.classList.toggle("sticky");
        }
    }
}

// Adds an event listener function to the navigation open/close btn
mobileBtn.addEventListener("click", toggleNav);

// When a mobile menu item is clicked the menu closes
function closeMenuLinkClick() {
    listItems.forEach((li) => {
        li.addEventListener("click", toggleNav);
    });
}

// Calls the function
closeMenuLinkClick();

// Sticky on Scroll Header ====================================================
let scrollPosition = 0;

function stickyOnScroll() {
    // Gets the data attribute to determine if menu is open
    let menuOpen = navWrapper.getAttribute("data-menu-open");
    // Gets the window vertical position
    let windowY = window.scrollY;

    // Prevents scroll effect happening when mobile menu is open
    if (menuOpen === "false") {
        if (windowY < scrollPosition) {
            // Scrolling Up
            header.classList.add("is-sticky");
            header.classList.remove("is-hidden");
        } else {
            // Scrolling Down
            header.classList.add("is-hidden");
            header.classList.remove("is-sticky");
        }
        // Current window vertical position
        scrollPosition = windowY;
    }
}
// Adds the function to scroll event on the window object
window.addEventListener("scroll", stickyOnScroll);
