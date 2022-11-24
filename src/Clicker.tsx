import React from 'react';

interface State {
  clicks: number;
}

class Clicker extends React.Component<{}, State> {
  state = {
    clicks: 10,
  };

  increaseClick = () => {
    this.setState(prev => ({
      ...prev,
      clicks: prev.clicks + 1,
    }))
  };

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>{this.state.clicks}</h1>
        <button onClick={this.increaseClick}>Click</button>
      </div>
    );
  }
}

export default Clicker;