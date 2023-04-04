import { useContext, useEffect, useState } from 'react'
import {
  differenceInMinutes,
  formatDistance,
  subDays,
  subMinutes,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { HistoryContainer, HistoryList, Status } from './styles'
import { CyclesContext } from '../Home'
import { Cycle } from '../../reducers/reducer'

export function History() {
  const { cycles, saveCyclesInLocalStorage } = useContext(CyclesContext)
  const [savedCycles, setCycles] = useState<Cycle[]>([])

  useEffect(() => {
    if (cycles.length === 0) return
    saveCyclesInLocalStorage()
  }, [cycles, saveCyclesInLocalStorage])

  useEffect(() => {
    const cyclesArray = localStorage.getItem('cyclesPomodoroArray')

    if (cyclesArray) {
      setCycles(JSON.parse(cyclesArray))
    }
  }, [])

  const StatusColors = {
    yellow: 'yellow',
    green: 'green',
    red: 'red',
  } as const
  interface StatusIndex {
    statusColor: keyof typeof StatusColors
  }

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {savedCycles.map((cycle) => {
              let statusColor: keyof typeof StatusColors = 'yellow'
              let statusText = 'Andamento'
              const dateDifference = differenceInMinutes(
                new Date(),
                new Date(cycle.startDate),
              )
              console.log(dateDifference)
              const date = formatDistance(
                subMinutes(new Date(), dateDifference),
                new Date(),
                {
                  addSuffix: true,
                  locale: ptBR,
                },
              )

              if (cycle.interruptedDate) {
                statusColor = 'red'
                statusText = 'Interrompido'
              } else if (cycle.completedDate) {
                statusColor = 'green'
                statusText = 'Concluído'
              }

              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutes}</td>
                  <td>{date}</td>
                  <td>
                    <Status statusColor={StatusColors[statusColor]}>
                      {statusText}
                    </Status>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
