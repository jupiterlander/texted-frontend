import React from 'react';
import { Button } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";


const EdToolBar = ({ id, value, onStore })=> {
    const history = useHistory();
    const storeDoc = async ()=>{
        try {
            const res = await fetch(
                'https://jsramverk-editor-adpr12.azurewebsites.net/docs/store', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ document: value })
                });

            const data = await res.json();

            if (data.data.msg.insertedId) {
                onStore(data.data.msg.insertedId);
                history.push(`/editor/doc/${data.data.msg.insertedId}`);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const updateDoc = async ()=>{
        const res = await fetch('https://jsramverk-editor-adpr12.azurewebsites.net/docs/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "_id": id, "document": value })
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
            <Button variant="contained" color="default" onClick={ id? updateDoc: storeDoc }>
            Save</Button>
        </div>
    );
};


export default EdToolBar;
