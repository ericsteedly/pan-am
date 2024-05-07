import Layout from "@/components/layout"
import NavBar from "@/components/navbar/navBar"

export default function Bookings() {
  return (
    <div>bookings</div>
  )
}

Bookings.getLayout = function getLayout(page) {
    return (
        <Layout>
          <NavBar/>
            {page}
        </Layout>
    )
  }
