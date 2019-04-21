import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRubleSign, faStar, faHeartbeat, faStarHalf, faUser, faHome} from '@fortawesome/free-solid-svg-icons'

class ProgressTab extends Component  {
    renderStars = () => {
        let stars = []
        for(var i = 0; i < this.props.stars;  ++ i){
            stars.push(
                <FontAwesomeIcon icon={faStar}  />
            )
        }
        return stars.length ? stars: <FontAwesomeIcon icon={faStarHalf}  />;
    }
    render(){
        return (
            <div className="row mt-1">
                <div className="col-3">
                    <FontAwesomeIcon icon={faRubleSign}  /> 
                    {" " + this.props.money}
                </div>
                <div className="col-3">
                    {this.renderStars()}
                </div>
                <div className="col-3">
                    <FontAwesomeIcon icon={faHeartbeat}  />
                    {" " + this.props.health + " %"}
                </div>
                <div className="col-3">
                    {this.props.goToProfile? <FontAwesomeIcon icon={faUser} onClick={this.props.goToProfile} /> : <FontAwesomeIcon icon={faHome} onClick={this.props.goToGame} /> }
                    
                </div>
            </div>
        )
    }
}
export default ProgressTab