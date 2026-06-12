import { CLINICAL_EXTRACTION_SYSTEM_PROMPT } from '@/lib/ai/gemini'
import { generateJSON } from '@/lib/ai/provider'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json()

    if (!transcript) {
      return NextResponse.json({ error: 'No transcript provided' }, { status: 400 })
    }

    const parsedResult = await generateJSON(
      `Here is the clinical session transcript:\n\n${transcript}`,
      CLINICAL_EXTRACTION_SYSTEM_PROMPT
    )

    return NextResponse.json({
      success: true,
      data: parsedResult,
    })
  } catch (error: any) {
    console.error('Session Extraction API Error:', error)
    return NextResponse.json({ error: error?.message || 'Failed to extract session data' }, { status: 500 })
  }
}
