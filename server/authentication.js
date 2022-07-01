const jwt = require("jsonwebtoken");

function validateAuthenticationToken(request, response, next) {
    const authorizationHeader = request.headers["authorization"];
    const token = authorizationHeader && authorizationHeader.split(' ')[1]

    if (token == null) {
        return response.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, authenticationData) => {
        if (error) {
            return response.sendStatus(403);
        }

        request.userInformation = authenticationData.userInformation;

        console.log("authenticationData", request.userInformation );

        next();
    });
}

module.exports = validateAuthenticationToken;