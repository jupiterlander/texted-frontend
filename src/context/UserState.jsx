import { useState, useMemo, useEffect } from "react";
import { UserContext } from "./userContext";
import loggedIn from "../api/services/loggedIn";

const UserState = (props) => {
    const [user, setUser] = useState(null);
    const value = useMemo(() => ({user, setUser}), [user]);

    useEffect(()=>{
        const checkLoggedin = async ()=>{
            const result = await loggedIn();

            setUser(result?.user || null);
        };

        checkLoggedin();
    }, []);

    return <UserContext.Provider value={value}>
        {props.children}</UserContext.Provider>;
};

export default UserState;
