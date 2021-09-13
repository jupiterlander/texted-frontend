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
            const res = await fetch(`http://localhost:1337/docs/find/${id}`);
            const data = await res.json();

            console.log("load data");
            ed.setData(data['data']['msg']['document'] ?? '');
        };

        setId(props.id);
        if (props.id && props.id !=='new' && ed) {
            loadDoc();
        } else if (ed) {
            ed.setData("");
        };
    }, [ed, props.id, id]);



    console.log("editor", props);
    return (
        <div class="editor">
            <CKEditor
                editor={ClassicEditor}
                onChange={ handleOnChange }
                config={ {
                    toolbar: ['bold', 'italic']
                } }
                onReady={ editor => {
                    setEd(editor);
                    console.log( 'Editor1 is ready to use!', editor );
                }}
            />
            <EdToolBar id={id} value={value} onStore={onStore}/>
        </div>
    );
}

export default Editor;
