const http = require('http');
const url = require('url');
// 解析上传的文件数据, 处理文件上传“就是”处理 POST 数据
const formidable = require("formidable");
const util = require('util');

const start = (port, route, handle) => {
  if (!port) {
    console.log('port is not defined');
    return;
  }

  const onRequest = (request, response) => {
    // let postData = '';
    // // 找出 url 路径
    // const pathname = url.parse(request.url).pathname;
    // console.log('Request received.'); // 页面进入时，才会有这个打印
    // // console.log('Request pathname: ', pathname);

    // // 设置接收数据编码格式为 utf8
    // request.setEncoding('utf8');

    // // 监听 data 事件
    // request.addListener('data', (postDataChunk) => {
    //   postData += postDataChunk;
    //   console.log('Received POST data trunk: ', postDataChunk);
    // });

    // // 接收完所有数据才触发，且只触发一次
    // request.addListener('end', () => {
    //   route(handle, pathname, response, postData);
    // });

    // // route(handle, pathname, response);

    // if (request.url == '/upload' && request.method.toLowerCase() === 'post') {
    //   // parse file upload
    //   const form = new formidable.IncomingForm();
    //   form.parse(request, (err, fields, files) => {
    //     response.writeHead(200, {'content-type': 'text/plain'});
    //     response.write('received upload:\n\n');
    //     response.end(util.inspect({fields: fields, files: files}));
    //   });
    //   return;
    // }

    // // show file upload form
    // response.writeHead(200, {'content-type': 'text/html'});
    // response.end(`
    //   <form action="/upload" enctype="multipart/form-data" method="post">
    //     <input type="text" name="title"><br>
    //     <input type="file" name="upload" multiple="multiple"><br>
    //     <input type="submit" value="Upload">
    //   </form>
    // `);

    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  }

  // 基础的 HTTP 服务器
  const server = http.createServer(onRequest).listen(port);

  console.log('server has started.'); // 服务启动后打印
}

exports.start = start;