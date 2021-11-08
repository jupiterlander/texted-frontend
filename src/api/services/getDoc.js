const getDoc = async id => {
    try {
        const res = await fetch(
            /* `https://jsramverk-editor-adpr12.azurewebsites.net/docs/find/${id}` */
            `http://localhost:1337/docs/find/${id}`,
            {
                method: "GET",
                credentials: "include",
                mode: "cors",
            },
        );

        const result = await res.json();

        console.log(result);
        return result;
    } catch (e) {
        console.log("fetch-error", e);
    }
};

export default getDoc;
