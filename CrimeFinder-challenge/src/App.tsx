import { useState, useEffect, useRef } from 'react'
import { SearchComponent } from './components/SearchComponent'
import { Header } from './components/Header'
import './App.css'
import type { PostCodeData } from './types'
import axios, { type AxiosResponse } from 'axios'


function App() {
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const [submittedPostcodes, setSubmittedPostcodes] = useState('')
  const [results, setResults] = useState<PostCodeData[]>([])
 



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


  console.log(results)
  return (
    <>
      <Header />
      <div className="inputs">
        <SearchComponent inputValue={searchInputRef} onSubmit={handleSearch} />
      </div>
    </>
  )
}

export default App
