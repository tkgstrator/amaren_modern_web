import { ChevronRightRounded, HomeRounded } from '@mui/icons-material'
import { Box, Breadcrumbs, Link, Typography } from '@mui/joy'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const NavigationHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  const location = useLocation()
  const { t } = useTranslation()
  const paths: string[] = location.pathname.split('/').filter((path) => path !== '')
  const lastPath: string = paths.length === 0 ? 'home' : paths[paths.length - 1]

  return (
    <Box
      sx={{
        marginLeft: {
          xs: '0',
          md: 'var(--Sidebar-width)'
        },
        paddingBottom: 4
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs
          size='sm'
          aria-label='breadcrumbs'
          separator={<ChevronRightRounded fontSize='small' />}
          sx={{ pl: 0 }}
        >
          <Link underline='none' color='neutral' aria-label='Home'>
            <HomeRounded />
          </Link>
          {paths.map((path, index) => {
            if (index === paths.length - 1) {
              return (
                <Typography
                  key={path}
                  color='primary'
                  sx={{ fontWeight: 500, fontSize: 12, cursor: 'default', userSelect: 'none' }}
                >
                  {t(path, { ns: 'routes' })}
                </Typography>
              )
            }
            return (
              <Link
                key={path}
                underline='none'
                color='neutral'
                aria-label='Home'
                sx={{ fontWeight: 500, fontSize: 12 }}
              >
                {t(path, { ns: 'routes' })}
              </Link>
            )
          })}
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          mb: 1,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}
      >
        <Typography level='h2' component='h1'>
          {t(lastPath, { ns: 'routes' })}
        </Typography>
      </Box>
      {children}
    </Box>
  )
}

export default NavigationHeader
