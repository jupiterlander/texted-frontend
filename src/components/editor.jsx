import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Button } from '@material-ui/core';


function Editor() {
    const [value, setValue] = useState("");
    const handleOnChange = (_e, editor) => setValue(editor.getData());
    const dumpToConsole = ()=>console.log(value);

    return (
        <div>
            <h1>My First Editor with React</h1>
            <CKEditor
                editor={ClassicEditor}
                onChange={handleOnChange}
                config={ {
                    toolbar: ['bold', 'italic']
                } }
            />
            <div className="button-panel">
                <Button variant="contained" color="default" onClick={dumpToConsole}>
                    Dump To Console</Button>
            </div>
        </div>
    );
}

export default Editor;
