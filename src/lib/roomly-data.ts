export const COURSE_OPTIONS = [
  "BTech MTech 2nd Sem",
  "BTech MTech 4th Sem",
  "BSc MSc 2nd Sem",
  "BSc MSc 4th Sem",
  "BSc MSc 6th Sem",
  "BSc LLB 2nd Sem",
  "BSc LLB 4th Sem",
  "MSc 2nd Sem",
] as const;

export function formatCourse(value: string | null | undefined) {
  return value?.trim() || "Course not set";
}

export function formatYear(value: number | string | null | undefined) {
  return value ? `Year ${value}` : "Year not set";
}

export function formatCourseYear(course: string | null | undefined, year: number | string | null | undefined) {
  return `${formatCourse(course)} · ${formatYear(year)}`;
}

export function compareRoomNumbers(a: string, b: string) {
  const aNum = Number(a.replace(/\D/g, ""));
  const bNum = Number(b.replace(/\D/g, ""));
  if (Number.isFinite(aNum) && Number.isFinite(bNum) && aNum !== bNum) return aNum - bNum;
  return a.localeCompare(b);
}

export function formatFloor(floorNumber: number | null | undefined) {
  if (floorNumber === 0) return "Ground floor";
  if (floorNumber === 1) return "First floor";
  if (floorNumber === 2) return "Second floor";
  return floorNumber == null ? "Floor not set" : `Floor ${floorNumber}`;
}

export function hostelGenderLabel(gender: string | null | undefined) {
  if (gender === "male") return "Boys";
  if (gender === "female") return "Girls";
  return "All";
}
