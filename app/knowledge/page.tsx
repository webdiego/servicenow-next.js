import parse from "html-react-parser";
import { Knowledge } from "@/app/types/knowledge";
import Link from "next/link";
import { Button } from "../components/ui/button";

async function getKnowledge(): Promise<Knowledge[]> {
  const res = await fetch(
    "https://dev313524.service-now.com/api/now/table/kb_knowledge",
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

export default async function KnowledgePage() {
  let knowledge: Knowledge[] = [];
  try {
    const result = await getKnowledge();
    knowledge = Object.values(result);

    console.log(Object.values(knowledge));
  } catch (error) {
    return (
      <div className="text-red-600 font-bold">
        Errore nel caricamento dei dati: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="container mx-auto  auto p-4">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Knowledge Articles</h1>
          <p className="mb-4">
            List of knowledge articles fetched from ServiceNow
          </p>
        </div>
        {knowledge.length > 0 && (
          <p className="text-sm text-gray-500 dark:text-slate-300">
            Total Knowledge Articles: {knowledge.length}
          </p>
        )}
        {knowledge.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-slate-300">
            No Knowledge Articles found.
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 w-full mt-4">
          {knowledge.length > 0 &&
            knowledge
              .filter((item) => item.text != "")
              .map((item) => (
                <div
                  key={item.sys_id}
                  className="border p-4 rounded-md shadow bg-[#f9f9f9] dark:bg-[#1f2937]  flex flex-col justify-between"
                >
                  <h2 className="text-sm font-medium">
                    {parse(item.short_description)}
                  </h2>

                  <div>
                    <div className="text-xs text-gray-600 dark:text-slate-300 flex items-center gap-2 mt-1">
                      <p>Category:</p>
                      <p className="bg-[#0A4A6D] px-2 rounded-full text-white">
                        {item.topic}
                      </p>
                    </div>
                    <div className="grid place-items-end">
                      <Link href={`/knowledge/${item.sys_id}`}>
                        <Button
                          size="xs"
                          className="cursor-pointer text-xs"
                          variant="serviceNow"
                        >
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
