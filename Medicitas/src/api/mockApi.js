const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const genId = () => Math.random().toString(36).slice(2, 9);

const seedDoctors = [
  { id: "doc1", name: "Dra. Ana Torres", specialty: "Medicina General" },
  { id: "doc2", name: "Dr. Luis Pérez", specialty: "Pediatría" },
];

const db = {
  tenants: { "consultorio-a": { name: "Consultorio A" } },
  patients: [],
  doctors: seedDoctors,
  appointments: [],
  notes: [], // {id, appointmentId, doctorId, diagnosis, prescription, createdAt}
};

export const api = {
  token: "demo-token",
  tenantId: "consultorio-a",
  headers() {
    return { Authorization: `Bearer ${this.token}`, "X-Tenant": this.tenantId };
  },

  // RF01
  async patientsCreate(payload) {
    await delay(200);
    if (db.patients.some((p) => p.cedula === payload.cedula)) {
      throw new Error("Ya existe un paciente con esa cédula");
    }
    const rec = { id: genId(), ...payload, createdAt: new Date().toISOString() };
    db.patients.push(rec);
    return rec;
  },
  async patientsList(query = "") {
    await delay(120);
    return db.patients.filter((p) =>
      [p.nombre, p.apellidos, p.cedula].join(" ").toLowerCase().includes(query.toLowerCase())
    );
  },

  // RF02
  async appointmentsCreate(payload) {
    await delay(250);
    const ap = { id: genId(), status: "programada", ...payload };
    db.appointments.push(ap);
    return ap;
  },
  async appointmentsUpdate(id, patch) {
    await delay(180);
    const i = db.appointments.findIndex((a) => a.id === id);
    if (i === -1) throw new Error("Cita no encontrada");
    db.appointments[i] = { ...db.appointments[i], ...patch };
    return db.appointments[i];
  },
  async appointmentsList({ cedula, doctorId } = {}) {
    await delay(120);
    return db.appointments.filter(
      (a) => (cedula ? a.cedula === cedula : true) && (doctorId ? a.doctorId === doctorId : true)
    );
  },

  async doctorsList() {
    await delay(100);
    return db.doctors;
  },

  // RF05
  async notesCreate(payload) {
    await delay(200);
    const n = { id: genId(), createdAt: new Date().toISOString(), ...payload };
    db.notes.push(n);
    return n;
  },
  async notesByCedula(cedula) {
    await delay(120);
    const apps = db.appointments.filter((a) => a.cedula === cedula);
    const ids = new Set(apps.map((a) => a.id));
    return db.notes.filter((n) => ids.has(n.appointmentId));
  },

  // RF04
  notifications: {
    async sendAppointmentMail({ appointmentId, email }) {
      await delay(150);
      return { ok: true, appointmentId, email, message: "Notificación enviada" };
    },
  },

  // Interfaz externa: citas por cédula
  external: {
    async getAppointmentsByCedula(cedula) {
      await delay(150);
      return db.appointments.filter((a) => a.cedula === cedula);
    },
  },
};
