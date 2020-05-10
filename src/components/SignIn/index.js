import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <SignInForm />
      <SignUpLink />
    </div>
  );
};

const SignInFormBase = (props) => {
  const { firebase, history } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const reset = () => {
    setEmail("");
    setPassword("");
    setError(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await firebase.doSignInWithEmailAndPassword(email, password);

      reset();
      history.push(ROUTES.HOME);
    } catch (error) {
      setError(error);
    }
  };

  const isInvalid = password === "" || email === "";

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign in
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
