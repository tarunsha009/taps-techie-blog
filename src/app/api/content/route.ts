// app/api/content/route.ts
import { githubCMS } from '@/lib/github';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';     // <— IMPORTANT: we need Buffer & process.env
export const revalidate = 3600;      // optional cache

export async function GET(req: Request) {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');
    const list = url.searchParams.get('list');

    try {
        if (list === '1') {
            const posts = await githubCMS.getAllPosts();
            return NextResponse.json(posts, { status: 200 });
        }

        if (slug) {
            const post = await githubCMS.getPostBySlug(slug);
            if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
            return NextResponse.json(post, { status: 200 });
        }

        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    } catch (e: any) {
        // expose helpful info while debugging
        console.error('API /api/content error:', e?.message || e);
        return NextResponse.json({ error: e?.message || 'Internal error' }, { status: 500 });
    }
}
