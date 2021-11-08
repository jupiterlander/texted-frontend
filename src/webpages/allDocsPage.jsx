import React, { useEffect, useState } from 'react';
import GridLinks  from "../components/gridLinks";

const AllDocsPage = () => {
    const [docs, setDocs] = useState([]);
    const [accessDocs, setAccessDocs] = useState([]);

    useEffect(() => {
        document.title = 'All Docs';
        getData();
    }, []);

    const getData = async () => {
        const res = await fetch(/* 'https://jsramverk-editor-adpr12.azurewebsites.net/docs/all' */
            'http://localhost:1337/docs/all',
            {
                method: 'GET',
                credentials: 'include',
                mode: 'cors'
            });

        const data = await res.json();

        if (data?.docs?.docs) {
            setDocs(data.docs.docs);
            console.log(data.docs.docs);
        }
        if (data?.access) {
            setAccessDocs(data.access);
            console.log(data.access);
        }
    };

    return (
        <div>
            <h1>My Docs</h1>
            <GridLinks docs={docs} access={accessDocs}/>
        </div>
    );
};

export default AllDocsPage;
