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
    },
    {
      title: 'Preview',
      description: 'See a preview of your dugnad'
    }
  ]
}

