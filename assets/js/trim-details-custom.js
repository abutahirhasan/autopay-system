document.addEventListener("DOMContentLoaded", function () {
	const mileageInput = document.querySelector(".mileage-form input");
	const nextButton = document.querySelector(".hidable-btn");
	const form = document.querySelector(".mileage-form");

	// Create error message element
	const errorMessage = document.createElement("p");
	errorMessage.style.color = "red";
	errorMessage.style.fontSize = "14px";
	errorMessage.style.display = "none"; // Initially hidden
	form.appendChild(errorMessage);

	// Initially disable the button
	nextButton.classList.add("disabled");
	nextButton.style.pointerEvents = "none"; // Prevent clicking

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
			nextButton.classList.add("disabled");
			nextButton.style.pointerEvents = "none";
		} else {
			errorMessage.style.display = "none"; // Hide error when valid
			nextButton.classList.remove("disabled");
			nextButton.style.pointerEvents = "auto";
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
