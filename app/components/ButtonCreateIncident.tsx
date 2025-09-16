"use client";
import React from "react";

export default function ButtonCreateIncident() {
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      onClick={async () => {
        try {
          const res = await fetch("/api/incidents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              short_description: "Created from Next.js",
              description: `This incident was created from a Next.js app. ${new Date().toISOString()}`,
              impact: "3",
              urgency: "3",
            }),
          });
          const created = await res.json();
          alert(`Incidente creato con numero: ${created.number}`);
        } catch (err) {
          console.error(err);
          alert("Errore nella creazione dell'incidente");
        }
      }}
    >
      Crea Nuovo Incidente
    </button>
  );
}
