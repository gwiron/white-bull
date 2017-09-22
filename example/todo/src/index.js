
import React from 'react'
import {render} from 'react-dom'
// import {connection, dispatch, Module} from '../node_modules/white-bull/dist/index';
import {connection, dispatch, Module} from 'white-bull';


class TodoItem extends React.Component{
	render(){
		let {text, index} = this.props;
		return <div className="item">
			<input type="button" value="删除" onClick={()=>{dispatch("todoList.remove", index)}} />
			{text}
		</div>
	}
}

class Todo extends React.Component{

    constructor(props) {
        super(props)
    }
    render() {

			let todoList = this.props.todoList;
			return <div>
				{
					todoList.list.map((text, index)=>{
						return <TodoItem  text={text} key={index} index={index} />
					})
				}
				<input type="button" value="add" onClick={()=>{dispatch("todoList.addItem")}}  />
			</div>

    }
}

class TodoModule extends Module {
	constructor(namespace){
		super(namespace);
		this.count = 0;
		this.state = {
			list:["周末拜访卡尔·马克思"]
		}
	}

	addItem(text){
		let list = this.state.list;
		let todos = [
			"周末拜访卡尔·马克思",
			"下周4与亚当·斯密聊天",
			"下午2点与大卫·李嘉图喝咖啡",
			"明天中午与米尔顿·弗里德曼吃饭",
			"后天下与约翰·梅纳德·凯恩斯公园散步"
		];
		list.push(todos[parseInt(Math.random()*todos.length)]);
		this.setState({list:list});
	}

	remove(index){
		let list = this.state.list;
		list.splice(index, 1);
		this.setState({
			list:list
		})
	}

}

Todo = connection(Todo, new TodoModule("todoList"));

render(<Todo />, document.getElementById("root"))
