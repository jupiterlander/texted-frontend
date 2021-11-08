import "./App.css";
import "./custom.css";

import PageRouter from "./webpages/pageRouter.jsx";
import UserState from "./context/UserState";

function App() {
    return (
        <div className="App">
            <UserState>
                <PageRouter />
            </UserState>
        </div>
    );
}

export default App;
