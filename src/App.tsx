import { useState, useRef } from 'react';

// 💳 Paiement via PayPal uniquement (Stripe sera ajouté plus tard)
const PAYPAL_LINK = 'https://www.paypal.com/paypalme/NasradineDaoud/5USD';

const translations = {
  fr: {
    appName: 'CVcraft',
    tagline: 'Crée ton CV en minutes',
    template: 'Choisis un modèle',
    info: 'Informations personnelles',
    fname: 'Prénom',
    lname: 'Nom',
    jobTitle: 'Titre professionnel',
    email: 'Email',
    phone: 'Téléphone',
    city: 'Ville',
    website: 'Site / Portfolio',
    about: 'À propos',
    aboutPlaceholder: 'Décris-toi en 2-3 phrases...',
    education: 'Formation',
    eduSchool: 'École / Institut',
    eduDegree: 'Diplôme',
    eduDate: 'Période',
    eduDesc: 'Description',
    experience: 'Expérience',
    expCompany: 'Entreprise / Projet',
    expRole: 'Rôle',
    expDate: 'Période',
    expDesc: 'Description',
    skills: 'Compétences',
    languages: 'Langues',
    addItem: '+ Ajouter',
    removeItem: 'Supprimer',
    preview: 'Aperçu du CV',
    download: 'Télécharger PDF',
    plan: '✦ Gratuit — 2 CV/mois',
    planPro: '✦ Pro — Illimité',
    generate: 'Générer mon CV',
    templates: [
      'Moderne',
      'Classique',
      'Créatif',
      'Minimaliste',
      'Élégant',
      'Tech',
    ],
    langLevels: ['Natif', 'Courant', 'Intermédiaire', 'Débutant'],
    skillSuggestions: [
      'Réseaux',
      'Sécurité',
      'Python',
      'Linux',
      'SQL',
      'Cloud',
      'HTML/CSS',
      'JavaScript',
      'Git',
      'Cisco',
      'Wireshark',
      'TCP/IP',
    ],
  },
  en: {
    appName: 'CVcraft',
    tagline: 'Build your CV in minutes',
    template: 'Choose a template',
    info: 'Personal information',
    fname: 'First name',
    lname: 'Last name',
    jobTitle: 'Job title',
    email: 'Email',
    phone: 'Phone',
    city: 'City',
    website: 'Website / Portfolio',
    about: 'About',
    aboutPlaceholder: 'Describe yourself in 2-3 sentences...',
    education: 'Education',
    eduSchool: 'School / Institute',
    eduDegree: 'Degree',
    eduDate: 'Period',
    eduDesc: 'Description',
    experience: 'Experience',
    expCompany: 'Company / Project',
    expRole: 'Role',
    expDate: 'Period',
    expDesc: 'Description',
    skills: 'Skills',
    languages: 'Languages',
    addItem: '+ Add',
    removeItem: 'Remove',
    preview: 'CV Preview',
    download: 'Download PDF',
    plan: '✦ Free — 2 CVs/month',
    planPro: '✦ Pro — Unlimited',
    generate: 'Generate my CV',
    templates: [
      'Modern',
      'Classic',
      'Creative',
      'Minimalist',
      'Elegant',
      'Tech',
    ],
    langLevels: ['Native', 'Fluent', 'Intermediate', 'Beginner'],
    skillSuggestions: [
      'Networks',
      'Security',
      'Python',
      'Linux',
      'SQL',
      'Cloud',
      'HTML/CSS',
      'JavaScript',
      'Git',
      'Cisco',
      'Wireshark',
      'TCP/IP',
    ],
  },
  ar: {
    appName: 'CVcraft',
    tagline: 'أنشئ سيرتك الذاتية في دقائق',
    template: 'اختر قالباً',
    info: 'المعلومات الشخصية',
    fname: 'الاسم الأول',
    lname: 'اللقب',
    jobTitle: 'المسمى الوظيفي',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    city: 'المدينة',
    website: 'الموقع / المحفظة',
    about: 'نبذة عني',
    aboutPlaceholder: 'صف نفسك في 2-3 جمل...',
    education: 'التعليم',
    eduSchool: 'المدرسة / المعهد',
    eduDegree: 'الشهادة',
    eduDate: 'الفترة',
    eduDesc: 'الوصف',
    experience: 'الخبرة',
    expCompany: 'الشركة / المشروع',
    expRole: 'الدور',
    expDate: 'الفترة',
    expDesc: 'الوصف',
    skills: 'المهارات',
    languages: 'اللغات',
    addItem: '+ إضافة',
    removeItem: 'حذف',
    preview: 'معاينة السيرة الذاتية',
    download: 'تحميل PDF',
    plan: '✦ مجاني — 2 سير شهرياً',
    planPro: '✦ برو — غير محدود',
    generate: 'إنشاء سيرتي الذاتية',
    templates: ['عصري', 'كلاسيكي', 'إبداعي', 'بسيط', 'أنيق', 'تقني'],
    langLevels: ['اللغة الأم', 'طليق', 'متوسط', 'مبتدئ'],
    skillSuggestions: [
      'الشبكات',
      'الأمن',
      'بايثون',
      'لينكس',
      'SQL',
      'سحابي',
      'HTML/CSS',
      'جافاسكريبت',
      'Git',
      'Cisco',
      'Wireshark',
      'TCP/IP',
    ],
  },
};

const TEMPLATE_COLORS = {
  0: {
    primary: '#0F6E56',
    light: '#E1F5EE',
    accent: '#1D9E75',
    header: '#0F6E56',
  },
  1: {
    primary: '#1a1a2e',
    light: '#f0f0f5',
    accent: '#4a4a8a',
    header: '#1a1a2e',
  },
  2: {
    primary: '#c0392b',
    light: '#fdecea',
    accent: '#e74c3c',
    header: '#c0392b',
  },
  3: { primary: '#555', light: '#f5f5f5', accent: '#888', header: '#fff' },
  4: {
    primary: '#7c3aed',
    light: '#f3eeff',
    accent: '#a78bfa',
    header: '#7c3aed',
  },
  5: {
    primary: '#0ea5e9',
    light: '#e0f5ff',
    accent: '#38bdf8',
    header: '#0c1222',
  },
};

// Styles spéciaux par template
const TEMPLATE_STYLES = {
  0: { headerText: '#fff' },
  1: { headerText: '#fff' },
  2: { headerText: '#fff' },
  3: { headerText: '#1a1a1a', headerBorder: '0 0 2px 0px solid #555' },
  4: { headerText: '#fff' },
  5: { headerText: '#fff' },
};

function Input({ label, value, onChange, placeholder, multiline }) {
  const base = {
    width: '100%',
    padding: '8px 11px',
    borderRadius: 8,
    border: '0.5px solid #d0d0d0',
    fontSize: 13,
    fontFamily: 'inherit',
    background: '#fafafa',
    color: '#1a1a1a',
    outline: 'none',
    transition: 'border-color 0.15s',
    resize: multiline ? 'vertical' : 'none',
    minHeight: multiline ? 68 : undefined,
  };
  return (
    <div style={{ marginBottom: 10 }}>
      {label && (
        <div
          style={{
            fontSize: 12,
            color: '#666',
            marginBottom: 4,
            fontWeight: 500,
          }}
        >
          {label}
        </div>
      )}
      {multiline ? (
        <textarea
          style={base}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <input
          style={base}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginTop: 20,
        marginBottom: 10,
        borderBottom: '0.5px solid #eee',
        paddingBottom: 6,
      }}
    >
      {children}
    </div>
  );
}

function CVPreview({ data, lang, templateIdx, isPro }) {
  const t = translations[lang];
  const colors = TEMPLATE_COLORS[templateIdx];
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const sectionTitle = (txt) => (
    <div
      style={{
        fontSize: 10,
        fontWeight: 700,
        color: colors.primary,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        borderBottom: `1.5px solid ${colors.light}`,
        paddingBottom: 3,
        marginBottom: 7,
        marginTop: 12,
      }}
    >
      {txt}
    </div>
  );

  return (
    <div
      dir={dir}
      style={{
        width: '100%',
        maxWidth: 320,
        background: '#fff',
        border: '0.5px solid #e0e0e0',
        borderRadius: 10,
        overflow: 'hidden',
        fontFamily: "'Georgia', serif",
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: colors.header,
          padding: '18px 18px 14px',
          color: TEMPLATE_STYLES[templateIdx]?.headerText || '#fff',
          borderBottom: templateIdx === 3 ? '2px solid #333' : 'none',
        }}
      >
        <div
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 2,
            letterSpacing: '-0.01em',
          }}
        >
          {data.fname} {data.lname}
        </div>
        {data.jobTitle && (
          <div style={{ fontSize: 11, opacity: 0.85, marginBottom: 8 }}>
            {data.jobTitle}
          </div>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
          {data.email && (
            <span style={{ fontSize: 10, opacity: 0.9 }}>✉ {data.email}</span>
          )}
          {data.phone && (
            <span style={{ fontSize: 10, opacity: 0.9 }}>☎ {data.phone}</span>
          )}
          {data.city && (
            <span style={{ fontSize: 10, opacity: 0.9 }}>⌖ {data.city}</span>
          )}
          {data.website && (
            <span style={{ fontSize: 10, opacity: 0.9 }}>⌘ {data.website}</span>
          )}
        </div>
      </div>

      <div style={{ padding: '10px 16px 16px' }}>
        {/* About */}
        {data.about && (
          <>
            {sectionTitle(t.about)}
            <div style={{ fontSize: 10, color: '#444', lineHeight: 1.6 }}>
              {data.about}
            </div>
          </>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <>
            {sectionTitle(t.education)}
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{ fontSize: 11, fontWeight: 700, color: '#1a1a1a' }}
                  >
                    {edu.degree}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: '#999',
                      whiteSpace: 'nowrap',
                      marginLeft: 8,
                    }}
                  >
                    {edu.date}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: colors.primary,
                    marginBottom: 2,
                  }}
                >
                  {edu.school}
                </div>
                {edu.desc && (
                  <div
                    style={{ fontSize: 9.5, color: '#666', lineHeight: 1.5 }}
                  >
                    {edu.desc}
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <>
            {sectionTitle(t.experience)}
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{ fontSize: 11, fontWeight: 700, color: '#1a1a1a' }}
                  >
                    {exp.role}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: '#999',
                      whiteSpace: 'nowrap',
                      marginLeft: 8,
                    }}
                  >
                    {exp.date}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: colors.primary,
                    marginBottom: 2,
                  }}
                >
                  {exp.company}
                </div>
                {exp.desc && (
                  <div
                    style={{ fontSize: 9.5, color: '#666', lineHeight: 1.5 }}
                  >
                    {exp.desc}
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <>
            {sectionTitle(t.skills)}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {data.skills.map((s, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 9,
                    padding: '2px 8px',
                    borderRadius: 20,
                    background: colors.light,
                    color: colors.primary,
                    border: `0.5px solid ${colors.accent}`,
                    fontWeight: 500,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <>
            {sectionTitle(t.languages)}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
              {data.languages.map((l, i) => (
                <div key={i} style={{ fontSize: 10, color: '#444' }}>
                  <span style={{ fontWeight: 600, color: '#1a1a1a' }}>
                    {l.name}
                  </span>
                  {l.level && (
                    <span style={{ color: '#999' }}> · {l.level}</span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Watermark free plan */}
      {!isPro && (
        <div
          style={{
            background: '#f9f9f9',
            borderTop: '0.5px solid #eee',
            padding: '7px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                background: colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 9,
                fontWeight: 700,
              }}
            >
              C
            </div>
            <span style={{ fontSize: 10, color: '#aaa', fontWeight: 500 }}>
              Créé avec CVcraft.app
            </span>
          </div>
          <span
            style={{
              fontSize: 9,
              padding: '2px 7px',
              borderRadius: 20,
              background: '#fff3cd',
              color: '#856404',
              border: '0.5px solid #ffc107',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ⚡ Supprimer avec Pro
          </span>
        </div>
      )}
    </div>
  );
}

export default function CVCraft() {
  const [lang, setLang] = useState('fr');
  const [templateIdx, setTemplateIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('info');
  const [isPro, setIsPro] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [scoreData, setScoreData] = useState(null);
  const [scoreLoading, setScoreLoading] = useState(false);
  const t = translations[lang];

  const [data, setData] = useState({
    fname: 'Yassine',
    lname: 'Benali',
    jobTitle: 'Étudiant en Réseaux & Sécurité',
    email: 'yassine@email.com',
    phone: '+212 6 00 00 00 00',
    city: 'Tanger',
    website: '',
    about:
      "Étudiant passionné par les réseaux et la cybersécurité, à la recherche d'un stage ou projet freelance pour mettre en pratique mes compétences.",
    education: [
      {
        school: 'Institut Supérieur',
        degree: 'BTS Gestion des Réseaux & Sécurité',
        date: '2024 – 2026',
        desc: 'Administration réseaux, TCP/IP, cybersécurité, Linux.',
      },
    ],
    experience: [],
    skills: ['Réseaux', 'Sécurité', 'Linux'],
    languages: [
      { name: 'Arabe', level: 'Natif' },
      { name: 'Français', level: 'Courant' },
    ],
  });

  const set = (field, val) => setData((d) => ({ ...d, [field]: val }));
  const setNested = (field, idx, key, val) =>
    setData((d) => ({
      ...d,
      [field]: d[field].map((item, i) =>
        i === idx ? { ...item, [key]: val } : item
      ),
    }));
  const addItem = (field, template) =>
    setData((d) => ({ ...d, [field]: [...d[field], { ...template }] }));
  const removeItem = (field, idx) =>
    setData((d) => ({ ...d, [field]: d[field].filter((_, i) => i !== idx) }));
  const toggleSkill = (skill) =>
    setData((d) => ({
      ...d,
      skills: d.skills.includes(skill)
        ? d.skills.filter((s) => s !== skill)
        : [...d.skills, skill],
    }));

  const colors = TEMPLATE_COLORS[templateIdx];

  const generateFromAI = async () => {
    if (!aiPrompt.trim() || !isPro) return;
    setAiLoading(true);
    setAiError('');
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `Tu es un expert en rédaction de CV. L'utilisateur décrit ce qu'il veut pour son CV. Génère les données JSON correspondantes en respectant EXACTEMENT ce format (réponds UNIQUEMENT avec le JSON, aucun texte avant ou après) :
{
  "fname": "...",
  "lname": "...",
  "jobTitle": "...",
  "email": "...",
  "phone": "...",
  "city": "...",
  "website": "",
  "about": "...",
  "education": [{ "school": "...", "degree": "...", "date": "...", "desc": "..." }],
  "experience": [{ "company": "...", "role": "...", "date": "...", "desc": "..." }],
  "skills": ["...", "..."],
  "languages": [{ "name": "...", "level": "..." }]
}

Description de l'utilisateur : ${aiPrompt}

Génère un CV professionnel et réaliste basé sur cette description. Si une info manque, invente quelque chose de plausible.`,
            },
          ],
        }),
      });
      const result = await response.json();
      const text = result.content?.[0]?.text || '';
      const clean = text.replace(/\`\`\`json|\`\`\`/g, '').trim();
      const parsed = JSON.parse(clean);
      setData((d) => ({ ...d, ...parsed }));
      setAiPrompt('');
    } catch (e) {
      setAiError('Erreur lors de la génération. Réessaie.');
    }
    setAiLoading(false);
  };

  const analyzeCV = async () => {
    if (!isPro) return;
    setScoreLoading(true);
    setScoreData(null);
    try {
      const cvSummary = `
        Nom: ${data.fname} ${data.lname}
        Titre: ${data.jobTitle}
        À propos: ${data.about}
        Formation: ${data.education
          .map((e) => e.degree + ' à ' + e.school)
          .join(', ')}
        Expérience: ${
          data.experience
            .map((e) => e.role + ' chez ' + e.company)
            .join(', ') || 'Aucune'
        }
        Compétences: ${data.skills.join(', ')}
        Langues: ${data.languages.map((l) => l.name).join(', ')}
      `;
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `Analyse ce CV et retourne UNIQUEMENT un JSON (sans backticks, sans texte avant ou après) :
{
  "score": <nombre entre 0 et 100>,
  "mention": "<Excellent|Très bien|Bien|À améliorer>",
  "points": ["<point fort 1>", "<point fort 2>", "<point fort 3>"],
  "conseils": ["<conseil 1>", "<conseil 2>", "<conseil 3>"]
}

CV à analyser:
${cvSummary}

Sois précis, bienveillant et constructif. Les conseils doivent être actionnables.`,
            },
          ],
        }),
      });
      const result = await response.json();
      const text = result.content?.[0]?.text || '{}';
      const clean = text.replace(/\`\`\`json|\`\`\`/g, '').trim();
      setScoreData(JSON.parse(clean));
    } catch (e) {
      setScoreData({
        score: 0,
        mention: 'Erreur',
        points: [],
        conseils: ["Impossible d'analyser le CV. Réessaie."],
      });
    }
    setScoreLoading(false);
  };

  const tabs = [
    { id: 'info', icon: '👤', label: t.info.split(' ')[0] },
    { id: 'edu', icon: '🎓', label: t.education },
    { id: 'exp', icon: '💼', label: t.experience },
    { id: 'skills', icon: '⚡', label: t.skills },
    { id: 'langs', icon: '🌍', label: t.languages },
    { id: 'ai', icon: '✨', label: 'IA' },
    { id: 'score', icon: '📊', label: 'Score' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #eef2f7 100%)',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        padding: '0',
      }}
    >
      {/* Top nav */}
      <div
        style={{
          background: '#fff',
          borderBottom: '0.5px solid #e8e8e8',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 56,
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            C
          </div>
          <span
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: '#1a1a1a',
              letterSpacing: '-0.02em',
            }}
          >
            CVcraft
          </span>
          <span
            style={{
              fontSize: 11,
              padding: '2px 8px',
              borderRadius: 20,
              background: colors.light,
              color: colors.primary,
              fontWeight: 600,
              marginLeft: 4,
            }}
          >
            Beta
          </span>
        </div>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {['fr', 'en', 'ar'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                padding: '4px 11px',
                borderRadius: 20,
                border: `0.5px solid ${
                  lang === l ? colors.primary : '#e0e0e0'
                }`,
                background: lang === l ? colors.primary : 'transparent',
                color: lang === l ? '#fff' : '#666',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Tagline */}
      <div style={{ textAlign: 'center', padding: '24px 24px 0' }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: '#1a1a1a',
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          {t.tagline} <span style={{ color: colors.primary }}>✦</span>
        </h1>
      </div>

      {/* Template picker */}
      <div style={{ padding: '16px 24px 0' }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 10,
          }}
        >
          {t.template}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
          }}
        >
          {t.templates.map((name, i) => {
            const isPremiumTemplate = i >= 3;
            const locked = isPremiumTemplate && !isPro;
            return (
              <button
                key={i}
                onClick={() => !locked && setTemplateIdx(i)}
                style={{
                  padding: '10px 8px',
                  borderRadius: 10,
                  position: 'relative',
                  border: `${templateIdx === i ? '2px' : '0.5px'} solid ${
                    templateIdx === i ? TEMPLATE_COLORS[i].primary : '#e0e0e0'
                  }`,
                  background:
                    templateIdx === i ? TEMPLATE_COLORS[i].light : '#fff',
                  cursor: locked ? 'not-allowed' : 'pointer',
                  transition: 'all 0.15s',
                  opacity: locked ? 0.6 : 1,
                }}
              >
                {locked && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      background: '#ffc107',
                      borderRadius: 4,
                      fontSize: 9,
                      fontWeight: 700,
                      color: '#856404',
                      padding: '1px 5px',
                    }}
                  >
                    PRO
                  </div>
                )}
                <div
                  style={{
                    height: 36,
                    marginBottom: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    padding: '4px 6px',
                    background:
                      i === 3 ? '#f5f5f5' : i === 5 ? '#0c1222' : 'transparent',
                    borderRadius: 4,
                  }}
                >
                  <div
                    style={{
                      height: 4,
                      borderRadius: 2,
                      background: TEMPLATE_COLORS[i].primary,
                      width: '60%',
                    }}
                  ></div>
                  <div
                    style={{
                      height: 3,
                      borderRadius: 2,
                      background: i === 5 ? '#334' : '#ddd',
                      width: '90%',
                    }}
                  ></div>
                  <div
                    style={{
                      height: 3,
                      borderRadius: 2,
                      background: i === 5 ? '#334' : '#ddd',
                      width: '70%',
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color:
                      templateIdx === i ? TEMPLATE_COLORS[i].primary : '#666',
                  }}
                >
                  {name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          padding: '20px 24px 40px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        {/* Left: Form */}
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            border: '0.5px solid #e8e8e8',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: 'flex',
              borderBottom: '0.5px solid #eee',
              overflowX: 'auto',
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '11px 6px',
                  border: 'none',
                  borderBottom:
                    activeTab === tab.id
                      ? `2px solid ${colors.primary}`
                      : '2px solid transparent',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: 11,
                  fontWeight: 600,
                  color: activeTab === tab.id ? colors.primary : '#999',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                <div>{tab.icon}</div>
                <div>{tab.label}</div>
              </button>
            ))}
          </div>

          <div style={{ padding: '16px 18px 20px' }}>
            {/* Info tab */}
            {activeTab === 'info' && (
              <div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 8,
                  }}
                >
                  <Input
                    label={t.fname}
                    value={data.fname}
                    onChange={(v) => set('fname', v)}
                  />
                  <Input
                    label={t.lname}
                    value={data.lname}
                    onChange={(v) => set('lname', v)}
                  />
                </div>
                <Input
                  label={t.jobTitle}
                  value={data.jobTitle}
                  onChange={(v) => set('jobTitle', v)}
                />
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 8,
                  }}
                >
                  <Input
                    label={t.email}
                    value={data.email}
                    onChange={(v) => set('email', v)}
                  />
                  <Input
                    label={t.phone}
                    value={data.phone}
                    onChange={(v) => set('phone', v)}
                  />
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 8,
                  }}
                >
                  <Input
                    label={t.city}
                    value={data.city}
                    onChange={(v) => set('city', v)}
                  />
                  <Input
                    label={t.website}
                    value={data.website}
                    onChange={(v) => set('website', v)}
                  />
                </div>
                <Input
                  label={t.about}
                  value={data.about}
                  onChange={(v) => set('about', v)}
                  multiline
                  placeholder={t.aboutPlaceholder}
                />
              </div>
            )}

            {/* Education tab */}
            {activeTab === 'edu' && (
              <div>
                {data.education.map((edu, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: 16,
                      padding: 14,
                      borderRadius: 10,
                      border: '0.5px solid #eee',
                      background: '#fafafa',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: colors.primary,
                        }}
                      >
                        #{i + 1}
                      </span>
                      <button
                        onClick={() => removeItem('education', i)}
                        style={{
                          fontSize: 11,
                          color: '#c0392b',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {t.removeItem}
                      </button>
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 8,
                      }}
                    >
                      <Input
                        label={t.eduSchool}
                        value={edu.school}
                        onChange={(v) => setNested('education', i, 'school', v)}
                      />
                      <Input
                        label={t.eduDate}
                        value={edu.date}
                        onChange={(v) => setNested('education', i, 'date', v)}
                      />
                    </div>
                    <Input
                      label={t.eduDegree}
                      value={edu.degree}
                      onChange={(v) => setNested('education', i, 'degree', v)}
                    />
                    <Input
                      label={t.eduDesc}
                      value={edu.desc}
                      onChange={(v) => setNested('education', i, 'desc', v)}
                      multiline
                    />
                  </div>
                ))}
                <button
                  onClick={() =>
                    addItem('education', {
                      school: '',
                      degree: '',
                      date: '',
                      desc: '',
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 8,
                    border: `0.5px dashed ${colors.primary}`,
                    background: colors.light,
                    color: colors.primary,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {t.addItem}
                </button>
              </div>
            )}

            {/* Experience tab */}
            {activeTab === 'exp' && (
              <div>
                {data.experience.map((exp, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: 16,
                      padding: 14,
                      borderRadius: 10,
                      border: '0.5px solid #eee',
                      background: '#fafafa',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: colors.primary,
                        }}
                      >
                        #{i + 1}
                      </span>
                      <button
                        onClick={() => removeItem('experience', i)}
                        style={{
                          fontSize: 11,
                          color: '#c0392b',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {t.removeItem}
                      </button>
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 8,
                      }}
                    >
                      <Input
                        label={t.expCompany}
                        value={exp.company}
                        onChange={(v) =>
                          setNested('experience', i, 'company', v)
                        }
                      />
                      <Input
                        label={t.expDate}
                        value={exp.date}
                        onChange={(v) => setNested('experience', i, 'date', v)}
                      />
                    </div>
                    <Input
                      label={t.expRole}
                      value={exp.role}
                      onChange={(v) => setNested('experience', i, 'role', v)}
                    />
                    <Input
                      label={t.expDesc}
                      value={exp.desc}
                      onChange={(v) => setNested('experience', i, 'desc', v)}
                      multiline
                    />
                  </div>
                ))}
                <button
                  onClick={() =>
                    addItem('experience', {
                      company: '',
                      role: '',
                      date: '',
                      desc: '',
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 8,
                    border: `0.5px dashed ${colors.primary}`,
                    background: colors.light,
                    color: colors.primary,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {t.addItem}
                </button>
              </div>
            )}

            {/* Skills tab */}
            {activeTab === 'skills' && (
              <div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 10 }}>
                  Clique pour ajouter / retirer
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginBottom: 16,
                  }}
                >
                  {t.skillSuggestions.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: 20,
                        cursor: 'pointer',
                        border: `0.5px solid ${
                          data.skills.includes(skill) ? colors.primary : '#ddd'
                        }`,
                        background: data.skills.includes(skill)
                          ? colors.light
                          : '#fff',
                        color: data.skills.includes(skill)
                          ? colors.primary
                          : '#666',
                        fontSize: 12,
                        fontWeight: 500,
                        transition: 'all 0.15s',
                      }}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>
                  Compétence personnalisée
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    id="custom-skill"
                    placeholder="Ex: Cisco, Wireshark..."
                    style={{
                      flex: 1,
                      padding: '8px 11px',
                      borderRadius: 8,
                      border: '0.5px solid #ddd',
                      fontSize: 13,
                      fontFamily: 'inherit',
                      background: '#fafafa',
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        toggleSkill(e.target.value.trim());
                        e.target.value = '';
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const el = document.getElementById('custom-skill');
                      if (el && el.value.trim()) {
                        toggleSkill(el.value.trim());
                        el.value = '';
                      }
                    }}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 8,
                      border: 'none',
                      background: colors.primary,
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    +
                  </button>
                </div>
                {data.skills.length > 0 && (
                  <div style={{ marginTop: 14 }}>
                    <div
                      style={{ fontSize: 12, color: '#888', marginBottom: 6 }}
                    >
                      Sélectionnées ({data.skills.length})
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {data.skills.map((s) => (
                        <span
                          key={s}
                          style={{
                            fontSize: 12,
                            padding: '3px 10px',
                            borderRadius: 20,
                            background: colors.light,
                            color: colors.primary,
                            border: `0.5px solid ${colors.accent}`,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Languages tab */}
            {activeTab === 'langs' && (
              <div>
                {data.languages.map((l, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 8,
                      marginBottom: 10,
                      alignItems: 'flex-end',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <Input
                        label={i === 0 ? t.languages : ''}
                        value={l.name}
                        onChange={(v) => setNested('languages', i, 'name', v)}
                        placeholder="Ex: Arabe"
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <select
                        value={l.level}
                        onChange={(e) =>
                          setNested('languages', i, 'level', e.target.value)
                        }
                        style={{
                          width: '100%',
                          padding: '8px 11px',
                          borderRadius: 8,
                          border: '0.5px solid #ddd',
                          fontSize: 13,
                          fontFamily: 'inherit',
                          background: '#fafafa',
                          marginBottom: 10,
                        }}
                      >
                        {t.langLevels.map((lv) => (
                          <option key={lv} value={lv}>
                            {lv}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => removeItem('languages', i)}
                      style={{
                        padding: '8px 10px',
                        marginBottom: 10,
                        borderRadius: 8,
                        border: '0.5px solid #fdd',
                        background: '#fff5f5',
                        color: '#c0392b',
                        cursor: 'pointer',
                        fontSize: 13,
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    addItem('languages', { name: '', level: t.langLevels[0] })
                  }
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 8,
                    border: `0.5px dashed ${colors.primary}`,
                    background: colors.light,
                    color: colors.primary,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {t.addItem}
                </button>
              </div>
            )}
            {/* Score tab */}
            {activeTab === 'score' && (
              <div>
                {!isPro ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '24px 16px',
                      borderRadius: 12,
                      border: '1.5px dashed #ffc107',
                      background: '#fffdf0',
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 10 }}>📊</div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: '#1a1a1a',
                        marginBottom: 6,
                      }}
                    >
                      Score IA — Pro uniquement
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: '#666',
                        marginBottom: 16,
                        lineHeight: 1.6,
                      }}
                    >
                      Obtiens un score sur 100, tes points forts et des conseils
                      personnalisés pour améliorer ton CV.
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                      }}
                    >
                      <button
                        onClick={() => window.open(PAYPAL_LINK, '_blank')}
                        style={{
                          padding: '10px 24px',
                          borderRadius: 10,
                          border: 'none',
                          background: '#003087',
                          color: '#fff',
                          fontSize: 13,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        🅿️ Payer 5$/mois via PayPal
                      </button>
                      <button
                        onClick={() => setIsPro(true)}
                        style={{
                          padding: '7px',
                          borderRadius: 8,
                          border: '0.5px solid #ddd',
                          background: '#f9f9f9',
                          color: '#666',
                          fontSize: 11,
                          cursor: 'pointer',
                        }}
                      >
                        ✓ J'ai déjà payé — Activer Pro
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={analyzeCV}
                      disabled={scoreLoading}
                      style={{
                        width: '100%',
                        padding: '11px',
                        borderRadius: 10,
                        border: 'none',
                        background: scoreLoading ? '#ccc' : '#7c3aed',
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: scoreLoading ? 'not-allowed' : 'pointer',
                        marginBottom: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                      }}
                    >
                      {scoreLoading
                        ? '⟳ Analyse en cours...'
                        : '📊 Analyser mon CV'}
                    </button>

                    {scoreData && (
                      <div>
                        {/* Score cercle */}
                        <div style={{ textAlign: 'center', marginBottom: 20 }}>
                          <div
                            style={{
                              width: 90,
                              height: 90,
                              borderRadius: '50%',
                              margin: '0 auto 10px',
                              background: `conic-gradient(${
                                scoreData.score >= 75
                                  ? '#0F6E56'
                                  : scoreData.score >= 50
                                  ? '#f59e0b'
                                  : '#c0392b'
                              } ${scoreData.score * 3.6}deg, #eee 0deg)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <div
                              style={{
                                width: 70,
                                height: 70,
                                borderRadius: '50%',
                                background: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 22,
                                  fontWeight: 800,
                                  color: '#1a1a1a',
                                }}
                              >
                                {scoreData.score}
                              </span>
                              <span style={{ fontSize: 9, color: '#888' }}>
                                /100
                              </span>
                            </div>
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color:
                                scoreData.score >= 75
                                  ? '#0F6E56'
                                  : scoreData.score >= 50
                                  ? '#f59e0b'
                                  : '#c0392b',
                            }}
                          >
                            {scoreData.mention}
                          </div>
                        </div>

                        {/* Points forts */}
                        {scoreData.points?.length > 0 && (
                          <div style={{ marginBottom: 14 }}>
                            <div
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: '#0F6E56',
                                marginBottom: 8,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                              }}
                            >
                              ✅ Points forts
                            </div>
                            {scoreData.points.map((p, i) => (
                              <div
                                key={i}
                                style={{
                                  fontSize: 12,
                                  color: '#444',
                                  padding: '6px 10px',
                                  borderRadius: 8,
                                  background: '#E1F5EE',
                                  marginBottom: 6,
                                  lineHeight: 1.5,
                                }}
                              >
                                • {p}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Conseils */}
                        {scoreData.conseils?.length > 0 && (
                          <div>
                            <div
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: '#c0392b',
                                marginBottom: 8,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                              }}
                            >
                              💡 Conseils
                            </div>
                            {scoreData.conseils.map((c, i) => (
                              <div
                                key={i}
                                style={{
                                  fontSize: 12,
                                  color: '#444',
                                  padding: '6px 10px',
                                  borderRadius: 8,
                                  background: '#fdecea',
                                  marginBottom: 6,
                                  lineHeight: 1.5,
                                }}
                              >
                                • {c}
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

            {/* AI tab */}
            {activeTab === 'ai' && (
              <div>
                {!isPro ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '24px 16px',
                      borderRadius: 12,
                      border: '1.5px dashed #ffc107',
                      background: '#fffdf0',
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 10 }}>✨</div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: '#1a1a1a',
                        marginBottom: 6,
                      }}
                    >
                      Génération IA — Pro uniquement
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: '#666',
                        marginBottom: 16,
                        lineHeight: 1.6,
                      }}
                    >
                      Décris ton profil en quelques phrases et l'IA remplit tout
                      ton CV automatiquement.
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: '#856404',
                        background: '#fff3cd',
                        border: '0.5px solid #ffc107',
                        borderRadius: 8,
                        padding: '8px 14px',
                        marginBottom: 16,
                        lineHeight: 1.6,
                      }}
                    >
                      💡 <strong>Exemple :</strong> "Je m'appelle Yassine, j'ai
                      20 ans, j'étudie les réseaux à Tanger. Je parle arabe,
                      français et anglais. Mes compétences sont Linux, Cisco et
                      Python."
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                      }}
                    >
                      <button
                        onClick={() => window.open(PAYPAL_LINK, '_blank')}
                        style={{
                          padding: '10px 24px',
                          borderRadius: 10,
                          border: 'none',
                          background: '#003087',
                          color: '#fff',
                          fontSize: 13,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        🅿️ Payer 5$/mois via PayPal
                      </button>
                      <button
                        onClick={() => setIsPro(true)}
                        style={{
                          padding: '7px',
                          borderRadius: 8,
                          border: '0.5px solid #ddd',
                          background: '#f9f9f9',
                          color: '#666',
                          fontSize: 11,
                          cursor: 'pointer',
                        }}
                      >
                        ✓ J'ai déjà payé — Activer Pro
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        marginBottom: 12,
                        padding: '6px 10px',
                        borderRadius: 8,
                        background: '#E1F5EE',
                        border: '0.5px solid #1D9E75',
                      }}
                    >
                      <span style={{ fontSize: 14 }}>✨</span>
                      <span
                        style={{
                          fontSize: 12,
                          color: '#0F6E56',
                          fontWeight: 600,
                        }}
                      >
                        Mode IA Pro activé
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: '#444',
                        marginBottom: 8,
                        lineHeight: 1.6,
                      }}
                    >
                      Décris ton profil librement — l'IA remplit tout ton CV en
                      quelques secondes.
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: '#856404',
                        background: '#fff3cd',
                        border: '0.5px solid #ffc107',
                        borderRadius: 8,
                        padding: '8px 12px',
                        marginBottom: 12,
                        lineHeight: 1.6,
                      }}
                    >
                      💡{' '}
                      <em>
                        "Je m'appelle Yassine, 20 ans, étudiant en réseaux à
                        Tanger. Je maîtrise Linux, Cisco et Python. Je cherche
                        un stage en cybersécurité."
                      </em>
                    </div>
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Décris ton profil, tes études, tes compétences, ce que tu cherches..."
                      style={{
                        width: '100%',
                        minHeight: 120,
                        padding: '10px 12px',
                        borderRadius: 10,
                        border: '0.5px solid #ddd',
                        fontSize: 13,
                        fontFamily: 'inherit',
                        lineHeight: 1.6,
                        background: '#fafafa',
                        resize: 'vertical',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                    {aiError && (
                      <div
                        style={{ fontSize: 12, color: '#c0392b', marginTop: 6 }}
                      >
                        {aiError}
                      </div>
                    )}
                    <button
                      onClick={generateFromAI}
                      disabled={aiLoading || !aiPrompt.trim()}
                      style={{
                        width: '100%',
                        marginTop: 12,
                        padding: '11px',
                        borderRadius: 10,
                        border: 'none',
                        background:
                          aiLoading || !aiPrompt.trim() ? '#ccc' : '#0F6E56',
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 700,
                        cursor:
                          aiLoading || !aiPrompt.trim()
                            ? 'not-allowed'
                            : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        transition: 'background 0.15s',
                      }}
                    >
                      {aiLoading ? (
                        <>
                          <span
                            style={{
                              animation: 'spin 1s linear infinite',
                              display: 'inline-block',
                            }}
                          >
                            ⟳
                          </span>{' '}
                          Génération en cours...
                        </>
                      ) : (
                        <>✨ Générer mon CV avec l'IA</>
                      )}
                    </button>
                    <div
                      style={{
                        fontSize: 11,
                        color: '#aaa',
                        textAlign: 'center',
                        marginTop: 8,
                      }}
                    >
                      Les données existantes seront remplacées
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              background: '#fff',
              borderRadius: 14,
              border: '0.5px solid #e8e8e8',
              padding: '16px 18px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 14,
              }}
            >
              {t.preview}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CVPreview
                data={data}
                lang={lang}
                templateIdx={templateIdx}
                isPro={isPro}
              />
            </div>
          </div>

          {/* Bottom actions */}
          <div
            style={{
              background: '#fff',
              borderRadius: 14,
              border: '0.5px solid #e8e8e8',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}
          >
            <span
              style={{
                fontSize: 12,
                padding: '5px 12px',
                borderRadius: 20,
                background: isPro ? '#fff3cd' : colors.light,
                color: isPro ? '#856404' : colors.primary,
                fontWeight: 600,
                border: `0.5px solid ${isPro ? '#ffc107' : colors.accent}`,
              }}
            >
              {isPro ? '⚡ Plan Pro actif' : t.plan}
            </span>
            <button
              onClick={() => window.print()}
              style={{
                padding: '10px 20px',
                borderRadius: 10,
                border: 'none',
                background: colors.primary,
                color: '#fff',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: `0 4px 14px ${colors.primary}40`,
                transition: 'opacity 0.15s',
              }}
            >
              ↓ {t.download}
            </button>
          </div>

          {/* Upgrade card */}
          <div
            style={{
              borderRadius: 14,
              padding: '16px 18px',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              color: '#fff',
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
              ✦ Plan Pro
            </div>
            <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 12 }}>
              CV illimités · 10+ templates · Export PDF HD · Suppression du
              branding
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 4,
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 26, fontWeight: 800 }}>5$</span>
              <span style={{ fontSize: 12, opacity: 0.75 }}>/mois</span>
            </div>
            {!isPro ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  onClick={() => window.open(PAYPAL_LINK, '_blank')}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 8,
                    border: 'none',
                    background: '#fff',
                    color: '#003087',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  🅿️ Payer 5$/mois via PayPal
                </button>
                <button
                  onClick={() => setIsPro(true)}
                  style={{
                    padding: '6px',
                    borderRadius: 8,
                    border: '0.5px solid rgba(255,255,255,0.3)',
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 11,
                    cursor: 'pointer',
                  }}
                >
                  ✓ J'ai déjà payé — Activer Pro
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsPro(false)}
                style={{
                  padding: '9px 18px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#fff',
                  color: colors.primary,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                ✓ Pro actif — Désactiver
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
