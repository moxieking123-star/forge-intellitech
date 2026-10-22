export type Story = {
  slug: string;
  title: string;
  category: string;
  byline?: string;
  imageCaption?: string;
  excerpt: string;
  image: { src: string; alt: string };
  sections: { title: string; paragraphs: string[] }[];
  sources: { title: string; url: string; note: string }[];
  cta: { label: string; href: string };
};
const unesco = {
  title: "UNESCO · Technology in education: A tool on whose terms?",
  url: "https://www.unesco.org/gem-report/en/publication/technology",
  note: "The 2023 GEM Report examines access, teacher preparation and governance as conditions for educational technology.",
};
const itu = {
  title: "ITU · Universal and meaningful connectivity",
  url: "https://www.itu.int/itu-d/sites/projectumc/aboutumc/",
  note: "The framework considers devices, skills, security, affordability, availability and connection quality together.",
};
const unicef = {
  title: "UNICEF Nigeria · From Smart Schools to Smarter Learning",
  url: "https://www.unicef.org/nigeria/stories/smart-schools-smarter-learning-enugu-teachers-gain-digital-skills-transform-classrooms",
  note: "A September 2026 account of practical teacher development in Enugu; an external example, not a Forge programme.",
};

export const stories: Story[] = [
  {
    slug: "why-cant-we-build-what-we-imagine",
    title: "If Disney could imagine Wakanda, why can’t we build what we keep imagining?",
    category: "A founder’s reflection",
    byline: "A reflection from the founder of Forge",
    excerpt: "I keep coming back to a question: what would change if we gave our imagination a responsibility, and started within the capacity we have?",
    image: { src: "/images/editorial/stories/imagined-library-workshop.png", alt: "An imagined Nigerian public library and workshop opening onto a shaded green courtyard." },
    imageCaption: "An imagined public library and community workshop. A vision to work towards, not an existing Forge facility.",
    sections: [
      { title: "What that imagined place asks of me", paragraphs: [
        "If Disney could imagine Wakanda, why can’t we build what we keep imagining? I know the question is bigger than its wording. Wakanda belongs to Marvel’s Black Panther: a fictional African nation whose technological advancement is part of its story. A film can make a world convincing without having to keep its lights on on Monday morning. We have to live with Monday morning. Still, I cannot dismiss what that picture opens up in my mind.",
        "It lets me see African intelligence, beauty and ambition occupying the centre of a future. We should not need a film to believe that is possible. But sometimes a picture reaches a place that another speech cannot. It interrupts the habit of expecting less. My question begins there: after the excitement, what are we prepared to do with the possibility we have seen?",
        "I also think about vibranium, the fictional resource beneath Wakanda’s ground that helps make its futuristic technology possible. Africa has real resources, and people with the intelligence to do more with what we have. I am not looking for a magic metal. I am asking why we so often expect less of ourselves. That picture of an African society building an extraordinary future makes me want us to take our own capacity seriously, and develop it with care.",
        "I am Nigerian. I know how easily a conversation about what could work becomes a list of everything that does not. Much of that frustration is deserved. People are tired, and many are carrying responsibilities that leave little room for another experiment. I do not want to turn hope into another demand on people who are already doing their best. I want to ask what I can take responsibility for myself."
      ] },
      { title: "Potential needs an introduction", paragraphs: [
        "I think about how often we describe someone as having no direction before asking what directions they have ever been shown. If all you have seen of technology is other people using finished products, creating one can look like something reserved for another kind of person. Then someone gives you a small task, explains a tool, and waits while you try. The distance begins to change.",
        "That does not mean every child must become a programmer. We need people who can design, repair, teach, organise, grow food, understand a customer and keep a promise. A useful education should help a person discover where their abilities meet something the world needs. We lose something when we recognise only the person who can repeat an answer quickly and overlook the one who asks an unusual question.",
        "Our people do not become talented because somebody finally gives them a laptop. The device can give an existing curiosity somewhere to work. So can a patient teacher, a safe place to practise, an introduction to someone’s trade, or a library that opens when it says it will. Opportunity has many ordinary parts."
      ] },
      { title: "AI can help. We still have work to do", paragraphs: [
        "I am excited by AI because it can help us attempt things that used to feel out of reach. It can help explain unfamiliar code, explore the first shape of an idea or prepare a draft we can improve. For a small team, that can be useful room to move. But an answer that sounds confident still needs checking. A tool cannot decide for us whether the thing we are building is worth someone’s time.",
        "Technology will not magically remove crime, poverty or the conditions that make people vulnerable. Learning a skill is valuable; it does not guarantee a job or erase the pressures in a household. If we speak as though an app can carry all of that, we stop listening to the people we say we want to help.",
        "A learner needs electricity, practice time and guidance. A donated device may need a battery, a repair or a secure place to be kept. Someone has to make a lesson understandable. Someone has to answer when a school has a problem. UNESCO’s work on technology in education and ITU’s meaningful-connectivity framework both give us reasons to take those surrounding conditions seriously. The impressive tool is one part of the responsibility."
      ] },
      { title: "The future has to survive ordinary days", paragraphs: [
        "The future I want is not only a beautiful skyline. I want a school where a useful lesson can continue next term. A workshop where a broken tool can be repaired. A small business that can find its records without losing half a day. A public service that respects the person waiting. These things may not look dramatic on a poster. They would change how an ordinary day feels.",
        "We need institutions that can carry work beyond the enthusiasm of one person. We need teachers, families, businesses and public bodies able to collaborate, with clear responsibilities and the honesty to say what is working. Maintenance belongs in the plan before the launch. So does a way for the person using a service to say that it is failing them.",
        "I cannot build all of that through Forge. I should not pretend to. But limited capacity is still capacity. Within it, we can teach something carefully, build a useful tool, connect a working laptop to a verified need, or give a promising idea a serious conversation. We can make the part within our reach more dependable."
      ] },
      { title: "Let us build something people can use", paragraphs: [
        "I do not want the title of founder to become the achievement. I want us to make something an ordinary person here can use, understand and afford to keep using. That means asking less comfortable questions. Does this solve their problem? Can they reach it? What happens when it breaks? Have we made a promise we can keep?",
        "We will get some things wrong. I will get some things wrong. Some ideas I care about will need to change, and some may fail. I would rather admit that possibility now than build a story in which we are always the heroes. People who join us should have room to question us and help us do the work better.",
        "Wakanda is imagined. The needs around us are real. So are the people who can contribute to meeting them. We do not need to reproduce a fictional country to widen what is possible here. We can begin with one thing that works, learn from the person using it, and build the next thing with others. That is the question I want to keep living with: what can we make useful, together, with what we have today?"
      ] }
    ],
    sources: [
      { title: "Disney · Discover Wakanda", url: "https://www.disney.co.uk/movies/black-panther/discover-wakanda", note: "Disney describes Wakanda as the fictional technologically advanced African nation in Marvel Studios’ Black Panther. The film is a point of reflection, not evidence of a real technology or an affiliation with Forge." },
      { title: "Disney · Black Panther activity packet", url: "https://impact.disney.com/app/uploads/2022/01/Black-Panther-Activity-Packet-Final.pdf", note: "Official background on Wakanda, its technology and vibranium. The resource is part of the fiction; the founder’s reflection on Africa’s possibilities is his own." },
      unesco, itu
    ],
    cta: { label: "Bring what you can to the work", href: "/join" }
  },

  {
    slug: "the-future-we-can-start-building",
    image: { src: "/images/editorial/stories/future-building.webp", alt: "Wooden blocks form a rising staircase on a green sheet in warm sunlight." },
    title: "The future we can start building",
    category: "Our point of view",
    excerpt:
      "A better future asks something of us now. Sometimes the first useful contribution is closer than we think.",
    sections: [
      {
        title: "What are we waiting for?",
        paragraphs: [
          "It is easy to speak about the Nigeria we want. A country where useful ideas have room to grow. Where a young person can learn a skill, practise it and see a place for themselves. Where the answer to a difficult problem might be built by someone who understands it because they live with it. The harder question comes afterwards: what are we prepared to begin?",
          "We do not have to pretend that the obstacles are small. A family balancing immediate needs cannot simply wish a laptop into existence. A teacher cannot create more time by caring deeply. A learner who has never been shown a possibility may have no reason to imagine it. Taking responsibility should begin with understanding these realities, rather than turning them into a judgement about effort.",
        ],
      },
      {
        title: "An opportunity has practical parts",
        paragraphs: [
          "At Forge, our belief is that possibility needs something to stand on. A tool someone can use. A task they can attempt. A person who will explain what went wrong and stay long enough to see another attempt. These are ordinary things, but they ask for organisation, patience and follow-through. Good intentions become useful when someone can actually reach the opportunity being offered.",
          "ITU's framework for meaningful connectivity brings devices and skills into the same conversation. That is a useful reminder for our own work: handing over equipment is one part of a larger responsibility. We should also ask whether the learner can practise, get help and use the tool safely. A photograph of a handover cannot answer those questions for us.",
        ],
      },
      {
        title: "Start within reach, keep the ambition",
        paragraphs: [
          "This is why we connect building technology with teaching people to create. A practical lesson can begin with a familiar problem: organising information, explaining an idea clearly or making a simple tool easier to use. The task does not have to sound impressive. It needs a purpose the learner understands and enough room for them to make decisions of their own.",
          "Responsibility belongs to the people designing the opportunity too. We should be clear about what is available, who it is for and what happens after an enquiry. We should record what was actually done and be honest about what remains unfinished. Ambition loses nothing when it is explained accurately; it gains a way for other people to participate.",
        ],
      },
      {
        title: "A beginning we can share",
        paragraphs: [
          "Someone may have a working laptop they no longer use. Someone else may be able to teach, review a project or introduce a school. None of these contributions needs to carry the whole future alone. The work is to connect a real contribution with a real need, then keep the learning moving after the first moment of excitement.",
          "Forge Intellitech Services Ltd is the company behind this work. Forge ITs is the movement within it. Through Endless Possibilities, we invite people to help make devices and guided learning possible. We are building towards a future we want to share. We can begin by making the next useful step available to someone today.",
        ],
      },
    ],
    sources: [itu],
    cta: {
      label: "Find your place in the movement",
      href: "/endless-possibilities",
    },
  },
  {
    slug: "exposure-is-a-place-to-begin",
    image: { src: "/images/editorial/stories/exposure-beginning.webp", alt: "A circuit board, copper wire, magnifying glass and wooden shapes arranged for discovery." },
    title: "Exposure is a place to begin",
    category: "Practical education",
    excerpt:
      "Before we ask what a learner wants to become, we should ask what they have had a chance to try.",
    sections: [
      {
        title: "A different first question",
        paragraphs: [
          "What do you want to become? It sounds like a simple question. Yet it asks a young person to choose from a world they may only partly know. Our starting point should sometimes be more generous: what have you been able to see, touch, question and try? A meaningful answer needs experiences to draw from, including permission to discover that an unfamiliar activity might be interesting.",
          "Exposure, as we understand it, is more than a presentation about successful people. It is the chance to meet a piece of work closely enough to understand the choices inside it. What does someone building a website actually do? How does a spreadsheet help a business? What makes a digital design clear? These questions turn distant job titles into things a learner can investigate.",
        ],
      },
      {
        title: "Let the learner do something",
        paragraphs: [
          "A useful introduction should leave room for action. Show how a simple page is arranged, then let learners change its structure. Explain how information can be organised, then ask them to organise a small example. Invite them to describe what they changed and why. The aim is a first experience of making a decision, seeing its effect and trying again.",
          "The example should be manageable enough that the learner can finish something. A first task overloaded with tools and terminology can hide the very idea we are trying to introduce. We would rather explain one useful concept clearly, give it a practical setting and return to it in a more demanding task when the learner is ready.",
        ],
      },
      {
        title: "Teachers belong in the picture",
        paragraphs: [
          "UNICEF Nigeria's account of teacher development in Enugu describes educators practising with digital tools and exploring classroom uses. That example matters to this discussion because introducing equipment also creates a teaching responsibility. The adult guiding a lesson needs time to learn the tool, ask questions and think about how it serves the class.",
          "For a school considering practical technology education, we suggest starting with the learning experience. What will learners create? Who will guide them when they get stuck? How will practice fit around the school day? What evidence can parents and teachers look at afterwards? Those questions help make a programme understandable before anyone is asked to judge its promise.",
        ],
      },
      {
        title: "Keep the door open after the introduction",
        paragraphs: [
          "A demonstration can open a door. Repeated practice gives someone a chance to walk through it. We want the first encounter with technology to connect to work a learner can revisit, rather than becoming an isolated event. Feedback, a next task and a record of progress all give that encounter somewhere to lead. Curiosity deserves a route beyond the room where it began.",
          "Our education work is shaped by this belief: explain plainly, practise purposefully and help people see what they have made. We invite schools to discuss their setting with Forge, including their learners, timetable and available tools. A useful conversation starts with those details. From there, we can explore what a practical beginning could look like together.",
        ],
      },
    ],
    sources: [unicef],
    cta: {
      label: "Talk about learning at your school",
      href: "/contact?interest=school",
    },
  },
  {
    slug: "a-portfolio-begins-with-one-useful-project",
    image: { src: "/images/editorial/stories/portfolio-project.webp", alt: "Paper compositions develop across three sheets beside a ruler and green binder clips." },
    title: "A portfolio begins with one useful project",
    category: "Learning by doing",
    excerpt:
      "Keep the work, the decisions and the revisions. A learner should be able to explain more than the finished screen.",
    sections: [
      {
        title: "Something you can show and explain",
        paragraphs: [
          "Imagine asking a learner what they can do and giving them room to show you. They open a project, explain the problem they chose and walk through a decision they changed. This is the kind of conversation we want practical learning to make possible. The finished work matters, and so does the learner's understanding of how it came together.",
          "A portfolio can start small. A clear document, a simple website or an organised spreadsheet can be a worthwhile beginning when it answers a real brief. These are suggested learning tasks, not claims about a particular student's achievement. The point is to give the work a purpose that can be discussed: who needs it, what should it do and how will we know whether it helps?",
        ],
      },
      {
        title: "Choose a task with boundaries",
        paragraphs: [
          "A good brief gives enough direction to begin without making every decision for the learner. Ask for an information page with a clear heading, readable sections and a useful next step. Let the learner decide how those pieces fit together. Review the result against the brief, rather than judging it only by how polished it appears beside professional work.",
          "Keep the task within reach of the tools and time available. It is better to complete a small piece of work thoughtfully than to abandon a much larger idea that depended on resources the learner never had. A first project should create something solid to return to. Later tasks can add complexity as understanding and independence develop.",
        ],
      },
      {
        title: "Save the thinking as well as the result",
        paragraphs: [
          "We encourage a simple project record: the original brief, an early attempt, the feedback received and the next version. Add a short explanation in the learner's own words. What was difficult? What changed? What would they improve with more time? This record gives a reviewer something more useful than an unexplained screenshot and gives the learner a way to notice their own decisions.",
          "UNESCO's technology-in-education report considers teacher preparation alongside access and governance. Our interpretation for project learning is practical: the tool needs a teaching approach around it. A folder of assignments alone cannot tell us how well someone understands the work. Conversation, feedback and opportunities to revise should sit beside the saved files.",
        ],
      },
      {
        title: "Let the work travel with the learner",
        paragraphs: [
          "A learner should know how to find, name and reopen their own projects. Where possible, keep a usable copy alongside a presentation version. Describe any help received and credit other people's work. Remove private details before sharing. These habits make the portfolio clearer and more responsible, and they are worth practising from the first task rather than adding at the end.",
          "We want practical education to leave someone with work they can return to after the lesson ends. A portfolio does not promise a job, an admission or a business. It offers a starting point for a more concrete conversation about capability. One completed project, honestly explained, gives the next teacher, mentor or collaborator something real to build on.",
        ],
      },
    ],
    sources: [unesco],
    cta: { label: "Explore TechUp", href: "/techup" },
  },
  {
    slug: "a-laptop-needs-a-learning-plan",
    image: { src: "/images/editorial/stories/laptop-plan.webp", alt: "An open laptop with a blank screen beside a journal and pencils on a green desk." },
    title: "A laptop needs a learning plan",
    category: "Endless Possibilities",
    excerpt:
      "A device opens a possibility. Practice, guidance and a clear commitment help give that possibility direction.",
    sections: [
      {
        title: "Think beyond the handover",
        paragraphs: [
          "A laptop can be a deeply practical gift. It gives someone a tool to work with, a place to save what they make and a chance to return to an unfinished idea. But the question we should ask before a handover is what happens afterwards. Who helps the learner begin? What will they practise? Where can they turn when a task becomes difficult?",
          "These questions are part of how we think about Endless Possibilities, a Forge ITs movement within Forge Intellitech Services Ltd. Give a Child a Laptop connects the invitation to contribute a device with a learning commitment. The purpose is to help someone use an opportunity with direction, care and enough support to keep working beyond the first day.",
        ],
      },
      {
        title: "Access is a connected responsibility",
        paragraphs: [
          "ITU describes meaningful connectivity through several connected conditions, including devices, skills, affordability and security. That perspective helps explain why we should look at a learner's circumstances as a whole. Equipment matters. So does the ability to use it in a suitable setting, understand the task and find help without being made to feel that needing help is a failure.",
          "For us, guided learning means making the next step clear. Begin with a manageable task. Explain the purpose. Let the learner attempt it, then offer feedback they can act on. Return to the work later. We see value in this patient rhythm because it makes our responsibility specific: someone should know what they are working towards and how to ask for support.",
        ],
      },
      {
        title: "Match the offer to a verified need",
        paragraphs: [
          "The campaign is for secondary-school students in public or low-income private schools. School and need verification, with parent or guardian involvement, come before a suitable match. A request for support does not guarantee a device. Applicants must be ready to commit to a full year of training. These details belong in the invitation because people deserve to understand what participation asks of them.",
          "Donors begin by registering interest and describing their device and preferences. Forge reviews the offer against vetted demand before agreeing arrangements. Registering interest is different from being asked to send a laptop immediately. We want the process to protect the usefulness of the contribution, with clear coordination through Forge and the school or parent where appropriate.",
        ],
      },
      {
        title: "Give something the learner can use",
        paragraphs: [
          "The device specification is a new or used Windows laptop with an Intel Core i5 processor, fifth generation or newer, at least 4 GB RAM and a 128 GB SSD. Please describe the condition honestly when registering. A useful contribution begins with knowing what is available, so the conversation about suitability and delivery can happen with the right information.",
          "There is also a place for people who can contribute teaching, time or connections. The shared task is to make learning practical enough to continue. A laptop belongs inside that task. If you have one to offer, the next step is a conversation about a real match and the learning it can support. That is where a generous intention begins to become a usable opportunity.",
        ],
      },
    ],
    sources: [itu],
    cta: {
      label: "Register laptop donor interest",
      href: "/endless-possibilities/give-a-child-a-laptop",
    },
  },
  {
    slug: "an-idea-needs-someone-to-question-it",
    image: { src: "/images/editorial/stories/idea-questions.webp", alt: "A cardboard prototype with a loose component, measuring tape and pencils, ready for revision." },
    title: "An idea needs someone to question it",
    category: "School to enterprise",
    excerpt:
      "Mentorship can give a promising school idea a more useful next step: a smaller test, a clearer problem and honest feedback.",
    sections: [
      {
        title: "After the first exciting idea",
        paragraphs: [
          "An idea can arrive with great energy. Someone sees a problem, imagines a solution and wants to tell the room. We should make space for that confidence. We should also make space for what follows: questions, revisions and the patient work of finding out whether the idea helps anyone. Encouragement becomes more useful when it gives a young person somewhere concrete to go next.",
          "In-school enterprise learning should allow that process to remain educational. A learner can explore a problem without being asked to perform the certainty of an established founder. They can change direction when new information appears. They can discover that the first version was too complicated. We want this room to think and revise to be part of the opportunity itself.",
        ],
      },
      {
        title: "Ask questions that help the work",
        paragraphs: [
          "Who experiences the problem? How do they deal with it now? What would make their day easier? Which part of the solution can be tested with the time and tools available? A mentor can help turn a broad ambition into a task the learner understands. That might be a sketch, a simple demonstration or a carefully prepared set of questions for a supervised conversation.",
          "These are suggested ways of working, rather than a report of any particular student venture. Their value lies in making an idea open to examination. A mentor should be able to explain the reason for a question and listen to the answer. The learner should leave with a clearer decision to make, rather than only a longer list of impressive words.",
        ],
      },
      {
        title: "Guidance needs boundaries",
        paragraphs: [
          "Mentorship involving school learners belongs within appropriate school and parent arrangements. The task, time commitment and route for communication should be clear. Feedback should address the work respectfully. Private student information and unfinished venture details should stay private. Public enthusiasm does not remove the responsibility to handle a learner's idea and circumstances with care.",
          "UNESCO's work on technology in education puts governance and teacher preparation alongside access. We take a related lesson into our thinking about enterprise learning: the support around an activity deserves as much attention as the activity itself. Giving someone a stage is one contribution. Preparing them, listening carefully and agreeing an appropriate next step are further responsibilities.",
        ],
      },
      {
        title: "A next step worth taking",
        paragraphs: [
          "LaunchPad is part of Forge's work around ideas and practical beginnings. Its historical event record and present in-school direction should be understood separately. An award at an event is evidence of that moment; it does not by itself establish a lasting business or a future income. We want to tell the story of work accurately and give the next stage the attention it needs.",
          "Schools and potential mentors can help shape those next stages by bringing real questions, relevant experience and a willingness to follow through. A useful first conversation with Forge can cover the school setting, the kind of support available and the boundaries needed. The ambition is to help young people think more clearly, build more carefully and meet the responsibility that comes with making something for other people.",
        ],
      },
    ],
    sources: [unesco],
    cta: {
      label: "Explore LaunchPad",
      href: "/endless-possibilities/launchpad",
    },
  },
];

export const legacyStoryRedirects: Record<string, string> = {
  "iran-self-reliance-lessons-for-africa":
    "/blog/the-future-we-can-start-building",
  "launchpad-2026-announcement": "/endless-possibilities/launchpad",
  "launchpad-2025-winners-story": "/endless-possibilities/launchpad",
  "ict-to-digital-technology-opportunity": "/blog/exposure-is-a-place-to-begin",
  "edtech-revolution-nigeria": "/blog/a-laptop-needs-a-learning-plan",
};
