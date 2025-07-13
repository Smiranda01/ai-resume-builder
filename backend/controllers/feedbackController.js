const { OpenAI } = require('openai');
const feedbackModel = require('../models/feedbackModel');

// Initialize OpenAI client using the API key from environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Controller function to generate AI-enhanced resume feedback
exports.generateFeedback = async (req, res) => {
  const user_id = req.user?.id;
  const { resume_id, input } = req.body;

  // Basic input validation
  if (!resume_id || !input) {
    return res.status(400).json({
      message: 'Missing required fields (resume_id, input)',
    });
  }

  // Prompt sent to OpenAI with strict formatting and instructions
  const prompt = `
  You are an expert resume builder and creative writing assistant.
  
  Based on the user input below, generate a complete, expressive, first-person resume in **strict JSON format**.

  Rules:
  - Return ONLY valid JSON (no markdown, no code blocks)
  - Use natural, story-like language — avoid robotic tones
  - Make it feel personal, confident, and authentic
  - Elaborate on strengths, projects, and impact
  - Include more vivid, achievement-focused language
  - Output must be a single valid JSON object (no comments, no explanations)
  - Do not include any text before or after the JSON object
  - "ATS_score" Is a MUST
  
  JSON Output Format:
  {
    "name": "string",
    "title": "string",
    "summary": "string",
    "experience": [{ "company": "...", "role": "...", "description": "..." }],
    "skills": ["..."],
    "education": [{ "institution": "...", "degree": "...", "year": "..." }],
    "certifications": ["..."],
    "languages": ["..."],
    "projects": [{ "name": "...", "description": "..." }],
    "ATS_score": "Int"
  }

  User Input:
  ${JSON.stringify(input, null, 2)}`;

  console.log('[Sending Prompt to OpenAI]:\n', prompt);

  try {
    // Send request to OpenAI's chat completion API
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
    });

    const rawJson = aiResponse.choices?.[0]?.message?.content;

    // Validate AI response
    if (!rawJson) {
      return res.status(500).json({ message: 'AI response did not contain content.' });
    }

    // Attempt to parse JSON string into a JavaScript object
    let parsedJson;
    try {
      parsedJson = JSON.parse(rawJson);
    } catch (err) {
      return res.status(500).json({
        message: 'Failed to parse JSON from AI response.',
        raw: rawJson,
        error: err.message,
      });
    }

    // Save raw JSON feedback in the database
    feedbackModel.saveFeedback(user_id, resume_id, rawJson, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Failed to save feedback',
          error: err,
        });
      }

      // Return both raw and parsed feedback to the client
      res.status(200).json({
        message: 'AI feedback generated and stored',
        feedback_id: result.insertId,
        resume_json: parsedJson,
        ai_response_raw: rawJson,
      });
    });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({
      message: 'AI generation failed',
      error: error.message,
    });
  }
};
