import { useContext, useEffect, useState } from 'react'
import { differenceInMinutes, formatDistance, subMinutes } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { HistoryContainer, HistoryList, Status } from './styles'
import { CyclesContext } from '../Home'
import { Cycle } from '../../reducers/reducer'

export function History() {
  const { cycles, saveCyclesInLocalStorage, loadCycles } =
    useContext(CyclesContext)
  // const [savedCycles, setCycles] = useState<Cycle[]>([])

  useEffect(() => {
    if (cycles.length === 0) return
    saveCyclesInLocalStorage()
  }, [cycles, saveCyclesInLocalStorage])

  useEffect(() => {
    const cyclesArray = localStorage.getItem('cyclesPomodoroArray')
    if (cyclesArray) {
      loadCycles(JSON.parse(cyclesArray))
    }
  }, [])

  const StatusColors = {
    yellow: 'yellow',
    green: 'green',
    red: 'red',
  } as const

  const statusOpt = {
    green: 'Concluído',
    red: 'Interrompido',
    yellow: 'Pausado',
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
            {cycles
              .slice(0)
              .reverse()
              .map((cycle) => {
                let statusColor: keyof typeof StatusColors = 'yellow'

                const dateDifference = differenceInMinutes(
                  new Date(),
                  new Date(cycle.startDate),
                )

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
                } else if (cycle.completedDate) {
                  statusColor = 'green'
                }

                return (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutes}</td>
                    <td>{date}</td>
                    <td>
                      <Status statusColor={StatusColors[statusColor]}>
                        {statusOpt[statusColor]}
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
