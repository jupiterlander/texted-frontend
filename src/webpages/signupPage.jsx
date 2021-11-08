import React from 'react';
import SignupForm from "../components/signupForm";


function SignupPage(props) {
    console.log("props", props);
    return (
        <div>
            <h1>Signup</h1>
            <SignupForm />
        </div>
    );
}

export default SignupPage;
