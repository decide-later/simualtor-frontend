import React, {Component } from "react"
import API from "../Helpers/API"
import ActionCard from "../Components/ActionCard";
import ProgressTab from "../Components/ProgressTab";
import ViewQuestion from "./ViewQuestion";
import Errors from "../Helpers/errors"
import Label from "../Components/Label";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome, faForward, faBackward} from '@fortawesome/free-solid-svg-icons';


class Main extends Component {
    constructor(props){
        super (props);
        this.state = {
            viewdata : {}, //view data to be used in the template
            profile: false,
            view : "main", //the current view
            level: -1, //the current level in the graph
            history: [],
            scores: {
                health : 100,
                money : 10000,
                stars: 0,
                success: {},
                statistics: {},
                rating: {}
            },
            response: {},
            user: {
                names: {
                    value : "псеудоном"
                },
                avatar : {
                    type : "image",
                    text : {
                        value : "ПС"
                    },
                    image : {
                        value: "avatar",
                    }
                },
                age : 16
            },
            bg : "default",
            error : ""
        }
        this.actionInit = this.actionInit.bind(this);
        this.answerOnClick = this.answerOnClick.bind(this);
        this.goToProfile = this.goToProfile.bind(this);
    }
    componentWillMount(){
        this.actionInit(this.state.view);
    }
    actionInit(i){
        let level = this.state.view === i? this.state.level + 1 //user is stacking levels
                        : 0;
        let history = this.state.history;
        let st = JSON.parse(JSON.stringify(this.state));
        history.push(st);

        let form = {
            body : {
                "view" : i,
                "level" : level
            },
            method: 'GET'
        }
        let res = API(form);
        res.then((data) => {
            this.setState({
                viewdata: data,
                view: i,
                level : level,
                age : this.state.age
            })
        })
    }
    answerOnClick = (res) => {
        let scores = this.state.scores;
        scores.money = scores.money - (res.cost || 0);
        this.setState({
            response: res,
            scores : scores
        }, ()=>{
            console.log(res)
        });
    }
    stageView = () => {
        return <ViewQuestion 
            viewdata = {this.state.viewdata}
            onClick={this.answerOnClick}
        />;
    }
    getActionCards = () =>{
        let actionCards = [];
        const data = this.state.viewdata;
        for(var key in data){
            actionCards.push(
                <ActionCard
                    className="col-12 py-1 fix-full-x"
                    key={key}
                    view={key}
                    caption={data[key]}
                    onClick={this.actionInit}
                />
            );
        }
        return actionCards
    }
    alertError = (key) => {
        this.setState({
            error: Errors[key]
        })
    }
    navAction = (step) => {
        if(step > 0){
            if(Object.keys(this.state.response).length){
                this.actionInit(this.state.view); //stacking level with same
            }else{ //error, no response from user
                this.alertError("no_response")
            }
            return;
        }
        const l = this.state.history.length;

        let index = !step? 1 : Math.max(l + step, l - 2);

        let st = this.state.history[index];
        this.setState(st);
    }
    getNavButtons = () => {
        return [
            <button key="nav_back" className="" onClick={()=>{this.navAction(-1)}}>
                <FontAwesomeIcon icon={faBackward}  />
            </button>,
            <button key="nav_home" className="" onClick={()=>{this.navAction(0)}}>
                <FontAwesomeIcon icon={faHome}  />
            </button>,
            <button key="nav_fwd" className="" onClick={()=>{this.navAction(1)}}><FontAwesomeIcon icon={faForward}  /></button>
        ]
    }
    profileView(){
        return (
            <div className="row mt-3">
                <div className="col-6">
                    {Label(this.state.user.avatar)} 
                </div>
                <div className="col-6">
                    {Label(this.state.user.names)}                    
                </div>
            </div>
        )
    }
    goToProfile (){
        this.setState({
            profile: !this.state.profile
        })
    }
    renderBg(){
        document.body.classList = this.state.bg;
    }   
    render () {
        this.renderBg();
        return (
            <div className="">
                <div className="error_box">
                    {this.state.error}
                </div>
                <div className="border-bottom pb-1 fix-top fix-full-x bg-white">
                    <ProgressTab 
                        stars={this.state.scores.stars}  
                        money={this.state.scores.money}
                        health={this.state.scores.health}
                        goToProfile={!this.state.profile &&this.goToProfile}
                        goToGame={this.goToProfile}
                    />
                </div>
                <div className="mt-5">
                    {
                        (this.state.profile && this.profileView())
                        ||  
                        (this.state.view==="main" &&this.getActionCards())
                        || this.stageView()
                    } 
                </div> 
                {
                        this.state.view !=="main" &&
                            <div className="mt-1 border-top row fix-bottom fix-full-x pt-1 pb-1 bg-white">
                                {this.getNavButtons()}
                            </div>                    
                }

            </div>
        )
    }
}

export default Main;