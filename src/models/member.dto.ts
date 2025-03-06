import { z } from 'zod'

export const Member = z.object({
  id: z.number().int().min(0),
  name: z.string(),
  furigana: z.string(),
  registered: z.boolean(),
  games: z.number().int().min(0),
  rate: z.number().int().min(0),
  rate_history: z.array(z.number().int()),
  updated_at: z.string(),
  last_played: z.string(),
  area: z.string().nullable(),
  prefacture: z.string().nullable()
})
