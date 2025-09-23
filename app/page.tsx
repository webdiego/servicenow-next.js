type Incident = {
  number: string;
  state: string;
  short_description: string;
  opened_at: string;
  priority: string;
  impact: string;
  urgency: string;
  sys_id: string;
  active: string;
  description?: string;
  category?: string;
  subcategory?: string;
};
import NavBar from "./components/NavBar";
import { DataTable } from "./components/incidents/data-table";
import { columns } from "./components/incidents/columns";
import ButtonCreateIncident from "./components/ButtonCreateIncident";

async function getIncidents(): Promise<Incident[]> {
  const res = await fetch(
    "https://dev313524.service-now.com/api/now/table/incident",
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
  return data.result as Incident[];
}

export default async function Home() {
  let incidents: Incident[] = [];
  try {
    incidents = await getIncidents();
    console.log(incidents);
  } catch (error) {
    return (
      <div className="text-red-600 font-bold">
        Errore nel caricamento dei dati: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="container mx-auto  auto p-4">
      <NavBar />
      <DataTable columns={columns} data={incidents} />
    </div>
  );
}
