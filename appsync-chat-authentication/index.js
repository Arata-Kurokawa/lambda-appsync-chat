exports.handler = async (event, _) => {
  const token = event.authorizationToken

  if (token === "Fail") {
    throw Error("Purposefully thrown exception in Lambda Authorizer.")
  }

  if (token === "Authorized") {
    return {
      'isAuthorized': true,
      'resolverContext': {
        'key': 'value'
      }
    }
  }

  if (token === 'Unauthorized') {
    return {
      'isAuthorized': false
    }
  }

  return {}
};
