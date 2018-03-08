// inspired by turbolinks: github.com/turbolinks/turbolinks
import React, { Component } from 'react';
class DataTableLoading extends Component {
  constructor(props) {
    super()
    this.state = {
      styles: {
        width: 0,
        position: 'fixed',
        display: 'block',
        height: '2px',
        background: '#0076ff',
        top: 0,
        left: 0,
        transform: "translate3d(0, 0, 0)",
        zIndex: 9999,
        transition: 'width 300ms ease-out, opacity 150ms 150ms ease-in',
      }
    }
  }
  
  componentWillMount() {
    const value = 1;

    this.setState({
      ...this.state,
      styles: {
        ...this.state.styles,
        width: (10 + value * 90)
      }
    });
    this.loadingTimeout = this.loadingTimeout || setInterval(this.increment.bind(this), 50
    );
  }

  increment() {
    const value = 45;
    this.setState({
      ...this.state,
      styles: {
        ...this.state.styles,
        width: this.state.styles.width + (value + (Math.random() / 100))          
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.loadingTimeout);
  }

  render() {
    return (
      <div style={this.state.styles} />
    )
  }
}

export default DataTableLoading;