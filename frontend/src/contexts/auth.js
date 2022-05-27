import React from "react";

const AuthContext = React.createContext();

function createContext(cognitoObject) {
  return {
    accessToken: cognitoObject.signInUserSession.accessToken.jwtToken,
    userName: cognitoObject.attributes["custom:displayname"],
    sub: cognitoObject.attributes.sub,
  };
}

export { AuthContext, createContext };
