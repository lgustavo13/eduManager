import studentsData from "../data/students.json";
import teachersData from "../data/teachers.json";
import relationshipsData from "../data/relationships.json";
import mattersData from "../data/matters.json";
import degreesData from "../data/degrees.json";
import classesData from "../data/classes.json";
import type {
  ClassObj,
  Degree,
  Matter,
  Relationship,
  Student,
  Teacher,
} from "../types";

export const INITIAL_STUDENTS: Student[] = studentsData as Student[];

export const TEACHERS: Teacher[] = teachersData as Teacher[];

export const INITIAL_RELATIONSHIPS: Relationship[] =
  relationshipsData as Relationship[];

export const MATTERS: Matter[] = mattersData as Matter[];

export const DEGREES: Degree[] = degreesData as Degree[];

export const CLASSES: ClassObj[] = (
  classesData as { classes: { name: string }[] }
).classes.map((grade, idx) => ({
  id: idx + 1,
  name: grade.name,
}));
