// /api/generate.js — Vercel Serverless Function
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt manquant' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        max_tokens: 1000,
        temperature: 0.7,
        messages: [{
          role: 'user',
          content: `Tu es un expert en rédaction de CV. Génère un CV basé sur la description suivante.
Réponds UNIQUEMENT avec un JSON valide, sans texte avant ou après, sans backticks.
Format exact :
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

Description : ${prompt}

Si une info manque, invente quelque chose de réaliste et cohérent.`
        }]
      })
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '{}';
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json({ cv: parsed });
  } catch (error) {
    console.error('Groq error:', error);
    return res.status(500).json({ error: 'Erreur lors de la génération' });
  }
}