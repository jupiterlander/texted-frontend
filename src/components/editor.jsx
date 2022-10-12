import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import getSocket  from '../sockets/socketConnection';

import EdToolBar  from './edToolBar';
import MultiUserToolBar from './multiUserToolBar';
import AccessGrid from './accessGrid';

import getDoc from '../api/services/getDoc';

import { useHistory, useLocation } from "react-router-dom";




function Editor(props) {
    let ed = useRef();

    const [value, setValue] = useState("");
    const [valueChangedBySocket, setValueChangedBySocket] = useState(false);
    const [id, setId] = useState(props.id);
    const [multiUser, setMultiUser] = useState(false);
    const [accessMode, setAccessMode] = useState(props.accessmode);

    const [accessUsers, setAccessUsers] = useState([]);

    const [socket, setSocket] = useState(null);

    const { pathname } = useLocation();
    const history  = useHistory();

    const handleOnChange = (_e, editor) => {
        if (!valueChangedBySocket) {
            setValue(editor.getData());
            if (socket) {
                socket.emit("doc", {"id": id, "value": editor.getData()});
            }
        }

        setValueChangedBySocket(false);
    };

    const onStore = (id)=>{
        setId(id);
    };
    const [joined, setJoined] = useState(false);
    const [disconnected, setDisconnected] = useState(false);

    const back = ()=> {
        history.push(pathname.replace(/[^/]*$/, ''));
    };

    useEffect(()=>{
        setAccessMode(props.accessmode);
        setMultiUser(props.accessmode);
    }, [props.accessmode]);

    useEffect(()=>{
        !multiUser && socket && socket.disconnect();
    }, [multiUser, socket]);

    useEffect(()=> {
        const loadDoc = async ()=> {
            const result = await getDoc(id);

            if (result.status !== 200) {
                back();
                return null;
            }

            ed.current.setData(result.doc.docdata);
            Array.isArray(result.doc.access) && setAccessUsers(result.doc.access);
        };

        if (props.id && props.id !=='new' && ed) {
            loadDoc();
        }
    }, [id]);



    useEffect(()=>{
        if (multiUser) {
            const socket = getSocket();

            setSocket(socket);
            socket.connect();
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
            socket.on('accessremoved', () => {
                setMultiUser(false);
                setJoined(false);
            });
            socket.emit("join", {"id": id});
        } else {
            socket && socket.disconnect();
            setSocket(null);
        };

        return ()=>{
            socket && socket.disconnect();
        };
    }, [multiUser, id, accessMode, socket]);


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
                            socket={socket}
                        />
                    }
                </>
            }
        </div>
    );
}

export default Editor;
