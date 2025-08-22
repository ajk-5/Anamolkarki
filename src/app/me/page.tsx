import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function MePage() {
  const cookieStore = await cookies();
  const friendCookie = cookieStore.get('friendsorfamily');

  if (!friendCookie) {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome to my page!</h1>
    </div>
  );
}
