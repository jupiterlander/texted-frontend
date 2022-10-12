const DOC_SERVER = process.env.REACT_APP_DOC_SERVER;

const signup = async user => {
    try {
        const res = await fetch(`${DOC_SERVER}/signup`, {
            method: "POST",
            headers: {},
            credentials: 'include',
            mode: 'cors',

            body: new URLSearchParams({
                username: user.userName,
                email: user.email,
                password: user.password,
            }),
        });

        const result = await res.json();

        if (res.status === 201) {
            sessionStorage.setItem('token', result?.access_token);
            return { acknowledged: true };
        }

        return result;
    } catch (e) {
        console.log("fetch-error", e);
        return {};
    }
};

export default signup;
