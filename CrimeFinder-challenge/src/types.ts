export type PostCodeData = {
  data: {
    latitude: string
    longitude: string
  }
}

export type CrimeData = {
  category: string
  month: string
  location: {
    latitude: string
    longitude: string
    street: {
      name: string
    }
  }
  outcome_status: {
    category: string
    date: string
  } | null
}