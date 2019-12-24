import React, {Component} from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);
 
        this.onChangeTodoTitle = this.onChangeTodoTitle.bind(this);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoTargetdate = this.onChangeTodoTargetdate.bind(this);
        this.onChangeTodoProgress = this.onChangeTodoProgress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_title: '',
            todo_targetdate: '',
            todo_progress: '',
            todo_complete: false,
            title_error: '',
            description_error: ''
        }
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

validate = () => {
    let titleError = "";
    let descriptionError = "";

    if(!this.state.todo_title){
        titleError = "Title can't be blank"
    }

    if(!this.state.todo_description){
        descriptionError = "Description can't be blank"
    }

    if(titleError || descriptionError){
        this.setState({titleError, descriptionError})
    }

     return true;
};
    onSubmit(e) {
        e.preventDefault();

        const isValid = this.validate();
        if(isValid) {
            console.log(this.state);
        }

        const newTodo = {
            todo_title: this.state.todo_title,
            todo_description: this.state.todo_description,
            todo_targetdate: this.state.targetdate,
            todo_progress: this.state.todo_progress,
            todo_complete: this.state.todo_complete
        }

        axios.post('http://localhost:4000/todos/add', newTodo)
        .then(res => console.log(res.data));

      

        this.setState({
            todo_description: '',
            todo_title: '',
            todo_targetdate: '',
            todo_progress: '',
            todo_complete : false
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input  type="text"
                                placeholder = "Enter Title"
                                className="form-control"
                                value={this.state.todo_title}
                                onChange={this.onChangeTodoTitle}
                                />
                            
                                  <div style={{fontSize:12 , color:"red"}}>
                                      {this.state.title_error}
                                  </div>    
                
                    </div>
                    <div className="form-group" >
                        <label>Description: </label>
                        <input  type="text"
                                placeholder = "Enter Description"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                                
                                  <div style={{fontSize:12 , color:"red"}}>
                                      {this.state.description_error}
                                  </div>    
                              
                    </div>
                    <div className="form-group" >
                        <label>Target Date: </label>
                        <input  type="date"
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
                                    name="priorityOptions"
                                    id="priorityComplete"
                                    value="Complete"
                                    checked={this.state.todo_progress==='Complete'}
                                    onChange={this.onChangeTodoProgress}
                                    />
                            <label className="form-check-label">Complete</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityInProgress"
                                    value="In Progress"
                                    checked={this.state.todo_progress==='In Progress'}
                                    onChange={this.onChangeTodoProgress}
                                    />
                            <label className="form-check-label">In Progress</label>
                        </div>
                        
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}