import type { LayoutProps } from "../types";

type HeaderProps = Pick<LayoutProps, "activeTab">;

export const Header = ({ activeTab }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-800">
        {activeTab === "students"
          ? "Relatório dos Estudantes"
          : "Relacionamentos entre o corpo docente"}
      </h2>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-slate-500 hidden sm:inline">
          Ano Academico {new Date().getFullYear()}
        </span>
        <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
          A
        </div>
      </div>
    </header>
  );
};
