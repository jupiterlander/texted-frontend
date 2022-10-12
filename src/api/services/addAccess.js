const DOC_SERVER = process.env.REACT_APP_DOC_SERVER;

const addAccess = async (id, username) => {
    try {
        const res = await fetch(`${DOC_SERVER}/docs/access`, {
            method: "POST",
            headers: {
                'x-access-token': sessionStorage.getItem('token')
            },
            credentials: 'include',
            mode: 'cors',

            body: new URLSearchParams({
                id: id,
                username: username,
            }),
        });

        const result = await res.json();

        result.ok = res.status === 201;
        return result;
    } catch (e) {
        console.log("fetch-error", e);
    }
};

export default addAccess;
