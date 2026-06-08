import { genAI } from '@/lib/ai/gemini'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const base64Data = fileBuffer.toString('base64')
    const mimeType = file.type || 'application/pdf'

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    })

    const prompt = `
You are a medical research assistant for the Docto Clinical Suite.
Analyze the attached medical document and extract structured clinical insights.

Please output your response as a pure JSON object (no markdown formatting, no \`\`\`json block) with the following exact structure:
{
  "title": "Title of the research paper or document",
  "summary": "A concise 1-2 paragraph summary summarizing the clinical background, methodology, and conclusion.",
  "keyTakeaways": [
    "Takeaway 1 - key clinical discovery or statistic",
    "Takeaway 2 - practical application for physicians",
    "Takeaway 3 - recommended dosage or patient target group"
  ],
  "relatedQueries": [
    "Further query 1",
    "Further query 2"
  ]
}

Only return the raw JSON object. Do not include any other text.
`

    let result
    if (mimeType === 'application/pdf') {
      result = await model.generateContent([
        {
          inlineData: {
            data: base64Data,
            mimeType: 'application/pdf',
          },
        },
        prompt,
      ])
    } else {
      // Treat as text file
      const textContent = fileBuffer.toString('utf-8')
      result = await model.generateContent([
        `Document Content:\n${textContent}\n\n${prompt}`
      ])
    }

    const responseText = result.response.text().trim()
    
    // Attempt to parse JSON safely (remove potential markdown wrappers if Gemini didn't obey)
    let cleanedText = responseText
    if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/```$/, '').trim()
    }

    const parsedResult = JSON.parse(cleanedText)

    return NextResponse.json({
      success: true,
      title: parsedResult.title || file.name,
      summary: parsedResult.summary || 'Summary not available.',
      keyTakeaways: parsedResult.keyTakeaways || [],
      relatedQueries: parsedResult.relatedQueries || [],
    })
  } catch (error: any) {
    console.error('Research API Error:', error)
    return NextResponse.json({ error: error?.message || 'Failed to process document' }, { status: 500 })
  }
}
