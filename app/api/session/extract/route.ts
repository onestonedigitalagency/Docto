import { genAI, CLINICAL_EXTRACTION_SYSTEM_PROMPT } from '@/lib/ai/gemini'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json()

    if (!transcript) {
      return NextResponse.json({ error: 'No transcript provided' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: CLINICAL_EXTRACTION_SYSTEM_PROMPT,
    })

    const result = await model.generateContent(
      `Here is the clinical session transcript:\n\n${transcript}`
    )

    const responseText = result.response.text().trim()

    // Attempt to parse JSON safely (remove potential markdown wrappers if Gemini didn't obey)
    let cleanedText = responseText
    if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/```$/, '').trim()
    }

    const parsedResult = JSON.parse(cleanedText)

    return NextResponse.json({
      success: true,
      data: parsedResult,
    })
  } catch (error: any) {
    console.error('Session Extraction API Error:', error)
    return NextResponse.json({ error: error?.message || 'Failed to extract session data' }, { status: 500 })
  }
}
