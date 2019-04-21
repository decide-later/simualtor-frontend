import React, {Component } from "react"
import API from "../Helpers/API"
import ActionCard from "../Components/ActionCard";
import ProgressTab from "../Components/ProgressTab";
import ViewQuestion from "./ViewQuestion";
import keys from "../Helpers/keys";


class Main extends Component {
    constructor(props){
        super (props);
        this.state = {
            viewdata : {}, //view data to be used in the template
            view : "mobile_travel", //the current view
            level: -1, //the current level in the graph
            history: []
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
            },
            method: 'GET',
            endpoint: i
        }
        let res = API(form);
        res.then((data) => {
            this.setState({
                viewdata: data,
                view: i,
                level : level
            })
        })
    }
    answerOnClick = (e) => {
        if(e.lng && e.lat){//map response
            let revLookup = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+e.lat+","+e.lng+"&location_type=ROOFTOP&result_type=street_address&key="+keys.google;
            console.log(revLookup);
        }else{
            console.log(e)
        }
    }
    stageView = () => {
        return <ViewQuestion 
            viewdata = {this.state.viewdata}
            onClick={this.answerOnClick}
        />;
    }
    answerQuestion = () =>{

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
    navAction = (step) => {
        if(step > 0){
            this.actionInit(this.state.view); //stacking level with same
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
    render () {
        //console.log(this.state)
        return (
            <div className="">
                <div className="border-bottom pb-1">
                    <ProgressTab />
                </div>
                <div className="">
                    {
                        (this.state.view==="main" && this.getActionCards())
                        || this.stageView()
                    } 
                </div> 
                <div className="mt-1 border-top row fix-bottom fix-full-x pb-1">
                    {
                        this.state.view !=="main" && this.getNavButtons()
                    }
                </div>     
                     
            </div>
        )
    }
}

export default Main;