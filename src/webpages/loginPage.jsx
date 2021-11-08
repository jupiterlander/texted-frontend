import React from 'react';
import LoginForm from "../components/loginForm";

function LoginPage(props) {
    console.log("props", props);
    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
        </div>
    );
}

export default LoginPage;
