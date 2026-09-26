"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CakeShape } from "@/components/cake-shape";
import { Arrow, Heart, Notice, PillButton, PillLink } from "@/components/ui";
import {
  CAKE_ADDONS,
  CAKE_FILLINGS,
  CAKE_FLAVORS,
  CAKE_NOTICES,
  CAKE_SIZES,
  COLOR_PRESETS,
  WRITING_EXAMPLES,
  findOption,
  type PricedOption,
} from "@/lib/cake-builder";
import { ORDERING, formatPrice } from "@/lib/ordering";

type Draft = {
  date: string;
  sizeId: string;
  flavorId: string;
  fillingId: string;
  primaryColor: string;
  secondaryColor: string;
  colorNotes: string;
  addonIds: string[];
  noAddons: boolean;
  writing: string;
  noWriting: boolean;
  designNotes: string;
  name: string;
  phone: string;
  email: string;
  pickupTime: string;
  anythingElse: string;
  agreed: boolean;
};

const EMPTY: Draft = {
  date: "",
  sizeId: "",
  flavorId: "",
  fillingId: "none",
  primaryColor: "",
  secondaryColor: "",
  colorNotes: "",
  addonIds: [],
  noAddons: false,
  writing: "",
  noWriting: false,
  designNotes: "",
  name: "",
  phone: "",
  email: "",
  pickupTime: "",
  anythingElse: "",
  agreed: false,
};

const DRAFT_KEY = "orisyard_cake_draft_v1";
const STEPS = [
  "Date",
  "Size",
  "Flavor",
  "Filling",
  "Colors",
  "Extras",
  "Writing",
  "Inspiration",
  "Your Info",
] as const;
const REVIEW = STEPS.length + 1;

type Photo = { id: string; file: File; url: string };

function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function prettyDate(iso: string) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function surcharge(p: number) {
  return p > 0 ? `+${formatPrice(p)}` : "Included";
}

function validate(step: number, d: Draft, photos: Photo[]): string | null {
  switch (step) {
    case 1:
      if (!d.date) return "Please pick a date.";
      if (d.date < tomorrow()) return "Please pick a future date.";
      return null;
    case 2:
      return d.sizeId ? null : "Please choose a size and shape.";
    case 3:
      return d.flavorId ? null : "Please choose a flavor.";
    case 4:
      return d.fillingId ? null : "Please choose a filling.";
    case 5:
      return d.primaryColor.trim() ? null : "Please choose a primary color.";
    case 6:
      return d.noAddons || d.addonIds.length ? null : "Choose your extras or select “No Add-Ons”.";
    case 7:
      return d.noWriting || d.writing.trim() ? null : "Add your cake writing or check “No Writing”.";
    case 8:
      return photos.length <= ORDERING.maxInspirationPhotos ? null : "Too many photos.";
    case 9:
      if (!d.name.trim()) return "Please enter your first and last name.";
      if (!/^[\d\s()+.-]{7,}$/.test(d.phone.trim())) return "Please enter a valid phone number.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) return "Please enter a valid email.";
      if (!d.agreed) return "Please confirm you’ve read the policies.";
      return null;
    default:
      return null;
  }
}

export function CakeBuilder() {
  const router = useRouter();
  const params = useSearchParams();
  const raw = params.get("step");
  const step = raw === "review" ? REVIEW : Math.min(Math.max(Number(raw) || 1, 1), STEPS.length);

  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Restore / persist the text draft (photos cannot be persisted).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(DRAFT_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setDraft({ ...EMPTY, ...JSON.parse(saved), agreed: false });
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* ignore */
    }
  }, [draft, loaded]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p.url)), [photos]);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setDraft((d) => ({ ...d, [k]: v }));
    setError(null);
  };

  const size = CAKE_SIZES.find((s) => s.id === draft.sizeId);
  const flavor = findOption(CAKE_FLAVORS, draft.flavorId);
  const filling = findOption(CAKE_FILLINGS, draft.fillingId);
  const addons = CAKE_ADDONS.filter((a) => draft.addonIds.includes(a.id));
  const estimate = useMemo(
    () =>
      (size?.startingPrice ?? 0) +
      (flavor?.price ?? 0) +
      (filling?.price ?? 0) +
      addons.reduce((a, o) => a + o.price, 0),
    [size, flavor, filling, addons],
  );

  const go = (n: number) => {
    setError(null);
    router.push(`/custom-cakes?step=${n === REVIEW ? "review" : n}`, { scroll: true });
  };
  const next = () => {
    const e = validate(step, draft, photos);
    if (e) return setError(e);
    go(step + 1);
  };

  const addPhotos = (files: FileList | null) => {
    if (!files) return;
    setPhotoError(null);
    const room = ORDERING.maxInspirationPhotos - photos.length;
    const accepted: Photo[] = [];
    for (const f of Array.from(files).slice(0, Math.max(room, 0))) {
      if (!/^image\/(jpeg|png|webp|heic|heif)$/.test(f.type) && !/\.(heic|heif)$/i.test(f.name)) {
        setPhotoError("Please upload JPG, PNG, WEBP or HEIC images.");
        continue;
      }
      if (f.size > ORDERING.maxPhotoMB * 1024 * 1024) {
        setPhotoError(`Each photo must be under ${ORDERING.maxPhotoMB}MB.`);
        continue;
      }
      accepted.push({ id: `${f.name}-${f.size}-${f.lastModified}`, file: f, url: URL.createObjectURL(f) });
    }
    if (files.length > room) setPhotoError(`You can add up to ${ORDERING.maxInspirationPhotos} photos.`);
    setPhotos((p) => [...p, ...accepted]);
    if (fileRef.current) fileRef.current.value = "";
  };

  const removePhoto = (id: string) =>
    setPhotos((p) => {
      const hit = p.find((x) => x.id === id);
      if (hit) URL.revokeObjectURL(hit.url);
      return p.filter((x) => x.id !== id);
    });

  const isReview = step === REVIEW;

  return (
    <div className="builder">
      <ol className="stepper" aria-label="Cake builder progress">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const state = isReview || n < step ? "done" : n === step ? "current" : "todo";
          return (
            <li key={label} className={`stepper-dot is-${state}`} aria-current={n === step ? "step" : undefined}>
              <span className="stepper-num">{n}</span>
              <span className="stepper-label">{label}</span>
            </li>
          );
        })}
      </ol>

      <div className="builder-card">
        {!isReview ? (
          <p className="builder-count">
            Step {step} of {STEPS.length}
          </p>
        ) : null}

        {step === 1 && (
          <Step title="When Do You Need Your Cake?" eyebrow="Pick Your Date 🗓️" headingRef={headingRef}>
            <label className="field">
              <span className="field-label">Pickup date</span>
              <input
                type="date"
                min={tomorrow()}
                value={draft.date}
                onChange={(e) => set("date", e.target.value)}
                className="input"
              />
            </label>
            <Notice>{CAKE_NOTICES.availability}</Notice>
          </Step>
        )}

        {step === 2 && (
          <Step title="Choose Your Cake" eyebrow="How Big Are We Going? 🎂" headingRef={headingRef}>
            {(["round", "heart"] as const).map((shape) => (
              <fieldset key={shape} className="option-group">
                <legend>{shape === "round" ? "Round" : "Heart"}</legend>
                <div className="option-grid cols-3">
                  {CAKE_SIZES.filter((s) => s.shape === shape).map((s) => (
                    <OptionTile
                      key={s.id}
                      type="radio"
                      name="size"
                      checked={draft.sizeId === s.id}
                      onChange={() => set("sizeId", s.id)}
                      media={<CakeShape shape={s.shape} inches={s.inches} />}
                      label={s.label}
                      meta={`Starting at ${formatPrice(s.startingPrice)}`}
                    />
                  ))}
                </div>
              </fieldset>
            ))}
            <Notice>{CAKE_NOTICES.startingPrices}</Notice>
          </Step>
        )}

        {step === 3 && (
          <Step title="Choose Your Flavor" eyebrow="Pick Your Base 🍰" headingRef={headingRef}>
            <OptionGrid list={CAKE_FLAVORS} name="flavor" value={draft.flavorId} onChange={(id) => set("flavorId", id)} />
          </Step>
        )}

        {step === 4 && (
          <Step title="Choose Your Filling" eyebrow="What’s Inside? 🍓" headingRef={headingRef}>
            <OptionGrid list={CAKE_FILLINGS} name="filling" value={draft.fillingId} onChange={(id) => set("fillingId", id)} />
          </Step>
        )}

        {step === 5 && (
          <Step title="Pick Your Colors" eyebrow="Make It Yours 🎨" headingRef={headingRef}>
            <ColorField label="Primary Color" value={draft.primaryColor} onChange={(v) => set("primaryColor", v)} />
            <ColorField label="Secondary Color" optional value={draft.secondaryColor} onChange={(v) => set("secondaryColor", v)} />
            <label className="field">
              <span className="field-label">Additional Colors or Color Notes</span>
              <textarea
                className="input"
                rows={3}
                value={draft.colorNotes}
                onChange={(e) => set("colorNotes", e.target.value)}
                placeholder="e.g. pastel ombré, gold accents…"
              />
            </label>
          </Step>
        )}

        {step === 6 && (
          <Step title="Add Some Extras" eyebrow="The Finishing Touches ✨" headingRef={headingRef}>
            <div className="option-grid cols-3">
              <OptionTile
                type="checkbox"
                name="addons"
                checked={draft.noAddons}
                onChange={() => {
                  setDraft((d) => ({ ...d, noAddons: !d.noAddons, addonIds: [] }));
                  setError(null);
                }}
                media={<span className="swatch swatch-none">✕</span>}
                label="No Add-Ons"
                meta="Included"
              />
              {CAKE_ADDONS.map((a) => (
                <OptionTile
                  key={a.id}
                  type="checkbox"
                  name="addons"
                  checked={draft.addonIds.includes(a.id)}
                  onChange={() => {
                    setDraft((d) => ({
                      ...d,
                      noAddons: false,
                      addonIds: d.addonIds.includes(a.id) ? d.addonIds.filter((x) => x !== a.id) : [...d.addonIds, a.id],
                    }));
                    setError(null);
                  }}
                  media={<Swatch option={a} />}
                  label={a.label}
                  meta={surcharge(a.price)}
                />
              ))}
            </div>
            <p className="field-hint">Choose as many as you like.</p>
          </Step>
        )}

        {step === 7 && (
          <Step title="Cake Writing" eyebrow="Say It Sweetly ✍️" headingRef={headingRef}>
            <label className="field">
              <span className="field-label">What should your cake say?</span>
              <input
                className="input"
                maxLength={ORDERING.maxWritingChars}
                disabled={draft.noWriting}
                value={draft.writing}
                onChange={(e) => set("writing", e.target.value)}
                placeholder="Happy Birthday"
              />
              <span className="field-hint">
                {draft.writing.length}/{ORDERING.maxWritingChars}
              </span>
            </label>
            <div className="chips" aria-label="Examples">
              {WRITING_EXAMPLES.map((w) => (
                <button
                  key={w}
                  type="button"
                  className="chip"
                  disabled={draft.noWriting}
                  onClick={() => set("writing", w)}
                >
                  {w}
                </button>
              ))}
            </div>
            <label className="check">
              <input
                type="checkbox"
                checked={draft.noWriting}
                onChange={(e) => setDraft((d) => ({ ...d, noWriting: e.target.checked, writing: e.target.checked ? "" : d.writing }))}
              />
              <span>No Writing</span>
            </label>
          </Step>
        )}

        {step === 8 && (
          <Step title="Show Us Your Inspiration" eyebrow="Dream It, Share It 📸" headingRef={headingRef}>
            <div
              className="dropzone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                addPhotos(e.dataTransfer.files);
              }}
            >
              <svg viewBox="0 0 48 48" aria-hidden="true" className="dropzone-icon">
                <path
                  d="M14 34h-2a8 8 0 0 1-1-15.9A12 12 0 0 1 34.4 14 9 9 0 0 1 36 32h-2M24 22v16M18 28l6-6 6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="dropzone-title">Upload Inspiration Photo</p>
              <p className="dropzone-sub">
                JPG, PNG or HEIC · up to {ORDERING.maxPhotoMB}MB each · max {ORDERING.maxInspirationPhotos}
              </p>
              <PillButton
                size="sm"
                variant="outline"
                onClick={() => fileRef.current?.click()}
                disabled={photos.length >= ORDERING.maxInspirationPhotos}
              >
                {photos.length ? "Add Another Photo" : "Choose Photo"}
              </PillButton>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,.heic,.heif"
                multiple
                className="sr-only"
                onChange={(e) => addPhotos(e.target.files)}
                aria-label="Upload inspiration photos"
              />
            </div>
            {photoError ? <p className="field-error">{photoError}</p> : null}
            {photos.length ? (
              <ul className="thumbs">
                {photos.map((p) => (
                  <li key={p.id} className="thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt={p.file.name} />
                    <button type="button" className="thumb-remove" onClick={() => removePhoto(p.id)}>
                      <span className="sr-only">Remove {p.file.name}</span>×
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            <label className="field">
              <span className="field-label">Design Notes</span>
              <textarea
                className="input"
                rows={4}
                value={draft.designNotes}
                onChange={(e) => set("designNotes", e.target.value)}
                placeholder="Tell us about your theme, vibe, and any details you love."
              />
            </label>
            <Notice>{CAKE_NOTICES.inspiration}</Notice>
          </Step>
        )}

        {step === 9 && (
          <Step title="Your Information" eyebrow="Almost Done! 🩷" headingRef={headingRef}>
            <div className="field-row">
              <Field label="First & Last Name" value={draft.name} onChange={(v) => set("name", v)} autoComplete="name" />
              <Field label="Phone" type="tel" value={draft.phone} onChange={(v) => set("phone", v)} autoComplete="tel" />
            </div>
            <div className="field-row">
              <Field label="Email" type="email" value={draft.email} onChange={(v) => set("email", v)} autoComplete="email" />
              <Field label="Preferred Pickup Time" type="time" value={draft.pickupTime} onChange={(v) => set("pickupTime", v)} />
            </div>
            <label className="field">
              <span className="field-label">Anything Else We Should Know?</span>
              <textarea
                className="input"
                rows={3}
                value={draft.anythingElse}
                onChange={(e) => set("anythingElse", e.target.value)}
              />
            </label>
            <label className="check">
              <input type="checkbox" checked={draft.agreed} onChange={(e) => set("agreed", e.target.checked)} />
              <span>
                I’ve read and agree to the{" "}
                <a href="/policies" target="_blank" rel="noopener noreferrer">
                  OrisYard policies
                </a>
                .
              </span>
            </label>
          </Step>
        )}

        {isReview && (
          <Step title="Review Your Cake" eyebrow="Looking Sweet! 🩷" headingRef={headingRef}>
            <dl className="review">
              <ReviewRow label="Pickup date" value={prettyDate(draft.date)} edit={() => go(1)} />
              <ReviewRow
                label="Cake"
                value={size ? `${size.label} · starting at ${formatPrice(size.startingPrice)}` : "—"}
                edit={() => go(2)}
              />
              <ReviewRow label="Flavor" value={flavor ? `${flavor.label} (${surcharge(flavor.price)})` : "—"} edit={() => go(3)} />
              <ReviewRow label="Filling" value={filling ? `${filling.label} (${surcharge(filling.price)})` : "—"} edit={() => go(4)} />
              <ReviewRow
                label="Colors"
                value={[draft.primaryColor, draft.secondaryColor].filter(Boolean).join(" + ") + (draft.colorNotes ? ` — ${draft.colorNotes}` : "") || "—"}
                edit={() => go(5)}
              />
              <ReviewRow
                label="Add-ons"
                value={addons.length ? addons.map((a) => `${a.label} (${surcharge(a.price)})`).join(", ") : "No Add-Ons"}
                edit={() => go(6)}
              />
              <ReviewRow label="Cake writing" value={draft.noWriting ? "No Writing" : `“${draft.writing}”`} edit={() => go(7)} />
              <ReviewRow
                label="Inspiration"
                value={
                  photos.length ? (
                    <span className="review-thumbs">
                      {photos.map((p) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={p.id} src={p.url} alt={p.file.name} />
                      ))}
                    </span>
                  ) : (
                    "No photos"
                  )
                }
                edit={() => go(8)}
              />
              <ReviewRow label="Design notes" value={draft.designNotes || "—"} edit={() => go(8)} />
              <ReviewRow
                label="Contact"
                value={`${draft.name} · ${draft.phone} · ${draft.email}${draft.pickupTime ? ` · pickup ~${draft.pickupTime}` : ""}`}
                edit={() => go(9)}
              />
            </dl>

            <div className="estimate">
              <p className="estimate-label">Estimated Starting Price</p>
              <p className="estimate-value">{formatPrice(estimate)}</p>
              <p className="estimate-note">
                This is an estimate only, not your final quote. Design complexity, decorations, materials and custom
                requests can change your final price.
              </p>
            </div>

            <Notice tone="strong">{CAKE_NOTICES.notAnOrder}</Notice>
            <p className="field-hint">
              OrisYard reviews every request and contacts you with your final quote. Your order is booked once your
              final invoice and the required payment are completed.
            </p>

            <div className="submit-block">
              <PillButton size="lg" heart disabled={!ORDERING.cakeInquiriesLive} aria-describedby="submit-status">
                Submit Inquiry
              </PillButton>
              {!ORDERING.cakeInquiriesLive ? (
                <p id="submit-status" className="field-hint" role="status">
                  Online cake inquiries are opening soon — nothing has been sent. Your design is saved on this device.
                </p>
              ) : null}
            </div>
          </Step>
        )}

        {error ? (
          <p className="field-error" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      <div className="builder-nav">
        {step > 1 ? (
          <PillButton variant="outline" size="md" onClick={() => go(step - 1)}>
            <Arrow back className="inline-arrow" /> Back
          </PillButton>
        ) : (
          <PillLink href="/order" variant="outline" size="md">
            Back
          </PillLink>
        )}
        {step < STEPS.length ? (
          <PillButton size="md" arrow onClick={next}>
            Continue
          </PillButton>
        ) : step === STEPS.length ? (
          <PillButton size="md" heart onClick={next}>
            Review My Cake
          </PillButton>
        ) : null}
      </div>
    </div>
  );
}

/* ---------- pieces ---------- */

function Step({
  title,
  eyebrow,
  children,
  headingRef,
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <section className="step">
      <p className="step-eyebrow">{title}</p>
      <h1 className="step-title" ref={headingRef} tabIndex={-1}>
        {eyebrow}
      </h1>
      <div className="step-body">{children}</div>
    </section>
  );
}

function Swatch({ option }: { option: PricedOption }) {
  return <span className="swatch" style={{ background: option.swatch }} aria-hidden="true" />;
}

function OptionTile({
  type,
  name,
  checked,
  onChange,
  media,
  label,
  meta,
}: {
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  onChange: () => void;
  media: ReactNode;
  label: string;
  meta: string;
}) {
  return (
    <label className={`option-tile ${checked ? "is-checked" : ""}`}>
      <input type={type} name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span className="option-media">{media}</span>
      <span className="option-label">{label}</span>
      <span className="option-meta">{meta}</span>
      <Heart className="option-check" />
    </label>
  );
}

function OptionGrid({
  list,
  name,
  value,
  onChange,
}: {
  list: PricedOption[];
  name: string;
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="option-grid cols-3">
      {list.map((o) => (
        <OptionTile
          key={o.id}
          type="radio"
          name={name}
          checked={value === o.id}
          onChange={() => onChange(o.id)}
          media={<Swatch option={o} />}
          label={o.label}
          meta={surcharge(o.price)}
        />
      ))}
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
  optional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  optional?: boolean;
}) {
  return (
    <fieldset className="option-group">
      <legend>
        {label}
        {optional ? <span className="optional"> (optional)</span> : null}
      </legend>
      <div className="color-row">
        {COLOR_PRESETS.map((c) => (
          <button
            key={c.name}
            type="button"
            className={`color-dot ${value === c.name ? "is-checked" : ""}`}
            style={{ background: c.hex }}
            aria-pressed={value === c.name}
            onClick={() => onChange(value === c.name ? "" : c.name)}
          >
            <span className="sr-only">{c.name}</span>
          </button>
        ))}
      </div>
      <input
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or type a color"
        aria-label={`${label} — custom`}
      />
    </fieldset>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <input className="input" type={type} value={value} autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function ReviewRow({ label, value, edit }: { label: string; value: ReactNode; edit: () => void }) {
  return (
    <div className="review-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
      <button type="button" className="review-edit" onClick={edit}>
        Edit<span className="sr-only"> {label}</span>
      </button>
    </div>
  );
}
