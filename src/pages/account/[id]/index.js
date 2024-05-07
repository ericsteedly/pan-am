import Layout from "@/components/layout"
import NavBar from "@/components/navbar/navBar"

export default function Account() {
  return (
    <div>account</div>
  )
}

Account.getLayout = function getLayout(page) {
    return (
        <Layout>
          <NavBar/>
            {page}
        </Layout>
    )
  }
