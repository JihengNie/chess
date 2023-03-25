import Head from "next/head"
import Box from "./components/box"
import Board from "./components/board"

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Chess</title>
        <link rel="icon" href="/imgs/favicon.ico" />
      </Head>

      <Box/>
      <Board turn='Red'/>
    </div>

  )
}
