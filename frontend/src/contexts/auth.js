import React from "react";

const AuthContext = React.createContext();

const useAuth = process.env.REACT_APP_USE_AUTH === "false" ? false : true;

function createContext(cognitoObject) {
  if (useAuth) {
    return {
      accessToken: cognitoObject.signInUserSession.accessToken.jwtToken,
      userName: cognitoObject.attributes["custom:displayname"],
      sub: cognitoObject.attributes.sub,
    };
  } else {
    return {
      accessToken: null,
      userName: "Sherlock Holmes",
      sub: null,
    };
  }
}

export { AuthContext, createContext };
