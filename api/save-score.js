export default async function handler(request, response) {
  // Basic CORS
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    return response.status(200).end();
  }

  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  if (!KV_URL || !KV_TOKEN) {
    return response
      .status(500)
      .json({ error: "Missing KV environment variables" });
  }

  const kvGet = async () => {
    const res = await fetch(`${KV_URL}/get/players`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });
    const data = await res.json();
    return data.result ? JSON.parse(data.result) : [];
  };

  const kvSet = async (players) => {
    await fetch(`${KV_URL}/set/players`, {
      method: "POST",
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      body: JSON.stringify(players),
    });
  };

  // GET — Fetch leaderboard
  if (request.method === "GET") {
    try {
      const players = await kvGet();
      return response.status(200).json(players);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  // POST — Save new score
  if (request.method === "POST") {
    try {
      const { name, score, percentage, correct, total, date } = req.body;
      
      if (!name) {
        return response.status(400).json({ error: "Missing player name" });
      }

      const safeName = name.trim().slice(0, 20).replace(/[<>]/g, "");

      const players = await kvGet();

      const newEntry = {
        safeName,
        score,
        date: new Date().toISOString(),
      };

      players.push(newEntry);
      players.sort((a, b) => b.score - a.score);

      const trimmed = players.slice(0, 100);
      await kvSet(trimmed);

      return response.status(200).json({ success: true, player: newEntry });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  return response.status(405).json({ error: "Method not supported" });
}
