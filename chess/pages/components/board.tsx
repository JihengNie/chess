import React, { Component } from 'react';


interface TitleProps {
  title: string;
  subtitle?: string;
  children?: string;
}

type CounterState = {
  value: number;
};

class Board extends Component<TitleProps> {
  constructors() {
    this.handleClick = this.handleClick.bind(this);
  }

  state: CounterState = {
    value: 500,
  };

  handleClick() {
    this.setState({ value: 42})
  }

  render() {
    const { title, subtitle, children } = this.props;
    return (
      <>
        <h1 className='text-2xl'>{title}</h1>
        <h2>{subtitle}</h2>
        <div onClick={this.handleClick}>{this.state.value}</div>
      </>
    );
  }
}

export default Board;
