import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about-us', changefreq: 'weekly', priority: 0.8 },
  { url: '/for-students', changefreq: 'weekly', priority: 0.8 },
  { url: '/announcement/1', changefreq: 'monthly', priority: 0.7 },
  { url: '/gallery/location1', changefreq: 'monthly', priority: 0.7 },
  { url: '/downloads', changefreq: 'monthly', priority: 0.7 },
  { url: '/trustees', changefreq: 'monthly', priority: 0.7 },
  { url: '/teaching', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact-us', changefreq: 'monthly', priority: 0.7 },
  { url: '/get-involved', changefreq: 'monthly', priority: 0.7 }
];

if (!links.length) {
  console.error("No links provided.");
  process.exit(1);
}

const sitemapStream = new SitemapStream({ hostname: 'https://himalayanvidyadaan.org' });
const writeStream = createWriteStream('./public/sitemap.xml');

Readable.from(links)
  .pipe(sitemapStream)
  .pipe(writeStream)
  .on('error', (err) => {
    console.error('Error generating sitemap:', err);
  });