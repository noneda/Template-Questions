import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  try {
    // =========================
    // GET
    // =========================

    if (req.method === "GET") {
      const leaderboard = (await kv.get("leaderboard")) || [];

      return res.status(200).json(leaderboard);
    }

    // =========================
    // POST
    // =========================

    if (req.method === "POST") {
      const entry =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body;

      if (!entry?.name) {
        return res.status(400).json({
          error: "Missing player name",
        });
      }

      let leaderboard = (await kv.get("leaderboard")) || [];

      leaderboard.push({
        ...entry,
        date: new Date().toISOString(),
      });

      leaderboard.sort((a, b) => b.score - a.score);

      leaderboard = leaderboard.slice(0, 100);

      await kv.set("leaderboard", leaderboard);

      return res.status(200).json({
        success: true,
        leaderboard,
      });
    }

    return res.status(405).json({
      error: "Method not allowed",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
}
