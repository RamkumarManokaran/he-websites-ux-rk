export interface GradeFilterArrayInterface {
  qualId: string | null;
  qualification: string | null;
  qualificationUrl: string | null;
  parentQualification: string;
  gradeOptions: string | null;
  maxPoint: string | null;
  maxTotalPoint: string | null;
  gradeOptionflag: string | null;
  template: string | null;
}

export interface GradeFilterInterface {
  gradeFilterList: GradeFilterArrayInterface[];
}

export interface KeyValuePair {
  key: string;
  value: number;
}

export interface GradePointsInterface {
  maxPoint: number;
  maxTotalPoint: number;
  getmaxTotalPoint: number;
  podSpecificPoints: number;
}

export interface Initialvalue {
  SelectedLevel: string | null;
  totalcredit: number;
  qualId: number | string | null;
  type: string | null;
  maxPoint: number | string;
  maxTotalPoint: number | string;
  getmaxTotalPoint: number | string;
  podSpecificPoints: number;
  userEntryPoint: string;
  min: string | number;
  max: string | number;
  gradeArray: GradeArray[] | undefined;
}

export interface GradeArray {
  key: string;
  value: number;
}

export interface UserStudyLevelEntryObject {
  SelectedLevel: string | null;
  qualId: string | null | number;
  userEntryPoint: string;
}

export interface Qualification {
  qualId: number;
  SelectedLevel: string | null | undefined;
  userEntryPoint: string;
}
