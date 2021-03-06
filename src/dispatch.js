
let dispatchScope = {};

/**
  * @param {string} actionName  //scope.fucntionName
  * @param {any} arg1
  * @param {any} arg2
  * @param {any} arg3
  * @param {any} arg...
  * @return {Boolean}
  * @throw params error
  */

function dispatch(actionName /*arg1, arg2, arg3*/){
  let actions = [];

  if(typeof actionName != "string" || (actions=actionName.split(".")).length != 2){
    throw "dispatch actionName must be 'scope.function'";
  }

  let scope = dispatchScope[actions[0]];
  if(!scope){
    throw actions[0]+"scope not register"
  }

  try{
    dispatchScope[actions[0]][actions[1]].call(scope, Array.from(arguments).slice(1));
  }catch(e){
    throw e;
  }

  return true;
}


function addModule(scope, module){
  dispatchScope[scope] = module;
}


function removeModule(scope){
  dispatchScope[scope] = undefined;
}

export {
  dispatch,
  addModule,
  removeModule
}
