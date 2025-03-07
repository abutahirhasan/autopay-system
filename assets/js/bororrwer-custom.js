document.addEventListener("DOMContentLoaded", function () {
	const form = document.querySelector(".autoplay-form-section");
	if (!form) return; // Exit if the form doesn't exist

	const dobWrapper = form.querySelector(".just-dobable"); // Get the wrapper div
	const dobInput = dobWrapper ? dobWrapper.querySelector("input") : null; // Get the input safely
	const nextButton = document.querySelector(".hidable-btn2");
	const quriteButton = document.querySelector(".qurite-btn");

	// Ensure the "Next" button is disabled by default
	nextButton.classList.add("disabled");
	nextButton.style.pointerEvents = "none";

	// Ensure dobInput exists before setting attributes
	if (dobInput) {
		dobInput.setAttribute("type", "date");
	}

	function validateForm() {
		let allFilled = true;

		form
			.querySelectorAll(
				"input[required], textarea[required], select[required]"
			)
			.forEach((input) => {
				let errorMessage = input.nextElementSibling;

				// Create an error message if it doesn’t exist
				if (
					!errorMessage ||
					!errorMessage.classList.contains("error-message")
				) {
					errorMessage = document.createElement("p");
					errorMessage.classList.add("error-message");
					errorMessage.style.color = "red";
					errorMessage.style.fontSize = "12px";
					errorMessage.style.display = "none"; // Default hidden
					input.parentNode.appendChild(errorMessage);
				}

				// Handle specific validation for Date of Birth
				if (input === dobInput) {
					if (!dobInput.value) {
						allFilled = false;
						errorMessage.textContent = "Please enter a valid date.";
						errorMessage.style.display = "block";
					} else {
						errorMessage.style.display = "none";
					}
				} else {
					// General validation for other required fields
					if (
						input.value.trim() === "" &&
						input.classList.contains("touched")
					) {
						allFilled = false;
						errorMessage.textContent = "This field is required";
						errorMessage.style.display = "block";
					} else {
						errorMessage.style.display = "none";
					}
				}
			});

		// Enable or disable the "Next" button
		if (allFilled) {
			nextButton.classList.remove("disabled");
			nextButton.style.pointerEvents = "auto";
		} else {
			nextButton.classList.add("disabled");
			nextButton.style.pointerEvents = "none";
		}

		// Special logic for .just-dobable input affecting .qurite-btn
		if (dobInput && !dobInput.value) {
			quriteButton.classList.remove("active");
		} else if (dobInput) {
			quriteButton.classList.add("active");
		}
	}

	// Add event listeners for input and blur events
	form
		.querySelectorAll("input[required], textarea[required], select[required]")
		.forEach((input) => {
			input.addEventListener("input", validateForm);
			input.addEventListener("blur", function () {
				input.classList.add("touched"); // Mark as touched
				validateForm();
			});
		});

	validateForm(); // Initial validation check
});

// Number Formatting for formattedInput field
document
	.getElementById("formattedInput")
	?.addEventListener("input", function (e) {
		let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
		if (value.length > 12) {
			value = value.slice(0, 12); // Limit to max 12 digits
		}
		value = value.replace(/\B(?=(\d{3})+(?!\d))/g, "-"); // Add dashes every 3 digits
		e.target.value = value;
	});
