import React from 'react';
import ReactDOM from 'react-dom';
import FileUpload from "./components/file_upload";
import Boards from "./components/boards"

ReactDOM.render(
    <React.StrictMode>
        <FileUpload />
        <Boards />
    </React.StrictMode>,
    document.getElementById('root')
);
