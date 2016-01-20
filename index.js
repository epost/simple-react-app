const Customers = new React.createClass({
    getInitialState: function() {
        return {
            customers: [
                {"id": 0, "name": "Daniel Gomez", "message": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros."},
                {"id": 1, "name": "Emil Haugberg van Veen", "message": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros."},
                {"id": 2, "name": "Luca Verhees", "message": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros."}
            ]
        }
    },

    add: function() {
        console.log({"name": "test", "message": "test"});
    }
    ,
    render: function() {
        var customers = this.state.customers;
        return (
            <div>
                {customers.map(x => <CustomerMessage key={x.id} name={x.name} message={x.message} /> )}
                <NewCustomer add={this.add} />
                <button>add</button>
            </div>
        )
    }
});

const CustomerMessage = new React.createClass({
    render: function() {
        return (
            <div className="customer-quote">
                <div className="message">
                    {this.props.message}
                </div>

                <div className="customer">
                    {this.props.name}
                </div>
            </div>
        )
    }
});

const NewCustomer = new React.createClass({
    render: function() {
        return (
            <div>
                <div className="add">
                    <div className="user">
                        <NameInput />
                        <MessageInput />
                    </div>
                </div>
            </div>
        )
    }
});

const NameInput = new React.createClass({

    getInitialState: function() {
        return {value: ""}
    },

    handleChange: function(event) {
        this.setState({value: event.target.value});
    },

    render: function() {
        return (
            <input type="text" placeholder="name" value={this.state.value} onChange={this.handleChange}/>
        )
    }
});

const MessageInput = new React.createClass({

    getInitialState: function() {
      return {value: ""}
    },

    handleChange: function(event) {
        this.setState({value: event.target.value});
    },

    render: function() {
        return (
            <input type="text" placeholder="message" value={this.state.value} onChange={this.handleChange} />
        )
    }
});



ReactDOM.render(<Customers />, document.getElementById('customers-list'));

