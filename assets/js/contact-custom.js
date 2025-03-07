document.addEventListener("DOMContentLoaded", function () {
	const form = document.querySelector(".autoplay-form-section");
	if (!form) return; // Exit if the form doesn't exist

	const dobInput = form.querySelector(".just-dobable input");
	const nextButton = document.querySelector(".hidable-btn2");
	const quriteButton = document.querySelector(".qurite-btn");

	// Ensure the "Next" button is disabled by default
	nextButton.classList.add("disabled");
	nextButton.style.pointerEvents = "none";

	// Ensure the Date of Birth field is a date type (if supported)
	dobInput.setAttribute("type", "date");

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
					errorMessage.textContent = "This field is required";
					errorMessage.classList.add("error-message");
					errorMessage.style.color = "red";
					errorMessage.style.fontSize = "12px";
					errorMessage.style.display = "none"; // Default hidden
					input.parentNode.appendChild(errorMessage);
				}

				// Show error only if the field is empty and has been interacted with
				if (
					input.value.trim() === "" &&
					input.classList.contains("touched")
				) {
					allFilled = false;
					input.classList.remove("active"); // Remove active class if empty
					errorMessage.style.display = "block"; // Show error
				} else if (input.value.trim() !== "") {
					input.classList.add("active"); // Add active class if filled
					errorMessage.style.display = "none"; // Hide error
				} else {
					input.classList.remove("active"); // Remove active class if empty
					errorMessage.style.display = "none"; // Hide error if untouched
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
		if (dobInput.value.trim() === "") {
			quriteButton.classList.remove("active"); // Remove active class if empty
		} else {
			quriteButton.classList.add("active"); // Add active class if filled
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

document
	.getElementById("formattedInput")
	.addEventListener("input", function (e) {
		let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
		if (value.length > 12) {
			value = value.slice(0, 12); // Limit to max 12 digits
		}
		value = value.replace(/\B(?=(\d{3})+(?!\d))/g, "-"); // Add commas every 3 digits
		e.target.value = value;
	});
