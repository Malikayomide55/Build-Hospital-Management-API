
import { useEffect, useState } from "react";
import {
  Activity,
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarDays,
  FileText,
  Pill,
  LogOut,
  Menu,
  X,
  Plus,
  RefreshCw,
  Trash2,
  Edit3,
} from "lucide-react";
import { api } from "./api";
import "./App.css";

const sections = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "patients", label: "Patients", icon: Users },
  { key: "doctors", label: "Doctors", icon: Stethoscope },
  { key: "appointments", label: "Appointments", icon: CalendarDays },
  { key: "medical-records", label: "Medical Records", icon: FileText },
  { key: "prescriptions", label: "Prescriptions", icon: Pill },
];

const fields = {
  patients: [
    ["firstName", "First name", "text", true],
    ["lastName", "Last name", "text", true],
    ["dateOfBirth", "Date of birth", "date"],
    ["gender", "Gender", "select"],
    ["phone", "Phone", "tel"],
    ["email", "Email", "email"],
    ["address", "Address", "text"],
    ["bloodGroup", "Blood group", "select"],
    ["emergencyContact", "Emergency contact", "text"],
    ["notes", "Notes", "text"],
  ],
  doctors: [
    ["name", "Full name", "text", true],
    ["email", "Email", "email", true],
    ["phone", "Phone", "tel"],
    ["specialty", "Specialty", "text", true],
    ["licenseNumber", "License number", "text"],
    ["availability", "Availability", "select"],
  ],
  appointments: [
    ["patient", "Patient ID", "text", true],
    ["doctor", "Doctor ID", "text", true],
    ["appointmentDate", "Date and time", "datetime-local", true],
    ["reason", "Reason", "text"],
    ["status", "Status", "select"],
    ["notes", "Notes", "text"],
  ],
  "medical-records": [
    ["patient", "Patient ID", "text", true],
    ["doctor", "Doctor ID", "text"],
    ["visitDate", "Visit date", "date"],
    ["diagnosis", "Diagnosis", "text", true],
    ["treatment", "Treatment", "text"],
    ["notes", "Notes", "text"],
  ],
  prescriptions: [
    ["patient", "Patient ID", "text", true],
    ["doctor", "Doctor ID", "text"],
    ["medication", "Medication", "text", true],
    ["dosage", "Dosage", "text", true],
    ["frequency", "Frequency", "text", true],
    ["duration", "Duration", "text"],
    ["instructions", "Instructions", "text"],
    ["status", "Status", "select"],
  ],
};

const choices = {
  gender: ["Female", "Male", "Other", "Prefer not to say"],
  bloodGroup: ["Unknown", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  availability: ["Available", "Unavailable", "On Leave"],
  status: [
    "Scheduled",
    "Confirmed",
    "Completed",
    "Cancelled",
    "No Show",
    "Active",
  ],
};

function Auth({ onLogin }) {
  const [register, setRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);

    try {
      const result = await api(
        `/auth/${register ? "register" : "login"}`,
        {
          method: "POST",
          body: JSON.stringify(
            register
              ? form
              : { email: form.email, password: form.password }
          ),
        }
      );

      const token = result.token || result.data?.token;
      const user = result.user || result.data?.user;

      if (!token || !user) {
        throw new Error(
          "Login response must contain a token and user. Check authController.js."
        );
      }

      sessionStorage.setItem("hospitalToken", token);
      sessionStorage.setItem("hospitalUser", JSON.stringify(user));
      onLogin(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-page">
      <aside className="auth-side">
        <div className="brand">
          <span className="brand-mark"><Activity /></span>
          <span>MARVTECH<small>HOSPITAL MANAGEMENT</small></span>
        </div>

        <div className="auth-promo">
          <span className="eyebrow">SMART HEALTHCARE MANAGEMENT</span>
          <h1>Better care.<br />Better management.</h1>
          <p>
            One workspace for patients, doctors, appointments and clinical
            records.
          </p>
          <div className="promo-point">
            <Users />
            <span>
              <b>Patient management</b>
              <small>Organise patient information.</small>
            </span>
          </div>
          <div className="promo-point">
            <CalendarDays />
            <span>
              <b>Appointment tracking</b>
              <small>Keep hospital activities in one place.</small>
            </span>
          </div>
        </div>

        <small className="copyright">
          &copy; {new Date().getFullYear()} MARVTECH
        </small>
      </aside>

      <main className="auth-main">
        <form className="auth-card" onSubmit={submit}>
          <span className="eyebrow">
            {register ? "CREATE YOUR ACCOUNT" : "WELCOME BACK"}
          </span>
          <h2>{register ? "Create an account" : "Sign in to your account"}</h2>
          <p className="muted">
            {register
              ? "Register to access the hospital workspace."
              : "Sign in to open your hospital dashboard."}
          </p>

          {register && (
            <label>
              Full name
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </label>
          )}

          <label>
            Email address
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label>
            Password
            <input
              required
              type="password"
              minLength={8}
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              placeholder="At least 8 characters"
              autoComplete={register ? "new-password" : "current-password"}
            />
          </label>

          {error && <div className="alert" role="alert">{error}</div>}

          <button className="primary full" disabled={busy}>
            {busy
              ? "Please wait..."
              : register
                ? "Create account"
                : "Sign in to dashboard"}
          </button>

          <p className="switch-auth">
            {register
              ? "Already have an account?"
              : "Don't have an account?"}
            <button
              type="button"
              onClick={() => {
                setRegister(!register);
                setError("");
              }}
            >
              {register ? "Sign in" : "Create account"}
            </button>
          </p>

          <p className="security-note">
            <Activity size={15} /> Hospital Management System
          </p>
        </form>
      </main>
    </div>
  );
}

function DashboardHome({ stats, navigate, refresh, loading }) {
  const cards = [
    ["Total patients", stats?.patients ?? "—", Users],
    ["Total doctors", stats?.doctors ?? "—", Stethoscope],
    ["Appointments", stats?.appointments ?? "—", CalendarDays],
    ["Medical records", stats?.medicalRecords ?? "—", FileText],
  ];

  return (
    <div className="page-content">
      <section className="welcome">
        <div>
          <span className="eyebrow light">HOSPITAL OVERVIEW</span>
          <h2>Your hospital, at a glance.</h2>
          <p>Manage daily operations from one central workspace.</p>
        </div>
        <Activity size={72} />
      </section>

      <div className="section-title">
        <div>
          <h2>Overview</h2>
          <p className="muted">Statistics from your database</p>
        </div>
        <button className="secondary" onClick={refresh} disabled={loading}>
          <RefreshCw size={15} /> {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="stats-grid">
        {cards.map(([label, value, Icon]) => (
          <article className="stat-card" key={label}>
            <span className="stat-icon"><Icon /></span>
            <p>{label}</p>
            <strong>{value}</strong>
          </article>
        ))}
      </div>

      <div className="home-grid">
        <article className="panel">
          <h3>Prescriptions</h3>
          <p className="muted">Total prescriptions in the database</p>
          <strong className="big-number">
            {stats?.prescriptions ?? "—"}
          </strong>
          <button
            className="text-button"
            onClick={() => navigate("prescriptions")}
          >
            View prescriptions →
          </button>
        </article>

        <article className="panel">
          <h3>Registered users</h3>
          <p className="muted">Total user accounts</p>
          <strong className="big-number">{stats?.users ?? "—"}</strong>
        </article>
      </div>

      <p className="footer-note">
        &copy; {new Date().getFullYear()} MARVTECH Hospital Management System
      </p>
    </div>
  );
}

function ResourcePage({ section, user, notify }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const resourceFields = fields[section] || [];

  async function load() {
    setLoading(true);
    setError("");

    try {
      const result = await api(`/${section}`);
      setItems(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [section]);

  async function save(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = { ...form };

      for (const key of ["dateOfBirth", "visitDate", "appointmentDate"]) {
        if (payload[key]) {
          payload[key] = new Date(payload[key]).toISOString();
        } else {
          delete payload[key];
        }
      }

      for (const key of ["patient", "doctor"]) {
        if (!payload[key]) delete payload[key];
      }

      const result = await api(
        `/${section}${editing ? `/${editing}` : ""}`,
        {
          method: editing ? "PUT" : "POST",
          body: JSON.stringify(payload),
        }
      );

      notify(result.message || "Record saved successfully.");
      setShowForm(false);
      setEditing(null);
      setForm({});
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function edit(item) {
    const values = {};

    resourceFields.forEach(([key]) => {
      let value = item[key];

      if (value && typeof value === "object") {
        value = value._id || value.id || "";
      }

      if (value && ["dateOfBirth", "visitDate"].includes(key)) {
        value = new Date(value).toISOString().slice(0, 10);
      }

      if (value && key === "appointmentDate") {
        value = new Date(value).toISOString().slice(0, 16);
      }

      values[key] = value ?? "";
    });

    setForm(values);
    setEditing(item._id);
    setShowForm(true);
    setError("");
  }

  async function remove(item) {
    if (!window.confirm("Are you sure you want to delete this record?")) {
      return;
    }

    try {
      const result = await api(`/${section}/${item._id}`, {
        method: "DELETE",
      });
      notify(result.message || "Record deleted successfully.");
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  function display(item, key) {
    const value = item[key];

    if (value === null || value === undefined || value === "") return "—";

    if (typeof value === "object") {
      return (
        value.name ||
        [value.firstName, value.lastName].filter(Boolean).join(" ") ||
        value._id ||
        "—"
      );
    }

    if (["dateOfBirth", "visitDate", "appointmentDate"].includes(key)) {
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
    }

    return String(value);
  }

  const filteredItems = items.filter((item) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;

    return resourceFields.some(([key]) =>
      display(item, key).toLowerCase().includes(term)
    );
  });

  const canDelete =
    user?.role === "admin" ||
    (user?.role === "receptionist" &&
      ["patients", "appointments"].includes(section)) ||
    (user?.role === "doctor" &&
      ["medical-records", "prescriptions"].includes(section));

  return (
    <div className="page-content">
      <div className="section-title">
        <div>
          <h2>{sections.find((s) => s.key === section)?.label}</h2>
          <p className="muted">Manage hospital records.</p>
        </div>
        <button
          className="primary"
          onClick={() => {
            setEditing(null);
            setForm({});
            setShowForm(true);
            setError("");
          }}
        >
          <Plus size={17} /> Add new
        </button>
      </div>

      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search records..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="secondary" onClick={load} disabled={loading}>
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {error && <div className="alert" role="alert">{error}</div>}

      {showForm && (
        <form className="panel record-form" onSubmit={save}>
          <div className="form-heading">
            <h3>{editing ? "Edit record" : "Create record"}</h3>
            <button
              type="button"
              className="icon-button"
              onClick={() => {
                setShowForm(false);
                setEditing(null);
                setForm({});
              }}
              aria-label="Close form"
            >
              <X />
            </button>
          </div>

          <div className="fields-grid">
            {resourceFields.map(([key, label, type, required]) => (
              <label key={key}>
                {label}
                {type === "select" ? (
                  <select
                    required={required}
                    value={form[key] || ""}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                  >
                    <option value="">Select...</option>
                    {(choices[key] || []).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    required={required}
                    value={form[key] || ""}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    placeholder={
                      ["patient", "doctor"].includes(key)
                        ? "Enter related MongoDB record ID"
                        : ""
                    }
                  />
                )}
              </label>
            ))}
          </div>

          {["appointments", "medical-records", "prescriptions"].includes(
            section
          ) && (
            <p className="muted small">
              Use the MongoDB IDs of the patient and doctor for linked records.
            </p>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button className="primary" disabled={saving}>
              {saving ? "Saving..." : "Save record"}
            </button>
          </div>
        </form>
      )}

      <div className="panel table-panel">
        {loading ? (
          <p className="empty-state">Loading records...</p>
        ) : filteredItems.length === 0 ? (
          <p className="empty-state">
            {search
              ? "No matching records found."
              : "No records found. Select Add new to begin."}
          </p>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  {resourceFields.slice(0, 5).map(([key, label]) => (
                    <th key={key}>{label}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item._id}>
                    {resourceFields.slice(0, 5).map(([key]) => (
                      <td key={key}>{display(item, key)}</td>
                    ))}
                    <td>
                      <div className="row-actions">
                        <button
                          className="icon-button"
                          title="Edit"
                          aria-label="Edit record"
                          onClick={() => edit(item)}
                        >
                          <Edit3 size={16} />
                        </button>
                        {canDelete && (
                          <button
                            className="icon-button danger"
                            title="Delete"
                            aria-label="Delete record"
                            onClick={() => remove(item)}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="footer-note">
        Only enter legitimate records. Keep patient data private.
      </p>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return sessionStorage.getItem("hospitalToken")
        ? JSON.parse(sessionStorage.getItem("hospitalUser") || "null")
        : null;
    } catch {
      return null;
    }
  });

  const [active, setActive] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState("");

  async function loadStats() {
    setStatsLoading(true);

    try {
      const result = await api("/dashboard/stats");
      setStats(result.data);
      setNotice("");
    } catch (err) {
      setNotice(err.message);
    } finally {
      setStatsLoading(false);
    }
  }

  useEffect(() => {
    if (user && active === "dashboard") {
      loadStats();
    }
  }, [user, active]);

  function logout() {
    sessionStorage.removeItem("hospitalToken");
    sessionStorage.removeItem("hospitalUser");
    setUser(null);
    setStats(null);
    setActive("dashboard");
    setNotice("");
  }

  function notify(message) {
    setNotice(message);
  }

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          className="overlay"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <span className="brand-mark"><Activity /></span>
          <span>MARVTECH<small>HOSPITAL MANAGEMENT</small></span>
          <button
            className="close-menu"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>

        <p className="nav-caption">MAIN MENU</p>
        <nav>
          {sections.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`nav-link ${active === key ? "selected" : ""}`}
              onClick={() => {
                setActive(key);
                setSidebarOpen(false);
                setNotice("");
              }}
            >
              <Icon size={19} /> {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-user">
          <span className="avatar">
            {(user.name || user.email || "U")[0].toUpperCase()}
          </span>
          <span className="user-meta">
            <b>{user.name || user.email}</b>
            <small>{user.role || "user"}</small>
          </span>
          <button className="logout" title="Log out" onClick={logout}>
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-title">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu />
            </button>
            <div>
              <small>Hospital Management System</small>
              <h1>{sections.find((s) => s.key === active)?.label}</h1>
            </div>
          </div>
          <span className="role-chip">{user.role || "user"}</span>
        </header>

        {notice && (
          <div className="toast" role="status">
            {notice}
            <button onClick={() => setNotice("")} aria-label="Dismiss notice">
              <X size={15} />
            </button>
          </div>
        )}

        {active === "dashboard" ? (
          <DashboardHome
            stats={stats}
            navigate={setActive}
            refresh={loadStats}
            loading={statsLoading}
          />
        ) : (
          <ResourcePage
            key={active}
            section={active}
            user={user}
            notify={notify}
          />
        )}
      </main>
    </div>
  );
}
