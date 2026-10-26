import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useParams, Navigate } from "react-router-dom";
import {
  ArrowDownToLine, ArrowLeft, ArrowRight, Award, Bug, ClipboardList, Compass, Eye, GraduationCap, Linkedin,
  ListChecks, Mail, MapPin, Menu, Phone, Search, Target, X,
} from "lucide-react";
import { me, stats, roles, matrix, tools, principles, certs, proof, help } from "./data.js";

const links = [["/", "Home"], ["/about", "About"], ["/experience", "Work"], ["/skills", "Skills"], ["/contact", "Contact"]];
const card = "relative rounded-2xl bg-white p-6 shadow-xl shadow-deep/10 ring-1 ring-deep/5";
const wrap = "mx-auto max-w-6xl px-6";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const Stroke = ({ className = "" }) => (
  <svg aria-hidden viewBox="0 0 200 12" preserveAspectRatio="none" className={`h-3 text-violet ${className}`}>
    <path d="M2 8 C 40 2, 70 12, 110 5 S 170 4, 198 7" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

/* Button with two tape strips on its corners */
function TapeBtn({ to, href, children, dark, download }) {
  const cls = `relative inline-flex items-center gap-2 rounded-lg px-7 py-3.5 font-semibold shadow-lg transition hover:-translate-y-0.5 ${dark ? "bg-deep text-white" : "bg-violet text-white"}`;
  const inner = (
    <>
      <i className="tape -left-3 -top-2 h-4 w-9 -rotate-45" />
      <i className="tape2 tape -bottom-2 -right-3 h-4 w-9 -rotate-45" style={{ background: "var(--color-tape2)" }} />
      {children}
    </>
  );
  return to ? <Link to={to} className={cls}>{inner}</Link> : <a href={href} download={download} className={cls}>{inner}</a>;
}

function Head({ title, sub, light }) {
  return (
    <div className="mb-12 text-center">
      <h2 className={`font-display text-3xl font-bold sm:text-4xl ${light ? "text-white" : "text-deep"}`}>{title}</h2>
      <Stroke className="mx-auto mt-2 w-28" />
      {sub && <p className={`mx-auto mt-4 max-w-xl ${light ? "text-white/70" : "text-ink/70"}`}>{sub}</p>}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  const cls = ({ isActive }) => `relative px-3 py-2 text-sm font-medium ${isActive ? "text-violet" : "text-ink hover:text-violet"}`;
  const item = ([to, l]) => (
    <NavLink key={to} to={to} end={to === "/"} className={cls}>
      {({ isActive }) => (<>{l}{isActive && <Stroke className="absolute inset-x-2 -bottom-1 w-[calc(100%-1rem)]" />}</>)}
    </NavLink>
  );
  return (
    <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur">
      <div className={`${wrap} flex items-center justify-between py-4`}>
        <Link to="/" className="flex items-center gap-3 font-display text-lg font-bold text-deep">
          <span className="relative grid h-10 w-10 place-items-center rounded-lg bg-deep text-sm text-white">NB<i className="tape -right-2 -top-1 h-3 w-6 rotate-45" /></span>
          {me.short}
        </Link>
        <nav className="hidden items-center gap-3 md:flex">
          {links.map(item)}
          <span className="ml-4"><TapeBtn href={me.cv} download>CV <ArrowDownToLine size={16} /></TapeBtn></span>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="flex flex-col gap-1 border-t border-deep/10 px-6 pb-4 pt-2 md:hidden">{links.map(item)}</nav>}
    </header>
  );
}

/* Taped polaroid. Save her picture as public/photo.jpg */
function Photo({ className = "" }) {
  const [ok, setOk] = useState(true);
  return (
    <div className={`relative rotate-3 bg-white p-4 pb-6 shadow-2xl shadow-deep/25 ${className}`}>
      <i className="tape -top-4 left-1/2 h-7 w-28 -translate-x-1/2 -rotate-3" />
      <div className="aspect-[4/5] overflow-hidden bg-deep">
        {ok ? (
          <img src="/photo.jpg" alt={`Portrait of ${me.short}`} onError={() => setOk(false)} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full place-items-center p-6 text-center text-white/70">
            <div><div className="font-display text-7xl font-bold text-white">NB</div><p className="mt-3 text-sm">Add your photo as<br />public/photo.jpg</p></div>
          </div>
        )}
      </div>
      <p className="mt-4 text-center font-[family-name:var(--font-hand)] text-3xl text-deep">Hi, I’m Nasirat!</p>
    </div>
  );
}

function Num({ n }) {
  return <span className="inline-block -rotate-3 rounded bg-tape px-2 py-0.5 font-display text-sm font-bold text-deep">{String(n).padStart(2, "0")}</span>;
}

function RoleCard({ r, n }) {
  return (
    <article className={`${card} flex flex-col`}>
      <i className="tape -right-4 -top-2 h-5 w-16 rotate-[35deg]" />
      <Num n={n} />
      <h3 className="mt-4 font-display text-2xl font-bold text-deep">{r.org}</h3>
      <p className="text-sm font-medium text-violet">{r.sub}</p>
      <p className="mt-3 font-semibold">{r.title}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/80">{r.scope}</p>
      <div className="mt-6"><TapeBtn to={`/experience/${r.slug}`}>View details <ArrowRight size={16} /></TapeBtn></div>
    </article>
  );
}

const helpIcons = [ClipboardList, Bug, Compass];
const princIcons = [Eye, Search, ListChecks, Target];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className={`${wrap} grid items-center gap-16 py-14 lg:grid-cols-[1.3fr_1fr] lg:py-24`}>
        <div>
          <span className="inline-block -rotate-2 rounded bg-tape2 px-3 py-1 text-sm font-semibold text-deep">{me.role} · {me.location}</span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] text-deep sm:text-5xl lg:text-6xl">
            I turn user feedback into products{" "}
            <span className="relative inline-block">teams can ship<Stroke className="absolute -bottom-2 left-0 w-full" /></span>.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/80">
            Junior Product Manager with hands-on fintech experience across a BNPL product and a crypto wallet and P2P exchange platform.
            Currently Product Lead on Haven. Google PM Certified.
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            <TapeBtn to="/experience">View my work <ArrowRight size={18} /></TapeBtn>
            <TapeBtn href={me.cv} download dark>Download CV <ArrowDownToLine size={18} /></TapeBtn>
          </div>
        </div>
        <Photo className="mx-auto w-full max-w-sm" />
      </section>

      {/* WORKED ON */}
      <section className="bg-deep py-8 text-white">
        <div className={`${wrap} flex flex-wrap items-center justify-center gap-x-10 gap-y-3`}>
          <span className="font-[family-name:var(--font-hand)] text-2xl text-tape">Products I’ve worked on:</span>
          {roles.map((r) => <span key={r.slug} className="font-display text-xl font-bold">{r.org}</span>)}
        </div>
      </section>

      {/* STATS */}
      <section className={`${wrap} grid gap-6 py-20 sm:grid-cols-2 lg:grid-cols-4`}>
        {stats.map((s, i) => (
          <div key={s.t} className={`${card} ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
            <div className="font-display text-5xl font-bold text-violet">{s.n}</div>
            <p className="mt-2 text-sm leading-snug text-ink/80">{s.t}</p>
          </div>
        ))}
      </section>

      {/* FEATURED WORK */}
      <section className={`${wrap} pb-24`}>
        <Head title="Featured work" sub="Three product roles across mental health and fintech." />
        <div className="grid gap-8 lg:grid-cols-3">{roles.map((r, i) => <RoleCard key={r.slug} r={r} n={i + 1} />)}</div>
      </section>

      {/* HOW I HELP */}
      <section className="bg-deep py-24 text-white">
        <div className={wrap}>
          <Head light title="How I can help your team" sub="Where I add the most value, with the product where I did it." />
          <div className="grid gap-8 md:grid-cols-3">
            {help.map((h, i) => {
              const Icon = helpIcons[i];
              return (
                <div key={h.t} className="relative rounded-2xl bg-white/5 p-7 ring-1 ring-white/15">
                  <i className="tape -left-3 -top-2 h-5 w-16 -rotate-[30deg]" />
                  <Icon className="text-tape" size={30} />
                  <h3 className="mt-4 font-display text-xl font-bold">{h.t}</h3>
                  <p className="mt-2 leading-relaxed text-white/75">{h.d}</p>
                  <p className="mt-4 font-[family-name:var(--font-hand)] text-2xl text-tape2">from {h.from}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className={`${wrap} py-24`}>
        <Head title="Proof beyond the job title" sub="Credentials and real hands-on work." />
        <div className="grid gap-6 sm:grid-cols-2">
          {proof.map((p) => (
            <div key={p.t} className={`${card} flex items-start gap-4`}>
              <Award className="mt-1 shrink-0 text-violet" />
              <div><h3 className="font-display text-xl font-bold text-deep">{p.t}</h3><p className="mt-1 text-sm text-ink/80">{p.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW I WORK */}
      <section className="bg-white py-24">
        <div className={wrap}>
          <Head title="How I work" sub="Principles that show up in my day-to-day." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => {
              const Icon = princIcons[i];
              return (
                <div key={p.t} className={`${card} ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
                  <Icon className="text-violet" size={28} />
                  <h3 className="mt-3 font-display text-xl font-bold text-deep">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">{p.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className={`${wrap} py-24`}>
        <Head title="Tools I use" />
        <ul className="flex flex-wrap justify-center gap-4">
          {tools.map((t, i) => <li key={t} className={`${i % 2 ? "rotate-2 bg-tape" : "-rotate-2 bg-tape2"} rounded-md px-5 py-2.5 font-semibold text-deep shadow-md`}>{t}</li>)}
        </ul>
      </section>

      <CTA />
    </>
  );
}

function CTA() {
  return (
    <section className={`${wrap} pb-24`}>
      <div className="relative rounded-3xl bg-violet p-10 text-center text-white sm:p-16">
        <i className="tape -left-4 top-6 h-6 w-24 -rotate-[35deg]" />
        <i className="tape -right-4 bottom-6 h-6 w-24 -rotate-[35deg]" style={{ background: "var(--color-tape2)" }} />
        <h2 className="font-display text-3xl font-bold sm:text-5xl">Hiring a junior product manager?</h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-white/85">Tell me about your product. I’d love to help your team turn feedback into shipped work.</p>
        <div className="mt-9 flex justify-center"><TapeBtn to="/contact" dark>Get in touch <ArrowRight size={18} /></TapeBtn></div>
      </div>
    </section>
  );
}

function PageHead({ title, sub }) {
  return (
    <div className="pb-12 pt-14 text-center">
      <h1 className="font-display text-4xl font-bold text-deep sm:text-5xl">{title}</h1>
      <Stroke className="mx-auto mt-2 w-32" />
      {sub && <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">{sub}</p>}
    </div>
  );
}

function About() {
  return (
    <div className={`${wrap} pb-24`}>
      <PageHead title="About me" sub="Organised, analytical and focused on getting work tested and released." />
      <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.6fr]">
        <Photo className="mx-auto w-full max-w-xs lg:sticky lg:top-28" />
        <div>
          <p className="text-lg leading-relaxed">
            I’m a detail-oriented product professional with hands-on fintech experience across a BNPL product and a crypto wallet and
            P2P exchange platform, covering user feedback, requirements, testing and release support.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            Today I’m Product Lead on a team building Haven, where I turn requirements into user stories, prioritise the backlog and
            follow up on actions and timelines. I’m analytical, organised and execution-focused, with strong written communication.
          </p>
          <h2 className="mt-12 font-display text-2xl font-bold text-deep">How I work</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {principles.map((p) => <div key={p.t} className={card}><h3 className="font-display text-lg font-bold text-deep">{p.t}</h3><p className="mt-1 text-sm leading-relaxed">{p.d}</p></div>)}
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            <div className={card}><Award className="text-violet" /><h3 className="mt-2 font-display text-xl font-bold text-deep">Certifications</h3>
              <ul className="mt-3 space-y-2 text-sm">{certs.map((c) => <li key={c}>{c}</li>)}</ul></div>
            <div className={card}><GraduationCap className="text-violet" /><h3 className="mt-2 font-display text-xl font-bold text-deep">Education</h3>
              <p className="mt-3 text-sm">B.Ed, Education and English Language</p><p className="text-sm text-ink/70">Obafemi Awolowo University (2025)</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <div className={`${wrap} pb-24`}>
      <PageHead title="My work" sub="Open any role to see what I did." />
      <div className="grid gap-8 lg:grid-cols-3">{roles.map((r, i) => <RoleCard key={r.slug} r={r} n={i + 1} />)}</div>
    </div>
  );
}

function RoleDetail() {
  const { slug } = useParams();
  const i = roles.findIndex((r) => r.slug === slug);
  if (i < 0) return <Navigate to="/experience" replace />;
  const r = roles[i], next = roles[(i + 1) % roles.length];
  return (
    <div className={`${wrap} pb-24 pt-10`}>
      <Link to="/experience" className="inline-flex items-center gap-2 text-sm font-semibold text-violet"><ArrowLeft size={16} /> All work</Link>
      <PageHead title={r.title} sub={`${r.org} · ${r.sub}`} />
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h2 className="font-display text-2xl font-bold text-deep">Scope</h2>
          <p className="mt-3 text-lg leading-relaxed">{r.scope}</p>
          <h2 className="mb-5 mt-10 font-display text-2xl font-bold text-deep">What I did</h2>
          <ul className="space-y-5">
            {r.points.map((p, k) => <li key={p} className={`${card} flex gap-4 leading-relaxed`}><Num n={k + 1} /><span>{p}</span></li>)}
          </ul>
        </div>
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className={card}>
            <i className="tape -right-3 -top-2 h-5 w-16 rotate-[30deg]" />
            <h3 className="font-display text-lg font-bold text-deep">Skills applied</h3>
            <ul className="mt-3 flex flex-wrap gap-2">{r.skills.map((s) => <li key={s} className="rounded-md bg-tape/60 px-3 py-1 text-sm font-medium text-deep">{s}</li>)}</ul>
          </div>
          <Link to={`/experience/${next.slug}`} className={`${card} block hover:-translate-y-1`}>
            <p className="text-xs uppercase tracking-wider text-ink/60">Next</p>
            <p className="mt-1 font-display text-lg font-bold text-deep">{next.org}</p><p className="text-sm text-ink/70">{next.title}</p>
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Skills() {
  return (
    <div className={`${wrap} pb-24`}>
      <PageHead title="Skills" sub="Each skill, and where I’ve actually used it." />
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-deep/10 ring-1 ring-deep/5">
        <div className="hidden grid-cols-[1.4fr_1fr] bg-deep px-6 py-3 text-sm font-semibold text-white sm:grid"><span>Skill</span><span>Where I’ve applied it</span></div>
        {matrix.map(([s, w]) => (
          <div key={s} className="grid gap-1 border-t border-deep/10 px-6 py-4 first:border-0 sm:grid-cols-[1.4fr_1fr] sm:gap-6">
            <span className="font-semibold text-deep">{s}</span><span className="text-sm text-ink/75 sm:text-base">{w}</span>
          </div>
        ))}
      </div>
      <h2 className="mb-6 mt-16 text-center font-display text-2xl font-bold text-deep">Tools</h2>
      <ul className="flex flex-wrap justify-center gap-4">
        {tools.map((t, i) => <li key={t} className={`${i % 2 ? "rotate-2 bg-tape" : "-rotate-2 bg-tape2"} rounded-md px-5 py-2.5 font-semibold text-deep shadow-md`}>{t}</li>)}
      </ul>
    </div>
  );
}

function Contact() {
  const rows = [
    [Mail, "Email", me.email, `mailto:${me.email}`],
    [Phone, "Phone", me.phone, `tel:${me.phone.replace(/\s/g, "")}`],
    [MapPin, "Location", me.location, null],
    ...(me.linkedin ? [[Linkedin, "LinkedIn", "View profile", me.linkedin]] : []),
  ];
  return (
    <div className="mx-auto max-w-4xl px-6 pb-24">
      <PageHead title="Let’s talk about your product" sub="I’m open to junior product manager roles. Send a message and I’ll reply as soon as I can." />
      <div className="grid gap-6 sm:grid-cols-2">
        {rows.map(([Icon, l, v, href]) => {
          const inner = <><i className="tape -right-3 -top-2 h-5 w-14 rotate-[30deg]" /><Icon className="text-violet" /><p className="mt-3 text-xs uppercase tracking-wider text-ink/60">{l}</p><p className="mt-1 break-words font-display text-lg font-bold text-deep">{v}</p></>;
          return href ? <a key={l} href={href} className={`${card} block transition hover:-translate-y-1`}>{inner}</a> : <div key={l} className={card}>{inner}</div>;
        })}
      </div>
      <div className="mt-10 flex justify-center"><TapeBtn href={me.cv} download>Download CV <ArrowDownToLine size={18} /></TapeBtn></div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollTop />
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/experience/:slug" element={<RoleDetail />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="bg-deep py-10 text-white">
        <div className={`${wrap} flex flex-col items-center justify-between gap-5 sm:flex-row`}>
          <div><p className="font-display text-xl font-bold">{me.name}</p><p className="text-sm text-white/60">{me.role} · {me.location}</p></div>
          <nav className="flex flex-wrap justify-center gap-5 text-sm text-white/80">{links.map(([to, l]) => <Link key={to} to={to} className="hover:text-tape">{l}</Link>)}</nav>
        </div>
        <p className="mt-6 text-center text-xs text-white/50">© 2026 {me.name}</p>
      </footer>
    </div>
  );
}
