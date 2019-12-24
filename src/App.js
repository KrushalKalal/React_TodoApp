import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import "D:/todo-app/node_modules/bootstrap/dist/css/bootstrap.min.css";
import TodosList from "./Components/todoslist";
import EditTodosList from "./Components/edit-todoslist";
import CreateTodosList from "./Components/create-todoslist";


class App extends Component {
  render() {
  return (
     <Router>
       <div className="container">
          <nav className="navbar navbar-expands-lg navbar-light bg-light">
           <Link to="/" className="navbar-brand">Todo APP</Link>
                <div className="collpase nav-collapse">
                    <ul className="navbar-nav mr-auto">
                       <li className="navbar-item"><Link to="/" className="nav-link">Todo List</Link></li>
                       <li className="navbar-item"><Link to="/create" className="nav-link">Create Todo List</Link></li>
                    </ul>
                </div>
          </nav>

       <Route path="/" exact component={TodosList} />
       <Route path="/edit/:id" exact component={EditTodosList} />
       <Route path="/create" exact component={CreateTodosList} />
       
       </div>
       
     </Router>
  );
 }
}

export default App;
