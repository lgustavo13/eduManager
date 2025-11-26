import { Sidebar } from "./Sidebar";
import type { LayoutProps } from "../types";
import { Header } from "./Header";

const Layout = ({ children, activeTab, setActiveTab }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto h-screen">
        <Header activeTab={activeTab} />
        <div className="p-6 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
