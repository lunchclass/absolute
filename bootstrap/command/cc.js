import childProcess from 'child_process';
import https from 'https';
import readline from 'readline';

const execSync = childProcess.execSync;
export default '';

/**
* @param {String} value The shell command.
* @return {String} data The extra command.
*/
export function cmd(value) {
  try {
    return execSync(value).toString().replace(/\n/g, '');
  } catch (err) {
    return 0;
  }
}

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout});

/**
* @param {String} option keywords 'pr' or 'cp'.
*/
export function inputRL(option) {
  let i = 0;
  let j = 0;

  let Q = {
    'id': cmd('git config --local --get PAT.User'),
    'pw': cmd('git config --local --get PAT.Token')};

  if(Q.pw === 0)
    option = 'token';

  switch (option) {
  case 'token':
    console.log('Only first attempt requires your ID/PW');
    Q['mtd'] = 'POST', Q['path'] = '/authorizations';
    j=2;
    break;

  case 'pr':
    console.log('Write about pull-request (title/body/head)');
    console.log('For "head", depending on where the branch is,');
    console.log('You can write "lunchclass" or your id');
    Q['mtd'] = 'POST', Q['path'] = '/repos/lunchclass/absolute/pulls';
    Q['title']='', Q['body']='', Q['head']= '';
    i=4, j=7;
    break;

  default:
    console.log('default');
  }

  const recursiveRL = function(value) {
    if (i < j) {
      rl.question(value + ': ', function(answer) {
        Q[Object.keys(Q)[i]] = answer;
        i++;
        recursiveRL(Object.keys(Q)[i]);
      });
    }else {
      ghAPI(Q);
      rl.close();
    }
  };
  recursiveRL(Object.keys(Q)[i]);
}

/**
* @param {Object} info The information.
* pw will replace the personal access token.
*/
function ghAPI(info) {
  // console.log(data.id +':' + data.pw);
  const options ={
    auth: info.id + ':' + info.pw,
    hostname: 'api.github.com',
    path: info.path,
    method: info.mtd,
    headers: {
      'User-Agent': 'Node js',
      'Content-Type': 'application/json'}};

  const req = https.request(options, (res) => {
    let body = '';

    res.on('data', function(contents) {
      body += contents;
    });

    res.on('end', function() {
      const result = JSON.parse(body.toString());
      const status = res.statusCode;

      if(info.path === '/authorizations' && status === 201) {
        // console.log('Get new token, please retry "pr"');
        execSync('git config --local --add PAT.User ' + info.id);
        execSync('git config --local --add PAT.Token ' + result.token);
      }

      console.log(result);
    });
  });

  req.on('error', function(e) {
    console.log('Error!', e.message);
  });

  let d = {};
  if (info.path === '/authorizations') {
    d = {
      'note': 'Token_Absolute',
      'scopes': 'repo'};
  } else if (info.path === '/repos/lunchclass/absolute/pulls') {
    d = {
      'title': info.title,
      'body': info.body,
      'head': info.head +':'+cmd('git symbolic-ref --short HEAD'),
      'base': 'master'};
  }
  console.log(d);
  req.write(JSON.stringify(d));
  req.end();
}
