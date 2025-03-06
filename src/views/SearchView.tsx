import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { Box, Button, Table } from '@mui/joy'
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton'
import { useMediaQuery } from '@mui/material'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import NavigationHeader from '../components/Navigation'
import type { Member } from '../models/member.dto'
import { membersAtom } from '../utils/atoms'

const Pagination: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    pageNo: number
    maxPageNo: number
    goTo: (pageNo: number) => void
  }
> = ({ pageNo, maxPageNo, goTo }) => {
  const { t } = useTranslation('labels')

  const pageSize: number = useMediaQuery((theme) => theme.breakpoints.down('sm')) ? 5 : 7
  // const { pageNo, maxPageNo, goTo, goPrev, goNext } = createUser()

  const pages: number[] =
    maxPageNo > pageSize
      ? pageNo < pageSize >> 1
        ? Array.from({ length: pageSize }, (_, i) => i + 1)
        : pageNo + ((pageSize >> 1) + 1) > maxPageNo
          ? Array.from({ length: pageSize }, (_, i) => i + maxPageNo - (pageSize - 1))
          : Array.from({ length: pageSize }, (_, i) => i + pageNo - ((pageSize >> 1) - 1))
      : Array.from({ length: maxPageNo }, (_, i) => i + 1)

  return (
    <Box
      sx={{
        pt: 2,
        gap: 1,
        [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
        display: 'flex',
        // display: {
        //   xs: 'none',
        //   md: 'flex'
        // },
        fontFeatureSettings: "'tnum;', 'lnum'"
      }}
    >
      <Button
        size='sm'
        variant='outlined'
        color='neutral'
        startDecorator={<KeyboardArrowLeft />}
        onClick={() => goTo(Math.max(0, pageNo - 1))}
      >
        {t('prev')}
      </Button>

      <Box sx={{ flex: 1 }} />
      {pages.map((page) => (
        <IconButton
          key={page}
          size='sm'
          variant={pageNo + 1 === Number(page) ? 'solid' : 'outlined'}
          color='primary'
          onClick={() => goTo(page - 1)}
        >
          {page}
        </IconButton>
      ))}
      <Box sx={{ flex: 1 }} />
      <Button
        size='sm'
        variant='outlined'
        color='neutral'
        endDecorator={<KeyboardArrowRight />}
        onClick={() => goTo(Math.min(maxPageNo - 1, pageNo + 1))}
      >
        {t('next')}
      </Button>
    </Box>
  )
}

const TableHead: React.FC<{
  onSort: (field: keyof Member) => void
}> = ({ onSort }) => {
  const { t } = useTranslation('table')
  const headers: { field: keyof Member; label: string }[] = [
    // { field: 'rank', label: t('rank') },
    // { field: 'name', label: t('name') },
    // { field: 'prefacture', label: t('prefacture') },
    { field: 'games', label: t('games') },
    { field: 'win_rate', label: t('win_rate') },
    { field: 'rate', label: t('rating') }
  ]
  return (
    <thead>
      <tr>
        <th className='w-[48px] md:w-[80px]'>{t('rank')}</th>
        <th>{t('name')}</th>
        <th>{t('prefacture')}</th>
        {headers.map(({ field, label }) => (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <th key={field} onClick={() => onSort(field)} className='cursor-pointer'>
            {label}
          </th>
        ))}
      </tr>
    </thead>
  )
}

const TableBody: React.FC<{ members: Member[]; pageNo: number }> = ({ members, pageNo }) => {
  return (
    <tbody className='monospaced font-bold'>
      {members.slice(pageNo * 100, (pageNo + 1) * 100).map((member, index) => {
        return (
          <tr key={member.id}>
            <td>{pageNo * 100 + index + 1}</td>
            <td>{member.name}</td>
            <td>{member.prefacture}</td>
            <td>{member.games}</td>
            <td>
              {member.win_rate.toLocaleString('ja-JP', {
                style: 'percent',
                maximumFractionDigits: 1,
                minimumFractionDigits: 1
              })}
            </td>
            <td>{member.rate}</td>
          </tr>
        )
      })}
    </tbody>
  )
}

const SearchView: React.FC = () => {
  const _members = useAtomValue(membersAtom)
  const isMobile: boolean = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const [pageNo, setPageNo] = useState<number>(0)

  const [field, setField] = useState<keyof Member>('rate')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')

  const members = [..._members].sort((a, b) => {
    // @ts-ignore
    return order === 'asc' ? (a[field] > b[field] ? 1 : -1) : b[field] > a[field] ? 1 : -1
  })

  const handleOnSort = (_field: keyof Member) => {
    setOrder((prev) => (field === _field ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'))
    setField(_field)
  }

  const handleGoTo = (pageNo: number) => {
    setPageNo(pageNo)
  }

  return (
    <>
      <NavigationHeader>
        <Table size={isMobile ? 'sm' : 'md'}>
          <TableHead onSort={handleOnSort} />
          <TableBody members={members} pageNo={pageNo} />
        </Table>
        <Pagination pageNo={pageNo} maxPageNo={Math.ceil(_members.length / 100)} goTo={handleGoTo} />
      </NavigationHeader>
    </>
  )
}

export default SearchView
