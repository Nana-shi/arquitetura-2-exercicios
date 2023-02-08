import express from "express";
import { CourseControler } from "../controller/CourseControler";

export const courseRouter = express.Router();
const courseControler = new CourseControler();

courseRouter.get("/", courseControler.getCourses)
courseRouter.post("/", courseControler.createCourse)
courseRouter.put("/:id", courseControler.editCourse)
courseRouter.delete("/:id", courseControler.deleteCourse)