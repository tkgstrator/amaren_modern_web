import {
  BrightnessAutoRounded,
  CloseRounded,
  DashboardRounded,
  HomeRounded,
  LogoutRounded,
  QuestionAnswerRounded,
  SearchRounded,
  SettingsRounded,
  ShoppingCartRounded,
  SupportRounded
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  GlobalStyles,
  IconButton,
  Input,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Sheet,
  Stack,
  Typography
} from '@mui/joy'
import { useTranslation } from 'react-i18next'

const Sidebar: React.FC = () => {
  const { t } = useTranslation()
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
        <IconButton variant='soft' color='primary' size='sm'>
          <BrightnessAutoRounded />
        </IconButton>
        <Typography level='title-lg'>{t('labels.title')}</Typography>
        {/* <ColorSchemeToggle sx={{ ml: 'auto' }} /> */}
      </Box>
      <Input size='sm' startDecorator={<SearchRounded />} placeholder='Search' />
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
          <ListItem>
            <ListItemButton>
              <HomeRounded />
              <ListItemContent>
                <Typography level='title-sm'>Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <DashboardRounded />
              <ListItemContent>
                <Typography level='title-sm'>Dashboard</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton selected>
              <ShoppingCartRounded />
              <ListItemContent>
                <Typography level='title-sm'>Orders</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton role='menuitem' component='a' href='/joy-ui/getting-started/templates/messages/'>
              <QuestionAnswerRounded />
              <ListItemContent>
                <Typography level='title-sm'>Messages</Typography>
              </ListItemContent>
              <Chip size='sm' color='primary' variant='solid'>
                4
              </Chip>
            </ListItemButton>
          </ListItem>
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
              Support
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRounded />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
        <Card invertedColors variant='soft' color='warning' size='sm' sx={{ boxShadow: 'none' }}>
          <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography level='title-sm'>Used space</Typography>
            <IconButton size='sm'>
              <CloseRounded />
            </IconButton>
          </Stack>
          <Typography level='body-xs'>Your team has used 80% of your available space. Need more?</Typography>
          <LinearProgress variant='outlined' value={80} determinate sx={{ my: 1 }} />
          <Button size='sm' variant='solid'>
            Upgrade plan
          </Button>
        </Card>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant='outlined'
          size='sm'
          src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286'
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level='title-sm'>Siriwat K.</Typography>
          <Typography level='body-xs'>siriwatk@test.com</Typography>
        </Box>
        <IconButton size='sm' variant='plain' color='neutral'>
          <LogoutRounded />
        </IconButton>
      </Box>
    </Sheet>
  )
}

export default Sidebar
