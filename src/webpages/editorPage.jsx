import { CodeSharp } from '@mui/icons-material';
import React from 'react';
import Editor from '../components/editor';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function EditorPage(props) {
    const accessMode = useQuery().get('accessmode')==='true';

    console.log("in editorpage ", props);

    return (
        <div>
            <h3>Document Id: {props.match.params.id}</h3>
            <Editor id={props.match.params.id} accessmode={accessMode}/>
        </div>
    );
}

export default EditorPage;
