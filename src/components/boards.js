import axiosApi from '../api/axios_api';
import React,{Component, Fragment} from 'react';

export class Boards extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loadedBoards : [],
        }
        this.loadBoards();
    }

    loadBoards(){
        axiosApi.getAllBoards(true).then(response => this.setState({loadedBoards: response}));
    }

    render() {
        return (
            <Fragment>
                <h1>Board list</h1>
                <ul>
                    {this.state.loadedBoards.map(currBoard =>
                        <li key={currBoard.boardId}>
                            <img src={"data:image/jpg;base64," + currBoard.image} alt={currBoard.boardId} id={currBoard.boardId} onClick={this.prepareCropBoard}/>
                        </li>
                    )}
                </ul>
            </Fragment>
        );
    }
}

export default Boards;
