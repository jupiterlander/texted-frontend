const DOC_SERVER = process.env.REACT_APP_DOC_SERVER;

const logout = async () => {
    const token = sessionStorage.getItem('token');

    sessionStorage.removeItem('token');

    try {
        const res = await fetch(`${DOC_SERVER}/logout`, {
            method: "GET",
            headers: {
                'x-access-token': token
            },
            credentials: 'include',
            mode: 'cors'
        });

        return await res.json();
    } catch (e) {
        console.log("fetch-error", e);
    }
};

export default logout;
