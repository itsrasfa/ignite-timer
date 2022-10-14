import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schemas } from './schema'
import * as S from './styles'

export function Home() {
  const { register, handleSubmit, reset, watch } = useForm({
    resolver: zodResolver(schemas),
  })

  const task = watch('task')
  const isEmpty = !task

  const handleCreateNewCycle = (data: any) => {
    reset()
  }

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <S.FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <S.TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1"></option>
            <option value="Projeto 2"></option>
            <option value="Projeto 3"></option>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <S.MinutesAmountInput
            type="number"
            id="minutesAmount"
            step={5}
            placeholder="00"
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </S.FormContainer>

        <S.CountdownContainer>
          <span>0</span>
          <span>0</span>
          <S.Separator>:</S.Separator>
          <span>0</span>
          <span>0</span>
        </S.CountdownContainer>

        <S.StartCountdownButton disabled={isEmpty} type="submit">
          <Play size={22} />
          Começar
        </S.StartCountdownButton>
      </form>
    </S.HomeContainer>
  )
}
