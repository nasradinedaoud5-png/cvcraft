// /api/adapt.js — Vercel Serverless Function
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
    const { cv, prompt } = req.body;
    if (!cv || !prompt) return res.status(400).json({ error: 'Données manquantes' });
  
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          max_tokens: 2000,
          temperature: 0.4,
          messages: [{ role: 'user', content: prompt }]
        })
      });
  
      const data = await response.json();
      const text = (data.choices?.[0]?.message?.content || '').trim();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Réponse invalide');
      const parsed = JSON.parse(jsonMatch[0]);
      if (!parsed.adaptedData) throw new Error('Structure JSON incomplète');
  
      return res.status(200).json({ result: parsed });
    } catch (error) {
      console.error('Groq adapt error:', error);
      return res.status(500).json({ error: 'Erreur lors de l\'adaptation' });
    }
  }