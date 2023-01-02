import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG_ID,
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const rl = readline.createInterface({ input, output });

console.log('\n');

while (true) {

  const question = await rl.question('> ');

  if (question === 'exit') {
    console.log('\n');
    break;
  }

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    max_tokens: 2048,
    temperature: 0,
  });

  console.log(response.data.choices[0].text+'\n\n');

}

rl.close();

