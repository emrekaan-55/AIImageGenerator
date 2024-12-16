// app/services/api.js
import { DEEPAI_API_KEY } from '@env';

const API_URL = 'https://api.deepai.org/api/text2img';

export const generateImage = async (prompt, style) => {
  try {
    console.log('Sending request with:', { prompt, style });
    console.log('Using API Key:', DEEPAI_API_KEY); // API key'in doğru geldiğinden emin olmak için

    const formData = new FormData();
    formData.append('text', `${prompt} ${style ? `in ${style} style` : ''}`);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'api-key': DEEPAI_API_KEY
      },
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(data.error || 'Image generation failed');
    }

    return data.output_url;
  } catch (error) {
    console.error('Error details:', error);
    throw error;
  }
};

export default {
  generateImage
};