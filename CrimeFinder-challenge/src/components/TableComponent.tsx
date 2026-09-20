export type CrimeTableRow = {
  postcode: string
  date: string
  street: string
  crimeType: string
  outcomeStatus: string
}

interface TableComponentProps {
  data: CrimeTableRow[]
}

export function TableComponent({ data }: TableComponentProps) {
  return (
    <div className="table-wrapper">
      {data.length === 0 ? (
        <p>No crime data available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Postcode</th>
              <th>Date of crime</th>
              <th>Approximate street name</th>
              <th>Crime Type</th>
              <th>Outcome status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr key={`${row.postcode}-${row.date}-${row.street}-${index}`}>
                <td>{row.postcode}</td>
                <td>{row.date}</td>
                <td>{row.street}</td>
                <td>{row.crimeType}</td>
                <td>{row.outcomeStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
