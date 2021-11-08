import React, { useContext } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { UserContext } from '../context/userContext';

import PageLayout from './pageLayout';
import HomePage from './homePage';
import EditorPage from './editorPage';
import AllDocsPage from './allDocsPage';
import NotFoundPage from './notFoundPage';
import LoginPage from './loginPage';
import SignupPage from './signupPage';
import UserPage from './userPage';


const PageRouter = () => {
    const {user} = useContext(UserContext);

    return (
        <BrowserRouter basename={"/"}>
            {/* <BrowserRouter basename={"/~adpr12/editor"}> */}
            <PageLayout >
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/user" component={UserPage} />
                    <Route exact path="/user/login" component={LoginPage} />
                    <Route exact path="/user/signup" component={SignupPage} />
                    { user &&
                        <div>
                            <Route exact path="/editor" component={EditorPage} />
                            <Route exact path="/editor/doc/:id" component={EditorPage} />
                            <Route exact path="/editor/doc/" component={EditorPage} />
                            <Route exact path="/alldocs" component={AllDocsPage} />
                        </div>
                    }
                    <Route path="*" component={NotFoundPage} />
                    {/* <Redirect to='/pagenotfound' status={404}/> */}
                </Switch>
            </PageLayout>
        </BrowserRouter>
    );
};

export default PageRouter;
