import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const config = new Configuration({
  apiKey: process.env.API_KEY
});

const openai = new OpenAIApi(config);

const getCompletion = async (prompt, model = "gpt-3.5-turbo") => {
  let messages = [{"role": "user", "text": prompt}];
  const response = await openai.createCompletion({
    model,
    messages,
    temperature: 10
  });
  return response.data.choices[0].text;
};

const text = `
  You should express what you want a model to do by \
  providing instructions that are as clear and \
  specific as you can possibly make them. \
  This will guide the model towards the desired output, \
  and reduce the chances of receiving irrelevant \
  or incorrect responses. Don't confuse writing a \
  clear prompt with writing a short prompt. \
  In many cases, longer prompts provide more clarity \
  and context for the model, which can lead to \
  more detailed and relevant outputs.
`

const prompt = `
  Summarize the text delimited by triple backticks \
  into a single sentence.
  \`\`\`${text}\`\`\`
`;

getCompletion(prompt)
  .then(result => console.log(result.data))
  .catch(err => console.error(err));