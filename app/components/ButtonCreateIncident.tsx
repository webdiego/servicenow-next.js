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

type FormState = {
  short_description: string;
  description: string;
  impact: string;
  urgency: string;
  priority: string;
  category: string;
  subcategory: string;
};

export default function ButtonCreateIncident() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    short_description: "",
    description: "",
    impact: "3",
    urgency: "3",
    priority: "4",
    category: "inquiry",
    subcategory: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (loading) return;
    setError(null);

    if (!form.short_description.trim()) {
      setError("Short description is required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText || "Request failed");
      }

      const created = await res.json();
      const number = created?.number ?? created?.result?.number ?? "—";
      alert(`Incident created with number: ${number}`);
      setForm({
        short_description: "",
        description: "",
        impact: "3",
        urgency: "3",
        priority: "4",
        category: "inquiry",
        subcategory: "",
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
      setError(
        (err as Error).message || "Error creating incident, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label className="mb-2" htmlFor="short_description">
              Short description
            </Label>
            <Input
              id="short_description"
              name="short_description"
              value={form.short_description}
              onChange={handleChange}
              placeholder="Short description"
              required
              disabled={loading}
            />
          </div>

          <div>
            <Label className="mb-2" htmlFor="description">
              Description
            </Label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full rounded border p-2 min-h-[90px] resize-vertical"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="mb-2" htmlFor="impact">
                Impact
              </Label>
              <Input
                id="impact"
                name="impact"
                value={form.impact}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="urgency">
                Urgency
              </Label>
              <Input
                id="urgency"
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="priority">
                Priority
              </Label>
              <Input
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="mb-2" htmlFor="category">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="subcategory">
                Subcategory
              </Label>
              <Input
                id="subcategory"
                name="subcategory"
                value={form.subcategory}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <DialogFooter className="flex items-center justify-end space-x-2">
            <DialogClose asChild>
              <Button
                variant="secondary"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Close
              </Button>
            </DialogClose>

            <Button type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating incident..." : "Create incident"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
