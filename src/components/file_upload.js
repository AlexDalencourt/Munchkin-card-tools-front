import axiosApi from '../api/axios_api';
import React, {Component} from 'react';
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
        axiosApi.getAllCardTypes().then((response) => this.setState({cardTypes: response}));
    }

    render() {
        return (
            <select onChange={this.props.handleChange} defaultValue={""} name={"type"}>
                <option disabled={true} />
                {this.state.cardTypes.map(
                    type => <option key={type}>{type}</option>
                )}
            </select>
        )
    }
}

export class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            selectedFileUrl: null,
            numberOfColumns: null,
            numberOfLines: null,
            type: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    onFileChange = event => {
        this.setState({
            selectedFile: event.target.files[0],
            selectedFileUrl: URL.createObjectURL(event.target.files[0]),
            numberOfColumns: null,
            numberOfLines: null,
            type: undefined,
        });
    };

    onFileUpload = () => {
        const selectedFile = this.state.selectedFile;
        if(selectedFile == null) {
            return alert("Please select a file");
        }
        const formData = new FormData();
        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );

        const numberOfColumns = this.state.numberOfColumns;
        const numberOfLines = this.state.numberOfLines;
        const boardType = this.state.type;

        axiosApi.uploadNewBord(formData, numberOfColumns, numberOfLines, boardType);
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
                    <img src={this.state.selectedFileUrl} alt="filePreview" className="filePreview" title={"filePreview"}/>
                    Number of columns
                    <input type="number" value={this.state.numberOfColumns} onChange={this.handleChange} name={"numberOfColumns"} title={"nbColumns"}/>
                    Number of lines
                    <input type="number" value={this.state.numberOfLines} onChange={this.handleChange} name="numberOfLines" title={"nbLines"}/>
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
                    <input type="file" title={"boardUpload"} onChange={this.onFileChange}  accept="image/*"/>
                    <button onClick={this.onFileUpload} title={'goUpload'}>Save</button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}

export default FileUpload;
