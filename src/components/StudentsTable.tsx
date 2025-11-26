import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Save,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { Student } from "../types";

interface StudentsTableProps {
  filteredStudents: Student[];
  editingId: number | null;
  editName: string;
  setEditName: (val: string) => void;
  editClassId: number;
  setEditClassId: (val: number) => void;
  save: () => void;
  edit: (student: Student) => void;
  getDegreeName: (id: number) => string;
  getClassName: (id: number) => string;
  classes: { id: number; name: string }[];
}

export function StudentsTable({
  filteredStudents,
  editingId,
  editName,
  setEditName,
  editClassId,
  setEditClassId,
  save,
  edit,
  getDegreeName,
  getClassName,
  classes,
}: StudentsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalItems = filteredStudents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const pagination = () => (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 bg-slate-50/50 rounded-b-md">
      <div className="text-xs text-slate-500">
        Mostrando{" "}
        <span className="font-medium text-slate-900">{startIndex + 1}</span> a{" "}
        <span className="font-medium text-slate-900">{endIndex}</span> de{" "}
        <span className="font-medium text-slate-900">{totalItems}</span>{" "}
        resultados
      </div>
      <div className="flex items-center justify-end gap-1">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 bg-white border-slate-200 hover:bg-slate-100 hover:text-slate-900 tooltip-trigger hover:cursor-pointer"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          title="Primeira Página"
        >
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-white border-slate-200 hover:bg-slate-100 hover:text-slate-900 tooltip-trigger hover:cursor-pointer"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          title="Página Anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-xs font-medium text-slate-600 min-w-12 text-center">
          Página {currentPage} de {totalPages}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-white border-slate-200 hover:bg-slate-100 hover:text-slate-900 tooltip-trigger hover:cursor-pointer"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          title="Próxima Página"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 bg-white border-slate-200 hover:bg-slate-100 hover:text-slate-900 tooltip-trigger hover:cursor-pointer"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          title="Última Página"
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="w-full overflow-x-auto rounded-t-md">
        <Table className="w-full text-left text-sm text-slate-600">
          <TableHeader className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
            <TableRow>
              <TableHead className="px-6 py-4">RA</TableHead>
              <TableHead className="px-6 py-4">Nome</TableHead>
              <TableHead className="px-6 py-4">Graduação</TableHead>
              <TableHead className="px-6 py-4">Turma</TableHead>
              <TableHead className="px-6 py-4 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="px-6 py-10 text-center text-slate-400"
                >
                  Nenhum estudante encontrado.
                </TableCell>
              </TableRow>
            ) : (
              currentStudents.map((student) => (
                <TableRow
                  key={student.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="px-6 py-4 font-mono text-slate-500">
                    #{student.ra}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-slate-900">
                    {editingId === student.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border border-indigo-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      student.name
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-600">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {getDegreeName(student.degreeId)}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {editingId === student.id ? (
                      <Select
                        value={String(editClassId)}
                        onValueChange={(value) => setEditClassId(Number(value))}
                      >
                        <SelectTrigger className="border border-slate-300 rounded-lg text-slate-700 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none hover:cursor-pointer">
                          <SelectValue placeholder="Turma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Turmas</SelectLabel>
                            {classes.map((grade) => (
                              <SelectItem
                                key={grade.id}
                                value={String(grade.id)}
                              >
                                {grade.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 font-bold text-slate-600">
                        {getClassName(student.classId)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    {editingId === student.id ? (
                      <Button
                        onClick={save}
                        variant="outline"
                        className="text-emerald-600 hover:text-emerald-700 hover:cursor-pointer font-medium flex items-center justify-end gap-1 ml-auto"
                      >
                        <Save className="w-4 h-4" /> Salvar
                      </Button>
                    ) : (
                      <Button
                        onClick={() => edit(student)}
                        variant="outline"
                        className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer font-medium"
                      >
                        Editar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalItems > 0 && pagination()}
    </div>
  );
}
