import { BadgeAlert, CreditCard, Landmark, Plus, TrendingDown, TrendingUp, Wallet } from "lucide-react"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TotalInAccountChart } from "@/components/charts/total-in-account-chart"
import { TransactionsTable } from "@/components/tableTransactions"
import { IncomeChart } from "@/components/charts/income-chart"
import { ExpensesChart } from "@/components/charts/expenses-chart"
import { SalaryCommitment } from "@/components/charts/salary-commitment"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/redux/hooks/redux-hook"
import { initialStateInterface } from "@/redux/user/slice"

export const Dashboard = () => {
  const { user }: initialStateInterface = useAppSelector(rootReducer => rootReducer.user)
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-black-1050 w-full p-6">
        <SidebarTrigger className="bg-gray-200 text-black-950 mb-4" size='lg' />

          {user?.email}
        <section className="grid grid-cols-3 gap-4">
          <div className="flex gap-8 bg-black-1000 border-[1px] border-black-900 rounded-md p-4">
            <div className="text-white w-6/12 flex flex-col gap-1 justify-center">
              <h3 className="text-2xl font-semibold">Total in account</h3>
              <p className="text-xl">R$ 0,00</p>
              <div className="bg-blue-950 border-[1px] flex mt-4 items-center justify-center w-fit rounded-full gap-3 text-[12px] px-4 py-1 border-blue-800">
                <Wallet className="text-blue-50" size={16} />
                <span className="text-blue-100">R$ 10,221 last period</span>
              </div>
            </div>

            <div className="w-6/12">
              <TotalInAccountChart />
            </div>
          </div>

          <div className="flex gap-8 bg-black-1000 border-[1px] border-black-900 rounded-md p-4">
            <div className="text-white w-6/12 flex flex-col gap-1 justify-center">
              <h3 className="text-2xl font-semibold">Incomes</h3>
              <p className="text-xl">R$ 0,00</p>
              <div className="bg-green-950 border-[1px] flex mt-4 items-center justify-center w-fit rounded-full gap-3 text-[12px] px-4 py-1 border-green-800">
                <TrendingUp className="text-green-50" size={16} />
                <span className="text-green-100">R$ 10,221 last period</span>
              </div>
            </div>

            <div className="w-6/12">
              <IncomeChart />
            </div>
          </div>

          <div className="flex gap-8 bg-black-1000 border-[1px] border-black-900 rounded-md p-4">
            <div className="text-white w-6/12 flex flex-col gap-1 justify-center">
              <h3 className="text-2xl font-semibold">Expenses</h3>
              <p className="text-xl">R$ 0,00</p>
              <div className="bg-red-950 border-[1px] flex mt-4 items-center justify-center w-fit rounded-full gap-3 text-[12px] px-4 py-1 border-red-800">
                <TrendingDown className="text-red-50" size={16} />
                <span className="text-red-100">R$ 10,221 last period</span>
              </div>
            </div>

            <div className="w-6/12">
              <ExpensesChart />
            </div>
          </div>
        </section>

        <section className="flex mt-8 gap-4">
          <div className="bg-black-1000 border-[1px] border-black-900 rounded-md p-4 w-8/12">
            <TransactionsTable />
          </div>

          <div className="w-4/12">
            <div className="bg-black-1000 border-[1px] border-black-900 h-full rounded-md p-4">
              <div className="text-white">
                <h3 className="text-2xl font-semibold text-center mt-2">Salary commitment</h3>
                <p className="text-black-500 text-center mt-2">Acompanhe em porcentagem quanto do seu salário já está comprometido com despesas.</p>
              </div>
              <SalaryCommitment />
              <div className="max-w-[400px] mx-auto">
                <p className="flex gap-3 text-orange-400 justify-center">
                  <BadgeAlert />
                  Hey friend, your salary is almost compromised, it's time to be more conservative
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex mt-8 gap-4">

          <div className="bg-black-1000 border-[1px] border-black-900 rounded-md p-4 w-6/12">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h3 className="flex items-center gap-2 mb-2 font-bold"><Landmark />Bank Accounts</h3>
                <span className="text-black-500">Click on button + to register Bank Accounts</span>
              </div>

              <Button variant="outline" size="icon" className="cursor-pointer">
                <Plus />
              </Button>
            </div>

            <div className="mt-4 flex flex-col gap-3">

              <div className="hover:bg-green-950 hover:cursor-pointer border-[1px] border-green-500 p-3 rounded-md flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full w-fit p-3">
                    <Landmark className="text-green-900" />
                  </div>
                  <p className="text-white ms-3 font-bold text-xl">Bank Name</p>
                </div>

                <p className="text-white ms-3 font-bold text-xl">R$ 500,00</p>
              </div>


              <div className="hover:bg-green-950 hover:cursor-pointer border-[1px] border-green-500 p-3 rounded-md flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full w-fit p-3">
                    <Landmark className="text-green-900" />
                  </div>
                  <p className="text-white ms-3 font-bold text-xl">Bank Name</p>
                </div>

                <p className="text-white ms-3 font-bold text-xl">R$ 500,00</p>
              </div>


              <div className="hover:bg-green-950 hover:cursor-pointer border-[1px] border-green-500 p-3 rounded-md flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full w-fit p-3">
                    <Landmark className="text-green-900" />
                  </div>
                  <p className="text-white ms-3 font-bold text-xl">Bank Name</p>
                </div>

                <p className="text-white ms-3 font-bold text-xl">R$ 500,00</p>
              </div>

            </div>
          </div>

          <div className="bg-black-1000 border-[1px] border-black-900 rounded-md p-4 w-6/12">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h3 className="flex items-center gap-2 mb-2 font-bold"><CreditCard />Cards</h3>
                <span className="text-black-500">Click on button + to register cards</span>
              </div>

              <Button variant="outline" size="icon" className="cursor-pointer">
                <Plus />
              </Button>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <div className="hover:bg-green-950 hover:cursor-pointer border-[1px] border-green-500 p-3 rounded-md flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full w-fit p-3">
                    <Landmark className="text-green-900" />
                  </div>
                  <p className="text-white ms-3 font-bold text-xl">Card Name</p>
                </div>

                <p className="text-white ms-3 font-bold text-xl">R$ 500,00</p>
              </div>

              <div className="hover:bg-green-950 hover:cursor-pointer border-[1px] border-green-500 p-3 rounded-md flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full w-fit p-3">
                    <Landmark className="text-green-900" />
                  </div>
                  <p className="text-white ms-3 font-bold text-xl">Card Name</p>
                </div>

                <p className="text-white ms-3 font-bold text-xl">R$ 500,00</p>
              </div>

              <div className="hover:bg-green-950 hover:cursor-pointer border-[1px] border-green-500 p-3 rounded-md flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full w-fit p-3">
                    <Landmark className="text-green-900" />
                  </div>
                  <p className="text-white ms-3 font-bold text-xl">Card Name</p>
                </div>

                <p className="text-white ms-3 font-bold text-xl">R$ 500,00</p>
              </div>
            </div>
          </div>

        </section>
      </main>
    </SidebarProvider>
  )
}