import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const projects = await sql`
      SELECT id, title, url, description, created_at, updated_at 
      FROM projects 
      ORDER BY created_at DESC
    `;
    
    return Response.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, url, description } = await request.json();
    
    if (!title) {
      return Response.json({ error: 'Title is required' }, { status: 400 });
    }
    
    const result = await sql`
      INSERT INTO projects (title, url, description, updated_at)
      VALUES (${title}, ${url || null}, ${description || null}, CURRENT_TIMESTAMP)
      RETURNING id, title, url, description, created_at, updated_at
    `;
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Error creating project:', error);
    return Response.json({ error: 'Failed to create project' }, { status: 500 });
  }
}