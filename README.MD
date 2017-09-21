## white-bull

React view 与 data 的连接器。

## use

````javascript


import React from 'react'
import {render} from 'react-dom'

import {connection, dispatch, Module} from 'white-bull'

class Hello extends React.Component{
  render(){
    //say 自动绑定到props上
    let {say} = this.props;
    return <div>{say.text}</div>
  }
}

// extends Module
class HelloModule extends Module {
  constructor(namespace){
    super(namespace)
    this.state = {
      text:"hello world"
    }
  }
}

//把 HelloModule 中的 state 绑定到 User 的 props.say 中
let App = connection(Hello, new HelloModule("say"));

render(<App/>, document.getElementById("#root"));

````


### API

* Module

继承 `Module` 可指定默认 `state`, 添加其他操作state的方法

````javascript

  class HelloModule extends Module{
    constructor(namespace){
      super(namespace)
      //default props
      this.state = {

      }
    }
    //....
    update(){
      //update state
      this.setState({

      })
    }
  }

````


* connection

链接组件与`Module`, module需要指定命名空间，命名空间作为`props`的属性,和`dispatch`的参数前缀

````javascript

  class Hello extends React.Component{
    render(){
      // this.props.hello
    }
  }

  connection(Hello, new HelloModule("hello"))

````


* dispatch

触发动作

````javascript
  //这里触发了相当于调用了 new HelloModule("hello") 这个实例的 .update(arg1, arg2)方法
  dispatch("hello.update", arg1, arg2);

````

## Example

* [todo](./example/todo/)
