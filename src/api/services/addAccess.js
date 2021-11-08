const addAccess = async (id, username) => {
    try {
        const res = await fetch("http://localhost:1337/docs/access", {
            method: "POST",
            headers: {},
            credentials: 'include',
            mode: 'cors',

            body: new URLSearchParams({
                id: id,
                username: username,
            }),
        });

        const result = await res.json();
        result.ok = res.ok;
        console.log(result);

        return result;
    } catch (e) {
        console.log("fetch-error", e);
    }
};

export default addAccess;
