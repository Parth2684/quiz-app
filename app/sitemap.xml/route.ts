export const dynamic = 'force-dynamic';

import prisma from '@/lib/singleton';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://quizzo.parthcodes.com';

  const staticRoutes = [
    { path: '/', changefreq: 'weekly', priority: 0.9 },
    { path: '/signup', changefreq: 'monthly', priority: 0.5 },
    { path: '/signin', changefreq: 'monthly', priority: 0.5 },
    { path: '/home', changefreq: 'monthly', priority: 0.5 },
    { path: '/quiz/create', changefreq: 'monthly', priority: 0.7 },
    { path: '/quiz/myQuizzes', changefreq: 'monthly', priority: 0.7 },
  ];

  const quizzes = await prisma.quiz.findMany({
    select: { id: true },
  });

  const dynamicRoutes = quizzes.map((quiz) => ({
    path: `/quiz/play/${quiz.id}`,
    changefreq: 'monthly',
    priority: 0.8,
  }));

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      ({ path, changefreq, priority }) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`
    )
    .join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
