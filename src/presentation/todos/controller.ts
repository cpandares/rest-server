import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDTO } from "../../domain/dtos";


export class TodoController {


    constructor(){}

    public getTodos = async (req:Request, res:Response) => {

        const todos = await prisma.todo.findMany();

       return res.json(todos)
    }

    public getTodoById = async(req:Request, res:Response) => {
        const { id } = req.params;
        if(isNaN(Number(id))) return res.status(400).json({message: 'Invalid id'});
        const todo = await prisma.todo.findUnique({
            where: {
                id: Number(id)
            }
        });

        if(!todo) return res.status(404).json({message: 'Todo not found'})
        return res.json(todo)

        
    }

    public createTodo = async (req:Request, res:Response) => {

        const [error, createTodoDto] = CreateTodoDTO.create(req.body);

        if(error) return res.status(400).json({message: error});
               
        try {
            const todo = await prisma.todo.create({
                data: createTodoDto!
            
            })          
            return res.json(todo)
        } catch (error) {
            return res.status(500).json({message: `Internal server error: ${error}`})
        }
    }

    public updateTodo = async(req:Request, res:Response) => {
        const { id } = req.params;
        const { title, completed, completedAt } = req.body;

        if(isNaN(Number(id))) return res.status(400).json({message: 'Invalid id'});

        const todo = await prisma.todo.findUnique({
            where: {
                id: Number(id)
            }
        });

        if(!todo) return res.status(404).json({message: 'Todo not found'})

        try {
            const updatedTodo = await prisma.todo.update({
                where: {
                    id: Number(id)
                },
                data: {
                    title: title || todo.title,
                    completed: completed || todo.completed
                }
            })
            return res.json(updatedTodo)
        } catch (error) {
            return res.status(500).json({message: `Internal server error: ${error}`})
        }
        
    }

    public deleteTodo = async (req:Request, res:Response) => {
        const { id } = req.params;
        if(isNaN(Number(id))) return res.status(400).json({message: 'Invalid id'});
        const todo = await prisma.todo.findUnique({
            where: {
                id: Number(id)
            }
        });

        if(!todo) return res.status(404).json({message: 'Todo not found'})
        try {
            await prisma.todo.delete({
                where: {
                    id: Number(id)
                }
            })
            return res.json({message: 'Todo deleted successfully'})
        } catch (error) {
            return res.status(500).json({message: `Internal server error: ${error}`})
        }
    }


}