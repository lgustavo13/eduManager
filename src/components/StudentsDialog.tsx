import { Eye } from "lucide-react";
import {
  getClassName,
  getDegreeName,
  getTeacherName,
} from "../services/dataServices";
import type { DegreeRef, Relationship, Student } from "../types";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface StudentsDialogProps {
  relationship: Relationship;
  degree: DegreeRef;
  selectedContext: {
    teacherName: string;
    degreeName: string;
    students: Student[];
  } | null;
  handleShowStudents: (teacherName: string, degree: DegreeRef) => void;
}

export const StudentsDialog = ({
  relationship,
  degree,
  selectedContext,
  handleShowStudents,
}: StudentsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          onClick={() =>
            handleShowStudents(getTeacherName(relationship.teacherId), degree)
          }
          className="text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors tooltip-trigger hover:cursor-pointer"
          title="Ver os Estudantes"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="p-6 border-b border-slate-100 bg-indigo-50 rounded-t-xl">
          <DialogTitle className="font-bold text-lg text-indigo-900">
            Roster da Turma
          </DialogTitle>
          <DialogDescription className="text-sm text-indigo-700">
            {getTeacherName(relationship.teacherId)} •{" "}
            {getDegreeName(degree.degreeId)}
          </DialogDescription>
        </DialogHeader>
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in fade-in zoom-in duration-200">
          <div className="p-6 overflow-y-auto">
            {selectedContext?.students.length === 0 ? (
              <div className="text-center text-slate-500 py-5">
                Nenhum aluno encontrado.
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {selectedContext?.students.map((student) => (
                  <li
                    key={student.id}
                    className="py-3 flex justify-between items-center"
                  >
                    <span className="font-medium text-slate-700">
                      {student.name}
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">
                      Turma {getClassName(student.classId)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
