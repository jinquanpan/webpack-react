import React from 'react';

class Home extends React.Component {
  btnfn = () => {
      console.log('跳转')
    this.props.history.push('/login')
  }

  render() {
      return (
          <div onClick={this.btnfn}>
              <a >回到home99</a>
          </div>
      )
  }
}

export default Home
