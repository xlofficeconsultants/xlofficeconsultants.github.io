// Load CryptoJS library (make sure to include the CDN link in your HTML)
if (typeof CryptoJS === 'undefined') {
    console.error('CryptoJS library not found. Make sure to include it before this script.');
} else {
    // Function to parse query parameters from the URL
    function getQueryParams() {
        var params = {};
        var queryString = window.location.search.substring(1);
        var regex = /([^&=]+)=([^&]*)/g;
        var match;
        while (match = regex.exec(queryString)) {
            params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
        }
        return params;
    }

    // Function to generate HMAC SHA256
    function generateHMAC() {
        var params = getQueryParams();
        var timestamp_publickey_url = params['timestamp_publickey_url'];
        var secret_key = params['secret_key'];

        if (timestamp_publickey_url && secret_key) {
            var hmac = CryptoJS.HmacSHA256(timestamp_publickey_url, secret_key).toString();
            document.body.textContent = hmac; // Output HMAC value as plain text
        } else {
            document.body.textContent = 'Missing parameters in URL';
        }
    }

    // Call generateHMAC function on window load
    window.onload = generateHMAC;
}
