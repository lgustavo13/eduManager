import { useState, type Dispatch, type SetStateAction } from "react";
import { DEGREES, MATTERS, TEACHERS } from "../constants";
import type { Relationship } from "../types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { FilterSelect } from "./FilterSelect";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface NewAssignmentProps {
  setRelationships: Dispatch<SetStateAction<Relationship[]>>;
  relationships: Relationship[];
}

export const NewAssignmentForm = ({
  relationships,
  setRelationships,
}: NewAssignmentProps) => {
  const [newTeacherId, setNewTeacherId] = useState<number>(TEACHERS[0].id);
  const [newMatterId, setNewMatterId] = useState<number>(MATTERS[0].id);
  const [newDegreeId, setNewDegreeId] = useState<number>(DEGREES[0].id);

  const handleAddRelationship = (e: React.FormEvent) => {
    e.preventDefault();
    const newId =
      Math.max(...relationships.map((relationship) => relationship.id), 0) + 1;

    const newRel: Relationship = {
      id: newId,
      teacherId: newTeacherId,
      matterId: newMatterId,
      degrees: [
        {
          degreeId: newDegreeId,
          classes: [{ classId: 1 }],
        },
      ],
    };

    setRelationships((prev) => [...prev, newRel]);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full md:w-auto flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition-all hover:cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Adicionar Atribuição</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Nova Atribuição
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Adicione uma nova atribuição para um professor.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
          <form onSubmit={handleAddRelationship} className="space-y-4">
            <div className="flex justify-between">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Professor
                </label>
                <FilterSelect
                  filter={newTeacherId.toString()}
                  setFilter={(id) => setNewTeacherId(Number(id))}
                  options={TEACHERS}
                  label="Professor"
                  placeholder="Filtrar por Professor"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Matéria
                </label>
                <FilterSelect
                  filter={newMatterId.toString()}
                  setFilter={(id) => setNewMatterId(Number(id))}
                  options={MATTERS}
                  label="Matéria"
                  placeholder="Filtrar por Matéria"
                />
              </div>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <label className="block text-sm font-medium text-indigo-900 mb-1">
                Selecionar Graduação
              </label>
              <FilterSelect
                filter={newDegreeId.toString()}
                setFilter={(id) => setNewDegreeId(Number(id))}
                options={DEGREES}
                label="Graduação"
                placeholder="Filtrar por Graduação"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium hover:cursor-pointer"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="submit"
                  variant="default"
                  className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 font-medium hover:cursor-pointer"
                >
                  Criar Atribuição
                </Button>
              </DialogClose>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
