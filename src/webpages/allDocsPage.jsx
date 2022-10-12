import React, { useEffect, useState } from 'react';
import GridLinks  from "../components/gridLinks";
import getAllDocs from '../api/services/getAllDocs';

const AllDocsPage = () => {
    const [docs, setDocs] = useState([]);
    const [accessDocs, setAccessDocs] = useState([]);

    useEffect(() => {
        document.title = 'All Docs';
        getData();
    }, []);

    const getData = async () => {
        const data = await getAllDocs();

        if (data?.docs?.docs) {
            setDocs(data.docs.docs);
        }
        if (data?.access) {
            setAccessDocs(data.access);
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
