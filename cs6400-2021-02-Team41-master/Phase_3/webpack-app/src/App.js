import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {Report1} from "./components/Report1";
import {EditCityStatePopulation} from "./components/EditCityStatePopulation";
import {Report2} from "./components/Report2";
import {Report3} from "./components/Report3";
import {Report4} from "./components/Report4";
import {Report5} from "./components/Report5";
import {Report6} from "./components/Report6";
import {Report7} from "./components/Report7";
import {Report8} from "./components/Report8";
import {Report9} from "./components/Report9";
import {MainMenu} from "./components/MainMenu";
import {ViewableStores} from "./components/ViewableStores";
import {Report1Detail} from "./components/Report1Detail";

// This site has 9 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.


// You can think of these components as "pages"
// in your app.

function App() {
    return (
        <Router>
            <div>
                <MainMenu />
                <hr />
                {/*
                    A <Switch> looks through all its children <Route>
                    elements and renders the first one whose path
                    matches the current URL. Use a <Switch> any time
                    you have multiple routes, but you want only one
                    of them to render at a time
                */}
                <Switch>
                    <Route path="/editPop">
                        <EditCityStatePopulation />
                    </Route>
                    <Route path="/viewableStores" component={ViewableStores} />
                    <Route path="/report1">
                        <Report1 />
                    </Route>
                    <Route path="/report2">
                        <Report2 />
                    </Route>
                    <Route path="/report3">
                        <Report3 />
                    </Route>
                    <Route path="/report4">
                        <Report4 />
                    </Route>
                    <Route path="/report5">
                        <Report5 />
                    </Route>
                    <Route path="/report6">
                        <Report6 />
                    </Route>
                    <Route path="/report7">
                        <Report7 />
                    </Route>
                    <Route path="/report8">
                        <Report8 />
                    </Route>
                    <Route path="/report9">
                        <Report9 />
                     </Route>

                     <Route exact path="/report1detail/:manufacturer_name" component={Report1Detail}>


                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
