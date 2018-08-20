import React,{ Component } from 'react';

export default function MethodLogger(ShowArguments){
  return (target, key, descriptor) => {
    const name = target.constructor.name;
    const func = descriptor.value;
    descriptor.value = function ( ...args )
    {
      if(ShowArguments){
        console.log( `${name}#${key} Called with Args: ${args}` );
      }else{
        console.log( `${name}#${key} Called` );
      }
      return func.apply( this, args );
    };
    return descriptor;
  };
}