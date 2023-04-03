export interface Cycle {
  id: string
  task: string
  minutes: number
  startDate: Date
  interruptedDate?: Date
  completedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}
export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  MARK_CURRENT_CYCLE_FINISHED = 'MARK_CURRENT_CYCLE_FINISHED',
}

export function CyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }
    case ActionTypes.INTERRUPT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    case ActionTypes.MARK_CURRENT_CYCLE_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, completedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }

    default:
      return state
  }
}
