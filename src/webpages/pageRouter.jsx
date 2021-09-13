import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";

import PageLayout from './pageLayout';
import HomePage from './homePage';
import EditorPage from './editorPage';
import AllDocsPage from './allDocsPage';
import NotFoundPage from './notFoundPage';


const PageRouter = () => {
    return (
        <BrowserRouter basename={"/~adpr12/editor"}>
            <PageLayout >
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/editor" component={EditorPage} />
                    <Route exact path="/editor/doc/:id" component={EditorPage} />
                    <Route exact path="/editor/doc/" component={EditorPage} />
                    <Route exact path="/alldocs" component={AllDocsPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </PageLayout>
        </BrowserRouter>
    );
};

export default PageRouter;
