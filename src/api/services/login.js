const login = async loginData => {
    try {
        const res = await fetch("http://localhost:1337/login", {
            method: "POST",
            headers: {},
            credentials: 'include',
            mode: 'cors',

            body: new URLSearchParams({
                username: loginData.userName,
                password: loginData.password,
            }),
        });

        const result = await res.json();

        //localStorage.setItem('user', JSON.stringify(result));
        //window.sessionStorage.setItem("user", result);
        console.log(result);
        return result;
    } catch (e) {
        console.log("fetch-error", e);
    }
};

export default login;
