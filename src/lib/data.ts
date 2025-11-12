// This file simulates a database for courses, branches, semesters, subjects, topics, and notes.

// --- Courses ---
const courses = [
  { id: "eng", name: "Engineering & Technology" },
  { id: "sci", name: "Science" },
  { id: "arts", name: "Arts & Humanities" },
];

// --- Branches ---
const branches = [
  // Engineering
  { id: "cse", name: "Computer Science", courseId: "eng" },
  { id: "mech", name: "Mechanical Engineering", courseId: "eng" },
  // Science
  { id: "bio", name: "Biology", courseId: "sci" },
  { id: "chem", name: "Chemistry", courseId: "sci" },
  { id: "math", name: "Mathematics", courseId: "sci" },
  // Arts
  { id: "hist", name: "History", courseId: "arts" },
];

// --- Semesters ---
const semesters = [
  { id: "sem1", name: "Semester 1" },
  { id: "sem2", name: "Semester 2" },
  { id: "sem3", name: "Semester 3" },
  { id: "sem4", name: "Semester 4" },
  { id: "sem5", name: "Semester 5" },
  { id: "sem6", name: "Semester 6" },
  { id: "sem7", name: "Semester 7" },
  { id: "sem8", name: "Semester 8" },
];

// --- Subjects ---
const subjects = [
{ id: "bs104", name: "Applied Chemistry", branch: "cse", semester: "sem2" },
{ id: "es102", name: "Programming in C", branch: "cse", semester: "sem2" },
{ id: "bs106", name: "Applied Physics – II", branch: "cse", semester: "sem2" },
{ id: "bs112", name: "Applied Mathematics – II", branch: "cse", semester: "sem2" },
{ id: "es108", name: "Electrical Science", branch: "cse", semester: "sem2" },
{ id: "bs110", name: "Environmental Studies", branch: "cse", semester: "sem2" },
{ id: "hs114", name: "Communication Skills", branch: "cse", semester: "sem2" },
{ id: "hs116", name: "Indian Constitution", branch: "cse", semester: "sem2" },
{ id: "hs118", name: "Human Values and Ethics", branch: "cse", semester: "sem2" },
{ id: "es114", name: "Engineering Mechanics", branch: "cse", semester: "sem2" },
{ id: "cse301", name: "Analog Electronics – I", branch: "cse", semester: "sem3" },
{ id: "cse302", name: "Digital Logic and Computer Design", branch: "cse", semester: "sem3" },
{ id: "cse303", name: "Indian Knowledge System", branch: "cse", semester: "sem3" },
{ id: "cse304", name: "Signals and Systems", branch: "cse", semester: "sem3" },
{ id: "cse305", name: "Analog Communication", branch: "cse", semester: "sem3" },
{ id: "cse306", name: "Computational Methods", branch: "cse", semester: "sem3" },
{ id: "cse401", name: "Probability, Statistics and Linear Programming", branch: "cse", semester: "sem4" },
{ id: "cse402", name: "Analog Electronics – II", branch: "cse", semester: "sem4" },
{ id: "cse403", name: "Network Analysis and Synthesis", branch: "cse", semester: "sem4" },
{ id: "cse404", name: "Electromagnetic Field Theory", branch: "cse", semester: "sem4" },
{ id: "cse405", name: "Digital Communication", branch: "cse", semester: "sem4" },
{ id: "cse406", name: "Microprocessors and Microcontrollers", branch: "cse", semester: "sem4" },
{ id: "cse407", name: "Technical Writing", branch: "cse", semester: "sem4" },
];

// --- Data Fetching Functions ---

export const getCourses = () => courses;
export const getCourse = (id: string) => courses.find((c) => c.id === id);

export const getBranches = (courseId: string) => branches.filter((b) => b.courseId === courseId);
export const getBranch = (id: string) => branches.find((b) => b.id === id);

export const getSemesters = () => semesters;
export const getSemester = (id: string) => semesters.find((s) => s.id === id);

export const getSubjects = (branchId: string, semesterId: string) => {
  return subjects.filter((s) => s.branch === branchId && s.semester === semesterId);
};