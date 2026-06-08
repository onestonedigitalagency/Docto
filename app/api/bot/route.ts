import { genAI } from '@/lib/ai/gemini'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { message, history, tone } = await req.json()

    // Base system instructions based on tone
    let systemInstruction = "You are an expert AI clinical assistant for the Docto Clinical Suite. You help doctors summarize clinical findings, explain medical terms, check drug side effects/interactions, and analyze data."
    if (tone === 'teacher') {
      systemInstruction += " Adopt a teaching, explanatory tone. Break concepts down into simple, easy-to-understand terms with structured explanations. Perfect for explaining medical jargon to patients."
    } else if (tone === 'concise') {
      systemInstruction += " Be extremely concise, brief, and to-the-point. Use bullet points and focus only on critical clinical details. Skip verbose greetings."
    } else {
      systemInstruction += " Be highly professional, scientific, and evidence-based. Use standard clinical terminology, and reference guidelines where appropriate."
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction,
    })

    // Prepare chat history for Gemini API (filter system and convert roles)
    // Gemini chat format: { role: 'user' | 'model', parts: [{ text: '...' }] }
    const formattedHistory = (history || [])
      .filter((msg: any) => msg.role === 'user' || msg.role === 'assistant')
      .map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))

    const chat = model.startChat({
      history: formattedHistory,
    })

    const result = await chat.sendMessage(message)
    const responseText = result.response.text()

    return NextResponse.json({
      success: true,
      message: responseText,
    })
  } catch (error: any) {
    console.error('Bot API Error:', error)
    return NextResponse.json({ error: error?.message || 'Failed to process bot message' }, { status: 500 })
  }
}
