type Incident = {
  number: string;
  opened_at: string;
  sys_id: string;
  active: string;
  impact: string;
  urgency: string;
  priority: string;
  short_description: string;
  description?: string;
};
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
    <div
      className="
        flex flex-wrap gap-4 items-start justify-center"
    >
      <ButtonCreateIncident />
      {incidents
        .sort((a, b) => b.opened_at.localeCompare(a.opened_at))
        .map((item) => (
          <div
            key={item.sys_id}
            className="p-4 border-gray-400 bg-slate-300 rounded  w-full max-w-md text-sm"
          >
            <h2 className="text-xl font-bold mb-2">{item.number}</h2>
            <p>
              <span className="font-semibold">Stato:</span>{" "}
              {item.active === "true" ? "Aperto" : "Chiuso"}
            </p>
            <p>
              <span className="font-semibold">Impatto:</span> {item.impact}
              <span className="font-semibold ml-4">Urgenza:</span>{" "}
              {item.urgency}
              <span className="font-semibold ml-4">Priorità:</span>{" "}
              {item.priority}
            </p>
            <p className="mt-2 font-semibold">
              Descrizione breve: {item.short_description}
            </p>
            <p className="text-gray-700">
              {item.description ?? "Nessuna descrizione"}
            </p>
          </div>
        ))}
    </div>
  );
}
