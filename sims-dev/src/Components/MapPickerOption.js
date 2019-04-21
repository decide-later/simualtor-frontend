import React, {Component} from "react";
import GoogleMapReact from 'google-map-react';
import API from "../Helpers/API";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'

import keys from "../Helpers/keys";

const Marker = ({ text }) => <span className="">{text}</span>;

class MapPickerOption extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            marker : {
                lng : null,
                lat : null,
                location: ""
            }
        }
        this.handleClick = this.handleClick.bind(this);
    }
    static defaultProps = {
        center: {
          lat: 51.67,
          lng: 39.20
        },
        zoom: 1,
        marker : {
            lng : 51.67,
            lat : null
        },
        question: this.props
    };
    handleClick(i) {
        let form = {
            method : "get"
        }
        let revLookup = keys.google.url.geolocation + "&latlng="+i.lat+","+i.lng

        let res = API(form, revLookup);
        res.then((data) => {
            let marker = this.state.marker;
            marker.lat = i.lat;
            marker.lng = i.lng;
            if(!data.results.length){
                return;
            }
            marker.location = data.results[0].formatted_address;

            this.setState(marker,() => this.props.onClick({
                response: marker.location}))
        });
        
    }
    renderMarker(){
        return <Marker
                lat={this.state.marker.lat}
                lng={this.state.marker.lng}
                text={<FontAwesomeIcon icon={faMapMarkerAlt} className="text-danger fa-2x" />}
            />
    }
    renderMap = () => {
        return (
            <GoogleMapReact
                bootstrapURLKeys={{ 
                    key: keys.google.key,
                    language: "ru"
                }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                onClick={this.handleClick}
                >
                {this.state.marker.lat && this.renderMarker()}
            </GoogleMapReact>
        )
    }

    render () {
        return (
            <div style={{ height: '70vh', width: '100%' }}>
                {
                    this.renderMap()
                }
            </div>
        );
    }
}

export default MapPickerOption;