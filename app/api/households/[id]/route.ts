import { createAdminClient } from '@/utils/supabase/admin';
import { getHouseholdByIdQuery } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const supabaseAdmin = createAdminClient();

    const { data: household, error: householdError } =
      await getHouseholdByIdQuery(supabaseAdmin, id);

    if (householdError) {
      return NextResponse.json(
        { error: householdError.message },
        { status: 500 }
      );
    }

    if (!household) {
      return NextResponse.json(
        { error: 'Household not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ household });
  } catch (error) {
    console.error('Error fetching household:', error);
    return NextResponse.json(
      { error: 'Failed to fetch household' },
      { status: 500 }
    );
  }
}
