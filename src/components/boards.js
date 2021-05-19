import axios from '../api/axios_api';
import React,{Component} from 'react';

export class Boards extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loadedBoards : [],
        }
        this.loadBoards();
    }

    loadBoards(){
        axios.getAllBoards(true).then(response => this.setState({loadedBoards: response.data}));
    }

    render() {
        return (
            <div>
            <h1>Board list</h1>
                <ul>
                    {this.state.loadedBoards.map(currBoard =>
                        <li key={currBoard.boardId}>
                            <img src={"data:image/jpg;base64," + currBoard.image} alt={currBoard.bordId}/>
                            <p>{currBoard.bordId}</p>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Boards;