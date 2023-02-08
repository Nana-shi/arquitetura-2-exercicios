import { CourseDatabase } from "../database/CourseDatabase";
import { BadRequestError } from "../errors/BadRequesrError";
import { NotFoundError } from "../errors/NotFoundError";
import { Course } from "../models/Course";
import { CourseDB } from "../types";

export class CourseBusiness{
    public getCourses = async (q:string | undefined) =>{
        const courseDatabase = new CourseDatabase()
        const courseDB = await courseDatabase.findCourses(q)
        const courses: Course[] = courseDB.map((courseDB)=> new Course(
            courseDB.id,
            courseDB.name,
            courseDB.lessons
        ))
        return courses    
    }
    public createCourse = async (input: any) =>{
        const {id, name, lessons} = input
        if(typeof id !== "string"){
            throw new BadRequestError("'id' deve ser string!")
        }
        if(typeof name !== "string"){
            throw new BadRequestError("'name' deve ser string!")
        }
        if(typeof lessons !== "number"){
            throw new BadRequestError("'lessons' deve ser number!")
        }
        const courseDatabase = new CourseDatabase()
        const courseDBExist = await courseDatabase.findCourseById(id)
        if(courseDBExist){
            throw new BadRequestError("Um curso com essa 'id' já existe!")
        }
        const courseNameExist = await courseDatabase.findCourses(name)
        if(courseNameExist){
            throw new BadRequestError("Um curso com esse 'name' já existe!")
        }
        const newCourse = new Course(
            id,
            name,
            lessons
        )
        const newCourseDB: CourseDB = {
            id: newCourse.getId(),
            name: newCourse.getName(),
            lessons: newCourse.getLessons()
        }
        await courseDatabase.insertCourse(newCourseDB)
        const output = {
            message: "Cadastro realizado com sucesso!",
            user: newCourse
        }
        return output
    }
    public editCourse = async (id:string, input:any) =>{
        const {newId,newName,newLessons} = input
        if(!newId || !newName || !newLessons){
            throw new BadRequestError("'id', 'name', 'lessons' precisam estar corretos!")
        }
        if(newId !== undefined){
            if(typeof newId !== "string"){
                throw new BadRequestError("'id' precisa ser string!")
            }
        }
        if(newName !== undefined){
            if(typeof newName !== "string"){
                throw new BadRequestError("'name' precisa ser string!")
            }
        }
        if(newLessons !== undefined){
            if(typeof newLessons !== "number"){
                throw new BadRequestError("'lessons' precisa ser number!")
            }
        }
        const courseDatabase = new CourseDatabase()
        const courseDBExist = await courseDatabase.findCourseById(id)
        if(!courseDBExist){
            throw new NotFoundError("'id' do curso não encontrado")
        }
        const courseToEdit = new Course(
            newId,
            newName,
            newLessons
        )
        const updateCourseDB: CourseDB = {
            id: courseToEdit.getId() || courseDBExist.id,
            name: courseToEdit.getName() || courseDBExist.name,
            lessons: courseToEdit.getLessons() || courseDBExist.lessons
        }
        await courseDatabase.editCourseById(id, updateCourseDB)
        return { message: "Curso editado com sucesso!"}
    }
    public deleteCourse = async(idToDelete:string)=>{
        const courseDatabase = new CourseDatabase()
        const courseToDelete = await courseDatabase.findCourseById(idToDelete)
        if(!courseToDelete){
            throw new NotFoundError("Curso não encontrado!")
        } else{
            await courseDatabase.deleteCourseById(idToDelete)
            return {message: "Curso deletado com sucesso!"}
        }
    }
}