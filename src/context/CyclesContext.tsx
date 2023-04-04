import { ReactNode, createContext, useReducer, useState } from 'react'
import { Cycle, CyclesReducer } from '../reducers/reducer'
import {
  ActionTypes,
  addNewCycleAction,
  interruptCycleCycleAction,
  loadCyclesAction,
  markCycleFinishedAction,
} from '../reducers/cycles/actions'

interface CreateCycleData {
  task: string
  minutsAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCycle: () => void
  saveCyclesInLocalStorage: () => void
  loadCycles: (savedCycle: Cycle[]) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const [cycleState, dispatch] = useReducer(CyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const { cycles, activeCycleId } = cycleState

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutes: data.minutsAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }
  function interruptCycle() {
    dispatch(interruptCycleCycleAction())
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCycleFinishedAction())
  }

  function saveCyclesInLocalStorage() {
    const cyclesArray = JSON.stringify(cycles)
    localStorage.setItem('cyclesPomodoroArray', cyclesArray)
  }
  function loadCycles(savedCycles: Cycle[]) {
    dispatch(loadCyclesAction(savedCycles))
  }

  /*  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutes: data.minutsAmount,
      startDate: new Date(),
    }
    setCycles((prevState) => [...prevState, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

    // reset()
  } */

  /*  function interruptCycle() {
    setActiveCycleId(null)

    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  } */

  const activeCycle = cycleState.cycles.find(
    (cycle: Cycle) => cycle.id === cycleState.activeCycleId,
  )

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCycle,
        saveCyclesInLocalStorage,
        loadCycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
