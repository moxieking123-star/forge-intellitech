export const programmeDetails = {
  techup: {
    name: 'TechUp', audience: 'Secondary schools', image: 'techup-web-product-studio-v2',
    question: 'What if their next idea', answer: 'became something real?',
    lead: 'There is a difference between knowing how to use a tool and discovering what you could create with it. TechUp gives secondary-school learners room to make that discovery.',
    imageAlt: 'Fictional Nigerian secondary-school students and an instructor coding a website and discussing a product plan',
    conviction: 'A student should have work they can point to.',
    convictionCopy: 'An idea on paper. A first version that did not quite work. A change that made it better. Learning becomes meaningful when students can explain what they tried, what they made and what they would do differently.',
    skills: [
      ['JSS1–JSS3 · design', 'A foundation in Canva and Figma design, with choices made for a clear purpose.'],
      ['Data and coding', 'Organise data in Excel, explore Power BI and create web pages with HTML and CSS.'],
      ['Responsible digital life', 'Digital citizenship continues from primary school. All JSS and SS learners study what AI is, how it is developed and how human judgement guides its use in building useful things. Senior learners explore Nigeria’s Cybercrimes (Prohibition, Prevention, etc.) Act, 2015 and its 2024 amendment.'],
      ['SS1–SS3 · choose a pathway', 'Builder: websites, software, automations, data tools and prototypes. Storyteller: design, writing, video, branding, media and presentations. Strategist: research, data, business, product thinking, marketing and planning.'],
    ],
    example: 'A useful school website. From the first question to a page that works.',
    exampleSteps: [
      ['Ask before building.', 'Who will use the page? Sketch its purpose, content and layout in a product plan.'],
      ['Make a first version.', 'Write HTML for the content and CSS for the layout, then compare the browser preview with the design.'],
      ['Test, explain, improve.', 'Review the page on different screen sizes, ask for feedback and improve the code and design.'],
    ],
    nextTitle: 'An idea can have somewhere to go.',
    nextCopy: 'In TechUp partner schools, In-school LaunchPad creates a route for us to identify promising student ideas and explore building an enterprise alongside the student. Intern with Forge offers a separate practical pathway after SSCE. These school benefits are for participating-school learners or public-school learners onboarded through Forge training, whose demonstrated learning fits the opportunity. Each has its own review and arrangements.',
    nextHref: '/endless-possibilities/in-school-launchpad', nextLink: 'Explore In-school LaunchPad',
    faqs: [
      ['Is this only for students who already code?', 'TechUp is a subject for all students. JSS1–JSS3 build a shared foundation; SS1–SS3 choose Builder, Storyteller or Strategist. SS1–SS3 track-based live classes run for about three hours on Saturdays through the portal.'],
      ['What if a learner does not own a laptop?', 'Learners use their own gadgets. Without a classroom device, learners can later practise guided dashboard activities on a parent’s device after access is activated. Supplier introductions for used laptops below NGN100,000 depend on availability; suppliers may offer instalments under their terms.'],
      ['What can students take with them when they leave school?', 'Assignments and project submissions record progress. By SS3, students can download their work and assemble a portfolio for future learning, applications and professional profiles, subject to platform age and eligibility rules. This does not guarantee a job or earnings.'],
    ],
  },
  elytech: {
    name: 'ElyTech', audience: 'Primary schools', image: 'elytech-touch-typing-v2',
    question: 'Before “I cannot do it,”', answer: 'let them try.',
    lead: 'A child does not need to have a career plan to begin creating. Sometimes all they need is a question, a little guidance and the chance to discover that their choices can make something happen.',
    imageAlt: 'Fictional Nigerian primary-school children viewed from behind practising touch typing with a teacher',
    conviction: 'Confidence can begin with a small discovery.',
    convictionCopy: 'Move a piece. Change a step. Notice what happens. ElyTech makes room for age-appropriate exploration, with clear demonstrations, supported practice and space for children to explain what they notice.',
    skills: [
      ['Chisanbop finger arithmetic', 'Practise mental arithmetic using a finger-based method. Regular exercises give children time to think through numbers and work towards fluency.'],
      ['Touch typing', 'Move from working through numbers to entering instructions: practise finding keys accurately and typing without constantly looking down.'],
      ['Scratch coding logic', 'Give Scratch sprites instructions, sequence actions and test decisions to create a simple animation or game.'],
      ['Canva design', 'Arrange words, pictures and colour to communicate an idea. Printed work lets children see and hold something they designed.'],
    ],
    example: 'Practise a skill. Give a small idea a shape.',
    exampleSteps: [
      ['Start with hands and keys.', 'P1–P3 prioritise Chisanbop and touch typing. Forge supplies Chisanbop learning aids and practice keyboards.'],
      ['Try a different step.', 'P3 is a transition: P3–P6 expand across all four skills, adding Scratch coding logic and Canva design.'],
      ['Show and explain.', 'Give a Scratch sprite a sequence to follow, or make a Canva design to print and hold. Explain the choices, returning to typing and number practice along the way.'],
    ],
    nextTitle: 'Four skills. One primary-school subject.',
    nextCopy: 'ElyTech runs from P1 to P6 as a subject for all students. Parents arrange age-appropriate laptops from Basic 3 upward. An internet-capable laptop of any specification can support school classes; practical arrangements are confirmed with the school.',
    nextHref: '/programmes/resources', nextLink: 'Prepare families for ElyTech',
    faqs: [
      ['How is the approach adapted for younger learners?', 'We start with demonstration, guided exploration and manageable tasks. The learner group and the school’s starting point shape the activities and pace agreed before delivery.'],
      ['Does every child need their own device?', 'Learners use their own gadgets. Parents arrange laptops from Basic 3 upward. Without a classroom device, a learner can later practise guided dashboard activities on a parent’s device once access is activated.'],
      ['How can we introduce the programme to parents?', 'Use the school resource kit to download the overview and customise introduction and follow-up messages with your school’s name, parent-facing fee and contact details.'],
    ],
  },
} as const;
export type ProgrammeKey = keyof typeof programmeDetails;
