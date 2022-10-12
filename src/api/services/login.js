const DOC_SERVER = process.env.REACT_APP_DOC_SERVER;



const login = async loginData => {
    try {
        const res = await fetch(`${DOC_SERVER}/login`, {
            method: "POST",
            mode: 'cors',
            body: new URLSearchParams({
                username: loginData.userName,
                password: loginData.password,
            }),
        });

        const result = await res.json();

        sessionStorage.setItem('token', result?.access_token);
        return result;
    } catch (e) {
        console.log("fetch-error", e);
    }
};

export default login;
