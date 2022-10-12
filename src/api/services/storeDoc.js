const DOC_SERVER = process.env.REACT_APP_DOC_SERVER;

const storeDoc = async (value) => {
    try {
        const res = await fetch(
            `${DOC_SERVER}/docs/store`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': sessionStorage.getItem('token')
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify({ document: value })
            }
        );

        const result = await res.json();

        return result;
    } catch (e) {
        console.log("fetch-error", e);
    }
};

export default storeDoc;
