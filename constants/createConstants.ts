export interface SectionConstants {
  title: string
  description: string
}

export interface CreateConstants {
  sections: SectionConstants[]
}

export const createConstants: CreateConstants = {
  sections: [
    {
      title: 'Category',
      description: 'Please choose a fitting category for your dugnad'
    },
    {
      title: 'Title and Description',
      description: 'Please create an informative description and a fitting title for your dugnad.'
    },
    {
      title: 'Place',
      description: 'Please provide the place where the dugnad will be happening.'
    },
    {
      title: 'Date and Time',
      description: 'Please provide the date and timeframe which you want to complete your dugnad.'
    },
    {
      title: 'People',
      description: 'Please inform us how many people you require to complete your dugnad.'
    },
    {
      title: 'Images (optional)',
      description: 'Provide some relevant images if you wish.'
    }
  ]
}

export interface Category {
  name: string
  iconName: string
  description: string
}

export const categoryConstants: Category[] = [
  {
    name: "Maintenance & Upkeep",
    iconName: "screwdriver-wrench",
    description: "Regular tasks that keep shared areas clean, functional, and in good condition.",
  },
  {
    name: "Beautification & Improvement",
    iconName: "seedling",
    description: "Projects that make the surroundings more welcoming and attractive.",
  },
  {
    name: "Safety & Accessibility",
    iconName: "shield-heart",
    description: "Efforts to ensure all spaces are safe and usable for everyone.",
  },
  {
    name: "Community Building",
    iconName: "people-group",
    description: "Activities that strengthen social bonds and promote collaboration.",
  },
  {
    name: "Environmental Sustainability",
    iconName: "leaf",
    description: "Initiatives focused on protecting nature and promoting sustainable living.",
  },
  {
    name: "Fundraising & Financial Support",
    iconName: "coins",
    description: "Events or tasks aimed at raising funds for shared goals or projects.",
  },
  {
    name: "Educational & Awareness",
    iconName: "lightbulb",
    description: "Activities that share knowledge, skills, or raise awareness within the community.",
  },
]

