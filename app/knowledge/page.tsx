import parse from "html-react-parser";
import { Knowledge } from "@/app/types/knowledge";

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
import { Card, CardContent } from "@/app/components/ui/card";
import Link from "next/link";
import { Button } from "../components/ui/button";

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
          <div className="text-sm text-gray-500">
            Total Knowledge Articles: {knowledge.length}
          </div>
        )}
        {knowledge.length === 0 && (
          <div className="text-sm text-gray-500">
            No Knowledge Articles found.
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-4">
          {knowledge.length > 0 &&
            knowledge.map((item) => (
              <Card key={item.sys_id}>
                <CardContent>
                  <div>
                    <h2 className="text-sm font-medium">
                      {parse(item.short_description)}
                    </h2>

                    <div className="text-xs text-gray-600 mt-2">
                      <strong>Category:</strong> {item.topic}
                    </div>

                    <Link href={`/knowledge/${item.sys_id}`}>
                      <Button className="mt-4" variant="outline">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
