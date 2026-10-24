import {
  ArrowRight,
  Check,
  Code2,
  ExternalLink,
  Layers3,
  Mail,
  MapPin,
  Menu,
  PanelsTopLeft,
  Phone,
  Smartphone,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { Link, Route, Switch, useLocation } from "wouter";

const SITE_URL = "https://tropicwavesolutions.com";
const SUPPORT_EMAIL = "support@tropicwavesolutions.com";
const PHONE_DISPLAY = "305-498-2030";
const PHONE_LINK = "+13054982030";
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY?.trim();

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "What we do" },
  { href: "/contact", label: "Contact" },
];

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Tropic Wave Solutions LLC | Software design and development",
    description:
      "Tropic Wave Solutions LLC designs, builds, and operates software applications, SaaS tools, and business workflow products.",
  },
  "/about": {
    title: "About | Tropic Wave Solutions LLC",
    description:
      "Learn about our Florida software company and our practical approach to custom software and product engineering.",
  },
  "/services": {
    title: "What we do | Tropic Wave Solutions LLC",
    description:
      "Custom software, product engineering, web and mobile apps, integrations, automation, and original products.",
  },
  "/contact": {
    title: "Contact | Tropic Wave Solutions LLC",
    description:
      "Contact Tropic Wave Solutions LLC in Hialeah, Florida by email or phone.",
  },
  "/privacy": {
    title: "Privacy Policy | Tropic Wave Solutions LLC",
    description: "Privacy Policy for Tropic Wave Solutions LLC.",
  },
  "/terms": {
    title: "Terms of Service | Tropic Wave Solutions LLC",
    description: "Terms of Service for Tropic Wave Solutions LLC.",
  },
  "/data-deletion": {
    title: "Data Deletion | Tropic Wave Solutions LLC",
    description:
      "Instructions for requesting deletion of data held by Tropic Wave Solutions LLC.",
  },
};

function updateMeta(path: string) {
  const meta = pageMeta[path] ?? {
    title: "Page not found | Tropic Wave Solutions LLC",
    description: "The requested page could not be found.",
  };
  const canonical = `${SITE_URL}${path === "/" ? "/" : path}`;

  document.title = meta.title;
  const set = (selector: string, value: string) => {
    document.querySelector(selector)?.setAttribute("content", value);
  };
  set('meta[name="description"]', meta.description);
  set('meta[property="og:title"]', meta.title);
  set('meta[property="og:description"]', meta.description);
  set('meta[property="og:url"]', canonical);
  set('meta[name="twitter:title"]', meta.title);
  set('meta[name="twitter:description"]', meta.description);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonical);
}

function AppLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-teal-950/10 bg-stone-50/90 backdrop-blur-xl">
      <div className="shell flex h-20 items-center justify-between">
        <AppLink href="/" className="group flex items-center gap-3" >
          <img
            src="/logo.svg"
            alt=""
            width="46"
            height="46"
            className="h-11 w-11 transition-transform group-hover:-rotate-3"
          />
          <span className="max-w-48 text-[15px] font-bold leading-tight tracking-tight text-teal-950 sm:text-base">
            Tropic Wave
            <span className="block font-medium text-teal-700">Solutions LLC</span>
          </span>
        </AppLink>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <AppLink
              key={item.href}
              href={item.href}
              className={`nav-link ${location === item.href ? "nav-link-active" : ""}`}
            >
              {item.label}
            </AppLink>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-teal-950/15 p-2.5 text-teal-950 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            aria-label="Mobile navigation"
            className="overflow-hidden border-t border-teal-950/10 bg-stone-50 md:hidden"
          >
            <div className="shell flex flex-col py-4">
              {navItems.map((item) => (
                <AppLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 font-semibold ${
                    location === item.href
                      ? "bg-teal-100 text-teal-950"
                      : "text-slate-700"
                  }`}
                >
                  {item.label}
                </AppLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-teal-950 text-teal-50">
      <div className="shell grid grid-cols-1 gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <img src="/logo.svg" alt="" className="h-12 w-12 rounded-xl" />
            <p className="font-bold leading-tight">
              Tropic Wave Solutions LLC
              <span className="block font-normal text-teal-200">
                Hialeah, Florida
              </span>
            </p>
          </div>
          <p className="max-w-sm text-sm leading-6 text-teal-100/75">
            Designing, building, and operating practical software applications
            and original products.
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-coral-300">
            Explore
          </p>
          <div className="flex flex-col gap-2 text-sm text-teal-100/80">
            {navItems.map((item) => (
              <AppLink key={item.href} href={item.href} className="footer-link">
                {item.label}
              </AppLink>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-coral-300">
            Legal
          </p>
          <div className="flex flex-col gap-2 text-sm text-teal-100/80">
            <AppLink href="/privacy" className="footer-link">
              Privacy Policy
            </AppLink>
            <AppLink href="/terms" className="footer-link">
              Terms of Service
            </AppLink>
            <AppLink href="/data-deletion" className="footer-link">
              Data Deletion
            </AppLink>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-teal-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Tropic Wave Solutions LLC</p>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white">
            {SUPPORT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="shell">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="max-w-4xl text-4xl font-black tracking-[-0.04em] text-teal-950 sm:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="mt-6 max-w-2xl text-lg leading-8 text-slate-600"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-teal-950 text-white">
        <div className="hero-grid absolute inset-0 opacity-30" />
        <div className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-coral-400/20 blur-3xl" />
        <div className="shell relative grid min-h-[690px] grid-cols-1 items-center gap-12 py-24 lg:grid-cols-[1.15fr_.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-white/5 px-4 py-2 text-sm font-semibold text-teal-100">
              <Sparkles size={16} className="text-coral-300" />
              Built in Hialeah, Florida
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-7xl">
              Software built to solve{" "}
              <span className="text-coral-300">real work.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-teal-50/75 sm:text-xl">
              Tropic Wave Solutions LLC designs, builds, and operates web apps,
              SaaS tools, business applications, integrations, and automation.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <AppLink href="/services" className="button button-coral">
                See what we do <ArrowRight size={18} />
              </AppLink>
              <AppLink href="/contact" className="button button-ghost">
                Get in touch
              </AppLink>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="relative mx-auto hidden aspect-square w-full max-w-md lg:block"
          >
            <div className="absolute inset-7 rotate-6 rounded-[4rem] border border-teal-200/25 bg-white/5 backdrop-blur" />
            <div className="absolute inset-16 -rotate-3 rounded-[3.4rem] bg-teal-700/65 shadow-2xl" />
            <img
              src="/logo.svg"
              alt="Tropic Wave Solutions"
              className="absolute inset-24 rounded-[2.6rem] shadow-2xl"
            />
            <div className="absolute bottom-7 right-0 rounded-2xl border border-white/15 bg-teal-900/85 px-5 py-4 shadow-xl backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-widest text-coral-300">
                Our focus
              </p>
              <p className="mt-1 font-semibold">Useful. Clear. Sustainable.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <FadeIn className="mb-12 max-w-2xl">
            <p className="eyebrow">A focused approach</p>
            <h2 className="section-title">
              Small, useful products with clear purpose.
            </h2>
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Code2,
                title: "Custom software",
                text: "Purpose-built applications designed around real business needs, users, and workflows.",
              },
              {
                icon: Layers3,
                title: "Product engineering",
                text: "From product definition and interface design through development, launch, and ongoing improvement.",
              },
              {
                icon: Sparkles,
                title: "Integrations and automation",
                text: "Connected systems and focused automation that reduce repetitive work and keep information moving.",
              },
            ].map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.08} className="info-card">
                <item.icon className="mb-8 text-teal-700" size={30} />
                <h3 className="text-xl font-bold text-teal-950">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-teal-50">
        <div className="shell grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <FadeIn>
            <p className="eyebrow">How we work</p>
            <h2 className="section-title">
              Deliberate work, without the noise.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              We focus on understandable experiences, responsible data
              practices, and steady improvements. We would rather solve a
              defined problem well than overcomplicate an application.
            </p>
            <AppLink href="/about" className="mt-8 inline-flex items-center gap-2 font-bold text-teal-800 hover:text-teal-600">
              More about the company <ArrowRight size={18} />
            </AppLink>
          </FadeIn>
          <FadeIn className="rounded-[2rem] bg-teal-950 p-8 text-white sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-coral-300">
              Our operating principles
            </p>
            <ul className="mt-8 space-y-5">
              {[
                "Make the useful path easy to understand.",
                "Collect only the data a feature needs.",
                "Maintain what we build over time.",
                "Communicate plainly and honestly.",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-lg text-teal-50/85">
                  <Check className="mt-1 shrink-0 text-teal-300" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <CallToAction />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About us" title="A Florida software company building useful applications.">
        Tropic Wave Solutions LLC is a software company based in Hialeah,
        Florida. We design, build, and operate software applications for
        businesses, professionals, and focused user communities.
      </PageIntro>
      <section className="section">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <FadeIn className="rounded-[2rem] bg-teal-950 p-8 text-white sm:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-coral-300">
              Our aim
            </p>
            <p className="mt-6 text-3xl font-bold leading-tight">
              Create straightforward software that makes real work easier to
              complete.
            </p>
          </FadeIn>
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight text-teal-950">
              What that means in practice
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600">
              <p>
                Our work spans custom software design and development, product
                engineering, web and mobile applications, and the integrations
                that connect them. We build around a specific workflow and keep
                the interface clear.
              </p>
              <p>
                We also handle the less visible work that keeps software useful:
                maintenance, quality checks, product updates, performance,
                privacy, and customer support.
              </p>
              <p>
                We are a small business. This site does not claim a team size,
                customer count, award history, or reach that we cannot
                substantiate.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
      <section className="section bg-teal-50">
        <div className="shell">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Our standards</p>
            <h2 className="section-title">Clarity is part of the product.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              We favor plain language, accessible interfaces, measured
              performance, and data practices that can be explained without
              fine print.
            </p>
          </FadeIn>
        </div>
      </section>
      <CallToAction />
    </>
  );
}

function ServicesPage() {
  const services = [
    {
      icon: Code2,
      title: "Custom software design and development",
      text: "We turn defined business needs into maintainable software, with clear scope, thoughtful interaction design, and dependable implementation.",
      points: [
        "Workflow and requirements discovery",
        "Interface and system design",
        "Development, testing, and launch",
      ],
    },
    {
      icon: Layers3,
      title: "Product engineering",
      text: "We build and improve software products across their lifecycle, balancing user experience, technical quality, and practical operating needs.",
      points: [
        "Product definition and prototyping",
        "Iterative feature development",
        "Maintenance and improvement",
      ],
    },
    {
      icon: Smartphone,
      title: "Web and mobile applications",
      text: "We create responsive applications and SaaS tools that make focused workflows available wherever users need them.",
      points: [
        "Responsive web applications",
        "Mobile-ready product experiences",
        "Accessible, task-focused interfaces",
      ],
    },
    {
      icon: Workflow,
      title: "Integrations and automation",
      text: "We connect software and automate repeatable processes so teams spend less time moving information by hand.",
      points: [
        "API and platform integrations",
        "Business process automation",
        "Monitoring and reliability",
      ],
    },
  ];

  return (
    <>
      <PageIntro eyebrow="What we do" title="Software shaped around the work it needs to support.">
        We design, build, integrate, and operate software applications—from
        custom business tools to our own focused products.
      </PageIntro>
      <section className="section">
        <div className="shell space-y-6">
          {services.map((service, index) => (
            <FadeIn
              key={service.title}
              className="grid grid-cols-1 gap-8 rounded-[2rem] border border-teal-950/10 bg-white p-7 shadow-sm sm:p-10 lg:grid-cols-[.85fr_1.15fr]"
            >
              <div>
                <service.icon
                  className="mb-7 rounded-xl bg-teal-100 p-3 text-teal-800"
                  size={52}
                />
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral-600">
                  0{index + 1}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-teal-950">
                  {service.title}
                </h2>
              </div>
              <div>
                <p className="text-lg leading-8 text-slate-600">{service.text}</p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 font-medium text-slate-700"
                    >
                      <Check
                        className="mt-0.5 shrink-0 text-teal-600"
                        size={19}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
      <section className="section bg-teal-50">
        <div className="shell">
          <FadeIn className="mb-12 max-w-2xl">
            <p className="eyebrow">Our products</p>
            <h2 className="section-title">Applications we build and operate.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Our product work reflects the same practical approach we bring to
              custom software: start with a specific workflow, then make it
              easier to complete.
            </p>
          </FadeIn>
          <div className="grid gap-6 lg:grid-cols-2">
            <FadeIn className="info-card flex flex-col">
              <PanelsTopLeft className="mb-8 text-teal-700" size={32} />
              <h3 className="text-2xl font-bold text-teal-950">ReviewKeeper</h3>
              <p className="mt-3 flex-1 leading-7 text-slate-600">
                A workflow tool for Amazon creators to organize review-related
                product information and work more efficiently.
              </p>
              <a
                href="https://reviewkeeper.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 font-bold text-teal-800 hover:text-teal-600"
              >
                Visit ReviewKeeper <ExternalLink size={17} />
              </a>
            </FadeIn>
            <FadeIn className="info-card" delay={0.08}>
              <Sparkles className="mb-8 text-teal-700" size={32} />
              <h3 className="text-2xl font-bold text-teal-950">
                Therapy session-note assistant
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                A note-writing tool that helps therapy providers draft
                structured session notes more efficiently. It is described here
                only in general terms and is not linked publicly.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}

function ContactDetails() {
  return (
    <div className="space-y-4">
      <a
        href={`mailto:${SUPPORT_EMAIL}`}
        className="contact-row"
      >
        <Mail size={21} />
        <span>{SUPPORT_EMAIL}</span>
      </a>
      <a href={`tel:${PHONE_LINK}`} className="contact-row">
        <Phone size={21} />
        <span>{PHONE_DISPLAY}</span>
      </a>
      <div className="contact-row">
        <MapPin size={21} />
        <span>Hialeah, Florida</span>
      </div>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          access_key: WEB3FORMS_KEY,
          subject: "Tropic Wave Solutions website inquiry",
          from_name: "Tropic Wave Solutions website",
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("Submission failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-7 shadow-xl sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">
          Name
          <input className="field" name="name" autoComplete="name" required />
        </label>
        <label className="field-label">
          Email
          <input
            className="field"
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </label>
      </div>
      <label className="field-label mt-5">
        Phone <span className="font-normal text-slate-400">(optional)</span>
        <input
          className="field"
          type="tel"
          name="phone"
          autoComplete="tel"
        />
      </label>
      <label className="field-label mt-5">
        How can we help?
        <textarea className="field min-h-36 resize-y" name="message" required />
      </label>
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="button button-dark mt-6 w-full"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        {status !== "sending" && <ArrowRight size={18} />}
      </button>
      <div aria-live="polite" className="mt-4 min-h-6 text-sm">
        {status === "sent" && (
          <p className="font-semibold text-teal-700">
            Thanks — your message has been sent.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-700">
            We could not send the form. Please email{" "}
            <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contact" title="Let’s start a useful conversation.">
        Questions about Tropic Wave Solutions or one of our products? Reach us
        by email or phone. We do not publish a street address.
      </PageIntro>
      <section className="section bg-teal-50">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <FadeIn>
            <h2 className="text-2xl font-bold text-teal-950">Contact details</h2>
            <p className="mb-8 mt-3 leading-7 text-slate-600">
              Send a note with enough context for us to route your question.
            </p>
            <ContactDetails />
          </FadeIn>
          <FadeIn>
            {WEB3FORMS_KEY ? (
              <ContactForm />
            ) : (
              <div className="rounded-[2rem] bg-white p-8 shadow-xl sm:p-12">
                <Mail className="text-teal-700" size={38} />
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-teal-950">
                  Email us directly
                </h2>
                <p className="mt-4 max-w-lg leading-7 text-slate-600">
                  Our secure contact form is not configured on this build. You
                  can still reach us using your email app.
                </p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=Tropic%20Wave%20Solutions%20inquiry`}
                  className="button button-dark mt-8"
                >
                  Email {SUPPORT_EMAIL}
                  <ExternalLink size={17} />
                </a>
              </div>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}

function LegalPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageIntro eyebrow={eyebrow} title={title}>
        Last updated: October 24, 2026
      </PageIntro>
      <main className="section pt-8">
        <article className="legal shell">{children}</article>
      </main>
    </>
  );
}

function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy">
      <p>
        This Privacy Policy explains how Tropic Wave Solutions LLC, a Florida
        limited liability company (&quot;Tropic Wave Solutions,&quot;
        &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), collects, uses,
        and protects information when you use our websites, software, and
        related services (collectively, the &quot;Services&quot;).
      </p>

      <h2>1. Information we collect</h2>
      <p>
        We may collect information you provide directly, such as your name,
        email address, phone number, message content, account details, and
        support requests. Depending on the Service, we may also receive basic
        technical and usage information such as browser type, device type, IP
        address, pages viewed, referring page, and approximate location derived
        from IP address.
      </p>
      <p>
        If you use a product that supports an account, we may store account
        identifiers, settings, and information needed to provide that
        product&apos;s features. A specific product may provide additional
        notices where its data practices differ from this general policy.
      </p>

      <h2>2. How we use information</h2>
      <ul>
        <li>Provide, operate, maintain, and improve the Services.</li>
        <li>Respond to questions, support requests, and other communications.</li>
        <li>Protect the security, integrity, and availability of the Services.</li>
        <li>Comply with law and enforce our agreements.</li>
        <li>Understand general usage so we can improve product experience.</li>
      </ul>

      <h2>3. Connected third-party platforms</h2>
      <p>
        If you choose to connect an account from a third-party platform such as
        Meta, Facebook, Instagram, TikTok, or Pinterest to one of our apps, we
        access and use platform data only to provide the feature you requested.
        The exact data depends on the permissions you approve and may include a
        platform account identifier, profile information, posts or media,
        performance information, or authorization tokens. We do not sell this
        platform data. We do not use it for unrelated advertising. You may
        disconnect an account through the relevant app or platform where that
        option is available, and you may request deletion at any time by
        emailing{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>

      <h2>4. When we share information</h2>
      <p>
        We may share information with service providers that help us host,
        secure, analyze, or support the Services, but only as needed for them to
        perform work for us. We may also disclose information when required by
        law, to protect rights or safety, in connection with a business
        transaction, or with your direction or consent. We do not sell personal
        information.
      </p>

      <h2>5. Cookies and similar technologies</h2>
      <p>
        Our Services may use cookies or local storage that are necessary for
        features, security, preferences, or basic measurement. Third-party
        websites linked from our content have their own privacy practices.
      </p>

      <h2>6. Data retention</h2>
      <p>
        We keep information only as long as reasonably necessary for the
        purposes described in this policy, to provide the Services, resolve
        disputes, maintain security, and meet legal obligations. Retention
        periods vary by data type and product.
      </p>

      <h2>7. Data deletion and your choices</h2>
      <p>
        You may ask us to access, correct, or delete information associated with
        you by emailing <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        Please identify the product or connected account involved. We may need
        to verify your request. We process valid deletion requests within 30
        days, except where limited retention is required by law or needed for
        security, fraud prevention, or legal claims. Step-by-step instructions
        are available on our <AppLink href="/data-deletion">Data Deletion page</AppLink>.
      </p>

      <h2>8. Security</h2>
      <p>
        We use reasonable administrative and technical safeguards designed to
        protect information. No internet transmission or storage method is
        completely secure, so we cannot guarantee absolute security.
      </p>

      <h2>9. Children&apos;s privacy</h2>
      <p>
        The Services are not directed to children under 13, and we do not
        knowingly collect personal information from children under 13. Contact
        us if you believe a child has provided information to us.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this policy as our Services or legal obligations change.
        We will post the revised policy here and update the date above.
      </p>

      <h2>11. Contact us</h2>
      <p>
        Tropic Wave Solutions LLC
        <br />
        Hialeah, Florida
        <br />
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        <br />
        <a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>
      </p>
    </LegalPage>
  );
}

function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Service">
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of websites,
        software, and related services provided by Tropic Wave Solutions LLC, a
        Florida limited liability company (&quot;Tropic Wave Solutions,&quot;
        &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By using a
        Service, you agree to these Terms. If you do not agree, do not use the
        Service.
      </p>

      <h2>1. Eligibility and accounts</h2>
      <p>
        You must be legally able to enter into these Terms. If a Service
        requires an account, you agree to provide accurate information, protect
        your credentials, and notify us of suspected unauthorized use. You are
        responsible for activity under your account.
      </p>

      <h2>2. Permitted use</h2>
      <p>
        We grant you a limited, non-exclusive, non-transferable, revocable right
        to use the Services for their intended purpose, subject to these Terms
        and any product-specific terms.
      </p>
      <p>You may not:</p>
      <ul>
        <li>Use a Service unlawfully or to violate another person&apos;s rights.</li>
        <li>Interfere with security, availability, or normal operation.</li>
        <li>Attempt unauthorized access to accounts, systems, or data.</li>
        <li>Use automated means to overload, scrape, or abuse a Service.</li>
        <li>Reverse engineer a Service except where law expressly permits it.</li>
        <li>Upload malicious code or content you do not have the right to use.</li>
      </ul>

      <h2>3. Connected third-party platforms</h2>
      <p>
        Some apps may let you connect accounts from Meta, Facebook, Instagram,
        TikTok, Pinterest, or another third-party platform. You choose whether
        to connect an account and which permissions to grant. Platform data is
        used only to provide the connected feature, is never sold, and may be
        deleted on request by emailing{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Your use of a
        third-party platform remains subject to that platform&apos;s own terms.
        We are not responsible for changes, outages, or actions by third-party
        platforms.
      </p>

      <h2>4. Your content</h2>
      <p>
        You retain ownership of content you submit. You grant us a limited
        license to host, process, display, and transmit that content only as
        needed to operate and provide the Service. You represent that you have
        the rights required to submit the content.
      </p>

      <h2>5. Our content and intellectual property</h2>
      <p>
        The Services, including their software, design, text, graphics, and
        trademarks, are owned by us or our licensors and protected by
        applicable law. These Terms do not transfer ownership or grant rights
        beyond the limited right to use the Services.
      </p>

      <h2>6. Product-specific terms and third-party services</h2>
      <p>
        A particular software product may include additional terms presented
        within that product. Some features depend on third-party services or
        platforms. Your use of those services is subject to their terms, and we
        are not responsible for their availability, content, or independent
        actions.
      </p>

      <h2>7. Changes and availability</h2>
      <p>
        We may update, suspend, or discontinue all or part of a Service. We do
        not promise uninterrupted or error-free operation. Where practical, we
        will provide notice of material changes that affect active users.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        To the extent permitted by law, the Services are provided &quot;as
        is&quot; and &quot;as available.&quot; We disclaim warranties of
        merchantability, fitness for a particular purpose, non-infringement, and
        any warranties arising from course of dealing or usage of trade.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the extent permitted by law, Tropic Wave Solutions LLC and its
        members, contractors, and service providers will not be liable for
        indirect, incidental, special, consequential, exemplary, or punitive
        damages, or loss of profits, data, goodwill, or business opportunity
        arising from the Services. Nothing in these Terms excludes liability
        that cannot lawfully be limited.
      </p>

      <h2>10. Termination</h2>
      <p>
        You may stop using a Service at any time. We may restrict or terminate
        access if you violate these Terms, create risk, or if a Service is
        discontinued. Provisions that by their nature should survive
        termination will survive.
      </p>

      <h2>11. Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of Florida, without
        regard to conflict-of-law principles. Any dispute that is not subject to
        another written agreement will be brought in a court of competent
        jurisdiction in Florida.
      </p>

      <h2>12. Changes to these Terms</h2>
      <p>
        We may update these Terms. The revised version will be posted here with
        a new effective date. Continued use after an update means you accept the
        revised Terms.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these Terms may be sent to{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or Tropic Wave
        Solutions LLC, Hialeah, Florida.
      </p>
    </LegalPage>
  );
}

function DataDeletionPage() {
  return (
    <LegalPage eyebrow="Privacy" title="Data Deletion Instructions">
      <p>
        You can request deletion of personal information associated with a
        Tropic Wave Solutions LLC website, software product, or connected
        third-party account.
      </p>

      <h2>How to request deletion</h2>
      <ol>
        <li>
          Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the
          address associated with your account when possible.
        </li>
        <li>
          Use the subject line <strong>&quot;Data Deletion Request.&quot;</strong>
        </li>
        <li>
          Name the product or website involved and identify the account you want
          deleted. For a connected platform, state whether it is Meta,
          Facebook, Instagram, TikTok, Pinterest, or another platform. Do not
          email us your password or an access token.
        </li>
        <li>
          We may reply to verify that you control the relevant account before
          completing the request.
        </li>
      </ol>

      <h2>What happens next</h2>
      <p>
        We will delete or de-identify data covered by a valid request within 30
        days and send a confirmation when complete. This includes data received
        from a connected third-party platform that we hold for the feature you
        used. If your request is incomplete, we will ask for the minimum
        additional information needed to locate the data.
      </p>
      <p>
        We may retain limited information where required by law or reasonably
        necessary for security, fraud prevention, dispute resolution, or legal
        claims. We will not use retained information for unrelated purposes.
      </p>

      <h2>Disconnecting a platform account</h2>
      <p>
        You may also revoke an app&apos;s access through the connected
        platform&apos;s account settings. Revoking access stops future access
        but may not delete information already provided to the app, so email us
        if you also want existing data deleted.
      </p>

      <h2>Need help?</h2>
      <p>
        Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or call{" "}
        <a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>. Please do not include
        passwords or sensitive authentication credentials.
      </p>
    </LegalPage>
  );
}

function CallToAction() {
  return (
    <section className="bg-coral-300">
      <div className="shell flex flex-col items-start justify-between gap-8 py-14 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-900">
            Have a question?
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-teal-950">
            We’d be glad to hear from you.
          </h2>
        </div>
        <AppLink href="/contact" className="button button-dark">
          Contact us <ArrowRight size={18} />
        </AppLink>
      </div>
    </section>
  );
}

function NotFoundPage() {
  return (
    <main className="shell flex min-h-[65vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="text-5xl font-black tracking-tight text-teal-950">
        This page drifted away.
      </h1>
      <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
        The address may be outdated, or the page may have moved.
      </p>
      <AppLink href="/" className="button button-dark mt-8">
        Return home <ArrowRight size={18} />
      </AppLink>
    </main>
  );
}

export function App() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    updateMeta(location);
  }, [location]);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800">
      <Header />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/data-deletion" component={DataDeletionPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}
