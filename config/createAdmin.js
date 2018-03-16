const request = require('request');

module.exports = function() {
    request.post(
        'http://localhost:8000/users/register',
        { json: { 
            username: 'admin',
            password: 'admin',
            email: 'max.dwip@gmail.com',
            isAdmin: true
            } 
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );
}