import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export const formatDate = (rawDate: string) => {
  const date = new Date(rawDate)
  return format(date, "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR
  })
}
