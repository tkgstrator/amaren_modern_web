import { Menu } from '@mui/icons-material'
import { GlobalStyles, IconButton, Sheet } from '@mui/joy'

const Header: React.FC = () => {
  return (
    <Sheet
      sx={{
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: 'var(--Header-height)',
        zIndex: 9995,
        p: 2,
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'background.level1'
        // boxShadow: 'sm'
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('md')]: {
              '--Header-height': '0px'
            }
          }
        })}
      />
      <IconButton onClick={() => {}} variant='outlined' color='neutral' size='sm'>
        <Menu />
      </IconButton>
    </Sheet>
  )
}

export default Header
