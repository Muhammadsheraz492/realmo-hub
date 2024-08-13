function submitForm() {
    var locationId = document.getElementById('locationId').value;
    var orderDetails = document.getElementById('orderDetails').value;
    
    // Normally, you would perform further actions here, like sending the data to a server
    
    alert('Order Submitted!\nLocation ID: ' + locationId + '\nAccessory Orders:\n' + orderDetails);
    
    // Reset the form fields after submission
    document.getElementById('locationId').value = '';
    document.getElementById('orderDetails').value = '';
    
    // Redirect to the Reemo hub page
    window.location.href = 'https://example.com/reemo-hub'; // Replace with your actual Reemo hub page URL
}
