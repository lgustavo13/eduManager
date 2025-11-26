import React, { useState, useMemo } from "react";
import { BookOpen, GraduationCap } from "lucide-react";
import { CLASSES, DEGREES } from "../constants";
import type { Relationship, Student, DegreeRef } from "../types";
import {
  getClassName,
  getDegreeName,
  getMatterName,
  getStudentsForRelationship,
  getTeacherName,
  resolveClassId,
} from "../services/dataServices";
import { FilterSelect } from "./FilterSelect";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { StudentsDialog } from "./StudentsDialog";
import { NewAssignmentForm } from "./NewAssignmentForm";

interface TeachersScreenProps {
  relationships: Relationship[];
  setRelationships: React.Dispatch<React.SetStateAction<Relationship[]>>;
  allStudents: Student[];
}

const TeachersScreen: React.FC<TeachersScreenProps> = ({
  relationships,
  setRelationships,
  allStudents,
}) => {
  const [filterDegree, setFilterDegree] = useState<string>("");
  const [filterClass, setFilterClass] = useState<string>("");

  const [selectedContext, setSelectedContext] = useState<{
    teacherName: string;
    degreeName: string;
    students: Student[];
  } | null>(null);

  const filteredRelationships = useMemo(() => {
    return relationships.filter((relationship) => {
      const degreeMatch = filterDegree
        ? relationship.degrees.some(
            (degree) => degree.degreeId.toString() === filterDegree
          )
        : true;

      const classMatch = filterClass
        ? relationship.degrees.some((degree) =>
            degree.classes.some(
              (grade) => resolveClassId(grade).toString() === filterClass
            )
          )
        : true;

      return degreeMatch && classMatch;
    });
  }, [relationships, filterDegree, filterClass]);

  const handleShowStudents = (teacherName: string, degreeRef: DegreeRef) => {
    const students = getStudentsForRelationship(
      degreeRef.degreeId,
      degreeRef.classes,
      allStudents
    );
    setSelectedContext({
      teacherName,
      degreeName: getDegreeName(degreeRef.degreeId),
      students,
    });
  };

  return (
    <div className="space-y-6 relative">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-3 flex-1 w-full md:w-auto">
          <FilterSelect
            filter={filterDegree}
            setFilter={setFilterDegree}
            options={DEGREES}
            label="Graduação"
            placeholder="Filtrar por Graduação"
          />
          <FilterSelect
            filter={filterClass}
            setFilter={setFilterClass}
            options={CLASSES}
            label="Turma"
            placeholder="Filtrar por Turma"
          />
        </div>

        <NewAssignmentForm
          relationships={relationships}
          setRelationships={setRelationships}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredRelationships.map((relationship) => (
          <Card key={relationship.id}>
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="font-bold text-slate-800">
                    {getTeacherName(relationship.teacherId)}
                  </CardTitle>
                  <CardDescription className="flex items-center text-xs text-slate-500 gap-1">
                    <BookOpen className="w-3 h-3" />
                    {getMatterName(relationship.matterId)}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs font-semibold uppercase text-slate-400 mb-3">
                Turmas Atribuídas
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {relationship.degrees.map((degree, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-lg p-3 bg-white hover:border-indigo-200 transition-colors flex justify-between items-center"
                  >
                    <div>
                      <p
                        className="text-sm font-medium text-slate-700 line-clamp-1"
                        title={getDegreeName(degree.degreeId)}
                      >
                        {getDegreeName(degree.degreeId)}
                      </p>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {degree.classes.map((grade, gradeIdx) => (
                          <span
                            key={gradeIdx}
                            className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200"
                          >
                            {getClassName(resolveClassId(grade))}
                          </span>
                        ))}
                      </div>
                    </div>
                    <StudentsDialog
                      relationship={relationship}
                      degree={degree}
                      selectedContext={selectedContext}
                      handleShowStudents={handleShowStudents}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredRelationships.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-400">
              Nenhum Professor encontrado para está turma e graduação.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachersScreen;
