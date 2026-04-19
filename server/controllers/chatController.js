const axios = require('axios');

const API_KEY = process.env.GROQ_API_KEY;

const getChatResponse = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  console.log('GROQ_API_KEY exists:', !!API_KEY, API_KEY ? API_KEY.substring(0, 10) + '...' : '');
  
  if (!API_KEY) {
    return res.status(500).json({ reply: 'Server configuration error: API key missing' });
  }

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant. When providing code, always wrap it in triple backticks with the language name, like ```javascript\ncode here\n```. Be friendly, concise, and helpful.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1024,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 25000
      }
    );

    const reply = response.data?.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
    res.json({ reply });
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    const errorMsg = error.response?.data?.error?.message || error.message || 'Unknown error';
    res.status(500).json({ reply: `Sorry, I encountered an error: ${errorMsg}` });
  }
};

module.exports = { getChatResponse };