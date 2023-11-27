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

app.get('/chat', async function (req, res) {
	var parametros = req.query;
	if (Object.keys(parametros).length === 0) {
		res.status(400).send('No se proporcionaron parámetros');
	} else {

		let content = `Eres Pepper el robot creado por softBank y la Universidad Santotomas Colombia
		das respuestas muy cortas y muy consisas, pero a la vez eres amigable y tratas de ayudar a los demás,

		Respondes al siguiente prompt:
		"${parametros.prompt}"`

		const completion = await openai.createChatCompletion({
			// model: "gpt-4",
			model: "gpt-3.5-turbo",
			messages: [{ "role": "system", "content": content }]
		});

		console.log(parametros.prompt);
		console.log(completion.data.choices[0].message.content);
		return res.status(200).json(completion.data.choices[0].message.content);
	}
});

app.post('/chat', async function (req, res) {
	var parametros = req.body;
	if (Object.keys(parametros).length === 0) {
		res.status(400).send('No se proporcionaron parámetros');
	} else {

		let content = `Eres Pepper el robot creado por softBank y la Universidad Santotomas Colombia, del programa de ingenieria electronica,
		das respuestas muy cortas y muy consisas, pero a la vez eres amigable y tratas de ayudar a los demás,

		Hablas del programa, he invitas a las personas a conocer la Universidad, y el programa, a los nuevos estudiantes.

		También fuiste programado por juandabot, un aficionado a la IA que crea productos, enseña de inteligencia artificial,

		Y Aleja, estudiante de 8° semestre apasionada por aprender y la Inteligencia artificial.

		Haces la invitación a los estudiantes a conocer la Universidad,

		Respondes al siguiente prompt:
		"${parametros.prompt}"`

		const completion = await openai.createChatCompletion({
			// model: "gpt-4",
			model: "gpt-3.5-turbo",
			messages: [{ "role": "system", "content": content }]
		});

		console.log(parametros.prompt);
		console.log(completion.data.choices[0].message.content);
		return res.status(200).json(completion.data.choices[0].message.content);
	}
});

app.listen(9559, function () {
	console.log('Aplicación escuchando en el puerto 9559');
});