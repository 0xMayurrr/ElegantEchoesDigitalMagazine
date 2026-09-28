export interface Article {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  body?: string[];
  trending?: boolean;
  mostReadRank?: number;
}

export interface PodcastEpisode {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  date: string;
  category: string;
  image: string;
  audioUrl?: string;
}

const img = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

export const FEATURED_ARTICLE: Article = {
  id: 'things-we-never-say',
  category: 'REFLECTION',
  title: 'The Things We Never Say',
  subtitle: 'On the weight of words left unspoken, and the spaces between us.',
  excerpt: 'There are conversations we rehearse in the shower, speeches we give to the mirror at midnight. They live in us, fully formed — waiting for a moment that never quite arrives.',
  date: 'September 12, 2026',
  readTime: '8 min read',
  image: 'photo-1516414447565-b14be0adf13e',
  body: [
    'There are conversations we rehearse in the shower, speeches we give to the mirror at midnight. They live in us, fully formed — waiting for a moment that never quite arrives.',
    'I think about the phone calls I did not make. The apologies I carried for years like smooth stones in a coat pocket — heavy and familiar, worn down by touching.',
    'We tend to think silence is passive. But silence is its own kind of action. It has weight, texture, consequence. The things we do not say shape relationships just as surely as the things we do.',
    'My grandmother died with things unsaid between us. I know this because of the way she held my hand at the end — too long, too tight — as if trying to transmit something through pressure alone. I think I understood. I did not say so.',
    'There is a particular kind of grief for words not spoken. It is different from other kinds. It lives in the subjunctive tense, in the conditional. I could have said. I should have said. A ghost story written in the second person.',
    'I have started writing letters I will never send. Not because I am a coward — though perhaps I am — but because the act of writing seems to do something that speaking cannot. It slows the words down. It makes you choose.',
    'We owe each other our honesty. Not the brutal, unfiltered kind — that is laziness dressed as virtue. But the considered kind. The kind that costs you something. The kind that you have to work up to.',
    'Say the thing. Say it imperfectly. Say it late. Say it wrong and then correct yourself. The conversation you have been rehearsing is already better than the silence you have been maintaining.',
  ],
};

export const TRENDING_ARTICLES: Article[] = [
  {
    id: 'art-of-being-alone',
    category: 'REFLECTION',
    title: 'On Solitude and the Art of Being Alone',
    subtitle: 'A meditation on chosen aloneness versus loneliness.',
    excerpt: 'There is a difference between loneliness and solitude. One is chosen; the other happens to you.',
    date: 'Sep 8, 2026',
    readTime: '6 min',
    image: 'photo-1499209974431-9dddcece7f88',
    trending: true,
    mostReadRank: 1,
  },
  {
    id: 'what-morning-teaches',
    category: 'LIFE',
    title: 'What the Morning Teaches Us',
    subtitle: 'On the discipline and grace of early hours.',
    excerpt: 'I have started waking before the city does. There is something almost sacred in those first pale hours.',
    date: 'Aug 26, 2026',
    readTime: '4 min',
    image: 'photo-1464822759023-fed622ff2c3b',
    trending: true,
    mostReadRank: 2,
  },
  {
    id: 'cities-i-wont-forget',
    category: 'STORIES',
    title: 'Cities I Will Never Forget',
    subtitle: 'The streets that changed the way I see the world.',
    excerpt: 'A city changes you slowly, imperceptibly. You only notice when you have left it.',
    date: 'Sep 2, 2026',
    readTime: '5 min',
    image: 'photo-1480714378408-67cf0d13bc1b',
    trending: true,
    mostReadRank: 3,
  },
];

export const JOURNAL_ARTICLES: Article[] = [
  {
    id: 'art-of-being-alone',
    category: 'REFLECTION',
    title: 'On Solitude and the Art of Being Alone',
    subtitle: 'A meditation on chosen aloneness versus the loneliness that happens to you.',
    excerpt: 'There is a difference between loneliness and solitude. One is chosen; the other happens to you. I have been practicing the distinction.',
    date: 'Sep 8, 2026',
    readTime: '6 min read',
    image: 'photo-1499209974431-9dddcece7f88',
    mostReadRank: 1,
    body: [
      'There is a difference between loneliness and solitude. One is chosen; the other happens to you. I have been practicing the distinction.',
      'In solitude, you are the company you keep. This is either terrifying or liberating, depending on what you find when you sit still long enough.',
      'I used to fill every silence. Music in the kitchen, podcasts on the walk, the television murmuring in the background just to have another voice in the room. I called it productivity. It was avoidance.',
      'The practice of being alone begins with small things. A meal eaten without a screen. A walk without earphones. A full Sunday with no plans. The withdrawal is real at first — a restlessness, a reach for the phone.',
      'But something happens on the other side of that restlessness. A settling. The noise inside quiets because there is no external noise to compete with. Thoughts arrive in their proper order.',
      'This is not a manifesto for isolation. We need each other; solitude without society becomes something darker. But the capacity to be alone — truly, comfortably alone — is the foundation of meaningful connection. You have to know yourself before you can offer yourself to someone else.',
    ],
  },
  {
    id: 'cities-i-wont-forget',
    category: 'STORIES',
    title: 'Cities I Will Never Forget',
    subtitle: 'The streets that changed the way I see the world.',
    excerpt: 'A city changes you slowly, imperceptibly. You only notice when you have left it — when you carry a piece of its light inside you without knowing how it got there.',
    date: 'Sep 2, 2026',
    readTime: '5 min read',
    image: 'photo-1480714378408-67cf0d13bc1b',
    mostReadRank: 3,
    body: [
      'A city changes you slowly, imperceptibly. You only notice when you have left it — when you carry a piece of its light inside you without knowing how it got there.',
      'Lisbon taught me that melancholy and beauty are not opposites. Its fado clubs, its faded azulejo tiles, its hills that exhaust you and then reward you with the entire Atlantic — that city understands the pleasure of longing.',
      'Tokyo taught me that intensity and calm can coexist. I have never felt more overwhelmed and more peaceful simultaneously. The city runs on invisible rules, a choreography of consideration that I was only beginning to understand as I left.',
      'Every city I return to is a different city. The place does not change — I do.',
    ],
  },
  {
    id: 'what-morning-teaches',
    category: 'LIFE',
    title: 'What the Morning Teaches Us',
    subtitle: 'On the discipline and grace of early hours.',
    excerpt: 'I have started waking before the city does. There is something almost sacred in those first pale hours — the world still undecided, still soft at the edges.',
    date: 'Aug 26, 2026',
    readTime: '4 min read',
    image: 'photo-1464822759023-fed622ff2c3b',
    mostReadRank: 2,
    body: [
      'I have started waking before the city does. There is something almost sacred in those first pale hours — the world still undecided, still soft at the edges.',
      'The morning has a particular quality of attention. It has not yet accumulated the weight of the day. You meet it clean.',
      'I make coffee the long way now. The ritual is the point — the grinding, the blooming, the slow pour. It teaches me that not everything worth having should be made faster.',
      'These morning hours have become the best hours. Not because anything extraordinary happens in them, but because nothing does. The world is quiet. I can hear myself think.',
    ],
  },
  {
    id: 'letter-to-myself',
    category: 'PERSONAL',
    title: 'A Letter to My Younger Self',
    subtitle: 'The things I wish someone had told me — and the things no one could have.',
    excerpt: 'If I could go back, I would tell her to take up more space. To stop apologizing for existing loudly, for having needs, for being too much.',
    date: 'Aug 19, 2026',
    readTime: '7 min read',
    image: 'photo-1455390582262-044cdead277a',
    mostReadRank: 4,
    body: [
      'If I could go back, I would tell her to take up more space. To stop apologizing for existing loudly, for having needs, for being too much.',
      'I would tell her that the relationships she is afraid of ending will end on their own, and that she will survive it, and that the survival will surprise her.',
      'I would tell her to read more slowly. To not rush through books to get to the next one. The best reading happens in the margins.',
      'I would not tell her what is coming. Some things you have to feel in real time.',
    ],
  },
  {
    id: 'beauty-of-imperfect',
    category: 'REFLECTION',
    title: 'The Beauty of Imperfect Things',
    subtitle: 'What wabi-sabi taught me about letting things be as they are.',
    excerpt: 'Wabi-sabi is the Japanese art of finding beauty in imperfection. The cracked glaze, the asymmetric bowl, the linen that refuses to iron flat. I have been trying to learn it.',
    date: 'Aug 12, 2026',
    readTime: '5 min read',
    image: 'photo-1474552226712-ac0f0961a954',
    mostReadRank: 5,
    body: [
      'Wabi-sabi is the Japanese art of finding beauty in imperfection. The cracked glaze, the asymmetric bowl, the linen that refuses to iron flat. I have been trying to learn it.',
      'We live in a time of relentless optimization. Every surface can be smoothed, every edge beveled, every imperfection filtered into nonexistence. The result is a world that looks perfect and feels hollow.',
      'The crack in the cup that has been repaired with gold — kintsugi — is more beautiful than the intact cup. It holds the history of its breaking. It does not pretend.',
      'I am learning to extend this to myself. The years show on my face now. I am trying to see them the way I see patina on old brass: evidence of use, evidence of time, evidence of a life lived in contact with the world.',
    ],
  },
  {
    id: 'notes-from-journey',
    category: 'STORIES',
    title: 'Notes From a Long Journey',
    subtitle: 'On trains, patience, and the education of moving slowly.',
    excerpt: 'The road teaches you things that no book can. Most of them involve patience — specifically, your lack of it, and the quiet work of finding it.',
    date: 'Aug 5, 2026',
    readTime: '6 min read',
    image: 'photo-1488085061387-422e29b40080',
    body: [
      'The road teaches you things that no book can. Most of them involve patience — specifically, your lack of it, and the quiet work of finding it.',
      'I took a train across three countries last autumn. Thirty-one hours. No wifi for the first seventeen. I brought two books and finished one. I also spent time simply watching the landscape change through the window.',
      'There is a rhythm to long travel that our bodies remember but our minds have forgotten. A settling into the present tense. You cannot rush the journey. You can only be in it.',
      'I arrived different from how I left. Not in any dramatic way. But something had rearranged itself. That is the gift of the long way around.',
    ],
  },
  {
    id: 'verses-in-margins',
    category: 'POETRY',
    title: 'Verses Written in the Margins of Night',
    subtitle: 'Short poetry fragments on moonlight, silence, and insomnia.',
    excerpt: 'When the house falls quiet and dusk yields to midnight, words gather on the margins of notebook paper like birds on telephone wires.',
    date: 'Jul 29, 2026',
    readTime: '3 min read',
    image: 'photo-1518895949257-7621c3c786d7',
    body: [
      'When the house falls quiet and dusk yields to midnight, words gather on the margins of notebook paper like birds on telephone wires.',
      'I.',
      'The moon is a pale coin tossed into the well of evening.',
      'We wish for things we already possess,',
      'and forget to hold them.',
      'II.',
      'Memory is not a museum of frozen statues.',
      'It is a river that carries fallen leaves',
      'downstream into uncharted seas.',
      'III.',
      'To love a place is to know how the shadows fall at four o\'clock in November.',
    ],
  },
  {
    id: 'architecture-of-friendship',
    category: 'VOICES',
    title: 'The Architecture of Quiet Friendships',
    subtitle: 'How adult friendships survive distance, silence, and busy years.',
    excerpt: 'The best friendships in adulthood do not require daily maintenance. They are built on an unspoken foundation of trust that picks up without hesitation.',
    date: 'Jul 18, 2026',
    readTime: '6 min read',
    image: 'photo-1529156069898-49953e39b3ac',
    body: [
      'The best friendships in adulthood do not require daily maintenance. They are built on an unspoken foundation of trust that picks up without hesitation.',
      'In our twenties, friendship is proximity. You share apartments, bars, late-night dinners, immediate crises. In our thirties and beyond, friendship becomes intention. It requires calendar coordination and long grace periods.',
      'I have a friend in Montreal whom I talk to twice a year. When we call, there is no warmup period. We skip the pleasantries and dive straight into the deep water: what we are afraid of, what we are building, who we are becoming.',
      'This is the architecture of quiet friendship. It doesn\'t demand proof. It simply holds.',
    ],
  },
];

export const HORIZONTAL_FEATURE: Article = {
  id: 'language-of-silence',
  category: 'LIFE',
  title: 'The Language of Silence',
  subtitle: 'How learning to say nothing taught me everything about communication.',
  excerpt: 'We are trained to fill silence. A pause in a conversation triggers an almost physical discomfort — a compulsion to speak, to smooth things over, to make it stop. But silence, properly attended to, is its own kind of language.',
  date: 'Aug 28, 2026',
  readTime: '10 min read',
  image: 'photo-1502920917128-1aa500764cbd',
  body: [
    'We are trained to fill silence. A pause in a conversation triggers an almost physical discomfort — a compulsion to speak, to smooth things over, to make it stop. But silence, properly attended to, is its own kind of language.',
    'The Japanese have a concept called ma — a word that describes the meaningful pause, the space between things. In music, the notes you do not play. In architecture, the negative space. In conversation, the moment of genuine consideration before response.',
    'I have been practicing ma. It does not come naturally. My instinct is still to rush in, to fill the gap, to perform attentiveness through continuous speech. But I am learning.',
    'What I have discovered is this: when you hold silence long enough, the other person often says the more important thing. The first words are the prepared words. The silence creates space for the unrehearsed ones.',
  ],
};

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'ep-12',
    number: 'EP. 12',
    title: 'Finding Your Voice in the Noise',
    subtitle: 'Authenticity, creative courage, and the discipline of restraint.',
    description: 'In a world that rewards volume, what does it mean to speak quietly and still be heard? A deep conversation about authenticity, creative courage, and the discipline of restraint.',
    duration: '42:18',
    date: 'Sep 20, 2026',
    category: 'AUTHENTICITY',
    image: 'photo-1478737270239-2f02b77fc618',
  },
  {
    id: 'ep-11',
    number: 'EP. 11',
    title: 'The Solitude Companion',
    subtitle: 'Embracing quiet spaces in a hyper-connected era.',
    description: 'Exploring why we fear being alone with our thoughts and how cultivating intentional solitude opens up new realms of creativity and emotional peace.',
    duration: '36:45',
    date: 'Sep 10, 2026',
    category: 'SOLITUDE',
    image: 'photo-1516414447565-b14be0adf13e',
  },
  {
    id: 'ep-10',
    number: 'EP. 10',
    title: 'Creativity Under Pressure',
    subtitle: 'How constraint fuels artistic freedom.',
    description: 'Why total freedom can paralyze creative work, while self-imposed boundaries and quiet deadlines unlock our most resonant ideas.',
    duration: '48:10',
    date: 'Aug 28, 2026',
    category: 'CREATIVITY',
    image: 'photo-1455390582262-044cdead277a',
  },
  {
    id: 'ep-09',
    number: 'EP. 09',
    title: 'Travel as a Mirror',
    subtitle: 'What moving through foreign places reveals about home.',
    description: 'Reflections from three months on the road across Southern Europe — on displacement, language barriers, and finding sanctuary in unfamiliar places.',
    duration: '39:05',
    date: 'Aug 15, 2026',
    category: 'TRAVEL',
    image: 'photo-1488085061387-422e29b40080',
  },
];

export const FEATURED_PODCAST = PODCAST_EPISODES[0];
export const PODCAST_EPISODE = FEATURED_PODCAST; // backwards compatibility

export const MOST_READ_ARTICLES: Article[] = [
  JOURNAL_ARTICLES[0], // On Solitude
  JOURNAL_ARTICLES[2], // What Morning Teaches
  JOURNAL_ARTICLES[1], // Cities I Will Never Forget
  JOURNAL_ARTICLES[3], // A Letter to My Younger Self
  JOURNAL_ARTICLES[4], // The Beauty of Imperfect Things
];

export const ALL_ARTICLES: Article[] = [FEATURED_ARTICLE, ...JOURNAL_ARTICLES, HORIZONTAL_FEATURE];
