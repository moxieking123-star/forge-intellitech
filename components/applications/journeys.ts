export type Journey = "donor" | "student" | "school" | "talent" | "space";
export type Field = {
  id: string;
  label: string;
  type?: "email" | "tel" | "number" | "url" | "textarea" | "checkbox";
  options?: string[];
  optional?: boolean;
  hint?: string;
  min?: number;
};
export type JourneyConfig = {
  title: string;
  intro: string;
  subject: string;
  inquiryType: string;
  steps: { title: string; fields: Field[] }[];
  confirmation: string;
};
const contact: Field[] = [
  { id: "name", label: "Your name" },
  { id: "email", label: "Contact email", type: "email" },
  { id: "phone", label: "Contact phone", type: "tel" },
];
export const journeys: Record<Journey, JourneyConfig> = {
  space: {
    title: "A place to gather. A chance to build.",
    intro: "Sometimes the contribution a child needs is somewhere to go, a seat and power to keep learning. Offer a weekend learning space, electricity, a generator or fuel. Forge provides the teaching; we will review the location and practical arrangements with you before anything begins.",
    subject: "Endless Possibilities — weekend learning space and power offer",
    inquiryType: "support",
    confirmation: "Your offer has been received. Thank you for making room for a beginning. Forge will contact you to discuss suitability, safeguarding, power and supervision before agreeing any session. Please do not invite students or make purchases on our behalf yet.",
    steps: [
      { title: "You and the location", fields: [
        ...contact,
        { id: "organisation", label: "Organisation or community (optional)", optional: true },
        { id: "location", label: "Town or city, area and state", hint: "Help us understand where students could gather. No private home address needed at this stage." },
        { id: "spaceType", label: "What would you like to offer?", options: ["A space with power", "A space — power support needed", "Power or a generator for an existing space", "Fuel or power costs", "Another contribution — let’s discuss"] },
        { id: "authority", label: "Your relationship to the space or contribution", hint: "For example: owner, authorised manager, community representative or power sponsor." },
      ] },
      { title: "The space and its power", fields: [
        { id: "capacity", label: "How many students could sit and learn comfortably?", hint: "An estimate is fine. If offering power only, write “Power support only”." },
        { id: "availability", label: "Which weekend days and hours could you support?", type: "textarea" },
        { id: "facilities", label: "What is available at the space?", type: "textarea", hint: "Tell us about seating, tables, ventilation, toilets, access, sockets, internet and any limitations. If offering power only, describe what you can provide." },
        { id: "power", label: "How could you help with power?", options: ["Provide the space and cover electricity", "Provide a generator and fuel", "Provide a generator — fuel support needed", "Cover fuel or electricity costs", "Space only — Forge should discuss power with me", "Another arrangement — explain below"] },
        { id: "powerDetails", label: "Tell us about the power arrangement and any conditions", type: "textarea", hint: "Include generator capacity if known, who would operate it, the cost or fuel you can cover, and how long you could commit. “To be discussed” is fine." },
        { id: "permission", label: "I am authorised to make this offer, or I have explained whose permission is still needed. I understand that Forge must review safety and agree arrangements before students use the space.", type: "checkbox" },
      ] },
    ],
  },
  donor: {
    title: "A laptop can open a door.",
    intro:
      "Register donor interest in Give a Child a Laptop. Forge reviews offers against vetted student need before discussing a match. This is not a request to send or collect a device now.",
    subject: "Give a Child a Laptop — donor interest",
    inquiryType: "support",
    confirmation:
      "Your donor interest has been received. Forge will review your offer against vetted need before discussing any match or delivery arrangements. Please keep your device until arrangements are agreed.",
    steps: [
      {
        title: "You and your device",
        fields: [
          ...contact,
          {
            id: "location",
            label: "Your town or city and state",
            hint: "No street or home address needed.",
          },
          {
            id: "quantity",
            label: "Number of laptops",
            type: "number",
            min: 1,
          },
          {
            id: "condition",
            label: "Device condition",
            options: ["New", "Used"],
          },
          {
            id: "specs",
            label: "Device make, model and specifications",
            type: "textarea",
            hint: "Include processor model/generation, RAM, SSD capacity and any faults.",
          },
          {
            id: "minimumSpecs",
            label:
              "I confirm the offered laptops run Windows, have Intel Core i5 fifth generation or newer, at least 4 GB RAM and a 128 GB SSD.",
            type: "checkbox",
          },
        ],
      },
      {
        title: "Your preferences",
        fields: [
          {
            id: "recipientLocation",
            label: "Preferred recipient location",
            hint: "Town/state, or write “No preference”.",
          },
          {
            id: "schoolCategory",
            label: "Preferred school category",
            options: [
              "Public secondary school",
              "Low-income private secondary school",
              "No preference",
            ],
          },
          {
            id: "purpose",
            label: "What would you like to support?",
            options: [
              "Learning",
              "A Forge-approved student project",
              "No preference",
            ],
          },
          {
            id: "call",
            label: "Would you like a call through Forge?",
            options: ["Yes", "No"],
          },
          {
            id: "delivery",
            label: "Preferred delivery arrangement",
            options: [
              "Forge pickup",
              "I deliver to Forge",
              "I deliver to the recipient school on an agreed day",
            ],
          },
          {
            id: "funding",
            label: "Interested in additional financial assistance?",
            options: ["Yes — discuss with me", "Not at this time"],
          },
          {
            id: "updates",
            label: "Progress updates through Forge",
            options: [
              "Yes, send me campaign progress updates",
              "No updates requested",
            ],
          },
        ],
      },
    ],
  },
  student: {
    title: "A place to begin building.",
    intro:
      "Request laptop and learning support for a secondary-school student in a public or low-income private school. Students may request support themselves with guardian involvement. Applications are private and do not guarantee a laptop.",
    subject: "Give a Child a Laptop — student support request",
    inquiryType: "support",
    confirmation:
      "Your support request has been received. Forge will review school eligibility and need, with parent or guardian involvement. Qualification and a suitable donor match are still required; a laptop is not guaranteed.",
    steps: [
      {
        title: "Student and school",
        fields: [
          ...contact.map((field) => ({
            ...field,
            label:
              field.id === "name"
                ? "Your name (person making this request)"
                : field.label,
          })),
          {
            id: "requester",
            label: "I am the",
            options: ["Student", "Parent or guardian", "School representative"],
          },
          { id: "studentName", label: "Student name" },
          { id: "school", label: "School name" },
          {
            id: "class",
            label: "Secondary-school class",
            options: ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"],
          },
          {
            id: "schoolCategory",
            label: "School category",
            options: [
              "Public secondary school",
              "Low-income private secondary school",
            ],
          },
          {
            id: "location",
            label: "School town or city and state",
            hint: "Do not provide a home address.",
          },
        ],
      },
      {
        title: "Need and guardian involvement",
        fields: [
          {
            id: "purpose",
            label: "Support is for",
            options: ["Learning", "A student project for Forge review"],
          },
          {
            id: "reason",
            label: "How would a laptop help your learning or project?",
            type: "textarea",
            hint: "Describe the need and what you hope to learn or build. Do not include IDs, medical details or private documents.",
          },
          { id: "guardianName", label: "Parent or guardian name" },
          { id: "guardianRelationship", label: "Relationship to student" },
          {
            id: "guardianPhone",
            label: "Parent or guardian phone",
            type: "tel",
          },
          {
            id: "guardianEmail",
            label: "Parent or guardian email (optional)",
            type: "email",
            optional: true,
          },
          {
            id: "guardianInvolvement",
            label:
              "I understand that a parent or guardian must take part in verification and next steps. This request does not replace their participation or consent.",
            type: "checkbox",
          },
          {
            id: "training",
            label:
              "I understand that receiving support requires a commitment to a full year of training, to be discussed with the student and parent or guardian.",
            type: "checkbox",
          },
        ],
      },
    ],
  },
  school: {
    title: "Bring practical learning to school.",
    intro:
      "Tell us about your school. ElyTech is for primary schools and TechUp is for secondary schools. Forge will discuss the relevant programme and onboarding with your school.",
    subject: "TechUp / ElyTech — school programme enquiry",
    inquiryType: "schools",
    confirmation:
      "Your school enquiry has been received. Forge will review it and contact you to discuss the relevant programme and possible next steps. A programme place or start date has not been confirmed.",
    steps: [
      {
        title: "Your school",
        fields: [
          { id: "school", label: "School name" },
          {
            id: "level",
            label: "School level",
            options: ["Primary", "Secondary", "Both primary and secondary"],
          },
          { id: "location", label: "School town or city and state" },
        ],
      },
      {
        title: "Start a conversation",
        fields: [
          ...contact,
          { id: "role", label: "Your role at the school" },
          {
            id: "message",
            label: "What would you like to explore?",
            type: "textarea",
            hint: "Tell us about learners, current practical learning and what your school needs.",
          },
        ],
      },
    ],
  },
  talent: {
    title: "Build with Forge.",
    intro:
      "Offer your skills, time or support. This is an expression of interest, not a confirmed vacancy, placement or interview invitation.",
    subject: "Join Forge — applicant / contributor enquiry",
    inquiryType: "careers",
    confirmation:
      "Your expression of interest has been received for review. Forge may contact you about a relevant opportunity or conversation. No role, interview or placement has been promised.",
    steps: [
      {
        title: "Your contribution",
        fields: [
          ...contact,
          {
            id: "contribution",
            label: "How would you like to contribute?",
            options: [
              "Employment",
              "Instruction",
              "Volunteering",
              "Patronage",
              "Partnership",
            ],
          },
        ],
      },
      {
        title: "Your experience and availability",
        fields: [
          {
            id: "experience",
            label: "Relevant experience or support you can offer",
            type: "textarea",
          },
          {
            id: "availability",
            label: "Your availability and preferred commitment",
            type: "textarea",
            hint: "For example, hours each week, a possible start period, or the support you can commit.",
          },
          {
            id: "portfolio",
            label: "Public portfolio or website (optional)",
            type: "url",
            optional: true,
            hint: "Only share a public URL you are happy for Forge to review. No private documents or CV upload.",
          },
        ],
      },
    ],
  },
};
