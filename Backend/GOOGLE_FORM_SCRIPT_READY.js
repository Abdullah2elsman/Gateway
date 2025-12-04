/**
 * Google Apps Script for Gateway Community Form Integration
 * READY TO USE - Just update the API_URL below
 */

// ============================================================================
// CONFIGURATION - UPDATE THIS WITH YOUR SERVER URL
// ============================================================================

// For local testing (if your server is accessible from internet):
const API_URL = "http://localhost:8000/api/v1/google-form/submit";

// For production (replace with your actual domain):
// const API_URL = "https://your-domain.com/api/v1/google-form/submit";

// ============================================================================
// MAIN FUNCTION - Triggered on Form Submit
// ============================================================================

function onFormSubmit(e) {
    try {
        Logger.log("=== Form Submitted ===");

        var responses = e.response.getItemResponses();

        // Initialize data object with all required fields
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

        // Extract responses
        for (var i = 0; i < responses.length; i++) {
            var response = responses[i];
            var question = response.getItem().getTitle();
            var answer = response.getResponse();

            Logger.log("Q: " + question);
            Logger.log("A: " + answer);

            // Map based on exact question text (UPDATED to match your actual form)
            if (question === "Full Name") {
                data.full_name = answer;
            }
            else if (question === "Mobile Number ( In English )") {
                data.mobile_number = answer;
            }
            else if (question === "Age") {
                data.age = answer;
            }
            else if (question === "Education") {
                data.education = answer;
            }
            else if (question === "Job") {
                data.job = answer;
            }
            else if (question === "Are you a currant trainee at Gateway Community ?") {
                data.is_current_trainee = answer;
            }
            else if (question === "If your answer is yes, so when ?") {
                data.when_joined = answer;
            }
            else if (question === "How did you hear about  Gateway Community ?") {
                // Handle multiple choice - join array if needed
                if (Array.isArray(answer)) {
                    data.how_did_you_hear = answer.join(", ");
                } else {
                    data.how_did_you_hear = answer;
                }
            }
            else if (question === "What`s your preferable time of the course ? (بشكل مبدأي)") {
                // Handle multiple choice - join array if needed
                if (Array.isArray(answer)) {
                    data.preferable_time = answer.join(", ");
                } else {
                    data.preferable_time = answer;
                }
            }
        }

        Logger.log("=== Mapped Data ===");
        Logger.log(JSON.stringify(data, null, 2));

        // Send data to API
        sendToAPI(data);

    } catch (error) {
        Logger.log("❌ ERROR in onFormSubmit: " + error.toString());
        Logger.log(error.stack);
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

        Logger.log("📤 Sending to: " + API_URL);

        var response = UrlFetchApp.fetch(API_URL, options);
        var responseCode = response.getResponseCode();
        var responseText = response.getContentText();

        Logger.log("📥 Response Code: " + responseCode);
        Logger.log("📥 Response: " + responseText);

        if (responseCode === 201) {
            Logger.log("✅ SUCCESS! Data saved to database.");
            var result = JSON.parse(responseText);
            Logger.log("Trainee ID: " + result.trainee_id);
        } else {
            Logger.log("❌ ERROR! Response code: " + responseCode);
            Logger.log("Response: " + responseText);
        }

    } catch (error) {
        Logger.log("❌ ERROR sending to API: " + error.toString());
        Logger.log(error.stack);
    }
}

// ============================================================================
// TEST FUNCTION - Run this manually to test
// ============================================================================

function testConnection() {
    Logger.log("=== Testing Connection ===");

    var testData = {
        full_name: "Test User from Script",
        mobile_number: "+201234567890",
        age: "25",
        education: "Bachelor",
        job: "Engineer",
        is_current_trainee: "No",
        when_joined: "",
        how_did_you_hear: "Social Media",
        preferable_time: "Morning"
    };

    Logger.log("Test Data:");
    Logger.log(JSON.stringify(testData, null, 2));

    sendToAPI(testData);
}

// ============================================================================
// DEBUG FUNCTION - View form questions
// ============================================================================

function listFormQuestions() {
    var form = FormApp.getActiveForm();
    var items = form.getItems();

    Logger.log("=== Form Questions ===");

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        Logger.log((i + 1) + ". " + item.getTitle());
        Logger.log("   Type: " + item.getType());
    }
}
