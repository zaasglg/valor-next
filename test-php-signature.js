const crypto = require('crypto');

// Test with PHP-compatible signature method
const secret = 'gzcaz1b4_yhb9nl7f';
const requestParam = {
    'first_name': 'kevin daniel',
    'last_name': 'Diaz Narvaez',
    'address': 'Calle 45 #18A-27',
    'orderid': '1761695367620',
    'country': 'CO',
    'state': 'co',
    'city': 'Bogotá',
    'zip': '110111',
    'ip_address': '186.168.118.183',
    'birth_date': '15/03/1985',
    'email': 'ergwergwegre@regergewrgwe.rg',
    'phone_no': '5330012345',
    'amount': '300000',
    'currency': 'cop',
    'tax_id': '1.024.567.890'
};

// Create signature PHP way - just values, no keys
const sortedKeys = Object.keys(requestParam).sort();
const signString = sortedKeys.map(key => requestParam[key]).join(':');
const signature = crypto.createHmac('sha256', secret).update(signString).digest('hex');

console.log('=== PHP-COMPATIBLE SIGNATURE TEST ===');
console.log('Sorted Keys:', sortedKeys);
console.log('Sign String (values only):', signString);
console.log('Calculated Signature:', signature);
console.log('API returned signature: 1a7f0ce8a5c620e98c122ba9bceaffa8ef0f049ebb6bfec4907e38fb6ba1e125');
console.log('Match:', signature === '1a7f0ce8a5c620e98c122ba9bceaffa8ef0f049ebb6bfec4907e38fb6ba1e125');