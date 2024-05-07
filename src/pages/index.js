import Layout from '@/components/layout'
import NavBar from '@/components/navbar/navBar'
import BookFlight from './book-flight/book-flight'


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