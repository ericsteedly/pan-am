import Layout from '@/components/layout'
import NavBar from '@/components/navbar/NavBar'
import BookFlight from './book-flight'


export default function Index() {
  return (
    <BookFlight />
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NavBar />
      {page}
    </Layout>
  )
}