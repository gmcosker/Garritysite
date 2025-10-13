import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const posts = await sql`
      SELECT id, title, content, date_published, slug, created_at, updated_at 
      FROM writing_posts 
      ORDER BY date_published DESC
    `;
    
    return Response.json(posts);
  } catch (error) {
    console.error('Error fetching writing posts:', error);
    return Response.json({ error: 'Failed to fetch writing posts' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, content, date_published, slug } = await request.json();
    
    if (!title) {
      return Response.json({ error: 'Title is required' }, { status: 400 });
    }
    
    const result = await sql`
      INSERT INTO writing_posts (title, content, date_published, slug, updated_at)
      VALUES (${title}, ${content || null}, ${date_published || null}, ${slug || null}, CURRENT_TIMESTAMP)
      RETURNING id, title, content, date_published, slug, created_at, updated_at
    `;
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Error creating writing post:', error);
    return Response.json({ error: 'Failed to create writing post' }, { status: 500 });
  }
}