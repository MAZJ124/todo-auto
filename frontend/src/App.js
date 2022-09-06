// frontend/src/App.js

import React, { Component } from "react";
import AddTodoModal from "./components/addTodoModal";
import AddModuleModal from "./components/addModuleModal"
import axios from "axios";

const proxy = "http://localhost:8002";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompletedTodo: false,
      viewCompletedModule: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      addedItem: "",
      todoList: [],
      moduleList: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get(`${proxy}/api/todos/`)
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
    axios
      .get(`${proxy}/api/modules/`)
      .then(res => this.setState({ moduleList: res.data }))
      .catch(err => console.log(err));
  };
  displayCompletedTodo = status => {
    if (status) {
      return this.setState({ viewCompletedTodo: true });
    }
    return this.setState({ viewCompletedTodo: false });
  };
  displayCompletedModule = status => {
    if (status) {
      return this.setState({ viewCompletedModule: true });
    }
    return this.setState({ viewCompletedModule: false });
  };
  renderTodoTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompletedTodo(true)}
          className={this.state.viewCompletedTodo ? "active" : ""}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompletedTodo(false)}
          className={this.state.viewCompletedTodo ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };
  renderModuleTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompletedModule(true)}
          className={this.state.viewCompletedModule ? "active" : ""}
        >
          Current modules
        </span>
        <span
          onClick={() => this.displayCompletedModule(false)}
          className={this.state.viewCompletedModule ? "" : "active"}
        >
          Completed modules
        </span>
      </div>
    );
  }
  renderTodoItems = () => {
    const { viewCompletedTodo } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompletedTodo
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompletedTodo ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };
  renderModules = () => {
    const { viewCompletedTodo } = this.state;
    const newItems = this.state.moduleList;
    // .filter(
    //   item => item.completed === viewCompletedTodo
    // );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompletedTodo ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.code}
        </span>
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompletedTodo ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.name}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    let addedItemPath = this.addedItem === "module" ? "modules" : "todos"
    console.log(addedItemPath)
    if (item.id) {
      axios
        .put(`${proxy}/api/${addedItemPath}/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post(`${proxy}/api/${addedItemPath}/`, item)
      .then(res => this.refreshList());
  };
  handleDelete = item => {
    axios
      .delete(`${proxy}/api/todos/${item.id}`)
      .then(res => this.refreshList());
  };
  createModule = () => {
    const item = { code: "", name: "", duration: 13, completed: false, startDate: "" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  createTodo = () => {
    const item = { title: "", description: "", completed: false, deadline: "" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button 
                  onClick={() => {
                    this.addedItem = "module"
                    this.createTodo()
                  }} 
                  className="btn btn-primary"
                >
                  Add module
                </button>
              </div>
              {this.renderModuleTabList()}
              <ul className="list-group list-group-flush">
                {this.renderModules()}
              </ul>
              <div className="">
                <button 
                  onClick={() => {
                    this.addedItem = "todo"
                    this.createTodo()
                  }} 
                  className="btn btn-primary"
                >
                  Add task
                </button>
              </div>
              {this.renderTodoTabList()}
              <ul className="list-group list-group-flush">
                {this.renderTodoItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          this.addedItem === "todo" ? 
          <AddTodoModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          /> :
          <AddModuleModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;
