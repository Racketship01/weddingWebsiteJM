export interface Couple {
  readonly bride: string
  readonly groom: string
  readonly combined: string
}

export interface WeddingDate {
  readonly fullDate: string
  readonly weekday: string
  readonly month: string
  readonly day: string
  readonly year: string
  readonly isoDate: string
}

export interface Times {
  readonly arrival: string
  readonly ceremony: string
  readonly reception: string
}

export interface Address {
  readonly line1: string
  readonly city: string
  readonly full: string
  readonly mapsQuery: string
}

export interface Venues {
  readonly ceremony: {
    readonly name: string
    readonly time: string
    readonly mapsUrl: string
  }
  readonly reception: {
    readonly name: string
    readonly time: string
    readonly mapsUrl: string
  }
}

export interface TimelineEvent {
  readonly id: number
  readonly title: string
  readonly time: string
  readonly description: string
}

export interface EntouragePerson {
  readonly name: string
}

export interface EntourageGroup {
  readonly id: string
  readonly label: string
  readonly heading: string
  readonly people: readonly EntouragePerson[]
}

export interface PrincipalSponsors {
  readonly ninongs: readonly string[]
  readonly ninangs: readonly string[]
}

export interface ReminderCard {
  readonly id: number
  readonly title: string
  readonly description: string
}

export interface Reminders {
  readonly label: string
  readonly heading: string
  readonly cards: readonly ReminderCard[]
}

export interface CountdownConfig {
  readonly target: string
  readonly timezone: string
  readonly label: string
  readonly heading: string
  readonly doneMessage: string
}

export interface RsvpCopy {
  readonly label: string
  readonly heading: string
  readonly note: string
  readonly nameLabel: string
  readonly attendanceLabel: string
  readonly acceptOption: string
  readonly declineOption: string
  readonly messageLabel: string
  readonly submitLabel: string
  readonly submittingLabel: string
  readonly successTitle: string
  readonly successDescription: string
  readonly errorTitle: string
  readonly submitError: string
  readonly errorName: string
  readonly errorAttendance: string
}

export interface GiftsCopy {
  readonly label: string
  readonly heading: string
  readonly message: string
  readonly qrCaption: string
}

export interface DressCodeCopy {
  readonly heading: string
  readonly note: string
}

export interface FooterCopy {
  readonly headline: string
  readonly text: string
  readonly eventLabel: string
  readonly links: readonly { readonly label: string; readonly href: string }[]
  readonly copyright: string
}

export interface WeddingInfo {
  readonly couple: Couple
  readonly date: WeddingDate
  readonly times: Times
  readonly address: Address
  readonly venues: Venues
  readonly hashtag: string
  readonly invitationParagraph: string
  readonly heroSupporting: string
  readonly heroLabel: string
  readonly heroCta: string
  readonly detailsLabel: string
  readonly detailsHeading: string
  readonly detailsPhotoCaption: string
  readonly addToCalendarLabel: string
  readonly viewDirectionsLabel: string
  readonly message: {
    readonly label: string
    readonly heading: string
    readonly text: string
    readonly signature: string
  }
  readonly quote: readonly string[]
  readonly schedule: {
    readonly label: string
    readonly heading: string
    readonly supporting: string
    readonly events: readonly TimelineEvent[]
  }
  readonly entourage: {
    readonly label: string
    readonly heading: string
    readonly supporting: string
    readonly groups: readonly EntourageGroup[]
    readonly principalSponsors: PrincipalSponsors
    readonly other: {
      readonly ringBearer: string
      readonly flowerGirls: readonly string[]
    }
  }
  readonly gallery: {
    readonly label: string
    readonly heading: string
    readonly supporting: string
  }
  readonly venueSection: {
    readonly label: string
    readonly heading: string
    readonly supporting: string
    readonly ceremonyButton: string
    readonly receptionButton: string
  }
  readonly dressCode: DressCodeCopy
  readonly gifts: GiftsCopy
  readonly reminders: Reminders
  readonly rsvp: RsvpCopy
  readonly footer: FooterCopy
  readonly countdown: CountdownConfig
  readonly seo: {
    readonly title: string
    readonly description: string
  }
}

export const couple: Couple = {
  bride: 'Mariel',
  groom: 'Julius',
  combined: 'Julius & Mariel'
}

export const weddingDate: WeddingDate = {
  fullDate: 'Friday, November 27, 2026',
  weekday: 'FRIDAY',
  month: 'NOVEMBER',
  day: '27',
  year: '2026',
  isoDate: '2026-11-27'
}

export const times: Times = {
  arrival: '2:30 PM',
  ceremony: '3:00 PM',
  reception: '5:00 PM'
}

export const address: Address = {
  line1: '1630 San Marcelino St. Malate',
  city: 'Manila, Metro Manila, Philippines',
  full: '1630 San Marcelino St. Malate Manila, Metro Manila, Philippines',
  mapsQuery: '1630+San+Marcelino+St+Malate+Manila+Metro+Manila+Philippines'
}

export const venues: Venues = {
  ceremony: {
    name: 'Iglesia Ni Cristo, Lokal ng Paco',
    time: '3:00 PM',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Iglesia+Ni+Cristo+Lokal+ng+Paco+Manila'
  },
  reception: {
    name: 'Manila Events Place',
    time: '5:00 PM',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Manila+Events+Place+Manila'
  }
}

export const hashtag = '#JCfoundhisforeverMAR'

export const timelineEvents: readonly TimelineEvent[] = [
  {
    id: 1,
    title: 'Guest Arrival',
    time: '2:30 PM',
    description: 'Please arrive early so everyone can be seated comfortably before the ceremony.'
  },
  {
    id: 2,
    title: 'Wedding Ceremony',
    time: '3:00 PM',
    description: 'Iglesia Ni Cristo – Lokal ng Paco'
  },
  {
    id: 3,
    title: 'Wedding Reception',
    time: '5:00 PM',
    description: 'Manila Events Place'
  }
]

export const entourageGroups: readonly EntourageGroup[] = [
  {
    id: 'parents-bride',
    label: 'Parents of the Bride',
    heading: 'Parents of the Bride',
    people: [
      { name: 'Marg A. Morales' },
      { name: 'Chequito F. Morales' }
    ]
  },
  {
    id: 'parents-groom',
    label: 'Parents of the Groom',
    heading: 'Parents of the Groom',
    people: [
      { name: 'Myrna C. Cimafranca' },
      { name: 'Ambrosio G. Cimafranca' }
    ]
  },
  {
    id: 'maid-of-honor',
    label: 'Maid of Honor',
    heading: 'Maid of Honor',
    people: [{ name: 'Chery Mar M. Seña' }]
  },
  {
    id: 'best-man',
    label: 'Best Man',
    heading: 'Best Man',
    people: [{ name: 'Michael C. Cimafranca' }]
  },
  {
    id: 'bridesmaids',
    label: 'Bridesmaids',
    heading: 'Bridesmaids',
    people: [
      { name: 'Mary Jane L. Morales' },
      { name: 'Nicole M. De Luna' },
      { name: 'Eunicka Antonette D. Dy' },
      { name: 'Imelda S. Bumanlag' },
      { name: 'Donita Rose J. Cantona' },
      { name: 'Ida Bianca M. Flores' }
    ]
  },
  {
    id: 'groomsmen',
    label: 'Groomsmen',
    heading: 'Groomsmen',
    people: [
      { name: 'Kim Abram C. Zaide' },
      { name: 'King Immanuel C. Lintag' },
      { name: 'Lee Jay M. Mendiola' },
      { name: 'Gidheon Dave M. Martin' },
      { name: 'Jayson M. Baria' },
      { name: 'Kelvin P. Banguis' }
    ]
  }
]

export const principalSponsors: PrincipalSponsors = {
  ninongs: [
    'Mr. Angelito K. Cruz Jr.',
    'Mr. Romel C. Provido',
    'Mr. Franchi Janus D. Ladera',
    'Mr. Bernard R. Tolentino',
    'Mr. Rizaleo C. Valeriano',
    'Mr. Roden C. Bolos',
    'Mr. Warlito T. Viernes'
  ],
  ninangs: [
    'Mrs. Jennifer T. Go',
    'Mrs. Felicidad A. Dela Rosa',
    'Mrs. Adoracion F. Zafra',
    'Mrs. Jean R. Altobano',
    'Mrs. Susana B. Balanay',
    'Mrs. Marife A. Pato',
    'Mrs. Luningning Hilaga'
  ]
}

export const reminders: Reminders = {
  label: 'A few gentle reminders',
  heading: 'For Our Intimate Celebration',
  cards: [
    {
      id: 1,
      title: 'Strictly RSVP Only',
      description:
        'Due to limited venue capacity, we can only accommodate guests specifically named on the invitation.'
    },
    {
      id: 2,
      title: 'No Unlisted Plus Ones',
      description:
        'We respectfully request that only invited and confirmed guests attend the celebration.'
    },
    {
      id: 3,
      title: 'Adults-Only Celebration',
      description:
        'While we love your little ones, we kindly ask that our wedding remain an adults-only event.'
    }
  ]
}

export const countdown: CountdownConfig = {
  target: '2026-11-27T15:00:00+08:00',
  timezone: 'Asia/Manila',
  label: 'COUNTING DOWN TO FOREVER',
  heading: 'Until We Say \'I Do\'',
  doneMessage: 'Today is the day!'
}

export const weddingInfo: WeddingInfo = {
  couple,
  date: weddingDate,
  times,
  address,
  venues,
  hashtag,
  heroLabel: 'TOGETHER WITH THEIR FAMILIES',
  heroSupporting:
    'Invite you to witness their vows and celebrate the beginning of their forever.',
  heroCta: 'BEGIN THE CELEBRATION',
  invitationParagraph:
    'With grateful hearts, we invite you to share in the joy and celebration of our union. Your presence will make this day all the more meaningful as we say our vows before God and our loved ones.',
  detailsLabel: 'The celebration',
  detailsHeading: 'Wedding Details',
  detailsPhotoCaption: 'Our favorite chapter begins',
  addToCalendarLabel: 'ADD TO CALENDAR',
  viewDirectionsLabel: 'VIEW DIRECTIONS',
  message: {
    label: 'With joy',
    heading: 'We Would Be Honored by Your Presence',
    text:
      'As we exchange our vows and begin a lifetime together, we hope you will join us for a celebration filled with family, friendship, laughter, and love.',
    signature: 'Julius & Mariel'
  },
  quote: [
    'A love chosen',
    'every day,',
    'celebrated for a',
    'lifetime.'
  ],
  schedule: {
    label: 'Our wedding day',
    heading: 'A Beautiful Day Awaits',
    supporting: 'We look forward to sharing every meaningful moment with you.',
    events: timelineEvents
  },
  entourage: {
    label: 'SURROUNDED BY LOVE',
    heading: 'Our Wedding Entourage',
    supporting:
      'With the blessing and support of our families and dearest friends.',
    groups: entourageGroups,
    principalSponsors,
    other: {
      ringBearer: 'Czean Rhain L. Ladera',
      flowerGirls: ['Katharina Mier C. Rosana']
    }
  },
  gallery: {
    label: 'Soft moments in bloom',
    heading: 'Our Love Story',
    supporting: 'A glimpse into the journey that brought us here.'
  },
  venueSection: {
    label: 'Where to find us',
    heading: 'The Wedding Venues',
    supporting: address.full,
    ceremonyButton: 'OPEN CEREMONY MAP',
    receptionButton: 'OPEN RECEPTION ROUTE'
  },
  dressCode: {
    heading: 'Dress Code',
    note: 'Please celebrate with us in semi-formal or smart casual attire.'
  },
  gifts: {
    label: 'With gratitude',
    heading: 'Your Presence Is Our Greatest Gift',
    message:
      'Your love, laughter, and presence are all we truly wish for. Should you wish to bless us with a gift, a monetary contribution would mean so much as we build our future and create beautiful memories together as a family.',
    qrCaption: 'MONETARY GIFTS'
  },
  reminders,
  rsvp: {
    label: 'Kindly reply',
    heading: 'RSVP',
    note: 'Please respond as early as possible.',
    nameLabel: 'Full Name',
    attendanceLabel: 'Will you be joining us?',
    acceptOption: 'Joyfully accepts',
    declineOption: 'Regretfully declines',
    messageLabel: 'Leave a short message',
    submitLabel: 'SUBMIT RSVP',
    submittingLabel: 'SENDING…',
    successTitle: 'RSVP Confirmed',
    successDescription:
      'Thank you! Your response has been sent to us. We look forward to celebrating with you.',
    errorTitle: 'RSVP Not Sent',
    submitError: 'Something went wrong. Please try again or contact us directly.',
    errorName: 'Please enter your full name',
    errorAttendance: 'Please select your attendance'
  },
  footer: {
    headline: 'Julius & Mariel',
    text: 'We cannot wait to celebrate this beautiful beginning with you.',
    eventLabel: 'NOVEMBER 27, 2026 · MANILA CITY',
    links: [
      { label: 'Facebook', href: 'https://facebook.com' },
      { label: 'Email', href: 'mailto:wedding@example.com' },
      { label: 'Website', href: '#' }
    ],
    copyright: '© 2026 Julius & Mariel'
  },
  countdown,
  seo: {
    title: 'Julius & Mariel · November 27, 2026',
    description:
      'You are invited to the wedding of Julius and Mariel on Friday, November 27, 2026, in Paco, Manila City. Join us as we say our vows and celebrate our forever.'
  }
}

export default weddingInfo
