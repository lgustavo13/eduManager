export interface LayoutProps {
  children: React.ReactNode;
  activeTab: "students" | "teachers";
  setActiveTab: (tab: "students" | "teachers") => void;
}

export interface Degree {
  id: number;
  name: string;
}

export interface ClassObj {
  id: number;
  name: string;
}

export interface Student {
  id: number;
  ra: number;
  name: string;
  degreeId: number;
  classId: number;
}

export interface Teacher {
  id: number;
  name: string;
}

export interface Matter {
  id: number;
  name: string;
}

export interface ClassRef {
  classPosition?: number;
  classId?: number;
}

export interface DegreeRef {
  degreeId: number;
  classes: ClassRef[];
}

export interface Relationship {
  id: number;
  teacherId: number;
  matterId: number;
  degrees: DegreeRef[];
}

export interface NewRelationshipPayload {
  teacherId: number;
  matterId: number;
  degreeId: number;
  classIds: number[];
}
