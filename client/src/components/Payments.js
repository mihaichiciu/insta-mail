import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="InstaMail"
        amount={500} //500 inseamna 5.00 dolari
        description="$5 for 5 email credits"
        token={(token) => {
          this.props.handleToken(token);
        }} //functie callback dupa ce am primit token de la Stripe (dupa ce s-a realizat plata)
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">ADD CREDITS</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
