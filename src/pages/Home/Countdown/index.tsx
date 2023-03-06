import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../contexts/CyclesContext'
import * as S from './styles'

export function Countdown() {
  const {
    activeTimerCycle,
    setCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed: setAmountSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeTimerCycle
    ? activeTimerCycle.minutesAmount * 60
    : 0

  const currentSeconds = activeTimerCycle
    ? totalSeconds - amountSecondsPassed
    : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeTimerCycle) document.title = `${minutes}:${seconds}`
  }, [activeTimerCycle, minutes, seconds])

  useEffect(() => {
    let interval: number

    if (activeTimerCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeTimerCycle.startDate),
        )
        if (secondsDifference >= totalSeconds) {
          setCurrentCycleAsFinished()
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [
    activeTimerCycle,
    setAmountSecondsPassed,
    setCurrentCycleAsFinished,
    totalSeconds,
  ])
  return (
    <S.CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <S.Separator>:</S.Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </S.CountdownContainer>
  )
}
