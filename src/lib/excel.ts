import * as XLSX from "xlsx";

export type ParsedExcelRow = Record<string, string | number | null>;

export async function parseExcelFile(file: File): Promise<ParsedExcelRow[]> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) return [];

  const worksheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Array<unknown>>(worksheet, {
    header: 1,
    raw: false,
    defval: null,
  });

  if (rows.length === 0) return [];

  const headers = rows[0] as Array<unknown>;
  const dataRows = rows.slice(1);

  return dataRows.map((row) => {
    const record: ParsedExcelRow = {};
    headers.forEach((header, index) => {
      const key = typeof header === "string" ? header.trim() : String(header ?? "");
      if (key) {
        record[key] = row[index] as string | number | null;
      }
    });
    return record;
  });
}
