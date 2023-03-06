import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'

import { CyclesContext } from '../../contexts/CyclesContext'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'
import { schemas } from './schema'
import { FormValues } from './types'
import * as S from './styles'

export function Home() {
  const { activeCycle, createNewCycle, interrupetCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<FormValues>({
    resolver: zodResolver(schemas),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, reset, watch } = newCycleForm

  const handleCreateNewCycle = (data: FormValues) => {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isEmpty = !task

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <S.StopCountdownButton onClick={interrupetCurrentCycle} type="button">
            <HandPalm size={22} />
            Interromper
          </S.StopCountdownButton>
        ) : (
          <S.StartCountdownButton disabled={isEmpty} type="submit">
            <Play size={22} />
            Começar
          </S.StartCountdownButton>
        )}
      </form>
    </S.HomeContainer>
  )
}
