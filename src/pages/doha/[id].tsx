import {GetServerSideProps} from 'next'
import {useRouter} from 'next/router'
import {DohaData} from '../../types/types'
import SEOHead from '../../components/SEOHead'
import DohaDisplaySingle from '@/components/DohaDisplaySingle'
import DohaPageButtons from '@/components/DohaPageButtons'

interface DohaPageProps {
  dohaData: DohaData
}

const DohaPage: React.FC<DohaPageProps> = ({dohaData}) => {
  const router = useRouter()
  const {id} = router.query

  return (
    <>
      <SEOHead
        title={`Kabir's Doha: ${dohaData.Doha}`}
        description={`Read and understand Kabir's Doha: "${dohaData.EN}".`}
        url={`https://kabir-dohas.vercel.app/doha/${id}`}
      />
      {dohaData && <DohaDisplaySingle dohaData={dohaData} loading={false} />}
      <DohaPageButtons />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const {id} = context.query
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const response = await fetch(`${apiUrl}/api/doha/${id}`)

    if (!response.ok) {
      throw new Error('Doha not found')
    }

    const dohaData: DohaData = await response.json()

    return {
      props: {
        dohaData,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default DohaPage
