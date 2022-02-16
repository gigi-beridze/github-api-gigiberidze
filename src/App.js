import React, { Component } from 'react';
import User from './components/User'
import './App.css';
import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './components/Footer';

document.title = "GitHub API By Gigi Beridze";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      loading: false
    }
  }
  getUser = () => {
    this.setState({
      loading: true
    })
    const name = this.refs.name.value;
    // if(name == ''){
    //   console.log('not found!')
    // }else{
    //   console.log('gigi123')
    // }
    setTimeout( () => {
      fetch(`http://api.github.com/users/${name}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          user: data,
          loading: false
        });
      })
    },1000)
  }
  render() {   
    const name = this.state.user.name 
    let userProfile;
    if(this.state.loading === true)  {
      userProfile = <div className='loading-user-card'><Loading /><h1>Loading...</h1></div>
    }else if (name ) {
      userProfile = <User user={this.state.user} />
    }
    return (
      <div className="App">
        <Header />
        <div className="wrapper">
          <div id='search-bar'>
            <input type="text" placeholder='enter user name' ref="name" />
            <button className='searchButton' onClick={this.getUser}>
              <span>submit</span>
            </button>
          </div>
        </div>
        {userProfile}
        <Footer />
      </div>
    );
  }
}
export default App;
