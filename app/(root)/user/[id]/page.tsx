import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";

import { Suspense } from "react";



export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  
  const id = (await params).id;
  

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id});
  if (!user) return notFound();

  return (
    <>
      
          
       
    </>
  );
};

export default Page;