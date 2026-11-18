import { Link } from "react-router-dom";
import {
  FiSearch,
  FiPlusCircle,
  FiCalendar,
  FiMessageCircle,
  FiArrowRight,
  FiArrowUpRight,
  FiUsers,
  FiBookOpen,
  FiMapPin,
} from "react-icons/fi";

const features = [
  {
    icon: <FiSearch />,
    title: "Discover groups",
    text: "Search by course, faculty or group name and find peers studying what you study.",
  },
  {
    icon: <FiPlusCircle />,
    title: "Create your own",
    text: "Start a group in a minute and automatically become its leader.",
  },
  {
    icon: <FiCalendar />,
    title: "Plan sessions",
    text: "Leaders schedule sessions with date, time and a place or meeting link.",
  },
  {
    icon: <FiMessageCircle />,
    title: "Talk together",
    text: "Share announcements, ask questions and coordinate meetings.",
  },
];

function LandingStyles() {
  return (
    <style>{`
        .landing-redesign {
          --indigo: #3d2c8d; --indigo-dark: #2a1d66; --indigo-soft: #ece9fb;
          --coral: #ff6b57; --amber: #ffb703; --teal: #14b8a6;
          --ink: #1f2140; --muted: #6b6f8d; --bg: #f5f6fb; --card: #ffffff;
          --border: #e3e5f1; --radius: 16px; --shadow: 0 8px 24px rgba(61, 44, 141, 0.08);
          --green: var(--indigo); --lime: var(--coral); --green-deep: var(--indigo-dark);
          --green-soft: var(--indigo-soft); --green-border: var(--border); --green-muted: var(--muted);
          min-height: 100vh; overflow: hidden; color: var(--ink); background: var(--bg);
          font-family: inherit;
        }
        .landing-redesign * { box-sizing: border-box; }
        .landing-redesign .landing-nav, .landing-redesign .hero, .landing-redesign .features,
        .landing-redesign .landing-footer, .landing-redesign .cta-section { width: min(1120px, calc(100% - 48px)); margin-inline: auto; }
        .landing-redesign .landing-nav { height: 88px; display: flex; align-items: center; justify-content: space-between; }
        .landing-redesign .brand { display: flex; align-items: center; gap: 10px; color: var(--ink); font-size: 19px; font-weight: 800; letter-spacing: -.5px; }
        .landing-redesign .brand-mark { display: grid; width: 38px; height: 38px; place-items: center; border-radius: 12px; color: white; background: var(--green); font-size: 13px; letter-spacing: -.5px; }
        .landing-redesign .landing-actions { display: flex; align-items: center; gap: 12px; }
        .landing-redesign .btn { display: inline-flex; align-items: center; justify-content: center; gap: 9px; border-radius: 999px; padding: 11px 20px; font-size: 14px; font-weight: 700; text-decoration: none; transition: transform .2s, box-shadow .2s, background .2s; }
        .landing-redesign .btn:hover { transform: translateY(-2px); }
        .landing-redesign .btn-ghost-light { color: var(--ink); }
        .landing-redesign .btn-ghost-light:hover { background: var(--indigo-soft); }
        .landing-redesign .btn-accent { color: #fff; background: var(--coral); box-shadow: 0 8px 20px #ff6b5744; }
        .landing-redesign .btn-accent:hover { background: color-mix(in srgb, var(--coral) 88%, var(--indigo-dark)); box-shadow: 0 10px 24px #ff6b5755; }
        .landing-redesign .hero { display: grid; grid-template-columns: 1.02fr .98fr; align-items: center; gap: 50px; min-height: 540px; padding: 52px 0 82px; }
        .landing-redesign .hero-text { position: relative; z-index: 1; }
        .landing-redesign .pill { display: inline-flex; align-items: center; gap: 8px; max-width: 100%; padding: 9px 13px; border: 1px solid var(--border); border-radius: 999px; color: var(--indigo); background: var(--indigo-soft); font-size: 11px; font-weight: 700; letter-spacing: .02em; }
        .landing-redesign .hero h1 { max-width: 610px; margin: 22px 0 18px; font-size: clamp(48px, 6vw, 76px); line-height: .99; letter-spacing: -.065em; }
        .landing-redesign .hero h1 span { color: var(--green); }
        .landing-redesign .hero-text > p { max-width: 490px; margin: 0 0 28px; color: var(--muted); font-size: 17px; line-height: 1.75; }
        .landing-redesign .btn-lg { padding: 15px 23px; font-size: 15px; }
        .landing-redesign .hero-proof { display: flex; align-items: center; gap: 12px; margin-top: 30px; color: var(--muted); font-size: 12px; }
        .landing-redesign .avatar-stack { display: flex; padding-left: 5px; }
        .landing-redesign .avatar-stack span { display: grid; width: 29px; height: 29px; margin-left: -5px; place-items: center; border: 2px solid var(--bg); border-radius: 50%; color: var(--indigo-dark); background: color-mix(in srgb, var(--teal) 24%, white); font-size: 9px; font-weight: 800; }
        .landing-redesign .avatar-stack span:nth-child(2) { background: color-mix(in srgb, var(--amber) 38%, white); }
        .landing-redesign .avatar-stack span:nth-child(3) { background: color-mix(in srgb, var(--coral) 23%, white); }
        .landing-redesign .hero-art { position: relative; display: grid; min-height: 400px; place-items: center; border-radius: 34px; background: radial-gradient(circle at 54% 40%, #fff 0, var(--indigo-soft) 55%, color-mix(in srgb, var(--teal) 10%, white) 100%); }
        .landing-redesign .hero-art:before, .landing-redesign .hero-art:after { position: absolute; content: ""; border: 1px solid color-mix(in srgb, var(--indigo) 18%, transparent); border-radius: 50%; }
        .landing-redesign .hero-art:before { width: 280px; height: 280px; }
        .landing-redesign .hero-art:after { width: 360px; height: 360px; }
        .landing-redesign .study-illustration { position: relative; z-index: 1; display: grid; width: 190px; height: 220px; place-items: center; border: 1px solid var(--card); border-radius: 27px; color: var(--indigo); background: linear-gradient(145deg, var(--card), var(--indigo-soft)); box-shadow: var(--shadow); transform: rotate(-5deg); }
        .landing-redesign .study-illustration svg { width: 76px; height: 76px; stroke-width: 1.2; }
        .landing-redesign .study-illustration small { margin-top: -26px; color: var(--muted); font-size: 11px; font-weight: 700; }
        .landing-redesign .float-card { position: absolute; z-index: 2; display: flex; flex-direction: column; gap: 7px; max-width: 235px; padding: 15px 17px; border: 1px solid var(--border); border-radius: 15px; background: var(--card); box-shadow: var(--shadow); animation: landing-float 5s ease-in-out infinite; }
        .landing-redesign .float-card b { color: var(--ink); font-size: 12px; }
        .landing-redesign .float-card small { color: var(--muted); font-size: 10px; }
        .landing-redesign .float-card.c1 { top: 54px; left: -24px; }
        .landing-redesign .float-card.c2 { right: -24px; bottom: 76px; animation-delay: -1.7s; }
        .landing-redesign .float-card.c3 { bottom: 25px; left: 30px; animation-delay: -3s; }
        @keyframes landing-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        .landing-redesign .features-section { padding: 76px 0 82px; background: color-mix(in srgb, var(--indigo) 4%, var(--bg)); }
        .landing-redesign .section-heading { max-width: 570px; margin: 0 auto 38px; text-align: center; }
        .landing-redesign .eyebrow { color: var(--green); font-size: 11px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
        .landing-redesign .section-heading h2 { margin: 12px 0; font-size: clamp(30px, 4vw, 42px); letter-spacing: -.045em; }
        .landing-redesign .section-heading p { margin: 0; color: var(--muted); font-size: 15px; line-height: 1.7; }
        .landing-redesign .features { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .landing-redesign .feature { padding: 24px 21px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--card); transition: transform .2s, box-shadow .2s; }
        .landing-redesign .feature:hover { transform: translateY(-5px); box-shadow: var(--shadow); }
        .landing-redesign .feature-icon { display: grid; width: 44px; height: 44px; place-items: center; border-radius: 13px; color: var(--indigo); background: var(--indigo-soft); font-size: 20px; }
        .landing-redesign .feature h3 { margin: 18px 0 8px; font-size: 16px; letter-spacing: -.02em; }
        .landing-redesign .feature p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.7; }
        .landing-redesign .cta-section { display: flex; align-items: center; justify-content: space-between; gap: 30px; margin-top: 76px; margin-bottom: 76px; padding: 42px 48px; border-radius: 25px; color: #fff; background: var(--indigo-dark); }
        .landing-redesign .cta-copy { max-width: 600px; }
        .landing-redesign .cta-copy h2 { margin: 0 0 10px; font-size: clamp(26px, 4vw, 36px); letter-spacing: -.045em; }
        .landing-redesign .cta-copy p { margin: 0; color: color-mix(in srgb, white 82%, var(--indigo-soft)); font-size: 14px; line-height: 1.65; }
        .landing-redesign .cta-section .btn { flex: 0 0 auto; }
        .landing-redesign .landing-footer { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 24px 0 30px; border-top: 1px solid var(--border); color: var(--muted); font-size: 12px; }
        .landing-redesign .footer-brand { color: var(--ink); font-weight: 800; }
        @media (max-width: 800px) {
          .landing-redesign .hero { grid-template-columns: 1fr; gap: 42px; padding-top: 42px; }
          .landing-redesign .hero-art { width: min(100%, 520px); margin-inline: auto; }
          .landing-redesign .features { grid-template-columns: repeat(2, 1fr); }
          .landing-redesign .cta-section { margin-top: 55px; margin-bottom: 55px; }
        }
        @media (max-width: 520px) {
          .landing-redesign .landing-nav, .landing-redesign .hero, .landing-redesign .features, .landing-redesign .landing-footer, .landing-redesign .cta-section { width: min(100% - 32px, 1120px); }
          .landing-redesign .landing-nav { height: 72px; }
          .landing-redesign .brand { font-size: 16px; }
          .landing-redesign .landing-actions { gap: 2px; }
          .landing-redesign .landing-actions .btn { padding: 10px 13px; font-size: 12px; }
          .landing-redesign .hero { min-height: unset; padding: 40px 0 58px; }
          .landing-redesign .hero h1 { font-size: 52px; }
          .landing-redesign .hero-text > p { font-size: 15px; }
          .landing-redesign .pill { border-radius: 14px; line-height: 1.5; }
          .landing-redesign .hero-art { min-height: 320px; border-radius: 25px; }
          .landing-redesign .hero-art:before { width: 220px; height: 220px; }
          .landing-redesign .hero-art:after { width: 285px; height: 285px; }
          .landing-redesign .study-illustration { width: 150px; height: 178px; }
          .landing-redesign .float-card { max-width: 185px; padding: 12px; }
          .landing-redesign .float-card.c1 { left: -8px; top: 35px; }
          .landing-redesign .float-card.c2 { right: -8px; bottom: 60px; }
          .landing-redesign .float-card.c3 { left: 10px; bottom: 20px; }
          .landing-redesign .features-section { padding: 58px 0; }
          .landing-redesign .features { gap: 11px; }
          .landing-redesign .feature { padding: 17px 14px; }
          .landing-redesign .feature h3 { font-size: 14px; }
          .landing-redesign .feature p { font-size: 12px; }
          .landing-redesign .cta-section { flex-direction: column; align-items: flex-start; padding: 30px 24px; border-radius: 20px; }
          .landing-redesign .landing-footer { align-items: flex-start; flex-direction: column; }
        }
          /* Keep decorative surfaces and accents in step with the active theme colors. */
          .landing-redesign .btn-ghost-light:hover { background: var(--green-soft); }
          .landing-redesign .btn-accent { color: var(--green-deep); }
          .landing-redesign .btn-accent:hover { background: color-mix(in srgb, var(--lime) 82%, white); }
          .landing-redesign .pill { border-color: var(--green-border); color: var(--green-muted); background: var(--green-soft); }
          .landing-redesign .hero-art { background: radial-gradient(circle at 54% 40%, color-mix(in srgb, var(--lime) 55%, white), var(--green-soft) 68%, color-mix(in srgb, var(--green) 13%, white)); }
          .landing-redesign .hero-art:before, .landing-redesign .hero-art:after { border-color: color-mix(in srgb, var(--green) 13%, transparent); }
          .landing-redesign .study-illustration { color: var(--green); background: linear-gradient(145deg, white, var(--green-soft)); }
          .landing-redesign .float-card { border-color: color-mix(in srgb, var(--green) 12%, white); }
          .landing-redesign .float-card b { color: var(--ink); }
          .landing-redesign .features-section { background: color-mix(in srgb, var(--green) 5%, white); }
          .landing-redesign .feature { border-color: color-mix(in srgb, var(--green) 11%, white); }
          .landing-redesign .feature-icon { color: var(--green); background: var(--green-soft); }
          .landing-redesign .cta-section { background: var(--green-deep); }
          .landing-redesign .cta-copy p { color: color-mix(in srgb, white 82%, var(--green)); }
          .landing-redesign .avatar-stack span { border-color: var(--color-background, #fbfcf8); color: var(--green-deep); background: color-mix(in srgb, var(--green) 20%, white); }
          .landing-redesign .avatar-stack span:nth-child(2) { background: color-mix(in srgb, var(--lime) 50%, white); }
          .landing-redesign .avatar-stack span:nth-child(3) { background: color-mix(in srgb, var(--green) 12%, white); }
          .landing-redesign .landing-footer { border-color: color-mix(in srgb, var(--green) 12%, white); }
        @media (prefers-reduced-motion: reduce) { .landing-redesign *, .landing-redesign *:before, .landing-redesign *:after { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
      `}</style>
  );
}

function LandingHeader() {
  return (
      <header className="landing-nav">
        <div className="brand">
          <span className="brand-mark">SG</span> StudyGroup
        </div>
        <nav className="landing-actions" aria-label="Account navigation">
          <Link to="/login" className="btn btn-ghost-light">Log in</Link>
          <Link to="/register" className="btn btn-accent">Sign up <FiArrowUpRight /></Link>
        </nav>
      </header>
  );
}

function HeroSection() {
  return (
        <section className="hero">
          <div className="hero-text">
            <span className="pill"><FiMapPin /> Uganda Christian University · Bishop Barham University College</span>
            <h1>Make studying <span>better together.</span></h1>
            <p>Find your people, share what you know, and make every study session count. Your next great study group is just around the corner.</p>
            <Link to="/register" className="btn btn-accent btn-lg">Find your study group <FiArrowRight /></Link>
            <div className="hero-proof">
              <div className="avatar-stack" aria-hidden="true"><span>AK</span><span>JM</span><span>PO</span></div>
              <span>Good things happen when students learn together.</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Study groups and upcoming sessions">
            <div className="study-illustration"><FiBookOpen /><small>LEARN TOGETHER</small></div>
            <div className="float-card c1"><b>Database Design &amp; Management</b><small><FiUsers /> BIT2201 · 12 members</small></div>
            <div className="float-card c2"><b>Web Development</b><small>Fri 15:00 · Google Meet</small></div>
            <div className="float-card c3"><b>Accounting &amp; Finance</b><small>BBA1102 · Block B</small></div>
          </div>
        </section>
  );
}

function FeaturesSection() {
  return (
        <section className="features-section">
          <div className="section-heading">
            <span className="eyebrow">A smarter way to study</span>
            <h2>Everything clicks when you learn together.</h2>
            <p>From finding the right classmates to planning your next session, we make it simple to keep learning moving.</p>
          </div>
          <div className="features">
            {features.map((feature) => (
              <article key={feature.title} className="feature">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>
  );
}

function CallToActionSection() {
  return (
        <section className="cta-section">
          <div className="cta-copy">
            <h2>Your next study session starts here.</h2>
            <p>Meet classmates who share your goals. Create or join a group and make your next class feel a little easier.</p>
          </div>
          <Link to="/register" className="btn btn-accent">Join the community <FiArrowRight /></Link>
        </section>
  );
}

function LandingFooter() {
  return (
      <footer className="landing-footer">
        <span className="footer-brand">StudyGroup</span>
        <span>© {new Date().getFullYear()} Student Study Group Finder · Learn better, together.</span>
      </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="landing landing-redesign">
      <LandingStyles />
      <LandingHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CallToActionSection />
      </main>
      <LandingFooter />
    </div>
  );
}
