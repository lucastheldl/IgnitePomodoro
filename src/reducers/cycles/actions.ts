import { Cycle } from '../reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  MARK_CURRENT_CYCLE_FINISHED = 'MARK_CURRENT_CYCLE_FINISHED',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}
export function interruptCycleCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CYCLE,
  }
}
export function markCycleFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_FINISHED,
  }
}
