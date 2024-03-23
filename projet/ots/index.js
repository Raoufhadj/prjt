// Wait for the DOM to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function() {
    // Get all the "Shipped" buttons
    var shippedButtons = document.querySelectorAll('.shipped');

    // Loop through each "Shipped" button and add a click event listener
    shippedButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the parent row of the clicked button
            var parentRow = this.closest('tr');

            // Find the cell containing the shipping status
            var statusCell = parentRow.querySelector('td:nth-child(7)');

            // Update the shipping status to "Shipped"
            statusCell.textContent = "Shipped";
        });
    });

    // Get all the "Delete" buttons
    var deleteButtons = document.querySelectorAll('.delete');

    // Loop through each "Delete" button and add a click event listener
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the parent row of the clicked button and remove it from the table
            var parentRow = this.closest('tr');
            parentRow.parentNode.removeChild(parentRow);
        });
    });
});
// Wait for the DOM to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function() {
    // Get all the "Accept" buttons
    var acceptButtons = document.querySelectorAll('.Accept');

    // Loop through each "Accept" button and add a click event listener
    acceptButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the parent row of the clicked button
            var parentRow = this.closest('tr');

            // Find the cell containing the status
            var statusCell = parentRow.querySelector('td:nth-child(6)');

            // Update the status to "Accepted"
            statusCell.textContent = "Accepted";
        });
    });

    // Get all the "Decline" buttons
    var declineButtons = document.querySelectorAll('.Decline');

    // Loop through each "Decline" button and add a click event listener
    declineButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the parent row of the clicked button
            var parentRow = this.closest('tr');

            // Find the cell containing the status
            var statusCell = parentRow.querySelector('td:nth-child(6)');

            // Update the status to "Declined"
            statusCell.textContent = "Declined";
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var emptyCartButton = document.getElementById("empty-cart");
    var cartTableBody = document.querySelector("#cart-table tbody");
    var totalElement = document.getElementById("total");
    
    emptyCartButton.addEventListener("click", function() {
        // Remove all rows from the table
        while (cartTableBody.firstChild) {
            cartTableBody.removeChild(cartTableBody.firstChild);
        }
        // Reset total to 0
        totalElement.textContent = "Total : 0$";
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var addToCartButton = document.getElementById("add-to-cart");

    addToCartButton.addEventListener("click", function() {
        var quantity = document.getElementById("quantity").value;
        var productName = "Product Name";
        var productPrice = 99;

        var newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${productName}</td>
            <td>${quantity}</td>
            <td>${productPrice * quantity}$</td>
        `;

        var cartTableBody = window.opener.document.querySelector("#cart-table tbody");
        cartTableBody.appendChild(newRow);

        var totalElement = window.opener.document.getElementById("total");
        var currentTotal = parseInt(totalElement.textContent.split(":")[1].trim());
        totalElement.textContent = "Total : " + (currentTotal + productPrice * quantity) + "$";

        window.close();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Get all the "Add to Cart" buttons
    var addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Loop through each "Add to Cart" button and add a click event listener
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the parent product element
            var product = this.closest('.product');

            // Extract product name and price from data attributes
            var productName = product.getAttribute('data-name');
            var productPrice = product.getAttribute('data-price');

            // Display a confirmation message (you can replace this with any desired action)
            alert("Added to Cart:\n" + productName + " " + productPrice + "da");
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Get the registration form element
    var registrationForm = document.getElementById('registrationForm');

    // Add a submit event listener to the form
    registrationForm.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get form input values
        var fullname = document.getElementById('fullname').value.trim();
        var email = document.getElementById('email').value.trim();
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;
        var number = document.getElementById('number').value.trim();

        // Validate input values (you can add more complex validation as needed)
        if (fullname === '' || email === '' || password === '' || confirmPassword === '' || number === '') {
            alert("Please fill out all fields.");
            return; // Exit function if any field is empty
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return; // Exit function if passwords do not match
        }

        // If all validations pass, display registration completed alert
        alert("Registration Sent To admin!");
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const stars = document.querySelectorAll('.star');
    const feedbackTextarea = document.getElementById('feedback');
    const feedbackButton = document.getElementById('feedback-button');
    const submitButton = document.getElementById('submit-feedback');
    const commentsContainer = document.getElementById('comments-container');
    let isRated = false; // Variable to track if user has rated

    stars.forEach(star => {
        star.addEventListener('click', function() {
            if (!isRated) {
                const value = parseInt(this.getAttribute('data-value'));
                resetStars();
                for (let i = 0; i < value; i++) {
                    stars[i].classList.add('active');
                }
                isRated = true; // Mark as rated
                feedbackTextarea.style.display = 'block'; // Show feedback textarea
                submitButton.style.display = 'block'; // Show submit feedback button
            }
        });
    });

    feedbackButton.addEventListener('click', function() {
        commentsContainer.style.display = 'block'; // Show feedback comments
    });

    submitButton.addEventListener('click', function() {
        if (isRated) {
            const rating = document.querySelectorAll('.star.active').length;
            const feedback = feedbackTextarea.value;
            displayFeedback(rating, feedback);
            disableRating(); // Disable rating after feedback is submitted
        }
    });

    function resetStars() {
        stars.forEach(star => {
            star.classList.remove('active');
        });
    }

    function displayFeedback(rating, feedback) {
        const comment = document.createElement('div');
        comment.classList.add('comment');
        comment.innerHTML = `
            <img src="profile-picture.jpg" alt="Profile Picture">
            <div class="comment-content">
                <h3>Seller Name</h3>
                <div class="rating">Rating: ${rating} stars</div>
                <p>${feedback}</p>
            </div>
        `;
        commentsContainer.appendChild(comment);
    }

    function disableRating() {
        stars.forEach(star => {
            star.removeEventListener('click', ratingHandler);
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const feedbackButton = document.getElementById('feedback-button');
    const commentsContainer = document.getElementById('comments-container');

    feedbackButton.addEventListener('click', function() {
        commentsContainer.style.display = 'block'; // Show feedback comments
        feedbackButton.style.display = 'none'; // Hide the "Show Feedback" button
    });
});

// Get all delete buttons
const deleteButtons = document.querySelectorAll('.deleteproduct');

// Loop through each delete button and add event listener
deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the parent element (product) of the delete button
        const product = this.parentNode;
        // Remove the product from the cart
        product.remove();
    });
});
