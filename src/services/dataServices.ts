import { CLASSES, DEGREES, MATTERS, TEACHERS } from "../constants";
import type { ClassRef, Student } from "../types";

export const getDegreeName = (id: number): string => {
  return (
    DEGREES.find((degree) => degree.id === id)?.name ||
    `Graduação (${id}) não encontrada`
  );
};

export const getClassName = (id: number): string => {
  return (
    CLASSES.find((classRef) => classRef.id === id)?.name ||
    `Turma (${id}) não encontrada`
  );
};

export const getTeacherName = (id: number): string => {
  return (
    TEACHERS.find((teacher) => teacher.id === id)?.name ||
    `Professor (${id}) não encontrado`
  );
};

export const getMatterName = (id: number): string => {
  return (
    MATTERS.find((matter) => matter.id === id)?.name ||
    `Matéria (${id}) não encontrada`
  );
};

export const resolveClassId = (ref: ClassRef): number => {
  if (ref.classId) return ref.classId;
  if (ref.classPosition) return ref.classPosition;
  return 0;
};

export const generateRandomStudents = (
  count: number,
  currentMaxId: number
): Student[] => {
  const newStudents: Student[] = [];
  for (let i = 0; i < count; i++) {
    const randomDegree = DEGREES[Math.floor(Math.random() * DEGREES.length)];
    const randomClass = CLASSES[Math.floor(Math.random() * CLASSES.length)];
    const id = currentMaxId + i + 1;

    newStudents.push({
      id: id,
      ra: Math.floor(Math.random() * 900000) + 100000,
      name: `Gerado Estudante ${id}`,
      degreeId: randomDegree.id,
      classId: randomClass.id,
    });
  }
  return newStudents;
};

export const getStudentsForRelationship = (
  degreeId: number,
  classRefs: ClassRef[],
  allStudents: Student[]
): Student[] => {
  const validClassIds = classRefs.map(resolveClassId);
  return allStudents.filter(
    (student) =>
      student.degreeId === degreeId && validClassIds.includes(student.classId)
  );
};
