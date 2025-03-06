import { EventRounded, HomeRounded, InfoOutlined, SearchRounded, SupportRounded } from '@mui/icons-material'
import {
  Box,
  GlobalStyles,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Sheet,
  Typography
} from '@mui/joy'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { RouteType } from '../enums/routes'

const RouteItem: React.FC<React.HTMLAttributes<HTMLDivElement> & { to: string; nested?: boolean }> = ({
  to,
  nested,
  children
}) => {
  const location = useLocation()
  const naviate = useNavigate()
  const isSelected = location.pathname === to

  return (
    <ListItem nested={nested}>
      <ListItemButton selected={isSelected} onClick={() => naviate(to)} className='select-none'>
        {children}
      </ListItemButton>
    </ListItem>
  )
}

const Sidebar: React.FC = () => {
  const { t } = useTranslation(['labels', 'routes'])
  return (
    <Sheet
      className='Sidebar'
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none'
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider'
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px'
            }
          }
        })}
      />
      <Box
        className='Sidebar-overlay'
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)'
          }
        }}
        onClick={() => {}}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton color='primary' size='sm'>
          <InfoOutlined />
        </IconButton>
        <Typography level='title-lg'>{t('title')}</Typography>
        {/* <ColorSchemeToggle sx={{ ml: 'auto' }} /> */}
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <List
          size='sm'
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm
          }}
        >
          <RouteItem to={RouteType.ROOT}>
            <HomeRounded />
            <ListItemContent>
              <Typography level='title-sm'>{t('home', { ns: 'routes' })}</Typography>
            </ListItemContent>
          </RouteItem>
          <RouteItem to={RouteType.SEARCH}>
            <SearchRounded />
            <ListItemContent>
              <Typography level='title-sm'>{t('search', { ns: 'routes' })}</Typography>
            </ListItemContent>
          </RouteItem>
          <RouteItem to={RouteType.EVENTS}>
            <EventRounded />
            <ListItemContent>
              <Typography level='title-sm'>{t('event', { ns: 'routes' })}</Typography>
            </ListItemContent>
          </RouteItem>
        </List>
        <List
          size='sm'
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRounded />
              <ListItemContent>
                <Typography level='title-sm'>{t('support', { ns: 'routes' })}</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  )
}

export default Sidebar
