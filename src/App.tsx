// @ts-nocheck
import { useState } from "react";

const PAYPAL_LINK = "https://www.paypal.com/paypalme/NasradineDaoud/5USD";

const translations = {
  fr: {
    appName: "CVcraft",
    tagline: "Crée ton CV en minutes",
    template: "Choisis un modèle",
    info: "Informations personnelles",
    fname: "Prénom",
    lname: "Nom",
    jobTitle: "Titre professionnel",
    email: "Email",
    phone: "Téléphone",
    city: "Ville",
    website: "Site / Portfolio",
    about: "À propos",
    aboutPlaceholder: "Décris-toi en 2-3 phrases...",
    education: "Formation",
    eduSchool: "École / Institut",
    eduDegree: "Diplôme",
    eduDate: "Période",
    eduDesc: "Description",
    experience: "Expérience",
    expCompany: "Entreprise / Projet",
    expRole: "Rôle",
    expDate: "Période",
    expDesc: "Description",
    skills: "Compétences",
    languages: "Langues",
    addItem: "+ Ajouter",
    removeItem: "Supprimer",
    preview: "Aperçu du CV",
    download: "Télécharger PDF",
    plan: "✦ Gratuit — 2 CV/mois",
    planPro: "✦ Pro — Illimité",
    generate: "Générer mon CV",
    templates: ["Sidebar", "Colonnes", "Créatif", "Executive", "Consulting", "Tech Elite"],
    langLevels: ["Natif", "Courant", "Intermédiaire", "Débutant"],
    skillSuggestions: ["Réseaux", "Sécurité", "Python", "Linux", "SQL", "Cloud", "HTML/CSS", "JavaScript", "Git", "Cisco", "Wireshark", "TCP/IP"],
  },
  en: {
    appName: "CVcraft",
    tagline: "Build your CV in minutes",
    template: "Choose a template",
    info: "Personal information",
    fname: "First name",
    lname: "Last name",
    jobTitle: "Job title",
    email: "Email",
    phone: "Phone",
    city: "City",
    website: "Website / Portfolio",
    about: "About",
    aboutPlaceholder: "Describe yourself in 2-3 sentences...",
    education: "Education",
    eduSchool: "School / Institute",
    eduDegree: "Degree",
    eduDate: "Period",
    eduDesc: "Description",
    experience: "Experience",
    expCompany: "Company / Project",
    expRole: "Role",
    expDate: "Period",
    expDesc: "Description",
    skills: "Skills",
    languages: "Languages",
    addItem: "+ Add",
    removeItem: "Remove",
    preview: "CV Preview",
    download: "Download PDF",
    plan: "✦ Free — 2 CVs/month",
    planPro: "✦ Pro — Unlimited",
    generate: "Generate my CV",
    templates: ["Sidebar", "Columns", "Creative", "Executive", "Consulting", "Tech Elite"],
    langLevels: ["Native", "Fluent", "Intermediate", "Beginner"],
    skillSuggestions: ["Networks", "Security", "Python", "Linux", "SQL", "Cloud", "HTML/CSS", "JavaScript", "Git", "Cisco", "Wireshark", "TCP/IP"],
  },
  ar: {
    appName: "CVcraft",
    tagline: "أنشئ سيرتك الذاتية في دقائق",
    template: "اختر قالباً",
    info: "المعلومات الشخصية",
    fname: "الاسم الأول",
    lname: "اللقب",
    jobTitle: "المسمى الوظيفي",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    city: "المدينة",
    website: "الموقع / المحفظة",
    about: "نبذة عني",
    aboutPlaceholder: "صف نفسك في 2-3 جمل...",
    education: "التعليم",
    eduSchool: "المدرسة / المعهد",
    eduDegree: "الشهادة",
    eduDate: "الفترة",
    eduDesc: "الوصف",
    experience: "الخبرة",
    expCompany: "الشركة / المشروع",
    expRole: "الدور",
    expDate: "الفترة",
    expDesc: "الوصف",
    skills: "المهارات",
    languages: "اللغات",
    addItem: "+ إضافة",
    removeItem: "حذف",
    preview: "معاينة السيرة الذاتية",
    download: "تحميل PDF",
    plan: "✦ مجاني — 2 سير شهرياً",
    planPro: "✦ برو — غير محدود",
    generate: "إنشاء سيرتي الذاتية",
    templates: ["Sidebar", "أعمدة", "إبداعي", "Executive", "Consulting", "Tech Elite"],
    langLevels: ["اللغة الأم", "طليق", "متوسط", "مبتدئ"],
    skillSuggestions: ["الشبكات", "الأمن", "بايثون", "لينكس", "SQL", "سحابي", "HTML/CSS", "جافاسكريبت", "Git", "Cisco", "Wireshark", "TCP/IP"],
  },
};

const TEMPLATES = [
  { name: "Sidebar",    premium: false, accent: "#0F6E56", sidebar: "#0F6E56", bg: "#fff" },
  { name: "Colonnes",   premium: false, accent: "#1a1a2e", sidebar: "#1a1a2e", bg: "#fff" },
  { name: "Créatif",    premium: false, accent: "#c0392b", sidebar: "#c0392b", bg: "#fff" },
  { name: "Executive",  premium: true,  accent: "#1A1A1A", sidebar: "#1A1A1A", bg: "#FFFFFF" },
  { name: "Consulting", premium: true,  accent: "#1B3A6B", sidebar: "#1B3A6B", bg: "#FFFFFF" },
  { name: "Tech Elite", premium: true,  accent: "#0A0A0A", sidebar: "#0A0A0A", bg: "#F7F7F7" },
];

const TEMPLATE_COLORS = Object.fromEntries(
  TEMPLATES.map((t,i) => [i, { primary: t.accent, light: t.accent+"18", accent: t.accent, header: t.sidebar }])
);

function Input({ label, value, onChange, placeholder, multiline }) {
  const base = {
    width: "100%", padding: "8px 11px", borderRadius: 8,
    border: "0.5px solid #d0d0d0", fontSize: 13,
    fontFamily: "inherit", background: "#fafafa", color: "#1a1a1a",
    outline: "none", transition: "border-color 0.15s",
    resize: multiline ? "vertical" : "none",
    minHeight: multiline ? 68 : undefined,
    WebkitTextFillColor: "#1a1a1a",
    caretColor: "#1a1a1a",
  };
  return (
    <div style={{ marginBottom: 10 }}>
      {label && <div style={{ fontSize: 12, color: "#666", marginBottom: 4, fontWeight: 500 }}>{label}</div>}
      {multiline
        ? <textarea style={base} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} />
        : <input style={base} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      }
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase",
      letterSpacing: "0.1em", marginTop: 20, marginBottom: 10,
      borderBottom: "0.5px solid #eee", paddingBottom: 6,
    }}>{children}</div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 3 — EXECUTIVE ATS
// Une colonne. Hiérarchie typographique parfaite. Zéro décoration.
// Inspiré des CVs utilisés dans les grandes banques, cabinets, multinationales.
// ─────────────────────────────────────────────────────────────────────────────
function TemplateExecutive({ data, isPro }) {
  const RULE = "0.75px solid #1A1A1A";
  const RULE_LIGHT = "0.5px solid #D8D8D8";

  const SectionHeader = ({ title }) => (
    <div style={{
      display: "flex", alignItems: "center", gap: 0,
      margin: "13px 0 7px",
    }}>
      <div style={{
        fontSize: 7.5, fontWeight: 700, color: "#1A1A1A",
        letterSpacing: "0.18em", textTransform: "uppercase",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        paddingRight: 10, whiteSpace: "nowrap",
      }}>{title}</div>
      <div style={{ flex: 1, height: "0.75px", background: "#1A1A1A" }} />
    </div>
  );

  const Entry = ({ title, sub, date, location, desc }) => (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{
          fontSize: 9.5, fontWeight: 700, color: "#0D0D0D",
          fontFamily: "'Helvetica Neue', Arial, sans-serif", letterSpacing: "-0.01em",
        }}>{title}</div>
        <div style={{
          fontSize: 8, color: "#555",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          whiteSpace: "nowrap", marginLeft: 8, fontStyle: "italic",
        }}>{date}</div>
      </div>
      {sub && (
        <div style={{
          fontSize: 8.5, color: "#444",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontStyle: "italic", marginTop: 1,
        }}>{sub}{location && <span style={{ color: "#888" }}> · {location}</span>}</div>
      )}
      {desc && (
        <div style={{
          fontSize: 8, color: "#555", lineHeight: 1.75, marginTop: 3,
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
        }}>{desc}</div>
      )}
    </div>
  );

  return (
    <div style={{
      width: "100%", maxWidth: 320,
      background: "#FFFFFF",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      boxShadow: "0 1px 20px rgba(0,0,0,0.09)",
      overflow: "hidden",
    }}>
      {/* HEADER — Nom + Titre + Contact en ligne fine */}
      <div style={{ padding: "22px 22px 16px", borderBottom: RULE }}>
        <div style={{
          fontSize: 20, fontWeight: 800, color: "#0D0D0D",
          letterSpacing: "-0.03em", lineHeight: 1,
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          textTransform: "uppercase",
        }}>
          {data.fname} {data.lname}
        </div>
        {data.jobTitle && (
          <div style={{
            fontSize: 9, color: "#555", marginTop: 4,
            letterSpacing: "0.08em", textTransform: "uppercase",
            fontWeight: 400,
          }}>{data.jobTitle}</div>
        )}
        {/* Ligne de contact */}
        <div style={{
          display: "flex", gap: 0, marginTop: 10, flexWrap: "wrap",
          borderTop: RULE_LIGHT, paddingTop: 8,
        }}>
          {[data.email, data.phone, data.city, data.website].filter(Boolean).map((c, i, arr) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: 7.5, color: "#555" }}>{c}</span>
              {i < arr.length - 1 && (
                <span style={{ margin: "0 6px", color: "#CCC", fontSize: 8 }}>|</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* CORPS — une colonne pure */}
      <div style={{ padding: "4px 22px 20px" }}>

        {data.about && (
          <>
            <SectionHeader title="Profil" />
            <div style={{
              fontSize: 8.5, color: "#333", lineHeight: 1.8,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}>{data.about}</div>
          </>
        )}

        {data.experience?.length > 0 && (
          <>
            <SectionHeader title="Expérience Professionnelle" />
            {data.experience.map((e, i) => (
              <Entry key={i} title={e.role} sub={e.company} date={e.date} desc={e.desc} />
            ))}
          </>
        )}

        {data.education?.length > 0 && (
          <>
            <SectionHeader title="Formation" />
            {data.education.map((e, i) => (
              <Entry key={i} title={e.degree} sub={e.school} date={e.date} desc={e.desc} />
            ))}
          </>
        )}

        {(data.skills?.length > 0 || data.languages?.length > 0) && (
          <>
            <SectionHeader title="Compétences & Langues" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 20px" }}>
              {data.skills?.length > 0 && (
                <div>
                  <div style={{
                    fontSize: 7.5, fontWeight: 700, color: "#888",
                    textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5,
                  }}>Compétences</div>
                  <div style={{ fontSize: 8, color: "#333", lineHeight: 2 }}>
                    {data.skills.join(" · ")}
                  </div>
                </div>
              )}
              {data.languages?.length > 0 && (
                <div>
                  <div style={{
                    fontSize: 7.5, fontWeight: 700, color: "#888",
                    textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5,
                  }}>Langues</div>
                  {data.languages.map((l, i) => (
                    <div key={i} style={{ fontSize: 8, color: "#333", lineHeight: 2 }}>
                      {l.name}{l.level ? <span style={{ color: "#888" }}> — {l.level}</span> : ""}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {!isPro && (
        <div style={{
          background: "#F8F8F8", borderTop: RULE_LIGHT,
          padding: "5px 22px", display: "flex",
          justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 8, color: "#BBB", fontFamily: "'Helvetica Neue', sans-serif" }}>CVcraft.app</span>
          <span style={{ fontSize: 7.5, padding: "2px 6px", borderRadius: 3, background: "#FFF3CD", color: "#856404", border: "0.5px solid #FFC107" }}>⚡ Pro</span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 4 — CONSULTING & FINANCE
// Inspiré McKinsey / BCG / Deloitte.
// Structure rigoureuse en 3 zones : bandeau latéral de navigation, colonne
// principale, sans aucun décor. Tout repose sur la hiérarchie et les données.
// ─────────────────────────────────────────────────────────────────────────────
function TemplateConsulting({ data, isPro }) {
  const NAVY = "#1B3A6B";
  const NAVY_LIGHT = "#EEF2F8";

  const SectionTitle = ({ children }) => (
    <div style={{
      fontSize: 7, fontWeight: 700, color: NAVY,
      letterSpacing: "0.2em", textTransform: "uppercase",
      marginBottom: 8, marginTop: 13,
      paddingBottom: 4,
      borderBottom: `1px solid ${NAVY}`,
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
    }}>{children}</div>
  );

  const ExperienceBlock = ({ role, company, date, desc }) => (
    <div style={{ marginBottom: 10, paddingBottom: 10, borderBottom: "0.5px solid #EAECF0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div>
          <div style={{
            fontSize: 9, fontWeight: 700, color: "#0D0D0D",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
          }}>{role}</div>
          <div style={{
            fontSize: 8, color: NAVY, fontWeight: 600,
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            marginTop: 1,
          }}>{company}</div>
        </div>
        <div style={{
          fontSize: 7.5, color: "#888", whiteSpace: "nowrap",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          marginTop: 1, fontStyle: "italic",
        }}>{date}</div>
      </div>
      {desc && (
        <div style={{
          marginTop: 4, fontSize: 7.5, color: "#444", lineHeight: 1.8,
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
        }}>
          {/* Affiche chaque ligne comme bullet point */}
          {desc.split(/[.;]/).filter(s => s.trim()).map((line, i) => (
            <div key={i} style={{ display: "flex", gap: 5, marginBottom: 2 }}>
              <span style={{ color: NAVY, fontSize: 8, marginTop: 1, flexShrink: 0 }}>▸</span>
              <span>{line.trim()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={{
      width: "100%", maxWidth: 320,
      background: "#FFFFFF",
      boxShadow: "0 2px 24px rgba(0,0,0,0.10)",
      overflow: "hidden",
      display: "flex", flexDirection: "column",
    }}>
      {/* TOP BAND — identité couleur plein largeur */}
      <div style={{
        background: NAVY, padding: "18px 18px 14px",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{
              fontSize: 17, fontWeight: 800, color: "#FFFFFF",
              letterSpacing: "-0.02em", lineHeight: 1.1,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}>
              {data.fname} <span style={{ fontWeight: 300 }}>{data.lname}</span>
            </div>
            <div style={{
              fontSize: 8.5, color: "rgba(255,255,255,0.65)", marginTop: 4,
              letterSpacing: "0.06em", textTransform: "uppercase",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}>{data.jobTitle}</div>
          </div>
          {/* Monogramme discret */}
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: "#fff",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            flexShrink: 0,
          }}>
            {(data.fname || "?")[0]}{(data.lname || "")[0]}
          </div>
        </div>

        {/* Contact en ligne sur fond bleu */}
        <div style={{
          display: "flex", gap: 0, marginTop: 12, flexWrap: "wrap",
          borderTop: "0.5px solid rgba(255,255,255,0.2)", paddingTop: 9,
        }}>
          {[data.email, data.phone, data.city].filter(Boolean).map((c, i, arr) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: 7, color: "rgba(255,255,255,0.6)" }}>{c}</span>
              {i < arr.length - 1 && (
                <span style={{ margin: "0 6px", color: "rgba(255,255,255,0.2)", fontSize: 7 }}>·</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* CORPS principal */}
      <div style={{ padding: "4px 18px 16px", flex: 1 }}>

        {data.about && (
          <>
            <SectionTitle>Synthèse</SectionTitle>
            <div style={{
              fontSize: 8, color: "#333", lineHeight: 1.85,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              padding: "8px 10px",
              background: NAVY_LIGHT,
              borderLeft: `3px solid ${NAVY}`,
              borderRadius: "0 4px 4px 0",
            }}>{data.about}</div>
          </>
        )}

        {data.experience?.length > 0 && (
          <>
            <SectionTitle>Parcours Professionnel</SectionTitle>
            {data.experience.map((e, i) => (
              <ExperienceBlock key={i} role={e.role} company={e.company} date={e.date} desc={e.desc} />
            ))}
          </>
        )}

        {data.education?.length > 0 && (
          <>
            <SectionTitle>Formation</SectionTitle>
            {data.education.map((e, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{
                    fontSize: 9, fontWeight: 700, color: "#0D0D0D",
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  }}>{e.degree}</div>
                  <div style={{
                    fontSize: 7.5, color: "#888", whiteSpace: "nowrap",
                    fontFamily: "'Helvetica Neue', Arial, sans-serif", fontStyle: "italic",
                  }}>{e.date}</div>
                </div>
                <div style={{
                  fontSize: 8, color: NAVY, fontWeight: 600,
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                }}>{e.school}</div>
              </div>
            ))}
          </>
        )}

        {/* Grille compétences / langues */}
        {(data.skills?.length > 0 || data.languages?.length > 0) && (
          <>
            <SectionTitle>Expertises & Langues</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "8px 16px" }}>
              {data.skills?.length > 0 && (
                <div>
                  <div style={{
                    fontSize: 7, color: "#888", letterSpacing: "0.12em",
                    textTransform: "uppercase", marginBottom: 5,
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  }}>Compétences</div>
                  {data.skills.map((s, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 5,
                      marginBottom: 3, fontSize: 8, color: "#333",
                      fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    }}>
                      <span style={{
                        width: 10, height: "0.75px", background: NAVY, flexShrink: 0,
                      }} />
                      {s}
                    </div>
                  ))}
                </div>
              )}
              {data.languages?.length > 0 && (
                <div>
                  <div style={{
                    fontSize: 7, color: "#888", letterSpacing: "0.12em",
                    textTransform: "uppercase", marginBottom: 5,
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  }}>Langues</div>
                  {data.languages.map((l, i) => (
                    <div key={i} style={{ marginBottom: 4 }}>
                      <div style={{
                        fontSize: 8, fontWeight: 600, color: "#1A1A1A",
                        fontFamily: "'Helvetica Neue', Arial, sans-serif",
                      }}>{l.name}</div>
                      {l.level && <div style={{
                        fontSize: 7, color: "#888",
                        fontFamily: "'Helvetica Neue', Arial, sans-serif",
                      }}>{l.level}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {!isPro && (
        <div style={{
          background: "#F4F6FA", borderTop: "0.5px solid #DDE3EF",
          padding: "5px 18px", display: "flex",
          justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 8, color: "#BBC", fontFamily: "'Helvetica Neue', sans-serif" }}>CVcraft.app</span>
          <span style={{ fontSize: 7.5, padding: "2px 6px", borderRadius: 3, background: "#FFF3CD", color: "#856404", border: "0.5px solid #FFC107" }}>⚡ Pro</span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 5 — TECH ELITE
// Pour ingénieurs senior, PMs, data engineers, architectes.
// Design système : grille stricte, accent minimaliste, typographie monospace
// pour les sections techniques. Sobre, précis, sans compromis.
// ─────────────────────────────────────────────────────────────────────────────
function TemplateTechElite({ data, isPro }) {
  const DARK = "#0A0A0A";
  const ACCENT = "#0052CC"; // Bleu Jira/Figma — reconnaissable Tech
  const BG = "#F7F7F7";
  const CARD_BG = "#FFFFFF";

  const SecLabel = ({ children }) => (
    <div style={{
      fontSize: 6.5, fontWeight: 700, color: ACCENT,
      letterSpacing: "0.22em", textTransform: "uppercase",
      marginBottom: 7, marginTop: 12,
      fontFamily: "'Courier New', monospace",
      display: "flex", alignItems: "center", gap: 5,
    }}>
      <span style={{ color: ACCENT }}>// </span>{children}
    </div>
  );

  return (
    <div style={{
      width: "100%", maxWidth: 320,
      background: BG,
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      boxShadow: "0 2px 20px rgba(0,0,0,0.10)",
      overflow: "hidden",
    }}>
      {/* HEADER CARD — fond blanc, barre accent gauche */}
      <div style={{
        background: CARD_BG,
        borderLeft: `4px solid ${ACCENT}`,
        padding: "18px 16px 14px",
        borderBottom: "0.5px solid #E8E8E8",
      }}>
        <div style={{
          fontSize: 18, fontWeight: 900, color: DARK,
          letterSpacing: "-0.035em", lineHeight: 1,
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
        }}>
          {data.fname} {data.lname}
        </div>
        {data.jobTitle && (
          <div style={{
            fontSize: 8.5, color: ACCENT, marginTop: 5,
            fontWeight: 600, letterSpacing: "0.04em",
            fontFamily: "'Courier New', monospace",
          }}>{data.jobTitle}</div>
        )}

        {/* Contact — style terminal */}
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 2 }}>
          {[
            data.email && { icon: "@", val: data.email },
            data.phone && { icon: "✆", val: data.phone },
            data.city && { icon: "◎", val: data.city },
            data.website && { icon: "↗", val: data.website },
          ].filter(Boolean).map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <span style={{
                fontSize: 7, color: ACCENT, fontFamily: "'Courier New', monospace",
                fontWeight: 700, width: 10, textAlign: "center", flexShrink: 0,
              }}>{item.icon}</span>
              <span style={{ fontSize: 7.5, color: "#555" }}>{item.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CORPS — fond gris clair, cartes blanches */}
      <div style={{ padding: "8px 14px 16px" }}>

        {data.about && (
          <>
            <SecLabel>Profil</SecLabel>
            <div style={{
              background: CARD_BG, padding: "8px 10px",
              borderRadius: 4, border: "0.5px solid #E4E4E4",
              fontSize: 8, color: "#444", lineHeight: 1.8,
            }}>{data.about}</div>
          </>
        )}

        {data.experience?.length > 0 && (
          <>
            <SecLabel>Expérience</SecLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {data.experience.map((e, i) => (
                <div key={i} style={{
                  background: CARD_BG, padding: "9px 10px",
                  borderRadius: 4, border: "0.5px solid #E4E4E4",
                  borderLeft: `2px solid ${ACCENT}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{
                      fontSize: 9, fontWeight: 700, color: DARK,
                      letterSpacing: "-0.01em",
                    }}>{e.role}</div>
                    <div style={{
                      fontSize: 7, color: "#999",
                      fontFamily: "'Courier New', monospace",
                      whiteSpace: "nowrap", marginLeft: 6,
                    }}>{e.date}</div>
                  </div>
                  <div style={{
                    fontSize: 8, color: ACCENT, fontWeight: 600,
                    fontFamily: "'Courier New', monospace", marginTop: 1,
                  }}>{e.company}</div>
                  {e.desc && (
                    <div style={{
                      fontSize: 7.5, color: "#555", lineHeight: 1.7, marginTop: 4,
                    }}>{e.desc}</div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {data.education?.length > 0 && (
          <>
            <SecLabel>Formation</SecLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {data.education.map((e, i) => (
                <div key={i} style={{
                  background: CARD_BG, padding: "8px 10px",
                  borderRadius: 4, border: "0.5px solid #E4E4E4",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{
                      fontSize: 8.5, fontWeight: 700, color: DARK,
                    }}>{e.degree}</div>
                    <div style={{
                      fontSize: 7, color: "#999",
                      fontFamily: "'Courier New', monospace",
                      whiteSpace: "nowrap", marginLeft: 6,
                    }}>{e.date}</div>
                  </div>
                  <div style={{ fontSize: 8, color: "#666", marginTop: 1 }}>{e.school}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Compétences — liste technique pure */}
        {data.skills?.length > 0 && (
          <>
            <SecLabel>Stack</SecLabel>
            <div style={{
              background: CARD_BG, padding: "8px 10px",
              borderRadius: 4, border: "0.5px solid #E4E4E4",
              fontSize: 8, color: "#333",
              fontFamily: "'Courier New', monospace",
              lineHeight: 2,
            }}>
              {data.skills.join("  ·  ")}
            </div>
          </>
        )}

        {data.languages?.length > 0 && (
          <>
            <SecLabel>Langues</SecLabel>
            <div style={{
              background: CARD_BG, padding: "8px 10px",
              borderRadius: 4, border: "0.5px solid #E4E4E4",
              display: "flex", flexWrap: "wrap", gap: "4px 16px",
            }}>
              {data.languages.map((l, i) => (
                <div key={i} style={{ fontSize: 8, color: "#333" }}>
                  <span style={{ fontWeight: 700 }}>{l.name}</span>
                  {l.level && <span style={{ color: "#999" }}> / {l.level}</span>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {!isPro && (
        <div style={{
          background: "#EFEFEF", borderTop: "0.5px solid #E0E0E0",
          padding: "5px 14px", display: "flex",
          justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 7.5, color: "#BBB", fontFamily: "'Courier New', monospace" }}>cvcraft.app</span>
          <span style={{ fontSize: 7.5, padding: "2px 6px", borderRadius: 3, background: "#FFF3CD", color: "#856404", border: "0.5px solid #FFC107" }}>⚡ Pro</span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CVPreview — dispatcher
// ─────────────────────────────────────────────────────────────────────────────
function CVPreview({ data, lang, templateIdx, isPro }) {
  const t = translations[lang];
  const tmpl = TEMPLATES[templateIdx] || TEMPLATES[0];
  const ac = tmpl.accent;
  const light = ac + "22";

  const secTitle = (txt) => (
    <div style={{
      fontSize: 9, fontWeight: 700, color: ac,
      textTransform: "uppercase", letterSpacing: "0.1em",
      borderBottom: `1.5px solid ${light}`,
      paddingBottom: 3, marginBottom: 6, marginTop: 10,
    }}>{txt}</div>
  );

  const entryBlock = (title, sub, date, desc) => (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#1a1a1a" }}>{title}</div>
        <div style={{ fontSize: 8.5, color: "#999", whiteSpace: "nowrap", marginLeft: 6 }}>{date}</div>
      </div>
      <div style={{ fontSize: 9, color: ac, marginBottom: 2 }}>{sub}</div>
      {desc && <div style={{ fontSize: 9, color: "#666", lineHeight: 1.5 }}>{desc}</div>}
    </div>
  );

  const skillTags = (skills) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 4 }}>
      {skills.map((s, i) => (
        <span key={i} style={{
          fontSize: 8.5, padding: "2px 7px", borderRadius: 20,
          background: light, color: ac, border: `0.5px solid ${ac}`, fontWeight: 500,
        }}>{s}</span>
      ))}
    </div>
  );

  const wrapperStyle = {
    width: "100%", maxWidth: 320, background: tmpl.bg,
    border: "0.5px solid #e0e0e0", borderRadius: 10,
    overflow: "hidden", fontFamily: "'Georgia', serif",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  };

  // Premium templates
  if (templateIdx === 3) return <TemplateExecutive data={data} isPro={isPro} />;
  if (templateIdx === 4) return <TemplateConsulting data={data} isPro={isPro} />;
  if (templateIdx === 5) return <TemplateTechElite data={data} isPro={isPro} />;

  // TEMPLATE 0 — SIDEBAR
  if (templateIdx === 0) {
    return (
      <div style={wrapperStyle}>
        <div style={{ display: "flex", minHeight: 400 }}>
          <div style={{ width: "35%", background: tmpl.sidebar, padding: "16px 10px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#fff", margin: "0 auto", border: "2px solid rgba(255,255,255,0.5)" }}>
              {(data.fname || "?")[0]}{(data.lname || "")[0]}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{data.fname} {data.lname}</div>
              <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.8)", marginTop: 3 }}>{data.jobTitle}</div>
            </div>
            <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.3)", paddingTop: 10 }}>
              {[data.email, data.phone, data.city, data.website].filter(Boolean).map((c, i) => (
                <div key={i} style={{ fontSize: 8, color: "rgba(255,255,255,0.85)", marginBottom: 4, wordBreak: "break-all" }}>{c}</div>
              ))}
            </div>
            {data.skills.length > 0 && (
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Skills</div>
                {data.skills.map((s, i) => (
                  <div key={i} style={{ fontSize: 8.5, color: "#fff", marginBottom: 3, display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.6)", flexShrink: 0 }}></div>
                    {s}
                  </div>
                ))}
              </div>
            )}
            {data.languages.length > 0 && (
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Langues</div>
                {data.languages.map((l, i) => (
                  <div key={i} style={{ fontSize: 8.5, color: "#fff", marginBottom: 3 }}>
                    <span style={{ fontWeight: 600 }}>{l.name}</span>
                    {l.level && <span style={{ opacity: 0.7 }}> · {l.level}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ flex: 1, padding: "16px 12px", overflow: "hidden" }}>
            {data.about && (<>{secTitle(t.about)}<div style={{ fontSize: 9, color: "#555", lineHeight: 1.6 }}>{data.about}</div></>)}
            {data.education.length > 0 && (<>{secTitle(t.education)}{data.education.map((e, i) => entryBlock(e.degree, e.school, e.date, e.desc))}</>)}
            {data.experience.length > 0 && (<>{secTitle(t.experience)}{data.experience.map((e, i) => entryBlock(e.role, e.company, e.date, e.desc))}</>)}
          </div>
        </div>
        {!isPro && <div style={{ background: "#f9f9f9", borderTop: "0.5px solid #eee", padding: "5px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 9, color: "#bbb" }}>Créé avec CVcraft.app</span>
          <span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 10, background: "#fff3cd", color: "#856404", border: "0.5px solid #ffc107" }}>⚡ Pro</span>
        </div>}
      </div>
    );
  }

  // TEMPLATE 1 — COLONNES
  if (templateIdx === 1) {
    return (
      <div style={{ ...wrapperStyle, background: "#fff" }}>
        <div style={{ background: `linear-gradient(135deg, ${ac}, ${ac}cc)`, padding: "16px 16px 12px" }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
            {data.fname} <span style={{ fontWeight: 300 }}>{data.lname}</span>
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.85)", marginTop: 2 }}>{data.jobTitle}</div>
          <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
            {[data.email, data.phone, data.city].filter(Boolean).map((c, i) => (
              <span key={i} style={{ fontSize: 8.5, color: "rgba(255,255,255,0.8)" }}>{c}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          <div style={{ padding: "12px 10px 12px 14px", borderRight: `1px solid #eee` }}>
            {data.about && (<><div style={{ fontSize: 9, fontWeight: 700, color: ac, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Profil</div><div style={{ fontSize: 8.5, color: "#666", lineHeight: 1.6, marginBottom: 10 }}>{data.about}</div></>)}
            {data.skills.length > 0 && (<><div style={{ fontSize: 9, fontWeight: 700, color: ac, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Compétences</div>{data.skills.map((s, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}><div style={{ width: 3, height: 3, borderRadius: "50%", background: ac, flexShrink: 0 }}></div><span style={{ fontSize: 8.5, color: "#333" }}>{s}</span></div>))}</>)}
            {data.languages.length > 0 && (<div style={{ marginTop: 10 }}><div style={{ fontSize: 9, fontWeight: 700, color: ac, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Langues</div>{data.languages.map((l, i) => (<div key={i} style={{ fontSize: 8.5, color: "#333", marginBottom: 3 }}>{l.name}{l.level && <span style={{ color: "#888" }}> · {l.level}</span>}</div>))}</div>)}
          </div>
          <div style={{ padding: "12px 14px 12px 10px" }}>
            {data.education.length > 0 && (<><div style={{ fontSize: 9, fontWeight: 700, color: ac, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Formation</div>{data.education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}><div style={{ fontSize: 9.5, fontWeight: 700, color: "#1a1a1a" }}>{e.degree}</div><div style={{ fontSize: 8.5, color: ac }}>{e.school}</div><div style={{ fontSize: 8, color: "#999" }}>{e.date}</div></div>))}</>)}
            {data.experience.length > 0 && (<div style={{ marginTop: 8 }}><div style={{ fontSize: 9, fontWeight: 700, color: ac, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Expérience</div>{data.experience.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}><div style={{ fontSize: 9.5, fontWeight: 700, color: "#1a1a1a" }}>{e.role}</div><div style={{ fontSize: 8.5, color: ac }}>{e.company}</div><div style={{ fontSize: 8, color: "#999" }}>{e.date}</div>{e.desc && <div style={{ fontSize: 8.5, color: "#666", lineHeight: 1.5, marginTop: 2 }}>{e.desc}</div>}</div>))}</div>)}
          </div>
        </div>
        {!isPro && <div style={{ background: "#f9f9f9", borderTop: "0.5px solid #eee", padding: "5px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 9, color: "#bbb" }}>Créé avec CVcraft.app</span><span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 10, background: "#fff3cd", color: "#856404", border: "0.5px solid #ffc107" }}>⚡ Pro</span></div>}
      </div>
    );
  }

  // TEMPLATE 2 — CRÉATIF
  return (
    <div style={wrapperStyle}>
      <div style={{ height: 6, background: `linear-gradient(90deg, ${ac}, ${ac}88, transparent)` }}></div>
      <div style={{ padding: "14px 16px 10px", borderBottom: `0.5px solid #eee` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              {data.fname}<span style={{ color: ac }}> {data.lname}</span>
            </div>
            <div style={{ fontSize: 10, color: "#666", marginTop: 4, fontStyle: "italic" }}>{data.jobTitle}</div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: ac, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: "#fff", flexShrink: 0 }}>
            {(data.fname || "?")[0]}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
          {[data.email, data.phone, data.city].filter(Boolean).map((c, i) => (
            <span key={i} style={{ fontSize: 8.5, color: "#555", padding: "2px 8px", background: "#f5f5f5", borderRadius: 20, border: "0.5px solid #ddd" }}>{c}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: "10px 16px 14px" }}>
        {data.about && <div style={{ marginBottom: 10, padding: "8px 10px", background: ac + "11", borderLeft: `3px solid ${ac}`, borderRadius: "0 6px 6px 0" }}><div style={{ fontSize: 9, color: "#555", lineHeight: 1.6 }}>{data.about}</div></div>}
        {data.education.length > 0 && (<><div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, marginTop: 8 }}><div style={{ width: 16, height: 16, borderRadius: 4, background: ac, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 9, color: "#fff" }}>🎓</span></div><div style={{ fontSize: 9, fontWeight: 700, color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.08em" }}>{t.education}</div></div>{data.education.map((e, i) => (<div key={i} style={{ marginBottom: 7, paddingLeft: 22 }}><div style={{ fontSize: 10, fontWeight: 700, color: "#1a1a1a" }}>{e.degree}</div><div style={{ display: "flex", justifyContent: "space-between" }}><div style={{ fontSize: 9, color: ac }}>{e.school}</div><div style={{ fontSize: 8.5, color: "#999" }}>{e.date}</div></div></div>))}</>)}
        {data.experience.length > 0 && (<><div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, marginTop: 8 }}><div style={{ width: 16, height: 16, borderRadius: 4, background: ac, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 9, color: "#fff" }}>💼</span></div><div style={{ fontSize: 9, fontWeight: 700, color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.08em" }}>{t.experience}</div></div>{data.experience.map((e, i) => (<div key={i} style={{ marginBottom: 7, paddingLeft: 22 }}><div style={{ fontSize: 10, fontWeight: 700, color: "#1a1a1a" }}>{e.role}</div><div style={{ display: "flex", justifyContent: "space-between" }}><div style={{ fontSize: 9, color: ac }}>{e.company}</div><div style={{ fontSize: 8.5, color: "#999" }}>{e.date}</div></div>{e.desc && <div style={{ fontSize: 8.5, color: "#666", lineHeight: 1.5, marginTop: 2 }}>{e.desc}</div>}</div>))}</>)}
        {data.skills.length > 0 && (<div style={{ marginTop: 8 }}><div style={{ fontSize: 9, fontWeight: 700, color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>{t.skills}</div><div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>{data.skills.map((s, i) => (<span key={i} style={{ fontSize: 8.5, padding: "2px 8px", borderRadius: 4, background: ac, color: "#fff", fontWeight: 500 }}>{s}</span>))}</div></div>)}
        {data.languages.length > 0 && (<div style={{ marginTop: 8 }}><div style={{ fontSize: 9, fontWeight: 700, color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>{t.languages}</div><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{data.languages.map((l, i) => (<div key={i} style={{ fontSize: 9, color: "#444" }}><span style={{ fontWeight: 700 }}>{l.name}</span>{l.level && <span style={{ color: "#999" }}> ({l.level})</span>}</div>))}</div></div>)}
      </div>
      {!isPro && <div style={{ background: "#f9f9f9", borderTop: "0.5px solid #eee", padding: "5px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 9, color: "#bbb" }}>Créé avec CVcraft.app</span><span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 10, background: "#fff3cd", color: "#856404", border: "0.5px solid #ffc107" }}>⚡ Pro</span></div>}
    </div>
  );
}

export default function CVCraft() {
  const [lang, setLang] = useState("fr");
  const [templateIdx, setTemplateIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("info");
  const [isPro, setIsPro] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [scoreData, setScoreData] = useState(null);
  const [scoreLoading, setScoreLoading] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  // ── Adapter pour une offre ──
  const [jobOffer, setJobOffer] = useState("");
  const [adaptLoading, setAdaptLoading] = useState(false);
  const [adaptError, setAdaptError] = useState("");
  const [adaptResult, setAdaptResult] = useState(null); // { changes: [], originalData, adaptedData }
  const [adaptApplied, setAdaptApplied] = useState(false);

  const VALID_CODES = ["CVPRO2026", "NASRO2026", "SUMMER26", "PRO2026"];

  const checkActivationCode = () => {
    if (VALID_CODES.includes(activationCode.trim().toUpperCase())) {
      setIsPro(true); setShowCodeInput(false); setCodeError(""); setActivationCode("");
    } else {
      setCodeError("❌ Code invalide. Vérifie ton email de confirmation PayPal.");
    }
  };

  const generatePDF = async () => {
    setPdfLoading(true);
    try {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      document.head.appendChild(script);
      await new Promise(resolve => script.onload = resolve);
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const tmpl = TEMPLATES[templateIdx];
      const hexToRgb = (hex) => [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
      const [pr, pg, pb] = hexToRgb(tmpl.accent);
      const pageW = 210;
      let y = 0;

      if (templateIdx === 3) {
        // Executive — une colonne pure
        doc.setFillColor(255,255,255); doc.rect(0,0,pageW,297,"F");
        doc.setDrawColor(26,26,26); doc.setLineWidth(0.5);
        doc.setFontSize(22); doc.setFont("helvetica","bold"); doc.setTextColor(13,13,13);
        doc.text(`${(data.fname||"").toUpperCase()} ${(data.lname||"").toUpperCase()}`, 18, 22);
        doc.setFontSize(9); doc.setFont("helvetica","normal"); doc.setTextColor(80,80,80);
        doc.text((data.jobTitle||"").toUpperCase(), 18, 29);
        const contact = [data.email,data.phone,data.city,data.website].filter(Boolean).join("  |  ");
        doc.setFontSize(8); doc.setTextColor(100,100,100); doc.text(contact, 18, 35);
        doc.line(18, 38, pageW-18, 38);
        y = 46;
        const addSec = (title) => {
          doc.setFontSize(8); doc.setFont("helvetica","bold"); doc.setTextColor(13,13,13);
          doc.text(title.toUpperCase(), 18, y);
          doc.line(18+doc.getTextWidth(title.toUpperCase())+3, y-0.5, pageW-18, y-0.5);
          y += 6;
          doc.setFont("helvetica","normal"); doc.setTextColor(60,60,60);
        };
        if (data.about) { addSec("Profil"); doc.setFontSize(9); const lines = doc.splitTextToSize(data.about, pageW-36); doc.text(lines, 18, y); y += lines.length*5+5; }
        if (data.experience.length > 0) { addSec("Expérience Professionnelle"); data.experience.forEach(e => { doc.setFontSize(10); doc.setFont("helvetica","bold"); doc.setTextColor(13,13,13); doc.text(e.role||"", 18, y); doc.setFontSize(9); doc.setFont("helvetica","italic"); doc.setTextColor(80,80,80); doc.text(e.company||"", 18, y+5); doc.setFont("helvetica","normal"); doc.setTextColor(130,130,130); doc.text(e.date||"", pageW-18, y, {align:"right"}); if (e.desc) { doc.setTextColor(80,80,80); const dl = doc.splitTextToSize(e.desc, pageW-36); doc.text(dl, 18, y+10); y += dl.length*4+17; } else { y += 13; } }); }
        if (data.education.length > 0) { addSec("Formation"); data.education.forEach(e => { doc.setFontSize(10); doc.setFont("helvetica","bold"); doc.setTextColor(13,13,13); doc.text(e.degree||"", 18, y); doc.setFontSize(9); doc.setFont("helvetica","italic"); doc.setTextColor(80,80,80); doc.text(e.school||"", 18, y+5); doc.setFont("helvetica","normal"); doc.setTextColor(130,130,130); doc.text(e.date||"", pageW-18, y, {align:"right"}); y += 13; }); }
        if (data.skills.length > 0) { addSec("Compétences & Langues"); doc.setFontSize(9); doc.setFont("helvetica","normal"); doc.setTextColor(60,60,60); doc.text(data.skills.join("  ·  "), 18, y); y += 8; }
        if (!isPro) { doc.setFontSize(7); doc.setTextColor(180,180,180); doc.text("Créé avec CVcraft.app — Pro pour supprimer ce watermark", pageW/2, 290, {align:"center"}); }
      } else {
        // Templates standard
        doc.setFillColor(pr,pg,pb); doc.rect(0,0,pageW,45,"F");
        doc.setTextColor(255,255,255); doc.setFontSize(20); doc.setFont("helvetica","bold");
        doc.text(`${data.fname} ${data.lname}`, 15, 16);
        doc.setFontSize(11); doc.setFont("helvetica","normal"); doc.text(data.jobTitle||"", 15, 24);
        doc.setFontSize(9); doc.text([data.email,data.phone,data.city].filter(Boolean).join("  |  "), 15, 32);
        y = 55;
        const addSection = (title) => { doc.setFontSize(10); doc.setFont("helvetica","bold"); doc.setTextColor(pr,pg,pb); doc.text(title.toUpperCase(), 15, y); doc.setDrawColor(pr,pg,pb); doc.line(15,y+1,pageW-15,y+1); y += 8; doc.setFont("helvetica","normal"); doc.setTextColor(30,30,30); };
        if (data.about) { addSection("À Propos"); doc.setFontSize(9); const lines = doc.splitTextToSize(data.about, pageW-30); doc.text(lines,15,y); y+=lines.length*5+6; }
        if (data.education.length > 0) { addSection("Formation"); data.education.forEach(e => { doc.setFontSize(10); doc.setFont("helvetica","bold"); doc.text(e.degree||"",15,y); doc.setFontSize(9); doc.setFont("helvetica","normal"); doc.setTextColor(pr,pg,pb); doc.text(e.school||"",15,y+5); doc.setTextColor(100,100,100); doc.text(e.date||"",pageW-15,y,{align:"right"}); if(e.desc){doc.setTextColor(80,80,80);const dl=doc.splitTextToSize(e.desc,pageW-30);doc.text(dl,15,y+10);y+=dl.length*4+16;}else{y+=14;} }); }
        if (data.experience.length > 0) { addSection("Expérience"); data.experience.forEach(e => { doc.setFontSize(10); doc.setFont("helvetica","bold"); doc.setTextColor(30,30,30); doc.text(e.role||"",15,y); doc.setFontSize(9); doc.setFont("helvetica","normal"); doc.setTextColor(pr,pg,pb); doc.text(e.company||"",15,y+5); doc.setTextColor(100,100,100); doc.text(e.date||"",pageW-15,y,{align:"right"}); if(e.desc){doc.setTextColor(80,80,80);const dl=doc.splitTextToSize(e.desc,pageW-30);doc.text(dl,15,y+10);y+=dl.length*4+16;}else{y+=14;} }); }
        if (data.skills.length > 0) { addSection("Compétences"); doc.setFontSize(9); doc.setFont("helvetica","normal"); doc.setTextColor(60,60,60); doc.text(data.skills.join("  •  "),15,y); y+=10; }
        if (data.languages.length > 0) { addSection("Langues"); doc.setFontSize(9); doc.setTextColor(60,60,60); doc.text(data.languages.map(l=>`${l.name} (${l.level})`).join("  |  "),15,y); y+=10; }
        if (!isPro) { doc.setFontSize(8); doc.setTextColor(180,180,180); doc.text("Créé avec CVcraft.app — Pro pour supprimer ce watermark", pageW/2, 290, {align:"center"}); }
      }

      doc.save(`CV_${data.fname}_${data.lname}.pdf`);
    } catch(e) {
      console.error(e); window.print();
    }
    setPdfLoading(false);
  };

  const t = translations[lang];

  const [data, setData] = useState({
    fname: "Yassine", lname: "Benali",
    jobTitle: "Étudiant en Réseaux & Sécurité",
    email: "yassine@email.com", phone: "+212 6 00 00 00 00",
    city: "Tanger", website: "",
    about: "Étudiant passionné par les réseaux et la cybersécurité, à la recherche d'un stage pour mettre en pratique mes compétences techniques.",
    education: [{ school: "Institut Supérieur", degree: "BTS Réseaux & Sécurité", date: "2024 – 2026", desc: "Administration réseaux, TCP/IP, cybersécurité, Linux." }],
    experience: [],
    skills: ["Réseaux", "Sécurité", "Linux"],
    languages: [{ name: "Arabe", level: "Natif" }, { name: "Français", level: "Courant" }],
  });

  const set = (field, val) => setData(d => ({ ...d, [field]: val }));
  const setNested = (field, idx, key, val) => setData(d => ({ ...d, [field]: d[field].map((item, i) => i === idx ? { ...item, [key]: val } : item) }));
  const addItem = (field, template) => setData(d => ({ ...d, [field]: [...d[field], { ...template }] }));
  const removeItem = (field, idx) => setData(d => ({ ...d, [field]: d[field].filter((_, i) => i !== idx) }));
  const toggleSkill = (skill) => setData(d => ({ ...d, skills: d.skills.includes(skill) ? d.skills.filter(s => s !== skill) : [...d.skills, skill] }));

  const colors = TEMPLATE_COLORS[templateIdx];

  const generateFromAI = async () => {
    if (!aiPrompt.trim() || !isPro) return;
    setAiLoading(true);
    setAiError("");
    let lastErr = "";
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        if (attempt > 1) await new Promise(r => setTimeout(r, 1500));
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: aiPrompt }),
        });
        const raw = await response.text();
        if (!response.ok) {
          let msg = `Erreur ${response.status}`;
          try { msg = JSON.parse(raw)?.error || msg; } catch(_) {}
          throw new Error(msg);
        }
        const result = JSON.parse(raw);
        if (result.error) throw new Error(result.error);
        if (!result.cv) throw new Error("Réponse invalide");
        setData(d => ({ ...d, ...result.cv }));
        setAiPrompt("");
        setAiLoading(false);
        return;
      } catch(e) {
        lastErr = e.message;
        console.error(`generateFromAI tentative ${attempt}:`, e.message);
      }
    }
    setAiError(`Erreur : ${lastErr}. Réessaie.`);
    setAiLoading(false);
  };

  const [scoreFixLoading, setScoreFixLoading] = useState(null);
  const [scoreFixApplied, setScoreFixApplied] = useState({}); // { index: true } pour l'analyse en cours
  const [correctionsDone, setCorrectionsDone] = useState([]); // historique persistant des champs déjà corrigés

  const analyzeCV = async () => {
    if (!isPro) return;
    setScoreLoading(true);
    setScoreData(null);
    setScoreFixApplied({});

    const alreadyFixed = correctionsDone.length > 0
      ? `\n\nCorrections déjà appliquées — NE PAS les reproposer :\n${correctionsDone.map(c => `- ${c}`).join("\n")}`
      : "";

    const prompt = `Tu es un expert recruteur. Analyse ce CV et retourne un JSON d'évaluation.

CV à analyser :
${JSON.stringify(data, null, 2)}${alreadyFixed}

Règles strictes :
- Ne JAMAIS reproposer une correction déjà listée dans "Corrections déjà appliquées".
- Chaque conseil est soit "actionable" soit "manuel".
- "actionable" UNIQUEMENT pour : reformuler "about", améliorer une description d'expérience existante, reformuler "jobTitle", améliorer une description de formation existante.
- "manuel" pour : ajouter une expérience, un diplôme, une compétence, des coordonnées manquantes.
- Ne JAMAIS inventer des expériences, diplômes, compétences ou coordonnées.

Réponds UNIQUEMENT avec ce JSON valide, sans markdown, sans texte avant ou après :
{
  "score": 72,
  "mention": "Bon CV",
  "points": ["Point fort 1"],
  "conseils": [
    {
      "texte": "Description du problème",
      "actionable": true,
      "fixLabel": "Reformuler le résumé",
      "fixField": "about",
      "fixValue": "Nouveau texte basé uniquement sur les infos du CV"
    },
    {
      "texte": "Ajouter un email",
      "actionable": false
    }
  ]
}`;

    // Tentative avec retry (max 2 fois)
    let lastError = null;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        if (attempt > 1) await new Promise(r => setTimeout(r, 1500));

        const response = await fetch("/api/score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cv: data, prompt }),
        });

        const raw = await response.text();

        if (!response.ok) {
          let errMsg = `Erreur HTTP ${response.status}`;
          try { errMsg = JSON.parse(raw)?.error || errMsg; } catch(_) {}
          throw new Error(errMsg);
        }

        const result = JSON.parse(raw);
        if (result.error) throw new Error(result.error);

        const parsed = result.result;
        if (typeof parsed.score !== "number") throw new Error("JSON incomplet reçu");

        setScoreData(parsed);
        setScoreLoading(false);
        return;

      } catch(e) {
        lastError = e;
        console.error(`Tentative ${attempt} échouée:`, e.message);
      }
    }

    // Toutes les tentatives ont échoué
    const errDisplay = lastError?.message || "Erreur inconnue";
    setScoreData({
      score: 0,
      mention: "Erreur d'analyse",
      points: [],
      conseils: [{
        texte: `⚠️ ${errDisplay}. Clique sur "Analyser mon CV" pour réessayer.`,
        actionable: false
      }]
    });
    setScoreLoading(false);
  };

  const applyScoreFix = async (conseil, index) => {
    if (!conseil.actionable || scoreFixLoading !== null) return;
    if (!conseil.fixField || !conseil.fixValue) return;

    setScoreFixLoading(index);
    await new Promise(r => setTimeout(r, 250));

    // Appliquer la correction sur le CV
    const f = conseil.fixField;
    if (f === "about" || f === "jobTitle" || f === "city" || f === "website") {
      set(f, conseil.fixValue);
    } else if (f.startsWith("experience_") || f.startsWith("education_")) {
      const parts = f.split("_");
      const fieldName = parts[0];
      const idx = parseInt(parts[1]);
      const key = parts[2];
      if (!isNaN(idx)) setNested(fieldName, idx, key, conseil.fixValue);
    }

    // Marquer comme appliqué dans l'UI
    setScoreFixApplied(prev => ({ ...prev, [index]: true }));

    // Ajouter dans l'historique persistant pour les prochaines analyses
    const label = conseil.fixLabel || conseil.texte;
    setCorrectionsDone(prev => prev.includes(label) ? prev : [...prev, label]);

    setScoreFixLoading(null);
  };

  // ── Adapter CV pour une offre d'emploi ──
  const adaptCV = async () => {
    if (!jobOffer.trim() || !isPro) return;
    setAdaptLoading(true);
    setAdaptError("");
    setAdaptResult(null);
    setAdaptApplied(false);

    const prompt = `Tu es un expert en recrutement et optimisation ATS. Voici le CV actuel du candidat :
${JSON.stringify(data, null, 2)}

Voici l'offre d'emploi :
"""
${jobOffer}
"""

Ta mission : adapter le CV pour maximiser ses chances de passer les filtres ATS et convaincre le recruteur pour CE poste.

Règles strictes :
- NE PAS inventer des expériences ou diplômes absents du CV original
- Réécrire les descriptions d'expériences et le résumé "about" avec les mots-clés de l'offre
- Réordonner les compétences par pertinence pour l'offre
- Adapter le titre jobTitle si pertinent
- Conserver toutes les informations factuelles (dates, noms, diplômes)

Réponds UNIQUEMENT avec un JSON valide, sans markdown, sans texte avant ou après :
{
  "adaptedData": { ...CV complet adapté, mêmes champs que l'original... },
  "changes": [
    { "field": "about", "description": "Résumé réécrit avec mots-clés de l'offre" }
  ],
  "matchScore": 78,
  "keywords": ["mot-clé 1", "mot-clé 2"]
}`;

    let lastErr = "";
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        if (attempt > 1) await new Promise(r => setTimeout(r, 1500));
        const response = await fetch("/api/adapt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cv: data, prompt }),
        });
        const raw = await response.text();
        if (!response.ok) {
          let msg = `Erreur ${response.status}`;
          try { msg = JSON.parse(raw)?.error || msg; } catch(_) {}
          throw new Error(msg);
        }
        const result = JSON.parse(raw);
        if (result.error) throw new Error(result.error);
        const parsed = result.result;
        if (!parsed.adaptedData) throw new Error("Structure JSON incomplète");
        setAdaptResult({ ...parsed, originalData: { ...data } });
        setAdaptLoading(false);
        return;
      } catch(e) {
        lastErr = e.message;
        console.error(`adaptCV tentative ${attempt}:`, e.message);
      }
    }
    setAdaptError(`Erreur : ${lastErr}. Réessaie.`);
    setAdaptLoading(false);
  };

  const applyAdaptation = () => {
    if (!adaptResult?.adaptedData) return;
    setData(d => ({ ...d, ...adaptResult.adaptedData }));
    setAdaptApplied(true);
  };

  const revertAdaptation = () => {
    if (!adaptResult?.originalData) return;
    setData(d => ({ ...d, ...adaptResult.originalData }));
    setAdaptApplied(false);
  };

  const tabs = [
    { id: "info", icon: "👤", label: t.info.split(" ")[0] },
    { id: "edu", icon: "🎓", label: t.education },
    { id: "exp", icon: "💼", label: t.experience },
    { id: "skills", icon: "⚡", label: t.skills },
    { id: "langs", icon: "🌍", label: t.languages },
    { id: "ai", icon: "✨", label: "IA" },
    { id: "adapt", icon: "🎯", label: "Offre" },
    { id: "score", icon: "📊", label: "Score" },
  ];

  // Thumbnails distinctifs pour le picker de templates
  const TemplateThumbnail = ({ idx }) => {
    const isPrem = idx >= 3;
    const isSelected = templateIdx === idx;
    const colors_t = TEMPLATE_COLORS[idx];

    if (idx === 3) return (
      <div style={{ height: 46, padding: "5px 6px", display: "flex", flexDirection: "column", gap: 2, justifyContent: "center" }}>
        <div style={{ height: 5, background: "#1A1A1A", width: "70%" }} />
        <div style={{ height: 2.5, background: "#888", width: "90%", marginTop: 1 }} />
        <div style={{ height: 0.75, background: "#1A1A1A", width: "100%", margin: "3px 0" }} />
        <div style={{ height: 2, background: "#CCC", width: "85%" }} />
        <div style={{ height: 2, background: "#CCC", width: "75%" }} />
        <div style={{ height: 0.75, background: "#1A1A1A", width: "100%", margin: "2px 0" }} />
        <div style={{ height: 2, background: "#CCC", width: "90%" }} />
      </div>
    );
    if (idx === 4) return (
      <div style={{ height: 46, overflow: "hidden" }}>
        <div style={{ height: 14, background: "#1B3A6B", display: "flex", alignItems: "center", padding: "0 5px", gap: 3 }}>
          <div style={{ height: 3, background: "rgba(255,255,255,0.9)", width: "45%", borderRadius: 1 }} />
          <div style={{ flex: 1 }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)" }} />
        </div>
        <div style={{ padding: "3px 5px", display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ height: 1.5, background: "#1B3A6B", width: "60%" }} />
          <div style={{ height: 2, background: "#DDD", width: "95%" }} />
          <div style={{ height: 2, background: "#DDD", width: "80%" }} />
          <div style={{ height: 1.5, background: "#1B3A6B", width: "55%", marginTop: 2 }} />
          <div style={{ display: "flex", gap: 3 }}>
            <div style={{ width: 2, height: 8, background: "#1B3A6B", borderRadius: 1 }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
              <div style={{ height: 2, background: "#333", width: "70%" }} />
              <div style={{ height: 1.5, background: "#DDD", width: "90%" }} />
            </div>
          </div>
        </div>
      </div>
    );
    if (idx === 5) return (
      <div style={{ height: 46, background: "#F7F7F7", overflow: "hidden" }}>
        <div style={{ height: 14, background: "#FFF", borderLeft: "2.5px solid #0052CC", padding: "3px 5px", display: "flex", flexDirection: "column", gap: 1.5 }}>
          <div style={{ height: 3.5, background: "#0A0A0A", width: "55%", borderRadius: 0.5 }} />
          <div style={{ height: 2, background: "#0052CC", width: "40%", borderRadius: 0.5 }} />
        </div>
        <div style={{ padding: "3px 5px", display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ height: 1.5, background: "#0052CC", width: "40%", fontFamily: "monospace" }} />
          <div style={{ height: 7, background: "#FFF", borderRadius: 2, border: "0.5px solid #E4E4E4", borderLeft: "1.5px solid #0052CC" }} />
          <div style={{ height: 1.5, background: "#0052CC", width: "35%" }} />
          <div style={{ height: 4, background: "#FFF", borderRadius: 2, border: "0.5px solid #E4E4E4" }} />
        </div>
      </div>
    );

    // Free templates thumbnails
    if (idx === 0) return (
      <div style={{ height: 46, display: "flex", overflow: "hidden", borderRadius: 3 }}>
        <div style={{ width: "35%", background: colors_t.primary, padding: "4px 3px", display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.5)" }} />
          <div style={{ height: 1.5, background: "rgba(255,255,255,0.5)", width: "80%" }} />
          <div style={{ height: 1.5, background: "rgba(255,255,255,0.3)", width: "60%" }} />
        </div>
        <div style={{ flex: 1, padding: "4px 3px", display: "flex", flexDirection: "column", gap: 1.5 }}>
          <div style={{ height: 1.5, background: colors_t.primary, width: "70%" }} />
          <div style={{ height: 1.5, background: "#DDD", width: "90%" }} />
          <div style={{ height: 1.5, background: "#DDD", width: "75%" }} />
          <div style={{ height: 1.5, background: colors_t.primary, width: "60%", marginTop: 2 }} />
          <div style={{ height: 1.5, background: "#DDD", width: "85%" }} />
        </div>
      </div>
    );
    if (idx === 1) return (
      <div style={{ height: 46, overflow: "hidden", borderRadius: 3 }}>
        <div style={{ height: 14, background: `linear-gradient(135deg, ${colors_t.primary}, ${colors_t.primary}cc)`, padding: "3px 5px" }}>
          <div style={{ height: 3.5, background: "rgba(255,255,255,0.9)", width: "50%", borderRadius: 1 }} />
          <div style={{ height: 2, background: "rgba(255,255,255,0.5)", width: "35%", marginTop: 1.5 }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: 32, gap: 0 }}>
          {[0,1].map(c => (
            <div key={c} style={{ padding: "3px 4px", display: "flex", flexDirection: "column", gap: 1.5, borderRight: c === 0 ? "0.5px solid #EEE" : "none" }}>
              <div style={{ height: 1.5, background: colors_t.primary, width: "70%" }} />
              <div style={{ height: 1.5, background: "#DDD", width: "90%" }} />
              <div style={{ height: 1.5, background: "#DDD", width: "75%" }} />
            </div>
          ))}
        </div>
      </div>
    );
    // idx === 2
    return (
      <div style={{ height: 46, overflow: "hidden", borderRadius: 3 }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${colors_t.primary}, ${colors_t.primary}66)` }} />
        <div style={{ padding: "4px 5px", display: "flex", flexDirection: "column", gap: 1.5 }}>
          <div style={{ height: 4, background: "#1a1a1a", width: "55%", borderRadius: 1 }} />
          <div style={{ height: 2, background: "#999", width: "40%", borderRadius: 1 }} />
          <div style={{ height: 5, background: colors_t.primary + "22", borderLeft: `2px solid ${colors_t.primary}`, padding: "1px 3px", marginTop: 1 }}>
            <div style={{ height: 1.5, background: "#888", width: "90%" }} />
            <div style={{ height: 1.5, background: "#AAA", width: "75%", marginTop: 1 }} />
          </div>
          <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
            {["","",""].map((_,i) => <div key={i} style={{ height: 5, flex: 1, background: colors_t.primary, borderRadius: 1 }} />)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8f9fa 0%, #eef2f7 100%)",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        textarea, input { color: #1a1a1a !important; -webkit-text-fill-color: #1a1a1a !important; caret-color: #1a1a1a !important; }
        textarea::placeholder, input::placeholder { color: #aaa !important; -webkit-text-fill-color: #aaa !important; }
      `}</style>
      {/* Top nav */}
      <div style={{
        background: "#fff", borderBottom: "0.5px solid #e8e8e8",
        padding: "0 24px", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 56,
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: colors.primary, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 700 }}>C</div>
          <span style={{ fontSize: 17, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.02em" }}>CVcraft</span>
          <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: colors.light, color: colors.primary, fontWeight: 600, marginLeft: 4 }}>Beta</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {["fr", "en", "ar"].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding: "4px 11px", borderRadius: 20,
              border: `0.5px solid ${lang === l ? colors.primary : "#e0e0e0"}`,
              background: lang === l ? colors.primary : "transparent",
              color: lang === l ? "#fff" : "#666",
              fontSize: 12, fontWeight: 600, cursor: "pointer",
            }}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "24px 24px 0" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.03em", margin: 0 }}>
          {t.tagline} <span style={{ color: colors.primary }}>✦</span>
        </h1>
      </div>

      {/* Template picker */}
      <div style={{ padding: "16px 24px 0" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{t.template}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {t.templates.map((name, i) => {
            const isPremiumTemplate = i >= 3;
            const locked = isPremiumTemplate && !isPro;
            return (
              <button key={i} onClick={() => !locked && setTemplateIdx(i)} style={{
                padding: "0", borderRadius: 10, position: "relative", overflow: "hidden",
                border: `${templateIdx === i ? "2.5px" : "0.5px"} solid ${templateIdx === i ? TEMPLATE_COLORS[i].primary : "#e0e0e0"}`,
                background: "#fff",
                cursor: locked ? "not-allowed" : "pointer",
                opacity: locked ? 0.7 : 1,
                transition: "all 0.15s",
                boxShadow: templateIdx === i ? `0 0 0 3px ${TEMPLATE_COLORS[i].primary}22` : "none",
              }}>
                {locked && (
                  <div style={{
                    position: "absolute", top: 4, right: 4, zIndex: 2,
                    background: "#F5A623", borderRadius: 4,
                    fontSize: 8, fontWeight: 800, color: "#fff",
                    padding: "2px 5px", letterSpacing: "0.05em",
                  }}>PRO</div>
                )}
                <TemplateThumbnail idx={i} />
                <div style={{
                  fontSize: 10.5, fontWeight: 700, padding: "5px 0 7px",
                  color: templateIdx === i ? TEMPLATE_COLORS[i].primary : "#555",
                  textAlign: "center", borderTop: "0.5px solid #F0F0F0",
                  background: templateIdx === i ? TEMPLATE_COLORS[i].light : "#FAFAFA",
                }}>{name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, padding: "20px 24px 40px", maxWidth: 1100, margin: "0 auto" }}>

        {/* Left: Form */}
        <div style={{ background: "#fff", borderRadius: 14, border: "0.5px solid #e8e8e8", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", borderBottom: "0.5px solid #eee", overflowX: "auto" }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                flex: 1, padding: "11px 6px", border: "none",
                borderBottom: activeTab === tab.id ? `2px solid ${colors.primary}` : "2px solid transparent",
                background: "transparent", cursor: "pointer",
                fontSize: 11, fontWeight: 600,
                color: activeTab === tab.id ? colors.primary : "#999",
                transition: "all 0.15s", whiteSpace: "nowrap",
              }}>
                <div>{tab.icon}</div>
                <div>{tab.label}</div>
              </button>
            ))}
          </div>

          <div style={{ padding: "16px 18px 20px" }}>

            {activeTab === "info" && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <Input label={t.fname} value={data.fname} onChange={v => set("fname", v)} />
                  <Input label={t.lname} value={data.lname} onChange={v => set("lname", v)} />
                </div>
                <Input label={t.jobTitle} value={data.jobTitle} onChange={v => set("jobTitle", v)} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <Input label={t.email} value={data.email} onChange={v => set("email", v)} />
                  <Input label={t.phone} value={data.phone} onChange={v => set("phone", v)} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <Input label={t.city} value={data.city} onChange={v => set("city", v)} />
                  <Input label={t.website} value={data.website} onChange={v => set("website", v)} />
                </div>
                <Input label={t.about} value={data.about} onChange={v => set("about", v)} multiline placeholder={t.aboutPlaceholder} />
              </div>
            )}

            {activeTab === "edu" && (
              <div>
                {data.education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: 16, padding: 14, borderRadius: 10, border: "0.5px solid #eee", background: "#fafafa" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: colors.primary }}>#{i + 1}</span>
                      <button onClick={() => removeItem("education", i)} style={{ fontSize: 11, color: "#c0392b", background: "none", border: "none", cursor: "pointer" }}>{t.removeItem}</button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <Input label={t.eduSchool} value={edu.school} onChange={v => setNested("education", i, "school", v)} />
                      <Input label={t.eduDate} value={edu.date} onChange={v => setNested("education", i, "date", v)} />
                    </div>
                    <Input label={t.eduDegree} value={edu.degree} onChange={v => setNested("education", i, "degree", v)} />
                    <Input label={t.eduDesc} value={edu.desc} onChange={v => setNested("education", i, "desc", v)} multiline />
                  </div>
                ))}
                <button onClick={() => addItem("education", { school: "", degree: "", date: "", desc: "" })} style={{ width: "100%", padding: "10px", borderRadius: 8, border: `0.5px dashed ${colors.primary}`, background: colors.light, color: colors.primary, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{t.addItem}</button>
              </div>
            )}

            {activeTab === "exp" && (
              <div>
                {data.experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: 16, padding: 14, borderRadius: 10, border: "0.5px solid #eee", background: "#fafafa" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: colors.primary }}>#{i + 1}</span>
                      <button onClick={() => removeItem("experience", i)} style={{ fontSize: 11, color: "#c0392b", background: "none", border: "none", cursor: "pointer" }}>{t.removeItem}</button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <Input label={t.expCompany} value={exp.company} onChange={v => setNested("experience", i, "company", v)} />
                      <Input label={t.expDate} value={exp.date} onChange={v => setNested("experience", i, "date", v)} />
                    </div>
                    <Input label={t.expRole} value={exp.role} onChange={v => setNested("experience", i, "role", v)} />
                    <Input label={t.expDesc} value={exp.desc} onChange={v => setNested("experience", i, "desc", v)} multiline />
                  </div>
                ))}
                <button onClick={() => addItem("experience", { company: "", role: "", date: "", desc: "" })} style={{ width: "100%", padding: "10px", borderRadius: 8, border: `0.5px dashed ${colors.primary}`, background: colors.light, color: colors.primary, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{t.addItem}</button>
              </div>
            )}

            {activeTab === "skills" && (
              <div>
                <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>Clique pour ajouter / retirer</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  {t.skillSuggestions.map(skill => (
                    <button key={skill} onClick={() => toggleSkill(skill)} style={{
                      padding: "5px 12px", borderRadius: 20, cursor: "pointer",
                      border: `0.5px solid ${data.skills.includes(skill) ? colors.primary : "#ddd"}`,
                      background: data.skills.includes(skill) ? colors.light : "#fff",
                      color: data.skills.includes(skill) ? colors.primary : "#666",
                      fontSize: 12, fontWeight: 500,
                    }}>{skill}</button>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Compétence personnalisée</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input id="custom-skill" placeholder="Ex: Cisco, Wireshark..." style={{ flex: 1, padding: "8px 11px", borderRadius: 8, border: "0.5px solid #ddd", fontSize: 13, fontFamily: "inherit", background: "#fafafa" }}
                    onKeyDown={e => { if (e.key === "Enter" && e.target.value.trim()) { toggleSkill(e.target.value.trim()); e.target.value = ""; } }} />
                  <button onClick={() => { const el = document.getElementById("custom-skill"); if (el?.value.trim()) { toggleSkill(el.value.trim()); el.value = ""; } }} style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: colors.primary, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+</button>
                </div>
                {data.skills.length > 0 && (
                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Sélectionnées ({data.skills.length})</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {data.skills.map(s => (<span key={s} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, background: colors.light, color: colors.primary, border: `0.5px solid ${colors.accent}` }}>{s}</span>))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "langs" && (
              <div>
                {data.languages.map((l, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-end" }}>
                    <div style={{ flex: 1 }}>
                      <Input label={i === 0 ? t.languages : ""} value={l.name} onChange={v => setNested("languages", i, "name", v)} placeholder="Ex: Arabe" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <select value={l.level} onChange={e => setNested("languages", i, "level", e.target.value)} style={{ width: "100%", padding: "8px 11px", borderRadius: 8, border: "0.5px solid #ddd", fontSize: 13, fontFamily: "inherit", background: "#fafafa", marginBottom: 10 }}>
                        {t.langLevels.map(lv => <option key={lv} value={lv}>{lv}</option>)}
                      </select>
                    </div>
                    <button onClick={() => removeItem("languages", i)} style={{ padding: "8px 10px", marginBottom: 10, borderRadius: 8, border: "0.5px solid #fdd", background: "#fff5f5", color: "#c0392b", cursor: "pointer", fontSize: 13 }}>✕</button>
                  </div>
                ))}
                <button onClick={() => addItem("languages", { name: "", level: t.langLevels[0] })} style={{ width: "100%", padding: "10px", borderRadius: 8, border: `0.5px dashed ${colors.primary}`, background: colors.light, color: colors.primary, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{t.addItem}</button>
              </div>
            )}

            {activeTab === "adapt" && (
              <div>
                {!isPro ? (
                  /* ── Paywall ── */
                  <div style={{ textAlign: "center", padding: "24px 16px", borderRadius: 12, border: "1.5px dashed #ffc107", background: "#fffdf0" }}>
                    <div style={{ fontSize: 36, marginBottom: 10 }}>🎯</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 6 }}>Adapter pour une offre — Pro uniquement</div>
                    <div style={{ fontSize: 13, color: "#555", marginBottom: 14, lineHeight: 1.7 }}>
                      Colle une offre d'emploi et l'IA réécrit ton CV pour matcher exactement les mots-clés ATS et les exigences du poste.
                    </div>
                    <div style={{ fontSize: 12, padding: "10px 14px", borderRadius: 8, background: "#fff", border: "0.5px solid #e0e0e0", marginBottom: 16, textAlign: "left", lineHeight: 1.7 }}>
                      <div style={{ fontWeight: 700, color: "#1a1a1a", marginBottom: 6 }}>Ce que l'IA fait pour toi :</div>
                      {["✓ Réécrit ton résumé avec les mots-clés de l'offre", "✓ Réordonne tes compétences par pertinence", "✓ Adapte tes descriptions d'expérience", "✓ Calcule un score de compatibilité ATS"].map((item, i) => (
                        <div key={i} style={{ fontSize: 12, color: "#444", marginBottom: 3 }}>{item}</div>
                      ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <button onClick={() => window.open(PAYPAL_LINK, "_blank")} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: "#003087", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>🅿️ Payer 5$/mois via PayPal</button>
                      <button onClick={() => setShowCodeInput(true)} style={{ padding: "7px", borderRadius: 8, border: "0.5px solid #ddd", background: "#f9f9f9", color: "#666", fontSize: 11, cursor: "pointer" }}>✓ J'ai déjà payé — Entrer mon code</button>
                    </div>
                  </div>
                ) : (
                  /* ── Interface principale ── */
                  <div>

                    {/* Badge Pro */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, padding: "7px 10px", borderRadius: 8, background: "#EEF2F8", border: "0.5px solid #1B3A6B" }}>
                      <span style={{ fontSize: 14 }}>🎯</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#1B3A6B" }}>Adaptation IA Pro</div>
                        <div style={{ fontSize: 11, color: "#666" }}>L'IA réécrit ton CV pour maximiser tes chances sur ce poste</div>
                      </div>
                    </div>

                    {/* Si adaptation déjà appliquée */}
                    {adaptApplied && adaptResult && (
                      <div style={{ marginBottom: 14, padding: "10px 12px", borderRadius: 10, background: "#E8F5E9", border: "0.5px solid #4CAF50", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: "#2E7D32" }}>✓ Adaptation appliquée</div>
                          <div style={{ fontSize: 11, color: "#555" }}>Ton CV a été mis à jour</div>
                        </div>
                        <button onClick={revertAdaptation} style={{ padding: "5px 10px", borderRadius: 6, border: "0.5px solid #C8E6C9", background: "#fff", color: "#c0392b", fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                          ↩ Annuler
                        </button>
                      </div>
                    )}

                    {/* Zone de texte offre */}
                    <div style={{ marginBottom: 6 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#444", marginBottom: 5 }}>
                        Colle l'offre d'emploi complète ici
                      </div>
                      <textarea
                        value={jobOffer}
                        onChange={e => { setJobOffer(e.target.value); setAdaptResult(null); setAdaptApplied(false); setAdaptError(""); }}
                        placeholder={"Exemples :\n• Fiche de poste LinkedIn\n• Annonce Indeed / Bayt / Rekrute\n• Description de poste envoyée par email\n\nPlus l'offre est complète, meilleure sera l'adaptation."}
                        style={{
                          width: "100%", minHeight: 140, padding: "10px 12px",
                          borderRadius: 10, border: "0.5px solid #ddd",
                          fontSize: 12, fontFamily: "inherit", lineHeight: 1.6,
                          background: "#fafafa", resize: "vertical", outline: "none",
                          color: "#1a1a1a", WebkitTextFillColor: "#1a1a1a", caretColor: "#1a1a1a", boxSizing: "border-box",
                        }}
                      />
                    </div>

                    {adaptError && (
                      <div style={{ fontSize: 12, color: "#c0392b", marginBottom: 10, padding: "8px 10px", borderRadius: 8, background: "#fdecea", border: "0.5px solid #f5c6cb" }}>
                        ⚠️ {adaptError}
                      </div>
                    )}

                    {/* Bouton adapter */}
                    <button
                      onClick={adaptCV}
                      disabled={adaptLoading || !jobOffer.trim()}
                      style={{
                        width: "100%", padding: "12px", borderRadius: 10, border: "none",
                        background: adaptLoading || !jobOffer.trim() ? "#C5CAE9" : "#1B3A6B",
                        color: "#fff", fontSize: 14, fontWeight: 700,
                        cursor: adaptLoading || !jobOffer.trim() ? "not-allowed" : "pointer",
                        marginBottom: 16, display: "flex", alignItems: "center",
                        justifyContent: "center", gap: 8, transition: "background 0.2s",
                      }}
                    >
                      {adaptLoading ? (
                        <>
                          <span style={{ display: "inline-block", animation: "spin 1s linear infinite", fontSize: 16 }}>⟳</span>
                          Analyse en cours…
                        </>
                      ) : "🎯 Adapter mon CV pour cette offre"}
                    </button>

                    {/* Résultats */}
                    {adaptResult && !adaptLoading && (
                      <div>
                        {/* Score de compatibilité */}
                        <div style={{
                          display: "flex", alignItems: "center", gap: 14,
                          padding: "12px 14px", borderRadius: 10,
                          background: adaptResult.matchScore >= 70 ? "#E8F5E9" : adaptResult.matchScore >= 50 ? "#FFF8E1" : "#FBE9E7",
                          border: `0.5px solid ${adaptResult.matchScore >= 70 ? "#A5D6A7" : adaptResult.matchScore >= 50 ? "#FFE082" : "#FFAB91"}`,
                          marginBottom: 14,
                        }}>
                          <div style={{ textAlign: "center", flexShrink: 0 }}>
                            <div style={{
                              fontSize: 28, fontWeight: 900,
                              color: adaptResult.matchScore >= 70 ? "#2E7D32" : adaptResult.matchScore >= 50 ? "#F57F17" : "#BF360C",
                            }}>{adaptResult.matchScore}%</div>
                            <div style={{ fontSize: 9, color: "#888", fontWeight: 600 }}>MATCH ATS</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>
                              {adaptResult.matchScore >= 70 ? "Excellent matching — Postule maintenant !" : adaptResult.matchScore >= 50 ? "Bon matching — quelques ajustements faits" : "Matching amélioré — continue à personnaliser"}
                            </div>
                            {adaptResult.keywords?.length > 0 && (
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                {adaptResult.keywords.map((kw, i) => (
                                  <span key={i} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, background: "#fff", border: "0.5px solid #ccc", color: "#444" }}>{kw}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Liste des modifications */}
                        {adaptResult.changes?.length > 0 && (
                          <div style={{ marginBottom: 14 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>
                              Modifications effectuées ({adaptResult.changes.length})
                            </div>
                            {adaptResult.changes.map((change, i) => (
                              <div key={i} style={{
                                display: "flex", gap: 8, marginBottom: 6,
                                padding: "7px 10px", borderRadius: 8,
                                background: "#F5F5F5", border: "0.5px solid #E0E0E0",
                              }}>
                                <span style={{ fontSize: 14, flexShrink: 0 }}>✎</span>
                                <div>
                                  <div style={{ fontSize: 11, fontWeight: 700, color: "#1B3A6B", textTransform: "capitalize" }}>{change.field}</div>
                                  <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>{change.description}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Boutons action */}
                        {!adaptApplied ? (
                          <div style={{ display: "flex", gap: 8 }}>
                            <button
                              onClick={applyAdaptation}
                              style={{
                                flex: 1, padding: "11px", borderRadius: 10, border: "none",
                                background: "#1B3A6B", color: "#fff",
                                fontSize: 13, fontWeight: 700, cursor: "pointer",
                              }}
                            >
                              ✓ Appliquer les modifications
                            </button>
                            <button
                              onClick={() => { setAdaptResult(null); setAdaptError(""); }}
                              style={{
                                padding: "11px 14px", borderRadius: 10,
                                border: "0.5px solid #ddd", background: "#fff",
                                color: "#888", fontSize: 12, cursor: "pointer",
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: "flex", gap: 8 }}>
                            <button
                              onClick={() => { setAdaptResult(null); setJobOffer(""); setAdaptApplied(false); }}
                              style={{
                                flex: 1, padding: "10px", borderRadius: 10,
                                border: "0.5px solid #1B3A6B", background: "#EEF2F8",
                                color: "#1B3A6B", fontSize: 12, fontWeight: 700, cursor: "pointer",
                              }}
                            >
                              🔄 Adapter pour une autre offre
                            </button>
                            <button
                              onClick={revertAdaptation}
                              style={{
                                padding: "10px 14px", borderRadius: 10,
                                border: "0.5px solid #fdd", background: "#fff5f5",
                                color: "#c0392b", fontSize: 12, cursor: "pointer",
                              }}
                            >
                              ↩
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "score" && (
              <div>
                {!isPro ? (
                  <div style={{ textAlign: "center", padding: "24px 16px", borderRadius: 12, border: "1.5px dashed #ffc107", background: "#fffdf0" }}>
                    <div style={{ fontSize: 32, marginBottom: 10 }}>📊</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 6 }}>Score IA — Pro uniquement</div>
                    <div style={{ fontSize: 13, color: "#666", marginBottom: 16, lineHeight: 1.6 }}>Obtiens un score sur 100, tes points forts et des conseils personnalisés.</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <button onClick={() => window.open(PAYPAL_LINK, "_blank")} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: "#003087", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>🅿️ Payer 5$/mois via PayPal</button>
                      <button onClick={() => setShowCodeInput(true)} style={{ padding: "7px", borderRadius: 8, border: "0.5px solid #ddd", background: "#f9f9f9", color: "#666", fontSize: 11, cursor: "pointer" }}>✓ J'ai déjà payé — Entrer mon code</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Bouton analyser */}
                    <button
                      onClick={analyzeCV}
                      disabled={scoreLoading}
                      style={{
                        width: "100%", padding: "11px", borderRadius: 10, border: "none",
                        background: scoreLoading ? "#ccc" : "#7c3aed",
                        color: "#fff", fontSize: 14, fontWeight: 700,
                        cursor: scoreLoading ? "not-allowed" : "pointer",
                        marginBottom: 16, display: "flex", alignItems: "center",
                        justifyContent: "center", gap: 8,
                      }}>
                      {scoreLoading
                        ? <><span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span> Analyse en cours…</>
                        : "📊 Analyser mon CV"}
                    </button>

                    {scoreData && (
                      <div>
                        {/* Cercle score */}
                        <div style={{ textAlign: "center", marginBottom: 20 }}>
                          <div style={{
                            width: 90, height: 90, borderRadius: "50%", margin: "0 auto 10px",
                            background: `conic-gradient(${scoreData.score >= 75 ? "#0F6E56" : scoreData.score >= 50 ? "#f59e0b" : "#c0392b"} ${scoreData.score * 3.6}deg, #eee 0deg)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <div style={{ width: 70, height: 70, borderRadius: "50%", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ fontSize: 22, fontWeight: 800, color: "#1a1a1a" }}>{scoreData.score}</span>
                              <span style={{ fontSize: 9, color: "#888" }}>/100</span>
                            </div>
                          </div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: scoreData.score >= 75 ? "#0F6E56" : scoreData.score >= 50 ? "#f59e0b" : "#c0392b" }}>{scoreData.mention}</div>
                        </div>

                        {/* Points forts */}
                        {scoreData.points?.length > 0 && (
                          <div style={{ marginBottom: 16 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "#0F6E56", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>✅ Points forts</div>
                            {scoreData.points.map((p, i) => (
                              <div key={i} style={{ fontSize: 12, color: "#2d6a4f", padding: "7px 10px", borderRadius: 8, background: "#E1F5EE", marginBottom: 5, lineHeight: 1.5, border: "0.5px solid #b7e4c7" }}>• {p}</div>
                            ))}
                          </div>
                        )}

                        {/* Conseils avec boutons Corriger */}
                        {scoreData.conseils?.length > 0 && (
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>💡 Améliorations</div>
                            {scoreData.conseils.map((conseil, i) => {
                              const c = typeof conseil === "string"
                                ? { texte: conseil, actionable: false }
                                : conseil;
                              const applied = scoreFixApplied[i];
                              const loading = scoreFixLoading === i;
                              return (
                                <div key={i} style={{
                                  marginBottom: 8, padding: "10px 12px",
                                  borderRadius: 10,
                                  background: applied ? "#E8F5E9" : "#FAF5FF",
                                  border: `0.5px solid ${applied ? "#A5D6A7" : c.actionable ? "#c4b5fd" : "#e0d4f7"}`,
                                  transition: "all 0.2s",
                                }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                                    <div style={{ flex: 1 }}>
                                      {/* Badge type */}
                                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                                        {applied ? (
                                          <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 20, background: "#4CAF50", color: "#fff" }}>✓ Appliqué</span>
                                        ) : c.actionable ? (
                                          <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 20, background: "#7c3aed", color: "#fff" }}>⚡ Corrigeable</span>
                                        ) : (
                                          <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 20, background: "#888", color: "#fff" }}>✎ Manuel</span>
                                        )}
                                      </div>
                                      <div style={{ fontSize: 12, color: applied ? "#2E7D32" : "#444", lineHeight: 1.5 }}>
                                        {applied ? "✓ Correction appliquée sur ton CV" : c.texte}
                                      </div>
                                    </div>

                                    {/* Bouton corriger — uniquement si actionable et pas encore appliqué */}
                                    {c.actionable && !applied && (
                                      <button
                                        onClick={() => applyScoreFix(c, i)}
                                        disabled={loading || scoreFixLoading !== null}
                                        style={{
                                          flexShrink: 0,
                                          padding: "6px 10px", borderRadius: 8, border: "none",
                                          background: loading ? "#ccc" : "#7c3aed",
                                          color: "#fff", fontSize: 11, fontWeight: 700,
                                          cursor: loading || scoreFixLoading !== null ? "not-allowed" : "pointer",
                                          whiteSpace: "nowrap",
                                          display: "flex", alignItems: "center", gap: 4,
                                        }}
                                      >
                                        {loading
                                          ? <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span>
                                          : <>{c.fixLabel || "Corriger"}</>
                                        }
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}

                            {/* Récapitulatif corrections + historique */}
                            {(Object.keys(scoreFixApplied).length > 0 || correctionsDone.length > 0) && (
                              <div style={{
                                marginTop: 12, padding: "10px 12px", borderRadius: 10,
                                background: "#E8F5E9", border: "0.5px solid #A5D6A7",
                              }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: correctionsDone.length > 0 ? 8 : 0 }}>
                                  <div style={{ fontSize: 12, color: "#2E7D32", fontWeight: 600 }}>
                                    {correctionsDone.length} correction{correctionsDone.length > 1 ? "s" : ""} appliquée{correctionsDone.length > 1 ? "s" : ""} au total
                                  </div>
                                  <div style={{ display: "flex", gap: 6 }}>
                                    <button
                                      onClick={analyzeCV}
                                      style={{ padding: "5px 10px", borderRadius: 8, border: "none", background: "#7c3aed", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                                    >↻ Ré-analyser</button>
                                    <button
                                      onClick={() => setCorrectionsDone([])}
                                      style={{ padding: "5px 8px", borderRadius: 8, border: "0.5px solid #A5D6A7", background: "#fff", color: "#888", fontSize: 11, cursor: "pointer" }}
                                      title="Réinitialiser l'historique des corrections"
                                    >✕</button>
                                  </div>
                                </div>
                                {correctionsDone.length > 0 && (
                                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                    {correctionsDone.map((c, i) => (
                                      <div key={i} style={{ fontSize: 11, color: "#388E3C", display: "flex", gap: 5, alignItems: "flex-start" }}>
                                        <span style={{ flexShrink: 0 }}>✓</span>
                                        <span>{c}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "ai" && (
              <div>
                {!isPro ? (
                  <div style={{ textAlign: "center", padding: "24px 16px", borderRadius: 12, border: "1.5px dashed #ffc107", background: "#fffdf0" }}>
                    <div style={{ fontSize: 32, marginBottom: 10 }}>✨</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 6 }}>Génération IA — Pro uniquement</div>
                    <div style={{ fontSize: 13, color: "#666", marginBottom: 16, lineHeight: 1.6 }}>Décris ton profil en quelques phrases et l'IA remplit tout ton CV automatiquement.</div>
                    <div style={{ fontSize: 12, color: "#856404", background: "#fff3cd", border: "0.5px solid #ffc107", borderRadius: 8, padding: "8px 14px", marginBottom: 16, lineHeight: 1.6 }}>
                      💡 <strong>Exemple :</strong> "Je m'appelle Yassine, 20 ans, étudiant réseaux à Tanger. Compétences : Linux, Cisco, Python."
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <button onClick={() => window.open(PAYPAL_LINK, "_blank")} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: "#003087", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>🅿️ Payer 5$/mois via PayPal</button>
                      <button onClick={() => setShowCodeInput(true)} style={{ padding: "7px", borderRadius: 8, border: "0.5px solid #ddd", background: "#f9f9f9", color: "#666", fontSize: 11, cursor: "pointer" }}>✓ J'ai déjà payé — Entrer mon code</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, padding: "6px 10px", borderRadius: 8, background: "#E1F5EE", border: "0.5px solid #1D9E75" }}>
                      <span style={{ fontSize: 14 }}>✨</span>
                      <span style={{ fontSize: 12, color: "#0F6E56", fontWeight: 600 }}>Mode IA Pro activé</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#444", marginBottom: 8, lineHeight: 1.6 }}>Décris ton profil librement — l'IA remplit tout ton CV en quelques secondes.</div>
                    <div style={{ fontSize: 12, color: "#856404", background: "#fff3cd", border: "0.5px solid #ffc107", borderRadius: 8, padding: "8px 12px", marginBottom: 12, lineHeight: 1.6 }}>
                      💡 <em>"Je m'appelle Yassine, 20 ans, étudiant en réseaux à Tanger. Je maîtrise Linux, Cisco et Python. Je cherche un stage en cybersécurité."</em>
                    </div>
                    <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} placeholder="Décris ton profil, tes études, tes compétences..." style={{ width: "100%", minHeight: 120, padding: "10px 12px", borderRadius: 10, border: "0.5px solid #ddd", fontSize: 13, fontFamily: "inherit", lineHeight: 1.6, background: "#fafafa", color: "#1a1a1a", WebkitTextFillColor: "#1a1a1a", caretColor: "#1a1a1a", resize: "vertical", outline: "none", boxSizing: "border-box" }} />
                    {aiError && <div style={{ fontSize: 12, color: "#c0392b", marginTop: 6 }}>{aiError}</div>}
                    <button onClick={generateFromAI} disabled={aiLoading || !aiPrompt.trim()} style={{ width: "100%", marginTop: 12, padding: "11px", borderRadius: 10, border: "none", background: aiLoading || !aiPrompt.trim() ? "#ccc" : "#0F6E56", color: "#fff", fontSize: 14, fontWeight: 700, cursor: aiLoading || !aiPrompt.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      {aiLoading ? <>⟳ Génération en cours...</> : <>✨ Générer mon CV avec l'IA</>}
                    </button>
                    <div style={{ fontSize: 11, color: "#aaa", textAlign: "center", marginTop: 8 }}>Les données existantes seront remplacées</div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Right: Preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 14, border: "0.5px solid #e8e8e8", padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>{t.preview}</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CVPreview data={data} lang={lang} templateIdx={templateIdx} isPro={isPro} />
            </div>
          </div>

          {/* Actions */}
          <div style={{ background: "#fff", borderRadius: 14, border: "0.5px solid #e8e8e8", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <span style={{ fontSize: 12, padding: "5px 12px", borderRadius: 20, background: isPro ? "#fff3cd" : colors.light, color: isPro ? "#856404" : colors.primary, fontWeight: 600, border: `0.5px solid ${isPro ? "#ffc107" : colors.accent}` }}>
              {isPro ? "⚡ Plan Pro actif" : t.plan}
            </span>
            <button onClick={generatePDF} disabled={pdfLoading} style={{ padding: "10px 20px", borderRadius: 10, border: "none", background: colors.primary, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: `0 4px 14px ${colors.primary}40` }}>
              {pdfLoading ? "⏳ Génération..." : `↓ ${t.download}`}
            </button>
          </div>

          {/* Upgrade card */}
          <div style={{ borderRadius: 14, padding: "16px 18px", background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, color: "#fff" }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>✦ Plan Pro</div>
            <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 12 }}>CV illimités · 3 templates Premium · Export PDF · IA intégrée</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 12 }}>
              <span style={{ fontSize: 26, fontWeight: 800 }}>5$</span>
              <span style={{ fontSize: 12, opacity: 0.75 }}>/mois</span>
            </div>
            {!isPro ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button onClick={() => window.open(PAYPAL_LINK, "_blank")} style={{ padding: "10px 18px", borderRadius: 8, border: "none", background: "#fff", color: "#003087", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  🅿️ Payer 5$/mois via PayPal
                </button>
                {!showCodeInput ? (
                  <button onClick={() => setShowCodeInput(true)} style={{ padding: "6px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.3)", background: "transparent", color: "rgba(255,255,255,0.7)", fontSize: 11, cursor: "pointer" }}>
                    ✓ J'ai déjà payé — Entrer mon code
                  </button>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <input value={activationCode} onChange={e => { setActivationCode(e.target.value); setCodeError(""); }} placeholder="Ex: CVPRO2026" style={{ padding: "8px 12px", borderRadius: 8, border: "none", fontSize: 13, fontFamily: "inherit", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.1em" }} onKeyDown={e => e.key === "Enter" && checkActivationCode()} />
                    {codeError && <div style={{ fontSize: 11, color: "#ffcccc", textAlign: "center" }}>{codeError}</div>}
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={checkActivationCode} style={{ flex: 1, padding: "7px", borderRadius: 8, border: "none", background: "#fff", color: colors.primary, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Activer ✓</button>
                      <button onClick={() => { setShowCodeInput(false); setCodeError(""); }} style={{ padding: "7px 10px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.3)", background: "transparent", color: "rgba(255,255,255,0.7)", fontSize: 11, cursor: "pointer" }}>✕</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setIsPro(false)} style={{ padding: "9px 18px", borderRadius: 8, border: "none", background: "#fff", color: colors.primary, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>✓ Pro actif — Désactiver</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}