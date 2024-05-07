import Layout from "@/components/layout"
import NavBar from "@/components/navbar/navBar"

export default function TicketForm() {
  return (
    <div>TicketForm</div>
  )
}

TicketForm.getLayout = function getLayout(page) {
    return (
        <Layout>
          <NavBar/>
            {page}
        </Layout>
    )
  }
