import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodosList extends Component {

    constructor(props) {
        super(props);
        this.onChangeTodoTitle = this.onChangeTodoTitle.bind(this);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoTargetdate = this.onChangeTodoTargetdate.bind(this);
        this.onChangeTodoProgress = this.onChangeTodoProgress.bind(this);
        this.onChangeTodoComplete = this.onChangeTodoComplete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_title: '',
            todo_description: '',
            todo_targetdate: '',
            todo_progress: '',
            todo_complete: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_title: response.data.todo_title,
                    todo_description: response.data.todo_description,
                    todo_targetdate: response.data.todo_targetdate,
                    todo_progress: response.data.todo_progress,
                    todo_complete: response.data.todo_complete
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }

 

    onChangeTodoTitle(e) {
        this.setState({
            todo_title: e.target.value
        });
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoTargetdate(e) {
        this.setState({
            todo_targetdate: e.target.value
        });
    }

    onChangeTodoProgress(e) {
        this.setState({
            todo_progress: e.target.value
        });
    }

    onChangeTodoComplete(e) {
        this.setState({
            todo_complete: !this.state.todo_complete
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_title: this.state.todo_title,
            todo_description: this.state.todo_description,
            todo_targetdate: this.state.todo_targetdate,
            todo_progress: this.state.todo_progress,
            todo_complete: this.state.todo_complete
        };
        axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

   
    render() {
        return (
            <div>
                <h3>Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <label>Titlee: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_title}
                                onChange={this.onChangeTodoTitle}
                                />
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Target Date: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_targetdate}
                                onChange={this.onChangeTodoTargetdate}
                                />
                    </div>
                    <div className="form-group">
                    <label>Work Status: </label> &nbsp;
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="progressOptions"
                                    id="progressComplete"
                                    value="Completed"
                                    checked={this.state.todo_progress==='Completed'}
                                    onChange={this.onChangeTodoProgress}
                                    />
                            <label className="form-check-label">Completed</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="progressOptions"
                                    id="progressInprogress"
                                    value="In Progress"
                                    checked={this.state.todo_progress==='In Progress'}
                                    onChange={this.onChangeTodoProgress}
                                    />
                            <label className="form-check-label">In Progress</label>
                        </div>
                        
                        <div className="form-check">
                            <input  type="checkbox"
                                    className="form-check-input"
                                    id="completedCheckbox"
                                    name="completedCheckbox"
                                    onChange={this.onChangeTodoComplete}
                                    checked={this.state.todo_complete}
                                    value={this.state.todo_complete}
                                    />
                            <label className="form-check-label" htmlFor="completedCheckbox">
                                Complete
                            </label>
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Update Todo" className="btn btn-primary" /> &nbsp;
                           
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}