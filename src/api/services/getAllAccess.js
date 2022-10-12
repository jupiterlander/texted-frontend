const DOC_SERVER = process.env.REACT_APP_DOC_SERVER;

const getAllAccess = async (id, username) => {
    try {
        const res = await fetch(`${DOC_SERVER}/docs/access/${id}`, {
            method: "GET",
            headers: {
                'x-access-token': sessionStorage.getItem('token')
            },
            credentials: 'include',
            mode: 'cors',
        });

        const result = await res.json();

        return result;
    } catch (e) {
        console.log("fetch-error", e);
    }
};

export default getAllAccess;
