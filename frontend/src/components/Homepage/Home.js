import React from 'react';
import '../../../src/App.css';
import './A-Style.css';
import Section from './Section';
import AboutUs from './AboutUs';
import Cards from './HomeCards';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        document.documentElement.scrollTop = 0;
    }
    render() {
        return (
            <>
                <Section />
                <AboutUs />
                <Cards  testtrips={this.props.testtrips} userid={this.props.userid}  trip={this.props.trip}/>
            </>
        )
    }
}
export default Home;