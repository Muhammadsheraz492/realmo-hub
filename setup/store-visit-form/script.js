Store visit javascript code
document.getElementById('submitBtn').addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Submit button clicked');

    // Get the form element
    const form = document.getElementById('storeVisitForm');
    const formData = new FormData(form); // Pass the form element to FormData

    // Create HTML content for email
    let htmlContent = '<h1>Store Visit Form Submission</h1><ul>';
    formData.forEach((value, key) => {
        if (key === 'attachment1[]' || key === 'attachment2[]' || key === 'attachment3[]') {
            htmlContent += `<li><strong>${key}:</strong> ${value.name}</li>`;
        } else {
            htmlContent += `<li><strong>${key}:</strong> ${value}</li>`;
        }
    });
    htmlContent += '</ul>';

    // Add HTML content and email address
    formData.append('_subject', 'Store Visit Form Submission');
    formData.append('_replyto', 'iggy.reemo@gmail.com');
    formData.append('_message', htmlContent);

    // Submit the form using Formspree
    fetch('https://formspree.io/f/mrbzpjpz', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(text);
            });
        }
        return response.text();
    })
    .then(text => {
        console.log('Response text:', text);
        try {
            const data = JSON.parse(text);
            if (data.success) {
                alert('Form submitted successfully');
                window.location.href = 'http://reemohub.s3-website.us-east-2.amazonaws.com/';
            } else {
                alert('Error submitting form');
            }
        } catch (e) {
            console.error('Error parsing response:', e);
            alert('Error submitting form');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting form');
    });
});


