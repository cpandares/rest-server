import { Request, Response } from "express"


const todos = [
    { id: 1, title: 'Todo 1', completed: false, completedAt: new Date()},
    { id: 2, title: 'Todo 2', completed: true, completedAt: new Date()},
    { id: 3, title: 'Todo 3', completed: false, completedAt: null },
]

export class TodoController {


    constructor(){}

    public getTodos = (req:Request, res:Response) => {
       return res.json(todos)
    }

    public getTodoById = (req:Request, res:Response) => {
        const { id } = req.params;
        if(isNaN(Number(id))) return res.status(400).json({message: 'Invalid id'});
        const todo = todos.find(todo => todo.id === Number(id));
        if(!todo) return res.status(404).json({message: 'Todo not found'})
        return res.json(todo)
    }

    public createTodo = (req:Request, res:Response) => {
        const { title, completed } = req.body;
        if(!title) return res.status(400).json({message: 'Title is required'})
        const newTodo = {
            id: todos.length + 1,
            title,
            completed: completed || false,
            completedAt: new Date()
        }
        todos.push(newTodo);
        return res.json(newTodo)
    }

    public updateTodo = (req:Request, res:Response) => {
        const { id } = req.params;
        const { title, completed, completedAt } = req.body;
        if(isNaN(Number(id))) return res.status(400).json({message: 'Invalid id'});
        const todo = todos.find(todo => todo.id === Number(id));
        if(!todo) return res.status(404).json({message: 'Todo not found'})
        todo.title = title || todo.title;
        todo.completed = completed || todo.completed;

        (completedAt === 'null') 
            ? todo.completedAt = null : todo.completedAt = new Date( completedAt || todo.completedAt );

        //if(completed) todo.completedAt = new Date();


        return res.json(todo)
    }

    public deleteTodo = (req:Request, res:Response) => {
        const { id } = req.params;
        if(isNaN(Number(id))) return res.status(400).json({message: 'Invalid id'});
        const todo = todos.find(todo => todo.id === Number(id));
        if(!todo) return res.status(404).json({message: 'Todo not found'})
        todos.splice(todos.indexOf(todo), 1);
        return res.json(todo)
    }


}