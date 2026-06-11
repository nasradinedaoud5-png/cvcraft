// /api/score.js — Vercel Serverless Function
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
    const { cv, prompt } = req.body;
    if (!cv) return res.status(400).json({ error: 'CV manquant' });
  
    // Utiliser le prompt custom si fourni, sinon construire un prompt standard
    const finalPrompt = prompt || `Analyse ce CV et retourne UNIQUEMENT un JSON valide sans backticks :
  {
    "score": <nombre entre 0 et 100>,
    "mention": "<Excellent|Très bien|Bien|À améliorer>",
    "points": ["<point fort 1>", "<point fort 2>"],
    "conseils": [
      { "texte": "<conseil>", "actionable": false }
    ]
  }
  
  CV : ${JSON.stringify(cv)}
  Sois bienveillant, précis et constructif.`;
  
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          max_tokens: 1500,
          temperature: 0.4,
          messages: [{ role: 'user', content: finalPrompt }]
        })
      });
  
      const data = await response.json();
      const text = (data.choices?.[0]?.message?.content || '').trim();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Réponse invalide');
      const parsed = JSON.parse(jsonMatch[0]);
      if (typeof parsed.score !== 'number') throw new Error('JSON incomplet');
  
      return res.status(200).json({ result: parsed });
    } catch (error) {
      console.error('Groq score error:', error);
      return res.status(500).json({ error: 'Erreur lors de l\'analyse' });
    }
  }