export const programmeDetails = {
  techup: {
    name: 'TechUp', audience: 'Secondary schools', image: 'techup-project-studio',
    question: 'What if their next idea', answer: 'became something real?',
    lead: 'There is a difference between knowing how to use a tool and discovering what you could create with it. TechUp gives secondary-school learners room to make that discovery.',
    imageAlt: 'Fictional Nigerian secondary-school students and an instructor exploring a small irrigation prototype',
    conviction: 'A student should have work they can point to.',
    convictionCopy: 'An idea on paper. A first version that did not quite work. A change that made it better. Learning becomes meaningful when students can explain what they tried, what they made and what they would do differently.',
    skills: [
      ['Digital confidence', 'Choose and use digital tools with a purpose, rather than simply follow a set of clicks.'],
      ['Coding foundations', 'Explore sequences, logic and the habit of breaking a problem into smaller, manageable steps.'],
      ['Design with a reason', 'Ask who an idea is for, what they need and how a first version might help.'],
      ['Projects and communication', 'Build, test, improve and explain the decisions behind the work.'],
    ],
    example: 'A school garden needs watering. How could we begin to design a useful response?',
    exampleSteps: [
      ['Ask before building.', 'Who looks after the garden? What happens when they are away? Learners begin by understanding a real need.'],
      ['Make a first version.', 'A sketch, a sequence of instructions or a small prototype makes the idea visible enough to question.'],
      ['Test, explain, improve.', 'What worked? What did not? Students use feedback to decide what the next version needs.'],
    ],
    nextTitle: 'An idea can have somewhere to go.',
    nextCopy: 'In TechUp partner schools, In-school LaunchPad creates a route for us to identify promising student ideas and explore building an enterprise alongside the student. Intern with Forge offers a separate practical pathway after SSCE. Each opportunity has its own review and arrangements.',
    nextHref: '/endless-possibilities/in-school-launchpad', nextLink: 'Explore In-school LaunchPad',
    faqs: [
      ['Is this only for students who already code?', 'No prior coding ability is assumed in the programme conversation. We discuss learner experience with the school and agree an appropriate starting point and project depth.'],
      ['What if a learner does not own a laptop?', 'Discuss your current device arrangements with us. Give a Child a Laptop is a separate, vetted initiative for eligible secondary-school students in public or low-income private schools; programme enrolment does not guarantee a device.'],
      ['What can students take with them when they leave school?', 'Downloadable learning records and project work are part of the portfolio direction. Access, availability and the school dashboard setup are confirmed during onboarding.'],
    ],
  },
  elytech: {
    name: 'ElyTech', audience: 'Primary schools', image: 'elytech-discovery-studio',
    question: 'Before “I cannot do it,”', answer: 'let them try.',
    lead: 'A child does not need to have a career plan to begin creating. Sometimes all they need is a question, a little guidance and the chance to discover that their choices can make something happen.',
    imageAlt: 'Fictional Nigerian primary-school children exploring sequencing tiles with a Nigerian instructor',
    conviction: 'Confidence can begin with a small discovery.',
    convictionCopy: 'Move a piece. Change a step. Notice what happens. ElyTech makes room for age-appropriate exploration, with clear demonstrations, supported practice and space for children to explain what they notice.',
    skills: [
      ['Patterns and sequences', 'Recognise a pattern, put steps in order and explore why changing the order changes the result.'],
      ['Digital confidence', 'Practise purposeful use of digital tools with guidance suited to younger learners.'],
      ['Creative projects', 'Use pictures, design choices and simple projects to turn an idea into something a learner can show.'],
      ['Reasoning and expression', 'Ask questions, try a different approach and explain a choice in the learner’s own words.'],
    ],
    example: 'A little character needs to find its way through a maze. Which step should come next?',
    exampleSteps: [
      ['Notice the pattern.', 'The instructor demonstrates a short sequence. Children look for what happens first, next and last.'],
      ['Try a different step.', 'Learners arrange a sequence of their own. A wrong turn becomes something to investigate, rather than a reason to stop.'],
      ['Tell us what changed.', 'Children explain the choices that helped their character reach its destination. Their reasoning matters as much as the result.'],
    ],
    nextTitle: 'Small tools can open a bigger world.',
    nextCopy: 'Our school-programme conversation also includes practical approaches to reasoning and numbers. The Chisanbop introduction on our programme page shows how guided practice can make an unfamiliar idea something a learner can explore with their own hands.',
    nextHref: '/programmes#chisanbop', nextLink: 'Explore learning through practice',
    faqs: [
      ['How is the approach adapted for younger learners?', 'We start with demonstration, guided exploration and manageable tasks. The learner group and the school’s starting point shape the activities and pace agreed before delivery.'],
      ['Does every child need their own device?', 'Tell us what your school already has. Device access and practical delivery arrangements are discussed during onboarding; we do not assume a particular setup before that conversation.'],
      ['How can we introduce the programme to parents?', 'Use the school resource kit to download the overview and customise introduction and follow-up messages with your school’s name, parent-facing fee and contact details.'],
    ],
  },
} as const;
export type ProgrammeKey = keyof typeof programmeDetails;
