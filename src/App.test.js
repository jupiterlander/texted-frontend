import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import {createMemoryHistory} from "history";
import {createBrowserHistory} from "history";
import { unmountComponentAtNode } from "react-dom";
import {Router} from "react-router-dom";
import "@testing-library/jest-dom";

import App from "./App";

let container = null;

const history = createBrowserHistory();


beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    history.push('/');
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

// test("Full app have Home selected in navbar", () => {
//     render(<App />);
//     const tabElHome = screen.getByRole("tab", {selected: true});

//     expect(tabElHome).toHaveTextContent("Home");
// });

// test("Full app have <a> with text Editor with href=/~adpr12/editor/editor", () => {
//     render(<App />, container);
//     const tabElEditor = screen.getByRole("tab", {name: "Editor"});

//     expect(tabElEditor).toHaveAttribute("href", "/~adpr12/editor/editor");
// });

// test('Full app rendering/navigating to "Docs", check if "All docs" on page', async () => {
//     await act(async () => {
//         render(
//             <Router history={history}>
//                 <App />
//             </Router>, container
//         );
//     });

//     expect(screen.getByText(/The editor/i)).toBeInTheDocument();

//     await act(async () => {
//         userEvent.click(screen.getByText(/Docs/i));
//     });

//     // check that the content changed to the new page
//     expect(screen.getByText(/All docs/i)).toBeInTheDocument();
// });

test(
    'Full app check if "The Editor" on homepage/startpage. '+
    'Then rendering/navigating to "Docs" with click on navbar. ' +
    'Check if "All docs" on page. ' +
    'Then back to "Home" check if "The Editor" on homepage.',
    async () => {
        //const history = createMemoryHistory();

        await act(async () => {
            render(
                <Router history={history} >
                    <App />
                </Router>,
                container,
            );
        });
        expect(screen.getByText(/The editor/i)).toBeInTheDocument();

        //navigate to docs
        await act(async () => {
            userEvent.click(screen.getByText(/Docs/i));
        });

        // check that the content changed to the new page
        expect(screen.getByText(/All docs/i)).toBeInTheDocument();

        //back to home
        await act(async () => {
            userEvent.click(screen.getByText(/Home/i));
        });

        // check that the content changed to the new page
        expect(screen.getByText(/The Editor/i)).toBeInTheDocument();
    },
);

test('Full app rendering/navigating to "Editor", check if "Document id:" on page', async () => {
    const history = createMemoryHistory();

    await act(async () => {
        render(
            <Router history={history}>
                <App />
            </Router>, container
        );
    });

    await act(async () => {
        userEvent.click(screen.getByRole("tab", {name: "Editor"}));
    });

    // check that the content changed to the new page
    expect(screen.getByText(/Document id:/i)).toBeInTheDocument();
});

test(
    'Full app rendering/navigating to "Editor", ' +
        'click on new-button and check if "Document id: added a id text',
    async () => {
        const history = createMemoryHistory();

        //mock fetch with a ok response
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => {
                    return Promise.resolve({
                        data: {
                            msg: {
                                insertedId: "mockingid001",
                            },
                        },
                    });
                },
            }),
        );

        await act(async () => {
            render(
                <Router history={history}>
                    <App />
                </Router>, container
            );
        });

        await act(async () => {
            userEvent.click(screen.getByRole("tab", {name: /Editor/i}));
        });

        await act(async () => {
            fireEvent.click(screen.getByRole("button", {name: /SAVE/i}));
        });

        expect(screen.getByText(/Document id: [a-z0-9]+/i)).toBeInTheDocument();

        global.fetch.mockRestore();
    },
);
