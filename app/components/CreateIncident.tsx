"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/app/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useWatch } from "react-hook-form";
import { z } from "zod";

const incidentSchema = z.object({
  short_description: z.string().min(1, "Short description is required"),
  description: z.string().optional().or(z.literal("")),
  impact: z.enum(["1", "2", "3", "4", "5"]),
  urgency: z.enum(["1", "2", "3", "4", "5"]),
  priority: z.enum(["1", "2", "3", "4", "5"]),
  category: z.string().optional().or(z.literal("")),
  subcategory: z.string().optional().or(z.literal("")),
});

type FormState = z.infer<typeof incidentSchema>;

const defaultValues: FormState = {
  short_description: "",
  description: "",
  impact: "3",
  urgency: "3",
  priority: "4",
  category: "hardware",
  subcategory: "cpu",
};
// TODO: fetch these from ServiceNow metadata API

const CATEGORY_OPTIONS: Record<string, string[]> = {
  hardware: ["cpu", "disk", "keyboard", "memory", "monitor", "mouse"],
  software: ["email", "operating system"],
  network: ["dhcp", "dns", "ip address", "vpn", "wireless"],
  database: ["db2", "oracle", "sql server"],
  inquiry: ["antivirus", "email", "internal application"],
};

export default function CreateIncident() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormState>({
    resolver: zodResolver(incidentSchema),
    defaultValues,
  });

  const watchedCategory = useWatch({ control, name: "category" });

  const onSubmit = async (values: FormState) => {
    console.log("Submitting", values);
    if (isSubmitting) return;
    setError(null);

    try {
      const res = await fetch("/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText || "Request failed");
      }

      reset(defaultValues);
      setOpen(false);
      setSuccess("Incident created successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError(
        (err as Error).message || "Error creating incident, please try again."
      );
    }
  };

  const options = ["1", "2", "3", "4", "5"];
  const categoryKeys = Object.keys(CATEGORY_OPTIONS);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create incident</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create new incident</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Fill the form below to create a new incident.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div>
            <Label className="mb-2" htmlFor="short_description">
              Short description
            </Label>
            <Input
              id="short_description"
              {...register("short_description")}
              placeholder="Short description"
              required
              disabled={isSubmitting}
            />
            {errors.short_description && (
              <div className="text-sm text-red-600 mt-1">
                {errors.short_description.message}
              </div>
            )}
          </div>

          <div>
            <Label className="mb-2" htmlFor="description">
              Description
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Description"
              className="min-h-[90px] resize-vertical"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="mb-2" htmlFor="impact">
                Impact
              </Label>
              <Controller
                control={control}
                name="impact"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className="w-full"
                      id="impact"
                      disabled={isSubmitting}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.impact && (
                <div className="text-sm text-red-600 mt-1">
                  {errors.impact.message}
                </div>
              )}
            </div>

            <div>
              <Label className="mb-2" htmlFor="urgency">
                Urgency
              </Label>
              <Controller
                control={control}
                name="urgency"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className="w-full"
                      id="urgency"
                      disabled={isSubmitting}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.urgency && (
                <div className="text-sm text-red-600 mt-1">
                  {errors.urgency.message}
                </div>
              )}
            </div>

            <div>
              <Label className="mb-2" htmlFor="priority">
                Priority
              </Label>
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className="w-full"
                      id="priority"
                      disabled={isSubmitting}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.priority && (
                <div className="text-sm text-red-600 mt-1">
                  {errors.priority.message}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="mb-2" htmlFor="category">
                Category
              </Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val);
                      // reset subcategory when category changes
                      setValue("subcategory", "");
                    }}
                    value={field.value}
                  >
                    <SelectTrigger
                      className="w-full capitalize"
                      id="category"
                      disabled={isSubmitting}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryKeys.map((cat) => (
                        <SelectItem
                          key={cat}
                          value={cat}
                          className="capitalize"
                        >
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label className="mb-2" htmlFor="subcategory">
                Subcategory
              </Label>
              <Controller
                control={control}
                name="subcategory"
                render={({ field }) => {
                  const subOptions =
                    (watchedCategory && CATEGORY_OPTIONS[watchedCategory]) ||
                    [];
                  return (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className="w-full capitalize"
                        id="subcategory"
                        disabled={isSubmitting || subOptions.length === 0}
                      >
                        <SelectValue
                          placeholder={
                            subOptions.length === 0
                              ? "Select category first"
                              : "Select subcategory"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="capitalize">
                        {subOptions.length === 0 ? (
                          <SelectItem value="" disabled>
                            Select category first
                          </SelectItem>
                        ) : (
                          subOptions.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <DialogFooter className="flex items-center justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="secondary" disabled={isSubmitting}>
                Close
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating incident..." : "Create incident"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
