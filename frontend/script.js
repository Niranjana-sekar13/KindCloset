console.log("KindCloset frontend loaded successfully!");

document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // COMMON ELEMENTS
    // =========================

    const shareForm = document.querySelector("#shareForm");
    const itemsSection = document.querySelector("#items");
    const itemsContainer = document.querySelector(".items-container");

    // =========================
    // SHARE ITEM BUTTON
    // =========================

    const shareButton = document.querySelector("#shareItemBtn");
    const startSharingButton = document.querySelector("#startSharingBtn");

    function showShareForm() {
        if (shareForm) {
            shareForm.style.display = "block";

            shareForm.scrollIntoView({
                behavior: "smooth"
            });
        }
    }

    if (shareButton) {
        shareButton.addEventListener("click", showShareForm);
    }

    if (startSharingButton) {
        startSharingButton.addEventListener("click", showShareForm);
    }

    // =========================
    // SUBMIT ITEM TO MYSQL
    // =========================

    const itemForm = document.querySelector("#itemForm");
    const formMessage = document.querySelector("#formMessage");

    if (itemForm) {
        itemForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const itemName = document
                .querySelector("#itemName")
                .value
                .trim();

            const category = document
                .querySelector("#itemCategory")
                .value;

            const description = document
                .querySelector("#itemDescription")
                .value
                .trim();

            const location = document
                .querySelector("#itemLocation")
                .value
                .trim();

            if (formMessage) {
                formMessage.textContent = "Saving item...";
                formMessage.style.color = "black";
            }

            try {
                const response = await fetch(
                    "http://localhost:5000/api/items",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            itemName: itemName,
                            category: category,
                            description: description,
                            location: location
                        })
                    }
                );

                const data = await response.json();

                if (response.ok && data.success) {
                    if (formMessage) {
                        formMessage.textContent =
                            "Item shared successfully!";
                        formMessage.style.color = "green";
                    }

                    console.log("Item saved:", data.item);

                    itemForm.reset();
                } else {
                    if (formMessage) {
                        formMessage.textContent =
                            data.message || "Unable to save item.";
                        formMessage.style.color = "red";
                    }
                }

            } catch (error) {
                console.error("Backend connection error:", error);

                if (formMessage) {
                    formMessage.textContent =
                        "Unable to connect to the server.";
                    formMessage.style.color = "red";
                }
            }
        });
    }

    // =========================
    // FIND ITEMS
    // =========================

    const findItemsButton = document.querySelector("#findItemsBtn");

    if (findItemsButton) {
        findItemsButton.addEventListener("click", async function () {

            if (itemsSection) {
                itemsSection.style.display = "block";

                itemsSection.scrollIntoView({
                    behavior: "smooth"
                });
            }

            if (!itemsContainer) {
                return;
            }

            itemsContainer.innerHTML =
                "<p>Loading available items...</p>";

            try {
                const response = await fetch(
                    "http://localhost:5000/api/items"
                );

                if (!response.ok) {
                    throw new Error("Unable to fetch items");
                }

                const items = await response.json();

                if (items.length === 0) {
                    itemsContainer.innerHTML =
                        "<p>No items have been shared yet.</p>";
                    return;
                }

                itemsContainer.innerHTML = "";

                items.forEach(function (item) {
                    const card = document.createElement("div");

                    card.className = "item-card";

                    card.innerHTML = `
                        <div class="item-image">🎁</div>

                        <div class="item-info">
                            <span>${item.category}</span>

                            <h3>${item.item_name}</h3>

                            <p>${item.description}</p>

                            <p>
                                <strong>Location:</strong>
                                ${item.location}
                            </p>

                            <button
                                class="primary-btn view-new-item"
                                type="button">
                                View Item
                            </button>
                        </div>
                    `;

                    itemsContainer.appendChild(card);
                });

            } catch (error) {
                console.error("Loading items failed:", error);

                itemsContainer.innerHTML =
                    "<p>Unable to load items from the server.</p>";
            }
        });
    }

    // =========================
    // LOGIN AND SIGN UP POPUPS
    // =========================

    const loginBtn = document.querySelector("#loginBtn");
    const signupBtn = document.querySelector("#signupBtn");

    const loginPopup = document.querySelector("#loginPopup");
    const signupPopup = document.querySelector("#signupPopup");

    const closeLogin = document.querySelector("#closeLogin");
    const closeSignup = document.querySelector("#closeSignup");

    if (loginBtn && loginPopup) {
        loginBtn.addEventListener("click", function () {
            loginPopup.style.display = "flex";
        });
    }

    if (signupBtn && signupPopup) {
        signupBtn.addEventListener("click", function () {
            signupPopup.style.display = "flex";
        });
    }

    if (closeLogin && loginPopup) {
        closeLogin.addEventListener("click", function () {
            loginPopup.style.display = "none";
        });
    }

    if (closeSignup && signupPopup) {
        closeSignup.addEventListener("click", function () {
            signupPopup.style.display = "none";
        });
    }

    if (loginPopup) {
        loginPopup.addEventListener("click", function (event) {
            if (event.target === loginPopup) {
                loginPopup.style.display = "none";
            }
        });
    }

    if (signupPopup) {
        signupPopup.addEventListener("click", function (event) {
            if (event.target === signupPopup) {
                signupPopup.style.display = "none";
            }
        });
    }

    // =========================
    // LOGIN BUTTON
    // =========================

    const loginSubmit = document.querySelector("#loginSubmit");
    const loginMessage = document.querySelector("#loginMessage");

    if (loginSubmit) {
        loginSubmit.addEventListener("click", function () {

            const email = document
                .querySelector("#loginEmail")
                .value
                .trim();

            const password = document
                .querySelector("#loginPassword")
                .value
                .trim();

            if (email === "" || password === "") {
                if (loginMessage) {
                    loginMessage.textContent =
                        "Please enter email and password.";
                    loginMessage.style.color = "red";
                }
                return;
            }

            if (loginMessage) {
                loginMessage.textContent =
                    "Login feature is ready for backend connection.";
                loginMessage.style.color = "green";
            }

            console.log("Login button clicked");
        });
    }

    // =========================
    // SIGN UP BUTTON
    // =========================

    const signupSubmit = document.querySelector("#signupSubmit");
    const signupMessage = document.querySelector("#signupMessage");

    if (signupSubmit) {
        signupSubmit.addEventListener("click", function () {

            const name = document
                .querySelector("#signupName")
                .value
                .trim();

            const email = document
                .querySelector("#signupEmail")
                .value
                .trim();

            const password = document
                .querySelector("#signupPassword")
                .value
                .trim();

            const phone = document
                .querySelector("#signupPhone")
                .value
                .trim();

            if (
                name === "" ||
                email === "" ||
                password === "" ||
                phone === ""
            ) {
                if (signupMessage) {
                    signupMessage.textContent =
                        "Please fill in all the fields.";
                    signupMessage.style.color = "red";
                }
                return;
            }

            if (signupMessage) {
                signupMessage.textContent =
                    "Sign up form submitted successfully.";
                signupMessage.style.color = "green";
            }

            console.log("Sign up button clicked");
        });
    }

    // =========================
    // BACKEND CONNECTION CHECK
    // =========================

    fetch("http://localhost:5000")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("Backend connected:", data.message);
        })
        .catch(function (error) {
            console.error("Backend connection failed:", error);
        });

});