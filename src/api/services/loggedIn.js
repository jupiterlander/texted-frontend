const loggedIn = async loginData => {
    try {
        const res = await fetch("http://localhost:1337/loggedin", {
            method: "GET",
            headers: {},
            credentials: 'include',
            mode: 'cors',
        });

        const result = await res.json();

        //localStorage.setItem('user', JSON.stringify(result));
        // window.sessionStorage.setItem("user", result);
        console.log(result);
        return result;
    } catch (e) {
        console.log("fetch-error", e);
    }
};

export default loggedIn;
