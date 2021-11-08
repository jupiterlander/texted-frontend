const removeAccess = async (id, username) => {
    try {
        const res = await fetch("http://localhost:1337/docs/access", {
            method: "DELETE",
            headers: {},
            credentials: 'include',
            mode: 'cors',

            body: new URLSearchParams({
                id: id,
                username: username,
            }),
        });

        const result = await res.json();

        return result;
    } catch (e) {
        console.log("fetch-error", e);
    }
};

export default removeAccess;
