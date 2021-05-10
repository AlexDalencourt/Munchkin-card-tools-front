import axios from 'axios';
import React,{Component} from 'react';
import "./styles/file_upload.css"

export class CardType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardTypes: []
        }
        this.initCardTypes();
    }

    initCardTypes() {
        axios.get("http://localhost:8080/cards/types")
            .then(response => {this.setState({cardTypes: response.data});});
    }

    render() {
        return (
            <select onChange={this.props.handleChange} defaultValue={""}>
                <option disabled={true} />
                {this.state.cardTypes.map(
                    type => <option key={type}>{type}</option>
                )}
            </select>
        )
    }
}

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            selectedFileUrl: null,
            numberOfColumn: null,
            numberOfLine: null,
            type: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    onFileChange = event => {
        this.setState({
            selectedFile: event.target.files[0],
            selectedFileUrl: URL.createObjectURL(event.target.files[0]),
            numberOfColumn: null,
            numberOfLine: null,
            type: undefined,
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

        const numberOfColumns = this.state.numberOfColumn;
        const numberOfLines = this.state.numberOfLine;
        const boardType = this.state.type;

        axios.post(
            "http://localhost:8080/asset/board",
            formData,
            {params:{numberOfColumns,numberOfLines,boardType}}
        );
    };

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <img src={this.state.selectedFileUrl} alt="filePreview" className="filePreview" />
                    Number of column
                    <input type="number" value={this.state.numberOfColumn} onChange={this.handleChange} name={"numberOfColumn"}/>
                    Number of lines
                    <input type="number" value={this.state.numberOfLine} onChange={this.handleChange} name="numberOfLine"/>
                    Type
                    <CardType handleChange={this.handleChange} />
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
