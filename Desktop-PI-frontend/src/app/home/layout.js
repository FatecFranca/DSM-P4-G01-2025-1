import Navbar from '../_components/Navbar'

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
