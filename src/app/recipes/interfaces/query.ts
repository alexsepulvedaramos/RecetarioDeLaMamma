import { FieldPath, WhereFilterOp } from "firebase/firestore";

export interface Query {
  queryItems: QueryItem[];
}

export interface QueryItem {
  fieldPath: string | FieldPath;
  opStr: WhereFilterOp,
  value: unknown
}
