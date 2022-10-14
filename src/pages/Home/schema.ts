import * as Zod from 'zod'

export const schemas = Zod.object({
  task: Zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: Zod.number().min(5).max(60),
})
