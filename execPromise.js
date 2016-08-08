'use strict';
let exec = require('child_process').exec;
module.exports = (execStr)=> {
  return new Promise((resolve,reject)=> {
    exec(execStr,(err,stdout,stderr)=> {
      if(err || stderr){
        var err = err || stderr;
        console.error(stdout);
        reject(err);
      }else{
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
};