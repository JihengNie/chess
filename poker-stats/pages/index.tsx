export default function Home() {
  return (
    <>
      <h1 className=" text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Poker Stats</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Player Name
              </th>
              <th scope="col" className="px-6 py-3">
                Number of losses
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-warning-100 dark:border-gray-700 hover:bg-neutral-100">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Vinny
              </th>
              <td className="px-6 py-4">
                |||
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-warning-100 dark:border-gray-700 hover:bg-neutral-100">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Aaron
              </th>
              <td className="px-6 py-4">
                0
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-warning-100 dark:border-gray-700 hover:bg-neutral-100">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Google
              </th>
              <td className="px-6 py-4">
                |
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
