import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Userstartups from "@/components/Userstartups";
import { Suspense } from "react";
import { StartupcardSkeleton } from "@/components/StartupCards";

 export const experimental_ppr = true;





const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  
  const id = (await params).id;
  

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id});
  if (!user) return notFound();

  return (
    <>
      <section className="profile_container "> 
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>
          <Image
          src={user.image}
          alt={user.name}
          width={220}
          height={220}
          className="profile_image"/>

          <p className="text-20-extrabold mt text-center">
            @{user.username}
          </p>
          <p className="mt-1 text-center text-14-normal">
            {user?.bio ||"No bio available"}
          </p>
        </div>
        <div className="flex-1 flex-col w-full max-w-7xl mx-auto gap-5 lg:mt-5">
          <p className="text-30-bold">
            {session?.user?.name === user.name ? "Your" : "All"} Startup's
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<StartupcardSkeleton/>}>
              <Userstartups id={id}/>
            </Suspense>
            

          </ul>

        </div>
      </section>
          
       
    </>
  );
};

export default Page;