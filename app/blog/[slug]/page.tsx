import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterWrapper } from "../../../components/ChapterWrapper";

// Complete blog posts data with full content
const blogPosts = [
  {
    slug: "national-digital-corps-not-another-nysc-scheme",
    title: "Nigeria Doesn't Need Another NYSC Scheme. It Needs a National Digital Corps.",
    excerpt: "The new digital tech curriculum was outdated before it finished printing. If Nigeria is serious about competing on AI, it needs a standing national agency for digital education and certification — not a review every few years while the technology moves every few months.",
    author: "Forge Team",
    date: "September 18, 2026",
    category: "Education Policy",
    readTime: "10 min read",
    featured: true,
    image: "/images/blog/national-digital-corps.jpg",
    content: `<p>Let's start with the good news, because there is some.</p>

<p>For the 2026/2027 academic session, the Federal Ministry of Education's "Lighter Load, Sharper Skills" curriculum reform made Digital Technologies a compulsory subject for every Nigerian secondary school student — arts, sciences, commercial, vocational, all of them. The scheme of work under it covers programming in Python, JavaScript, and HTML/CSS, data science basics, artificial intelligence, robotics, and digital entrepreneurship.</p>

<p>A little over a year ago, on this same blog, we celebrated the shift from "ICT" to "Digital Technology" as the moment Nigerian education stopped teaching Microsoft Word and started teaching how the internet actually works. We meant it. We still do.</p>

<p>But something happened between that celebration and today that nobody accounted for in the scheme of work: OpenAI released GPT-6 Astra.</p>

<h2>The Curriculum vs. The Calendar</h2>

<p>On September 3rd, 2026, OpenAI rolled out GPT-6 Astra — a model it calls state-of-the-art on computer use, software engineering, cybersecurity, and professional work. Sam Altman told CNBC it represents "a new capability level." Parts of the industry are openly asking whether it clears the bar for AGI.</p>

<p>Sit with the timing. A national curriculum built around "AI" as a topic was finalized, printed, and distributed to schools for a session that started the same month a frontier AI model crossed into territory the industry itself isn't sure how to name yet.</p>

<p>This is not a criticism of the people who wrote the scheme of work. It's a criticism of trying to pin down a moving target with a fixed document.</p>

<h2>What the Scheme of Work Gets Right</h2>

<p>Give credit where it's due. Compared to what came before it, this is a serious document:</p>

<ul>
<li>Programming languages students can actually build things with — Python, JavaScript, HTML/CSS</li>
<li>Data science basics, not just "what is data"</li>
<li>Robotics, moving beyond theory into hands-on building</li>
<li>Digital entrepreneurship, connecting skill to income</li>
<li>AI, named explicitly as a topic, for the first time in a compulsory Nigerian secondary curriculum</li>
</ul>

<p>That last one matters. A year ago, "AI" barely appeared in a Nigerian scheme of work. Now every senior secondary student in the country is supposed to encounter it. That's real progress, and it deserves to be said plainly before we get to the hard part.</p>

<h2>What It Still Doesn't Cover</h2>

<p>Here's where it falls short — not because anyone was lazy, but because no printed document can keep pace with what's actually happening in AI right now.</p>

<h3>1. "AI Awareness" Is Not the Same Skill As Building With AI</h3>

<p>Most curricula, this one included, treat AI the way older ICT syllabuses treated the internet: as a thing to define, explain, and use responsibly. Definitions matter. But the students competing for opportunity in 2027 and beyond won't be judged on whether they can define a large language model — they'll be judged on whether they can direct one to build something, debug something, research something, ship something. That's a different skill, and it has to be taught by doing, inside the subject, not appended as an ethics footnote.</p>

<h3>2. The Exam Still Rewards the Wrong Thing</h3>

<p>You can put "AI" and "robotics" in a scheme of work and still test it the way WAEC has always tested ICT — definitions, diagrams, multiple choice. If the assessment doesn't change, the classroom won't either. Teachers teach to the exam. That's not a uniquely Nigerian problem, but it's the one lever that decides whether this reform lives in the classroom or only on paper.</p>

<h3>3. Nobody Owns the Update Cycle</h3>

<p>NERDC reviews curricula on a multi-year cycle, as it should — that's how you keep a national syllabus coherent instead of chaotic. But AI capability isn't moving on a multi-year cycle. It moved from GPT-5.5 to GPT-6 Astra inside a single academic session. A subject like Digital Technologies needs something no other subject has ever needed: a standing body whose only job is watching that gap and updating the syllabus, the teacher training, and the certification continuously — not waiting for the next scheduled review.</p>

<h2>Which Brings Us Back to NYSC</h2>

<p>This is not a coincidence. Nigeria is already having a version of this conversation — just not in the place it needs to happen.</p>

<p>The NYSC digitisation plan moving through 2026–2028 includes a ₦2 billion Innovation Fund, a Unified Digital Command and Service Platform, and a partnership with NITDA to roll out a National Digital Literacy Framework for corps members. Good pieces. Real money. Real intent.</p>

<p>But look at where they sit: NITDA owns one piece. NYSC owns another. NERDC owns the curriculum. States own implementation. Nobody owns the whole pipeline — from the JSS1 student encountering "Digital Technologies" for the first time, through the SS student learning Python, through the NYSC corps member getting a literacy certificate, to the graduate trying to convert any of it into income.</p>

<p>That's the gap a National Digital Corps would close. Not a rebrand of NYSC. Not another twelve-month scheme with a launch ceremony and a hashtag. A standing national agency — the way NAFDAC owns food and drug regulation, the way JAMB owns university entry — whose entire mandate is digital education and certification, accountable for keeping the curriculum, the teacher training, and the credentials current against whatever OpenAI, Google, or Anthropic ship next.</p>

<p>Nigeria has had the pieces of this conversation for years, scattered across ministries and press releases. It's time it became one conversation, with one agency answerable for the outcome.</p>

<h2>What We'd Ask For</h2>

<p>Three things, in order:</p>

<ul>
<li><strong>A standing digital curriculum body</strong> — not a review committee that meets every few years, but a unit inside government whose job is permanent: track what AI can do, update what schools teach, every session if it has to.</li>
<li><strong>Assessment that matches the subject</strong> — a Digital Technologies exam that asks a student to build and direct, not just define and recall.</li>
<li><strong>One accountable pipeline</strong> — from secondary school through NYSC to certification, owned by one body Nigerians can actually hold to a number, not five agencies each claiming a slice of the credit.</li>
</ul>

<p>We're not waiting for that agency to exist before we act. Through TechUp, we're already in secondary school classrooms teaching students to build with technology, not just study it. Through LaunchPad, we're funding the ideas that come out of those classrooms before their authors ever reach NYSC age.</p>

<p>But a handful of programs in Lagos schools isn't a national pipeline. It's proof the pipeline is buildable. The rest is a policy choice — and a curriculum, however well-intentioned, will always be a year behind the technology it's trying to teach until someone is paid, full-time, to keep it from falling behind.</p>`,
  },
  {
    slug: "what-nigerian-youth-should-listen-for-2027",
    title: "2027 Is Coming. Here's What Nigerian Youth Should Actually Be Listening For.",
    excerpt: "Politicians show up every election season promising to 'empower' young people. Before 2027, here's the difference between noise and an actual plan — and the five questions that tell them apart.",
    author: "Forge Team",
    date: "September 20, 2026",
    category: "Education Policy",
    readTime: "8 min read",
    featured: false,
    image: "/images/blog/2027-youth-digital-future.jpg",
    content: `<p>Election season has a sound. You'll hear it soon if you haven't already: "youth empowerment." "Digital economy." "Skills for the future." Every candidate will say a version of it, usually standing next to a banner, usually followed by an announcement of cash, kits, or a one-day training with a certificate that opens exactly zero doors.</p>

<p>We're not writing this to tell you who to vote for. We're writing it because ahead of 2027, young Nigerians are about to be talked <em>at</em> about digital skills more than at any point in this country's history — and most of it will be noise dressed up as a plan.</p>

<p>Here's how to tell the difference.</p>

<h2>The Promises You've Already Heard</h2>

<p>Nigeria doesn't lack digital skills announcements. In the last two years alone: a target to train 50,000 youth in digital competencies. A federal partnership with Ericsson for a four-month innovation hackathon reaching another 50,000 young people. The 3 Million Technical Talent programme (3MTT), promising three million trained tech professionals by 2027. NITDA's own strategic pillars toward a $100 billion digital economy.</p>

<p>Big numbers. Real budgets, in some cases. And a legitimate question underneath all of them that almost nobody in government has had to answer publicly: what happened to the last cohort?</p>

<p>As one Oyo State lawmaker put it ahead of 2027, politicians should stop sharing money and start investing in youth digital future instead. He's right — but that line only means something if young people know exactly what to ask for when a politician claims to be doing it.</p>

<h2>Five Things to Actually Listen For</h2>

<h3>1. A Number You Can Check Later</h3>

<p>"We trained thousands of youth" is a launch photo. "1,200 of the 3,000 we trained in 2025 are now employed or running a registered business, and here's the published report" is a program. If a politician can't tell you how many people from the <em>last</em> initiative actually converted training into income, they're describing a photo-op, not a policy.</p>

<h3>2. Who Pays for the Data and the Device</h3>

<p>You cannot build a digital skill you cannot afford to practice. A free coding bootcamp means nothing to a student without a laptop or the data to attend it online. Ask what the actual commitment is on connectivity and hardware — not "we'll partner with the private sector," which is what politicians say when there's no line item.</p>

<h3>3. A Certificate That Means Something</h3>

<p>Training without recognized certification is a badge for a wall. Ask whether the credential is tied to something that carries real weight — globally recognized, or backed by an accountable national body — or whether it's a participation certificate with a government logo on it.</p>

<h3>4. Where It Actually Starts</h3>

<p>Most digital skills policy in Nigeria targets people already out of school — NYSC corps members, "youth" defined as 18 to 35. But the students who'll be job-hunting in 2030 are in JSS2 right now. A politician serious about the next generation's digital wealth is talking about secondary school, not just post-service training. If the plan only starts after graduation, it starts too late for the people it claims to be for.</p>

<h3>5. One Name You Can Hold Accountable</h3>

<p>Ask who, specifically, is responsible if this doesn't work. Not "the Federal Government." Not "a multi-agency collaboration." A name, a ministry, a body that reports numbers publicly and can be pointed at in four years. When digital skills policy is spread across five agencies with no single owner, nobody answers for it when it quietly disappears after the election.</p>

<h2>What This Isn't</h2>

<p>This isn't an argument against cash transfers, grants, or immediate relief — young Nigerians need income now as much as they need skills for later, and pretending otherwise is its own kind of dishonesty. It's an argument against treating the two as competitors, when the politicians who are serious answer both questions instead of hiding behind the easier one.</p>

<p>It's also not cynicism for its own sake. The infrastructure for a real answer already exists in pieces — 3MTT's ambition, NITDA's strategic pillars, the NYSC digitisation plan, state-level coding programmes springing up from Kwara to Lagos. What's missing isn't announcements. It's the follow-through, and the willingness to be measured on it.</p>

<h2>Before You Nod Along Next Time</h2>

<p>The next time a candidate stands in front of a banner and promises to hand young people "the digital economy," don't just listen for the number. Listen for the report on the last number. Listen for who pays when the laptop and the data bill are the real barrier. Listen for whether the plan reaches a 14-year-old in a public school or only a 24-year-old already in Lagos.</p>

<p>And listen for one name attached to the outcome — because a promise with no owner is just a sound election season makes, and 2027 doesn't have to sound like every year before it.</p>`,
  },
  {
    slug: "iran-self-reliance-lessons-for-africa",
    title: "What Africa Can Learn From Iran's Self-Reliance: Building From Within, Not From Handouts",
    excerpt: "We're not picking sides in global politics. But there's a lesson in watching a nation build advanced technology under crushing sanctions — while Africa, with all its freedom and resources, still waits for help from abroad. The lesson isn't about missiles. It's about will.",
    content: `<p>Let me say this upfront: This is not about politics. This is not about taking sides. This is not an endorsement of any regime or ideology.</p>

<p>But there's something we need to talk about — something that should make every African leader uncomfortable.</p>

<h2>The Question That Won't Go Away</h2>

<p>How does a nation under decades of crushing sanctions — cut off from global markets, banned from international banking systems, blocked from importing technology — how does that nation develop one of the most advanced missile systems in the world?</p>

<p>While Africa, with all its freedom, all its resources, all its international partnerships, still can't manufacture a phone battery.</p>

<p>Let that sink in.</p>

<h2>What Iran Did (And Why It Matters)</h2>

<p>Iran faced a choice. When the world cut them off, they could have collapsed. They could have begged. They could have waited for sanctions to lift.</p>

<p>Instead, they built.</p>

<p>Not because they're better than us. Not because they're smarter. But because they had no choice. When you can't import, you innovate. When you can't buy, you build. When the world says "you can't," you figure out how to say "watch me."</p>

<p>They took their engineers — young people, mostly — and said: <em>"Figure it out. We don't have access to Western technology. We don't have access to Western expertise. Build it anyway."</em></p>

<p>And they did.</p>

<h2>The Tragic Irony</h2>

<p>Here's what breaks my heart about this story:</p>

<p>If Iran had channeled that same energy, that same will, that same talent into building economic solutions — into technology that solves everyday problems for people around the world — they would be one of the richest, most influential nations on earth.</p>

<p>Imagine if all that engineering brilliance had gone into:</p>

<ul>
<li>Software that makes healthcare accessible</li>
<li>Agricultural technology that feeds nations</li>
<li>Transportation systems that connect communities</li>
<li>Educational platforms that train millions</li>
<li>Financial systems that empower the unbanked</li>
</ul>

<p>They would have been unstoppable. Not through weapons, but through value creation. Not through fear, but through solutions.</p>

<p>But that's not the path they chose. And while we don't condone that choice, we can't ignore the lesson buried in it.</p>

<h2>What This Means for Africa</h2>

<p>Africa didn't fall because we were weak.</p>

<p>Read that again. We didn't fall because we lacked intelligence, or creativity, or capability.</p>

<p>Africa fell because while Europe was building guns and warships, we were building universities. While they were perfecting weapons of destruction, we were building bridges that connected people, technologies that improved lives, systems that promoted learning.</p>

<p>Our ancestors in Timbuktu had libraries when Europe was burning books. Ancient Africans built pyramids that still confound modern engineers. Pre-colonial Africa had trade systems, governance structures, and innovations that rivaled anything in the world.</p>

<p>The same blood that ran through those ancient engineers? <strong>It runs through Africa's youth today.</strong></p>

<h2>The Advantage Nobody's Using</h2>

<p>African leaders, hear me clearly:</p>

<p>You have the world's greatest advantage sitting right in front of you. <strong>Young people.</strong></p>

<p>Not just any young people — descendants of the first civilized humans on this planet. Inheritors of a legacy of innovation that predates written history.</p>

<p>And what are we doing with them?</p>

<p>We're letting them waste away in classrooms that teach nothing useful. We're watching them risk their lives crossing deserts and oceans to seek opportunity elsewhere. We're losing them to hopelessness, to "japa," to the belief that their future must be built somewhere else.</p>

<p>Meanwhile, Iran — under sanctions, isolated, vilified — took their young people and said: "You are our greatest resource. Build us a future."</p>

<p>And Africa, with freedom, with resources, with global goodwill? We're still waiting for handouts.</p>

<h2>The Path We Must Choose</h2>

<p>Here's what Iran did right that Africa must learn from:</p>

<h3>1. They Invested in Human Capacity</h3>

<p>Not loudly. Not with big announcements. Quietly, systematically, they trained engineers, scientists, technicians. They built institutions that produced capable people.</p>

<p>Africa can do this better. We can train young people not for war, but for value creation. Not for missiles, but for markets.</p>

<h3>2. They Stopped Waiting for Permission</h3>

<p>When the world said "you can't," they didn't argue. They just built.</p>

<p>African leaders, stop waiting for foreign aid. Stop waiting for Western approval. Stop waiting for permission to develop your own nations.</p>

<p>The resources you need? You have them. The talent you need? It's sitting in classrooms across this continent. The only thing missing is will.</p>

<h3>3. They Built From Within</h3>

<p>They didn't import solutions. They couldn't. So they developed homegrown expertise, homegrown technology, homegrown systems.</p>

<p>Africa must do the same. Not because we're under sanctions, but because we're tired of dependency.</p>

<h3>4. They Focused on Long-Term Capability</h3>

<p>This wasn't a 4-year project. This was generational thinking. Plant trees whose shade you'll never sit under.</p>

<p>African leaders, your legacy won't be the roads you built or the buildings you named after yourselves. Your legacy will be the human capacity you developed. The young people you empowered. The systems you put in place that outlive you.</p>

<h2>The Natural Creative Gift</h2>

<p>Africa's youth don't need to be turned into something they're not.</p>

<p>They already have what they need. The creativity. The resilience. The problem-solving ability. It's in their DNA — literally. The same blood that built the pyramids, that created universities, that innovated agricultural systems.</p>

<p>What they need is permission to use it. Training to refine it. Opportunity to prove it.</p>

<p>And leaders brave enough to invest in it.</p>

<h2>Build Quietly, Scale Loudly</h2>

<p>You want to know the real advantage?</p>

<p>Africa can do this quietly. No sanctions to fight. No global opposition. No one's watching closely enough to stop us.</p>

<p>While the world debates Africa's potential, we can just... build.</p>

<p>Train young people in digital skills. Not for certificates, but for capability.</p>

<p>Build systems that work for African realities. Not imported models, but homegrown solutions.</p>

<p>Create pathways from classroom to career to entrepreneurship. Not someday, but now.</p>

<p>And when the world finally notices? We'll be too far ahead to catch.</p>

<h2>The Choice Is Ours</h2>

<p>Iran chose missiles. They chose military might. They chose a path that, while demonstrating capability, ultimately isolated them from the prosperity they could have achieved.</p>

<p>Africa can choose differently.</p>

<p>We can take that same principle — self-reliance, homegrown solutions, investing in human capacity — and apply it to building prosperity instead of weapons.</p>

<p>We can be the generation that said: <em>"Enough waiting. Enough dependency. Enough watching our youth leave because we didn't give them a reason to stay."</em></p>

<h2>What Forge Is Doing About It</h2>

<p>This isn't just philosophy for us. It's action.</p>

<p>TechUp exists because we believe African students don't need charity — they need capability. We're not giving them fish. We're teaching them to build fishing rods, start fishing businesses, and export seafood globally.</p>

<p>LaunchPad exists because we know the next transformative African business might be in a secondary school classroom right now, waiting for someone to believe in it.</p>

<p>We're building quietly. Training young people. Developing systems. Creating pathways. Not for headlines, but for legacy.</p>

<p>And when the results become undeniable? That's when we scale loudly.</p>

<h2>To African Leaders</h2>

<p>You have a choice to make.</p>

<p>You can keep doing what hasn't worked — waiting for development partners, chasing foreign investment, sending your brightest minds abroad to build other people's nations.</p>

<p>Or you can look at what Iran did under sanctions and ask yourself: <em>"What could we do with freedom?"</em></p>

<p>The youth are ready. The talent is here. The potential is undeniable.</p>

<p>What's missing is your commitment. Your investment. Your vision.</p>

<p>Stop talking about Africa's potential. Start building Africa's capacity.</p>

<p>Because the same blood that ran through Imhotep — the African who designed the pyramids 2,000 years before anyone else built monumental architecture — that blood runs through African youth today.</p>

<p>The same blood that ran through the scholars of Timbuktu, the kingdom builders of Great Zimbabwe, the innovators of ancient Ethiopia — <strong>it's still here.</strong></p>

<p>Stop overlooking it. Start activating it.</p>

<h2>The Will to Build</h2>

<p>Iran's story isn't about missiles.</p>

<p>It's about what happens when a nation decides it will build, no matter what. When it looks at sanctions and says "challenge accepted." When it takes its young people seriously enough to invest everything in their capacity.</p>

<p>Africa doesn't need sanctions to motivate us. We've had enough external pressure. What we need is internal will.</p>

<p>The will to stop waiting. The will to start building. The will to look at our youth and see not problems to manage, but solutions waiting to be unleashed.</p>

<p><em>Iran built under pressure. Imagine what Africa can build in freedom.</em></p>

<p>The question isn't whether we can. History proves we can.</p>

<p>The question is: Will we?</p>`,
    author: "Forge Team",
    authorImage: "/images/team/forge-team.jpg",
    date: "March 15, 2026",
    category: "African Leadership",
    readTime: "12 min read",
    featured: true,
    image: "/images/blog/africa-self-reliance.jpg",
  },
  {
    slug: "launchpad-2026-announcement",
    title: "LaunchPad 2026 is Coming: ₦10 Million Up for Grabs — And We Need You",
    excerpt: "Mark your calendars! August 28th, 2026. Twenty young visionaries. Ten million naira in grants and gifts. This is bigger than anything we've done before — and we're calling on Nigeria to join us.",
    content: `<p>Omo, I still get goosebumps when I think about what we're planning.</p>

<p>If you followed what we did with LaunchPad 2025, you know we don't play. But what's coming in 2026? E go shock you.</p>

<h2>Save This Date: August 28th, 2026</h2>

<p>We're bringing together <strong>20 of the most innovative secondary school students from across Lagos State</strong> — not just one or two schools, but young minds from every corner of this city. From Epe to Ikeja, from Badagry to Ikorodu. The brightest, most daring young thinkers Lagos has to offer.</p>

<p>And we're not coming to play small.</p>

<h2>₦10,000,000 in Grants and Gifts</h2>

<p>You read that right. Ten million naira.</p>

<p>We're talking business grants, startup equipment, mentorship packages, tech resources — everything a young founder needs to turn an idea from "what if" to "watch me."</p>

<p>Last year, we gave ₦100,000 each to two brilliant young women and watched them start building their dreams. This year? We're scaling up because Nigeria's young people deserve more than crumbs. They deserve real investment.</p>

<h2>But We Can't Do This Alone</h2>

<p>Here's where you come in.</p>

<p>Whether you're a corporate organization looking for meaningful CSR impact, a government agency committed to youth development, an NGO focused on education, or an individual who believes in Nigeria's next generation — <strong>we need you</strong>.</p>

<h2>To Corporate Nigeria</h2>

<p>Your logo on a billboard is nice. But your logo on a young entrepreneur's first business card? That's legacy. That's impact you can actually see grow.</p>

<p>When you sponsor LaunchPad, you're not just writing a cheque. You're becoming part of a story. You're the reason a 15-year-old finally gets the chance to prove that their "crazy idea" wasn't crazy at all.</p>

<h2>To Government Partners</h2>

<p>We saw what happened when Ikosi-Isheri LCDA believed in us. The Chairman, Princess Samiat Bada, didn't just give us a venue — she gave us legitimacy. She showed other leaders what's possible when government backs youth innovation.</p>

<p>We're looking for more partners like that. Local governments, state ministries, education boards — if you're serious about youth empowerment, let's talk. We'll bring the students, the structure, and the passion. You bring the support and watch transformation happen.</p>

<h2>To Everyone Who Believes</h2>

<p>Maybe you can't sponsor millions. That's okay. Share this post. Tell a teacher. Nominate a student you know who has that fire in their eyes. Help us spread the word that opportunity is coming.</p>

<p>Because here's what I've learned: Nigerian young people don't lack ideas. They don't lack talent. They don't lack ambition.</p>

<p>They lack opportunity. And that's exactly what LaunchPad exists to provide.</p>

<h2>The Details</h2>

<ul>
<li><strong>Date:</strong> August 28th, 2026</li>
<li><strong>Participants:</strong> 20 students from secondary schools across Lagos State</li>
<li><strong>Total Prize Pool:</strong> ₦10,000,000 in grants, gifts, and support</li>
<li><strong>Location:</strong> To be announced (we're going bigger this time)</li>
</ul>

<h2>Ready to Be Part of History?</h2>

<p>Contact us today. Whether you want to sponsor, partner, volunteer, or just learn more — we want to hear from you.</p>

<p>Because August 28th, 2026 isn't just an event date. It's the day 20 young Nigerians start their journey from student to founder. From dreamer to builder.</p>

<p>And you could be the reason they get that chance.</p>

<p><em>Let's build the future together. Na we get am.</em></p>`,
    author: "Forge Team",
    authorImage: "/images/team/forge-team.jpg",
    date: "March 1, 2026",
    category: "Events",
    readTime: "6 min read",
    featured: false,
    image: "/images/blog/launchpad-2026.jpg",
  },
  {
    slug: "launchpad-2025-winners-story",
    title: "When Young Nigerians Dream Out Loud: The Story of LaunchPad 2025",
    excerpt: "On July 4th, 2025, something beautiful happened at Ikosi-Isheri. Two young women walked away with ₦100,000 each to chase their dreams. Here's the story of that unforgettable day.",
    content: `<p>I'm going to tell you a story. Not a corporate success story with fancy metrics and investor jargon. A real story about real young people who dared to believe they had something to offer.</p>

<h2>July 4th, 2025 — The Day Dreams Got Funding</h2>

<p>The venue was the Council Hall at Ikosi-Isheri LCDA. The Chairman herself had made it possible — even in the middle of election season, she understood that some things can't wait. Youth development can't wait.</p>

<p>Students filed in that morning with nervous energy. Some had never pitched anything in their lives. Some had never even thought of themselves as "entrepreneurs." But they all had one thing in common: an idea they believed in.</p>

<h2>The Ideas That Blew Us Away</h2>

<p>Wallahi, I wasn't prepared for what these young people brought.</p>

<p>Apps for mental health support. Solutions for food waste. Agricultural innovations. Educational tools. Business models that made the judges look at each other like, "Wait, a secondary school student thought of this?"</p>

<p>But two ideas stood out. Not because the others weren't brilliant — they were. But because these two had that special combination of passion, practicality, and pure determination.</p>

<h2>Winner: Obasi Ugonna — Organic Food Revolution</h2>

<p>Ugonna came with a simple but powerful vision: making organic food accessible to everyday Nigerians.</p>

<p>See, organic food in Nigeria has become "oyinbo people thing." Something only the wealthy can afford. But Ugonna asked a different question: What if we could grow it locally, distribute it smartly, and price it fairly?</p>

<p>Her pitch wasn't just about selling vegetables. It was about health, about sustainability, about proving that young Nigerians can build businesses that actually make society better.</p>

<p>When we handed her that ₦100,000 cheque, the look on her face — I'll never forget it. That wasn't just money. That was validation. That was "your dream matters."</p>

<h2>Winner: Rotimi Oreoluwapo — MyBuddy App</h2>

<p>Oreoluwapo's MyBuddy app tackled something every Nigerian student understands: the loneliness of academic struggle.</p>

<p>Her app connects students for peer learning, study groups, and academic support. Think of it as your study partner in your pocket — but built by someone who actually understands what Nigerian students go through.</p>

<p>What got the judges wasn't just the app concept. It was how clearly she understood her users. She wasn't building from imagination — she was building from experience. From pain she'd felt herself.</p>

<p>Another ₦100,000. Another young woman whose belief in herself just got tangible proof.</p>

<h2>The Support That Made It Possible</h2>

<p>I have to pause and give credit where it's due.</p>

<p>The LCDA Chairman, Princess Samiat Bada, didn't just give us space. She showed up. She listened to these young people pitch. She saw what we see every day — that Nigerian youth are not the problem. They're the solution we've been sleeping on.</p>

<p>This is what happens when government partners with purpose-driven organizations. Not bureaucracy. Not red tape. Just genuine collaboration for youth empowerment.</p>

<h2>What I Learned That Day</h2>

<p>Standing there, watching these students present their ideas with shaking voices but steady conviction, something hit me:</p>

<p><strong>We've been telling young Nigerians to wait their turn. To pay their dues. To let the "adults" handle things.</strong></p>

<p>But look at what happens when we just give them a platform and believe in them. Look at the innovation. The courage. The pure, unfiltered ambition.</p>

<p>We don't have a youth problem in Nigeria. We have an opportunity problem. And events like LaunchPad exist to close that gap, one young dreamer at a time.</p>

<h2>Where Are They Now?</h2>

<p>Both winners are currently developing their ideas. The seed money was just the beginning — they now have access to mentorship, resources, and a community that believes in them.</p>

<p>Ugonna is working on her supply chain. Oreoluwapo is building her user base. Both are proving that the ₦100,000 wasn't charity — it was an investment that's already paying dividends.</p>

<h2>And This Is Just The Beginning</h2>

<p>LaunchPad 2025 was our first. It won't be our last.</p>

<p>If this story moved you — if you looked at Ugonna and Oreoluwapo and thought, "I know young people like that" — then help us reach more of them.</p>

<p>Because for every student who pitched that day, there are thousands more across Nigeria with ideas just as brilliant, waiting for someone to believe in them.</p>

<p><em>That could be you. That could be your organization. That could be your legacy.</em></p>

<p>The door is open. Come through.</p>`,
    author: "Forge Team",
    authorImage: "/images/team/forge-team.jpg",
    date: "July 10, 2025",
    category: "Impact Stories",
    readTime: "8 min read",
    featured: false,
    image: "/images/blog/launchpad-2025.jpg",
  },
  {
    slug: "ict-to-digital-technology-opportunity",
    title: "From ICT to Digital Technology: The Curriculum Change Nigeria Has Been Waiting For",
    excerpt: "The Federal Government didn't just rename a subject — they opened a door. For EdTech companies, schools, and young Nigerians, this is the moment we've been preparing for.",
    content: `<p>Let me tell you what just happened in Nigerian education, because I'm not sure everyone has grasped it yet.</p>

<p>The Federal Government, through the Nigerian Educational Research and Development Council (NERDC), has officially transitioned the secondary school curriculum from "ICT" to "Digital Technology."</p>

<p>On the surface? A name change. In reality? <strong>This is everything.</strong></p>

<h2>What "ICT" Actually Meant</h2>

<p>Be honest with yourself. When you hear "ICT class" in a Nigerian secondary school, what comes to mind?</p>

<p>Microsoft Word. Microsoft Excel. Maybe PowerPoint if the school is "advanced." Typing practice. Basic computer parts. A curriculum that was written when Yahoo was still the biggest thing on the internet.</p>

<p>Students graduate knowing how to format a document but having no idea how websites are built, how apps work, how data is analyzed, or how to use technology to actually solve problems.</p>

<p>That was ICT. A subject frozen in time while the world raced ahead.</p>

<h2>What "Digital Technology" Should Mean</h2>

<p>The new curriculum isn't just a rebrand. It's a philosophical shift.</p>

<p>Digital Technology, as envisioned, includes:</p>

<ul>
<li>Computational thinking and problem-solving</li>
<li>Introduction to programming and coding concepts</li>
<li>Digital design and creativity</li>
<li>Data literacy and basic analytics</li>
<li>Cybersecurity awareness and digital citizenship</li>
<li>AI awareness and ethical technology use</li>
<li>Digital entrepreneurship fundamentals</li>
</ul>

<p>See the difference? This isn't about using technology. It's about <em>understanding</em> technology. About being creators, not just consumers.</p>

<h2>The Opportunity Nobody Is Talking About</h2>

<p>Here's what excites me most — and what I wish more EdTech founders, investors, and education stakeholders would understand:</p>

<p><strong>The government just created a mandate for digital skills education in every secondary school in Nigeria.</strong></p>

<p>Think about what that means. Schools now <em>need</em> curriculum. They need teaching resources. They need teacher training. They need practical delivery support.</p>

<p>The demand just became official. National. Unavoidable.</p>

<p>And most schools are not equipped to deliver this new curriculum on their own. They need partners. They need organizations that have been thinking about this — building for this — long before the policy arrived.</p>

<h2>Why This Is EdTech's Moment</h2>

<p>For years, Nigerian EdTech has been fighting for legitimacy. Fighting to be seen as more than a "nice-to-have." Fighting for a seat at the table of national education planning.</p>

<p>That fight just got easier.</p>

<p>The government has essentially said: "We recognize that digital skills are essential. We're changing our curriculum to reflect this. Now help us deliver it."</p>

<p>EdTech companies that can provide:</p>

<ul>
<li>Structured curriculum aligned with the new standards</li>
<li>Teacher enablement and training</li>
<li>Practical, hands-on delivery methodologies</li>
<li>Progress tracking and assessment tools</li>
<li>Scalable models that work in public and private schools</li>
</ul>

<p>...are now positioned not as disruptions to the system, but as <em>solutions</em> the system is actively looking for.</p>

<h2>This Is Why We Built TechUp</h2>

<p>I won't pretend this timing is coincidence. Forge Intellitech designed TechUp specifically for this moment — even before we knew the policy was coming.</p>

<p>We saw where education was heading. We saw the gap between what schools teach and what the economy needs. And we built a solution that doesn't just fill that gap — it creates a pathway from student to skilled professional to entrepreneur.</p>

<p>Now, with official government backing for digital technology education, we're not pitching a vision. We're offering implementation for a vision the government itself has endorsed.</p>

<h2>A Call to Action: Let's Build This Together</h2>

<p>This isn't just an opportunity for Forge. It's an opportunity for Nigeria.</p>

<p>To other EdTech founders: Let's not compete ourselves into irrelevance. Let's collaborate. Let's build an ecosystem that actually delivers on this curriculum promise.</p>

<p>To school administrators: Start planning now. Don't wait until the deadline arrives and scramble. Partner with organizations that can support your transition.</p>

<p>To government officials: Keep this momentum going. Create pathways for private sector participation. Don't let this curriculum change become another policy that dies in implementation.</p>

<p>To parents: Demand more for your children. Ask schools what their Digital Technology plan looks like. Hold them accountable to actually teaching these skills.</p>

<p>The door is open. The mandate is clear. The moment is now.</p>

<p><em>Nigeria has a chance to raise a generation of digital builders, not just digital consumers. Let's not waste it.</em></p>`,
    author: "Forge Team",
    authorImage: "/images/team/forge-team.jpg",
    date: "August 29, 2025",
    category: "Education Policy",
    readTime: "10 min read",
    featured: false,
    image: "/images/blog/curriculum-change.jpg",
  },
  {
    slug: "edtech-revolution-nigeria",
    title: "The EdTech Revolution Nigeria Needs: Why Now Is the Time to Act",
    excerpt: "Something is shifting in Nigerian education. Between policy changes, youth unemployment, and digital transformation — the conditions are perfect for EdTech to truly matter. But will we rise to the occasion?",
    content: `<p>I've been in education technology for a minute now, and I've learned to be skeptical of "revolutionary" claims. Every year, someone announces the next big thing that will "transform Nigerian education forever."</p>

<p>Most of them disappear within 18 months.</p>

<p>But right now? Something different is happening. And I want to talk about it honestly — without the hype, without the investment pitch, without the buzzwords.</p>

<h2>The Conditions Are Aligning</h2>

<p>Multiple forces are converging in a way I haven't seen before:</p>

<p><strong>Policy is moving.</strong> The ICT to Digital Technology curriculum shift isn't just semantics. It's a signal that government recognizes the skills gap and is trying to address it.</p>

<p><strong>Youth unemployment is impossible to ignore.</strong> With millions of graduates entering a job market that can't absorb them, the conversation is shifting from "get a degree" to "get skills that actually matter."</p>

<p><strong>The digital economy is real.</strong> Remote work, freelancing, digital entrepreneurship — these aren't trends anymore. They're established pathways that Nigerians are already using to build livelihoods.</p>

<p><strong>Infrastructure is improving.</strong> Not perfect, but better. More Nigerians have smartphones. Data is more affordable. The basics for digital learning are increasingly in place.</p>

<h2>What EdTech Has Been Getting Wrong</h2>

<p>Before we get excited, let's be honest about our failures.</p>

<p>Nigerian EdTech has often prioritized:</p>

<ul>
<li>Urban, private school markets over public school access</li>
<li>Exam preparation over genuine skill-building</li>
<li>Flashy apps over sustainable delivery models</li>
<li>Investor presentations over actual student outcomes</li>
<li>Individual consumers over institutional partnerships</li>
</ul>

<p>We've built products that work great for the 5% who already have advantages, and wondered why we can't scale.</p>

<p>The opportunity in front of us requires a different approach.</p>

<h2>What Actually Needs to Happen</h2>

<p>For EdTech to truly matter in Nigeria — not as a niche industry, but as a force for national development — we need to rethink almost everything:</p>

<h3>1. School Integration, Not Replacement</h3>

<p>The fantasy of "disrupting" traditional education is exactly that — a fantasy. Schools aren't going away. Instead of fighting them, EdTech should strengthen them. Partner with schools. Empower teachers. Enhance existing systems.</p>

<h3>2. Public Sector Focus</h3>

<p>Real scale in Nigeria means government schools. That's where the majority of students are. If your model only works in expensive private schools, you're not solving the problem — you're creating a new elite.</p>

<h3>3. Teacher-Centric Design</h3>

<p>Stop building products that bypass teachers and wonder why schools don't adopt them. Teachers are the distribution network for education. Enable them, train them, make them look good — and watch your adoption soar.</p>

<h3>4. Offline-First Thinking</h3>

<p>Internet connectivity in Nigerian schools is inconsistent at best. Products that require constant connectivity are products that don't work. Design for the reality, not the dream.</p>

<h3>5. Outcomes Over Engagement</h3>

<p>Nobody cares how many hours students spent on your app if they can't do anything useful afterward. Measure what matters: Can they build something? Can they get hired? Can they start something?</p>

<h2>The EdTech Industry We Need to Build</h2>

<p>Imagine an EdTech ecosystem where:</p>

<ul>
<li>Public school students have access to the same quality digital education as private school students</li>
<li>Teachers are equipped to deliver modern curricula, not replaced by apps</li>
<li>Graduates enter the workforce with portfolios, not just certificates</li>
<li>Young entrepreneurs have pathways from classroom idea to funded startup</li>
<li>Government, private sector, and EdTech work together instead of in silos</li>
</ul>

<p>This isn't utopia. This is achievable — if we're willing to do the hard, unsexy work of building for scale, not just for demo day.</p>

<h2>Why Forge Is Betting Everything On This Moment</h2>

<p>At Forge Intellitech, we're not building for the next funding round. We're building for the next generation.</p>

<p>TechUp exists because we believe every secondary school student in Nigeria deserves practical digital skills — not just the ones whose parents can afford coding bootcamps.</p>

<p>LaunchPad exists because we believe the next great Nigerian founder might be sitting in a classroom right now, waiting for someone to believe in their idea.</p>

<p>We're not the only ones who can do this work. We're not even claiming to be the best. But we are claiming to be serious. Committed. In it for the long haul.</p>

<h2>The Invitation</h2>

<p>If you're in EdTech, I want to challenge you: Are you building for impact, or are you building for acquisition?</p>

<p>If you're in government, I want to ask: Are you ready to partner with organizations that can help you deliver on your digital education promises?</p>

<p>If you're a school administrator, I want to know: What's your plan for the new Digital Technology curriculum?</p>

<p>If you're a parent, I want to push you: Are you demanding more than the bare minimum for your children's digital education?</p>

<p>The revolution isn't coming. The conditions are here. The question is whether we'll meet the moment or waste it.</p>

<p><em>I know which side Forge is on. What about you?</em></p>`,
    author: "Forge Team",
    authorImage: "/images/team/forge-team.jpg",
    date: "September 11, 2025",
    category: "EdTech",
    readTime: "9 min read",
    featured: false,
    image: "/images/blog/edtech-revolution.jpg",
  },
];

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  
  return {
    title: `${post.title} - Forge Intellitech`,
    description: post.excerpt,
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  
  // If post not found, show 404
  if (!post) {
    notFound();
  }
  
  // Find related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  return (
    <ChapterWrapper chapter="forge">
      
      {/* ==================== HERO IMAGE ==================== */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {/* Gradient fallback background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#2D2D2D] to-[#1A1A1A]" />
        
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--env-bg-primary)] via-[var(--env-bg-primary)]/50 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-24 left-0 right-0 z-10">
          <div className="container-forge">
            <Link 
              href="/blog"
              className="inline-flex items-center px-4 py-2 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50 transition-all"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== ARTICLE HEADER ==================== */}
      <section className="relative -mt-32 z-10 pb-12">
        <div className="container-forge">
          <div className="max-w-4xl mx-auto">
            
            <div className="bg-[var(--env-surface)] rounded-3xl border border-[var(--env-border)] p-8 md:p-12 shadow-2xl">
              
              {/* Category and Read Time */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-[#FF8C42] bg-[#FF8C42]/10 rounded-full border border-[#FF8C42]/20">
                  {post.category}
                </span>
                <span className="text-[var(--env-text-tertiary)]">·</span>
                <span className="text-[var(--env-text-tertiary)] text-sm">{post.readTime}</span>
              </div>
              
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--env-text-primary)] mb-6 leading-tight">
                {post.title}
              </h1>
              
              {/* Excerpt */}
              <p className="text-xl text-[var(--env-text-secondary)] leading-relaxed mb-8">
                {post.excerpt}
              </p>
              
              {/* Author Info */}
              <div className="flex items-center justify-between pt-8 border-t border-[var(--env-border)]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF8C42]/30 to-[#A855F7]/30 flex items-center justify-center overflow-hidden">
                    <span className="text-2xl">✍️</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--env-text-primary)] text-lg">{post.author}</p>
                    <p className="text-[var(--env-text-tertiary)]">{post.date}</p>
                  </div>
                </div>
                
                {/* Share Buttons */}
                <div className="hidden sm:flex items-center gap-3">
                  <span className="text-[var(--env-text-tertiary)] text-sm mr-2">Share:</span>
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://forgeintellitech.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--env-bg-primary)] flex items-center justify-center text-[var(--env-text-secondary)] hover:text-[#FF8C42] hover:bg-[#FF8C42]/10 transition-all"
                    aria-label="Share on Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://forgeintellitech.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--env-bg-primary)] flex items-center justify-center text-[var(--env-text-secondary)] hover:text-[#FF8C42] hover:bg-[#FF8C42]/10 transition-all"
                    aria-label="Share on LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + `https://forgeintellitech.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--env-bg-primary)] flex items-center justify-center text-[var(--env-text-secondary)] hover:text-[#FF8C42] hover:bg-[#FF8C42]/10 transition-all"
                    aria-label="Share on WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
            </div>
            
          </div>
        </div>
      </section>

      {/* ==================== ARTICLE CONTENT ==================== */}
      <section className="py-12 md:py-16">
        <div className="container-forge">
          <div className="max-w-3xl mx-auto">
            
            {/* Article Content */}
            <article 
              className="blog-article prose-forge"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

          </div>
        </div>
      </section>

      {/* ==================== TAGS & SHARE (MOBILE) ==================== */}
      <section className="py-8 border-t border-[var(--env-border)]">
        <div className="container-forge">
          <div className="max-w-3xl mx-auto">
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              
              {/* Tags */}
              <div className="flex items-center gap-3">
                <span className="text-[var(--env-text-tertiary)] text-sm">Tagged:</span>
                <span className="px-4 py-2 text-sm font-medium text-[var(--env-text-primary)] bg-[var(--env-surface)] rounded-full border border-[var(--env-border)]">
                  {post.category}
                </span>
              </div>
              
              {/* Share - Mobile */}
              <div className="flex sm:hidden items-center gap-3">
                <span className="text-[var(--env-text-tertiary)] text-sm">Share:</span>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://forgeintellitech.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[var(--env-surface)] flex items-center justify-center text-[var(--env-text-secondary)] hover:text-[#FF8C42] transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + `https://forgeintellitech.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[var(--env-surface)] flex items-center justify-center text-[var(--env-text-secondary)] hover:text-[#FF8C42] transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
              
            </div>
            
          </div>
        </div>
      </section>

      {/* ==================== CTA BOX ==================== */}
      <section className="py-12">
        <div className="container-forge">
          <div className="max-w-3xl mx-auto">
            
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#FF8C42]/10 via-[#A855F7]/5 to-[#FF8C42]/10 border border-[#FF8C42]/20 text-center">
              
              <span className="text-4xl mb-4 block">🤝</span>
              
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--env-text-primary)] mb-4">
                Want to be part of the movement?
              </h3>
              
              <p className="text-lg text-[var(--env-text-secondary)] mb-8 max-w-lg mx-auto">
                Whether you're a school, sponsor, or supporter — we'd love to hear from you and explore how we can work together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-[#FF8C42] hover:bg-[#E85D04] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#FF8C42]/25"
                >
                  Get In Touch
                </Link>
                <Link
                  href="/join"
                  className="px-8 py-4 bg-[var(--env-surface)] hover:bg-[var(--env-surface-hover)] text-[var(--env-text-primary)] font-semibold rounded-xl border border-[var(--env-border)] transition-all duration-300"
                >
                  Partner With Us
                </Link>
              </div>
              
            </div>
            
          </div>
        </div>
      </section>

      {/* ==================== RELATED POSTS ==================== */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[var(--env-bg-secondary)]">
          <div className="container-forge">
            
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--env-text-primary)] mb-8 text-center">
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="block group"
                >
                  <article className="h-full rounded-2xl bg-[var(--env-surface)] border border-[var(--env-border)] hover:border-[#FF8C42]/30 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                    
                    {/* Image with gradient fallback */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D]">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-[#FF8C42] bg-[#FF8C42]/10 rounded-full mb-3">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-lg font-bold text-[var(--env-text-primary)] mb-2 group-hover:text-[#FF8C42] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-[var(--env-text-secondary)] text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                    
                  </article>
                </Link>
              ))}
            </div>
            
          </div>
        </section>
      )}

      {/* ==================== BACK TO BLOG ==================== */}
      <section className="py-12 bg-[var(--env-bg-primary)]">
        <div className="container-forge">
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 text-[#FF8C42] hover:text-[#E85D04] font-semibold transition-all group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Articles
            </Link>
          </div>
        </div>
      </section>
      
    </ChapterWrapper>
  );
}