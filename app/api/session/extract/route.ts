import { NextResponse } from "next/server"
import { genAI, CLINICAL_EXTRACTION_SYSTEM_PROMPT } from "@/lib/ai/gemini"

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json()

    if (!transcript) {
      return NextResponse.json(
        { error: "Transcript is required for extraction." },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
       return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured." },
        { status: 500 }
      )
    }

    // Use Gemini 2.5 Pro (or 1.5 Pro) for high-quality structured extraction
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro", 
      systemInstruction: CLINICAL_EXTRACTION_SYSTEM_PROMPT 
    })

    const result = await model.generateContent(transcript)
    const responseText = result.response.text()

    try {
      // Clean up the response if the model accidentally includes markdown blocks
      const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim()
      const structuredData = JSON.parse(cleanJson)

      return NextResponse.json({ data: structuredData })
    } catch (parseError) {
      console.error("Failed to parse Gemini output as JSON:", responseText)
      return NextResponse.json(
        { error: "Failed to parse AI response into structured data." },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Extraction API Error:", error)
    return NextResponse.json(
      { error: "An error occurred during AI extraction." },
      { status: 500 }
    )
  }
}
