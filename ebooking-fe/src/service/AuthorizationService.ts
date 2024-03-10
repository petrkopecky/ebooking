export function storeAuthorizationToken(
  authorizationToken: string | undefined
) {
  if (authorizationToken === undefined) {
    localStorage.removeItem("authorization");
  } else {
    localStorage.setItem("authorization", authorizationToken);
  }
}

export function removeAuthorizationToken() {
  localStorage.removeItem("authorization");
}

export function getAuthorizationToken(): string | undefined {
  let authorizationToken = localStorage.getItem("authorization");
  let returnValue: string | undefined;
  if (authorizationToken !== null) {
    returnValue = authorizationToken;
  }
  return returnValue;
}

export function getUserNameFromAthorizationToken(): string | undefined {
  return getAuthorizationToken();
}

const AuthenticationService = {
  storeAuthorizationToken,
  getAuthorizationToken,
  removeAuthorizationToken,
  getUserNameFromAthorizationToken,
};
export default AuthenticationService;
