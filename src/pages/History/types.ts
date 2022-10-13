export const statusColors = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const

export type StatusProps = {
  statusColor: keyof typeof statusColors
}
