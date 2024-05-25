import Header from "../../components/header"

type Props = {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
        <Header />
        <main className="ox-3 lg:px-14">
            {children}
        </main>
    </>
  )
}

export default DashboardLayout