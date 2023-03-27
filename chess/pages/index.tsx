import Head from "next/head"
import Board from "./components/board"

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Chess</title>
        <link rel="icon" href="/imgs/favicon.ico" />
      </Head>

      <Board turn='White'/>
    </div>

  )
}
