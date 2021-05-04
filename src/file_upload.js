import axios from 'axios';
import React,{Component} from 'react';
import "./file_upload.css"

class FileInformations extends Component {
    state = {
        numberOfColumn: null,
        numberOfLine: null,
    }

    render(){
        return (
            <form>
                Number of column
                <input type="number" onInput={this.props.updateGrid(this.state.numberOfColumn, this.state.numberOfLine)}/>
                Number of lines
                <input type="number" onInput={this.props.updateGrid(this.state.numberOfColumn, this.state.numberOfLine)}/>
            </form>
        )
    };
}

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            selectedFileUrl: null,
            numberOfColumn: null,
            numberOfLine: null,
        };
    }

    onFileChange = event => {
        this.setState({
            selectedFile: event.target.files[0],
            selectedFileUrl: URL.createObjectURL(event.target.files[0]),
        });
    };

    onFileUpload = () => {
        const formData = new FormData();
        const selectedFile = this.state.selectedFile;
        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );

        console.log(selectedFile);
        console.log(this.state.numberOfColumn);
        console.log(this.state.numberOfLine);

        const numberOfColumns = this.state.numberOfColumn;
        const numberOfLines = this.state.numberOfLine;

        axios.post("http://localhost:8080/asset/board", formData, {params:{numberOfColumns,numberOfLines}});
    };

    onUpdateGrid = (newNumberOfColumn, newNumberOfLine) => {
        this.setState({
            numberOfColumn: newNumberOfColumn,
            numberOfLine: newNumberOfLine,
        })
    }

    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <img src={this.state.selectedFileUrl} alt="filePreview" className="filePreview" />
                    Number of column
                    <input type="number" onInput={(e) => this.setState({numberOfColumn: e.target.value})}/>
                    Number of lines
                    <input type="number" onInput={(e) => this.setState({numberOfLine: e.target.value})}/>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <h1>New board</h1>
                <div>
                    <input type="file" onChange={this.onFileChange}  accept="image/*"/>
                    <button onClick={this.onFileUpload}>Save</button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}

export default FileUpload;
