//undraw data list 
//TODO:分类导入素材list
const undrawdata = [
    "app-installation",
    "appreciation",
    "around-the-world",
    "art",
    "art-lover",
    "artificial-intelligence",
    "artist",
    "astronaut",
    "at-work",
    "authentication",
    "autumn",
    "awards",
    "baby",
    "back-in-the-day",
    "back-to-school",
    "balloons",
    "barber",
    "basketball",
    "be-the-hero",
    "beach",
    "beer-celebration",
    "before-dawn",
    "begin-chat",
    "bibliophile",
    "birthday-cake",
    "bitcoin",
    "bitcoin-p2p",
    "blank-canvas",
    "blog-post",
    "blogging",
    "book-lover",
    "booking",
    "bookmarks",
    "brainstorming",
    "broadcast",
    "browser-stats",
    "buddies",
    "buffer",
    "bug-fixing",
    "building",
    "building-blocks",
    "bus-stop",
    "business-deal",
    "business-plan",
    "businessman",
    "businesswoman",
    "by-my-car",
    "calculator",
    "calendar",
    "calling",
    "campfire",
    "camping",
    "cancel",
    "candidate",
    "career-progress",
    "cautious-dog",
    "celebration",
    "charts",
    "chat",
    "chatting",
    "checking-boxes",
    "checklist",
    "chef",
    "children",
    "chilling",
    "choice",
    "choose",
    "christmas-stocking",
    "christmas-tree",
    "circles",
    "city-driver",
    "city-girl",
    "cloud-hosting",
    "cloud-sync",
    "co-workers",
    "co-working",
    "code-typing",
    "coding",
    "coffee-break",
    "collaboration",
    "collecting",
    "collection",
    "community",
    "completed",
    "compose-music",
    "conference",
    "conference-speaker",
    "confirmation",
    "confirmed",
    "connected",
    "connected-world",
    "connecting-teams",
    "contact-us",
    "container-ship",
    "contemplating",
    "content",
    "content-creator",
    "contrast",
    "control-panel",
    "conversation",
    "convert",
    "country-side",
    "couple",
    "create",
    "creation-process",
    "creative-team",
    "creative-thinking",
    "creative-woman",
    "creativity",
    "credit-card",
    "credit-card-payment",
    "credit-card-payments",
    "crypto-flowers",
    "customer-survey",
    "dark-alley",
    "dark-analytics",
    "dashboard",
    "data",
    "data-points",
    "data-report",
    "data-trends",
    "deliveries",
    "delivery",
    "departing",
    "depi",
    "design-community",
    "design-process",
    "design-thinking",
    "design-tools",
    "designer",
    "designer-girl",
    "designer-life",
    "destination",
    "developer-activity",
    "development",
    "devices",
    "digital-nomad",
    "directions",
    "discount",
    "doctor",
    "doctors",
    "documents",
    "dog-walking",
    "doll-play",
    "domain-names",
    "done",
    "download",
    "dreamer",
    "drone-delivery",
    "drone-race",
    "dua-lipa",
    "easter-egg-hunt",
    "eating-together",
    "electric-car",
    "elements",
    "email-campaign",
    "email-capture",
    "emails",
    "empty",
    "envelope",
    "environment",
    "ether",
    "ethereum",
    "events",
    "everyday-design",
    "exams",
    "experts",
    "exploring",
    "fall-is-coming",
    "fans",
    "fashion-blogging",
    "fast-car",
    "fast-loading",
    "fatherhood",
    "features-overview",
    "feeling-blue",
    "festivities",
    "file-bundle",
    "file-searching",
    "files-sent",
    "filing-system",
    "filter",
    "finance",
    "financial-data",
    "fingerprint",
    "finish-line",
    "fireworks",
    "firmware",
    "fish-bowl",
    "fishing",
    "fitness-tracker",
    "floating",
    "focus",
    "folder",
    "follow-me-drone",
    "followers",
    "following",
    "for-sale",
    "forever",
    "forgot-password",
    "freelancer",
    "friendship",
    "frozen-figure",
    "game-day",
    "gaming",
    "gardening",
    "gdpr",
    "getting-coffee",
    "gift",
    "gift-card",
    "gifts",
    "girls-just-wanna-have-fun",
    "goal",
    "going-up",
    "golden-gate-bridge",
    "good-doggy",
    "grades",
    "graduation",
    "grand-slam",
    "grandma",
    "group-chat",
    "group-selfie",
    "growing",
    "growth-analytics",
    "hamburger",
    "hang-out",
    "happy-2019",
    "happy-birthday",
    "happy-women-day",
    "having-fun",
    "healthy-habit",
    "heartbroken",
    "hello",
    "high-five",
    "hiking",
    "hire",
    "hiring",
    "home-run",
    "horror-movie",
    "house-searching",
    "houses",
    "i-can-fly",
    "image-folder",
    "image-post",
    "image-upload",
    "images",
    "in-love",
    "in-progress",
    "in-sync",
    "in-the-office",
    "in-the-pool",
    "in-thought",
    "inbox-cleanup",
    "influencer",
    "instant-support",
    "instruction-manual",
    "interaction-design",
    "internet-on-the-go",
    "interview",
    "into-the-night",
    "investing",
    "invite",
    "japan",
    "jason-mask",
    "java-script-frameworks",
    "job-hunt",
    "jogging",
    "journey",
    "joyride",
    "judge",
    "knowledge",
    "laravel-and-vue",
    "late-at-night",
    "launching",
    "learning",
    "lighthouse",
    "live-collaboration",
    "loading",
    "login",
    "logistics",
    "lost",
    "love",
    "love-is-in-the-air",
    "mail",
    "mail-sent",
    "mailbox",
    "maintenance",
    "make-it-rain",
    "maker-launch",
    "makeup-artist",
    "making-art",
    "map",
    "map-dark",
    "map-light",
    "marilyn",
    "marketing",
    "may-the-force",
    "media-player",
    "medicine",
    "meditating",
    "meditation",
    "meeting",
    "memory-storage",
    "message-sent",
    "messages",
    "messaging",
    "messaging-fun",
    "messenger",
    "metrics",
    "millennial-girl",
    "mind-map",
    "mindfulness",
    "mint-tea",
    "missed-chances",
    "mission-impossible",
    "mobile",
    "mobile-apps",
    "mobile-browsers",
    "mobile-life",
    "mobile-marketing",
    "mobile-payments",
    "mobile-testing",
    "modern-life",
    "modern-woman",
    "moment-to-remember",
    "monitor",
    "more-music",
    "morning-essentials",
    "motherhood",
    "movie-night",
    "moving-forward",
    "multitasking",
    "music",
    "my-password",
    "navigation",
    "nerd",
    "new-message",
    "news",
    "newsletter",
    "night-calls",
    "ninja",
    "no-data",
    "not-found",
    "note-list",
    "notebook",
    "notes",
    "notify",
    "off-road",
    "old-day",
    "on-the-office",
    "on-the-way",
    "onboarding",
    "online",
    "online-friends",
    "online-page",
    "online-shopping",
    "online-wishes",
    "online-world",
    "open-source",
    "opened",
    "operating-system",
    "order-confirmed",
    "ordinary-day",
    "organize-photos",
    "organize-resume",
    "organizing-projects",
    "outer-space",
    "page-not-found",
    "pair-programming",
    "palette",
    "passing-by",
    "payments",
    "pedestrian-crossing",
    "pen-tool",
    "people-search",
    "personal-data",
    "personal-notes",
    "personal-settings",
    "personal-site",
    "personal-trainer",
    "personalization",
    "photo",
    "photo-sharing",
    "photocopy",
    "photos",
    "pie-chart",
    "pilates",
    "pizza-sharing",
    "plain-credit-card",
    "playful-cat",
    "podcast",
    "podcast-audience",
    "portfolio",
    "post",
    "post-online",
    "posting-photo",
    "posts",
    "powerful",
    "preferences",
    "presentation",
    "press-play",
    "printing-invoices",
    "problem-solving",
    "processing",
    "product-hunt",
    "product-teardown",
    "product-tour",
    "profile",
    "profile-data",
    "profile-pic",
    "programmer",
    "programming",
    "projections",
    "prototyping-process",
    "qa-engineers",
    "questions",
    "queue",
    "quitting-time",
    "react",
    "reading-list",
    "real-time-sync",
    "recording",
    "refreshing",
    "relaxation",
    "relaxing-at-home",
    "report",
    "responsive",
    "resume",
    "resume-folder",
    "revenue",
    "ride-a-bicycle",
    "rising",
    "robotics",
    "romantic-getaway",
    "running-wild",
    "safe",
    "santa-claus",
    "savings",
    "schedule",
    "science",
    "scooter",
    "scrum-board",
    "sculpting",
    "search",
    "search-engines",
    "secure-data",
    "secure-server",
    "security",
    "security-on",
    "segment",
    "segmentation",
    "select",
    "selfie",
    "selfie-time",
    "server",
    "server-down",
    "server-status",
    "setup",
    "setup-analytics",
    "setup-wizard",
    "shopping",
    "site-stats",
    "skateboarding",
    "sleep-analysis",
    "smart-home",
    "smiley-face",
    "snowman",
    "social-dashboard",
    "social-growth",
    "social-ideas",
    "social-life",
    "social-media",
    "social-networking",
    "social-share",
    "social-strategy",
    "social-tree",
    "social-update",
    "software-engineer",
    "specs",
    "speech-to-text",
    "spreadsheets",
    "stability-ball",
    "starman",
    "startled",
    "startup-life",
    "static-assets",
    "statistics",
    "status-update",
    "staying-in",
    "step-to-the-sun",
    "street-food",
    "stripe-payments",
    "studying",
    "subscriber",
    "subway",
    "successful-purchase",
    "sunny-day",
    "super-thank-you",
    "super-woman",
    "superhero",
    "surfer",
    "swipe-profiles",
    "sync",
    "synchronize",
    "tabs",
    "taken",
    "taking-notes",
    "target",
    "task",
    "tasting",
    "teacher",
    "teaching",
    "team",
    "team-page",
    "team-spirit",
    "team-work",
    "teddy-bear",
    "texting",
    "thoughts",
    "through-the-desert",
    "throw-down",
    "time-management",
    "timeline",
    "to-do",
    "to-do-list",
    "to-the-stars",
    "together",
    "toy-car",
    "track-and-field",
    "transfer-files",
    "travel-booking",
    "travelers",
    "traveling",
    "treasure",
    "trip",
    "true-friends",
    "tweetstorm",
    "typewriter",
    "typing",
    "unboxing",
    "under-construction",
    "update",
    "upgrade",
    "upload",
    "upload-image",
    "uploading",
    "upvote",
    "usability-testing",
    "user-flow",
    "vault",
    "vehicle-sale",
    "version-control",
    "video-call",
    "videographer",
    "virtual-reality",
    "visual-data",
    "voice-control",
    "vr-chat",
    "walk-in-the-city",
    "wall-post",
    "wallet",
    "warning",
    "weather",
    "weather-app",
    "web-devices",
    "website-setup",
    "wedding",
    "welcome",
    "wind-turbine",
    "window-shopping",
    "windows",
    "winners",
    "winter-designer",
    "winter-olympics",
    "wireframing",
    "wishes",
    "wishlist",
    "witch",
    "woman",
    "women-day",
    "word-of-mouth",
    "wordpress",
    "work-chat",
    "work-time",
    "working",
    "working-late",
    "working-remotely",
    "workout",
    "world",
    "xmas-surprise",
    "yacht",
    "young-and-happy",
    "youtube-tutorial",
];

export default undrawdata;