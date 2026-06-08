import { genAI } from '@/lib/ai/gemini'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { text, action } = await req.json()

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    })

    let prompt = ''
    if (action === 'meaning') {
      prompt = `Provide a concise, professional medical definition, context, and etymology/root of the following medical term:\n\n"${text}"`
    } else if (action === 'simplify') {
      prompt = `Translate/rewrite the following medical text in simple, plain, easy-to-understand layperson English (perfect for patient explanations):\n\n"${text}"`
    } else if (action === 'summarize') {
      prompt = `Summarize the following medical text in one brief, impactful sentence:\n\n"${text}"`
    } else if (action === 'takeaways') {
      prompt = `Extract the key takeaways/bullet points from the following clinical text:\n\n"${text}"`
    } else {
      prompt = `Analyze the following text from a medical context:\n\n"${text}"`
    }

    const result = await model.generateContent(prompt)
    const responseText = result.response.text().trim()

    return NextResponse.json({
      success: true,
      result: responseText,
    })
  } catch (error: any) {
    console.error('Define API Error:', error)
    return NextResponse.json({ error: error?.message || 'Failed to process request' }, { status: 500 })
  }
}
