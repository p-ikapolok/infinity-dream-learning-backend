import { Request, Response } from "express";
import { prisma } from "../server";

// ----------------------
// Create Course
// ----------------------
export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, price, category } = req.body;

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price,
        category,
        teacherId: (req as any).user.id
      }
    });

    res.json(course);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// ----------------------
// Create Cohort
// ----------------------
export const createCohort = async (req: Request, res: Response) => {
  try {
    const { courseId, name, startDate, graduationDate } = req.body;

    const cohort = await prisma.cohort.create({
      data: {
        name,
        courseId,
        startDate: new Date(startDate),
        graduationDate: new Date(graduationDate)
      }
    });

    res.json(cohort);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};