import { Team } from "./team";

export const teamData: Team[] = [
  {
    id: "office-bearers",
    name: "Office Bearers",
    description:
      "The leadership team that guides our organization's vision and strategic direction.",
    heads: [
      {
        id: "ob-head-1",
        name: "Alex Morgan",
        position: "President",
        avatar: "/images/team/alex-morgan.jpg",
        bio: "Passionate leader with 5+ years of experience driving organizational success.",
        social: {
          linkedin: "https://linkedin.com/in/alex-morgan",
          email: "alex.morgan@example.com",
        },
      },
      {
        id: "ob-head-2",
        name: "Jamie Chen",
        position: "Vice President",
        avatar: "/images/team/jamie-chen.jpg",
        bio: "Strategic thinker focused on organizational growth and community engagement.",
        social: {
          github: "https://github.com/jamiechen",
          linkedin: "https://linkedin.com/in/jamie-chen",
        },
      },
      {
        id: "ob-head-3",
        name: "Taylor Williams",
        position: "Secretary",
        avatar: "/images/team/taylor-williams.jpg",
        bio: "Detail-oriented professional ensuring smooth organizational operations.",
        social: {
          linkedin: "https://linkedin.com/in/taylor-williams",
          email: "taylor@example.com",
        },
      },
    ],
    members: [
      {
        id: "ob-mem-1",
        name: "Jordan Smith",
        position: "Treasurer",
        bio: "Financial expert managing our organization's resources efficiently.",
      },
      {
        id: "ob-mem-2",
        name: "Casey Lee",
        position: "Events Coordinator",
        bio: "Creative planner organizing engaging community events.",
      },
      {
        id: "ob-mem-3",
        name: "Sam Patel",
        position: "Membership Officer",
        bio: "Dedicated to growing and supporting our member community.",
      },
    ],
  },
  {
    id: "design-team",
    name: "Design Team",
    description:
      "Creative minds who shape our visual identity and user experiences.",
    heads: [
      {
        id: "design-head-1",
        name: "Riley Johnson",
        position: "Lead Designer",
        avatar: "/images/team/riley-johnson.jpg",
        bio: "Award-winning designer with expertise in brand identity and UX/UI design.",
        social: {
          linkedin: "https://linkedin.com/in/riley-johnson",
          twitter: "https://twitter.com/rileyjdesign",
        },
      },
      {
        id: "design-head-2",
        name: "Morgan Zhang",
        position: "UI/UX Lead",
        avatar: "/images/team/morgan-zhang.jpg",
        bio: "User experience specialist focused on creating intuitive and accessible designs.",
        social: {
          github: "https://github.com/morganzhang",
          linkedin: "https://linkedin.com/in/morgan-zhang",
        },
      },
      {
        id: "design-head-3",
        name: "Avery Wilson",
        position: "Brand Design Lead",
        avatar: "/images/team/avery-wilson.jpg",
        bio: "Creative strategist developing cohesive brand identities and visual languages.",
        social: {
          linkedin: "https://linkedin.com/in/avery-wilson",
          twitter: "https://twitter.com/averywdesigns",
        },
      },
    ],
    members: [
      {
        id: "design-mem-1",
        name: "Cameron Lopez",
        position: "Graphic Designer",
        bio: "Visual storyteller with a passion for illustration and typography.",
      },
      {
        id: "design-mem-2",
        name: "Quinn Mitchell",
        position: "Motion Designer",
        bio: "Animation specialist bringing static designs to life.",
      },
      {
        id: "design-mem-3",
        name: "Drew Carter",
        position: "UI Designer",
        bio: "Detail-oriented designer crafting beautiful user interfaces.",
      },
      {
        id: "design-mem-4",
        name: "Jesse Kim",
        position: "UX Researcher",
        bio: "Data-driven researcher informing design decisions through user insights.",
      },
    ],
  },
  {
    id: "tech-team",
    name: "Tech Team",
    description:
      "Innovative developers building and maintaining our digital infrastructure.",
    heads: [
      {
        id: "tech-head-1",
        name: "Jordan Rivera",
        position: "Tech Lead",
        avatar: "/images/team/jordan-rivera.jpg",
        bio: "Full-stack developer with expertise in scalable architecture and system design.",
        social: {
          github: "https://github.com/jrivera",
          linkedin: "https://linkedin.com/in/jordan-rivera",
        },
      },
      {
        id: "tech-head-2",
        name: "Skyler Patel",
        position: "DevOps Lead",
        avatar: "/images/team/skyler-patel.jpg",
        bio: "Infrastructure specialist focused on CI/CD pipelines and cloud solutions.",
        social: {
          github: "https://github.com/skylerpatel",
          linkedin: "https://linkedin.com/in/skyler-patel",
        },
      },
    ],
    members: [
      {
        id: "tech-mem-1",
        name: "Parker Jefferson",
        position: "Frontend Developer",
        bio: "React specialist creating responsive and accessible user interfaces.",
      },
      {
        id: "tech-mem-2",
        name: "Rowan Chen",
        position: "Backend Developer",
        bio: "API architect specializing in efficient data processing and storage solutions.",
      },
      {
        id: "tech-mem-3",
        name: "Lane Diaz",
        position: "Mobile Developer",
        bio: "Cross-platform developer building native experiences for iOS and Android.",
      },
      {
        id: "tech-mem-4",
        name: "Reese Gupta",
        position: "QA Engineer",
        bio: "Quality assurance specialist ensuring reliable and bug-free applications.",
      },
      {
        id: "tech-mem-5",
        name: "Kai Thompson",
        position: "Data Engineer",
        bio: "Big data specialist working on data pipelines and analytics infrastructure.",
      },
    ],
  },
  {
    id: "management-team",
    name: "Management Team",
    description:
      "Organized professionals coordinating operations and ensuring project success.",
    heads: [
      {
        id: "mgmt-head-1",
        name: "Charlie Nguyen",
        position: "Project Management Lead",
        avatar: "/images/team/charlie-nguyen.jpg",
        bio: "PMP-certified manager with expertise in Agile methodologies and team coordination.",
        social: {
          linkedin: "https://linkedin.com/in/charlie-nguyen",
          email: "charlie@example.com",
        },
      },
      {
        id: "mgmt-head-2",
        name: "Dakota Silva",
        position: "Operations Lead",
        avatar: "/images/team/dakota-silva.jpg",
        bio: "Operations specialist focused on process optimization and resource allocation.",
        social: {
          linkedin: "https://linkedin.com/in/dakota-silva",
          email: "dakota@example.com",
        },
      },
    ],
    members: [
      {
        id: "mgmt-mem-1",
        name: "Elliott Park",
        position: "Project Manager",
        bio: "Deadline-driven manager ensuring on-time delivery of key initiatives.",
      },
      {
        id: "mgmt-mem-2",
        name: "Harper Johnson",
        position: "Resource Coordinator",
        bio: "Logistics specialist optimizing resource allocation across projects.",
      },
      {
        id: "mgmt-mem-3",
        name: "Bailey Martinez",
        position: "Quality Manager",
        bio: "Standards expert ensuring deliverables meet quality requirements.",
      },
    ],
  },
  {
    id: "pr-outreach-team",
    name: "PR & Outreach Team",
    description:
      "Communications experts who connect our organization with the wider community.",
    heads: [
      {
        id: "pr-head-1",
        name: "Finley Adams",
        position: "PR Lead",
        avatar: "/images/team/finley-adams.jpg",
        bio: "Communications specialist crafting our public narrative and media presence.",
        social: {
          linkedin: "https://linkedin.com/in/finley-adams",
          twitter: "https://twitter.com/finleyadams",
        },
      },
      {
        id: "pr-head-2",
        name: "Reagan Wilson",
        position: "Community Outreach Lead",
        avatar: "/images/team/reagan-wilson.jpg",
        bio: "Relationship builder connecting our organization with partners and communities.",
        social: {
          linkedin: "https://linkedin.com/in/reagan-wilson",
          email: "reagan@example.com",
        },
      },
    ],
    members: [
      {
        id: "pr-mem-1",
        name: "Sawyer Kim",
        position: "Media Relations Specialist",
        bio: "Press contact maintaining relationships with journalists and media outlets.",
      },
      {
        id: "pr-mem-2",
        name: "Phoenix Garcia",
        position: "Event Coordinator",
        bio: "Logistics expert organizing community events and outreach activities.",
      },
      {
        id: "pr-mem-3",
        name: "Ellis Rahman",
        position: "Public Speaker",
        bio: "Charismatic communicator representing our organization at external events.",
      },
      {
        id: "pr-mem-4",
        name: "Blair Thompson",
        position: "Partnership Manager",
        bio: "Strategic relationship builder developing collaborative opportunities.",
      },
    ],
  },
  {
    id: "multimedia-team",
    name: "Multimedia Team",
    description:
      "Creative visual storytellers bringing our message to life through various media formats.",
    heads: [
      {
        id: "mm-head-1",
        name: "Hayden Patel",
        position: "Video Production Lead",
        avatar: "/images/team/hayden-patel.jpg",
        bio: "Award-winning filmmaker with expertise in documentary and promotional content.",
        social: {
          linkedin: "https://linkedin.com/in/hayden-patel",
          twitter: "https://twitter.com/haydenpfilms",
        },
      },
      {
        id: "mm-head-2",
        name: "Jules Rodriguez",
        position: "Photography Lead",
        avatar: "/images/team/jules-rodriguez.jpg",
        bio: "Visual artist specializing in event photography and portraiture.",
        social: {
          linkedin: "https://linkedin.com/in/jules-rodriguez",
          twitter: "https://twitter.com/julesrodphoto",
        },
      },
      {
        id: "mm-head-3",
        name: "Logan Chen",
        position: "Audio Production Lead",
        avatar: "/images/team/logan-chen.jpg",
        bio: "Sound design specialist with background in podcast production and music.",
        social: {
          linkedin: "https://linkedin.com/in/logan-chen",
          twitter: "https://twitter.com/logancaudio",
        },
      },
    ],
    members: [
      {
        id: "mm-mem-1",
        name: "Blake Wilson",
        position: "Videographer",
        bio: "Cinematographer capturing compelling visual stories through video.",
      },
      {
        id: "mm-mem-2",
        name: "Morgan Lee",
        position: "Editor",
        bio: "Post-production specialist crafting polished final products from raw footage.",
      },
      {
        id: "mm-mem-3",
        name: "Peyton Sharma",
        position: "Graphic Artist",
        bio: "Visual designer creating custom graphics for multimedia projects.",
      },
      {
        id: "mm-mem-4",
        name: "Ryan Garcia",
        position: "Podcast Producer",
        bio: "Audio specialist managing our podcast production from concept to publication.",
      },
    ],
  },
  {
    id: "content-team",
    name: "Content Team",
    description:
      "Skilled writers and editors developing engaging content across all our platforms.",
    heads: [
      {
        id: "content-head-1",
        name: "Emery Williams",
        position: "Content Strategy Lead",
        avatar: "/images/team/emery-williams.jpg",
        bio: "Content strategist aligning our messaging with organizational goals and audience needs.",
        social: {
          linkedin: "https://linkedin.com/in/emery-williams",
          twitter: "https://twitter.com/emerywrites",
        },
      },
      {
        id: "content-head-2",
        name: "Sage Thompson",
        position: "Editorial Lead",
        avatar: "/images/team/sage-thompson.jpg",
        bio: "Former journalist maintaining editorial standards and content quality.",
        social: {
          linkedin: "https://linkedin.com/in/sage-thompson",
          twitter: "https://twitter.com/sagethompson",
        },
      },
    ],
    members: [
      {
        id: "content-mem-1",
        name: "Erin Johnson",
        position: "Staff Writer",
        bio: "Versatile writer creating engaging content across various formats and topics.",
      },
      {
        id: "content-mem-2",
        name: "Riley Park",
        position: "Copy Editor",
        bio: "Detail-oriented editor ensuring polished, error-free content.",
      },
      {
        id: "content-mem-3",
        name: "Jaden Garcia",
        position: "SEO Specialist",
        bio: "Search optimization expert maximizing content visibility and reach.",
      },
      {
        id: "content-mem-4",
        name: "Cameron Lee",
        position: "Technical Writer",
        bio: "Specialized writer translating complex information into accessible content.",
      },
      {
        id: "content-mem-5",
        name: "Taylor Singh",
        position: "Content Researcher",
        bio: "Data-driven researcher providing factual foundation for content creation.",
      },
    ],
  },
  {
    id: "social-media-team",
    name: "Social Media Team",
    description:
      "Digital communicators managing our presence across various social platforms.",
    heads: [
      {
        id: "social-head-1",
        name: "Alex Rivera",
        position: "Social Media Lead",
        avatar: "/images/team/alex-rivera.jpg",
        bio: "Digital marketing specialist with expertise in social strategy and community building.",
        social: {
          linkedin: "https://linkedin.com/in/alex-rivera",
          twitter: "https://twitter.com/alexrivera",
        },
      },
      {
        id: "social-head-2",
        name: "Jordan Taylor",
        position: "Content Creation Lead",
        avatar: "/images/team/jordan-taylor.jpg",
        bio: "Creative content developer skilled in viral marketing and audience engagement.",
        social: {
          linkedin: "https://linkedin.com/in/jordan-taylor",
          twitter: "https://twitter.com/jordantcreates",
        },
      },
    ],
    members: [
      {
        id: "social-mem-1",
        name: "Casey Johnson",
        position: "Instagram Manager",
        bio: "Visual storyteller specializing in Instagram content and engagement.",
      },
      {
        id: "social-mem-2",
        name: "Morgan Lee",
        position: "Twitter Specialist",
        bio: "Conversation starter managing our Twitter presence and community interactions.",
      },
      {
        id: "social-mem-3",
        name: "Quinn Smith",
        position: "LinkedIn Coordinator",
        bio: "Professional networking expert developing our industry presence and connections.",
      },
      {
        id: "social-mem-4",
        name: "Riley Patel",
        position: "TikTok Creator",
        bio: "Trend-savvy content creator building our presence on emerging platforms.",
      },
      {
        id: "social-mem-5",
        name: "Taylor Garcia",
        position: "Analytics Specialist",
        bio: "Data analyst tracking performance metrics and optimizing social strategies.",
      },
      {
        id: "social-mem-6",
        name: "Jordan Wilson",
        position: "Community Manager",
        bio: "Engagement specialist fostering positive community interactions across platforms.",
      },
    ],
  },
];
