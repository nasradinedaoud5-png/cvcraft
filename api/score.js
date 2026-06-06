// /api/score.js — Vercel Serverless Function
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { cv } = req.body;
  
    if (!cv) {
      return res.status(400).json({ error: 'CV manquant' });
    }
  
    try {
      const cvSummary = `
        Nom: ${cv.fname} ${cv.lname}
        Titre: ${cv.jobTitle}
        À propos: ${cv.about}
        Formation: ${cv.education?.map(e => e.degree + ' à ' + e.school).join(', ')}
        Expérience: ${cv.experience?.map(e => e.role + ' chez ' + e.company).join(', ') || 'Aucune'}
        Compétences: ${cv.skills?.join(', ')}
        Langues: ${cv.languages?.map(l => l.name).join(', ')}
      `;
  
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          max_tokens: 800,
          temperature: 0.5,
          messages: [{
            role: 'user',
            content: `Analyse ce CV et retourne UNIQUEMENT un JSON valide sans backticks :
  {
    "score": <nombre entre 0 et 100>,
    "mention": "<Excellent|Très bien|Bien|À améliorer>",
    "points": ["<point fort 1>", "<point fort 2>", "<point fort 3>"],
    "conseils": ["<conseil actionnable 1>", "<conseil actionnable 2>", "<conseil actionnable 3>"]
  }
  
  CV : ${cvSummary}
  
  Sois bienveillant, précis et constructif.`
          }]
        })
      });
  
      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || '{}';
      const clean = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
  
      return res.status(200).json({ result: parsed });
    } catch (error) {
      console.error('Groq score error:', error);
      return res.status(500).json({ error: 'Erreur lors de l\'analyse' });
    }
  }