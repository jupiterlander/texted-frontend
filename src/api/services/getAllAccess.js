const getAllAccess = async (id, username) => {
    try {
        const res = await fetch(`http://localhost:1337/docs/access/${id}`, {
            method: "GET",
            headers: {},
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
