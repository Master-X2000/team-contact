// Accessing the input fields
const queryControl = document.querySelectorAll(".query-control");
const form = document.querySelector(".contact-form");
const successAlert = document.querySelector(".success-prompt");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const emailAddress = document.querySelector("#email-address");
const userMessage = document.querySelector(".message-input");
const agree = document.querySelector("#permission");

let errorCount = 0; // Track the errors gotten after ever submission
let queryInput = ""; // The query type chosen

queryControl.forEach(queryControl => {

    queryControl.addEventListener("click", event => {
        const activeQuery = document.querySelector(".selected");
        if(activeQuery) { // Cancel active Query
            activeQuery.classList.remove("selected");
        }
        const queryRadio = queryControl.querySelector(".query-radio");

        const inputControl = document.querySelector(".query");
        queryRadio.addEventListener("click", event => {
            inputControl.classList.remove("fail");
        }); // Removes error after query type has been choosen

        queryRadio.click(); // Activates the radio btn
        queryInput = queryRadio.value;
        queryControl.classList.add("selected");
    });
});

agree.addEventListener("click", event => { // Handles the consent checkbox
    agree.classList.toggle("checked");
});

form.addEventListener("submit", event => {
    event.preventDefault();
    errorCount = 0; // Restarts the count after every submit btn click
    validateInputs(errorCount); // Validate the input values gotten.

    if(errorCount === 0) { // Handles the success promt display
        successAlert.classList.add("successful");
        const successAlertWidth = successAlert.clientWidth;

        // Positioning of the prompt center
        successAlert.style.left = `calc(50% - (${successAlertWidth}px / 2))`;

        successAlert.addEventListener("click", event => {
            successAlert.classList.remove("successful");
        });
    }
});

const setError = (element, message) => { // Display error messages
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add("fail");

    element.addEventListener("click", event => {
        inputControl.classList.remove("fail");
    })
}

const setSuccess = (element) => { // Removes error messages
    const inputControl = element.parentElement;
    inputControl.classList.remove("fail");
}

const setQueryError = (message) => { // Handles the error display for the query section
    const inputControl = document.querySelector(".query");
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add("fail");
}

const setQuerySuccess = () => { // Removes error message fot the query section
    const inputControl = document.querySelector(".query");
    inputControl.classList.remove("fail");
}

const setConsentError = (element, message) => { // Handles the error display for the Consent section
    const inputControl = document.querySelector(".consent");
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add("fail");

    element.addEventListener("click", event => {
        inputControl.classList.remove("fail");
    })
}

const setConsentSuccess = (element) => { // Removes error message fot the Consent section
    const inputControl = document.querySelector(".consent");
    inputControl.classList.remove("fail");
}

const validEmail = (email) => { // Validates the email input using regular expressions
    const regex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/g;
    const isValid = regex.test(email.trim().toLowerCase());
    return isValid
}

const validateInputs = () => {
    // Getting the input values
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailAddressValue = emailAddress.value.trim();
    const queryValue = queryInput;
    const userMessageValue = userMessage.value.trim();
    const agreeValue = agree.classList.contains("checked"); // Assigning true or false to agreeValue

    if(firstNameValue === "" ) { // Testing the first name input value
        setError(firstName, "This field is required");
        errorCount++;
    } else {
        setSuccess(firstName);
    }

    if(lastNameValue === "" ) { // Testing the last name input value
        setError(lastName, "This field is required");
        errorCount++;
    } else {
        setSuccess(lastName);
    }

    if(emailAddressValue === "" ) { // Testing the email input value
        setError(emailAddress, "This field is required");
        errorCount++;
    } else if (!validEmail(emailAddressValue)) {
        setError(emailAddress, "Please enter a valid email address");
        errorCount++;
    } else {
        setSuccess(emailAddress);
    }

    if(queryValue === "" ) { // Testing the query input value
        setQueryError("Please select a query type");
        errorCount++;
    } else {
        setQuerySuccess();
    }
    
    if(userMessageValue === "" ) { // Testing the user message input value
        setError(userMessage, "This field is required");
        errorCount++;
    } else {
        setSuccess(userMessage);
    }
    
    if(!agreeValue) { // Checking the consent section has been clicked
        setConsentError( agree,"To submit this form, please consent to being contacted");
        errorCount++;
    } else {
        setConsentSuccess(agree);
    }

    if(errorCount === 0) {
        const formValues = {
            userFirstName: firstNameValue,
            userLasttName: lastNameValue,
            userEmailAddress: emailAddressValue,
            userQueryValue: queryValue,
            userSubmittedMessage: userMessageValue,
            agreedConsent: agreeValue,
        }

        console.log(formValues);
    }
}