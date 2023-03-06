import {
  createContext,
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { CyclesContextType, FormValues, TimerCycle } from './types'
import { cyclesReducer } from '../../reducers/cycles/reducer'
import { ActionTypes } from '../../reducers/cycles/types'
import { differenceInSeconds } from 'date-fns'

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: PropsWithChildren) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycle: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state',
      )
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )
  const { cycles, activeCycle } = cyclesState

  const activeTimerCycle = cycles.find((cycles) => cycles.id === activeCycle)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeTimerCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(activeTimerCycle.startDate),
      )
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state', stateJSON)
  }, [cyclesState])

  const setCurrentCycleAsFinished = () => {
    dispatch({
      type: ActionTypes.SET_CURRENT_CYCLE_AS_FINISHED,
      payload: { activeCycle },
    })
  }

  const setSecondsPassed = (seconds: number) => {
    return setAmountSecondsPassed(seconds)
  }

  const createNewCycle = (data: FormValues) => {
    const id = Math.random().toString()
    const newTimerCycle: TimerCycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: { newTimerCycle },
    })

    setAmountSecondsPassed(0)
  }

  const interrupetCurrentCycle = () => {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: { activeCycle },
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        activeTimerCycle,
        setCurrentCycleAsFinished,
        activeCycle,
        cycles,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interrupetCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
