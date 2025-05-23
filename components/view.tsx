import React from 'react';
import Ping from './ping';
import { client } from '@/sanity/lib/client';
import { STARTUPS_VIEWS_QUERY } from '@/sanity/lib/queries';
import { writeclient } from '@/sanity/lib/write-client';
import {unsatable_after as after} from 'next/server'
interface Props {
  id: string;
}

const View = async ({ id }: Props) => {
  
  const data = await client.withConfig({ useCdn: false }).fetch(STARTUPS_VIEWS_QUERY, { id });
  const totalViews = data?.views ?? 0;
(async () => {
  await writeclient
    .patch(id)
    .set({ views: (totalViews || 0) + 1 }) // fallback to 0 if no views
    .commit();
})();
   

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">Views:{totalViews}</span>
      </p>
    </div>
  );
};

export default View;
