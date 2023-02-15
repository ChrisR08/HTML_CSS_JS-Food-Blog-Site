// Contact Form ===============================================================
// Gets the form element and the form input elements
let contactForm = document.getElementById("contact-form");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let messageInput = document.getElementById("message");

// Gets the contact form section and wrapper for DOM manipulation
let contactSection = document.getElementById("contact-us");
let contactWrapper = document.getElementById("contact-wrapper");

// Listen for form submission
contactForm.addEventListener("submit", function (e) {
    // prevent default form submission
    e.preventDefault();
    // Trim whitespace from inputs
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let message = messageInput.value.trim();

    if (name !== "" && email !== "" && message !== "") {
        // Store the form data in local storage
        let formData = {
            name: name,
            email: email,
            message: message,
        };

        // Retrieves either the object "userMessages" or if it does not exist initialises an array
        let msgList = localStorage.getItem("userMessages");

        if (msgList) {
            msgList = JSON.parse(msgList);
        } else {
            msgList = [];
        }

        msgList.push(formData);
        console.log(msgList);
        localStorage.setItem("userMessages", JSON.stringify(msgList));

        // Clear the form inputs
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";

        // Hide the contact form, create a success message and display it tp the user
        contactWrapper.style.display = "none";
        let successMsg = document.createElement("p");
        successMsg.textContent =
            "Your message has been submitted successfully!";
        successMsg.style.color = "let(--clr-dark)";
        contactSection.appendChild(successMsg);
    }
});
