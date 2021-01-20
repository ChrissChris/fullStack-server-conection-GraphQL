import React from "react"
import { useQuery, gql } from "@apollo/client"

const LANGUAGE_DATA = gql`
  query languareQuery {
    languages {
      id
      language
      loved
    }
  }
`

const GraphConnection = () => {
  const { data, loading, error } = useQuery(LANGUAGE_DATA)
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error 😅</p>
  }
  return (
    <div>
      {data.languages.length > 0 &&
        data.languages.map(({ id, language }) => {
          return (
            <div key={id}>
              <p>{language}</p>
            </div>
          )
        })}
    </div>
  )
}

export default GraphConnection
