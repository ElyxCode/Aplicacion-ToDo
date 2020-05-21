// Referencias en el HTML

import { Todo } from "../classes";
import {todoList} from "../index.js";

// Referencia HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHTML = (todo) => {

    const htmlTodo = `
    <li class="${(todo.completado)? 'completed' : ''}" data-id="${todo.id}">
			<div class="view">
				<input class="toggle" type="checkbox" ${(todo.completado)? 'checked' : ''}>
				<label>${todo.tarea}</label>
				<button class="destroy"></button>
			</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    
    return divTodoList.append(div.firstElementChild);
};

txtInput.addEventListener('keyup', (event) => {
    if(event.keyCode === 13 && txtInput.value.length > 0){
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHTML(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id')
    console.log(todoElemento);
    console.log(todoId);

    if(nombreElemento.includes('input')){ // click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')){ // Hay que borrar el todo
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
    
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length-1; i >= 0; i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if(!filtro){ return; };

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected'); 

    for(const elem of divTodoList.children){
        elem.classList.remove('hidden');
        const completado = elem.classList.contains('completed');

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elem.classList.add('hidden');
                }
            break;

            case 'Completados':
                if(!completado){
                    elem.classList.add('hidden');
                }
            break;
        }
    }
});