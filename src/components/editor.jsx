import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import socket from '../utils/socketConnection';

import EdToolBar  from './edToolBar';
import MultiUserToolBar from './multiUserToolBar';



function Editor(props) {
    let ed = useRef();
    const [value, setValue] = useState("");
    const  [valueChangedBySocket, setValueChangedBySocket] = useState(false);
    const [id, setId] = useState(props.id);
    const [multiUser, setMultiUser] = useState(false);

    const handleOnChange = (_e, editor) => {
        if (!valueChangedBySocket) {
            setValue(editor.getData());
            socket.emit("doc", {"id": id, value: editor.getData()});
        }

        setValueChangedBySocket(false);
    };

    const onStore = (id)=>{
        setId(id);
    };
    const [joined, setJoined] = useState(false);
    const [disconnected, setDisconnected] = useState(false);

    useEffect(()=> {
        const loadDoc = async ()=> {
            try {
                const res = await fetch(
                    `https://jsramverk-editor-adpr12.azurewebsites.net/docs/find/${id}`);
                const data = await res.json();

                ed.current.setData(data['data']['msg']['document'] ?? '');
            } catch (e) {
                console.log("fetch-error", e);
            }
        };

        setId(props.id);
        if (props.id && props.id !=='new' && ed) {
            loadDoc();
        } else if (ed.current) {
            ed.current.setData("");
        };
    }, [props.id, id]);

    useEffect(()=>{
        socket.on('joined', () => {
            setJoined(true);
            setTimeout(()=>setJoined(false), 2000);
        });

        socket.on('doc', (data=>{
            setValueChangedBySocket(true);
            ed.current.setData(data.value);
        }));

        socket.on('disconnected', () => {
            setDisconnected(true);
            setTimeout(()=>setDisconnected(false), 3000);
        });
    }, [id]);


    useEffect(()=>{
        if (multiUser) {
            socket.connect();
            socket.emit("join", {"id": id});
        } else {
            socket.disconnect();
        }
    }, [multiUser, id]);


    return (
        <div className="editor">
            <MultiUserToolBar
                multiUser={multiUser}
                setMultiUser={setMultiUser}
                joined={joined}
                disconnected={disconnected}
            />
            <CKEditor
                editor={ClassicEditor}
                onChange={handleOnChange}
                config={{
                    toolbar: ["bold", "italic"],
                }}
                onReady={editor => {
                    ed.current = editor;
                    //setEd(editor);
                    //console.log("Editor1 is ready to use!");
                }}
            />
            <EdToolBar id={id} value={value} onStore={onStore} />
        </div>
    );
}

export default Editor;
