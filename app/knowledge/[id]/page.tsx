import React from "react";
import { Knowledge } from "@/app/types/knowledge";

async function getKnowledgeById(id: string): Promise<Knowledge> {
  const res = await fetch(
    `https://dev313524.service-now.com/api/now/table/kb_knowledge/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${process.env.SN_AUTH}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Errore nel recupero degli incidenti");
  }

  const data = await res.json();
  return data.result;
}

import parse from "html-react-parser";

export default async function page({ params }: { params: { id: string } }) {
  let knowledge: Knowledge;
  try {
    knowledge = await getKnowledgeById(params.id);

    console.log(Object.values(knowledge));
  } catch (error) {
    return (
      <div className="text-red-600 font-bold">
        Errore nel caricamento dei dati: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div>{parse(knowledge.text)}</div>
    </div>
  );
}
