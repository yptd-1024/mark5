// 保存设置
document.getElementById('save').addEventListener('click', () => {
    const userList = document.getElementById('userList').value;
    const listMode = document.getElementById('listMode').value;
    const repoUrl = document.getElementById('repoUrl').value;
    const tagContent = document.getElementById('tagContent').value;
    const tagCSS = document.getElementById('tagCSS').value;
  
    chrome.storage.sync.set({ userList, listMode, repoUrl, tagContent, tagCSS }, () => {
      const status = document.getElementById('status');
      status.textContent = '设置已保存！';
      setTimeout(() => { status.textContent = ''; }, 2000);
    });
  });
  
  // 加载已有设置
  chrome.storage.sync.get(['userList', 'listMode', 'repoUrl', 'tagContent', 'tagCSS'], (data) => {
    document.getElementById('userList').value = data.userList || '';
    document.getElementById('listMode').value = data.listMode || 'local';
    document.getElementById('repoUrl').value = data.repoUrl || 'https://github.com/yptd-1024/mark5';
    document.getElementById('tagContent').value = data.tagContent || '五毛';
    document.getElementById('tagCSS').value = data.tagCSS || `
      position: absolute;
      font-size: 12px;
      color: red;
      border: 2px solid red;
      padding: 3px;
      z-index: 9999;
    `;
  });