const signup = async user => {
    console.log("signup-user", user);
    try {
        const res = await fetch("http://localhost:1337/signup", {
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

        const json = await res.json();

        json.ok = res.ok;
        console.log(json);
        return json;
    } catch (e) {
        console.log("fetch-error", e);
    }
};

module.exports = signup;
