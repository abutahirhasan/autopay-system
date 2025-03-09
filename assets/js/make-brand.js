// document.addEventListener("DOMContentLoaded", function () {
// 	const showMoreButton = document.querySelector(".show-more");
// 	const hiddenItems = document.querySelectorAll(".hidden-item");
// 	let isHidden = true;

// 	showMoreButton.addEventListener("click", function (event) {
// 		event.preventDefault(); // Prevent the default link behavior

// 		if (isHidden) {
// 			// Show hidden items
// 			hiddenItems.forEach((item) => {
// 				item.style.display = "block";
// 			});
// 			showMoreButton.textContent = "Show Less"; // Change button text
// 		} else {
// 			// Hide items again
// 			hiddenItems.forEach((item) => {
// 				item.style.display = "none";
// 			});
// 			showMoreButton.textContent = "Show More"; // Change button text
// 		}

// 		isHidden = !isHidden; // Toggle the state
// 	});
// });

document.addEventListener("DOMContentLoaded", function () {
	const showMoreButton = document.querySelector(".show-more");
	const hiddenItems = document.querySelectorAll(".hidden-item");

	if (!showMoreButton) return;

	showMoreButton.addEventListener("click", function (event) {
		event.preventDefault();
		hiddenItems.forEach((item) => item.classList.toggle("hidden-item"));
		showMoreButton.textContent =
			showMoreButton.textContent === "Show More" ? "Show Less" : "Show More";
	});
});
