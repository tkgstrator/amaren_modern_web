import { atom } from 'jotai'
import { z } from 'zod'
import { Member } from '../models/member.dto'
import { request } from '../requests/http'
import { MemberQuery } from '../requests/member'
// const members = atomWithSuspenseQuery((get) => ({
//   queryKey: ['category', 0],
//   queryFn: async () => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users')
//     return response.json()
//   }
// }))
const membersAtom = atom(async (get) => {
  const members = await request(new MemberQuery(), z.array(Member))
  return members
})

export { membersAtom }
