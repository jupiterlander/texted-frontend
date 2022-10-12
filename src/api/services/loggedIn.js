const DOC_SERVER = process.env.REACT_APP_DOC_SERVER;

const loggedIn = async loginData => {
    try {
        const res = await fetch(`${DOC_SERVER}/loggedin`, {
            method: "GET",
            headers: {
                'x-access-token': sessionStorage.getItem('token')
            },
            credentials: "include",
            mode: "cors",
        });

        if (res.status === 200) {
            const result = await res.json();

            return result;
        } else {
            return null;
        }
    } catch (e) {
        console.log("fetch-error", e);
        return null;
    }
};

export default loggedIn;
