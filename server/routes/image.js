const express = require('express');
const router = express.Router();

const generateImage = async (prompt, apiKey) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch('https://api.stabilityai.com/v1/generation/text-to-image/stable-diffusion-xl-1024-v1-0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
            weight: 1
          }
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        steps: 20,
        samples: 4
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating image:', error.message);
    return null;
  }
};

router.post('/', async (req, res) => {
  const { prompt, apiKey } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  if (!apiKey) {
    return res.status(400).json({ error: 'API key is required' });
  }

  try {
    // Check if client is still connected before making API call
    if (!res.writableEnded) {
      const result = await generateImage(prompt, apiKey);

      if (!res.writableEnded && result && result.artifacts && result.artifacts.length > 0) {
        const images = result.artifacts.map((img, index) => ({
          id: Date.now() + index,
          prompt,
          url: `data:image/png;base64,${img.base64}`,
          likes: Math.floor(Math.random() * 100)
        }));
        res.json({ images });
      } else if (!res.writableEnded) {
        res.json({
          error: 'No images generated',
          fallback: true
        });
      }
    }
  } catch (error) {
    console.error('Image generation error:', error);
    if (!res.writableEnded) {
      res.json({
        error: error.message,
        fallback: true
      });
    }
  }
});

module.exports = router;