import React, { useEffect, useState } from "react";
import { Auth } from "../../../services/amplify";
import { Navigate } from "react-router-dom";
import { AuthContext, createContext } from "../../../contexts/auth";

const useAuth = process.env.REACT_APP_USE_AUTH === "false" ? false : true;

export default function ProtectedRoute({ element: Component, redirect = "/" }) {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false);

  // Verifica se existe um usuário autenticado
  useEffect(() => {
    if (useAuth) {
      Auth.currentAuthenticatedUser()
        .then((user) => {
          setUser(createContext(user));
          setAuthenticated(true);
        })
        .catch(() => {
          setAuthenticated(false);
        })
        .finally(() => {
          setChecked(true);
        });
    } else {
      setUser(createContext(user));
      setChecked(true);
      setAuthenticated(true);
    }
  }, []);

  return (
    <>
      {checked &&
        (authenticated ? (
          <AuthContext.Provider value={user}>
            <Component />
          </AuthContext.Provider>
        ) : (
          <Navigate to={redirect} />
        ))}
    </>
  );
}
