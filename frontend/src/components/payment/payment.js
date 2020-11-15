import React, { Component } from 'react';
import './payment.css'
class Authpage extends Component {
    render () {
        return <div> <h1>Payment page</h1><form>
            <div className ='paymentform'>
                <label for ='idcard'> enter your id card</label>
                <input type = 'string' id = 'num'></input>
                <label for ='ccv'> enter your ccv</label>
                <input type = 'string' id = 'num'></input>
                <label for ='ex'> enter your expiration date</label>
                <input type = 'string' id = 'num'></input>
                <input type='submit' value = 'submit' />

            </div>
          
        </form>
        </div>
    }
}
export default Authpage