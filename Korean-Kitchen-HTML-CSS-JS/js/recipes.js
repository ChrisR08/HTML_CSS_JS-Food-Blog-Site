// Recipe Pages ===============================================================
/*



*/
/* Sets the initial values of the save,like & comment counters from storage or 
the hardcoded object respectively. */
function setInitialCounterValues() {
    // Check if the array already exists in local storage
    if (!localStorage.getItem("recipesList")) {
        // If false then initialise to:
        let recipesList = [
            {
                recipe: "bibimbap",
                likes: 1045,
                saves: 754,
            },
            {
                recipe: "kimbap",
                likes: 985,
                saves: 673,
            },
            {
                recipe: "kfc",
                likes: 1742,
                saves: 963,
            },
        ];
        // Set the initialised array to localStorage
        localStorage.setItem("recipesList", JSON.stringify(recipesList));
    }
}
setInitialCounterValues();
/*



*/
// Defined for global scope
let recipeIndex;
let recipesList;
let likesCount = 0;

// Function gets the recipesList and parses it to an array.
// It then gets index of current page within array and updates the likes count
function updateLikesCount() {
    // Gets the body element with page unique identifier
    let body = document.body;

    // Retrieve the array from local storage
    recipesList = JSON.parse(localStorage.getItem("recipesList"));

    // Find the object to update by its property value
    recipeIndex = recipesList.findIndex((item) => item.recipe === body.id);

    // Get the like counter element
    likesCount = document.getElementById("likes-count");

    // Update the likes with value from storage or if not found set to 0
    likesCount.innerText = recipesList[recipeIndex]?.likes || 0;
}
updateLikesCount();
/*



*/
// The "Like" & "Save" Counters ===============================================
let icons = document.querySelectorAll(".recipe-icon");

/* Sets the initial values of the save,like & comment counters from storage or 
the hardcoded object respectively. */
function setInitialCounterIcons() {
    // Check if the array already exists in local storage
    if (!localStorage.getItem("counterIcons")) {
        // If false then initialise to:
        let counterIcons = [
            {
                recipe: "bibimbap",
                savedURL: "../images/icons-logos/save-icon-filled.svg",
                likedURL: "../images/icons-logos/heart-icon-red.svg",
                saved: false,
                liked: false,
                comments: 1,
            },
            {
                recipe: "kimbap",
                savedURL: "../images/icons-logos/save-icon-filled.svg",
                likedURL: "../images/icons-logos/heart-icon-red.svg",
                saved: false,
                liked: false,
                comments: 1,
            },
            {
                recipe: "kfc",
                savedURL: "../images/icons-logos/save-icon-filled.svg",
                likedURL: "../images/icons-logos/heart-icon-red.svg",
                saved: false,
                liked: false,
                comments: 1,
            },
        ];
        // Set the initialised array to localStorage
        localStorage.setItem("counterIcons", JSON.stringify(counterIcons));
    }

    // Get the array object stored in counterIcons
    let counterIcons = JSON.parse(localStorage.getItem("counterIcons"));

    // Set the icon URLs based on the state of the "saved" and "liked" properties
    icons.forEach((icon) => {
        let urlType;
        if (
            icon.classList.contains("recipe-icon-save") &&
            counterIcons[recipeIndex].saved
        ) {
            urlType = counterIcons[recipeIndex].savedURL;
            icon.setAttribute("src", urlType);
        } else if (
            icon.classList.contains("recipe-icon-like") &&
            counterIcons[recipeIndex].liked
        ) {
            urlType = counterIcons[recipeIndex].likedURL;
            icon.setAttribute("src", urlType);
        }
        if (icon.classList.contains("recipe-icon-comment")) {
            let count = document.getElementById("comments-count");
            let commentCount = counterIcons[recipeIndex].comments;
            count.innerText = commentCount;
        }
    });
}
setInitialCounterIcons();
/*



*/
// The "Save for Later" Feature ===============================================

// Get the save button element
let saveBtn = document.getElementById("save");

//
function updateSaveCount() {
    // Get the saves counter element
    let savesCount = document.getElementById("saves-count");

    // Update the likes with value from storage or if not found set to 0
    savesCount.innerText = recipesList[recipeIndex].saves || 0;
    // Update the property value of the object
    recipesList[recipeIndex].saves += 1;

    // Store the updated list back in local storage
    localStorage.setItem("recipesList", JSON.stringify(recipesList));

    let count = parseInt(savesCount.innerText);
    let newCount = (count += 1);
    savesCount.innerText = newCount;
    changeIconColour("recipe-icon-save", "save", recipeIndex);
}

//
function storeSavedRecipe(e) {
    // Define base path (adjust if you deploy somewhere else later)
    const basePath = "/Korean-Kitchen-HTML-CSS-JS/";

    // Get saved recipes from local storage
    let savedRecipes = localStorage.getItem("savedRecipes");
    savedRecipes = savedRecipes ? JSON.parse(savedRecipes) : [];

    // Get title and clean it
    let title = document
        .getElementById("h2")
        .textContent.trim()
        .replace(/\s+/g, " ");

    // Get and fix image paths
    let jpgSrc = document.querySelector("source").getAttribute("srcset") || "";
    let webpSrc = document.querySelector("img").getAttribute("src") || "";

    // Force correct root-relative paths for your environment
    jpgSrc = `${basePath}${jpgSrc.replace(/^(\.\.\/)+/, "")}`.trim();
    webpSrc = `${basePath}${webpSrc.replace(/^(\.\.\/)+/, "")}`.trim();

    // Clean description
    let shortDesc = document
        .getElementById("short-desc")
        .innerText.trim()
        .replace(/\s+/g, " ");

    // Get current page URL relative to base
    let recipeUrl = e.srcElement.baseURI;
    let recipePath = recipeUrl.split(window.location.origin)[1]; // e.g. /Korean-Kitchen-HTML-CSS-JS/recipes/bibimbap.html

    // Check if already saved
    let recipeExists = savedRecipes.find((recipe) => recipe.url === recipePath);
    if (recipeExists) {
        alert("This recipe is already saved!");
        return;
    }

    // Update visual counter (assumes this function exists)
    updateSaveCount();

    // Build recipe object
    let recipeData = {
        title: title,
        imageUrlJpg: jpgSrc,
        imageUrlWebP: webpSrc,
        description: shortDesc,
        url: recipePath,
    };

    // Save and store
    savedRecipes.push(recipeData);
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));

    // Alert user
    let numSaved = savedRecipes.length;
    let recipes = numSaved === 1 ? "recipe" : "recipes";
    alert(`Congratulations!\nYou have ${numSaved} ${recipes} saved for later.`);
}

// Add event listener to save button
saveBtn.addEventListener("click", storeSavedRecipe);
/*



*/
// Function takes icon specific class, the icon type and variable "recipeIndex" as arguments
// It then changes the img src to the respective icon based on conditions
function changeIconColour(iconClass, iconType, recipeIndex) {
    // Retrieve the array from local storage
    let counterIcons = JSON.parse(localStorage.getItem("counterIcons"));
    let url;

    // Get the correct URL based on the iconType parameter
    if (iconType === "like") {
        url = counterIcons[recipeIndex].likedURL;
        counterIcons[recipeIndex].liked = true;
    } else if (iconType === "save") {
        url = counterIcons[recipeIndex].savedURL;
        counterIcons[recipeIndex].saved = true;
    }
    icons.forEach((icon) => {
        if (icon.classList[1] === iconClass) {
            icon.setAttribute("src", url);
        }
    });

    // Store the stringified object back in local storage
    localStorage.setItem("counterIcons", JSON.stringify(counterIcons));
}
/*



*/
// Add a click event listener to the like button ==============================
// Get the like button element
let likeBtn = document.getElementById("like");

likeBtn.addEventListener("click", () => {
    // Update the property value of the object
    recipesList[recipeIndex].likes += 1;

    // Store the stringified object back in local storage
    localStorage.setItem("recipesList", JSON.stringify(recipesList));

    let count = parseInt(likesCount.innerText);
    let newCount = (count += 1);
    likesCount.innerText = newCount;
    changeIconColour("recipe-icon-like", "like", recipeIndex);
});
/*



*/
// Comments Section ===========================================================
// This function gets the data from the form and adds it to local storage.
// It also updates the count and clears the form
function submitComment(e) {
    // Prevent the form from submitting
    e.preventDefault();

    let commentInput = document.getElementById("form-comment");
    let commentName = document.getElementById("form-comment-name");
    let currentDate = new Date().toLocaleDateString();

    let userName = commentName.value;
    let comment = commentInput.value;
    let commentDate = currentDate;

    let commentObject = {
        userName: userName,
        comment: comment,
        commentDate: commentDate,
    };

    // Create the comments array if it doesn't already exist
    recipesList[recipeIndex].comments = recipesList[recipeIndex].comments || [];

    // Push commentObject into the comments array & save to storage
    recipesList[recipeIndex].comments.push(commentObject);
    localStorage.setItem("recipesList", JSON.stringify(recipesList));

    // Update the comment count in localStorage and on the page
    let counterIcons = JSON.parse(localStorage.getItem("counterIcons"));
    counterIcons[recipeIndex].comments += 1;
    localStorage.setItem("counterIcons", JSON.stringify(counterIcons));
    document.getElementById("comments-count").innerText =
        counterIcons[recipeIndex].comments;

    // Clear form values
    commentInput.value = "";
    commentName.value = "";

    // Calls the function for better readability and encapsulation
    createNewComment();
}

//
function createNewComment() {
    // Get the comments from storage
    let recipesList = JSON.parse(localStorage.getItem("recipesList"));

    let recipeComments = recipesList[recipeIndex].comments;

    if (recipeComments) {
        // Gets the ul so the new li's can be appended
        let commentUl = document.getElementById("comments-ul");

        recipeComments.forEach((commentObject) => {
            // Retrieve values
            let userName = commentObject.userName;
            let comment = commentObject.comment;
            let commentDate = commentObject.commentDate;

            // Create new li element & add relevent class
            let newCommentLi = document.createElement("li");
            newCommentLi.classList.add("even-spacing-xs", "comments-wrapper");

            // Create h4 element for the comment name & add relevent class
            let commentH4 = document.createElement("h4");
            commentH4.classList.add("comment-name");
            commentH4.innerText = userName;

            // Create p element for comment date & add relevent class
            let commentDateP = document.createElement("p");
            commentDateP.classList.add("comments__date");
            commentDateP.innerText = commentDate;

            // Create p element for comment & add relevent class
            let commentP = document.createElement("p");
            commentP.classList.add("comment");
            commentP.innerText = comment;

            // Append comment name, date, and comment to the new li element
            newCommentLi.appendChild(commentH4);
            newCommentLi.appendChild(commentDateP);
            newCommentLi.appendChild(commentP);

            // Append the new li element to the comment list
            commentUl.appendChild(newCommentLi);
        });
    }
}
// Calls the function so all comments are loaded
createNewComment();

// Gets the comment submit button and adds event listener that calls the submitContent function
const commentSubBtn = document.getElementById("comment-submit-btn");
commentSubBtn.addEventListener("click", submitComment);
