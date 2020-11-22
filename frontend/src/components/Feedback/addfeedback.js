import React from "react";


class AddFeedback extends React.Component {
  constructor(props) {
    super(props);
    state = {
      value: "",
      Name: "",
      Feedback: "",
      Email: "",
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
  }



  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  handleSubmitForm = event => {
    event.preventDefault();
  };


  handleClick = () => {
    const info = {
      Name: this.state.Name,
      Email: this.state.Email,
      Feedback: this.state.Feedback
    }
    fetch('http://localhost:4000/addfeedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then(response => response.json())
      .then(data => {
        alert("Thank You For Your Feedback !!");
        // window.location.href = '/'
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.setState({
      Name: '',
      Email: '',
      Feedback: ''
    })

  }

  render() {
    return (
      <div className="root1">
        <div className="name2">
          <h3>Give Feedback</h3>
        </div>
        <form className="form" onSubmit={this.handleSubmitForm}>
          <div className="details">
            <div className="namedetails">
              <h3>Your Name</h3>
              <input
                className="inputborder"
                placeholder="Enter Your Name Here"
                type="text"
                name="Name"
                value={this.state.Name}
                onChange={this.handleChange}
              />
            </div>
            <div className="namedetails">
              <h3>Your Email</h3>
              <input
                className="inputborder"
                placeholder="Enter Your Email Here"
                type="text"
                name="Email"
                value={this.state.Email}
                onChange={this.handleChange}
              />
            </div>
            <div className="namedetails">
              <h3>Feedback</h3>
              <input
                className="inputborder"
                placeholder="Enter Your Feedback Here"
                type="text"
                name="Feedback"
                value={this.state.Feedback}
                onChange={this.handleChange}
              />
            </div>
            <div className="submit">
              <button className="button" onClick={this.handleClick}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddFeedback;