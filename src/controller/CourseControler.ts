import { Request, Response } from "express";
import { CourseBusiness } from "../business/CourseBusiness";
import { BaseError } from "../errors/BaseError";

export class CourseControler {
    public getCourses = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined
            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.getCourses(q)
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
    public createCourse = async (req: Request, res: Response) =>{
        try {
            const input = {
                id: req.body.id,
                name: req.body.name,
                lessons: req.body.lessons
            }
            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.createCourse(input)
            res.status(201).send(output)  
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }            
        }
    }
    public editCourse = async (req: Request, res: Response) =>{
        try {
            const id = req.params.id
            const newId = req.body.id
            const newName = req.body.name
            const newLessons = req.body.lessons
            const input = {
                newId,
                newName,
                newLessons
            }
            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.editCourse(id, input)
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }            
        }
    }
    public deleteCourse = async (req: Request, res: Response) =>{
        try {
            const idToDelete = req.params.id
            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.deleteCourse(idToDelete)
            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }            
        }
    }
}