import React from 'react';
import Editor from '../components/editor';

function EditorPage(props) {
    console.log("editorpage", props);
    return (
        <div>
            <h3>Document Id: {props.match.params.id}</h3>
            <Editor id={props.match.params.id}/>
        </div>
    );
}

export default EditorPage;
