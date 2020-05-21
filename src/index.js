
import './styles.css';
import {Todo, TodoList} from './classes';
import {crearTodoHTML} from './js/componentes.js';


export const todoList = new TodoList();

console.log(todoList.todos);

todoList.todos.forEach(todo => crearTodoHTML(todo));

