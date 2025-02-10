/*import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import sharp from "sharp";
import dotenv from "dotenv";

// Cargar las variables del archivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const HF_API_URL = "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image";
const HF_API_KEY = `Bearer ${process.env.HF_API_KEY}`;


app.post("/generate-image", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await fetch(HF_API_URL, {
            headers: {
                Authorization: HF_API_KEY,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: prompt }),
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: "Error en la API de Hugging Face" });
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Redimensionar la imagen a 512x512 píxeles
        const resizedImage = await sharp(buffer).resize(512, 512).toBuffer();

        res.setHeader("Content-Type", "image/png");
        res.send(resizedImage);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});*/


import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import sharp from "sharp";
import dotenv from "dotenv";


// Cargar las variables del archivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// URL de la API de Hugging Face para el modelo de generación de imágenes
const HF_IMAGE_API_URL = "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image";
// URL de la API de Hugging Face para el modelo de síntesis de voz
const HF_API_URL_SPEECH = "https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech";

const HF_API_KEY = `Bearer ${process.env.HF_API_KEY}`;

// API para generar imagen a partir de texto
app.post("/generate-image", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await fetch(HF_IMAGE_API_URL, {
            headers: {
                Authorization: HF_API_KEY,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: prompt }),
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: "Error en la API de Hugging Face" });
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Redimensionar la imagen a 512x512 píxeles
        const resizedImage = await sharp(buffer).resize(512, 512).toBuffer();

        res.setHeader("Content-Type", "image/png");
        res.send(resizedImage);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


// API para generar audio a partir de texto utilizando Hugging Face
async function retryFetch(url, options, retries = 5, delay = 1000) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return response;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      if (retries > 0) {
        console.log(`Retrying... (${retries} retries left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return retryFetch(url, options, retries - 1, delay);
      } else {
        throw error;
      }
    }
  }
  
  app.post('/generate-speech', async (req, res) => {
    const { text } = req.body;
  
    // Verificar que el texto no esté vacío
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Texto no proporcionado' });
    }

    console.log('Generando voz para el texto:', text); // Agregar log aquí
  
    try {
      // Realizar la solicitud a la API de Hugging Face con reintento
      const response = await retryFetch(HF_API_URL_SPEECH, {
        method: 'POST',
        headers: {
          Authorization: HF_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: text })
      });
  
      // Si la respuesta es exitosa (200 OK)
      const audioBuffer = await response.arrayBuffer();
  
      // Configurar el tipo de contenido como audio/wav y enviar el archivo de audio como respuesta
      res.set('Content-Type', 'audio/wav');
      res.send(Buffer.from(audioBuffer)); // Convertir el ArrayBuffer a Buffer

    } catch (error) {
      console.error('Error generando voz:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
