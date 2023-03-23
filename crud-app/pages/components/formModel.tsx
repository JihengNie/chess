import React, {Component} from 'react'
interface ModelProps {
  handleCreateButtonClick: () => void
}

export default class ExampleModel extends Component<ModelProps> {
  render() {
    const { handleCreateButtonClick} = this.props
    return (
      <>
        <h1> Ayyyo! </h1>
        <button onClick={handleCreateButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Close Me
        </button>
      </>
    )
  }
}
