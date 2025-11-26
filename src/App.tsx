import { useState } from "react";
import Layout from "./components/Layout";
import StudentsScreen from "./components/StudentsScreen";
import TeachersScreen from "./components/TeachersScreen";
import { INITIAL_RELATIONSHIPS, INITIAL_STUDENTS } from "./constants";
import type { Relationship, Student } from "./types";

const App = () => {
  const [activeTab, setActiveTab] = useState<"students" | "teachers">(
    "students"
  );

  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [relationships, setRelationships] = useState<Relationship[]>(
    INITIAL_RELATIONSHIPS
  );

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "students" ? (
        <StudentsScreen students={students} setStudents={setStudents} />
      ) : (
        <TeachersScreen
          relationships={relationships}
          setRelationships={setRelationships}
          allStudents={students}
        />
      )}
    </Layout>
  );
};

export default App;
