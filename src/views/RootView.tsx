import { Warning } from '@mui/icons-material'
import { Alert, Box, Typography } from '@mui/joy'
import NavigationHeader from '../components/Navigation'

const RootView: React.FC = () => {
  return (
    <>
      <NavigationHeader>
        <Box>
          <Box
            sx={{
              mb: 2
            }}
          >
            <Typography>ここは一般社団法人日本アマチュア将棋連盟の非公式ウェブサイトです。</Typography>
            <Typography>大会結果速報や登録者のレーティングなどを確認することができます。</Typography>
            <Typography>公式サイトよりも高速に閲覧、検索ができます。ご自由にご利用ください。</Typography>
          </Box>
          <Alert startDecorator={<Warning />}>
            <Typography>一部の機能は現在実装中です。</Typography>
          </Alert>
        </Box>
      </NavigationHeader>
    </>
  )
}

export default RootView
