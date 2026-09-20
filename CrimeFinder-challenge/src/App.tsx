import { useState, useEffect, useRef } from 'react'
import { SearchComponent } from './components/SearchComponent'
import { DatePickerComponent } from './components/DatePickerComponent'
import { Header } from './components/Header'
import './App.css'
import type { PostCodeData, CrimeData } from './types'
import axios, { type AxiosResponse } from 'axios'
import dayjs from 'dayjs'


function App() {
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const [submittedPostcodes, setSubmittedPostcodes] = useState('')
  const [datePickerDate, setdatePickerDate] = useState<dayjs.Dayjs | null>(dayjs())
  const [results, setResults] = useState<PostCodeData[]>([])
  const [crimeResults, setCrimeResults] = useState<CrimeData[]>([])


  function handleSearch(value: string) {
    setSubmittedPostcodes(value)
  }

  useEffect(() => {
      const requestPostcodes = submittedPostcodes
        .split(',')
        .map(postcode => postcode.trim())
        .filter(Boolean)

      if (requestPostcodes.length === 0) {
          return
      }

      const controller = new AbortController()

      const getPostcodeData = async () => {

          try {
            const responses = await Promise.allSettled(
        requestPostcodes.map(postcode =>
                  axios.get<PostCodeData>(
                      `http://api.getthedata.com/postcode/${encodeURIComponent(postcode)}`,
                      { signal: controller.signal }
                  )
                )
              )

              const fulfilledResponses = responses.filter(
      (response): response is PromiseFulfilledResult<AxiosResponse<PostCodeData>> =>
                response.status === 'fulfilled'
              )

              setResults(fulfilledResponses.map(response => response.value.data))

              
          } catch (error) {
              if (axios.isCancel(error)) {
                  return
              }
              setResults([])
          }
      }

      getPostcodeData()

      return () => {
          controller.abort()
      }
  }, [submittedPostcodes]);

useEffect(() => {
  const controller = new AbortController()

  const getCrimeData = async () => {

      if (results.length === 0) {
        setCrimeResults([])
        return
      }

    try {
      const responses = await Promise.allSettled(
        results.map(result => {
          const { latitude, longitude } = result.data

          return axios.get<CrimeData[]>(
            `https://data.police.uk/api/crimes-street/all-crime?date=${datePickerDate.format('YYYY-MM')}&lat=${encodeURIComponent(latitude)}&lng=${encodeURIComponent(longitude)}`,
            { signal: controller.signal }
          )

        })
      )
      const crimes = responses
        .filter(
          (response): response is PromiseFulfilledResult<AxiosResponse<CrimeData[]>> =>
            response.status === 'fulfilled'
        )
        .flatMap(response => response.value.data)

      setCrimeResults(crimes)
    } catch (error) {
      if (!axios.isCancel(error)) {
          return
      }
    }
  }

  getCrimeData()

  return () => controller.abort()
}, [results, datePickerDate])

  return (
    <>
      <Header />
      <div className="inputs">
        <SearchComponent inputValue={searchInputRef} onSubmit={handleSearch} />
        <DatePickerComponent datePickerValue={datePickerDate} onChange={(newValue) => setdatePickerDate(newValue ?? dayjs())} />
      </div>

      {(!submittedPostcodes || !datePickerDate) && <p>Enter a date and a postcode to search.</p>}
    </>
  )
}

export default App
