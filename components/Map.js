import {Component} from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends Component {
    state = {
        viewport: {
            width: '100vw',
            height: '100vh',
            latitude: 41.5898,
            longitude: -93.585,
            zoom: 12
        }
    };

    render() {
        const mapStyle = {light: 'mapbox/streets-v11', dark: 'lrobinson/ck3dd8clv3glw1cqv56o78etl'};

        return (
            <ReactMapGL
                mapStyle={`mapbox://styles/${mapStyle[this.props.colorMode]}`}
                mapboxApiAccessToken="pk.eyJ1IjoibHJvYmluc29uIiwiYSI6ImNqcGtrdngwazA0ajIzeG41MHA3eGdvaXQifQ.ZXGWvgIxejlIWqFTPkDzuQ"
                onViewportChange={(viewport) => this.setState({viewport})}
                {...this.state.viewport}
            >
                {this.props.children}
            </ReactMapGL>
        );
    }
}

export default Map;
