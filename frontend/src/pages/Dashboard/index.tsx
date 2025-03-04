export const Dashboard = () => {
  return (
    <div className="bg-[#09090B] w-[100wh] flex justify-center">
      <main className="h-screen w-[1400px]">
        <h1 className="text-6xl text-[#18181A]">Overview</h1>

        <section className="grid grid-cols-3 gap-4">
          <div className="bg-gray-900 rounded-md">
            <span></span>
            <h3>Total in account</h3>
          </div>
          <div className="bg-gray-900 rounded-md">Card</div>
          <div className="bg-gray-900 rounded-md">Card</div>
        </section>

        <section>

        </section>
      </main>
    </div>
  )
}