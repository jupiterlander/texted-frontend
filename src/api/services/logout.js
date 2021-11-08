const logout = async () => {
    console.log("logget out");
    try {
        const res = await fetch("http://localhost:1337/logout", {
            method: "GET",
            credentials: 'include',
            mode: 'cors'
        });

        return await res.json();
    } catch (e) {
        console.log("fetch-error", e);
    }
};

export default logout;
