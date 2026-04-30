import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, CalendarDays, MessageCircle, ShoppingBag, UsersRound } from "lucide-react";

const whatsapp = "https://wa.me/919023580385";

export const servicePages = {
  "table-requests": {
    icon: CalendarDays,
    kicker: "Capiche reservations",
    title: "Table Requests",
    intro: "A priority reservation flow for Capiche dining, tasting nights, and special tables.",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1800&auto=format&fit=crop",
    cta: "Request a table",
    message: "I want to request a table at Capiche.",
    points: ["Date-led inquiry", "Guest count and occasion capture", "Concierge confirmation on WhatsApp"],
    details: ["Chef counter evenings", "Anniversary tables", "Late dinner reservations"]
  },
  "private-events": {
    icon: UsersRound,
    kicker: "Banquets and private rooms",
    title: "Private Events",
    intro: "Availability-led planning for banquets, corporate dinners, family celebrations, and invite-only evenings.",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1800&auto=format&fit=crop",
    cta: "Inquire for availability",
    message: "I want to inquire for private event availability.",
    points: ["Room and date availability", "Curated menus", "Concierge planning support"],
    details: ["Corporate dinners", "Milestone celebrations", "Private tasting rooms"]
  },
  "sauce-commerce": {
    icon: ShoppingBag,
    kicker: "Ghaslet sauce",
    title: "Sauce Commerce",
    intro: "A retail surface for Ghaslet storytelling, collector packs, gifting, and direct purchase intent.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1800&auto=format&fit=crop",
    cta: "Buy Ghaslet",
    message: "I want to buy Ghaslet sauce.",
    points: ["Small-batch bottle drops", "Collector and gift packs", "WhatsApp purchase handoff"],
    details: ["Single bottle orders", "Festive hampers", "Restaurant supply inquiries"]
  },
  careers: {
    icon: BriefcaseBusiness,
    kicker: "Join the house",
    title: "Careers",
    intro: "A premium hiring surface for kitchen, service, events, sauce production, and operations roles.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1800&auto=format&fit=crop",
    cta: "Apply through concierge",
    message: "I want to apply for a role at Bookends.",
    points: ["Kitchen and service roles", "Events and operations", "Apprenticeship interest"],
    details: ["Chef de partie", "Guest relations", "Event operations"]
  }
} as const;

type ServiceKey = keyof typeof servicePages;

export function ServicePage({ serviceKey }: { serviceKey: ServiceKey }) {
  const service = servicePages[serviceKey];
  const Icon = service.icon;

  return (
    <main className="noise min-h-screen bg-[#050505] text-[#f4ead8]">
      <nav className="fixed left-0 top-0 z-40 flex w-full items-center justify-between border-b border-white/10 bg-black/55 px-[5vw] py-5 backdrop-blur-xl">
        <Link href="/" className="serif text-2xl">Bookends</Link>
        <Link href="/" className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.24em] text-[#b89454]">
          <ArrowLeft size={14} />
          Back home
        </Link>
      </nav>

      <section className="relative grid min-h-screen overflow-hidden px-[5vw] pt-32 md:grid-cols-[1fr_0.86fr]">
        <div className="absolute inset-0 opacity-26">
          <div className="h-full bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/84 to-[#050505]/42" />

        <div className="relative z-10 grid content-center py-[10vh]">
          <div className="mb-8 flex h-16 w-16 items-center justify-center border border-[#b89454]/45 bg-black/30">
            <Icon className="text-[#b89454]" />
          </div>
          <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#b89454]">{service.kicker}</p>
          <h1 className="serif mt-5 max-w-5xl text-[17vw] leading-[0.82] md:text-[8vw]">{service.title}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d8c7a8] md:text-2xl">{service.intro}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a className="luxury-button" href={`${whatsapp}?text=${encodeURIComponent(service.message)}`}>
              <MessageCircle size={15} />
              {service.cta}
            </a>
            <Link className="ghost-button" href="/#contact">
              Contact details
            </Link>
          </div>
        </div>

        <aside className="relative z-10 grid content-center gap-5 pb-[10vh] md:py-[10vh]">
          <div className="glass p-6">
            <p className="mb-6 text-[0.68rem] uppercase tracking-[0.28em] text-[#b89454]">Flow</p>
            {service.points.map((point) => (
              <div key={point} className="flex items-center justify-between border-b border-white/10 py-5 text-[0.74rem] uppercase tracking-[0.22em] text-[#d8c7a8]">
                <span>{point}</span>
                <ArrowUpRight size={15} className="text-[#b89454]" />
              </div>
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {service.details.map((detail) => (
              <div key={detail} className="border border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-[#a99f90]">
                {detail}
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
