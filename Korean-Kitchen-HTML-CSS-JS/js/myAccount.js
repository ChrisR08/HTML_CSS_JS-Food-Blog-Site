// My Account Page ============================================================
/*
 */
//
function displaySavedRecipes() {
    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

    let recipeListUl = document.getElementById("my-account-ul");

    savedRecipes.forEach((recipe) => {
        let { title, imageUrlJpg, imageUrlWebP, description, url } = recipe;

        // Create a copy of the existing recipe card from the other pages
        let recipeCard = document.createElement("li");
        recipeCard.classList.add(
            "recipe-card",
            "flex",
            "flex-col",
            "even-spacing-m"
        );

        // Create the recipe card content section & add classes
        let recipeCardContent = document.createElement("div");
        recipeCardContent.classList.add(
            "recipe-card__content",
            "even-spacing-s"
        );

        // Creates the link
        let recipeTitle = document.createElement("a");
        recipeTitle.classList.add("clickable-parent");
        recipeTitle.setAttribute("href", url);
        // Creates the heading
        let recipeTitleText = document.createElement("h3");
        recipeTitleText.classList.add("h3", "text-dark");
        recipeTitleText.textContent = title;
        recipeTitle.appendChild(recipeTitleText);
        recipeCardContent.appendChild(recipeTitle);

        // Creates the description <p>
        let recipeDescription = document.createElement("p");
        recipeDescription.classList.add("recipe-card__excerpt");
        recipeDescription.textContent = description;
        recipeCardContent.appendChild(recipeDescription);

        // Creates the Read more <p>
        let readMore = document.createElement("p");
        readMore.classList.add("recipe-card__read-more", "text-blue");
        readMore.textContent = "View Recipe";
        recipeCardContent.appendChild(readMore);

        // Adds the content div to the card
        recipeCard.appendChild(recipeCardContent);

        // Create the picture element & add the image src & classes
        let picture = document.createElement("picture");
        picture.classList.add("recipe-card__img-container");
        let source = document.createElement("source");
        source.setAttribute("srcset", imageUrlJpg);
        picture.appendChild(source);

        // Creates the image
        let image = document.createElement("img");
        image.classList.add("section-cat__img", "cover-img");
        // For speed optimisation
        if (savedRecipes.indexOf(recipe) === 0) {
            image.setAttribute("loading", "eager");
        } else {
            image.setAttribute("loading", "lazy");
        }
        image.setAttribute("src", imageUrlWebP);
        image.setAttribute("alt", title);
        picture.appendChild(image);

        recipeCard.appendChild(picture);
        // Adds the new recipe card to the DOM
        recipeListUl.appendChild(recipeCard);
    });
}
displaySavedRecipes();
