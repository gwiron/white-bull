
import React from 'react'

export function connection(Component /*, module1, module2, module3**/){

  let modules = Array.from(arguments).slice(1);

  return class BestComponent extends React.Component{
    constructor(props){
      super(props)

      this.state = {};
      for(let i=0; i<modules.length; i++){
        let module = modules[i];
        this.state[module.namespace] = module.state;
        module.subscribe((state, namespace)=>{
          this.setState({
            [namespace]:state
          })
        });
      };

    }

    render(){
      return <Component {...this.state}  {...this.props} />
    }
  }
}