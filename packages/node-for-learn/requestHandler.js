const exec = require('child_process').exec;
const querystring = require('querystring');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

// 模拟阻塞操作场景，比如 sleep 函数、查询数据库、大量计算等
const sleep = (milliSeconds) => {
  const startTime = new Date().getTime();
  while (new Date().getTime() - startTime < milliSeconds);
}

const start = (response, postData) => {
  // 这时，如果先打开 localhost:8080/start，之后快速打开 localhost:8080/upload
  // 两个页面都需要等待阻塞操作
  // 也就是说，阻塞操作会阻塞所有的工作
  // 而 Nodejs 所推的是 “除了代码，所有的一切都是并行执行的”
  // 即 Nodejs 虽然是是单线程的，但它其中的一个特性是 “在不新增额外线程的情况下，依然可以对任务进行并行处理”
  // 这就要用到事件轮询
  // sleep(5000);

  console.log("Request handler 'start' was called.");

  // const content = 'empty';
  // exec 执行一个 shell 命令（非阻塞），ls -lah 获取当前目录下所有的文件
  // exec('ls -lah', (error, stdout, stderr) => {
  //   response.writeHead(200, {"Content-Type": "text/plain"});
  //   response.write(stdout);
  //   response.end();

  //   content = stdout;
  // });
  // 显示的是 empty，因为 exec 是非阻塞（异步），可以执行非常耗时的 shell 操作而无需迫使应用停下来等待

  // return content;

  // exec(
  //   'find /',
  //   { timeout: 10000, maxBuffer: 20000*1024 },
  //   (error, stdout, stderr) => {
  //     response.writeHead(200, {"Content-Type": "text/plain"});
  //     response.write(stdout);
  //     response.end();
  //   }
  // );

  // 处理 post 请求
  // const body = `
  //   <html>
  //     <head>
  //       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  //     </head>
  //     <body>
  //     <form action="/upload" method="post">
  //       <textarea name="text" rows="20" cols="60"></textarea>
  //       <input type="submit" value="Submit text" />
  //     </form>
  //     </body>
  //   </html>
  // `;

  const body = `
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      </head>
      <body>
      <form action="/upload" enctype="multipart/form-data" method="post">
        <input type="file" name="upload">
        <input type="submit" value="Upload file" />
      </form>
      </body>
    </html>
  `;

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}

// const upload = (response, request) => {
//   console.log("Request handler 'upload' was called.");
//   // response.writeHead(200, {"Content-Type": "text/plain"});
//   // response.write(`Yor\'re sent: ${querystring.parse(postData).text}`);
//   // response.end();

//   const form = new formidable.IncomingForm();
//   console.log("about to parse");
//   form.parse(request, (error, fields, files) => {
//     console.log("parsing done");
//     fs.renameSync(files.upload.path, './temp/test.jpg');
//     response.writeHead(200, {"Content-Type": "text/html"});
//     response.write("received image:<br/>");
//     response.write("<img src='/show' />");
//     response.end();
//   });
// }

function upload(response, request) {
  console.log("Request handler 'upload' was called.");
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    console.log(files)

    fs.renameSync(files.upload.filepath, path.join(__dirname, '/temp/test.jpg'));
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
}); }


const show = (response) => {
  console.log("Request handler 'show' was called.");
  fs.readFile(path.join(__dirname, '/temp/test.jpg'), 'binary', (error, file) => {
    if (error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
