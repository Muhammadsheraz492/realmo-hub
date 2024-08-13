document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('maintenance-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Simulate form submission (you can replace this with actual form submission logic)
        alert('Form submitted!');

        // Reset the form
        form.reset();

        // Redirect to the Reemo hub page
        window.location.href = 'https://www.reemohub.com'; // Update this URL to the actual Reemo hub page URL
    });
});
