import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import FileUpload from "./components/file_upload";
import Boards from "./components/boards";

const { REACT_APP_ENV } = process.env;
console.log(REACT_APP_ENV);

class App extends Component {

    render(){
        return (
            <Router>
                <Route exact path={'/'} component={Boards}/>
                <Route path={'/upload'}>
                    <FileUpload />
                </Route>
            </Router>
        )
    }
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
