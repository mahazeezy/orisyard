"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/button";
import { ProvisionalBanner } from "@/components/provisional-banner";
import { FLAVOR_OPTIONS } from "@/lib/catalog";
import { SITE } from "@/lib/site";

type FormState = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  size: string;
  flavor: string;
  theme: string;
  colors: string;
  message: string;
  details: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  size: "",
  flavor: "",
  theme: "",
  colors: "",
  message: "",
  details: "",
};

export function CustomCakeFormShell() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [attempted, setAttempted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(next: FormState) {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!next.name.trim()) e.name = "Name is required.";
    if (!next.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email))
      e.email = "Enter a valid email.";
    if (!next.phone.trim()) e.phone = "Phone is required.";
    if (!next.eventDate) e.eventDate = "Event date is required.";
    if (!next.size.trim()) e.size = "Size or servings is required.";
    return e;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setAttempted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    // Intentionally no network submission in this phase — never claim success.
  }

  const fieldClass =
    "w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-rose-deep";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <ProvisionalBanner>
        Custom cake requests are not submitted online yet. This form is a UI
        shell — please call or message OrisYard until ordering is connected.
      </ProvisionalBanner>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cc-name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="cc-name"
            className={fieldClass}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cc-name-error" : undefined}
          />
          {errors.name ? (
            <p id="cc-name-error" className="mt-1 text-sm text-rose-deep">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="cc-email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="cc-email"
            type="email"
            className={fieldClass}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cc-email-error" : undefined}
          />
          {errors.email ? (
            <p id="cc-email-error" className="mt-1 text-sm text-rose-deep">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cc-phone" className="mb-2 block text-sm font-medium">
            Phone
          </label>
          <input
            id="cc-phone"
            type="tel"
            className={fieldClass}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            autoComplete="tel"
            aria-invalid={!!errors.phone}
          />
          {errors.phone ? (
            <p className="mt-1 text-sm text-rose-deep">{errors.phone}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="cc-date" className="mb-2 block text-sm font-medium">
            Event date
          </label>
          <input
            id="cc-date"
            type="date"
            className={fieldClass}
            value={values.eventDate}
            onChange={(e) => update("eventDate", e.target.value)}
            aria-invalid={!!errors.eventDate}
          />
          {errors.eventDate ? (
            <p className="mt-1 text-sm text-rose-deep">{errors.eventDate}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cc-size" className="mb-2 block text-sm font-medium">
            Cake size / servings
          </label>
          <input
            id="cc-size"
            className={fieldClass}
            value={values.size}
            onChange={(e) => update("size", e.target.value)}
            placeholder="e.g. 6in. / serves 12–16"
            aria-invalid={!!errors.size}
          />
          {errors.size ? (
            <p className="mt-1 text-sm text-rose-deep">{errors.size}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="cc-flavor" className="mb-2 block text-sm font-medium">
            Preferred flavor
          </label>
          <select
            id="cc-flavor"
            className={fieldClass}
            value={values.flavor}
            onChange={(e) => update("flavor", e.target.value)}
          >
            <option value="">Select a flavor</option>
            {FLAVOR_OPTIONS.map((f) => (
              <option key={f.id} value={f.name}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cc-theme" className="mb-2 block text-sm font-medium">
            Theme
          </label>
          <input
            id="cc-theme"
            className={fieldClass}
            value={values.theme}
            onChange={(e) => update("theme", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cc-colors" className="mb-2 block text-sm font-medium">
            Colors
          </label>
          <input
            id="cc-colors"
            className={fieldClass}
            value={values.colors}
            onChange={(e) => update("colors", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cc-message" className="mb-2 block text-sm font-medium">
          Cake message
        </label>
        <input
          id="cc-message"
          className={fieldClass}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="cc-photo" className="mb-2 block text-sm font-medium">
          Inspiration photo
        </label>
        <input
          id="cc-photo"
          type="file"
          accept="image/*"
          className={`${fieldClass} file:mr-3 file:rounded-full file:border-0 file:bg-blush file:px-3 file:py-1.5 file:text-sm file:text-rose-deep`}
          disabled
        />
        <p className="mt-2 text-sm text-muted">
          Photo upload will be enabled when custom requests are connected to the
          backend. Files are not uploaded in this phase.
        </p>
      </div>

      <div>
        <label htmlFor="cc-details" className="mb-2 block text-sm font-medium">
          Additional details
        </label>
        <textarea
          id="cc-details"
          rows={5}
          className={fieldClass}
          value={values.details}
          onChange={(e) => update("details", e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full" size="lg">
        Check request details
      </Button>

      <p className="text-sm text-muted">
        This button only validates fields in your browser. It does not send a
        request, create an order, or upload files.
      </p>

      {attempted ? (
        <p
          className="rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-muted"
          role="status"
        >
          {Object.keys(errors).length > 0
            ? "Please fix the highlighted fields. Nothing was sent."
            : "Details look complete locally, but nothing was sent online yet."}{" "}
          Contact{" "}
          <a href={SITE.phone.href} className="text-rose-deep underline">
            {SITE.phone.display}
          </a>{" "}
          or{" "}
          <a href={SITE.email.href} className="text-rose-deep underline">
            {SITE.email.display}
          </a>{" "}
          for custom cakes.
        </p>
      ) : null}
    </form>
  );
}
