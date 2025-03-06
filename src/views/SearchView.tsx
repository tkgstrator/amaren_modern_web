import { useAtomValue } from 'jotai'
import { membersAtom } from '../utils/atoms'

const SearchView: React.FC = () => {
  const members = useAtomValue(membersAtom)
  return <>{members.length}</>
}

export default SearchView
