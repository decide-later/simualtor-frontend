import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRubleSign, faStar, faHeartbeat, faStarHalf, faUser, faHome, faMoon} from '@fortawesome/free-solid-svg-icons';
import Music from "../Music";

class ProgressTab extends Component  {
    constructor(props){
        super(props);
        this.state = {
            theme: false
        }
        this.toggleTheme = this.toggleTheme.bind(this)
    }
    renderStars = () => {
        let stars = []
        for(var i = 0; i < this.props.stars;  ++ i){
            stars.push(
                <FontAwesomeIcon icon={faStar}  />
            )
        }
        return stars.length ? stars: <FontAwesomeIcon icon={faStarHalf}  />;
    }
    toggleTheme() {
        document.body.className = this.state.theme? "light":"mojave";
        this.setState({
            theme : !this.state.theme
        })
    }
    render(){
        return (
            <div className="row mt-1">
                <div className="col-3">
                    <div className="row">
                        <div className="col-6">
                            <Music/>
                        </div>
                        <div className="col-6">
                            <FontAwesomeIcon icon={faRubleSign}  /> 
                            {" " + this.props.money}
                        </div>

                    </div>
                    
                    
                    
                </div>
                <div className="col-3">
                    {this.renderStars()}
                </div>
                <div className="col-3">
                    <FontAwesomeIcon icon={faHeartbeat}  />
                    {" " + this.props.health + " %"}
                </div>
                <div className="col-3">
                    <div className="row">
                        <div className="col-6 d-none">
                            <FontAwesomeIcon icon={faMoon} className="col-6" onClick={this.toggleTheme}/>
                        </div>

                        <div className="">
                            {this.props.goToProfile? <FontAwesomeIcon icon={faUser} onClick={this.props.goToProfile} className="col-6" /> : <FontAwesomeIcon icon={faHome} onClick={() => this.props.goToGame()}
                             className="col-6"/> }
                        </div>                  
                    </div>                    
                </div>
            </div>
        )
    }
}
export default ProgressTab