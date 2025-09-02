// app/api/chat/route.ts
import { Configuration, OpenAIApi } from 'openai';
import { NextRequest } from 'next/server';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Customize this prompt with your personal information
    const systemPrompt = `You are an AI assistant representing [Your Name], a [Your Role/Title]. 
    
    About me:
    - Experience: [Your experience]
    - Skills: [Your key skills]
    - Education: [Your education]
    - Projects: [Key projects]
    - Interests: [Your interests]
    
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

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
    
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
