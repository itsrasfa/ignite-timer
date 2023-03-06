import { TimerCycle } from '../../contexts/CyclesContext/types'

export type CyclesState = {
  cycles: TimerCycle[]
  activeCycle: string | null
}

export enum ActionTypes {
  'ADD_NEW_CYCLE' = 'ADD_NEW_CYCLE',
  'INTERRUPT_CURRENT_CYCLE' = 'INTERRUPT_CURRENT_CYCLE',
  'SET_CURRENT_CYCLE_AS_FINISHED' = 'SET_CURRENT_CYCLE_AS_FINISHED',
}