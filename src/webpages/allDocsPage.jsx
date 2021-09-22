import React, { useEffect, useState } from 'react';
import GridLinks  from "../components/gridLinks";

const AllDocsPage = () => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        document.title = 'All Docs';
        getData();
    }, []);

    const getData = async () => {
        const res = await fetch('https://jsramverk-editor-adpr12.azurewebsites.net/docs/all');
        const data = await res.json();

        if (data?.data?.msg) {
            setDocs(data['data']['msg']);
        }
    };

    return (
        <div>
            <h1>All Docs</h1>
            <GridLinks docs={docs} />
        </div>
    );
};

export default AllDocsPage;
