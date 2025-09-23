import { Incident } from "./types/incident";
import NavBar from "./components/NavBar";
import { DataTable } from "./components/incidents-table/data-table";
import { columns } from "./components/incidents-table/columns";
import CreateIncident from "./components/CreateIncident";
import { StateChart } from "./components/charts/stateChart";
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

  const incidentState = incidents
    .map((incident) => incident.state)
    .filter((state) => state !== undefined && state !== null);
  return (
    <>
      <NavBar />

      <div className="container mx-auto  auto p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Incidents</h1>
            <p className="mb-4">List of incidents fetched from ServiceNow</p>
          </div>
          <CreateIncident />
        </div>
        <DataTable columns={columns} data={incidents} />
        <StateChart data={incidentState} />
      </div>
    </>
  );
}
