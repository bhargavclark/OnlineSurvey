import { NextResponse } from 'next/server'
import dbConnect from '@/app/database/utils/mongodb'
import Survey from '@/app/database/models/survey'

export async function POST(req: Request) {
    try {
        await dbConnect()
        const { title, description } = await req.json()

        const existingSurvey = await Survey.findOne({ title, description })

        return NextResponse.json({ exists: !!existingSurvey })
    } catch (error) {
        console.error('Error checking existing surveys:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

