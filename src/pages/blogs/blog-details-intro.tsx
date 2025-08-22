import Link from 'next/link';
import React from 'react';

type Props = {
  title: string;
  author: string;
  authorHref?: string;
  publishedAt: string;
  intro?: React.ReactNode;
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  } catch {
    return iso;
  }
}

const BlogDetailsIntro: React.FC<Props> = ({
  title,
  author,
  authorHref = '#',
  publishedAt,
  intro,
}) => {
  return (
    <section className="bg-[#F7EEFDBD]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl md:py-16">
          {/* Title */}
          <h1
            className="
              text-[22px] sm:text-[24px] md:text-[28px]
              font-extrabold leading-snug tracking-tight text-[#0F172A]
            "
          >
            {title}
          </h1>

          {/* Meta */}
          <div className="mt-2 text-[13px] sm:text-sm text-[#6B7280]">
            by{' '}
            <Link
              href={authorHref}
              className="text-[#2B6CE5] font-medium hover:underline underline-offset-2"
            >
              {author}
            </Link>
            <span className="mx-2">-</span>
            <time className="tabular-nums" dateTime={publishedAt}>
              {formatDate(publishedAt)}
            </time>
          </div>

          {/* Lead paragraph */}
          <div className="mt-4 text-[15px] leading-7 text-[#111827]">
            {intro ?? (
              <p>
                <strong>A PhD program</strong> is a long journey and a fulfilling adventure.{' '}
                <strong>The time it takes to get a PhD will differ</strong> based on where you are
                studying. <strong>In India, PhD programs typically take 3 to 5 years</strong>, which
                includes coursework, qualifying exams, and research. Your timing and completion vary
                if your research topics are complex, you are researching a long-term issue, or you
                are working while you are studying. Whereas, <strong>PhD programs abroad</strong>{' '}
                are another matter with great variation, so it will likely take longer. For example,
                sometimes when you <strong>study for a PhD in the US or Canada</strong>, this could
                take approximately <strong>5 to 7 years</strong> with more emphasis on research and
                dissertation work. Surprisingly, <strong>a PhD in many European countries</strong>{' '}
                can take a shorter time, depending on the country and what type of educational field
                you are in. In this blog, we will highlight{' '}
                <strong>what a PhD looks like in India and abroad</strong>, so you can plan out your
                academic journey. Let’s take a closer look!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsIntro;
