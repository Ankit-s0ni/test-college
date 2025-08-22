export type FaqItem = { q: string; a: string };

export type ArticleBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'image'; src: string; alt?: string; caption?: string }
  | { type: 'callout'; text: string }
  | {
      type: 'comparison';
      title: string;
      india: string[];
      abroad: string[];
      banner?: { src: string; alt?: string };
    }
  | { type: 'benefits'; india: string[]; abroad: string[] }
  | { type: 'faqs'; title?: string; items: FaqItem[] };

type Article = {
  title: string;
  hero: { src: string; alt: string };
  blocks: ArticleBlock[];
  faqs?: { q: string; a: string }[];
};

// NOTE: Use the same slug you’ll navigate to: /blog/how-long-is-a-phd-duration-breakdown-india-abroad
export const BLOG_ARTICLES: Record<string, Article> = {
  'how-long-is-a-phd-duration-breakdown-india-abroad': {
    title: 'How Long is a PhD? Duration Breakdown for India & Abroad',
    hero: {
      src: 'https://images.unsplash.com/photo-1590012314778-fad19fb1a591?q=80&w=1600&auto=format&fit=crop',
      alt: 'Graduates celebrating in front of a university building',
    },
    blocks: [
      { type: 'h2', text: 'PhD Programs in India' },
      {
        type: 'p',
        text: 'A PhD program is a long, deeply rewarding journey. Timelines can differ based on field of study, country, and whether you’re working on coursework-heavy programs or research-first models. Below is a friendly, realistic breakdown so you can plan smartly.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop',
        alt: 'Indian campus building',
      },
      {
        type: 'ol',
        items: [
          'Usual length: 4–6 years (STEM often 5–6; Management/Social Sciences ~4–5).',
          'Structure: 1–2 years of coursework + comprehensive exam + proposal + research + thesis.',
          'Funding: Mix of institute fellowships (JRF/SRF), teaching assistantships, and external grants.',
          'Milestones: Coursework → Comprehensive exam → Candidacy → Research + publications → Thesis defense.',
        ],
      },
      {
        type: 'p',
        text: 'Delays typically happen around data collection, lab schedules, publication cycles, and thesis reviews. Plan buffers for ethics approvals and equipment downtime.',
      },

      { type: 'h2', text: 'PhD Duration Abroad: A Global Perspective' },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop',
        alt: 'International student on campus',
      },
      {
        type: 'ol',
        items: [
          'US: 5–7 years (coursework + qualifying exams + research).',
          'UK: 3–4 years (research-focused; coursework is minimal).',
          'Europe (e.g., Germany, Netherlands): 3–4 years with structured research groups.',
          'Australia: 3–4 years; often thesis-by-publication is common.',
        ],
      },
      {
        type: 'p',
        text: "When comparing countries, watch for program structure, funding security, supervisor bandwidth, and publishing norms. These influence the real finish line more than the 'official' duration.",
      },

      { type: 'h2', text: 'Factors Determining Your PhD Duration' },
      {
        type: 'p',
        text: 'The length of a PhD is not fixed, as various aspects influence how long it takes to complete your doctorate. Here is a list of the most important factors that will affect the time it takes to complete your PhD:',
      },

      {
        type: 'ol',
        items: [
          'Field of Study: PhDs in research-intensive fields such as the sciences and engineering might take a lot of time due to extensive lab work; whereas, usually, PhDs in the humanities or social sciences will have much shorter timelines.',
          'Mode of Study: Full-time PhDs in many cases will have shorter timelines than part-time and distance learning study, which may greatly expand the duration of your PhD.',
          'Funding/Scholarships: Consistent funding can allow students to focus completely on their research, meaning the PhD may take less time. However, limited funding will likely hinder students if they are taking on part-time jobs.',
          'Nature of Research: Depending on whether the project is an experimental, theoretical, or applied project, the nature of your research will impact the time it takes to complete.',
          'Institutional Requirements: Each university is likely to have requirements for mandatory courses, publications, teaching, or some other requirement that may lengthen the duration of your PhD.',
          'Personal circumstance: Unexpected life events, health, and family commitments can also impact your overall PhD pathway time.',
        ],
      },

      {
        type: 'comparison',
        title: 'India vs International PhD Duration: A Comparative Analysis',
        india: [
          '4–6 years; coursework and comprehensive exams common.',
          'Lower tuition; mixed funding (JRF/SRF, TA/RA).',
          'Admin steps (approvals/evaluation) can add months.',
          'Publication expectations vary by institute and guide.',
        ],
        abroad: [
          '3–7 years depending on country and field.',
          'More research-first in UK/EU; longer in US due to coursework.',
          'Funding is competitive but often covers tuition + stipend.',
          'Clearer milestone tracking in many departments.',
        ],
      },

      {
        type: 'benefits',
        india: [
          'Lower living costs in many cities',
          'Strong public research institutes',
          'Proximity to local datasets/contexts',
        ],
        abroad: [
          'Broader international exposure',
          'Access to specific labs/equipment',
          'Potentially higher stipends in some countries',
        ],
      },

      {
        type: 'h2',
        text: 'Conclusion',
      },
      {
        type: 'p',
        text: 'When it comes to deciding whether to do your PhD in India or abroad, it really comes down to personal aspirations, subject area research interest, and your lifestyle choices. For example, India offers a structured program, defined opportunities for specialization, and exceptional cost, then the answer is clear. This is particularly true for anyone looking to build out their career in India.',
      },

      {
        type: 'p',
        text: 'On the other hand, doing a PhD abroad gives you global networks, expanded career research interests, experiences, and advances, but at the cost of higher fees and a competitive environment. Both have great benefits and potential drawbacks, and what may be an appropriate decision for one person may not be suitable for another. As you make this crucial journey, it is most important that the vision you have for your future lines up with your choices as they relate to a career in industry, academia, or a career generally based on innovation in research and policy.',
      },

      {
        type: 'p',
        text: 'Where you do your PhD is a big commitment, a life-changing experience, and a possible educational growth, personally and professionally. Take your time and think things through, be objective as you list pros and cons, and consider the fact that you are embarking on something worthwhile!',
      },

      {
        type: 'faqs',
        items: [
          {
            q: 'What is the approximate length of a PhD in India?',
            a: "A PhD in India generally takes about 3 to 6 years to complete, depending on the student's area of study, research progress, timeline, and university policies.",
          },
          {
            q: 'What is the average length of a PhD program abroad?',
            a: 'On average, a PhD program abroad will take anywhere from 4 to 7 years. For instance, a PhD in the USA typically takes around 5 to 7 years, while completing a PhD in the UK and other parts of Europe takes much less time, typically between 3 to 4 years.',
          },
          {
            q: 'Can I finish my PhD sooner than the average duration?',
            a: 'In some cases, yes, as long as the research is timely and you have accomplished all requirements, but most universities do have policies regarding minimum duration.',
          },
          {
            q: 'Does the duration of the programs vary as per the specialisation?',
            a: 'Yes, fields within Science and Engineering generally take longer than other areas of study due to the extra lab work. A PhD in Humanities or Social Sciences is often a little bit shorter.',
          },
          {
            q: 'Can I do a PhD part-time? How does this affect my duration?',
            a: 'Many universities have policies for PhD part-time, which will generally add a few years to your timeframe compared to completion on a full-time basis.',
          },
          {
            q: 'What can delay my PhD?',
            a: 'You may experience delays in completing your PhD for a variety of reasons, including (but not limited to) difficulties with the research, resources, changes with your supervisor, and personal circumstances.',
          },
        ],
      },
    ],
  },
};
