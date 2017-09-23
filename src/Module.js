
//我们需要view与module分离
//我们需要view之间能通信
//我们需要view能触发module更新
//我们还喜欢有其他方式触发module更新，比如url变化
//module可能是持久化的，也可能需要多处实例化

import events from 'events';
import {addModule, removeModule} from './dispatch'

/**
  * interFace Module
  * @use

    class A extends Module{
      constructor(namespace){
        super(namespace)
      }

      //...any function
    }

    //dispatch("namespace.anyFucntion");

  * @param {string} namespace //被绑定到props中所使用的名字
  *
  */

export class Module extends events.EventEmitter{
  constructor(namespace){
    super()

    this.namespace = namespace;
    addModule(namespace, this);
    this.state = {};

  }

  setState(state){
    Object.assign(this.state, state);
    this.emit("complete", this.state, this.namespace);
  }

}
