import React, { useEffect, useRef, useState } from "react";

/**
 * LUMEN — мінімалістичний односторінковий лендинг стоматологічної клініки
 * з перемикачем світлої/темної теми. Самодостатній компонент: стилі
 * підключені через <style>, без Tailwind і зовнішніх залежностей
 * окрім React. Тема зберігається лише в стані компонента (в пам'яті),
 * без localStorage/sessionStorage.
 */

const services = [
  { tone: "blue", title: "Відбілювання зубів", text: "Естетичне відбілювання без чутливості емалі.",
    icon: <path d="M12 21c-1.5-2-2-4.6-2-7 0-2 .6-3 1.4-3.6.7-.5 1.6-.4 2.2.2.6.6.7 1.5.2 2.2C13 13.5 12 15 12 17M12 3c3 0 6 1.6 6 5.4 0 3-1 5-2 7.6-.4 1-1.6 1.4-2.4.7M12 3c-3 0-6 1.6-6 5.4 0 3 1 5 2 7.6.4 1 1.6 1.4 2.4.7" /> },
  { tone: "coral", title: "Імплантація", text: "Одноетапна імплантація з 3D-плануванням.",
    icon: <><rect x="7" y="3" width="10" height="18" rx="3" /><path d="M10 21v-3M14 21v-3" /></> },
  { tone: "green", title: "Дитяча стоматологія", text: "М'який підхід і лікування без стресу.",
    icon: <><circle cx="12" cy="8" r="4" /><path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6" /></> },
  { tone: "purple", title: "Ортодонтія", text: "Брекети та прозорі елайнери.",
    icon: <path d="M4 8c2 3 4 3 6 0s4-3 6 0 4 3 4 0M4 15c2 3 4 3 6 0s4-3 6 0 4 3 4 0" /> },
  { tone: "blue", title: "Гігієна", text: "Ультразвукове чищення та Air Flow.",
    icon: <path d="M4 12a8 8 0 1 1 16 0M4 12c0 5 3.6 8 8 8s8-3 8-8M9 12h6" /> },
  { tone: "coral", title: "Протезування", text: "Коронки, вініри та знімні протези.",
    icon: <path d="M5 12h14M5 12a7 7 0 0 1 14 0M5 12a7 7 0 0 0 14 0" /> },
];

const steps = [
  { n: "01", title: "Консультація", text: "Огляд, знімки, план лікування." },
  { n: "02", title: "Кошторис", text: "Фіксована ціна без сюрпризів." },
  { n: "03", title: "Лікування", text: "Стерильність і контроль болю." },
  { n: "04", title: "Контроль", text: "Безкоштовний огляд через 2 тижні." },
];

const team = [
  { name: "Ірина Коваль", role: "Терапевт · 14 років" },
  { name: "Олег Дмитрук", role: "Ортодонт · 9 років" },
  { name: "Марта Гнатів", role: "Дитячий · 11 років" },
  { name: "Богдан Іськів", role: "Хірург · 10 років" },
];

const reviews = [
  { name: "Марія К.", sub: "пацієнтка з 2022", color: "#3B7DFF", initials: "МК", text: "Ставили імплант — все пройшло швидко і без болю." },
  { name: "Андрій С.", sub: "батько пацієнтки", color: "#FF6B4A", initials: "АС", text: "Донька вперше не плакала після лікування зубів." },
  { name: "Соломія Т.", sub: "пацієнтка з 2023", color: "#1FAE5D", initials: "СТ", text: "Елайнери зняли за 8 місяців, результат вже помітний." },
];

function Reveal({ children, className = "", ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); io.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? "in" : ""} ${className}`} {...rest}>
      {children}
    </div>
  );
}

export default function DentalLanding() {
  const [theme, setTheme] = useState("light");
  const [form, setForm] = useState({ name: "", phone: "", service: "Консультація" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", phone: "", service: "Консультація" });
  };

  return (
    <div className={`lumen-page ${theme === "dark" ? "theme-dark" : ""}`}>
      <style>{css}</style>

      <header>
        <nav className="wrap navbar">
          <a href="#hero" className="logo"><span className="mark">L</span>LUMEN</a>
          <div className="nav-pill">
            <a href="#hero">Home</a>
            <a href="#services">Послуги</a>
            <a href="#team">Про нас</a>
            <a href="#reviews">Чому ми</a>
            <a href="#contact">Контакти</a>
          </div>
          <div className="nav-right">
            <button
              className="theme-toggle"
              aria-label="Перемкнути тему"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
              )}
            </button>
            <a href="#contact" className="btn btn-cta">Записатися →</a>
          </div>
        </nav>
      </header>

      <section className="hero" id="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              Щаслива усмішка
            </span>
            <h1>Ваша усмішка.<br />Наша <em>турбота</em>.</h1>
            <p className="lead">LUMEN — стоматологія повного циклу у Львові. Незалежно від того, чи це плановий огляд, чи складне лікування, наша команда подбає, щоб усмішка залишалась здоровою.</p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-cta">Записатись онлайн</a>
              <a href="#contact" className="btn btn-outline">
                <span className="play-dot">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
                Відеодзвінок
              </a>
            </div>
            <div className="hero-people">
              <div className="avatar-stack">
                <span style={{ background: "#3B7DFF" }}>АК</span>
                <span style={{ background: "#FF6B4A" }}>МТ</span>
                <span style={{ background: "#1FAE5D" }}>ОГ</span>
              </div>
              <div><b>25k+</b><small>задоволених клієнтів</small></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-photo-frame">
              <svg className="hero-illustration" viewBox="0 0 400 460">
                <circle cx="200" cy="150" r="150" fill="#FFFFFF" opacity="0.5" />
                <path d="M120 460c0-90 36-150 80-150s80 60 80 150" fill="#10231D" />
                <ellipse cx="200" cy="220" rx="72" ry="78" fill="#F1C6A0" />
                <path d="M132 200c-4-52 30-92 68-92s72 40 68 92c-6-8-18-14-30-12-10-30-64-30-76 0-12-2-24 4-30 12Z" fill="#2B1B12" />
                <path d="M170 250c8 14 52 14 60 0" stroke="#7A4B2E" strokeWidth="4" fill="none" strokeLinecap="round" />
                <circle cx="178" cy="222" r="5" fill="#2B1B12" />
                <circle cx="222" cy="222" r="5" fill="#2B1B12" />
                <path d="M150 300c14 18 90 18 104 0v60c0 18-16 32-52 32s-52-14-52-32Z" fill="#FFFFFF" />
                <rect x="270" y="270" width="10" height="70" rx="5" fill="#3B7DFF" transform="rotate(18 275 305)" />
                <circle cx="292" cy="278" r="10" fill="#FF6B4A" />
              </svg>
            </div>
            <div className="badge-float badge-1">
              <div className="chip">★</div>
              <div><b>No 1</b><span className="sub">Найкраща клініка</span></div>
            </div>
            <div className="badge-float badge-2">
              <div className="chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21c-1.5-2-2-4.6-2-7 0-2 .6-3 1.4-3.6.7-.5 1.6-.4 2.2.2.6.6.7 1.5.2 2.2C13 13.5 12 15 12 17" /></svg>
              </div>
              <div><b>LUMEN</b><span className="sub">Dental Care Clinic</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="services">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Послуги</span>
            <h2>Стоматологія, якій довіряє <em>вся родина</em></h2>
            <p>Від щорічного огляду до складних клінічних випадків — працюємо за єдиним протоколом якості.</p>
          </Reveal>
          <div className="services-grid">
            {services.map((s) => (
              <Reveal className={`service-card tone-${s.tone}`} key={s.title}>
                <div className="service-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{s.icon}</svg>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="service-arrow">↗</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="feature-card">
            <div className="feature-visual">
              <svg viewBox="0 0 400 340" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
                <rect width="400" height="340" fill="#1B2E28" />
                <circle cx="200" cy="170" r="120" fill="#24382F" />
                <path d="M140 210c10-50 30-80 60-80s50 30 60 80" stroke="#4FD98A" strokeWidth="4" fill="none" opacity="0.5" />
                <circle cx="200" cy="140" r="34" fill="#EAF3EF" opacity="0.9" />
              </svg>
              <div className="feature-play">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
            <div className="feature-copy">
              <span className="eyebrow">Чому обирають LUMEN</span>
              <h2>Сучасне обладнання й уважна команда</h2>
              <p>Цифрова діагностика, стерилізація за європейськими протоколами та лікарі, які пояснюють кожен крок лікування.</p>
              <div className="feature-stats">
                <div className="feature-stat"><b>4.9/5</b><span>рейтинг Google</span></div>
                <div className="feature-stat"><b>6 400+</b><span>пацієнтів клініки</span></div>
                <div className="feature-stat"><b>12+</b><span>років досвіду</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="process" className="process">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Як це працює</span>
            <h2>Шлях від запису до здорової усмішки</h2>
            <p>Чотири прозорих кроки — жодних прихованих платежів і несподіванок у кріслі.</p>
          </Reveal>
          <svg className="process-arc" viewBox="0 0 1180 40" preserveAspectRatio="none" width="100%" height="40">
            <path d="M 40 8 Q 590 60 1140 8" stroke="var(--line)" strokeWidth="2" fill="none" />
          </svg>
          <div className="process-steps">
            {steps.map((s) => (
              <Reveal className="step" key={s.n}>
                <div className="step-index">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="team">
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow">Команда</span>
            <h2>Кваліфіковані лікарі</h2>
          </Reveal>
          <div className="team-grid">
            {team.map((t) => (
              <Reveal className="team-card" key={t.name}>
                <div className="team-photo">
                  <svg viewBox="0 0 120 100">
                    <circle cx="60" cy="38" r="26" fill="#10231D" opacity="0.85" />
                    <path d="M20 100c4-26 20-38 40-38s36 12 40 38" fill="#10231D" opacity="0.85" />
                  </svg>
                </div>
                <div className="team-body"><h3>{t.name}</h3><div className="team-role">{t.role}</div></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews">
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow">Відгуки</span>
            <h2>Що кажуть наші пацієнти</h2>
          </Reveal>
          <div className="testi-grid">
            {reviews.map((r) => (
              <Reveal className="testi-card" key={r.name}>
                <div className="testi-top">
                  <div className="testi-avatar" style={{ background: r.color }}>{r.initials}</div>
                  <div><b>{r.name}</b><span>{r.sub}</span></div>
                </div>
                <p>{r.text}</p>
                <div className="testi-stars">★★★★★</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="wrap">
          <Reveal className="contact-card">
            <div>
              <span className="eyebrow">Запис на прийом</span>
              <h2>Домовимось про зручний час</h2>
              <p style={{ marginTop: 12, color: "var(--ink-soft)", fontSize: 14.5 }}>Залиште заявку — адміністратор зателефонує протягом 15 хвилин.</p>
              <div className="contact-info">
                <div className="contact-row">
                  <div className="icon-chip"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" /></svg></div>
                  <div><b>Адреса</b><span>вул. Личаківська, 24</span></div>
                </div>
                <div className="contact-row">
                  <div className="icon-chip"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1.1.4 2.2.8 3.2a2 2 0 0 1-.4 2.1L8.1 10.4a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c1 .4 2.1.7 3.2.8a2 2 0 0 1 1.7 2Z" /></svg></div>
                  <div><b>Телефон</b><span>+380 32 240 15 15</span></div>
                </div>
                <div className="contact-row">
                  <div className="icon-chip"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg></div>
                  <div><b>Графік</b><span>Пн–Нд · 08:00–20:00</span></div>
                </div>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="name">Ім'я</label>
                  <input id="name" type="text" placeholder="Як до вас звертатися" required
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="phone">Телефон</label>
                  <input id="phone" type="tel" placeholder="+380" required
                    value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="service">Послуга</label>
                  <select id="service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                    <option>Консультація</option>
                    <option>Відбілювання</option>
                    <option>Імплантація</option>
                    <option>Ортодонтія</option>
                    <option>Протезування</option>
                    <option>Дитяча стоматологія</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-cta" style={{ marginTop: 6 }}>Надіслати заявку</button>
                <p className="form-note">Натискаючи кнопку, ви погоджуєтесь на обробку контактних даних.</p>
                {sent && <div className="form-success show">Дякуємо! Ми зателефонуємо вам найближчим часом.</div>}
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-top">
            <a href="#hero" className="logo"><span className="mark">L</span>LUMEN</a>
            <ul className="footer-links">
              <li><a href="#services">Послуги</a></li>
              <li><a href="#process">Як це працює</a></li>
              <li><a href="#team">Лікарі</a></li>
              <li><a href="#reviews">Відгуки</a></li>
              <li><a href="#contact">Контакти</a></li>
            </ul>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Стоматологія LUMEN, м. Львів</span>
            <span>вул. Личаківська, 24 · +380 32 240 15 15</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&family=Manrope:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

.lumen-page{
  --bg: #EAF5F2; --bg-2: #F6FAF4; --surface: #FFFFFF; --surface-2: #F2F8F5;
  --ink: #10231D; --ink-soft: #5B7069; --line: #E1EDE8;
  --cta-bg: #10181A; --cta-ink: #FFFFFF; --accent: #FF6B4A; --star: #F5B94B;
  --shadow: 0 24px 50px -28px rgba(16,35,29,0.28); --radius: 24px;
  --blue-bg:#E9F1FF; --blue-ink:#3B7DFF; --coral-bg:#FFEEE8; --coral-ink:#FF6B4A;
  --green-bg:#E8F8EC; --green-ink:#1FAE5D; --purple-bg:#F5ECFF; --purple-ink:#9B4DE0;
  background:linear-gradient(160deg, var(--bg), var(--bg-2) 55%);
  color:var(--ink); font-family:'Manrope', sans-serif; line-height:1.5;
  -webkit-font-smoothing:antialiased; overflow-x:hidden; transition:background .35s ease, color .35s ease;
}
.lumen-page.theme-dark{
  --bg: #0B1512; --bg-2: #0E1916; --surface: #13221D; --surface-2: #172720;
  --ink: #EAF3EF; --ink-soft: #8FAAA1; --line: #223832;
  --cta-bg: #EAF3EF; --cta-ink: #10181A; --accent: #FF8A6B; --star: #F7C769;
  --shadow: 0 24px 50px -22px rgba(0,0,0,0.55);
  --blue-bg:#152238; --blue-ink:#75A6FF; --coral-bg:#2B1811; --coral-ink:#FF8A6B;
  --green-bg:#122720; --green-ink:#4FD98A; --purple-bg:#22162F; --purple-ink:#C48CFF;
}
.lumen-page *{box-sizing:border-box;}
.lumen-page img, .lumen-page svg{display:block; max-width:100%;}
.lumen-page a{color:inherit; text-decoration:none;}
.lumen-page ul{list-style:none; margin:0; padding:0;}
.lumen-page button{font-family:inherit; cursor:pointer; border:none; background:none;}
.lumen-page .wrap{max-width:1180px; margin:0 auto; padding:0 32px;}
.lumen-page .eyebrow{font-family:'Space Mono', monospace; font-size:12.5px; letter-spacing:0.14em; text-transform:uppercase; color:var(--accent); display:inline-flex; align-items:center; gap:10px;}
.lumen-page .eyebrow svg{width:16px; height:16px;}
.lumen-page h1, .lumen-page h2, .lumen-page h3{font-family:'Fraunces', serif; font-weight:500; color:var(--ink); letter-spacing:-0.01em; margin:0;}
.lumen-page header{position:sticky; top:0; z-index:50; padding:22px 0;}
.lumen-page .navbar{display:flex; align-items:center; justify-content:space-between;}
.lumen-page .logo{font-family:'Fraunces', serif; font-weight:600; font-size:21px; display:flex; align-items:center; gap:8px;}
.lumen-page .logo .mark{width:30px; height:30px; border-radius:9px; background:var(--ink); color:var(--bg); display:flex; align-items:center; justify-content:center; font-family:'Space Mono', monospace; font-size:14px;}
.lumen-page .nav-pill{display:flex; gap:6px; background:var(--surface); border:1px solid var(--line); border-radius:100px; padding:6px; box-shadow:var(--shadow);}
.lumen-page .nav-pill a{padding:9px 18px; border-radius:100px; font-size:14px; font-weight:600; color:var(--ink-soft); transition:background .2s, color .2s;}
.lumen-page .nav-pill a:hover{background:var(--surface-2); color:var(--ink);}
.lumen-page .nav-right{display:flex; align-items:center; gap:12px;}
.lumen-page .theme-toggle{width:42px; height:42px; border-radius:50%; background:var(--surface); border:1px solid var(--line); display:flex; align-items:center; justify-content:center; color:var(--ink); transition:transform .2s ease;}
.lumen-page .theme-toggle:hover{transform:rotate(15deg);}
.lumen-page .theme-toggle svg{width:19px; height:19px;}
.lumen-page .btn{display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:13px 24px; border-radius:100px; font-weight:700; font-size:14.5px; transition:transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease;}
.lumen-page .btn-cta{background:var(--cta-bg); color:var(--cta-ink);}
.lumen-page .btn-cta:hover{transform:translateY(-2px); box-shadow:var(--shadow);}
.lumen-page .btn-outline{background:var(--surface); color:var(--ink); border:1.5px solid var(--line);}
.lumen-page .btn-outline:hover{border-color:var(--ink);}
.lumen-page .hero{padding:56px 0 40px; position:relative;}
.lumen-page .hero-grid{display:grid; grid-template-columns:1fr 0.92fr; gap:56px; align-items:center;}
.lumen-page .hero h1{font-size:clamp(36px, 4.6vw, 56px); line-height:1.08; margin-top:20px;}
.lumen-page .hero h1 em{font-style:italic; color:var(--accent);}
.lumen-page .hero .lead{margin-top:20px; max-width:440px; color:var(--ink-soft); font-size:16.5px;}
.lumen-page .hero-actions{margin-top:30px; display:flex; gap:14px; flex-wrap:wrap;}
.lumen-page .play-dot{width:34px; height:34px; border-radius:50%; background:var(--surface-2); display:flex; align-items:center; justify-content:center;}
.lumen-page .hero-people{margin-top:34px; display:flex; align-items:center; gap:14px;}
.lumen-page .avatar-stack{display:flex;}
.lumen-page .avatar-stack span{width:36px; height:36px; border-radius:50%; border:3px solid var(--bg); margin-left:-10px; display:flex; align-items:center; justify-content:center; font-family:'Space Mono', monospace; font-size:11px; font-weight:700; color:#fff;}
.lumen-page .avatar-stack span:first-child{margin-left:0;}
.lumen-page .hero-people b{font-size:15px;}
.lumen-page .hero-people small{display:block; color:var(--ink-soft); font-size:12.5px;}
.lumen-page .hero-visual{position:relative;}
.lumen-page .hero-photo-frame{position:relative; border-radius:32px; background:linear-gradient(155deg, var(--blue-bg), var(--surface-2) 70%); padding:26px; box-shadow:var(--shadow);}
.lumen-page .hero-illustration{width:100%; border-radius:20px; overflow:hidden;}
.lumen-page .badge-float{position:absolute; background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:10px 16px; box-shadow:var(--shadow); display:flex; align-items:center; gap:10px; font-size:13px;}
.lumen-page .badge-1{top:14%; right:-6%;}
.lumen-page .badge-1 .chip{width:30px; height:30px; border-radius:9px; background:var(--coral-bg); color:var(--coral-ink); display:flex; align-items:center; justify-content:center; font-family:'Space Mono', monospace; font-weight:700; font-size:12px;}
.lumen-page .badge-float span.sub{display:block; color:var(--ink-soft); font-size:11.5px;}
.lumen-page .badge-2{bottom:8%; left:-8%;}
.lumen-page .badge-2 .chip{width:32px; height:32px; border-radius:10px; background:var(--ink); color:var(--bg); display:flex; align-items:center; justify-content:center;}
.lumen-page .badge-2 .chip svg{width:16px; height:16px;}
.lumen-page .badge-2 span.sub{color:var(--ink-soft); font-size:11.5px;}
@media (max-width:860px){ .lumen-page .badge-1{right:4%;} .lumen-page .badge-2{left:4%;} }
.lumen-page section{padding:76px 0;}
.lumen-page .section-head{max-width:600px;}
.lumen-page .section-head h2{font-size:clamp(26px, 3.2vw, 38px); margin-top:12px;}
.lumen-page .section-head p{margin-top:12px; color:var(--ink-soft); font-size:15.5px;}
.lumen-page .section-head em{font-style:italic; color:var(--accent);}
.lumen-page .section-head.center{margin:0 auto 44px; text-align:center;}
.lumen-page .reveal{opacity:0; transform:translateY(20px); transition:opacity .6s ease, transform .6s ease;}
.lumen-page .reveal.in{opacity:1; transform:translateY(0);}
.lumen-page .services-grid{display:grid; grid-template-columns:repeat(4, 1fr); gap:18px; margin-top:40px;}
.lumen-page .service-card{background:var(--surface); border:1px solid var(--line); border-radius:20px; padding:24px 22px; transition:transform .25s ease, box-shadow .25s ease; position:relative;}
.lumen-page .service-card:hover{transform:translateY(-5px); box-shadow:var(--shadow);}
.lumen-page .service-icon{width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-bottom:34px;}
.lumen-page .service-card h3{font-size:16.5px; font-weight:600;}
.lumen-page .service-card p{margin-top:8px; font-size:13.5px; color:var(--ink-soft);}
.lumen-page .service-arrow{position:absolute; right:18px; bottom:18px; width:30px; height:30px; border-radius:50%; border:1px solid var(--line); display:flex; align-items:center; justify-content:center; color:var(--ink-soft);}
.lumen-page .tone-blue .service-icon{background:var(--blue-bg); color:var(--blue-ink);}
.lumen-page .tone-coral .service-icon{background:var(--coral-bg); color:var(--coral-ink);}
.lumen-page .tone-green .service-icon{background:var(--green-bg); color:var(--green-ink);}
.lumen-page .tone-purple .service-icon{background:var(--purple-bg); color:var(--purple-ink);}
.lumen-page .feature-card{background:var(--cta-bg); color:var(--cta-ink); border-radius:32px; padding:52px; display:grid; grid-template-columns:0.9fr 1.1fr; gap:40px; align-items:center;}
.lumen-page .feature-visual{position:relative; border-radius:22px; overflow:hidden; aspect-ratio:6/5;}
.lumen-page .feature-play{position:absolute; inset:0; margin:auto; width:56px; height:56px; border-radius:50%; background:rgba(255,255,255,0.16); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; color:#fff;}
.lumen-page .feature-copy .eyebrow{color:var(--star);}
.lumen-page .feature-copy h2{color:var(--cta-ink); margin-top:12px; font-size:clamp(24px,2.6vw,32px);}
.lumen-page .feature-copy p{margin-top:12px; color:rgba(255,255,255,0.65); font-size:14.5px; max-width:420px;}
.lumen-page.theme-dark .feature-copy p{color:rgba(16,24,26,0.65);}
.lumen-page.theme-dark .feature-copy h2, .lumen-page.theme-dark .feature-copy .eyebrow{color:var(--cta-ink);}
.lumen-page .feature-stats{display:flex; gap:34px; margin-top:30px; flex-wrap:wrap;}
.lumen-page .feature-stat b{display:block; font-family:'Space Mono', monospace; font-size:28px; color:var(--cta-ink);}
.lumen-page .feature-stat span{font-size:12.5px; color:rgba(255,255,255,0.55);}
.lumen-page.theme-dark .feature-stat span{color:rgba(16,24,26,0.6);}
.lumen-page .process{position:relative;}
.lumen-page .process-arc{position:absolute; left:0; right:0; top:172px; width:100%; z-index:0;}
.lumen-page .process-steps{position:relative; z-index:1; display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:40px;}
.lumen-page .step-index{font-family:'Space Mono', monospace; font-size:13px; color:var(--accent); background:var(--surface); border:1px solid var(--line); width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:16px;}
.lumen-page .step h3{font-size:16px; font-weight:600;}
.lumen-page .step p{margin-top:6px; font-size:13.5px; color:var(--ink-soft);}
.lumen-page .team-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:18px; margin-top:40px;}
.lumen-page .team-card{background:var(--surface); border:1px solid var(--line); border-radius:20px; overflow:hidden; text-align:center;}
.lumen-page .team-photo{aspect-ratio:1/1; background:var(--surface-2); display:flex; align-items:flex-end; justify-content:center;}
.lumen-page .team-photo svg{width:64%;}
.lumen-page .team-body{padding:16px 14px 20px;}
.lumen-page .team-body h3{font-size:15px; font-weight:600;}
.lumen-page .team-role{font-family:'Space Mono', monospace; font-size:11px; color:var(--accent); margin-top:4px;}
.lumen-page .testi-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:40px;}
.lumen-page .testi-card{background:var(--surface); border:1px solid var(--line); border-radius:20px; padding:22px 20px;}
.lumen-page .testi-top{display:flex; align-items:center; gap:12px;}
.lumen-page .testi-avatar{width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Space Mono', monospace; font-size:12px; font-weight:700; color:#fff;}
.lumen-page .testi-top b{display:block; font-size:14px;}
.lumen-page .testi-top span{font-size:11.5px; color:var(--ink-soft);}
.lumen-page .testi-card p{margin-top:14px; font-size:14px; color:var(--ink-soft);}
.lumen-page .testi-stars{color:var(--star); font-size:13px; margin-top:12px; letter-spacing:2px;}
.lumen-page .contact-card{background:var(--surface); border:1px solid var(--line); border-radius:32px; padding:52px; display:grid; grid-template-columns:1fr 1fr; gap:56px;}
.lumen-page .contact-info{margin-top:28px; display:flex; flex-direction:column; gap:18px;}
.lumen-page .contact-row{display:flex; gap:12px; align-items:flex-start;}
.lumen-page .contact-row b{display:block; font-size:14px; font-weight:700;}
.lumen-page .contact-row span{font-size:13px; color:var(--ink-soft); font-family:'Space Mono', monospace;}
.lumen-page .contact-row .icon-chip{width:34px; height:34px; border-radius:10px; background:var(--blue-bg); color:var(--blue-ink); display:flex; align-items:center; justify-content:center; flex-shrink:0;}
.lumen-page form{display:flex; flex-direction:column; gap:12px;}
.lumen-page .field label{display:block; font-size:12px; font-family:'Space Mono', monospace; text-transform:uppercase; letter-spacing:.06em; color:var(--ink-soft); margin-bottom:6px;}
.lumen-page .field input, .lumen-page .field select{width:100%; background:var(--surface-2); border:1px solid var(--line); border-radius:12px; padding:12px 14px; color:var(--ink); font-family:'Manrope'; font-size:14.5px;}
.lumen-page .field input:focus, .lumen-page .field select:focus{outline:2px solid var(--accent); outline-offset:1px;}
.lumen-page .form-note{font-size:12px; color:var(--ink-soft);}
.lumen-page .form-success{background:var(--green-bg); color:var(--green-ink); border:1px solid var(--line); padding:12px 14px; border-radius:12px; font-size:13.5px;}
.lumen-page footer{padding:48px 0 36px;}
.lumen-page .footer-top{display:flex; justify-content:space-between; align-items:flex-start; padding-bottom:30px; border-bottom:1px solid var(--line); flex-wrap:wrap; gap:20px;}
.lumen-page .footer-links{display:flex; gap:28px; font-size:14px; color:var(--ink-soft); flex-wrap:wrap;}
.lumen-page .footer-bottom{display:flex; justify-content:space-between; padding-top:20px; font-size:12.5px; color:var(--ink-soft); flex-wrap:wrap; gap:8px;}
@media (max-width:960px){
  .lumen-page .services-grid{grid-template-columns:repeat(2,1fr);}
  .lumen-page .team-grid{grid-template-columns:repeat(2,1fr);}
  .lumen-page .testi-grid{grid-template-columns:1fr;}
  .lumen-page .feature-card{grid-template-columns:1fr; padding:34px;}
  .lumen-page .contact-card{grid-template-columns:1fr; padding:32px;}
}
@media (max-width:760px){
  .lumen-page .nav-pill{display:none;}
  .lumen-page .hero-grid{grid-template-columns:1fr;}
  .lumen-page .hero-visual{order:-1; max-width:360px; margin:0 auto;}
  .lumen-page .process-steps{grid-template-columns:1fr;}
  .lumen-page .process-arc{display:none;}
  .lumen-page .services-grid{grid-template-columns:1fr;}
  .lumen-page .wrap{padding:0 20px;}
}
`;
