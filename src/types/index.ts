import { placeholder } from "../constants";

export type StatusMap = Record<
  string,
  | { status: "processing"; processId: string; data: null; error: null }
  | { status: "error"; processId: string; data: null; error: any }
  | {
      status: "ready";
      processId: string;
      data: typeof placeholder;
      error: null;
    }
>;
