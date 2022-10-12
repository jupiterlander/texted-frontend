import React from 'react';
import { Button } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import storeDoc from '../api/services/storeDoc';
import updateDoc from '../api/services/updateDoc';


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

    const update = async ()=>{
        await updateDoc(id, value);
    };

    return (
        <div className="button-panel">
            <Button variant="contained" color="default" onClick={ ()=>{console.log(id, value);} }>
                Dump To Console</Button>
            <Link to={"/editor/doc/"}>
                <Button variant="contained" color="default" >New</Button>
            </Link>
            <Button variant="contained" color="default" onClick={ id? update: store }>
            Save</Button>
        </div>
    );
};


export default EdToolBar;
