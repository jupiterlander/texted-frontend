import React from 'react';
import { Button } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import storeDoc from '../api/services/storeDoc';

const DOC_SERVER = process.env.REACT_APP_DOC_SERVER;


const EdToolBar = ({ id, value, onStore })=> {
    const history = useHistory();
    const store = async ()=>{
        try {
            const result = await storeDoc(value);

            if (result.id) {
                onStore(result.id);
                history.push(`/editor/doc/${result.id}`);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const updateDoc = async ()=>{
        const res = await fetch(
            `${DOC_SERVER}/docs/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify({ "id": id, "document": value })
            });

        await res.json();
    };

    return (
        <div className="button-panel">
            <Button variant="contained" color="default" onClick={ ()=>{console.log(id, value);} }>
                Dump To Console</Button>
            <Link to={"/editor/doc/"}>
                <Button variant="contained" color="default" >New</Button>
            </Link>
            <Button variant="contained" color="default" onClick={ id? updateDoc: store }>
            Save</Button>
        </div>
    );
};


export default EdToolBar;
