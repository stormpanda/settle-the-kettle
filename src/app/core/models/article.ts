export interface TableRow {
  label: string;
  signal: string;
  threema: string;
  verdict?: string;
}

export interface ComparisonTable {
  id: string;
  title: string;
  rows: TableRow[];
}

export interface Section {
  id: string;
  title: string;
  content: string; // HTML allowed
  table?: ComparisonTable;
}

export interface Chapter {
  id: string;
  title: string;
  sections: Section[];
}
