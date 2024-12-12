// app/services/api.js
import { OPENAI_API_KEY } from '@env';

const API_URL = 'https://api.openai.com/v1/images/generations';

export const generateImage = async (prompt, style) => {
  try {
    console.log('Sending request with:', { prompt, style }); // Debug için log
    console.log('Using API Key:', OPENAI_API_KEY); // API key'in doğru geldiğinden emin olalım

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: `${prompt} ${style ? `in ${style} style` : ''}`,
        n: 1,
        size: "1024x1024",
        response_format: "url"
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data); // Hata detaylarını görelim
      throw new Error(data.error?.message || 'Image generation failed');
    }

    return data.data[0].url;
  } catch (error) {
    console.error('Error details:', error);
    throw error;
  }
};

export default {
  generateImage
};