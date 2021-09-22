import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import EdToolBar  from './edToolBar';


function Editor(props) {
    const [ed, setEd] = useState(null);
    const [value, setValue] = useState("");
    const [id, setId] = useState(props.id);
    const handleOnChange = (_e, editor) => setValue(editor.getData());

    const onStore = (id)=>{
        setId(id);
    };

    useEffect(()=> {
        const loadDoc = async ()=> {
            try {
                const res = await fetch(
                    `https://jsramverk-editor-adpr12.azurewebsites.net/docs/find/${id}`);
                const data = await res.json();

                ed.setData(data['data']['msg']['document'] ?? '');
            } catch (e) {
                console.log("fetch-error", e);
            }
        };

        setId(props.id);
        if (props.id && props.id !=='new' && ed) {
            loadDoc();
        } else if (ed) {
            ed.setData("");
        };
    }, [ed, props.id, id]);

    return (
        <div className="editor">
            <CKEditor
                editor={ClassicEditor}
                onChange={ handleOnChange }
                config={ {
                    toolbar: ['bold', 'italic']
                } }
                onReady={ editor => {
                    setEd(editor);
                    console.log( 'Editor1 is ready to use!');
                }}
            />
            <EdToolBar id={id} value={value} onStore={onStore}/>
        </div>
    );
}

export default Editor;
