"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/app/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Incident = {
  number: string;
  state: string;
  short_description: string;
  opened_at: string;
  priority: string;
  impact: string;
  urgency: string;
  sys_id: string;
};
// {

//     made_sla: 'true',
//     caused_by: '',
//     watch_list: '',
//     upon_reject: 'cancel',
//     sys_updated_on: '2018-12-13 07:28:49',
//     child_incidents: '0',

//     number: 'INC0007002',
//     resolved_by: '',
//     sys_updated_by: 'admin',
//     opened_by: {
//       link: 'https://dev313524.service-now.com/api/now/table/sys_user/6816f79cc0a8016401c5a33be04be441',
//       value: '6816f79cc0a8016401c5a33be04be441'
//     },
//     user_input: '',
//     sys_created_on: '2018-10-17 05:48:24',
//     sys_domain: {
//       link: 'https://dev313524.service-now.com/api/now/table/sys_user_group/global',
//       value: 'global'
//     },
//     state: '1',
//     route_reason: '',
//     sys_created_by: 'admin',
//     knowledge: 'false',
//     order: '',
//     calendar_stc: '',
//     closed_at: '',
//     cmdb_ci: '',
//     delivery_plan: '',
//     contract: '',
//     impact: '3',
//     active: 'true',
//     work_notes_list: '',
//     business_service: '',
//     business_impact: '',
//     priority: '4',
//     sys_domain_path: '/',
//     rfc: '',
//     time_worked: '',
//     expected_start: '',
//     opened_at: '2018-10-17 05:47:51',
//     business_duration: '',
//     group_list: '',
//     work_end: '',
//     caller_id: {
//       link: 'https://dev313524.service-now.com/api/now/table/sys_user/77ad8176731313005754660c4cf6a7de',
//       value: '77ad8176731313005754660c4cf6a7de'
//     },
//     reopened_time: '',
//     resolved_at: '',
//     approval_set: '',
//     subcategory: '',
//     work_notes: '',
//     universal_request: '',
//     short_description: 'Need access to the common drive.',
//     u_urgenza: '',
//     close_code: '',
//     correlation_display: '',
//     delivery_task: '',
//     work_start: '',
//     assignment_group: '',
//     additional_assignee_list: '',
//     business_stc: '',
//     cause: '',
//     description: 'Need access to the common drive for sharing files which can be accessed by all members. Please provide access.',
//     origin_id: '',
//     calendar_duration: '',
//     close_notes: '',
//     notify: '1',
//     service_offering: '',
//     sys_class_name: 'incident',
//     closed_by: '',
//     follow_up: '',
//     parent_incident: {
//       link: 'https://dev313524.service-now.com/api/now/table/incident/f12ca184735123002728660c4cf6a7ef',
//       value: 'f12ca184735123002728660c4cf6a7ef'
//     },
//     sys_id: 'ff4c21c4735123002728660c4cf6a758',
//     contact_type: '',
//     reopened_by: '',
//     incident_state: '1',
//     urgency: '2',
//     problem_id: '',
//     company: '',
//     reassignment_count: '0',
//     activity_due: '',
//     assigned_to: '',
//     u_script_test: '',
//     severity: '3',
//     comments: '',
//     approval: 'not requested',
//     sla_due: '',
//     comments_and_work_notes: '',
//     due_date: '',
//     sys_mod_count: '4',
//     reopen_count: '0',
//     sys_tags: '',
//     u_definizione_urgenza: '',
//     escalation: '0',
//     upon_approval: 'proceed',
//     correlation_id: '',
//     location: '',
//     category: 'inquiry'
//   }

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "-";
  const iso = dateString.replace(" ", "T");
  const date = new Date(iso);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("it-IT");
};

// custom sorting function
import { Row } from "@tanstack/react-table";

const dateSorting = (
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

export const columns: ColumnDef<Incident>[] = [
  {
    accessorKey: "number",
    header: "Number",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "short_description",
    header: "Short Description",
  },
  {
    accessorKey: "opened_at",
    enableSorting: true,
    sortingFn: dateSorting,
    header: ({ column }) => {
      const sorted = column.getIsSorted(); // "asc" | "desc" | false
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sorted === "asc")}
        >
          Opened At
          {sorted === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="max-w-xs truncate" title={row.original.opened_at}>
        {formatDate(row.original.opened_at)}
      </div>
    ),
  },
  {
    accessorKey: "priority",
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const a: string = rowA.getValue("priority");
      const b: string = rowB.getValue("priority");
      return a.localeCompare(b);
    },
    header: ({ column }) => {
      const sortedPriority = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sortedPriority === "asc")}
        >
          Priority
          {sortedPriority === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "impact",
    header: "Impact",
  },
  {
    accessorKey: "urgency",
    header: "Urgency",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  { accessorKey: "subcategory", header: "Subcategory" },
];
