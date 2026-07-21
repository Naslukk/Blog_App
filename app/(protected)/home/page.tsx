import { verifySession } from '@/lib/session';
import { redirect } from 'next/navigation';


export default async function Home() {
       const user = await verifySession();
    
      if (!user) {
        redirect("/login");
      }
  return (
    <div>Home</div>
  )
}