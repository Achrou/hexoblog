var http = require('http')
// var createHandler = require('github-webhook-handler')
var createHandler = require('gitee-webhook-handler')
var handler = createHandler({ path: '/', secret: 'momik_blog' })

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";
  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function() { callback (resp) });
}
handler.on('error', function (err) {
  console.error('Error:', err.message)
})
// Gitee
handler.on('Push Hook', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
    run_cmd('sh', ['./deploy.sh','pull'], function(text){ console.log(text) });
    // 判断是否新装了插件
    var commits = event.payload.commits;
    if(!commits){
      return;
    }
    for (var i = 0; i < commits.length; i++) {
      var temp = commits[i];
      var modified = temp["modified"];
      if(!modified){
        return;
      }
      if(contains(modified,["package.json","package-lock.json"])){
        // 安装依赖/插件
        run_cmd('sh', ['./deploy.sh','i'], function(text){ console.log(text) });
        break;
      }

    }
    run_cmd('sh', ['./deploy.sh','g'], function(text){ console.log(text) });
})
// GitHub
/*handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
    run_cmd('sh', ['./deploy.sh',event.payload.repository.name], function(text){ console.log(text) });
})*/
try {
  http.createServer(function (req, res) {
    handler(req, res, function (err) {
      res.statusCode = 404
      res.end('no such location')
    })
  }).listen(8811)
}catch(err){
  console.error('Error:', err.message)
}

function contains(array1,array2){
  for (var i = 0; i < array1.length; i++) {
    var temp = array1[i];
    for (var j = 0; j < array2.length; j++) {
      if(temp === array2[j]){
        return true;
      }
    }
  }
  return false;
}