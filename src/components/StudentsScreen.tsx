import { useState, useMemo, type SetStateAction, type Dispatch } from "react";
import { RefreshCw } from "lucide-react";
import { CLASSES, DEGREES } from "../constants";
import type { Student } from "../types";
import {
  generateRandomStudents,
  getClassName,
  getDegreeName,
} from "../services/dataServices";
import { Button } from "./ui/button";
import { StudentsChart } from "./StudentsChart";
import { FilterSelect } from "./FilterSelect";
import { StudentsTable } from "./StudentsTable";

interface StudentsScreenProps {
  students: Student[];
  setStudents: Dispatch<SetStateAction<Student[]>>;
}

const StudentsScreen = ({ students, setStudents }: StudentsScreenProps) => {
  const [filterDegree, setFilterDegree] = useState<string>("");
  const [filterClass, setFilterClass] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const [editName, setEditName] = useState("");
  const [editClassId, setEditClassId] = useState<number>(1);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchDegree = filterDegree
        ? student.degreeId.toString() === filterDegree
        : true;
      const matchClass = filterClass
        ? student.classId.toString() === filterClass
        : true;
      return matchDegree && matchClass;
    });
  }, [students, filterDegree, filterClass]);

  const chartData = useMemo(() => {
    const dataMap = new Map<string, number>();

    students.forEach((student) => {
      const degreeName = getDegreeName(student.degreeId);
      const shortName =
        degreeName.length > 20
          ? degreeName.substring(0, 18) + "..."
          : degreeName;
      dataMap.set(shortName, (dataMap.get(shortName) || 0) + 1);
    });
    return Array.from(dataMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, [students]);

  const handleGenerate = () => {
    const maxId =
      students.length > 0
        ? Math.max(...students.map((student) => student.id))
        : 0;
    const newBatch = generateRandomStudents(300, maxId);
    setStudents((prev) => [...prev, ...newBatch]);
  };

  const edit = (student: Student) => {
    setEditingId(student.id);
    setEditName(student.name);
    setEditClassId(student.classId);
  };

  const save = () => {
    if (editingId === null) return;
    setStudents((prev) =>
      prev.map((student) =>
        student.id === editingId
          ? { ...student, name: editName, classId: editClassId }
          : student
      )
    );
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Análise de Distribuição
            </h3>
            <p className="text-slate-500 text-sm">
              Distribuição em tempo real de estudantes por Graduação
            </p>
          </div>
          <Button
            size="lg"
            onClick={handleGenerate}
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-md transition-all active:scale-95 hover:cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Gerar +300 Estudantes</span>
          </Button>
        </div>

        <div className="h-[300px] w-full">
          <StudentsChart data={chartData} />
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row gap-4 justify-between lg:items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Estudantes Matriculados
            </h3>
            <p className="text-slate-500 text-sm">
              Gerencie detalhes e atribuições de estudantes
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <FilterSelect
              label="Graduações"
              placeholder="Todas as Graduações"
              options={DEGREES}
              filter={filterDegree}
              setFilter={setFilterDegree}
            />
            <FilterSelect
              label="Turmas"
              placeholder="Todas as Turmas"
              options={CLASSES}
              filter={filterClass}
              setFilter={setFilterClass}
            />
          </div>
        </div>

        <StudentsTable
          filteredStudents={filteredStudents}
          editingId={editingId}
          editName={editName}
          setEditName={setEditName}
          editClassId={editClassId}
          setEditClassId={setEditClassId}
          save={save}
          edit={edit}
          getDegreeName={getDegreeName}
          getClassName={getClassName}
          classes={CLASSES}
        />
      </section>
    </div>
  );
};

export default StudentsScreen;
