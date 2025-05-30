import React, { Suspense } from 'react';
export const experimental_ppr = true;
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/view';

const md = markdownit();

const Page = async ({ params }: { params: { id: string } }) => {
    const resolvedParams = await params;
  const id = resolvedParams.id;
  if (!id) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold">Invalid startup ID</h1>
      </div>
    );
  }

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold">Startup not found</h1>
      </div>
    );
  }

  const parsedContent = md.render(post?.pitch || '');

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post._createdAt)}</p>
        <h1 className="heading-section">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <div className="flex justify-center w-full">
          <img
            src={post.image || '/default-thumbnail.jpg'}
            alt="thumbnail"
            width={900}
            height={400}
            className="rounded-xl object-cover w-full max-w-4xl h-auto"
          />
        </div>

        <div className="space-y-5 mt pt-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-3">
            {post.author ? (
              <Link
                href={`/user/${post.author._id}`}
                className="flex items-center gap-2"
              >
                <img
                  src={post.author.image || '/default-avatar.png'}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-lg"
                />
                <div>
                  <p className="text-20-medium">{post.author.name || 'No Name'}</p>
                  <p className="text-16-medium text-black-300">
                    @{post.author.username || 'unknown'}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <img
                  src="/default-avatar.png"
                  alt="Default avatar"
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-lg"
                />
                <div>
                  <p className="text-20-medium">Unknown Author</p>
                  <p className="text-16-medium text-black-300">@unknown</p>
                </div>
              </div>
            )}
            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Detail</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-san break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No pitch detail provided</p>
          )}
        </div>

        <hr className="divider" />
      </section>

      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <View id={id} />
      </Suspense>
    </>
  );
};

export default Page;
