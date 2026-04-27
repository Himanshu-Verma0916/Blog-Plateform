// Mock Users
export const MOCK_USERS = [
  { id: 1, name: 'Elena Marchetti', email: 'author@inkwell.com', role: 'author', avatar: 'https://i.pravatar.cc/150?img=47', bio: 'Senior writer covering technology and culture.' },
  { id: 2, name: 'James Whitfield', email: 'viewer@inkwell.com', role: 'viewer', avatar: 'https://i.pravatar.cc/150?img=33', bio: 'Avid reader and occasional commenter.' },
  { id: 3, name: 'Sarah Chen', email: 'admin@inkwell.com', role: 'admin', avatar: 'https://i.pravatar.cc/150?img=25', bio: 'Platform administrator and content strategist.' },
];

// Mock Posts
export const MOCK_POSTS = [
  {
    id: 1,
    title: 'The Silent Revolution in Large Language Models',
    featuredImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    body: `The landscape of artificial intelligence has shifted dramatically over the past three years. What began as a quiet academic pursuit has erupted into a full-scale technological revolution that is reshaping how we interact with information, creativity, and each other.

Large language models — the engines behind tools like ChatGPT, Claude, and Gemini — have evolved from curious research artifacts into foundational infrastructure for countless industries. Yet, paradoxically, their inner workings remain deeply mysterious even to the researchers who build them.

This opacity is not merely an inconvenience; it is arguably the defining challenge of our technological moment. We have built machines of extraordinary capability without fully understanding how they work. The implications of this situation ripple outward in ways both subtle and profound.

Consider the recent breakthroughs in reasoning and code generation. Models can now solve competition-level mathematics problems and write sophisticated software from natural language descriptions. But when researchers probe how these capabilities emerge, they encounter a kind of opacity. The networks learn statistical patterns across billions of parameters in ways that defy simple human interpretation.

This interpretability gap has urgent practical consequences. If we cannot understand why a model produces a given output, we cannot reliably predict when it will fail. We cannot audit its decisions for bias or error. We cannot meaningfully align it with human values in any deep sense.

Yet the pace of deployment continues to accelerate. The economic incentives are overwhelming. Companies that adopt AI tools gain productivity advantages that their competitors cannot easily ignore. This creates a kind of race dynamic where caution loses to speed.

The researchers working on interpretability and alignment are well aware of this pressure. Their work — painstaking, often unglamorous — involves building new conceptual tools to peer inside these systems. Progress is real but slow relative to the pace of model development.

What the next decade holds remains genuinely uncertain. The revolution is underway. Its ultimate destination is not yet written.`,
    summary: 'Large language models have evolved from academic curiosities into foundational infrastructure reshaping industries worldwide. Despite their extraordinary capabilities in reasoning, code generation, and creative tasks, their inner workings remain opaque even to their creators. This interpretability gap poses significant challenges: without understanding why models produce given outputs, auditing for bias or reliably predicting failures becomes impossible. Yet economic pressures drive rapid deployment, creating a tension between safety research and competitive advantage. The alignment and interpretability research community works steadily but faces an uphill battle against accelerating development timelines. The revolution in AI is undeniably underway, but its destination — and whether humanity can steer it responsibly — remains an open and urgent question for technologists, policymakers, and society at large.',
    authorId: 1,
    authorName: 'Elena Marchetti',
    category: 'Technology',
    createdAt: '2025-04-10T09:00:00Z',
    updatedAt: '2025-04-10T09:00:00Z',
    published: true,
    comments: [
      { id: 1, userId: 2, userName: 'James Whitfield', avatar: 'https://i.pravatar.cc/150?img=33', body: 'Fascinating piece, Elena. The interpretability problem feels like the crux of everything right now.', createdAt: '2025-04-10T11:30:00Z' },
      { id: 2, userId: 3, userName: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=25', body: 'The analogy to other opaque systems in science is really useful here. We often deploy before we fully understand.', createdAt: '2025-04-11T08:15:00Z' },
    ],
  },
  {
    id: 2,
    title: 'Quiet Hours: A Meditation on Urban Solitude',
    featuredImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    body: `At 4:47 in the morning, the city belongs to no one and everyone simultaneously. The traffic lights cycle through their choreography for empty intersections. A lone delivery truck navigates streets that in four hours will be impassable. Steam rises from grates in the pavement, spectral and unhurried.

I have been an early riser for most of my adult life, not from virtue but from a mild and persistent insomnia that surrendered long ago to pragmatism. In the process, I discovered a city that most residents never encounter: the city before it becomes itself.

There is a particular quality to urban light in these hours. The sodium lamps cast everything in amber warmth, washing out the hard daylight distinctions between things. A fire hydrant and a parked bicycle and a pile of bundled newspapers share a kind of visual democracy. Everything matters equally in the dark.

I think about solitude often in crowded places. The paradox of urban life is that proximity to millions can intensify loneliness rather than cure it. We brush against strangers constantly without connecting. We share air and space and a kind of anonymous destiny. But genuine solitude — the quiet, self-chosen variety — requires effort in a city. You have to seek it out.

The early morning hours offer one reliable path. Another is the middle of a museum on a Tuesday afternoon, standing before a painting whose title you cannot quite read from the placard, surrounded by the careful shuffling of other solitary visitors. Another is the last car on a late-night subway, when the carriage empties at each stop until you are alone with the rhythmic noise of the tracks.

These pockets of stillness matter. They are where thoughts reassemble themselves from the fragments that accumulate during crowded days. They are where you can hear yourself think — that old phrase, which, examined closely, describes something genuinely strange: the experience of witnessing your own mind in the act of working.

The city will wake soon. The amber light is already beginning to compete with the grey edge of morning. My coffee has gone lukewarm. Time to walk.`,
    summary: 'Urban solitude is a paradox: millions of people live in proximity yet genuine connection remains elusive, and true quiet must be actively sought. The author finds this stillness in early morning hours, when empty streets and amber lamplight create a democratic landscape stripped of daylight hierarchies. Museums on quiet weekday afternoons and last subway cars offer similar refuges. These moments of chosen solitude serve a vital function — they allow the scattered fragments of busy days to reassemble into coherent thought. The piece meditates on the strangeness of self-awareness itself, the odd experience of witnessing your own mind at work, and argues that protecting these pockets of stillness is an act of psychological necessity in an age of relentless stimulation and social density.',
    authorId: 1,
    authorName: 'Elena Marchetti',
    category: 'Essays',
    createdAt: '2025-03-28T07:30:00Z',
    updatedAt: '2025-03-28T07:30:00Z',
    published: true,
    comments: [
      { id: 3, userId: 2, userName: 'James Whitfield', avatar: 'https://i.pravatar.cc/150?img=33', body: 'This captures something I\'ve felt but never quite articulated. Beautiful writing.', createdAt: '2025-03-29T10:00:00Z' },
    ],
  },
  {
    id: 3,
    title: 'The Economics of Open Source: Who Really Pays?',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    body: `Every time a startup spins up a web server running Linux, processes payments through Stripe's API, or deploys a machine learning model using PyTorch, it benefits from millions of hours of unpaid labor. The open source software ecosystem underpins virtually all of modern technology, yet the economics of how it is sustained — or fails to be sustained — are poorly understood by most of the people who depend on it.

The standard narrative goes something like this: passionate developers contribute code because they believe in the collaborative ideal, large companies donate back to projects they rely on, and everything more or less balances out. This narrative has always been partly mythology, but recent years have stretched it to the breaking point.

The Log4j vulnerability in late 2021 was a clarifying moment. A critical security flaw in a widely used Java logging library — maintained by a handful of volunteers in their spare time — sat in the codebases of thousands of major corporations for years. When it was discovered, the volunteer maintainers found themselves suddenly famous and overwhelmed, fielding requests from trillion-dollar companies demanding immediate patches. The companies had built their empires partly on this foundation. Most had never contributed a dollar or a line of code.

This is the fundamental structural problem: the value extracted from open source is diffuse and flows to many parties, but the cost of maintaining it concentrates on a small number of individuals. The economics of public goods problems apply with particular force to software, because code can be copied at zero marginal cost. There is no scarcity mechanism to generate prices that would fund maintenance.

Various models have emerged to address this. Dual licensing — offering a free community edition alongside a paid enterprise version — has worked for some projects. Open core models, where the base is free but premium features cost money, have similar dynamics. Foundations and grants provide another path, though funding is perpetually competitive and uncertain.

None of these solutions scale to the full scope of the problem. Most open source software will never attract enough commercial interest to support a business model. It will be maintained by people who find the work intrinsically interesting, until they burn out or move on.

The honest reckoning is this: we have built an extraordinarily complex and valuable technological ecosystem on a foundation of volunteerism and goodwill. That foundation is not stable. The question is whether we will address its fragility before the next Log4j, or after.`,
    summary: 'The open source software ecosystem powers virtually all modern technology, yet it rests on an economically fragile foundation of volunteer labor. The 2021 Log4j vulnerability exposed this structural problem starkly: a handful of unpaid maintainers found themselves responsible for patching trillion-dollar companies that had built on their work without contributing. The core issue is a classic public goods problem — value extraction is diffuse across many beneficiaries while maintenance costs concentrate on few individuals. Attempted solutions including dual licensing, open core models, and foundation grants each address only partial cases and cannot scale to the full ecosystem. The honest conclusion is that an extraordinarily valuable technological civilization has been constructed on volunteerism and goodwill, foundations that are inherently unstable. The question facing the industry is whether structural reforms will come proactively or only in the aftermath of the next major crisis.',
    authorId: 1,
    authorName: 'Elena Marchetti',
    category: 'Technology',
    createdAt: '2025-03-15T14:00:00Z',
    updatedAt: '2025-03-15T14:00:00Z',
    published: true,
    comments: [],
  },
  {
    id: 4,
    title: 'Draft: Notes on Slow Travel',
    featuredImage: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80',
    body: `There is a particular kind of exhaustion that comes from traveling too quickly. Not physical tiredness — that passes with rest — but a subtler depletion, a sense that you have moved through spaces without truly inhabiting them. I have felt this after ambitious itineraries, after ticking off landmarks at a pace more suited to cataloguing than experiencing.

Slow travel is partly a corrective to this tendency and partly something more fundamental: a different theory of what travel is for. If the purpose is to accumulate experiences efficiently, then faster is better. If the purpose is to genuinely encounter a place and its people, slower is almost always superior.

This is not a new idea. Generations of travelers have made the same observation. But it bears repeating, because the contemporary infrastructure of travel — cheap flights, review aggregators, algorithmic recommendations — is designed around speed and efficiency rather than depth.

The most vivid travel memories I carry are rarely from famous sites. They are from an accidental detour down an unmarked road, from a three-hour conversation with a stranger over coffee, from spending a rainy afternoon in a local market with no particular agenda. These things require time and aimlessness, both of which are hard to schedule.`,
    summary: 'This draft explores the concept of slow travel as a philosophical corrective to the modern tendency toward efficient but shallow tourism. The author distinguishes between accumulating experiences rapidly and genuinely inhabiting a place, arguing that the most meaningful travel memories emerge from unscheduled encounters: accidental detours, extended conversations, and aimless afternoons in local spaces. Contemporary travel infrastructure optimizes for speed and efficiency, working against the depth that makes travel transformative. The piece ultimately proposes a different theory of travel\'s purpose: not the collection of landmarks but genuine encounter with place and people, which requires the seemingly inefficient gifts of time and aimlessness.',
    authorId: 1,
    authorName: 'Elena Marchetti',
    category: 'Travel',
    createdAt: '2025-04-02T16:00:00Z',
    updatedAt: '2025-04-02T16:00:00Z',
    published: false,
    comments: [],
  },
];

export const CATEGORIES = ['Technology', 'Essays', 'Travel', 'Culture', 'Science', 'Politics'];

export const ROLES = {
  AUTHOR: 'author',
  VIEWER: 'viewer',
  ADMIN: 'admin',
};

export const ROLE_PERMISSIONS = {
  author: { canCreate: true, canEditOwn: true, canEditAll: false, canViewComments: true, canComment: true, canMonitor: false },
  viewer: { canCreate: false, canEditOwn: false, canEditAll: false, canViewComments: false, canComment: true, canMonitor: false },
  admin: { canCreate: true, canEditOwn: true, canEditAll: true, canViewComments: true, canComment: true, canMonitor: true },
};
