import React, { useState, useEffect } from 'react';
import Editor from '../components/editor';

function EditorPage(props) {
    const [ owner, setOwner ] = useState("");
    const [ accessmode, setAccessmode ] = useState("");

    useEffect(()=>{
        const query = new URLSearchParams(props.location.search);

        setAccessmode(query.get('accessmode'));
        setOwner(query.get('owner'));
    }, [props.location.search]);


    return (
        <div>
            <h3>Document Id: {props.match.params.id}</h3>
            { owner && <h3>Owner: {owner}</h3> }
            <Editor id={props.match.params.id} accessmode={accessmode}/>
        </div>
    );
}

export default EditorPage;
