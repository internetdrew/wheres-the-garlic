import { createAdminClient } from '@/utils/supabase/admin';
import { getPendingMembershipsQuery } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseAdmin = createAdminClient();

    const { data: pendingMemberships, error } =
      await getPendingMembershipsQuery(supabaseAdmin, user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ pendingMemberships });
  } catch (error) {
    console.error('Error fetching memberships:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
