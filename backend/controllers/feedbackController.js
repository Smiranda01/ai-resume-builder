const { OpenAI } = require('openai');
const feedbackModel = require('../models/feedbackModel');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateFeedback = async (req, res) => {
  const { user_id, resume_id, input } = req.body;

  if (!user_id || !resume_id || !input) {
    return res.status(400).json({ message: 'Missing required fields (user_id, resume_id, input)' });
  }

  const prompt = `
  You are an expert resume builder and creative writing assistant.
  
  Based on the user input below, generate a complete, expressive, first-person resume in **strict JSON format**.
  
  🔐 Rules:
  - Return ONLY valid JSON (no markdown, no code blocks)
  - Use natural, story-like language — avoid robotic tones
  - Make it feel personal, confident, and authentic
  - Elaborate on strengths, projects, and impact
  - Include more vivid, achievement-focused language
  
  🧾 JSON Output Format:
  {
    "name": "string",
    "title": "string",
    "summary": "string",
    "experience": [
      {
        "company": "string",
        "role": "string",
        "description": "first-person story of contributions, technologies, and impact"
      }
    ],
    "skills": ["..."],
    "education": [{ "institution": "...", "degree": "...", "year": "..." }],
    "certifications": ["..."],
    "languages": ["..."],
    "projects": [{ "name": "...", "description": "what it is, how it works, what you learned" }]
  }
  
  User Input:
  ${JSON.stringify(input, null, 2)}
  `;

  try {
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
    });

    const rawJson = aiResponse.choices[0].message.content;

    let parsedJson;
    try {
      parsedJson = JSON.parse(rawJson); // Parse string into object
    } catch (err) {
      return res.status(500).json({
        message: 'Failed to parse JSON from AI response.',
        raw: rawJson,
        error: err.message
      });
    }

    // Save the original string version to the database
    feedbackModel.saveFeedback(user_id, resume_id, rawJson, (err, result) => {
      if (err) return res.status(500).json({ message: 'Failed to save feedback', error: err });

      res.status(200).json({
        message: 'AI feedback generated and stored',
        feedback_id: result.insertId,
        resume_json: parsedJson,     // ✅ Usable JSON object
        raw_string: rawJson,         // 🔍 Still included for reference
        ai_response_raw: aiResponse  // Optional: full response
      });
    });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ message: 'AI generation failed', error: error.message });
  }
};
