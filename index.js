// system
const express = require('express');
const cors = require('cors');
const app = express();

// openai
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.post('/summarize', async (req, res) => {
  try {
    const imageBase64 = req.body.image; // Assuming the image is sent as a base64 string
    // Process the image as needed (e.g., send to a recognition service)
    const prompt = `Summarize the content of this image: ${imageBase64}`;
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 150,
    });

    res.json({ summary: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the image');
  }
});