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
      title: 'Kategori',
      description: 'Vennligst velg en passende kategori for dugnaden'
    },
    {
      title: 'Tittel og beskrivelse',
      description: 'Beskriv dugnaden, hvorfor den arrangeres, mål, og arbeidsoppgaver'
    },
    {
      title: 'Sted',
      description: 'Vennlist fortell hvor dugnaden skal arrangeres'
    },
    {
      title: 'Dato og tidspunkt',
      description: 'Vennligst fortell når dugnaden skal arrangeres'
    },
    {
      title: 'Deltagere',
      description: 'Vennglist fortell hvor mange deltagere som ønskes'
    },
    {
      title: 'Bilder (Valgfritt)',
      description: 'Legg til noen biler som er relevante til dugnaden'
    },
    {
      title: 'Forhåndvisning',
      description: 'Her er dugnaden din. Om du er fornøyd kan du publisere'
    }
  ]
}

