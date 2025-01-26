// pages/dashboard.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type VaccineReminder = {
  id: number;
  vaccineName: string;
  date: string;
  doseNumber: number;
};

const After = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });
  const [reminders, setReminders] = useState<VaccineReminder[]>([]);
  const [newReminder, setNewReminder] = useState({
    vaccineName: "",
    date: "",
    doseNumber: 1,
  });

  const handleLogout = () => {
    // Perform logout logic (e.g., clear session/token)
    router.push("/login"); // Redirect to login page
  };

  const handleAddReminder = () => {
    if (newReminder.vaccineName && newReminder.date) {
      const reminder: VaccineReminder = {
        id: reminders.length + 1,
        ...newReminder,
      };
      setReminders([...reminders, reminder]);
      setNewReminder({ vaccineName: "", date: "", doseNumber: 1 });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>

      <h2>Add a Vaccine Reminder</h2>
      <div>
        <input
          type="text"
          placeholder="Vaccine Name"
          value={newReminder.vaccineName}
          onChange={(e) =>
            setNewReminder({ ...newReminder, vaccineName: e.target.value })
          }
        />
        <input
          type="date"
          value={newReminder.date}
          onChange={(e) =>
            setNewReminder({ ...newReminder, date: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Dose Number"
          value={newReminder.doseNumber}
          onChange={(e) =>
            setNewReminder({
              ...newReminder,
              doseNumber: parseInt(e.target.value),
            })
          }
        />
        <button onClick={handleAddReminder}>Add Reminder</button>
      </div>

      <h2>Upcoming Vaccine Reminders</h2>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id}>
            {reminder.vaccineName} - Dose {reminder.doseNumber} on{" "}
            {reminder.date}
          </li>
        ))}
      </ul>

      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
};

export default After;
