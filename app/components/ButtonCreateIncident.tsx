"use client";
import React, { useState } from "react";

export default function ButtonCreateIncident() {
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          short_description: "Created from Next.js",
          description: `This incident was created from a Next.js app. ${new Date().toISOString()}`,
          impact: "3",
          urgency: "3",
          priority: "4",
          category: "inquiry",
          subcategory: "question",
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText || "Request failed");
      }

      const created = await res.json();
      const number = created?.number ?? created?.result?.number ?? "—";
      alert(`Incidente creato con numero: ${number}`);
    } catch (err) {
      console.error(err);
      alert("Errore nella creazione dell'incidente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
      onClick={handleCreate}
      disabled={loading}
      aria-busy={loading}
    >
      {loading ? "Creazione..." : "Crea Nuovo Incidente"}
    </button>
  );
}
