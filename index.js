const Customers = new React.createClass({
    getInitialState: function () {
        return {
            customers: [
                {"id": 0, "name": "Daniel Gomez", "message": "UI nerd"},
                {"id": 1, "name": "Emil Haugberg van Veen", "message": "UI nerd"},
                {"id": 2, "name": "Luca Verhees", "message": "FP nerd"}
            ]
        }
    },
    add: function (customer) {
        const newCustomerId = customers => customers.length
            , newCustomer = R.merge({id: newCustomerId(this.state.customers)},customer)
            , newState = R.merge(this.state, {"customers": R.append(newCustomer, this.state.customers)});

        this.setState(newState);
    },
    delete: function (id) {
        const customerId = parseInt(id)
            , checkId = n => n.id !== customerId
            , filteredCustomers = R.filter(checkId, this.state.customers)
            , newState = R.merge(this.state, {"customers" : filteredCustomers});

        this.setState(newState);
    },
    render: function () {
        const customers = this.state.customers;
        return (
            <div>
                {customers.map(x => <CustomerMessage delete={this.delete} id={x.id} key={x.id} name={x.name} message={x.message} /> )}
                <NewCustomer add={this.add} />
            </div>
        )
    }
});

const CustomerMessage = new React.createClass({
    handleClick: function (event) {
        this.props.delete(event.target.id);
    },
    render: function () {
        return (
            <div className="customer-quote">
                <div className="message">
                    {this.props.message}
                </div>

                <div className="customer">
                    {this.props.name}
                </div>

                <button id={this.props.id} onClick={this.handleClick}>Delete</button>
            </div>
        )
    }
});

const NewCustomer = new React.createClass({
    getInitialState: function () {
        return {name: "", message: ""};
    },
    handleNameChange: function (event) {
        this.setState({name: event.target.value});
    },
    handleMessageChange: function (event) {
        this.setState({message: event.target.value});
    },
    handleAdd: function () {
        var empty = !!(R.empty(this.state.name) || R.empty(this.state.message));

        if (!empty) {
            this.props.add(this.state);
            this.setState(this.getInitialState());
        }
    },
    render: function () {
        return (
            <div>
                <div className="add">
                    <div className="user">
                        <input type="text" placeholder="name" value={this.state.name} onChange={this.handleNameChange}/>
                        <input type="text" placeholder="message" value={this.state.message} onChange={this.handleMessageChange} />
                        <button onClick={this.handleAdd}>add</button>
                    </div>
                </div>
            </div>
        )
    }
});

ReactDOM.render(<Customers />, document.getElementById('customers-list'));

