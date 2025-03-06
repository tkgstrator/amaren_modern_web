import { Box, Typography } from '@mui/joy'
import NavigationHeader from '../components/Navigation'

const RootView: React.FC = () => {
  return (
    <>
      <NavigationHeader>
        <Box>
          <Typography>ここは一般社団法人日本アマチュア将棋連盟の非公式ウェブサイトです</Typography>
        </Box>
      </NavigationHeader>
    </>
  )
}

export default RootView
