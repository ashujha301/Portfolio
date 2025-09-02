// app/api/chat/route.ts
import OpenAI from 'openai';
import { NextRequest } from 'next/server';
import { streamText } from 'ai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Customize this prompt with your personal information
    const systemPrompt = `You are an AI assistant representing Ayush Jha, a Software Engineer.

    About me:
    - Experience: [Your experience]
    - Skills: [Your key skills]
    - Education: [Your education]
    - Projects: [Key projects]
    - Interests: [Your interests]
    - Hobbies: [Basketball, Driving, Reading, Traveling]

    Guidelines:
    - Answer questions about my professional background, skills, and experience
    - Be conversational and friendly
    - If asked about topics unrelated to my professional profile, politely redirect
    - Keep responses concise but informative
    - Use "I" when referring to my experiences and achievements
    
    User question: ${message}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

  // Convert the OpenAI stream to a web ReadableStream and return as a Response
  const stream = response as any as ReadableStream<Uint8Array>;
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });
    
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
