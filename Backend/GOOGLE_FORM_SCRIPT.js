/**
 * Google Apps Script for Gateway Community Form Integration
 * 
 * Setup Instructions:
 * 1. Open your Google Form
 * 2. Click the three dots (⋮) → Script editor
 * 3. Delete any existing code and paste this script
 * 4. Update the API_URL with your actual domain
 * 5. Save the script (Ctrl+S)
 * 6. Click Triggers (clock icon) → Add Trigger
 * 7. Configure: Function: onFormSubmit, Event: On form submit
 * 8. Save and authorize the script
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

// Update this with your actual API URL
const API_URL = "http://localhost:8000/api/v1/google-form/submit";

// If you're using production, use your production URL:
// const API_URL = "https://your-domain.com/api/v1/google-form/submit";

// ============================================================================
// MAIN FUNCTION - Triggered on Form Submit
// ============================================================================

function onFormSubmit(e) {
    try {
        Logger.log("Form submitted - Processing...");

        var form = FormApp.getActiveForm();
        var responses = e.response.getItemResponses();

        // Initialize data object
        var data = {
            full_name: "",
            mobile_number: "",
            age: "",
            education: "",
            job: "",
            is_current_trainee: "",
            when_joined: "",
            how_did_you_hear: "",
            preferable_time: ""
        };

        // Extract responses and map to data fields
        for (var i = 0; i < responses.length; i++) {
            var response = responses[i];
            var question = response.getItem().getTitle().toLowerCase();
            var answer = response.getResponse();

            Logger.log("Question: " + question + " | Answer: " + answer);

            // Map questions to fields based on keywords
            if (question.includes("full name") || question.includes("name")) {
                data.full_name = answer;
            }
            else if (question.includes("mobile") || question.includes("moblie") || question.includes("phone")) {
                data.mobile_number = answer;
            }
            else if (question.includes("age") && !question.includes("gateway")) {
                data.age = answer;
            }
            else if (question.includes("education")) {
                data.education = answer;
            }
            else if (question.includes("job")) {
                data.job = answer;
            }
            else if (question.includes("current trainee") || question.includes("currant trainee")) {
                data.is_current_trainee = answer;
            }
            else if (question.includes("when") || question.includes("if your answer is yes")) {
                data.when_joined = answer;
            }
            else if (question.includes("how did you hear") || question.includes("hear about")) {
                // Handle multiple choice - join array if needed
                if (Array.isArray(answer)) {
                    data.how_did_you_hear = answer.join(", ");
                } else {
                    data.how_did_you_hear = answer;
                }
            }
            else if (question.includes("preferable time") || question.includes("time of the course")) {
                // Handle multiple choice - join array if needed
                if (Array.isArray(answer)) {
                    data.preferable_time = answer.join(", ");
                } else {
                    data.preferable_time = answer;
                }
            }
        }

        Logger.log("Mapped Data: " + JSON.stringify(data));

        // Send data to API
        sendToAPI(data);

    } catch (error) {
        Logger.log("Error in onFormSubmit: " + error.toString());

        // Optional: Send error notification email
        // MailApp.sendEmail("admin@gateway.com", "Form Submission Error", error.toString());
    }
}

// ============================================================================
// SEND DATA TO API
// ============================================================================

function sendToAPI(data) {
    try {
        var options = {
            "method": "post",
            "contentType": "application/json",
            "payload": JSON.stringify(data),
            "muteHttpExceptions": true
        };

        Logger.log("Sending to API: " + API_URL);
        Logger.log("Payload: " + JSON.stringify(data));

        var response = UrlFetchApp.fetch(API_URL, options);
        var responseCode = response.getResponseCode();
        var responseText = response.getContentText();

        Logger.log("Response Code: " + responseCode);
        Logger.log("Response: " + responseText);

        if (responseCode === 201) {
            Logger.log("✓ Success! Data saved to database.");
        } else {
            Logger.log("✗ Error! Response code: " + responseCode);
            Logger.log("Response: " + responseText);
        }

    } catch (error) {
        Logger.log("Error sending to API: " + error.toString());
    }
}

// ============================================================================
// TEST FUNCTION - Run this manually to test the connection
// ============================================================================

function testConnection() {
    var testData = {
        full_name: "Test User",
        mobile_number: "+201234567890",
        age: "25",
        education: "Bachelor",
        job: "Engineer",
        is_current_trainee: "No",
        when_joined: "",
        how_did_you_hear: "Social Media",
        preferable_time: "Morning"
    };

    Logger.log("Testing connection with sample data...");
    sendToAPI(testData);
}

// ============================================================================
// UTILITY FUNCTION - View all form questions (for debugging)
// ============================================================================

function listFormQuestions() {
    var form = FormApp.getActiveForm();
    var items = form.getItems();

    Logger.log("Form Questions:");
    Logger.log("================");

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        Logger.log((i + 1) + ". " + item.getTitle());
        Logger.log("   Type: " + item.getType());
    }
}
