'use strict';
let exec = require('./execPromise'),
  commitByTimes = require('./commitByTimes'),
  gitConfig = require('./config'),
  getRandomNumber = (n,m)=> Math.round(Math.random()*(m-n)) + n
const gitInit = ()=> {
  exec('git init')
    .then(stdout=> exec(`git config user.name ${ gitConfig.username }`))
    .then(stdout=> exec(`git config user.emal ${ gitConfig.email }`))
    .then(stdout=> exec(`git remote remove origin`))
    .then(stdout=> exec(`git remote add origin ${ gitConfig.gitUrl }`))
    .catch(err=> console.log(err))
};
const autoCommit = ()=> {
  commitByTimes(getRandomNumber(4,13))
    .then(stdout=> exec('git push --set-upstream origin master'))
    .catch(err=> console.log(err));
};
gitInit();
autoCommit();