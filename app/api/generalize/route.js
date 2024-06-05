// app/api/generalize/route.js
import { NextResponse } from 'next/server';
import applyGeneralization from '../../../utils/applyGeneralization';
import path from 'path';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const l = parseInt(searchParams.get('l'), 10);

    const filePath = path.join(process.cwd(), 'public/data.json');
    applyGeneralization(filePath, l);

    return NextResponse.json({ message: 'Data generalized successfully' });
}
