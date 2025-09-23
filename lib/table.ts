import { Incident } from "@/app/types/incident";
import { Row } from "@tanstack/react-table";

export const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "-";
  const iso = dateString.replace(" ", "T");
  const date = new Date(iso);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("it-IT");
};

export const displayState = (state: string) => {
  let color = "bg-gray-500";
  let text = "Unknown";

  switch (state) {
    case "1":
      color = "bg-green-500 dark:bg-green-600";
      text = "New";
      break;
    case "2":
      color = "bg-blue-500 dark:bg-blue-600";
      text = "In Progress";
      break;
    case "3":
      color = "bg-orange-500 dark:bg-orange-600";
      text = "On Hold";
      break;
    case "6":
      color = "bg-purple-500 dark:bg-purple-600";
      text = "Resolved";
      break;
    case "7":
      color = "bg-gray-700 dark:bg-gray-600";
      text = "Closed";
      break;
    case "8":
      color = "bg-red-500 dark:bg-red-600";
      text = "Canceled";
      break;
    default:
      break;
  }
  return [text, color];
};

export const dateSorting = (
  rowA: Row<Incident>,
  rowB: Row<Incident>,
  columnId: string
) => {
  const a = new Date(rowA.getValue(columnId));
  const b = new Date(rowB.getValue(columnId));

  if (isNaN(a.getTime())) return 1;
  if (isNaN(b.getTime())) return -1;

  return a.getTime() - b.getTime();
};
