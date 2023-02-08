import { CourseDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CourseDatabase extends BaseDatabase {
    public static TABLE_COURSES = "courses"
    public async findCourses(q:string | undefined){
        let courseDB
        if(q){
            const result: CourseDB[] = await BaseDatabase.connection(CourseDatabase.TABLE_COURSES).where("name", "LIKE", `%${q}%`)
            courseDB = result
        } else{
            const result: CourseDB[] = await BaseDatabase.connection(CourseDatabase.TABLE_COURSES)
            courseDB = result
        }
        return courseDB
    }
    public async findCourseById(id:string){
        const [courseDB]: CourseDB[] | undefined[] = await BaseDatabase.connection(CourseDatabase.TABLE_COURSES).where({id})
        return courseDB
    }
    public async insertCourse(newCourseDB: CourseDB){
        await BaseDatabase.connection(CourseDatabase.TABLE_COURSES).insert(newCourseDB)
    }
    public async editCourseById(id:string, updateCourseDB:CourseDB){
        await BaseDatabase.connection(CourseDatabase.TABLE_COURSES).update(updateCourseDB).where({id})
    }
    public async deleteCourseById(id:string){
        await BaseDatabase.connection(CourseDatabase.TABLE_COURSES).del().where({id})
    }
}