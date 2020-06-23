import React, {Component} from 'react'
import ReactDOM from 'react-dom'

const app = document.getElementById('app')

class App extends Component{
    render(){
        return <h1>Hello World</h1>
    }
}

ReactDOM.render(
    <App/>,
    app,
    () => console.log('rendered')
)