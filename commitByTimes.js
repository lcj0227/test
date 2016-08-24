'use strict';
let writeFile = require('./writeFilePromise'),
  exec = require('./execPromise'),
  globalCounter = 0;
const commit = (times)=> {
    return writeFile('TEST.txt',Math.random())
      .then(()=> exec('git add .'))
      .then(stdout=> exec('git commit -m "123"'))
      .then((stdout)=> {
        globalCounter++;
        if(globalCounter === times){
          return stdout;
        }else{
          return commit(times)
        }
      })
      .then(()=> console.log(`commit successed ${times} times`))
};
module.exports = commit;