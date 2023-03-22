import Head from "next/head"
import Board from "./components/board"
import TextButton from "./components/textButton"

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Chess</title>
        <link rel="icon" href="/imgs/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Board title='Some title' subtitle='String' />
      <TextButton/>
    </div>

  )
}
