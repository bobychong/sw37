// 加载头部、分类、底部组件
document.addEventListener('DOMContentLoaded', function() {
    // 加载头部
    fetch('/common/header.html')
        .then(response => response.text())
        .then(data => document.getElementById('header').innerHTML = data);
    
    // 加载分类栏
    fetch('/common/categories.html')
        .then(response => response.text())
        .then(data => document.getElementById('categories').innerHTML = data);
    
    // 加载底部
    fetch('/common/footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data);
});