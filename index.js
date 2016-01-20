var React = require('react');

const X = React.createClass({
   render: function () {
       return (
           <h1>Test</h1>
       )
   }
});

ReactDOM.render(<X />, document.getElementById('test'));