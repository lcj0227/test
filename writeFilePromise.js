'use strict';
let fs = require('fs');
module.exports = (pathname,data,options)=> {
  return new Promise((resolve,reject)=> {
    fs.writeFile(pathname,data,options,(err)=> {
      if(err){
        reject(err);
      }else{
        resolve();
      }
    });
  });
};