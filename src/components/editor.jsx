import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import socket from '../utils/socketConnection';

import EdToolBar  from './edToolBar';
import MultiUserToolBar from './multiUserToolBar';
import AccessGrid from './accessGrid';

import { useHistory, useLocation } from "react-router-dom";


function Editor(props) {
    let ed = useRef();
    const [value, setValue] = useState("");
    const [valueChangedBySocket, setValueChangedBySocket] = useState(false);
    const [id, setId] = useState(props.id);
    const [multiUser, setMultiUser] = useState(false);
    const [accessMode, setAccessMode] = useState(props.accessmode);

    const [accessUsers, setAccessUsers] = useState([]);

    const { pathname } = useLocation();
    const history  = useHistory();

    const handleOnChange = (_e, editor) => {
        if (!valueChangedBySocket) {
            setValue(editor.getData());
            socket.emit("doc", {"id": id, "value": editor.getData()});
        }

        setValueChangedBySocket(false);
    };

    const onStore = (id)=>{
        setId(id);
    };
    const [joined, setJoined] = useState(false);
    const [disconnected, setDisconnected] = useState(false);

    useEffect(()=>{
        setAccessMode(props.accessmode);
        setMultiUser(props.accessmode);
    }, [props.accessmode]);

    useEffect(()=> {
        const loadDoc = async ()=> {
            try {
                const res = await fetch(
                    /* `https://jsramverk-editor-adpr12.azurewebsites.net/docs/find/${id}` */
                    `http://localhost:1337/docs/find/${id}`,
                    {
                        method: 'GET',
                        credentials: 'include',
                        mode: 'cors'
                    }
                );
                const data = await res.json();
                console.log(data, res.ok);

                if (res.ok) {
                    ed.current.setData(data.doc?.docdata ?? '');
                    Array.isArray(data.doc?.access) && setAccessUsers(data.doc?.access);
                } else {
                    history.push(pathname.replace(/[^/]*$/, ''));
                }
            } catch (e) {
                console.log("fetch-error", e);
            }
        };

        setId(props.id);

        console.log(props.id, accessMode, ed);
        if (props.id && props.id !=='new' && ed  && !accessMode) {
            loadDoc();
        } else if (ed.current) {
            //ed.current.setData("");
        };
    }, [props.id, id, accessMode]);

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
                disabled={!id}
                accessMode={accessMode}
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
            {accessMode?
                null:
                <>
                    <EdToolBar id={id} value={value} onStore={onStore} />
                    {!id?
                        null:
                        <AccessGrid
                            id={id}
                            users={accessUsers}
                            setAccessUsers={setAccessUsers}
                            multiUser={multiUser}
                            setMultiUser={setMultiUser}
                            joined={joined}
                            disconnected={disconnected}
                        />
                    }
                </>
            }
        </div>
    );
}

export default Editor;
