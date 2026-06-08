export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { userPrompt, systemPrompt } = req.body;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "web-search-2025-03-05",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        system: systemPrompt,
        tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 6 }],
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    // Extract text blocks
    const allText = (data.content || [])
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("\n");

    // Extract JSON array from text
    const jsonMatch = allText.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (!jsonMatch) {
      return res.status(422).json({ error: "Kein JSON in Antwort", raw: allText.slice(0, 500) });
    }

    const results = JSON.parse(jsonMatch[0]);
    res.status(200).json({ results });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
