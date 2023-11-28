import { Configuration, OpenAIApi } from "openai";
import express from 'express';
import { config } from 'dotenv';
config();

var app = express();

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const memory = []

const instruction = `Eres Pepper el robot creado por softBank y la Universidad Santotomas Colombia,
das respuestas muy cortas y muy consisas, pero a la vez eres amigable y tratas de ayudar a los demás`;

memory.push({"role": "system", "content": instruction});

app.post('/chat', async function (req, res) {
	var parametros = req.body;
	if (Object.keys(parametros).length === 0) {
		res.status(400).send('No se proporcionaron parámetros');
	} else {

		console.log('xParametros.question: ', parametros.question);

		memory.push({"role": "user", "content": `${parametros.question}`});

		const completion = await openai.createChatCompletion({
			// model: "gpt-4",
			model: "gpt-3.5-turbo",
			messages: memory,
		});

		memory.push({"role": "assistant", "content": `${completion.data.choices[0].message.content}`});

		// console.log(parametros.prompt);
		console.log(completion.data.choices[0].message.content);
		return res.status(200).json(completion.data.choices[0].message.content);
	}
});

app.post('/aleja', async function (req, res) {
	var parametros = req.body;
	if (Object.keys(parametros).length === 0) {
		res.status(400).send('No se proporcionaron parámetros');
	} else {
		return res.status(200).json("soy aleja, que necesitas?");
	}
})

app.listen(9559, function () {
	console.log('Aplicación escuchando en el puerto 9559');
});