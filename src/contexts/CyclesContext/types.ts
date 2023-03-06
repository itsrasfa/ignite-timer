export type TimerCycle = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export type FormValues = {
  task: string
  minutesAmount: number
}

export type CyclesContextType = {
  activeTimerCycle: TimerCycle | undefined
  activeCycle: string | null
  amountSecondsPassed: number
  cycles: TimerCycle[] | undefined
  setCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: FormValues) => void
  interrupetCurrentCycle: () => void
}
