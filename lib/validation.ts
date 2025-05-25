import { z } from 'zod';

export const FormSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(50),
  link: z.string().url(),
  pitch: z.string().min(20),
}).superRefine(async (data, ctx) => {
  try {
    const res = await fetch(data.link, { method: 'HEAD' });

    const contentType = res.headers.get('content-type');

    if (!contentType?.startsWith('image/')) {
      ctx.addIssue({
        path: ['link'],
        code: z.ZodIssueCode.custom
      });
    }
  } catch (err) {
    ctx.addIssue({
      path: ['link'],
      code: z.ZodIssueCode.custom,
      message: 'Failed to verify image URL.',
    });
  }
});
