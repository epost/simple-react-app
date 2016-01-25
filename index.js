
// our global application state ~ much like the Elm "Model"
var appState = {
    customers: [
        {"id": 0, "name": "Daniel Gomez", "message": "UI nerd"},
        {"id": 1, "name": "Emil Haugberg van Veen", "message": "UI nerd"},
        {"id": 2, "name": "Luca Verhees", "message": "FP nerd"}
    ]
};

// target DOM element where React renders to
const targetElement = document.getElementById('customers-list')

function delayUntilNextTick ( f ) {
    setTimeout(f, 30)
}

// update our UI..
function updateUI () {
    // ..but not right away, because React will break
    delayUntilNextTick(() => { ReactDOM.render(<Customers customers={ appState.customers }/>, targetElement); })
}

// add a customer to our global state
function addCustomer (customer) {

    const newId = appState.customers.length;
    const newCustomer = R.assoc('id', newId, customer);
    const newCustomerState = R.append(newCustomer, appState.customers);

    appState = R.merge(appState, { customers: newCustomerState });

    updateUI();
};

function deleteCustomer (id) {

    const customerId = parseInt(id);

    appState = R.merge(appState, {customers: R.filter(c => c.id !== customerId, appState.customers)});

    updateUI();
};

const Customers = new React.createClass({
    render: function () {
        const mkMessage = x => <CustomerMessage id={x.id} key={x.id} name={x.name} message={x.message} />;
        return (
            <div>
                { R.map( mkMessage, this.props.customers ) }
                <NewCustomer />
            </div>
        )
    }
});

const CustomerMessage = new React.createClass({
    handleClick: function (id) {
        deleteCustomer(id)
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

                <button id={this.props.id} onClick={ this.handleClick(this.props.id) }>Delete</button>
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

updateUI()

