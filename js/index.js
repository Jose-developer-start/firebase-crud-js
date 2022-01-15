import {saveTask,getTasks,onGetTasks,deleteTask,getTask,updateTask} from "./firebase.js";
const tasksContainer = document.getElementById('tasks-container');
const taskForm = document.getElementById('task-form')

let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async (e)=>{
    onGetTasks((querySnapshot)=>{

        let html = ''
        querySnapshot.forEach( doc =>{
            const task = doc.data();
            html += `
                <div class="card">
                    <div class="card__content">
                        <h3>${task.title}</h3>
                        <p>${task.description}</p>
                    </div>
                    <button class='btn-delete btn' data-id="${doc.id}">delete</button>
                    <button class='btn-edit btn' data-id="${doc.id}">Edit</button>
                </div>
            
            `;
        })
        tasksContainer.innerHTML = html;

        const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')
        btnsDelete.forEach(btn =>{
            btn.addEventListener('click', ({target: {dataset}}) =>{
                deleteTask(dataset.id)
            })
        })

        const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')
        btnsEdit.forEach((btn) =>{
            btn.addEventListener('click', async({target: {dataset}}) =>{
                const doc = await getTask(dataset.id)
                const task = doc.data();
                taskForm['task-title'].value = task.title;
                taskForm['task-description'].value = task.description;
                editStatus = true;
                id = dataset.id;
                taskForm['btn-task-save'].innerText ="Update" 
            })
        })
    })
})


taskForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const title = taskForm['task-title'];
    const description = taskForm['task-description']
    
    if(!title.value || !description.value){
        return;
    }

    if(!editStatus){
        saveTask(title.value,description.value)
        
    }else{
        //console.log('Edit')
        updateTask(id,{
            title: title.value,
            description: description.value
        })
        editStatus = false;
        taskForm['btn-task-save'].innerText ="save"
    }
    taskForm.reset();
})