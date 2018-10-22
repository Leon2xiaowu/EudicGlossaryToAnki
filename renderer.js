// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');
var fs = require('fs');

// 拖拽文件到窗口事件
const holder = document.querySelector('#J_dragFile');

holder.ondragover = () => {
  return false;
}
holder.ondragleave = holder.ondragend = () => {
  return false;
}
holder.ondrop = (e) => {
  e.preventDefault()
  for (let f of e.dataTransfer.files) {
    // console.log('File(s) you dragged here: ', f)
    console.log(f);
    const reader = new FileReader();

    let fileContent;
    reader.onload = () => {
      fileContent = reader.result;
      processWord(fileContent, f.path)
    }
    reader.readAsText(f, 'UTF-8');
  }
  return false;
}

function processWord(contents, path) {
  // 0,"considerate","adj. 体贴的, 体谅的" => "considerate"|"adj. 体贴的, 体谅的"
  // 处理成这样
  // const slitContent = contents.split(/\d+,"/);
  // const result = [];
  // slitContent.forEach((element) => {
  //   result.push(element.replace(/","/,'|'));
  // });
  const result = contents.replace(/,"/g, '|"')
  // TODO: 保存文件
  fs.writeFile(path, result,  function(err) {
    if (err) {
      alert('发生了某些错误')
      return console.error(err);
    }
    console.log("数据写入成功！");
    console.log("--------我是分割线-------------")
    // console.log("读取写入的数据！");
    alert(`文件「${path}」转换成功`)
  });
  // ipcRenderer.sendSync('save-result', 'result') 
}
