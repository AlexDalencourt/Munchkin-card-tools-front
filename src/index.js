import React from 'react';
import ReactDOM from 'react-dom';
import FileUpload from "./components/file_upload";
import Boards from "./components/boards"

const { REACT_APP_ENV } = process.env;
console.log(REACT_APP_ENV);

ReactDOM.render(
    <React.StrictMode>
        <FileUpload />
        <Boards />
    </React.StrictMode>,
    document.getElementById('root')
);
