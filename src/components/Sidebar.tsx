import { GraduationCap, LayoutDashboard, Users } from "lucide-react";
import { Button } from "./ui/button";
import type { LayoutProps } from "../types";
import { useMemo } from "react";

type ButtonProps = Omit<LayoutProps, "children">;

export const Sidebar = ({ activeTab, setActiveTab }: ButtonProps) => {
  const buttonActions = useMemo(
    () => [
      {
        onClick: () => setActiveTab("students"),
        activeTabClassName:
          activeTab === "students"
            ? "bg-indigo-600 shadow-lg shadow-indigo-900/50 hover:bg-indigo-600"
            : "text-slate-400 hover:bg-slate-800 hover:text-white",
        icon: <Users className="w-5 h-5" />,
        text: "Estudantes",
      },
      {
        onClick: () => setActiveTab("teachers"),
        activeTabClassName:
          activeTab === "teachers"
            ? "bg-indigo-600  shadow-lg shadow-indigo-900/50 hover:bg-indigo-600"
            : "text-slate-400 hover:bg-slate-800 hover:text-white",
        icon: <GraduationCap className="w-5 h-5" />,
        text: "Professores",
      },
    ],
    [activeTab, setActiveTab]
  );

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-white shrink-0">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
        <LayoutDashboard className="w-6 h-6 text-indigo-400" />
        <h1 className="text-xl font-bold tracking-tight">EduManager</h1>
      </div>
      <nav className="p-4 space-y-2">
        {buttonActions.map((button) => (
          <Button
            key={button.text}
            onClick={button.onClick}
            className={`w-full flex items-center rounded-lg transition-all duration-200 hover:cursor-pointer ${button.activeTabClassName}`}
          >
            {button.icon}
            <span className="font-medium">{button.text}</span>
          </Button>
        ))}
      </nav>
    </aside>
  );
};
