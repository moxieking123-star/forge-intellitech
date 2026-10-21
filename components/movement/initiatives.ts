export type Initiative = {
  slug: string;
  name: string;
  label: string;
  audience: string;
  card: string;
  headline: string;
  intro: string;
  image: string;
  imageAlt: string;
  caption: string;
  sections: { title: string; text: string }[];
  eligibility: string;
  action: string;
  interest: string;
  support: string;
};
export const initiatives: Initiative[] = [
  {
    slug: "launchpad",
    name: "LaunchPad",
    label: "The annual opportunity · 2027 in planning",
    audience: "Young people with ideas worth taking seriously",
    card: "A platform for young people to present ideas, find backing and take a first step towards enterprise.",
    headline: "An idea deserves more than ‘maybe one day’.",
    intro:
      "A young person should not have to wait until someone calls them successful before their thinking is taken seriously. LaunchPad gives ideas a place to be heard, questioned and supported. The next edition is being planned for 2027, and we are building towards something bigger and better.",
    image: "/images/movement/launchpad-2025-group.webp",
    imageAlt:
      "Participants and supporters at the original LaunchPad 2025 event",
    caption: "LaunchPad 2025 · a real beginning, at Ikosi-Isheri.",
    sections: [
      {
        title: "Where the story began.",
        text: "LaunchPad 2025 took place on 4 July 2025 at the Ikosi-Isheri LCDA Council Hall. Young people presented their ideas, and two winners received ₦100,000 each. The point was bigger than the award: an idea from a student was given a platform and practical backing.",
      },
      {
        title: "The next edition: 2027.",
        text: "We are planning the next LaunchPad for 2027 with a bigger and better ambition: create more room for young people to develop ideas, meet people who can help and take a meaningful next step. Dates, venue, format and entry details will be announced when confirmed.",
      },
      {
        title: "Help an idea find its next step.",
        text: "There is work to do before the event and after the applause. We welcome conversations with mentors, sponsors, educators, volunteers and organisations willing to help promising ideas develop. Tell us the expertise, time, resources or connections you can bring.",
      },
    ],
    eligibility:
      "The 2027 edition is in planning. Participant eligibility, selection and application arrangements will be published when confirmed. For ongoing enterprise support within a TechUp partner school, explore In-school LaunchPad below.",
    action: "Be part of LaunchPad 2027",
    interest: "launchpad",
    support: "Mentor, volunteer or support the next edition.",
  },
  {
    slug: "give-a-child-a-laptop",
    name: "Give a Child a Laptop",
    label: "Access + a full year of learning",
    audience: "Public and low-income private secondary-school students",
    card: "Someone else’s child. Our shared future. Match a device to verified need and help a learner keep building.",
    headline: "Someone else’s child. Our shared future.",
    intro: "Give a child a laptop. We will help them learn to build with it.",
    image: "/images/home/orange-beginning.webp",
    imageAlt: "A laptop ready for a new beginning",
    caption: "A device. A year of learning.",
    sections: [],
    eligibility: "Verified student need.",
    action: "Give a laptop",
    interest: "laptop",
    support: "A device, learning and practical support.",
  },
  {
    slug: "in-school-launchpad",
    name: "In-school LaunchPad",
    label: "From a school idea to an enterprise",
    audience: "Schools offering Forge’s TechUp programme",
    card: "We identify student ideas and projects, then work alongside the students to help build an enterprise.",
    headline: "An enterprise can begin before school ends.",
    intro:
      "Sometimes the next useful business starts with a student noticing a problem everyone else has learned to live with. In-school LaunchPad creates a way to take that observation seriously, test the idea and begin building an enterprise alongside the student.",
    image: "/images/home/studio-beginning.webp",
    imageAlt: "Illustrative workspace with a laptop and project sketches",
    caption: "Ideas, practical tools and somewhere to begin.",
    sections: [
      {
        title: "Notice what is already there.",
        text: "Through our work in schools, we look for promising ideas and projects among students. We encourage them to describe the problem, speak to the people affected and test whether the idea answers a real need. An interesting idea should have the chance to become a useful one.",
      },
      {
        title: "Build alongside the student.",
        text: "The offer goes beyond asking a student to pitch and walking away. We work with the student to develop the enterprise: understand the market, shape the idea and work through practical next steps. The school and family are involved, and any participation or enterprise arrangements are agreed before proceeding.",
      },
      {
        title: "A small beginning is still a beginning.",
        text: "Students in SSS 2 are already considering businesses they could build. We have introduced market research before idea development and offered to support the branding of their ideas. The ambition is to help them learn through creating something that meets a real need.",
      },
    ],
    eligibility:
      "In-school LaunchPad is open to schools offering Forge’s TechUp programme. Schools can discuss promising student projects and ideas with Forge. Selection and the support offered are considered with the student and school; participation does not automatically guarantee funding or enterprise formation.",
    action: "Bring a student idea to Forge",
    interest: "in-school-launchpad",
    support:
      "Help with mentoring, market insight, branding, practical expertise or agreed enterprise support.",
  },
  {
    slug: "intern-with-forge",
    name: "Intern with Forge",
    label: "After SSCE · practical experience + education support",
    audience: "School leavers from schools offering our technology programme",
    card: "Paid practical technology experience after secondary school, with contributions towards the learner’s education.",
    headline: "Finishing school should open a door.",
    intro:
      "What happens to a young person's potential between finishing secondary school and finding their next opportunity? Intern with Forge creates a practical bridge: learn through work, earn an income and receive support towards continuing education.",
    image: "/images/home/studio-beginning.webp",
    imageAlt:
      "Illustrative technology workspace with tools for practical learning",
    caption: "Practical skills. Real responsibility. A next step.",
    sections: [
      {
        title: "Learn through doing useful work.",
        text: "The internship is for students who have just completed SSCE and are ready to develop practical technology skills. Working with Forge gives the learner a chance to build confidence, practise with guidance and understand the responsibility that comes with contributing to real work.",
      },
      {
        title: "Earn while preparing for what comes next.",
        text: "Interns are paid, and Forge contributes towards their education through an Education Support Fund. Our current recent-school-leaver intern receives monthly education support throughout his internship. The work experience and the educational support are both part of the opportunity.",
      },
      {
        title: "Build a pathway with the school.",
        text: "This opportunity connects to schools offering our technology programme. We work through the learner's readiness and the available placement with the school. The work, duration, pay and education-support arrangements are discussed clearly before an internship begins.",
      },
    ],
    eligibility:
      "For recent SSCE completers from schools offering Forge’s technology programme, including TechUp. Schools and interested school leavers can enquire about the pathway. Available placements, selection and individual terms are confirmed through that conversation; no fixed intake is advertised here.",
    action: "Ask about the internship pathway",
    interest: "internship",
    support:
      "Support the learning, mentorship or education fund behind the pathway.",
  },
  {
    slug: "public-school-seminars",
    name: "Public-school creativity seminars",
    label: "Government schools · exposure + possibility",
    audience: "Students in government secondary schools",
    card: "Conversations that encourage creativity and help a student see themselves as someone who can solve a problem.",
    headline: "Before a child builds, let them see that they can.",
    intro:
      "A student cannot aspire to an opportunity they have never been shown. Our government-school seminars encourage creativity and introduce young people to another way of looking at themselves: as people whose questions, ideas and abilities can help solve problems.",
    image: "/images/home/ideas-in-motion.webp",
    imageAlt:
      "Illustrative notebook of ideas and practical tools on a workspace",
    caption: "A question can be the start of something useful.",
    sections: [
      {
        title: "Make room for another kind of intelligence.",
        text: "A child is more than their ability to reproduce an answer on a board. These seminars encourage students to recognise curiosity, observation, creativity and problem-solving as abilities worth developing. The aim is to open a possibility, not prescribe one definition of success.",
      },
      {
        title: "Start with the world around them.",
        text: "We invite students to look at the needs in their communities and imagine how knowledge and technology could help. The conversation connects ambition to practical responsibility: what do you notice, what could be different, and what could you begin to learn or create?",
      },
      {
        title: "Let encouragement lead somewhere.",
        text: "Schools can speak with Forge about a seminar and the relevant next steps for their students. Where appropriate, those conversations may connect learners to our other initiatives, subject to each programme's eligibility and verification. Exposure should make a next step easier to imagine.",
      },
    ],
    eligibility:
      "This seminar initiative is for government secondary schools. School leaders, educators and partners can enquire about arranging a visit. Dates, format, requirements and support are agreed with the school; this is separate from the TechUp partner-school eligibility for In-school LaunchPad and internships.",
    action: "Discuss a seminar for your school",
    interest: "seminars",
    support:
      "Volunteer your expertise or help bring the conversation to a government school.",
  },
];
