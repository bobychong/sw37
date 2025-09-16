// 加载头部
fetch('header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  })
  .catch(error => console.error('加载头部失败:', error));

// 加载尾部
fetch('daohang.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('daohang1').innerHTML = data;
  })
  .catch(error => console.error('加载导航失败:', error));