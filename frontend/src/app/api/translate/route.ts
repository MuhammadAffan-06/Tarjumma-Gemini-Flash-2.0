import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { sourceLang, targetLang, transcript } = await request.json();
    
    if (!sourceLang || !targetLang || !transcript) {
      return NextResponse.json(
        { error: "Missing required fields: sourceLang, targetLang, or transcript" },
        { status: 400 }
      );
    }
        
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `Translate the following word or a sentence from the source language ${sourceLang} to target language ${targetLang}:
    The sentence or word which needs to be translated is ${transcript}. I don't want any explanation at all, just the translation `;
    
    try {
      const result = await model.generateContent(prompt);
      
      if (!result.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Invalid response format from Gemini API");
      }
      
      const translation = result.response.candidates[0].content.parts[0].text.replace("\n", "");
      
      
      return NextResponse.json(translation, { status: 200 });
    } catch (apiError: any) {
      return NextResponse.json(
        { error: "Gemini API Error", details: apiError.message },
        { status: 502 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server Error", details: error.message },
      { status: 500 }
    );
  }
} 