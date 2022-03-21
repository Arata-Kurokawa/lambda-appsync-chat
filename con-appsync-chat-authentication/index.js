exports.handler = async (event, context) => {
    const token = event.authorizationToken


    if (token === "Fail") {
        throw Error("Purposefully thrown exception in Lambda Authorizer.")
    }

    if (token === "Authorized") {
        return {
            'isAuthorized': true,
            'resolverContext': {
                'subscribableChatRooms': JSON.stringify([1, 2])
                // 'subscribableChatRooms': [1, 2]
            }
        }
    }

    if (token === 'NeverCache') {
        return {
            'isAuthorized': true,
            'resolverContext': {
                'subscribableChatRooms': JSON.stringify([1, 2])
            },
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
