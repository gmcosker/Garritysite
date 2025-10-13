import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const inventions = await sql`
      SELECT id, title, description, date_created, created_at, updated_at 
      FROM inventions 
      ORDER BY date_created DESC
    `;
    
    return Response.json(inventions);
  } catch (error) {
    console.error('Error fetching inventions:', error);
    return Response.json({ error: 'Failed to fetch inventions' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, description, date_created } = await request.json();
    
    if (!title || !description) {
      return Response.json({ error: 'Title and description are required' }, { status: 400 });
    }
    
    const result = await sql`
      INSERT INTO inventions (title, description, date_created, updated_at)
      VALUES (${title}, ${description}, ${date_created || null}, CURRENT_TIMESTAMP)
      RETURNING id, title, description, date_created, created_at, updated_at
    `;
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Error creating invention:', error);
    return Response.json({ error: 'Failed to create invention' }, { status: 500 });
  }
}