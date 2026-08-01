"use client"

import * as React from "react"
import Image from "next/image"
import { Menu, X, Mail, Phone, MapPin, ArrowUpRight, Send } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/* -------------------------------------------------------------------------- */
/*  CONFIG — swap these three things for your project and you're done.         */
/* -------------------------------------------------------------------------- */

const SITE = {
  //name: "J.T. Timepieces",
  //tagline: "Browse the current inventory and reach out — we'll get back to you fast.",
  email: "jonathan@jttimepieces.com",
  phone: "(903) 423-2386",
  //location: "Mount Pleasant, TX",
  name: "JT Timepieces",
  tagline:
    "Browse the current collection and get in touch — we'll help you find the right piece.",
  //email: "hello@jttimepieces.com",
  //phone: "(555) 123-4567",
  location: "By appointment",
  // Logo lives in /public. Intrinsic size 1400×1130; rendered small via className.
  logo: { src: "/jt-datum-regular.png", width: 140, height: 113 },
}

// The CMS agent page you want to embed. If it blocks framing (X-Frame-Options
// or CSP frame-ancestors), the "Open in a new tab" fallback below still works.
const INVENTORY_EMBED_URL = "https://watchtrack.com/inventory/j-t-timepieces"

// Where your working email handler lives. Point this at the route/action you
// already got sending mail. Expects a JSON body of the form fields.
const CONTACT_ENDPOINT = "/api/contact"

const NAV_LINKS = [
  { label: "Inventory", href: "#inventory" },
  { label: "Contact", href: "#contact" },
]

const CONTACT_REASONS = [
  "General question",
  "Availability / pricing",
  "Schedule a viewing",
  "Something else",
]

/* -------------------------------------------------------------------------- */

type FormState = {
  name: string
  email: string
  phone: string
  reason: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  reason: "",
  message: "",
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        {/*<Hero />*/}
        <InventorySection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}

/* ------------------------------- Header ---------------------------------- */

function SiteHeader({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
}) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center" aria-label={SITE.name}>
          <Image
            src={SITE.logo.src}
            alt={SITE.name}
            width={SITE.logo.width}
            height={SITE.logo.height}
            priority
            className="h-9 w-auto"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Button key={link.href} asChild variant="ghost" size="sm">
              <a href={link.href}>{link.label}</a>
            </Button>
          ))}
          <Button asChild size="sm" className="ml-2">
            <a href="#contact">Get in touch</a>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t transition-[max-height] duration-300 ease-in-out md:hidden",
          menuOpen ? "max-h-64" : "max-h-0 border-t-0"
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button asChild className="mt-1" onClick={() => setMenuOpen(false)}>
            <a href="#contact">Get in touch</a>
          </Button>
        </nav>
      </div>
    </header>
  )
}

/* -------------------------------- Hero ----------------------------------- */

function Hero() {
  return (
    <section id="top" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {SITE.location}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {SITE.name}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {SITE.tagline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#inventory">View inventory</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">Contact us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- Inventory --------------------------------- */

function InventorySection() {
  return (
    <section id="inventory" className="border-b scroll-mt-16">
      {/* Heading stays in the centered container… */}
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 sm:pt-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Current inventory
            </h2>
            <p className="mt-2 text-muted-foreground">
              Live from our catalog. Tap any item for details.
            </p>
          </div>
        </div>
      </div>

      {/* …but the iframe breaks out to the full page width. It shares the page
          background (now cream, matching the catalog) so it reads seamlessly.
          Cross-origin embeds can't auto-resize, so this uses a generous fixed
          height with internal scroll. Adjust to taste. */}
      <iframe
        src={INVENTORY_EMBED_URL}
        title="Inventory catalog"
        loading="lazy"
        className="mt-8 block h-[80vh] min-h-[560px] w-full border-y-0 bg-background"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  )
}

/* ------------------------------ Contact ---------------------------------- */

function ContactSection() {
  const [form, setForm] = React.useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [submitting, setSubmitting] = React.useState(false)

  const update = (key: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate(): boolean {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = "Please enter your name."
    if (!form.email.trim()) {
      next.email = "Please enter your email."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "That email doesn't look right."
    }
    if (!form.message.trim()) next.message = "Let us know how we can help."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setSubmitting(true)
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      toast.success("Message sent", {
        description: "Thanks — we'll be in touch soon.",
      })
      setForm(EMPTY_FORM)
    } catch (err) {
      toast.error("Couldn't send your message", {
        description: "Please try again, or email us directly.",
      })
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="scroll-mt-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.1fr]">
        {/* Left: reach-us details */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Get in touch
          </h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Questions about anything in the catalog? Send a note and we'll get
            right back to you.
          </p>

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-muted-foreground" />
              <a href={`mailto:${SITE.email}`} className="hover:underline">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 text-muted-foreground" />
              <a href={`tel:${SITE.phone}`} className="hover:underline">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-muted-foreground" />
              <span>{SITE.location}</span>
            </li>
          </ul>
        </div>

        {/* Right: the form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>
              We'll reply by email — usually within a day.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => update("name")(e.target.value)}
                  aria-invalid={!!errors.name}
                  placeholder="Jane Doe"
                />
                {errors.name && <FieldError>{errors.name}</FieldError>}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email")(e.target.value)}
                  aria-invalid={!!errors.email}
                  placeholder="jane@example.com"
                />
                {errors.email && <FieldError>{errors.email}</FieldError>}
              </Field>

              <Field>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone")(e.target.value)}
                  placeholder="Optional"
                />
                <FieldDescription>Optional — if you'd rather we call.</FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="reason">What's this about?</FieldLabel>
                <Select
                  value={form.reason}
                  onValueChange={update("reason")}
                >
                  <SelectTrigger id="reason">
                    <SelectValue placeholder="Choose one" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTACT_REASONS.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => update("message")(e.target.value)}
                  aria-invalid={!!errors.message}
                  placeholder="Tell us what you're looking for…"
                  className="min-h-32"
                />
                {errors.message && <FieldError>{errors.message}</FieldError>}
              </Field>

              <Button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full sm:w-auto"
              >
                {submitting ? "Sending…" : "Send message"}
                {!submitting && <Send />}
              </Button>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

/* ------------------------------- Footer ---------------------------------- */

function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
          <Image
            src={SITE.logo.src}
            alt={SITE.name}
            width={SITE.logo.width}
            height={SITE.logo.height}
            className="h-8 w-auto"
          />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
        <a
          href={`mailto:${SITE.email}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {SITE.email}
        </a>
      </div>
    </footer>
  )
}
