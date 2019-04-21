import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon} from '@fortawesome/free-solid-svg-icons'


import './App.css';

import Main from "./Templates/Main";


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      themes : ["App light", "App mojave"],
      current_theme: localStorage.getItem("theme") || 0,
    }
       
  }
  themeSwitcher (){
    return (            
        <FontAwesomeIcon icon={faMoon} className="theme-switcher fa-2x mx-3" 
        onClick={() => {
            const theme = (this.state.current_theme === 0)? 1 : 0;
            localStorage.setItem("theme", theme);
            this.setState({
              current_theme : theme
            })
        }
      }/>
    )
  }
  render() {
    return (
      <div className={this.state.themes[this.state.current_theme]} >
  
        <div className="">
          { /*swithcing themes, beauty todo */
            /*this.themeSwitcher()*/}
        </div>
        <Main/>

      </div>
    );
  }
}

export default App;
