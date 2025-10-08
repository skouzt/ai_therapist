import UserForm from '@/component/Mira/therapyform'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';

const Page = async () => {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  return (
    <main className="flex justify-center items-start mb-20 px-4">
      <article className="w-full max-w-2xl flex flex-col gap-4">
        <UserForm />
      </article>
    </main>
  );
};

export default Page;
