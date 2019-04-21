import React, {Component } from "react"
import API from "../Helpers/API"
import ActionCard from "../Components/ActionCard";
import ProgressTab from "../Components/ProgressTab";
import ViewQuestion from "./ViewQuestion";
import Music from "../Music";
import Errors from "../Helpers/errors"


class Main extends Component {
    constructor(props){
        super (props);
        this.state = {
            viewdata : {}, //view data to be used in the template
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
        }
        this.actionInit = this.actionInit.bind(this);
        this.answerOnClick = this.answerOnClick.bind(this);
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
                //age : 
            })
        })
    }
    answerOnClick = (res) => {
        this.setState({
            response: res
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
                    className=""
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
            <button key="nav_back" className="" onClick={()=>{this.navAction(-1)}}>назад</button>,
            <button key="nav_home" className="" onClick={()=>{this.navAction(0)}}>дома</button>,
            <button key="nav_fwd" className="" onClick={()=>{this.navAction(1)}}>перед</button>
        ]
    }
    profileView(){

    }
    goToProfile (){
        this.setState({
            view: "profile"
        })
    }
    goToGame () {
        let l = this.state.history.length;
        let lastView = l? this.state.history[l-1].view : "main";
        this.state({
            view: lastView
        })
    }
    render () {
        return (
            <div className="">
                <div className="border-bottom pb-1">
                    <ProgressTab 
                        stars={this.state.scores.stars}  
                        money={this.state.scores.money}
                        health={this.state.scores.health}
                        goToProfile={this.state.view!=="profile" &&this.goToProfile}
                        goToGame={this.state.view==="profile" &&this.gotToGame}
                    />
                </div>
                <div className="">
                    {
                        (this.state.view==="profile" && this.profileView())
                        ||  
                        (this.state.view==="main" &&this.getActionCards())
                        || this.stageView()
                    } 
                </div> 
                <div className="mt-1 border-top row fix-bottom fix-full-x pb-1">
                    {
                        this.state.view !=="main" && this.getNavButtons()
                    }
                </div> 
                <Music/>   
            </div>
        )
    }
}

export default Main;