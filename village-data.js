// Village-Driven Design: 13 posts on the village map.
// Links are filled automatically from posts.json when the Medium title matches.
// If a title on Medium differs, paste the link into `url` by hand.
window.VILLAGE_POSTS = [
    { n: 1,  x: 90,  y: 90,  icon: "🗺️", place: "Localhost Village", sub: "Population: 127", layer: "Big picture",  title: "The Village Map: Reading a Village Like a Software System", topic: "Platform big picture",              date: "Oct 13", url: "", live: true },
    { n: 2,  x: 250, y: 160, icon: "🏛️", place: "Village office",   layer: "Core",         title: "The Village Office: One Record for Every Villager", topic: "Accounts, identity, single source of truth", date: "Oct 20", url: "", live: true },
    { n: 3,  x: 410, y: 90,  icon: "📒", place: "Grocer's notebook", layer: "Core",         title: "The Grocer's Notebook: Keeping Money Safe",         topic: "Wallet, ledger, double-entry",      date: "Oct 27", url: "", live: true },
    { n: 4,  x: 570, y: 160, icon: "🌾", place: "The mill",          layer: "Core",         title: "One Mill, Five Villages",                           topic: "Multi-tenant shared service",       date: "Nov 3",  url: "", live: true },
    { n: 5,  x: 730, y: 90,  icon: "🧳", place: "City trader",       layer: "Integration",  title: "The Trader from the City",                          topic: "Aggregator and provider contract",  date: "Nov 10", url: "", live: false },
    { n: 6,  x: 900, y: 160, icon: "📜", place: "Old master",        layer: "Integration",  title: "The Old Master's Secret Recipe",                    topic: "Undocumented provider API",         date: "Nov 17", url: "", live: false },
    { n: 7,  x: 870, y: 290, icon: "🎒", place: "The sack",          layer: "Reliability",  title: "The Same Sack Came Twice",                          topic: "Retry and idempotency",             date: "Nov 24", url: "", live: false },
    { n: 8,  x: 710, y: 350, icon: "📮", place: "Postman",           layer: "Reliability",  title: "The Postman Knocks Twice",                          topic: "At-least-once delivery",            date: "Dec 1",  url: "", live: false },
    { n: 9,  x: 550, y: 290, icon: "🪣", place: "Village well",      layer: "Data flow",    title: "The Village Well",                                  topic: "Message broker and outbox (Kafka)", date: "Dec 8",  url: "", live: false },
    { n: 10, x: 390, y: 350, icon: "🌙", place: "The barn",          layer: "Consistency",  title: "Counting the Barn at Night",                        topic: "Reconciliation",                    date: "Dec 15", url: "", live: false },
    { n: 11, x: 230, y: 300, icon: "🪟", place: "Shop window",       layer: "Data",         title: "The Barn and the Shop Window",                      topic: "CQRS and read models",              date: "Dec 22", url: "", live: false },
    { n: 12, x: 250, y: 450, icon: "☕", place: "Village café",      layer: "Scale",        title: "Derby Day at the Village Café",                     topic: "Rate limit and backpressure",       date: "Dec 29", url: "", live: false },
    { n: 13, x: 520, y: 500, icon: "🌉", place: "The bridge",        layer: "Crisis",       title: "The Night of the Flood",                            topic: "Circuit breaker and postmortem",    date: "Jan 5",  url: "", live: false }
];
