document.addEventListener("DOMContentLoaded", function () {
	const showMoreButton = document.querySelector(".show-more");
	const hiddenItems = document.querySelectorAll(".hidden-item");
	let isHidden = true;

	showMoreButton.addEventListener("click", function (event) {
		event.preventDefault(); // Prevent the default link behavior

		if (isHidden) {
			hiddenItems.forEach((item) => {
				item.style.display = "block"; // Show the hidden items
			});
			showMoreButton.textContent = "Show Less";
		} else {
			hiddenItems.forEach((item) => {
				item.style.display = "none"; // Hide the items again
			});
			showMoreButton.textContent = "Show More";
		}

		isHidden = !isHidden; // Toggle the state
	});
});
