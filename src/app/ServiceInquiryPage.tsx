"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, CalendarDays, MessageCircle, ShoppingBag, UsersRound } from "lucide-react";
import { FormEvent, useState } from "react";

const whatsapp = "https://wa.me/919023580385";

const servicePages = {
  "table-requests": {
    icon: CalendarDays,
    kicker: "Capiche reservations",
    title: "Table Request",
    intro: "Request a priority table for Capiche dining, tasting nights, chef counter evenings, and special occasions.",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1800&auto=format&fit=crop",
    cta: "Send table request",
    fields: [
      ["name", "Full name", "text"],
      ["phone", "Phone number", "tel"],
      ["date", "Preferred date", "date"],
      ["time", "Preferred time", "time"],
      ["guests", "Guest count", "number"],
      ["occasion", "Occasion", "text"],
      ["notes", "Dining notes", "textarea"]
    ],
    points: ["Date-led inquiry", "Guest count and occasion capture", "Concierge confirmation on WhatsApp"]
  },
  "private-events": {
    icon: UsersRound,
    kicker: "Banquets and private rooms",
    title: "Private Event Inquiry",
    intro: "Share your event brief for banquets, corporate dinners, family celebrations, and private rooms.",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1800&auto=format&fit=crop",
    cta: "Send event inquiry",
    fields: [
      ["name", "Full name", "text"],
      ["phone", "Phone number", "tel"],
      ["eventDate", "Event date", "date"],
      ["eventType", "Event type", "text"],
      ["guests", "Expected guests", "number"],
      ["budget", "Approx. budget", "text"],
      ["notes", "Event brief", "textarea"]
    ],
    points: ["Room and date availability", "Curated menus", "Concierge planning support"]
  },
  "sauce-commerce": {
    icon: ShoppingBag,
    kicker: "Ghaslet sauce",
    title: "Ghaslet Order",
    intro: "Place an intent request for Ghaslet bottles, collector packs, festive hampers, or restaurant supply.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1800&auto=format&fit=crop",
    cta: "Send sauce order",
    fields: [
      ["name", "Full name", "text"],
      ["phone", "Phone number", "tel"],
      ["product", "Product or pack", "text"],
      ["quantity", "Quantity", "number"],
      ["city", "Delivery city", "text"],
      ["notes", "Order notes", "textarea"]
    ],
    points: ["Small-batch bottle drops", "Collector and gift packs", "WhatsApp purchase handoff"]
  },
  careers: {
    icon: BriefcaseBusiness,
    kicker: "Join the house",
    title: "Careers Application",
    intro: "Apply for kitchen, service, events, sauce production, guest relations, or operations roles.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1800&auto=format&fit=crop",
    cta: "Send application",
    fields: [
      ["name", "Full name", "text"],
      ["phone", "Phone number", "tel"],
      ["role", "Role interested in", "text"],
      ["experience", "Years of experience", "text"],
      ["city", "Current city", "text"],
      ["portfolio", "CV / portfolio link", "url"],
      ["notes", "Short introduction", "textarea"]
    ],
    points: ["Kitchen and service roles", "Events and operations", "Apprenticeship interest"]
  }
} as const;

type ServiceKey = keyof typeof servicePages;
type FormValue = string;

export function ServiceInquiryPage({ serviceKey }: { serviceKey: ServiceKey }) {
  const service = servicePages[serviceKey];
  const Icon = service.icon;
  const [values, setValues] = useState<Record<string, FormValue>>({});

  const update = (key: string, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const lines = [
      `Bookends ${service.title}`,
      "",
      ...service.fields.map(([key, label]) => `${label}: ${values[key] || "-"}`)
    ];
    window.open(`${whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="noise min-h-screen bg-[#050505] text-[#f4ead8]">
      <nav className="fixed left-0 top-0 z-40 flex w-full items-center justify-between border-b border-white/10 bg-black/55 px-[5vw] py-5 backdrop-blur-xl">
        <Link href="/" className="serif text-2xl">Bookends</Link>
        <Link href="/" className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.24em] text-[#b89454]">
          <ArrowLeft size={14} />
          Back home
        </Link>
      </nav>

      <section className="relative grid min-h-screen overflow-hidden px-[5vw] pt-28 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="absolute inset-0 opacity-28">
          <div className="h-full bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/88 to-[#050505]/54" />

        <div className="relative z-10 grid content-center py-[8vh]">
          <div className="mb-8 flex h-16 w-16 items-center justify-center border border-[#b89454]/45 bg-black/30">
            <Icon className="text-[#b89454]" />
          </div>
          <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#b89454]">{service.kicker}</p>
          <h1 className="serif mt-5 max-w-5xl text-[15vw] leading-[0.82] md:text-[7vw]">{service.title}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d8c7a8] md:text-2xl">{service.intro}</p>
          <div className="mt-10 grid gap-3 md:max-w-xl">
            {service.points.map((point) => (
              <div key={point} className="flex items-center justify-between border-b border-white/10 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-[#d8c7a8]">
                <span>{point}</span>
                <ArrowUpRight size={15} className="text-[#b89454]" />
              </div>
            ))}
          </div>
        </div>

        <aside className="relative z-10 grid content-center pb-[8vh] lg:py-[8vh]">
          <form onSubmit={submit} className="glass grid gap-4 p-5 md:p-8">
            <div className="mb-2 flex items-center justify-between gap-5">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#b89454]">Inquiry Form</p>
              <MessageCircle size={18} className="text-[#b89454]" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {service.fields.map(([key, label, type]) => (
                <label key={key} className={type === "textarea" ? "md:col-span-2" : ""}>
                  <span className="mb-2 block text-[0.62rem] uppercase tracking-[0.22em] text-[#a99f90]">{label}</span>
                  {type === "textarea" ? (
                    <textarea className="form-field min-h-32 resize-none" value={values[key] || ""} onChange={(event) => update(key, event.target.value)} />
                  ) : (
                    <input className="form-field" type={type} value={values[key] || ""} onChange={(event) => update(key, event.target.value)} />
                  )}
                </label>
              ))}
            </div>
            <button type="submit" className="luxury-button mt-3 w-full">{service.cta}</button>
            <p className="text-xs leading-6 text-[#a99f90]">Submits directly to the Bookends WhatsApp concierge with your form details.</p>
          </form>
        </aside>
      </section>
    </main>
  );
}
