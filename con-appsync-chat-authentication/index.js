exports.handler = async (event, context) => {
    const token = event.authorizationToken


    if (token === "Fail") {
        throw Error("Purposefully thrown exception in Lambda Authorizer.")
    }

    if (token === "Authorized") {
        return { 'isAuthorized': true }
    }

    if (token === 'NeverCache') {
        return {
            'isAuthorized': true,
            'ttlOverride': 0
        }
    }

    if (token === 'Unauthorized') {
        return {
            'isAuthorized': false
        }

    }

    return {}
};
