
document.addEventListener("DOMContentLoaded", function () {
	const mileageInput = document.querySelector(".mileage-form input");
	const nextButtons = document.querySelectorAll(
		".hidable-btn, .hidable-btncus"
	); // Select both buttons
	const form = document.querySelector(".mileage-form");

	// Create error message element
	const errorMessage = document.createElement("p");
	errorMessage.style.color = "red";
	errorMessage.style.fontSize = "14px";
	errorMessage.style.display = "none"; // Initially hidden
	form.appendChild(errorMessage);

	// Function to disable buttons
	function disableButtons() {
		nextButtons.forEach((button) => {
			button.classList.add("disabled");
			button.style.pointerEvents = "none";
		});
	}

	// Function to enable buttons
	function enableButtons() {
		nextButtons.forEach((button) => {
			button.classList.remove("disabled");
			button.style.pointerEvents = "auto";
		});
	}

	// Initially disable buttons
	disableButtons();

	mileageInput.addEventListener("input", function () {
		let rawValue = mileageInput.value.replace(/[^0-9.]/g, ""); // Keep only numbers and dots
		let numericValue = rawValue.replace(/\./g, ""); // Remove dots for validation
		let digitCount = numericValue.length; // Count actual digits

		// Limit to max 12 digits (auto-remove excess)
		if (digitCount > 12) {
			rawValue = rawValue.slice(0, 12); // Trim to 12 digits
			numericValue = rawValue.replace(/\./g, ""); // Update numeric value
			digitCount = numericValue.length;
		}

		mileageInput.value = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Format with commas

		// Validate input length (excluding commas and dots)
		if (digitCount < 3) {
			errorMessage.textContent = "This field is required";
			errorMessage.style.display = "block";
			disableButtons();
		} else {
			errorMessage.style.display = "none"; // Hide error when valid
			enableButtons();
		}
	});

	// Prevent form submission if input is invalid
	form.addEventListener("submit", function (event) {
		let rawValue = mileageInput.value.replace(/[^0-9.]/g, ""); // Remove everything except numbers and dots
		let numericValue = rawValue.replace(/\./g, ""); // Remove dots for validation
		let digitCount = numericValue.length;

		if (digitCount < 3) {
			event.preventDefault(); // Stop form submission
			errorMessage.style.display = "block";
		}
	});
});
