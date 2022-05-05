import React, { useEffect, useState } from "react";
import { Auth } from "../../services/amplify";
import { Navigate } from "react-router-dom";

import AuthContext from "../../contexts/auth";

export default function ProtectedRoute({ component: Component, redirect }) {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false);

  // Verifica se existe um usuário autenticado
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
        setAuthenticated(true);
        setChecked(true);
      })
      .catch((err) => {
        setAuthenticated(false);
        setChecked(true);
      });
  }, []);

  // Criar redirecionamento caso já esteja logado

  // return (
  //   <>
  //     {authChecked && (
  //       <AuthContext.Provider value={user}>
  //         <Route
  //           {...rest}
  //           render={(props) =>
  //             authStatus === requireAuth ? (
  //               <Component {...props} />
  //             ) : (
  //               <Redirect
  //                 exact
  //                 to={{ pathname: redirect, state: { from: props.location } }}
  //               />
  //             )
  //           }
  //         />
  //       </AuthContext.Provider>
  //     )}
  //   </>
  // );

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
