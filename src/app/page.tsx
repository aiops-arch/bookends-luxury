"use client";

import { Environment, Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  ChefHat,
  ChevronRight,
  Flame,
  MapPin,
  MessageCircle,
  Music2,
  Play,
  ShoppingBag,
  Sparkles,
  UsersRound
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Mesh } from "three";

gsap.registerPlugin(ScrollTrigger);

const whatsapp = "https://wa.me/919023580385";
const instagram = "https://www.instagram.com/bookendshospitality/";
const linkedin = "https://www.linkedin.com/company/bookends-hospitality/";

const brandData = [
  {
    name: "Capiche",
    tag: "Modern dining",
    cta: "Request a table",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1800&auto=format&fit=crop",
    tone: "#b89454",
    copy: "Low light, open flame, polished service, and a kitchen built for nights that stretch past dessert.",
    metrics: ["Chef-led menu", "Late evenings", "Private tastings"]
  },
  {
    name: "Ghaslet",
    tag: "Sauce atelier",
    cta: "Buy sauce",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1800&auto=format&fit=crop",
    tone: "#9b3324",
    copy: "A heat-forward bottle program designed like a luxury object: collectable, giftable, and sharp on the table.",
    metrics: ["Small batch", "Retail ready", "Gift boxes"]
  },
  {
    name: "Banquets",
    tag: "Private occasions",
    cta: "Inquire for availability",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1800&auto=format&fit=crop",
    tone: "#6f7b65",
    copy: "Rooms, menus, and service choreography for milestone dinners, corporate evenings, and intimate celebrations.",
    metrics: ["Curated menus", "Concierge planning", "Invite-only rooms"]
  }
];

const gallery = [
  ["Plating room", "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop"],
  ["Service pass", "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop"],
  ["Cocktail ritual", "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1000&auto=format&fit=crop"],
  ["Private table", "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1000&auto=format&fit=crop"],
  ["Bottle heat", "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000&auto=format&fit=crop"],
  ["After-hours", "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1000&auto=format&fit=crop"]
];

const services = [
  { icon: CalendarDays, title: "Table Requests", href: "/table-requests", cta: "Request a table", text: "Priority reservation flow for Capiche dining and tasting nights." },
  { icon: UsersRound, title: "Private Events", href: "/private-events", cta: "Plan an event", text: "Availability-led inquiry system for banquets, corporate dinners, and family celebrations." },
  { icon: ShoppingBag, title: "Sauce Commerce", href: "/sauce-commerce", cta: "Order Ghaslet", text: "Ghaslet storytelling, collector packs, and direct WhatsApp purchase intent." },
  { icon: BriefcaseBusiness, title: "Careers", href: "/careers", cta: "Apply now", text: "A premium hospitality hiring surface for kitchen, service, and operations roles." }
];

const menuMoods = [
  { title: "Aperitivo", color: "#44221b", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1600&auto=format&fit=crop" },
  { title: "Fire", color: "#5a170f", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop" },
  { title: "Velvet", color: "#202619", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?q=80&w=1600&auto=format&fit=crop" }
];

function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const quickX = gsap.quickTo(cursor, "x", { duration: 0.32, ease: "power3" });
    const quickY = gsap.quickTo(cursor, "y", { duration: 0.32, ease: "power3" });
    const move = (event: MouseEvent) => {
      quickX(event.clientX);
      quickY(event.clientY);
    };
    const enter = () => gsap.to(cursor, { scale: 2.65, rotate: 45, duration: 0.35, ease: "power3.out" });
    const leave = () => gsap.to(cursor, { scale: 1, rotate: 0, duration: 0.35, ease: "power3.out" });

    window.addEventListener("mousemove", move);
    document.querySelectorAll("[data-magnetic]").forEach((target) => {
      target.addEventListener("mouseenter", enter);
      target.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("[data-magnetic]").forEach((target) => {
        target.removeEventListener("mouseenter", enter);
        target.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <div ref={cursorRef} className="magnetic-cursor">
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 5 43 24 24 43 5 24 24 5Z" stroke="#f4ead8" strokeWidth="1" />
        <circle cx="24" cy="24" r="3" fill="#f4ead8" />
      </svg>
    </div>
  );
}

function Headline({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={className} data-reveal>
      {children.split("").map((letter, index) => (
        <span className="headline-mask" key={`${letter}-${index}`}>
          <span className="headline-letter">{letter === " " ? "\u00a0" : letter}</span>
        </span>
      ))}
    </span>
  );
}

function SauceBottle() {
  const mesh = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.elapsedTime * 0.72;
    mesh.current.rotation.z = Math.sin(clock.elapsedTime * 0.8) * 0.05;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.45} floatIntensity={0.55}>
      <group ref={mesh}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.48, 0.56, 2.35, 64]} />
          <meshStandardMaterial color="#651b12" roughness={0.22} metalness={0.12} />
        </mesh>
        <mesh position={[0, 1.48, 0]}>
          <cylinderGeometry args={[0.22, 0.28, 0.65, 48]} />
          <meshStandardMaterial color="#16110e" roughness={0.15} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.57]}>
          <boxGeometry args={[0.72, 0.88, 0.04]} />
          <meshStandardMaterial color="#ead2a3" roughness={0.42} metalness={0.08} />
        </mesh>
      </group>
    </Float>
  );
}

function WhatsAppHub() {
  const [open, setOpen] = useState(false);
  const items = [
    ["Book Table", CalendarDays, "I want to request a table at Capiche."],
    ["Buy Sauce", ShoppingBag, "I want to buy Ghaslet sauce."],
    ["Careers", BriefcaseBusiness, "I want to apply for a role at Bookends."]
  ] as const;

  return (
    <div className="fixed bottom-[4vh] right-[4vw] z-50 flex items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.96 }} className="glass grid min-w-64 gap-2 p-2">
            {items.map(([label, Icon, text]) => (
              <motion.a whileHover={{ x: 6 }} data-magnetic key={label} href={`${whatsapp}?text=${encodeURIComponent(text)}`} className="flex items-center justify-between gap-4 px-4 py-3 text-[0.68rem] uppercase tracking-[0.2em] text-[#f4ead8] transition hover:bg-white/10">
                <span className="flex items-center gap-3"><Icon size={15} />{label}</span>
                <ChevronRight size={14} />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button data-magnetic aria-label="Connect with our Maitre d'" onClick={() => setOpen((value) => !value)} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} className="glass relative grid h-16 w-16 place-items-center rounded-full text-[#f4ead8]">
        <span className="absolute inset-0 rounded-full border border-[#b89454]/50 animate-ping" />
        <MessageCircle size={24} />
      </motion.button>
    </div>
  );
}

function BrandSelector() {
  const [active, setActive] = useState(0);
  const brand = brandData[active];

  return (
    <section id="brands" className="relative px-[5vw] py-[14vh]">
      <div className="mb-[6vh] flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <h2 className="serif max-w-5xl text-[13vw] leading-[0.86] md:text-[6.6vw]"><Headline>Three brands. One standard.</Headline></h2>
        <p className="max-w-sm text-[0.72rem] uppercase leading-6 tracking-[0.22em] text-[#a99f90]">Select a house and the room changes with it.</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="grid gap-3">
          {brandData.map((item, index) => (
            <motion.button
              data-magnetic
              key={item.name}
              onClick={() => setActive(index)}
              whileHover={{ x: 8 }}
              whileTap={{ scale: 0.98 }}
              className={`brand-tab flex items-center justify-between border px-5 py-5 text-left transition ${active === index ? "border-[#b89454] bg-[#b89454]/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"}`}
            >
              <span>
                <span className="block serif text-4xl normal-case tracking-normal">{item.name}</span>
                <span className="mt-2 block text-[0.66rem] uppercase tracking-[0.28em] text-[#a99f90]">{item.tag}</span>
              </span>
              <ArrowUpRight color={active === index ? item.tone : "#a99f90"} />
            </motion.button>
          ))}
        </div>
        <motion.article key={brand.name} initial={{ opacity: 0, y: 26, filter: "blur(14px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="glass min-h-[72vh] overflow-hidden">
          <div className="grid h-full lg:grid-cols-[1fr_0.82fr]">
            <div className="relative min-h-[52vh] overflow-hidden">
              <motion.div initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.2 }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${brand.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="text-[0.66rem] uppercase tracking-[0.3em] text-[#d8c7a8]">{brand.tag}</p>
                  <h3 className="serif mt-2 text-[15vw] leading-none md:text-[7vw]">{brand.name}</h3>
                </div>
                {brand.name === "Ghaslet" && (
                  <div className="hidden h-72 w-48 md:block">
                    <Canvas camera={{ position: [0, 0.4, 4], fov: 34 }}>
                      <ambientLight intensity={1.5} />
                      <directionalLight position={[2, 4, 3]} intensity={3.2} />
                      <SauceBottle />
                      <Environment preset="city" />
                    </Canvas>
                  </div>
                )}
              </div>
            </div>
            <div className="grid content-between gap-8 p-[5vw] lg:p-[3vw]">
              <p className="text-lg leading-8 text-[#eadcc5] md:text-2xl">{brand.copy}</p>
              <div className="grid gap-3">
                {brand.metrics.map((metric) => (
                  <div key={metric} className="flex items-center justify-between border-b border-white/10 py-4 text-[0.7rem] uppercase tracking-[0.24em] text-[#d8c7a8]">
                    <span>{metric}</span>
                    <Sparkles size={14} color={brand.tone} />
                  </div>
                ))}
              </div>
              <a data-magnetic href={`${whatsapp}?text=${encodeURIComponent(brand.cta)}`} className="luxury-button w-max">{brand.cta}</a>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState(0);
  const activeMood = menuMoods[mood];
  const tickerItems = useMemo(() => ["Help-Out Initiative", "Community Kitchens", "Hospitality Apprenticeships", "Every Table Counts", "Ahmedabad Hospitality", "Personal Concierge"], []);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((headline) => {
        gsap.to(headline.querySelectorAll(".headline-letter"), {
          y: 0,
          duration: 1.1,
          stagger: 0.012,
          ease: "power4.out",
          scrollTrigger: { trigger: headline, start: "top 86%" }
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((item) => {
        gsap.fromTo(item, { y: 70, opacity: 0, filter: "blur(14px)" }, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%" }
        });
      });

      gsap.to(".hero-media", {
        scale: 0.82,
        borderRadius: "1.8rem",
        yPercent: 8,
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 }
      });
      gsap.to(".bookends-top", { xPercent: -12, scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".bookends-bottom", { xPercent: 12, scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".nav-shell", {
        backgroundColor: "rgba(5,5,5,0.72)",
        backdropFilter: "blur(20px)",
        paddingTop: "1.35vh",
        paddingBottom: "1.35vh",
        scrollTrigger: { trigger: heroRef.current, start: "18% top", end: "28% top", scrub: true }
      });

      if (horizontalRef.current && galleryRef.current) {
        gsap.to(galleryRef.current, {
          x: () => -(galleryRef.current!.scrollWidth - window.innerWidth + 80),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: "top top",
            end: () => `+=${galleryRef.current!.scrollWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true
          }
        });
      }
    });

    return () => context.revert();
  }, []);

  return (
    <main className="noise min-h-screen cursor-none overflow-hidden text-[#f4ead8]">
      <MagneticCursor />
      <WhatsAppHub />

      <nav className="nav-shell fixed left-0 top-0 z-40 flex w-full items-center justify-between border-b border-white/0 px-[4vw] py-[3vh] text-[0.68rem] uppercase tracking-[0.25em] text-[#f4ead8]/80">
        <a data-magnetic href="#" className="serif text-2xl normal-case tracking-normal text-[#f4ead8]">Bookends</a>
        <div className="hidden gap-[2.4vw] md:flex">
          <a data-magnetic href="#brands">Brands</a>
          <a data-magnetic href="#experience">Experience</a>
          <a data-magnetic href="#social">Social</a>
          <a data-magnetic href="#contact">Contact</a>
        </div>
        <a data-magnetic href={`${whatsapp}?text=${encodeURIComponent("Connect me with the Bookends maitre d'.")}`} className="hidden text-[#b89454] md:block">Maitre d&apos;</a>
      </nav>

      <section ref={heroRef} className="relative grid h-[138vh] place-items-center overflow-hidden">
        <div className="hero-media absolute inset-[2vh] overflow-hidden bg-[#15100b]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center opacity-75" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent,rgba(0,0,0,.78)_68%),linear-gradient(to_bottom,rgba(0,0,0,.2),#050505)]" />
        </div>
        <div className="relative z-10 w-full px-[5vw] pt-[10vh] text-center">
          <p className="mb-[4vh] text-[0.68rem] uppercase tracking-[0.36em] text-[#b89454]">Bookends Hospitality Pvt. Ltd.</p>
          <div className="serif text-[18vw] uppercase leading-[0.72] tracking-normal text-[#f4ead8] md:text-[15vw]">
            <div className="bookends-top">BOOK</div>
            <div className="bookends-bottom">ENDS</div>
          </div>
          <p className="mx-auto mt-[5vh] max-w-[52rem] text-[0.82rem] uppercase leading-7 tracking-[0.28em] text-[#d8c7a8]">
            <Headline>Restaurant nights, sauce culture, and private rooms shaped like cinema.</Headline>
          </p>
          <div className="mt-[5vh] flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a data-magnetic href={`${whatsapp}?text=${encodeURIComponent("I want to request an invite for Bookends.")}`} className="luxury-button">Request an invite</a>
            <a data-magnetic href="#brands" className="ghost-button">Explore the houses</a>
          </div>
        </div>
        <div className="absolute bottom-[7vh] left-[5vw] z-10 grid gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-[#b89454]">
          <span>Scroll to enter</span>
          <span className="h-14 w-px bg-gradient-to-b from-[#b89454] to-transparent" />
        </div>
      </section>

      <section className="relative px-[5vw] py-[14vh]">
        <div className="grid gap-[8vw] md:grid-cols-[0.8fr_1.2fr]">
          <p data-rise className="text-[0.7rem] uppercase tracking-[0.35em] text-[#b89454]">The Bookends of a Night</p>
          <div>
            <h1 className="serif text-[10vw] leading-[0.9] md:text-[5.8vw]">
              <Headline>Every detail moves between the first pour and the final toast.</Headline>
            </h1>
            <p data-rise className="mt-8 max-w-3xl text-lg leading-8 text-[#d8c7a8]">Bookends is designed as a hospitality house, not a brochure. The site now gives each business line a role: Capiche for dining, Ghaslet for retail, Banquets for private conversion, and the concierge as the primary action layer.</p>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-white/10 py-[3vh] text-[0.72rem] uppercase tracking-[0.34em] text-[#d8c7a8]/70">
        <div className="ticker-track flex w-max gap-10">
          {Array.from({ length: 2 }).map((_, group) => (
            <div className="flex gap-10" key={group}>
              {tickerItems.map((item) => <span key={`${group}-${item}`}>{item}</span>)}
            </div>
          ))}
        </div>
      </section>

      <BrandSelector />

      <section id="experience" className="relative min-h-screen px-[5vw] py-[14vh]" style={{ backgroundColor: activeMood.color }}>
        <motion.div key={activeMood.image} initial={{ opacity: 0 }} animate={{ opacity: 0.34 }} transition={{ duration: 0.8 }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${activeMood.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
        <div className="relative z-10 grid gap-[8vw] lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="mb-5 text-[0.68rem] uppercase tracking-[0.34em] text-[#b89454]">Interactive menu mood</p>
            <h2 className="serif text-[12vw] leading-[0.88] md:text-[6vw]"><Headline>Hover less. Feel more.</Headline></h2>
          </div>
          <div className="grid content-start gap-4">
            {menuMoods.map((item, index) => (
              <motion.button data-magnetic key={item.title} onClick={() => setMood(index)} whileHover={{ x: 10 }} whileTap={{ scale: 0.98 }} className={`mood-row flex items-center justify-between border-b border-white/16 py-7 text-left ${mood === index ? "text-[#f4ead8]" : "text-[#a99f90]"}`}>
                <span className="serif text-[12vw] leading-none md:text-[5vw]">{item.title}</span>
                <span className="text-[0.66rem] uppercase tracking-[0.25em]">{mood === index ? "Selected" : "Select"}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section ref={horizontalRef} className="relative h-screen overflow-hidden">
        <div ref={galleryRef} className="flex h-screen w-max items-center gap-[2vw] px-[5vw]">
          {gallery.map(([caption, image], index) => (
            <article data-magnetic data-rise key={caption} className="relative h-[72vh] w-[72vw] shrink-0 overflow-hidden md:w-[34vw]">
              <div className="absolute inset-0 bg-cover bg-center transition duration-700 hover:scale-110" style={{ backgroundImage: `url(${image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#b89454]">0{index + 1}</p>
                  <h3 className="serif mt-2 text-4xl">{caption}</h3>
                </div>
                <Play size={18} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-[5vw] py-[14vh]">
        <div className="grid gap-4 md:grid-cols-4">
          {services.map(({ icon: Icon, title, href, cta, text }) => (
            <motion.article data-rise data-magnetic key={title} whileHover={{ y: -10, backgroundColor: "rgba(184,148,84,0.12)" }} className="glass grid min-h-72 content-between p-6">
              <Icon className="text-[#b89454]" />
              <div>
                <h3 className="serif text-4xl">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#a99f90]">{text}</p>
              </div>
              <Link href={href} className="mt-7 flex items-center justify-between border-t border-white/10 pt-5 text-[0.66rem] uppercase tracking-[0.24em] text-[#b89454]">
                {cta}
                <ArrowUpRight size={15} />
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="social" className="px-[5vw] py-[14vh]">
        <div className="mb-[6vh] flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="serif text-[12vw] leading-none md:text-[5.6vw]"><Headline>Social proof, curated.</Headline></h2>
          <div className="flex gap-3">
            <a data-magnetic href={instagram} target="_blank" rel="noreferrer" className="ghost-button"><Camera size={15} /> Instagram</a>
            <a data-magnetic href={linkedin} target="_blank" rel="noreferrer" className="ghost-button"><BriefcaseBusiness size={15} /> LinkedIn</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {gallery.map(([caption, image], index) => (
            <a data-magnetic key={caption} href={instagram} target="_blank" rel="noreferrer" className={`social-tile group relative overflow-hidden ${index % 3 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
              <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110 group-hover:blur-[1px]" style={{ backgroundImage: `url(${image})` }} />
              <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/55" />
              <span className="absolute bottom-4 left-4 right-4 translate-y-4 text-[0.62rem] uppercase tracking-[0.22em] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">{caption}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="grid gap-[6vw] px-[5vw] py-[14vh] md:grid-cols-[0.8fr_1.2fr]">
        <div data-rise className="glass p-7">
          <ChefHat className="mb-8 text-[#b89454]" />
          <h2 className="serif text-5xl">Siddhant & Vidhi Shah</h2>
          <p className="mt-5 text-sm leading-7 text-[#a99f90]">Founder portrait space reserved for high-resolution photography. Until those assets arrive, the layout is ready for editorial portrait treatment without breaking the composition.</p>
        </div>
        <div className="grid gap-4">
          {["Press and partnerships", "Supplier and chef collaborations", "Help-Out Initiative reporting"].map((item) => (
            <motion.a data-magnetic data-rise href={`${whatsapp}?text=${encodeURIComponent(item)}`} key={item} whileHover={{ x: 10 }} className="flex items-center justify-between border-b border-white/10 py-7 text-[0.76rem] uppercase tracking-[0.24em] text-[#d8c7a8]">
              {item}
              <ArrowUpRight className="text-[#b89454]" />
            </motion.a>
          ))}
        </div>
      </section>

      <footer id="contact" className="grid gap-[6vh] border-t border-white/10 px-[5vw] py-[10vh] text-[0.72rem] uppercase tracking-[0.22em] text-[#d8c7a8] md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="serif text-5xl normal-case tracking-normal text-[#f4ead8]">Bookends Hospitality Pvt. Ltd.</div>
          <p className="mt-6 max-w-md leading-7 text-[#a99f90]">Personal concierge for tables, private rooms, sauce orders, careers, press, and collaborations.</p>
        </div>
        <div><MapPin className="mb-4 text-[#b89454]" />Registered Address<br />Ahmedabad, Gujarat, India</div>
        <div><Flame className="mb-4 text-[#b89454]" />CIN<br />U55101GJ2024PTC149642</div>
        <div className="grid content-start gap-4">
          <a data-magnetic href={`${whatsapp}?text=${encodeURIComponent("Connect me with the Bookends maitre d'.")}`} className="text-[#b89454]">Connect with our Maitre d&apos;</a>
          <a data-magnetic href={instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a data-magnetic href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a data-magnetic href="mailto:hello@bookendshospitality.com">hello@bookendshospitality.com</a>
        </div>
      </footer>
    </main>
  );
}
