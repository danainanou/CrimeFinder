import type { CrimeData } from '../types'

interface CrimeOverviewProps {
  crimes: CrimeData[]
}

export function CrimeOverview({ crimes }: CrimeOverviewProps) {
  const crimesByCategory = crimes.reduce<Record<string, number>>((counts, crime) => {
    const category = crime.category ?? 'Unknown'
    counts[category] = (counts[category] ?? 0) + 1
    return counts
  }, {})

  const crimesByOutcome = crimes.reduce<Record<string, number>>((status, crime) => {
    const outcome = crime.outcome_status?.category ?? 'No outcome recorded'
    status[outcome] = (status[outcome] ?? 0) + 1
    return status
  }, {})

  return (
    <>
      {crimes.length > 0 && (
        <div className="overview">
          <div className="overview-cards">
            <h3 className="overview-card-title">Total Crimes</h3>
            <p className="overview-card-count">{crimes.length}</p>
          </div>

          <h3>Total number of offenses by category</h3>
          <div className="overview-categories">
            {Object.entries(crimesByCategory).map(([category, count]) => (
              <div key={category} className="overview-cards">
                <p className="overview-card-title">{category.replaceAll('-', ' ')}</p>
                <p className="overview-card-count">{count}</p>
              </div>
            ))}
          </div>

          <h3>Number of total outcomes</h3>
          <div className="overview-categories">
            {Object.entries(crimesByOutcome)
              .filter(([category]) => category !== 'No outcome recorded')
              .map(([category, count]) => (
                <div key={category} className="overview-cards">
                  <p className="overview-card-title">{category}</p>
                  <p className="overview-card-count">{count}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  )
}