import React from 'react';
import { Button } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";


const EdToolBar = ({ id, value, onStore })=> {
    const history = useHistory();
    const storeDoc = async ()=>{
        console.log(id, value);
        const res = await fetch('https://jsramverk-editor-adpr12.azurewebsites.net/docs/store', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ document: value })
        });
        const data = await res.json();

        if (data.data.msg.insertedId) {
            onStore(data.data.msg.insertedId);
            history.push(`/editor/doc/${data.data.msg.insertedId}`);
            console.log(history);
        };

        console.log(data);
    };

    const updateDoc = async ()=>{
        console.log(id, value);
        const res = await fetch('https://jsramverk-editor-adpr12.azurewebsites.net/docs/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "_id": id, "document": value })
        });
        const data = await res.json();

        console.log(data);
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
