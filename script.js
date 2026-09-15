```javascript id="p3q8vk"
// =====================================================
// HAVEN — SCRIPT.JS
// =====================================================


// =====================================================
// SHARED FUNCTIONS
// =====================================================

function shareLocation() {

    if (!navigator.geolocation) {
        alert("Location is not supported by this browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            window.open(
                "https://www.google.com/maps?q=" +
                latitude +
                "," +
                longitude,
                "_blank"
            );

        },

        function() {
            alert("Unable to access your location.");
        }
    );
}


function findSafePlace() {

    window.open(
        "https://www.google.com/maps/search/police+station+hospital+near+me",
        "_blank"
    );

}


// =====================================================
// GET HELP PAGE
// =====================================================

const situationCards =
    document.querySelectorAll(".situation-card");

if (situationCards.length > 0) {

    const title =
        document.querySelector(".dev-response h2");

    const text =
        document.querySelector(".dev-response p");

    situationCards.forEach(function(card) {

        card.addEventListener("click", function() {

            const situation =
                card.querySelector("h2").innerText;


            if (situation === "I feel unsafe") {

                title.innerText =
                    "Stay where you feel safest.";

                text.innerText =
                    "I'm with you. Move towards a public or well-lit place if you can. If you are in immediate danger, use SOS.";

            }


            else if (situation === "Someone is following me") {

                title.innerText =
                    "Don't go home yet.";

                text.innerText =
                    "Move towards a crowded place, shop, security desk, or police station. Avoid confronting the person. Use SOS if you feel in immediate danger.";

            }


            else if (situation === "I'm lost") {

                title.innerText =
                    "Let's get you somewhere safe.";

                text.innerText =
                    "Stay in a public place and check your location. I can help you decide what to do next.";

            }


            else if (
                situation ===
                "I need someone to talk to"
            ) {

                title.innerText =
                    "You don't have to handle it alone.";

                text.innerText =
                    "Take a breath. Tell me what's going on, one step at a time. I'm here to help you figure out what to do next.";

            }

        });

    });


    // Get Help SOS

    const sosButton =
        document.querySelector(".emergency-action");

    const sosPanel =
        document.getElementById("sosPanel");

    const closeSos =
        document.querySelector(".close-sos");


    if (sosButton && sosPanel) {

        sosButton.addEventListener(
            "click",
            function() {

                sosPanel.classList.add("active");

            }
        );

    }


    if (closeSos && sosPanel) {

        closeSos.addEventListener(
            "click",
            function() {

                sosPanel.classList.remove("active");

            }
        );

    }


    const callButton =
        document.querySelector(".call-btn");

    if (callButton) {

        callButton.addEventListener(
            "click",
            function() {

                window.location.href =
                    "tel:112";

            }
        );

    }


    const locationButton =
        document.querySelector(".dev-action");

    if (locationButton) {

        locationButton.addEventListener(
            "click",
            shareLocation
        );

    }


    const safePlaceButton =
        document.querySelector(
            ".dev-action:nth-child(3)"
        );

    if (safePlaceButton) {

        safePlaceButton.addEventListener(
            "click",
            findSafePlace
        );

    }

}


// =====================================================
// ASK DEV — SIMPLE CHATBOT
// =====================================================

const sendButton =
    document.getElementById("sendButton");

const input =
    document.getElementById("userInput");

const chat =
    document.getElementById("chatWindow");


// IMPORTANT:
// Only run this section on Ask DEV page.

if (sendButton && input && chat) {


    // Current conversation step

    let step = "name";


    // Visitor information

    let visitorName = "";

    let visitorAge = "";

    let visitorLocation = "";

    let visitorEmail = "";


    // ---------------------------------------------
    // Add user's message
    // ---------------------------------------------

    function addUserMessage(message) {

        const box =
            document.createElement("div");

        box.className =
            "user-message";


        const paragraph =
            document.createElement("p");

        paragraph.innerText =
            message;


        box.appendChild(paragraph);


        const inputArea =
            document.querySelector(
                ".chat-input-area"
            );


        chat.insertBefore(
            box,
            inputArea
        );

    }


    // ---------------------------------------------
    // Add DEV message
    // ---------------------------------------------

    function addDevMessage(message) {

        const box =
            document.createElement("div");

        box.className =
            "dev-message";


        const label =
            document.createElement("div");

        label.className =
            "message-label";


        const dot =
            document.createElement("span");


        label.appendChild(dot);


        label.appendChild(
            document.createTextNode("DEV")
        );


        const paragraph =
            document.createElement("p");

        paragraph.innerText =
            message;


        box.appendChild(label);

        box.appendChild(paragraph);


        const inputArea =
            document.querySelector(
                ".chat-input-area"
            );


        chat.insertBefore(
            box,
            inputArea
        );

    }


    // ---------------------------------------------
    // Placeholder
    // ---------------------------------------------

    function updatePlaceholder() {

        if (step === "name") {

            input.placeholder =
                "Enter your name...";

        }

        else if (step === "age") {

            input.placeholder =
                "Enter your age...";

        }

        else if (step === "location") {

            input.placeholder =
                "Where are you right now?";

        }

        else if (step === "email") {

            input.placeholder =
                "Enter your email...";

        }

        else {

            input.placeholder =
                "Tell DEV what's happening...";

        }

    }


    // ---------------------------------------------
    // Process message
    // ---------------------------------------------

    function processMessage(message) {


        // NAME

        if (step === "name") {

            visitorName =
                message;

            step =
                "age";


            addDevMessage(
                "Nice to meet you, " +
                visitorName +
                ". How old are you?"
            );


            updatePlaceholder();

            return;

        }


        // AGE

        if (step === "age") {

            if (
                isNaN(message) ||
                Number(message) < 1 ||
                Number(message) > 120
            ) {

                addDevMessage(
                    "Please enter your age as a number."
                );

                return;

            }


            visitorAge =
                message;

            step =
                "location";


            addDevMessage(
                "Got it. Where are you right now? You can give me your city or area."
            );


            updatePlaceholder();

            return;

        }


        // LOCATION

        if (step === "location") {

            visitorLocation =
                message;

            step =
                "email";


            addDevMessage(
                "Okay. What's the best email address to reach you?"
            );


            updatePlaceholder();

            return;

        }


        // EMAIL

        if (step === "email") {

            if (
                !message.includes("@") ||
                !message.includes(".")
            ) {

                addDevMessage(
                    "Please enter a valid email address."
                );

                return;

            }


            visitorEmail =
                message;

            step =
                "grievance";


            addDevMessage(
                "Thank you. I've got what I need."
            );


            setTimeout(
                function() {

                    addDevMessage(
                        "So... tell me. How can I help?"
                    );

                },
                900
            );


            updatePlaceholder();

            return;

        }


        // GRIEVANCE

        if (step === "grievance") {

            addDevMessage(
                "I'm listening. Tell me what's happening, and I'll help you figure out the safest next step."
            );


            step =
                "finished";


            updatePlaceholder();

            return;

        }


        // FINISHED

        if (step === "finished") {

            addDevMessage(
                "I'm here. Tell me anything else you think I should know."
            );

        }

    }


    // ---------------------------------------------
    // SEND BUTTON
    // ---------------------------------------------

    sendButton.addEventListener(
        "click",
        function() {

            const message =
                input.value.trim();


            if (message === "") {

                return;

            }


            addUserMessage(
                message
            );


            input.value =
                "";


            processMessage(
                message
            );

        }
    );


    // ---------------------------------------------
    // ENTER KEY
    // ---------------------------------------------

    input.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                sendButton.click();

            }

        }
    );


    updatePlaceholder();

}


// =====================================================
// ASK DEV — EMERGENCY ACTIONS
// =====================================================

document.addEventListener(
    "click",
    function(event) {


        // SOS

        if (
            event.target.closest(
                ".sos-chat-action"
            )
        ) {

            const panel =
                document.getElementById(
                    "devSosPanel"
                );


            if (panel) {

                panel.classList.add(
                    "active"
                );

            }

        }


        // Location

        if (
            event.target.closest(
                ".location-chat-action"
            )
        ) {

            shareLocation();

        }


        // Safe place

        if (
            event.target.closest(
                ".safe-chat-action"
            )
        ) {

            findSafePlace();

        }


        // Call 112

        if (
            event.target.closest(
                "#devCall112"
            )
        ) {

            window.location.href =
                "tel:112";

        }


        // SOS location

        if (
            event.target.closest(
                "#devShareLocation"
            )
        ) {

            shareLocation();

        }


        // Close SOS

        if (
            event.target.closest(
                "#devCloseSos"
            )
        ) {

            const panel =
                document.getElementById(
                    "devSosPanel"
                );


            if (panel) {

                panel.classList.remove(
                    "active"
                );

            }

        }

    }
);
// =====================================================
// DEV CHAT — DIRECT SEND
// =====================================================

window.sendDevMessage = function () {

    const input = document.getElementById("userInput");
    const chat = document.getElementById("chatWindow");

    if (!input || !chat) {
        return;
    }

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    // Show user's message
    const userBox = document.createElement("div");
    userBox.className = "user-message";

    const userText = document.createElement("p");
    userText.innerText = message;

    userBox.appendChild(userText);

    const inputArea = document.querySelector(".chat-input-area");

    chat.insertBefore(userBox, inputArea);

    input.value = "";

    // DEV response
    const devBox = document.createElement("div");
    devBox.className = "dev-message";

    const devLabel = document.createElement("div");
    devLabel.className = "message-label";

    const dot = document.createElement("span");
    devLabel.appendChild(dot);
    devLabel.appendChild(document.createTextNode("DEV"));

    const devText = document.createElement("p");

    devText.innerText =
        "Nice to meet you. I'm DEV. How can I help you today?";

    devBox.appendChild(devLabel);
    devBox.appendChild(devText);

    chat.insertBefore(devBox, inputArea);
};