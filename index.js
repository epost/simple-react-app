const Customers = new React.createClass({
    getInitialState: function() {
        return {
            customers: [
                {"id": 0, "name": "Daniel Gomez", "message": "UI nerd"},
                {"id": 1, "name": "Emil Haugberg van Veen", "message": "UI nerd"},
                {"id": 2, "name": "Luca Verhees", "message": "FP nerd"}
            ]
        }
    },

    add: function(object) {
        var state = this.state.customers;
        var id = state.length;

        object.id = id;

        state.push(object);

        this.setState(state);
    }
    ,
    render: function() {
        var customers = this.state.customers;
        return (
            <div>
                {customers.map(x => <CustomerMessage key={x.id} name={x.name} message={x.message} /> )}
                <NewCustomer add={this.add} />
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
    getInitialState: function() {
      return {name: "", message: ""};
    },

    handleNameChange: function(event) {
        this.setState({name: event.target.value});
    }
    ,
    handleMessageChange: function(event) {
        this.setState({message: event.target.value});
    }
    ,
    handleAdd: function() {
        var empty = this.state.name == "" || this.state.message == "" ? true : false;

        if(!empty) {
            this.props.add(this.state);
        }
    }

    ,
    render: function() {
        return (
            <div>
                <div className="add">
                    <div className="user">
                        <input type="text" placeholder="name" value={this.state.value} onChange={this.handleNameChange}/>
                        <input type="text" placeholder="message" value={this.state.value} onChange={this.handleMessageChange} />
                        <button onClick={this.handleAdd}>add</button>
                    </div>
                </div>
            </div>
        )
    }
});




ReactDOM.render(<Customers />, document.getElementById('customers-list'));

