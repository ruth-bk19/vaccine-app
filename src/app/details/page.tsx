"use client";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { auth, db } from "../firebaseConfig";
import "./details.css";

interface Vaccine {
  label: string;
  value: string;
  type: string;
  age_group: string;
  protection_against: string;
  doses: string;
}

interface VaccineFormData {
  vaccineName: Vaccine | null;
  vaccineType: string;
  fullName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  preferredDate: string;
  reminderDate: string;
  healthConditions?: string;
  notes?: string;
}

const VaccineForm: React.FC = () => {
  const [formData, setFormData] = useState<VaccineFormData>({
    vaccineName: null,
    vaccineType: "",
    fullName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    preferredDate: "",
    reminderDate: "",
    healthConditions: "",
    notes: "",
  });

  const [vaccineOptions, setVaccineOptions] = useState<Vaccine[]>([]);
  const router = useRouter();

  // Fetch vaccine options from Firestore
  const fetchVaccineOptions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Vaccines"));
      const options = querySnapshot.docs.map((doc) => ({
        label: doc.data().name,
        value: doc.data().name,
        type: doc.data().type,
        age_group: doc.data().age_group,
        protection_against: doc.data().protection_Against,
        doses: doc.data().doses,
      }));
      setVaccineOptions(options);
    } catch (error) {
      console.error("Error fetching vaccine data: ", error);
    }
  };

  useEffect(() => {
    fetchVaccineOptions();
  }, []);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle vaccine selection change
  const handleVaccineChange = (option: any) => {
    if (option) {
      setFormData({
        ...formData,
        vaccineName: option,
        vaccineType: option.type,
      });
    } else {
      setFormData({
        ...formData,
        vaccineName: null,
        vaccineType: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.vaccineName ||
      !formData.fullName ||
      !formData.dateOfBirth ||
      !formData.email ||
      !formData.phone ||
      !formData.preferredDate ||
      !formData.reminderDate
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      // Add the form data to Firestore
      const docRef = await addDoc(collection(db, "VaccineReminders"), {
        vaccineName: formData.vaccineName.label,
        vaccineType: formData.vaccineType,
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        email: formData.email,
        phone: formData.phone,
        preferredDate: formData.preferredDate,
        reminderDate: formData.reminderDate,
        healthConditions: formData.healthConditions || "",
        notes: formData.notes || "",
        userId: auth.currentUser?.uid,
      });

      console.log("Document written with ID: ", docRef.id);

      // Send email notification using the Next.js API route
      const emailData = {
        to_email: "ruthbishwokarma194@gmail.com", // Use the user's email from the form
        to_name: formData.fullName,
        message: `Your vaccine reminder for ${formData.vaccineName.label} has been scheduled for ${formData.preferredDate}.`,
      };

      const response = await fetch("https://4000/pages/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });
      console.log("email Api response", response.status);

      if (!response.ok) {
        throw new Error(`Failed to send email: ${response.statusText}`);
      }

      alert(
        "Vaccine details submitted and confirmation email sent successfully!"
      );

      // Reset form data
      setFormData({
        vaccineName: null,
        vaccineType: "",
        fullName: "",
        dateOfBirth: "",
        email: "",
        phone: "",
        preferredDate: "",
        reminderDate: "",
        healthConditions: "",
        notes: "",
      });

      // Redirect to dashboard after all async operations are complete
      router.push("/dash");
    } catch (error) {
      console.error("Error adding document or sending email: ", error);
      console.log("error", error);
      alert("Failed to submit vaccine details or send email.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Vaccine Reminder Form</h2>

      <label>
        Vaccine Name:
        <Select
          options={vaccineOptions}
          value={formData.vaccineName}
          onChange={handleVaccineChange}
          placeholder="Select a vaccine..."
          isSearchable={true}
          required
        />
      </label>

      <label>
        Vaccine Type:
        <input
          type="text"
          name="vaccineType"
          value={formData.vaccineType}
          onChange={handleChange}
          required
          readOnly // This field is auto-populated based on the selected vaccine
        />
      </label>

      <label>
        Full Name:
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Date of Birth:
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Phone:
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Preferred Vaccination Date:
        <input
          type="date"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Reminder Date:
        <input
          type="date"
          name="reminderDate"
          value={formData.reminderDate}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Health Conditions (Optional):
        <input
          type="text"
          name="healthConditions"
          value={formData.healthConditions}
          onChange={handleChange}
        />
      </label>

      <label>
        Notes (Optional):
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default VaccineForm;
