import { useState, useEffect, useContext, createContext, useReducer, useCallback } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const COLORS = {
  primary: "#1a3a5c",
  primaryLight: "#2563a8",
  accent: "#0ea5e9",
  accentDark: "#0284c7",
  success: "#16a34a",
  warning: "#d97706",
  danger: "#dc2626",
  info: "#6366f1",
  surface: "#f8fafc",
  surfaceAlt: "#f1f5f9",
  border: "#e2e8f0",
  textPrimary: "#0f172a",
  textSecondary: "#475569",
  textMuted: "#94a3b8",
};

const CHART_COLORS = ["#2563a8", "#16a34a", "#d97706", "#dc2626", "#6366f1", "#0ea5e9"];

// ─── Context & State ──────────────────────────────────────────────────────────
const AppContext = createContext(null);

const MOCK_DATA = {
  stats: {
    totalStudents: 1284,
    totalTeachers: 87,
    totalClasses: 42,
    attendanceRate: 94.2,
    feeCollection: 2840000,
    pendingFees: 340000,
    activeUsers: 312,
    avgGPA: 3.4,
  },
  attendanceData: [
    { month: "Aug", present: 95, absent: 5 },
    { month: "Sep", present: 92, absent: 8 },
    { month: "Oct", present: 94, absent: 6 },
    { month: "Nov", present: 88, absent: 12 },
    { month: "Dec", present: 91, absent: 9 },
    { month: "Jan", present: 96, absent: 4 },
  ],
  feeData: [
    { month: "Aug", collected: 480000, pending: 60000 },
    { month: "Sep", collected: 510000, pending: 40000 },
    { month: "Oct", collected: 490000, pending: 55000 },
    { month: "Nov", collected: 520000, pending: 35000 },
    { month: "Dec", collected: 460000, pending: 70000 },
    { month: "Jan", collected: 380000, pending: 80000 },
  ],
  performanceData: [
    { subject: "Math", avg: 78, pass: 92 },
    { subject: "Science", avg: 82, pass: 95 },
    { subject: "English", avg: 75, pass: 88 },
    { subject: "History", avg: 80, pass: 91 },
    { subject: "Urdu", avg: 85, pass: 96 },
  ],
  gradeDistribution: [
    { name: "A+", value: 18 },
    { name: "A", value: 25 },
    { name: "B", value: 30 },
    { name: "C", value: 17 },
    { name: "D", value: 7 },
    { name: "F", value: 3 },
  ],
  teachers: [
    { id: 1, name: "Dr. Aisha Khan", subject: "Mathematics", classes: ["10-A","11-B","12-A"], attendance: 97, status: "active", email: "aisha.khan@school.edu", phone: "0333-1234567", experience: "12 yrs" },
    { id: 2, name: "Prof. Bilal Ahmed", subject: "Physics", classes: ["11-A","12-A","12-B"], attendance: 94, status: "active", email: "bilal.ahmed@school.edu", phone: "0312-9876543", experience: "8 yrs" },
    { id: 3, name: "Ms. Sara Malik", subject: "English", classes: ["9-A","9-B","10-A"], attendance: 98, status: "active", email: "sara.malik@school.edu", phone: "0321-5551234", experience: "6 yrs" },
    { id: 4, name: "Mr. Usman Ali", subject: "Biology", classes: ["10-B","11-A","12-B"], attendance: 91, status: "leave", email: "usman.ali@school.edu", phone: "0345-4441234", experience: "10 yrs" },
    { id: 5, name: "Ms. Fatima Noor", subject: "Chemistry", classes: ["11-B","12-A"], attendance: 96, status: "active", email: "fatima.noor@school.edu", phone: "0311-2223344", experience: "5 yrs" },
  ],
  students: [
    { id: 1, name: "Ahmed Hassan", rollNo: "1001", class: "10-A", gpa: 3.8, attendance: 96, feeStatus: "paid", parentName: "Hassan Ali", gender: "Male" },
    { id: 2, name: "Zara Siddiqui", rollNo: "1002", class: "10-A", gpa: 3.5, attendance: 92, feeStatus: "paid", parentName: "Siddiqui Baig", gender: "Female" },
    { id: 3, name: "Omar Farooq", rollNo: "1003", class: "10-B", gpa: 2.9, attendance: 85, feeStatus: "pending", parentName: "Farooq Ahmad", gender: "Male" },
    { id: 4, name: "Ayesha Tariq", rollNo: "1004", class: "11-A", gpa: 3.9, attendance: 98, feeStatus: "paid", parentName: "Tariq Mehmood", gender: "Female" },
    { id: 5, name: "Hamza Sheikh", rollNo: "1005", class: "11-B", gpa: 3.2, attendance: 89, feeStatus: "overdue", parentName: "Sheikh Naveed", gender: "Male" },
    { id: 6, name: "Maryam Qureshi", rollNo: "1006", class: "12-A", gpa: 4.0, attendance: 99, feeStatus: "paid", parentName: "Qureshi Arshad", gender: "Female" },
  ],
  classes: [
    { id: "9-A", name: "Grade 9-A", students: 38, teacher: "Ms. Sara Malik", room: "201", schedule: "Morning" },
    { id: "9-B", name: "Grade 9-B", students: 36, teacher: "Mr. Usman Ali", room: "202", schedule: "Morning" },
    { id: "10-A", name: "Grade 10-A", students: 40, teacher: "Dr. Aisha Khan", room: "301", schedule: "Morning" },
    { id: "10-B", name: "Grade 10-B", students: 37, teacher: "Mr. Usman Ali", room: "302", schedule: "Morning" },
    { id: "11-A", name: "Grade 11-A", students: 35, teacher: "Prof. Bilal Ahmed", room: "401", schedule: "Afternoon" },
    { id: "11-B", name: "Grade 11-B", students: 33, teacher: "Ms. Fatima Noor", room: "402", schedule: "Afternoon" },
    { id: "12-A", name: "Grade 12-A", students: 30, teacher: "Dr. Aisha Khan", room: "501", schedule: "Afternoon" },
    { id: "12-B", name: "Grade 12-B", students: 28, teacher: "Prof. Bilal Ahmed", room: "502", schedule: "Afternoon" },
  ],
  fees: [
    { id: "F001", student: "Omar Farooq", class: "10-B", amount: 15000, due: "2024-01-15", status: "pending", type: "Tuition" },
    { id: "F002", student: "Hamza Sheikh", class: "11-B", amount: 18000, due: "2023-12-15", status: "overdue", type: "Tuition" },
    { id: "F003", student: "Ahmed Hassan", class: "10-A", amount: 15000, due: "2024-02-15", status: "paid", type: "Tuition" },
    { id: "F004", student: "Zara Siddiqui", class: "10-A", amount: 2500, due: "2024-01-20", status: "paid", type: "Lab Fee" },
    { id: "F005", student: "Ayesha Tariq", class: "11-A", amount: 18000, due: "2024-02-15", status: "paid", type: "Tuition" },
  ],
  notifications: [
    { id: 1, type: "info", message: "Annual Examination schedule published for Grade 9-12", time: "2 hours ago", read: false },
    { id: 2, type: "warning", message: "3 students have overdue fee payments this month", time: "5 hours ago", read: false },
    { id: 3, type: "success", message: "Monthly attendance report generated successfully", time: "1 day ago", read: true },
    { id: 4, type: "info", message: "Parent-Teacher meeting scheduled for Feb 15, 2024", time: "2 days ago", read: true },
    { id: 5, type: "warning", message: "Mr. Usman Ali is on leave today — substitute arranged", time: "3 days ago", read: true },
  ],
  attendance: {
    today: [
      { id: 1, rollNo: "1001", name: "Ahmed Hassan", status: "present", time: "07:45 AM" },
      { id: 2, rollNo: "1002", name: "Zara Siddiqui", status: "present", time: "07:50 AM" },
      { id: 3, rollNo: "1003", name: "Omar Farooq", status: "absent", time: "—" },
      { id: 4, rollNo: "1004", name: "Ayesha Tariq", status: "present", time: "07:38 AM" },
      { id: 5, rollNo: "1005", name: "Hamza Sheikh", status: "late", time: "08:22 AM" },
      { id: 6, rollNo: "1006", name: "Maryam Qureshi", status: "present", time: "07:42 AM" },
    ],
  },
  results: [
    { id: 1, student: "Ahmed Hassan", class: "10-A", math: 88, science: 92, english: 79, urdu: 85, history: 82, gpa: 3.8, grade: "A", percentage: 85.2 },
    { id: 2, student: "Zara Siddiqui", class: "10-A", math: 82, science: 78, english: 85, urdu: 88, history: 80, gpa: 3.5, grade: "A-", percentage: 82.6 },
    { id: 3, student: "Omar Farooq", class: "10-B", math: 65, science: 70, english: 68, urdu: 74, history: 72, gpa: 2.9, grade: "B-", percentage: 69.8 },
    { id: 4, student: "Ayesha Tariq", class: "11-A", math: 96, science: 94, english: 90, urdu: 92, history: 89, gpa: 3.9, grade: "A+", percentage: 92.2 },
    { id: 5, student: "Maryam Qureshi", class: "12-A", math: 99, science: 98, english: 96, urdu: 97, history: 95, gpa: 4.0, grade: "A+", percentage: 97.0 },
  ],
  timetable: {
    "10-A": [
      { period: 1, time: "07:30-08:20", mon: "Math", tue: "English", wed: "Science", thu: "Math", fri: "History" },
      { period: 2, time: "08:20-09:10", mon: "Physics", tue: "Urdu", wed: "Math", thu: "Biology", fri: "English" },
      { period: 3, time: "09:10-10:00", mon: "English", tue: "Physics", wed: "History", thu: "Chemistry", fri: "Math" },
      { period: 4, time: "10:20-11:10", mon: "History", tue: "Math", wed: "Physics", thu: "English", fri: "Science" },
      { period: 5, time: "11:10-12:00", mon: "Biology", tue: "Chemistry", wed: "Urdu", thu: "History", fri: "Urdu" },
    ],
  },
};

const initialState = {
  role: null,
  user: null,
  currentView: "dashboard",
  darkMode: false,
  notifications: MOCK_DATA.notifications,
  data: MOCK_DATA,
  sidebarOpen: true,
};

function appReducer(state, action) {
  switch (action.type) {
    case "LOGIN": return { ...state, role: action.role, user: action.user, currentView: "dashboard" };
    case "LOGOUT": return { ...initialState };
    case "SET_VIEW": return { ...state, currentView: action.view };
    case "TOGGLE_DARK": return { ...state, darkMode: !state.darkMode };
    case "TOGGLE_SIDEBAR": return { ...state, sidebarOpen: !state.sidebarOpen };
    case "MARK_NOTIFICATIONS_READ": return { ...state, notifications: state.notifications.map(n => ({ ...n, read: true })) };
    case "UPDATE_ATTENDANCE": return { ...state, data: { ...state.data, attendance: { ...state.data.attendance, today: action.payload } } };
    default: return state;
  }
}

// ─── Utility Components ───────────────────────────────────────────────────────
const Badge = ({ children, color = "info", size = "sm" }) => {
  const colorMap = {
    success: { bg: "#dcfce7", text: "#15803d", border: "#86efac" },
    warning: { bg: "#fef3c7", text: "#b45309", border: "#fcd34d" },
    danger: { bg: "#fee2e2", text: "#b91c1c", border: "#fca5a5" },
    info: { bg: "#dbeafe", text: "#1d4ed8", border: "#93c5fd" },
    primary: { bg: "#e0f2fe", text: "#0369a1", border: "#7dd3fc" },
    gray: { bg: "#f1f5f9", text: "#475569", border: "#cbd5e1" },
    overdue: { bg: "#fff1f2", text: "#9f1239", border: "#fda4af" },
  };
  const c = colorMap[color] || colorMap.info;
  const pad = size === "xs" ? "2px 8px" : "3px 10px";
  const fs = size === "xs" ? "10px" : "11px";
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, borderRadius: "20px", padding: pad, fontSize: fs, fontWeight: 600, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
};

const Avatar = ({ name, size = 36, color = COLORS.primaryLight }) => {
  const initials = name?.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() || "?";
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: size * 0.35, fontWeight: 600, flexShrink: 0, fontFamily: "Georgia, serif" }}>
      {initials}
    </div>
  );
};

const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", ...style }}>
    {children}
  </div>
);

const StatCard = ({ label, value, icon, color, change, onClick }) => (
  <Card style={{ cursor: onClick ? "pointer" : "default", transition: "box-shadow 0.2s", userSelect: "none" }} onClick={onClick}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{label}</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.textPrimary, lineHeight: 1 }}>{value}</div>
        {change && <div style={{ fontSize: 12, color: change > 0 ? COLORS.success : COLORS.danger, marginTop: 6, fontWeight: 500 }}>{change > 0 ? "▲" : "▼"} {Math.abs(change)}% vs last month</div>}
      </div>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
        {icon}
      </div>
    </div>
  </Card>
);

const SectionHeader = ({ title, subtitle, action }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
    <div>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: COLORS.textPrimary, fontFamily: "Georgia, serif" }}>{title}</h2>
      {subtitle && <p style={{ margin: "4px 0 0", fontSize: 13, color: COLORS.textSecondary }}>{subtitle}</p>}
    </div>
    {action}
  </div>
);

const Button = ({ children, variant = "primary", size = "md", onClick, style = {}, disabled = false }) => {
  const variants = {
    primary: { background: COLORS.primaryLight, color: "#fff", border: "none" },
    secondary: { background: "#fff", color: COLORS.textPrimary, border: `1px solid ${COLORS.border}` },
    success: { background: COLORS.success, color: "#fff", border: "none" },
    danger: { background: COLORS.danger, color: "#fff", border: "none" },
    ghost: { background: "transparent", color: COLORS.primaryLight, border: "none" },
  };
  const sizes = { sm: { padding: "5px 12px", fontSize: 12 }, md: { padding: "8px 18px", fontSize: 13 }, lg: { padding: "10px 24px", fontSize: 14 } };
  return (
    <button disabled={disabled} onClick={onClick} style={{ ...variants[variant], ...sizes[size], borderRadius: 8, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1, transition: "all 0.15s", fontFamily: "inherit", letterSpacing: "0.01em", ...style }}>
      {children}
    </button>
  );
};

const Input = ({ placeholder, value, onChange, icon, style = {} }) => (
  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
    {icon && <span style={{ position: "absolute", left: 10, fontSize: 14, color: COLORS.textMuted }}>{icon}</span>}
    <input placeholder={placeholder} value={value} onChange={onChange} style={{ width: "100%", padding: icon ? "8px 12px 8px 32px" : "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 13, color: COLORS.textPrimary, outline: "none", boxSizing: "border-box", fontFamily: "inherit", ...style }} />
  </div>
);

const Table = ({ headers, rows, renderRow }) => (
  <div style={{ overflowX: "auto", borderRadius: 10, border: `1px solid ${COLORS.border}` }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: COLORS.surface }}>
          {headers.map((h, i) => (
            <th key={i} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: COLORS.textSecondary, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${COLORS.border}`, whiteSpace: "nowrap" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}`, transition: "background 0.1s" }} onMouseEnter={e => e.currentTarget.style.background = COLORS.surface} onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
            {renderRow(row, i)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ dispatch }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const roles = [
    { key: "admin", label: "Administrator", icon: "🏛️", color: "#1a3a5c", desc: "Full system access" },
    { key: "teacher", label: "Teacher", icon: "👩‍🏫", color: "#1d4ed8", desc: "Class & student management" },
    { key: "student", label: "Student", icon: "🎓", color: "#16a34a", desc: "Academic portal" },
    { key: "parent", label: "Parent", icon: "👨‍👩‍👧", color: "#7c3aed", desc: "Child monitoring" },
  ];

  const mockCredentials = {
    admin: { email: "admin@school.edu", password: "admin123", name: "Dr. Khalid Mahmood", title: "Principal" },
    teacher: { email: "teacher@school.edu", password: "teacher123", name: "Dr. Aisha Khan", title: "Mathematics Teacher", class: "10-A" },
    student: { email: "student@school.edu", password: "student123", name: "Ahmed Hassan", rollNo: "1001", class: "10-A" },
    parent: { email: "parent@school.edu", password: "parent123", name: "Hassan Ali", childName: "Ahmed Hassan", childClass: "10-A" },
  };

  const handleLogin = () => {
    if (!selectedRole) { setError("Please select a role."); return; }
    const creds = mockCredentials[selectedRole];
    if (email === creds.email && password === creds.password) {
      dispatch({ type: "LOGIN", role: selectedRole, user: creds });
    } else {
      setError("Invalid credentials. Use the demo credentials shown below.");
    }
  };

  const demoLogin = (role) => {
    const creds = mockCredentials[role];
    dispatch({ type: "LOGIN", role, user: creds });
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #0f172a 0%, #1a3a5c 50%, #0369a1 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Palatino Linotype', Georgia, serif" }}>
      <div style={{ width: "100%", maxWidth: 520 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 72, height: 72, background: "rgba(255,255,255,0.15)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 16px", border: "2px solid rgba(255,255,255,0.3)" }}>🏫</div>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.02em" }}>Noor Academy</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, margin: 0, fontFamily: "system-ui, sans-serif" }}>School Management Portal</p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: 20, padding: 36, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
          <h2 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 700, color: COLORS.textPrimary }}>Select your role</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {roles.map(r => (
              <button key={r.key} onClick={() => { setSelectedRole(r.key); setEmail(mockCredentials[r.key].email); setPassword(mockCredentials[r.key].password); setError(""); }} style={{ padding: "12px 10px", borderRadius: 10, border: `2px solid ${selectedRole === r.key ? r.color : COLORS.border}`, background: selectedRole === r.key ? `${r.color}10` : "#fff", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{r.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.label}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "system-ui" }}>{r.desc}</div>
              </button>
            ))}
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 6, fontFamily: "system-ui" }}>EMAIL ADDRESS</label>
            <Input placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} icon="✉" style={{ width: "100%", fontSize: 14 }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 6, fontFamily: "system-ui" }}>PASSWORD</label>
            <Input placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} icon="🔒" style={{ width: "100%", fontSize: 14 }} />
          </div>

          {error && <div style={{ background: "#fee2e2", color: "#b91c1c", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 16, fontFamily: "system-ui" }}>{error}</div>}

          <Button onClick={handleLogin} style={{ width: "100%", padding: "12px", fontSize: 15, borderRadius: 10, marginBottom: 16 }}>Sign In →</Button>

          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 16 }}>
            <p style={{ fontSize: 11, color: COLORS.textMuted, textAlign: "center", marginBottom: 10, fontFamily: "system-ui" }}>QUICK DEMO ACCESS</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {roles.map(r => (
                <button key={r.key} onClick={() => demoLogin(r.key)} style={{ flex: 1, minWidth: 90, padding: "6px 8px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.surface, fontSize: 11, cursor: "pointer", color: COLORS.textSecondary, fontFamily: "system-ui" }}>
                  {r.icon} {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ role, currentView, dispatch, user, sidebarOpen }) {
  const menus = {
    admin: [
      { key: "dashboard", icon: "📊", label: "Dashboard" },
      { key: "students", icon: "🎓", label: "Students" },
      { key: "teachers", icon: "👩‍🏫", label: "Teachers" },
      { key: "classes", icon: "🏫", label: "Classes" },
      { key: "attendance", icon: "📋", label: "Attendance" },
      { key: "results", icon: "📈", label: "Results" },
      { key: "fees", icon: "💳", label: "Fee Management" },
      { key: "timetable", icon: "📅", label: "Timetable" },
      { key: "notifications", icon: "🔔", label: "Notifications" },
      { key: "reports", icon: "📄", label: "Reports" },
    ],
    teacher: [
      { key: "dashboard", icon: "📊", label: "Dashboard" },
      { key: "attendance", icon: "📋", label: "Mark Attendance" },
      { key: "students", icon: "🎓", label: "My Students" },
      { key: "results", icon: "📈", label: "Enter Marks" },
      { key: "assignments", icon: "📝", label: "Assignments" },
      { key: "timetable", icon: "📅", label: "My Timetable" },
      { key: "notifications", icon: "🔔", label: "Notifications" },
    ],
    student: [
      { key: "dashboard", icon: "📊", label: "Dashboard" },
      { key: "attendance", icon: "📋", label: "My Attendance" },
      { key: "results", icon: "📈", label: "My Results" },
      { key: "assignments", icon: "📝", label: "Assignments" },
      { key: "fees", icon: "💳", label: "Fee Status" },
      { key: "timetable", icon: "📅", label: "Timetable" },
      { key: "notifications", icon: "🔔", label: "Notifications" },
    ],
    parent: [
      { key: "dashboard", icon: "📊", label: "Dashboard" },
      { key: "attendance", icon: "📋", label: "Attendance" },
      { key: "results", icon: "📈", label: "Results" },
      { key: "fees", icon: "💳", label: "Fee Records" },
      { key: "notifications", icon: "🔔", label: "Notifications" },
    ],
  };

  const items = menus[role] || [];
  const roleColors = { admin: "#1a3a5c", teacher: "#1d4ed8", student: "#16a34a", parent: "#7c3aed" };

  if (!sidebarOpen) {
    return (
      <div style={{ width: 64, background: "#0f172a", display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0", gap: 8, flexShrink: 0 }}>
        <div style={{ fontSize: 28, marginBottom: 16 }}>🏫</div>
        {items.map(item => (
          <button key={item.key} onClick={() => dispatch({ type: "SET_VIEW", view: item.key })} title={item.label} style={{ width: 44, height: 44, borderRadius: 10, background: currentView === item.key ? "rgba(255,255,255,0.2)" : "transparent", border: "none", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {item.icon}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div style={{ width: 240, background: "#0f172a", display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden" }}>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 28 }}>🏫</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "Georgia, serif" }}>Noor Academy</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "system-ui" }}>Management Portal</div>
          </div>
        </div>
      </div>

      {/* Role badge */}
      <div style={{ padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ background: `${roleColors[role]}40`, border: `1px solid ${roleColors[role]}80`, borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar name={user?.name} size={32} color={roleColors[role]} />
          <div>
            <div style={{ color: "#fff", fontSize: 12, fontWeight: 600, fontFamily: "system-ui" }}>{user?.name?.split(" ").slice(0, 2).join(" ")}</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, textTransform: "capitalize", fontFamily: "system-ui" }}>{role}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "12px 12px", overflowY: "auto" }}>
        {items.map(item => (
          <button key={item.key} onClick={() => dispatch({ type: "SET_VIEW", view: item.key })} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "none", background: currentView === item.key ? "rgba(255,255,255,0.12)" : "transparent", color: currentView === item.key ? "#fff" : "rgba(255,255,255,0.55)", cursor: "pointer", fontSize: 13, fontWeight: currentView === item.key ? 600 : 400, transition: "all 0.15s", marginBottom: 2, textAlign: "left", fontFamily: "system-ui" }}>
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
            {item.key === "notifications" && <span style={{ marginLeft: "auto", background: COLORS.danger, color: "#fff", borderRadius: 10, fontSize: 10, padding: "1px 6px", fontWeight: 700 }}>3</span>}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: "12px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button onClick={() => dispatch({ type: "LOGOUT" })} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "none", background: "transparent", color: "rgba(255,255,255,0.45)", cursor: "pointer", fontSize: 13, fontFamily: "system-ui" }}>
          <span>🚪</span> Sign Out
        </button>
      </div>
    </div>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────
function TopBar({ dispatch, user, role, currentView, sidebarOpen, unreadCount }) {
  const viewLabels = { dashboard: "Dashboard", students: "Students", teachers: "Teachers", classes: "Classes", attendance: "Attendance", results: "Results & Marks", fees: "Fee Management", timetable: "Timetable", notifications: "Notifications", reports: "Reports", assignments: "Assignments" };
  const roleColors = { admin: "#1a3a5c", teacher: "#1d4ed8", student: "#16a34a", parent: "#7c3aed" };

  return (
    <div style={{ height: 60, background: "#fff", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", padding: "0 20px", gap: 16, flexShrink: 0 }}>
      <button onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", padding: 4, borderRadius: 6, color: COLORS.textSecondary }}>
        {sidebarOpen ? "☰" : "▶"}
      </button>
      <div style={{ flex: 1 }}>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: COLORS.textPrimary, fontFamily: "Georgia, serif" }}>{viewLabels[currentView] || currentView}</h1>
        <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "system-ui" }}>
          {new Date().toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>
      <button onClick={() => dispatch({ type: "SET_VIEW", view: "notifications" })} style={{ position: "relative", background: COLORS.surfaceAlt, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 18 }}>
        🔔
        {unreadCount > 0 && <span style={{ position: "absolute", top: -4, right: -4, background: COLORS.danger, color: "#fff", borderRadius: 10, fontSize: 9, padding: "2px 5px", fontWeight: 700, fontFamily: "system-ui" }}>{unreadCount}</span>}
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", background: COLORS.surfaceAlt, borderRadius: 8, border: `1px solid ${COLORS.border}` }}>
        <Avatar name={user?.name} size={28} color={roleColors[role]} />
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textPrimary, fontFamily: "system-ui" }}>{user?.name?.split(" ").slice(0, 2).join(" ")}</div>
          <div style={{ fontSize: 10, color: COLORS.textMuted, textTransform: "capitalize", fontFamily: "system-ui" }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard Views ──────────────────────────────────────────────────────────
function AdminDashboard({ data, dispatch }) {
  const { stats, attendanceData, feeData, performanceData, gradeDistribution } = data;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        <StatCard label="Total Students" value={stats.totalStudents.toLocaleString()} icon="🎓" color={COLORS.primaryLight} change={3.2} onClick={() => dispatch({ type: "SET_VIEW", view: "students" })} />
        <StatCard label="Total Teachers" value={stats.totalTeachers} icon="👩‍🏫" color={COLORS.info} change={1.1} onClick={() => dispatch({ type: "SET_VIEW", view: "teachers" })} />
        <StatCard label="Total Classes" value={stats.totalClasses} icon="🏫" color={COLORS.success} onClick={() => dispatch({ type: "SET_VIEW", view: "classes" })} />
        <StatCard label="Attendance Rate" value={`${stats.attendanceRate}%`} icon="📋" color={COLORS.warning} change={-0.8} onClick={() => dispatch({ type: "SET_VIEW", view: "attendance" })} />
        <StatCard label="Fee Collected" value={`₨${(stats.feeCollection / 1000000).toFixed(2)}M`} icon="💰" color={COLORS.success} change={5.4} onClick={() => dispatch({ type: "SET_VIEW", view: "fees" })} />
        <StatCard label="Pending Fees" value={`₨${(stats.pendingFees / 1000).toFixed(0)}K`} icon="⚠️" color={COLORS.danger} change={-2.1} onClick={() => dispatch({ type: "SET_VIEW", view: "fees" })} />
        <StatCard label="Active Users" value={stats.activeUsers} icon="👥" color={COLORS.accent} />
        <StatCard label="Average GPA" value={stats.avgGPA} icon="⭐" color={COLORS.info} change={0.2} />
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <Card>
          <SectionHeader title="Monthly Attendance" subtitle="Present vs Absent (percentage)" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient id="gPresent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[80, 100]} />
              <Tooltip formatter={(v) => [`${v}%`]} />
              <Area type="monotone" dataKey="present" stroke="#16a34a" fill="url(#gPresent)" strokeWidth={2} name="Present %" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHeader title="Grade Distribution" subtitle="Current semester" />
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {gradeDistribution.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
            {gradeDistribution.map((g, i) => (
              <span key={g.name} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: COLORS.textSecondary }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: CHART_COLORS[i % CHART_COLORS.length] }}></span>
                {g.name} {g.value}%
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Fee & Performance */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <SectionHeader title="Fee Collection" subtitle="Monthly collected vs pending (₨)" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={feeData} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${v / 1000}K`} />
              <Tooltip formatter={v => `₨${v.toLocaleString()}`} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="collected" fill="#16a34a" name="Collected" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="#fbbf24" name="Pending" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHeader title="Subject Performance" subtitle="Average marks by subject" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={performanceData} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 100]} />
              <YAxis type="category" dataKey="subject" tick={{ fontSize: 11 }} width={56} />
              <Tooltip />
              <Bar dataKey="avg" fill={COLORS.primaryLight} name="Avg Score" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function TeacherDashboard({ data, user, dispatch }) {
  const myStudents = data.students.filter(s => s.class === user?.class);
  const presentToday = data.attendance.today.filter(s => s.status === "present").length;
  const absentToday = data.attendance.today.filter(s => s.status === "absent").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        <StatCard label="My Class" value={user?.class || "10-A"} icon="🏫" color={COLORS.primaryLight} />
        <StatCard label="Total Students" value={data.attendance.today.length} icon="🎓" color={COLORS.info} />
        <StatCard label="Present Today" value={presentToday} icon="✅" color={COLORS.success} change={2} />
        <StatCard label="Absent Today" value={absentToday} icon="❌" color={COLORS.danger} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <Card>
          <SectionHeader title="Today's Attendance" subtitle={user?.class} action={<Button size="sm" onClick={() => dispatch({ type: "SET_VIEW", view: "attendance" })}>Mark Attendance →</Button>} />
          <Table
            headers={["Roll No", "Student", "Status", "Time"]}
            rows={data.attendance.today}
            renderRow={(row) => [
              <td key="roll" style={{ padding: "10px 16px", color: COLORS.textMuted }}>{row.rollNo}</td>,
              <td key="name" style={{ padding: "10px 16px", fontWeight: 500 }}>{row.name}</td>,
              <td key="status" style={{ padding: "10px 16px" }}><Badge color={row.status === "present" ? "success" : row.status === "absent" ? "danger" : "warning"}>{row.status}</Badge></td>,
              <td key="time" style={{ padding: "10px 16px", color: COLORS.textMuted }}>{row.time}</td>,
            ]}
          />
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <SectionHeader title="Quick Actions" />
            {[
              { icon: "📋", label: "Mark Attendance", view: "attendance" },
              { icon: "📈", label: "Enter Exam Marks", view: "results" },
              { icon: "📝", label: "Upload Assignment", view: "assignments" },
              { icon: "📅", label: "View Timetable", view: "timetable" },
            ].map(a => (
              <button key={a.view} onClick={() => dispatch({ type: "SET_VIEW", view: a.view })} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 0", background: "none", border: "none", borderBottom: `1px solid ${COLORS.border}`, cursor: "pointer", fontSize: 13, color: COLORS.textPrimary, fontFamily: "system-ui" }}>
                <span style={{ fontSize: 18 }}>{a.icon}</span> {a.label} <span style={{ marginLeft: "auto", color: COLORS.textMuted }}>→</span>
              </button>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

function StudentDashboard({ data, user, dispatch }) {
  const myResult = data.results.find(r => r.student === user?.name) || data.results[0];
  const myAttendance = data.attendance.today.find(a => a.rollNo === user?.rollNo);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Profile Banner */}
      <Card style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Avatar name={user?.name} size={56} color="rgba(255,255,255,0.3)" />
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, fontFamily: "Georgia, serif" }}>{user?.name}</h2>
            <p style={{ margin: "4px 0 0", opacity: 0.8, fontSize: 13, fontFamily: "system-ui" }}>Roll No: {user?.rollNo} · Class: {user?.class}</p>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "Georgia, serif" }}>{myResult?.gpa}</div>
            <div style={{ fontSize: 11, opacity: 0.7, fontFamily: "system-ui" }}>Current GPA</div>
          </div>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        <StatCard label="GPA" value={myResult?.gpa || "N/A"} icon="⭐" color={COLORS.success} />
        <StatCard label="Grade" value={myResult?.grade || "N/A"} icon="📊" color={COLORS.info} />
        <StatCard label="Percentage" value={`${myResult?.percentage || 0}%`} icon="📈" color={COLORS.primaryLight} />
        <StatCard label="Today's Status" value={myAttendance?.status || "Present"} icon="📋" color={COLORS.warning} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <SectionHeader title="Subject Marks" subtitle="Current semester" action={<Button size="sm" onClick={() => dispatch({ type: "SET_VIEW", view: "results" })}>View All →</Button>} />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              { subject: "Math", marks: myResult?.math || 0 },
              { subject: "Science", marks: myResult?.science || 0 },
              { subject: "English", marks: myResult?.english || 0 },
              { subject: "Urdu", marks: myResult?.urdu || 0 },
              { subject: "History", marks: myResult?.history || 0 },
            ]} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="marks" fill={COLORS.primaryLight} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHeader title="Upcoming" />
          {[
            { icon: "📝", title: "Math Assignment Due", date: "Feb 12", type: "assignment" },
            { icon: "📋", title: "Physics Lab Report", date: "Feb 14", type: "assignment" },
            { icon: "📘", title: "Mid-Term Examinations", date: "Feb 20-28", type: "exam" },
            { icon: "🏛️", title: "Parent-Teacher Meeting", date: "Feb 15", type: "event" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 3 ? `1px solid ${COLORS.border}` : "none" }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>{item.date}</div>
              </div>
              <Badge color={item.type === "exam" ? "danger" : item.type === "assignment" ? "warning" : "info"} size="xs">{item.type}</Badge>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function ParentDashboard({ data, user, dispatch }) {
  const childResult = data.results[0];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card style={{ background: `linear-gradient(135deg, #4c1d95, #6d28d9)`, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 44 }}>👨‍👩‍👧</span>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, fontFamily: "Georgia, serif" }}>Welcome, {user?.name}</h2>
            <p style={{ margin: "4px 0 0", opacity: 0.8, fontSize: 13, fontFamily: "system-ui" }}>
              Monitoring: {user?.childName} · {user?.childClass}
            </p>
          </div>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        <StatCard label="Child's GPA" value={childResult?.gpa} icon="⭐" color={COLORS.success} />
        <StatCard label="Attendance" value="96%" icon="📋" color={COLORS.info} />
        <StatCard label="Fee Status" value="Paid" icon="💳" color={COLORS.success} />
        <StatCard label="Grade" value={childResult?.grade} icon="📊" color={COLORS.primaryLight} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <SectionHeader title="Academic Progress" action={<Button size="sm" onClick={() => dispatch({ type: "SET_VIEW", view: "results" })}>Full Report →</Button>} />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              { subject: "Math", marks: childResult?.math || 0 },
              { subject: "Science", marks: childResult?.science || 0 },
              { subject: "English", marks: childResult?.english || 0 },
              { subject: "Urdu", marks: childResult?.urdu || 0 },
              { subject: "History", marks: childResult?.history || 0 },
            ]} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="marks" fill="#6d28d9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHeader title="Recent Activity" />
          {[
            { msg: "Math assignment submitted", time: "Today", icon: "📝" },
            { msg: "Attendance marked — Present", time: "Today", icon: "✅" },
            { msg: "Physics test: 88/100", time: "Yesterday", icon: "📊" },
            { msg: "Fee receipt generated", time: "Jan 20", icon: "💳" },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: i < 3 ? `1px solid ${COLORS.border}` : "none", alignItems: "center" }}>
              <span style={{ fontSize: 18 }}>{a.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13 }}>{a.msg}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>{a.time}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── Module Views ─────────────────────────────────────────────────────────────
function StudentsView({ data, role }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortKey, setSortKey] = useState("name");

  const filtered = data.students
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.includes(search))
    .filter(s => filter === "all" || s.feeStatus === filter)
    .sort((a, b) => a[sortKey] > b[sortKey] ? 1 : -1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <Input placeholder="🔍  Search students..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: COLORS.textPrimary }}>
          <option value="all">All Fee Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>
        <select value={sortKey} onChange={e => setSortKey(e.target.value)} style={{ padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: COLORS.textPrimary }}>
          <option value="name">Sort: Name</option>
          <option value="gpa">Sort: GPA</option>
          <option value="attendance">Sort: Attendance</option>
          <option value="class">Sort: Class</option>
        </select>
        {role === "admin" && <Button size="md">+ Add Student</Button>}
      </div>

      <Card style={{ padding: 0 }}>
        <Table
          headers={["Roll No", "Student", "Class", "GPA", "Attendance", "Fee Status", "Actions"]}
          rows={filtered}
          renderRow={(s) => [
            <td key="roll" style={{ padding: "12px 16px", color: COLORS.textMuted, fontFamily: "monospace" }}>{s.rollNo}</td>,
            <td key="name" style={{ padding: "12px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={s.name} size={30} color={s.gender === "Female" ? "#7c3aed" : COLORS.primaryLight} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>{s.parentName}</div>
                </div>
              </div>
            </td>,
            <td key="class" style={{ padding: "12px 16px" }}><Badge color="info">{s.class}</Badge></td>,
            <td key="gpa" style={{ padding: "12px 16px" }}>
              <span style={{ fontWeight: 700, color: s.gpa >= 3.5 ? COLORS.success : s.gpa >= 2.5 ? COLORS.warning : COLORS.danger }}>{s.gpa}</span>
            </td>,
            <td key="att" style={{ padding: "12px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, height: 6, background: COLORS.border, borderRadius: 3, maxWidth: 60 }}>
                  <div style={{ width: `${s.attendance}%`, height: "100%", background: s.attendance >= 90 ? COLORS.success : s.attendance >= 75 ? COLORS.warning : COLORS.danger, borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{s.attendance}%</span>
              </div>
            </td>,
            <td key="fee" style={{ padding: "12px 16px" }}><Badge color={s.feeStatus === "paid" ? "success" : s.feeStatus === "pending" ? "warning" : "danger"}>{s.feeStatus}</Badge></td>,
            <td key="actions" style={{ padding: "12px 16px" }}>
              <div style={{ display: "flex", gap: 6 }}>
                <Button variant="secondary" size="sm">View</Button>
                {role === "admin" && <Button variant="secondary" size="sm">Edit</Button>}
              </div>
            </td>,
          ]}
        />
      </Card>
      <div style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "system-ui" }}>Showing {filtered.length} of {data.students.length} students</div>
    </div>
  );
}

function TeachersView({ data }) {
  const [search, setSearch] = useState("");
  const filtered = data.teachers.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <Input placeholder="🔍  Search teachers..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Button>+ Add Teacher</Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {filtered.map(teacher => (
          <Card key={teacher.id} style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <Avatar name={teacher.name} size={50} color={COLORS.primaryLight} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, fontFamily: "Georgia, serif" }}>{teacher.name}</div>
                <div style={{ fontSize: 12, color: COLORS.textSecondary }}>{teacher.subject}</div>
                <Badge color={teacher.status === "active" ? "success" : "warning"} size="xs">{teacher.status}</Badge>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14, fontSize: 12 }}>
              <div style={{ background: COLORS.surface, padding: "8px 12px", borderRadius: 8 }}>
                <div style={{ color: COLORS.textMuted }}>Experience</div>
                <div style={{ fontWeight: 600 }}>{teacher.experience}</div>
              </div>
              <div style={{ background: COLORS.surface, padding: "8px 12px", borderRadius: 8 }}>
                <div style={{ color: COLORS.textMuted }}>Attendance</div>
                <div style={{ fontWeight: 600, color: teacher.attendance >= 95 ? COLORS.success : COLORS.warning }}>{teacher.attendance}%</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>Classes: {teacher.classes.join(", ")}</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted }}>📧 {teacher.email}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ClassesView({ data }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ margin: 0, color: COLORS.textSecondary, fontFamily: "system-ui", fontSize: 13 }}>{data.classes.length} classes across all grades</p>
        <Button>+ Add Class</Button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {data.classes.map(cls => (
          <Card key={cls.id} style={{ borderLeft: `4px solid ${COLORS.primaryLight}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "Georgia, serif" }}>{cls.name}</div>
                <Badge color="info" size="xs">{cls.schedule}</Badge>
              </div>
              <div style={{ background: COLORS.surfaceAlt, borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.primaryLight }}>{cls.students}</div>
                <div style={{ fontSize: 10, color: COLORS.textMuted }}>Students</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: COLORS.textMuted }}>Class Teacher</span><span style={{ fontWeight: 500 }}>{cls.teacher}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: COLORS.textMuted }}>Room</span><span style={{ fontWeight: 500 }}>{cls.room}</span></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AttendanceView({ data, dispatch, role, user }) {
  const [attendanceState, setAttendanceState] = useState(data.attendance.today);
  const [saved, setSaved] = useState(false);

  const updateStatus = (id, status) => {
    setAttendanceState(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    setSaved(false);
  };

  const handleSave = () => {
    dispatch({ type: "UPDATE_ATTENDANCE", payload: attendanceState });
    setSaved(true);
  };

  const present = attendanceState.filter(s => s.status === "present").length;
  const absent = attendanceState.filter(s => s.status === "absent").length;
  const late = attendanceState.filter(s => s.status === "late").length;

  const canEdit = role === "teacher" || role === "admin";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <StatCard label="Total" value={attendanceState.length} icon="👥" color={COLORS.info} />
        <StatCard label="Present" value={present} icon="✅" color={COLORS.success} />
        <StatCard label="Absent" value={absent} icon="❌" color={COLORS.danger} />
        <StatCard label="Late" value={late} icon="⏰" color={COLORS.warning} />
      </div>

      <Card>
        <SectionHeader
          title={canEdit ? "Mark Attendance" : "Attendance Record"}
          subtitle={`${new Date().toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`}
          action={canEdit && (
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {saved && <span style={{ fontSize: 12, color: COLORS.success, fontFamily: "system-ui" }}>✓ Saved!</span>}
              <Button onClick={handleSave} variant="success">Save Attendance</Button>
            </div>
          )}
        />
        <Table
          headers={["Roll No", "Student Name", "Status", "Time", ...(canEdit ? ["Actions"] : [])]}
          rows={attendanceState}
          renderRow={(row) => [
            <td key="roll" style={{ padding: "12px 16px", color: COLORS.textMuted, fontFamily: "monospace" }}>{row.rollNo}</td>,
            <td key="name" style={{ padding: "12px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={row.name} size={28} />
                <span style={{ fontWeight: 500 }}>{row.name}</span>
              </div>
            </td>,
            <td key="status" style={{ padding: "12px 16px" }}>
              <Badge color={row.status === "present" ? "success" : row.status === "absent" ? "danger" : "warning"}>{row.status}</Badge>
            </td>,
            <td key="time" style={{ padding: "12px 16px", color: COLORS.textMuted }}>{row.time}</td>,
            ...(canEdit ? [
              <td key="actions" style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {["present", "absent", "late"].map(s => (
                    <button key={s} onClick={() => updateStatus(row.id, s)} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${row.status === s ? (s === "present" ? COLORS.success : s === "absent" ? COLORS.danger : COLORS.warning) : COLORS.border}`, background: row.status === s ? (s === "present" ? "#dcfce7" : s === "absent" ? "#fee2e2" : "#fef3c7") : "#fff", cursor: "pointer", fontSize: 11, fontWeight: 600, color: row.status === s ? (s === "present" ? COLORS.success : s === "absent" ? COLORS.danger : COLORS.warning) : COLORS.textMuted, textTransform: "capitalize", fontFamily: "system-ui" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </td>
            ] : []),
          ]}
        />
      </Card>

      {/* Monthly Chart */}
      <Card>
        <SectionHeader title="Monthly Attendance Trend" />
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data.attendanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} domain={[80, 100]} />
            <Tooltip formatter={v => `${v}%`} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="present" stroke={COLORS.success} strokeWidth={2} dot={{ r: 4 }} name="Present %" />
            <Line type="monotone" dataKey="absent" stroke={COLORS.danger} strokeWidth={2} dot={{ r: 4 }} name="Absent %" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function ResultsView({ data, role }) {
  const [editMode, setEditMode] = useState(false);
  const [marks, setMarks] = useState(data.results);

  const updateMark = (id, subject, value) => {
    setMarks(prev => prev.map(r => r.id === id ? { ...r, [subject]: parseInt(value) || 0 } : r));
  };

  const subjects = ["math", "science", "english", "urdu", "history"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
        {(role === "teacher" || role === "admin") && (
          <Button variant={editMode ? "success" : "secondary"} onClick={() => setEditMode(!editMode)}>
            {editMode ? "✓ Save Marks" : "✎ Enter Marks"}
          </Button>
        )}
        <Button variant="secondary">⬇ Download PDF</Button>
      </div>

      <Card style={{ padding: 0 }}>
        <div style={{ overflowX: "auto", borderRadius: 10 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: COLORS.primary }}>
                <th style={{ padding: "12px 16px", textAlign: "left", color: "#fff", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>Student</th>
                <th style={{ padding: "12px 16px", textAlign: "left", color: "#fff", fontSize: 11, textTransform: "uppercase" }}>Class</th>
                {subjects.map(s => <th key={s} style={{ padding: "12px 16px", color: "#fff", fontSize: 11, textTransform: "capitalize", letterSpacing: "0.06em" }}>{s}</th>)}
                <th style={{ padding: "12px 16px", color: "#fff", fontSize: 11 }}>%</th>
                <th style={{ padding: "12px 16px", color: "#fff", fontSize: 11 }}>GPA</th>
                <th style={{ padding: "12px 16px", color: "#fff", fontSize: 11 }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: `1px solid ${COLORS.border}`, background: i % 2 === 0 ? "#fff" : COLORS.surface }}>
                  <td style={{ padding: "10px 16px", fontWeight: 600 }}>{r.student}</td>
                  <td style={{ padding: "10px 16px" }}><Badge color="info">{r.class}</Badge></td>
                  {subjects.map(s => (
                    <td key={s} style={{ padding: "10px 16px", textAlign: "center" }}>
                      {editMode ? (
                        <input type="number" min={0} max={100} value={r[s]} onChange={e => updateMark(r.id, s, e.target.value)} style={{ width: 52, padding: "4px 6px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 12, textAlign: "center", fontFamily: "inherit" }} />
                      ) : (
                        <span style={{ fontWeight: 500, color: r[s] >= 80 ? COLORS.success : r[s] >= 60 ? COLORS.warning : COLORS.danger }}>{r[s]}</span>
                      )}
                    </td>
                  ))}
                  <td style={{ padding: "10px 16px", textAlign: "center", fontWeight: 700 }}>{r.percentage}%</td>
                  <td style={{ padding: "10px 16px", textAlign: "center", fontWeight: 700, color: COLORS.primaryLight }}>{r.gpa}</td>
                  <td style={{ padding: "10px 16px", textAlign: "center" }}>
                    <Badge color={r.grade.startsWith("A") ? "success" : r.grade.startsWith("B") ? "info" : r.grade.startsWith("C") ? "warning" : "danger"}>{r.grade}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Performance Analytics" />
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data.performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="avg" fill={COLORS.primaryLight} name="Class Average" radius={[4, 4, 0, 0]} barSize={24} />
            <Bar dataKey="pass" fill={COLORS.success} name="Pass Rate %" radius={[4, 4, 0, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function FeesView({ data, role }) {
  const [tab, setTab] = useState("records");

  const feeStats = {
    collected: data.feeData.reduce((a, f) => a + f.collected, 0),
    pending: data.feeData.reduce((a, f) => a + f.pending, 0),
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        <StatCard label="Total Collected" value={`₨${(feeStats.collected / 1000000).toFixed(2)}M`} icon="💰" color={COLORS.success} />
        <StatCard label="Total Pending" value={`₨${(feeStats.pending / 1000).toFixed(0)}K`} icon="⏳" color={COLORS.warning} />
        <StatCard label="Overdue" value="₨68K" icon="⚠️" color={COLORS.danger} />
        <StatCard label="Collection Rate" value="89.3%" icon="📊" color={COLORS.info} />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, borderBottom: `2px solid ${COLORS.border}` }}>
        {["records", "payment", "analytics"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 20px", background: "none", border: "none", borderBottom: `3px solid ${tab === t ? COLORS.primaryLight : "transparent"}`, cursor: "pointer", fontSize: 13, fontWeight: 600, color: tab === t ? COLORS.primaryLight : COLORS.textSecondary, textTransform: "capitalize", fontFamily: "inherit", marginBottom: -2 }}>
            {t === "records" ? "📋 Fee Records" : t === "payment" ? "💳 Online Payment" : "📊 Analytics"}
          </button>
        ))}
      </div>

      {tab === "records" && (
        <Card style={{ padding: 0 }}>
          <Table
            headers={["Fee ID", "Student", "Class", "Type", "Amount", "Due Date", "Status", "Actions"]}
            rows={data.fees}
            renderRow={(f) => [
              <td key="id" style={{ padding: "12px 16px", color: COLORS.textMuted, fontFamily: "monospace" }}>{f.id}</td>,
              <td key="student" style={{ padding: "12px 16px", fontWeight: 600 }}>{f.student}</td>,
              <td key="class" style={{ padding: "12px 16px" }}><Badge color="info">{f.class}</Badge></td>,
              <td key="type" style={{ padding: "12px 16px", color: COLORS.textSecondary }}>{f.type}</td>,
              <td key="amount" style={{ padding: "12px 16px", fontWeight: 700 }}>₨{f.amount.toLocaleString()}</td>,
              <td key="due" style={{ padding: "12px 16px", color: COLORS.textMuted }}>{f.due}</td>,
              <td key="status" style={{ padding: "12px 16px" }}><Badge color={f.status === "paid" ? "success" : f.status === "pending" ? "warning" : "danger"}>{f.status}</Badge></td>,
              <td key="actions" style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {f.status !== "paid" && <Button size="sm" variant="success">Pay Now</Button>}
                  <Button size="sm" variant="secondary">Receipt</Button>
                </div>
              </td>,
            ]}
          />
        </Card>
      )}

      {tab === "payment" && (
        <Card>
          <SectionHeader title="Online Payment Gateway" subtitle="Secure payment processing" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 6, fontFamily: "system-ui" }}>SELECT FEE</label>
                <select style={{ width: "100%", padding: "9px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 13, fontFamily: "inherit" }}>
                  <option>Tuition Fee — Grade 10-B — ₨15,000</option>
                  <option>Lab Fee — Grade 10-A — ₨2,500</option>
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 6, fontFamily: "system-ui" }}>PAYMENT METHOD</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {["💳 Debit/Credit Card", "📱 JazzCash", "💚 EasyPaisa", "🏦 Bank Transfer"].map(m => (
                    <button key={m} style={{ padding: "12px", border: `1px solid ${COLORS.border}`, borderRadius: 8, background: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 500, fontFamily: "system-ui" }}>{m}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 6, fontFamily: "system-ui" }}>CARD NUMBER</label>
                <Input placeholder="1234  5678  9012  3456" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
                <div><label style={{ display: "block", fontSize: 11, color: COLORS.textMuted, marginBottom: 4 }}>EXPIRY</label><Input placeholder="MM/YY" /></div>
                <div><label style={{ display: "block", fontSize: 11, color: COLORS.textMuted, marginBottom: 4 }}>CVV</label><Input placeholder="123" /></div>
                <div><label style={{ display: "block", fontSize: 11, color: COLORS.textMuted, marginBottom: 4 }}>ZIP</label><Input placeholder="12345" /></div>
              </div>
              <Button style={{ width: "100%", padding: 12, fontSize: 15 }}>Pay ₨15,000 Securely 🔒</Button>
              <p style={{ fontSize: 11, color: COLORS.textMuted, textAlign: "center", marginTop: 10, fontFamily: "system-ui" }}>256-bit SSL encrypted · PCI DSS compliant</p>
            </div>
            <div>
              <div style={{ background: COLORS.surface, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}` }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>Payment Summary</h3>
                {[["Student", "Omar Farooq"], ["Class", "Grade 10-B"], ["Fee Type", "Tuition Fee"], ["Due Date", "Jan 15, 2024"], ["Status", "Pending"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: 13 }}>
                    <span style={{ color: COLORS.textMuted }}>{k}</span>
                    <span style={{ fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", fontSize: 16, fontWeight: 700 }}>
                  <span>Total</span>
                  <span style={{ color: COLORS.primaryLight }}>₨15,000</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {tab === "analytics" && (
        <Card>
          <SectionHeader title="Fee Collection Analytics" />
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.feeData}>
              <defs>
                <linearGradient id="gFee" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={v => `₨${v / 1000}K`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => `₨${v.toLocaleString()}`} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="collected" stroke="#16a34a" fill="url(#gFee)" strokeWidth={2} name="Collected" />
              <Line type="monotone" dataKey="pending" stroke={COLORS.warning} strokeWidth={2} name="Pending" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
}

function TimetableView({ data }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const tt = data.timetable["10-A"];

  const subjectColors = { Math: "#dbeafe", Science: "#dcfce7", English: "#fef3c7", Physics: "#fce7f3", Biology: "#e0f2fe", Chemistry: "#f0fdf4", History: "#fdf4ff", Urdu: "#fff7ed" };

  return (
    <Card>
      <SectionHeader title="Class Timetable — Grade 10-A" subtitle="Academic Year 2023-24" action={<Button variant="secondary" size="sm">⬇ Download</Button>} />
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: COLORS.primary }}>
              <th style={{ padding: "12px 16px", color: "#fff", textAlign: "left", whiteSpace: "nowrap" }}>Period</th>
              <th style={{ padding: "12px 16px", color: "rgba(255,255,255,0.7)", textAlign: "left", whiteSpace: "nowrap" }}>Time</th>
              {days.map(d => <th key={d} style={{ padding: "12px 16px", color: "#fff", textAlign: "center" }}>{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {tt.map((row, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                <td style={{ padding: "12px 16px", fontWeight: 700, color: COLORS.textSecondary }}>P{row.period}</td>
                <td style={{ padding: "12px 16px", color: COLORS.textMuted, whiteSpace: "nowrap", fontFamily: "monospace", fontSize: 11 }}>{row.time}</td>
                {[row.mon, row.tue, row.wed, row.thu, row.fri].map((sub, j) => (
                  <td key={j} style={{ padding: "10px 12px", textAlign: "center" }}>
                    <span style={{ display: "inline-block", background: subjectColors[sub] || COLORS.surface, padding: "5px 14px", borderRadius: 20, fontWeight: 600, fontSize: 12, color: COLORS.textPrimary }}>{sub}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {Object.entries(subjectColors).slice(0, 7).map(([sub, color]) => (
          <span key={sub} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: COLORS.textSecondary }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: color, border: `1px solid ${COLORS.border}` }}></span>
            {sub}
          </span>
        ))}
      </div>
    </Card>
  );
}

function NotificationsView({ notifications, dispatch }) {
  const typeIcons = { info: "ℹ️", warning: "⚠️", success: "✅", danger: "🚨" };
  const typeColors = { info: "info", warning: "warning", success: "success", danger: "danger" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ margin: 0, color: COLORS.textSecondary, fontSize: 13, fontFamily: "system-ui" }}>{notifications.filter(n => !n.read).length} unread notifications</p>
        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="secondary" size="sm" onClick={() => dispatch({ type: "MARK_NOTIFICATIONS_READ" })}>Mark all read</Button>
          {/* Admin only: send announcement */}
          <Button size="sm">+ Send Announcement</Button>
        </div>
      </div>

      {notifications.map(n => (
        <div key={n.id} style={{ display: "flex", gap: 14, padding: "16px 20px", background: n.read ? "#fff" : `${COLORS.accent}08`, border: `1px solid ${n.read ? COLORS.border : COLORS.accent}40`, borderRadius: 10, borderLeft: `4px solid ${n.read ? COLORS.border : COLORS.accent}` }}>
          <span style={{ fontSize: 22, flexShrink: 0 }}>{typeIcons[n.type] || "📢"}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: COLORS.textPrimary, marginBottom: 4, fontWeight: n.read ? 400 : 600 }}>{n.message}</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "system-ui" }}>{n.time}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Badge color={typeColors[n.type] || "info"} size="xs">{n.type}</Badge>
            {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.accent }} />}
          </div>
        </div>
      ))}
    </div>
  );
}

function AssignmentsView({ role }) {
  const assignments = [
    { id: 1, title: "Algebra Problem Set — Chapter 7", subject: "Mathematics", class: "10-A", due: "Feb 12, 2024", submissions: 28, total: 40, status: "active" },
    { id: 2, title: "Lab Report: Titration Experiment", subject: "Chemistry", class: "11-B", due: "Feb 14, 2024", submissions: 15, total: 33, status: "active" },
    { id: 3, title: "Essay: Causes of WWI", subject: "History", class: "10-B", due: "Feb 08, 2024", submissions: 37, total: 37, status: "completed" },
    { id: 4, title: "Comprehension Passage Review", subject: "English", class: "9-A", due: "Feb 18, 2024", submissions: 0, total: 38, status: "upcoming" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {(role === "teacher" || role === "admin") && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button>+ Upload Assignment</Button>
        </div>
      )}
      <div style={{ display: "grid", gap: 16 }}>
        {assignments.map(a => (
          <Card key={a.id} style={{ borderLeft: `4px solid ${a.status === "active" ? COLORS.primaryLight : a.status === "completed" ? COLORS.success : COLORS.warning}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, fontFamily: "Georgia, serif" }}>{a.title}</h3>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <Badge color="info">{a.subject}</Badge>
                  <Badge color="gray">{a.class}</Badge>
                  <Badge color={a.status === "active" ? "primary" : a.status === "completed" ? "success" : "warning"}>{a.status}</Badge>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "system-ui" }}>Due: {a.due}</div>
                {a.status !== "upcoming" && (
                  <div style={{ fontSize: 13, fontWeight: 700, color: a.submissions === a.total ? COLORS.success : COLORS.warning, marginTop: 4 }}>
                    {a.submissions}/{a.total} submitted
                  </div>
                )}
              </div>
            </div>
            {a.status !== "upcoming" && (
              <div style={{ marginTop: 12 }}>
                <div style={{ height: 6, background: COLORS.border, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${(a.submissions / a.total) * 100}%`, height: "100%", background: a.submissions === a.total ? COLORS.success : COLORS.primaryLight, borderRadius: 3, transition: "width 0.3s" }} />
                </div>
              </div>
            )}
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <Button variant="secondary" size="sm">View Details</Button>
              {role !== "admin" && role !== "teacher" && <Button size="sm">Submit</Button>}
              {(role === "teacher" || role === "admin") && <Button variant="secondary" size="sm">View Submissions</Button>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ReportsView() {
  const reports = [
    { title: "Monthly Attendance Report", type: "Attendance", date: "Jan 2024", icon: "📋", size: "245 KB" },
    { title: "Semester Result Card — Grade 10", type: "Results", date: "Jan 2024", icon: "📊", size: "1.2 MB" },
    { title: "Fee Collection Report — Jan 2024", type: "Finance", date: "Jan 2024", icon: "💰", size: "189 KB" },
    { title: "Annual Academic Performance Report", type: "Academic", date: "Dec 2023", icon: "📈", size: "2.4 MB" },
    { title: "Staff Attendance Summary", type: "HR", date: "Jan 2024", icon: "👩‍🏫", size: "156 KB" },
    { title: "Examination Schedule 2024", type: "Exams", date: "Feb 2024", icon: "📅", size: "320 KB" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <Button variant="secondary">⬇ Export Excel</Button>
        <Button>⬇ Export PDF</Button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {reports.map((r, i) => (
          <Card key={i} style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 48, height: 48, background: COLORS.surfaceAlt, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, fontFamily: "Georgia, serif" }}>{r.title}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Badge color="info" size="xs">{r.type}</Badge>
                  <span style={{ fontSize: 11, color: COLORS.textMuted }}>{r.date}</span>
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 6 }}>{r.size}</div>
              </div>
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
              <Button variant="secondary" size="sm" style={{ flex: 1 }}>Preview</Button>
              <Button size="sm" style={{ flex: 1 }}>⬇ Download</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function SchoolPortal() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { role, user, currentView, data, notifications, sidebarOpen } = state;

  if (!role) return <LoginScreen dispatch={dispatch} />;

  const unreadCount = notifications.filter(n => !n.read).length;

  const renderView = () => {
    // Role-appropriate dashboard
    if (currentView === "dashboard") {
      if (role === "admin") return <AdminDashboard data={data} dispatch={dispatch} />;
      if (role === "teacher") return <TeacherDashboard data={data} user={user} dispatch={dispatch} />;
      if (role === "student") return <StudentDashboard data={data} user={user} dispatch={dispatch} />;
      if (role === "parent") return <ParentDashboard data={data} user={user} dispatch={dispatch} />;
    }
    if (currentView === "students") return <StudentsView data={data} role={role} />;
    if (currentView === "teachers") return <TeachersView data={data} />;
    if (currentView === "classes") return <ClassesView data={data} />;
    if (currentView === "attendance") return <AttendanceView data={data} dispatch={dispatch} role={role} user={user} />;
    if (currentView === "results") return <ResultsView data={data} role={role} />;
    if (currentView === "fees") return <FeesView data={data} role={role} />;
    if (currentView === "timetable") return <TimetableView data={data} />;
    if (currentView === "notifications") return <NotificationsView notifications={notifications} dispatch={dispatch} />;
    if (currentView === "assignments") return <AssignmentsView role={role} />;
    if (currentView === "reports") return <ReportsView />;
    return <div style={{ padding: 40, textAlign: "center", color: COLORS.textMuted }}>View coming soon…</div>;
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div style={{ display: "flex", height: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", background: COLORS.surfaceAlt, overflow: "hidden" }}>
        <Sidebar role={role} currentView={currentView} dispatch={dispatch} user={user} sidebarOpen={sidebarOpen} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          <TopBar dispatch={dispatch} user={user} role={role} currentView={currentView} sidebarOpen={sidebarOpen} unreadCount={unreadCount} />
          <main style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
            {renderView()}
          </main>
        </div>
      </div>
    </AppContext.Provider>
  );
}
