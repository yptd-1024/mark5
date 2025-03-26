// 工具函数：规范化文本（去除多余空格和换行）
function normalizeText(text) {
    return text.replace(/\s+/g, ' ').trim();
  }
  
  // 从 GitHub 获取远程用户清单
  async function fetchRemoteUserList(repoUrl) {
    try {
      const response = await fetch(`https://raw.githubusercontent.com/${repoUrl}/main/userlist.txt`);
      if (!response.ok) throw new Error('无法获取远程用户清单');
      const text = await response.text();
      return text.split(',').map(u => normalizeText(u)).filter(u => u.length > 0);
    } catch (error) {
      console.error('获取远程用户清单出错:', error);
      return [];
    }
  }
  
  // 主逻辑函数
  async function applyTags() {
    chrome.storage.sync.get(['userList', 'tagContent', 'tagCSS', 'listMode', 'repoUrl'], async (data) => {
      const localList = data.userList ? data.userList.split(',').map(u => normalizeText(u)) : [];
      const tagContent = data.tagContent || '五毛';
      const defaultCSS = `
        position: absolute;
        font-size: 12px;
        color: red;
        border: 2px solid red;
        padding: 3px;
        z-index: 9999;
      `;
      const tagCSS = data.tagCSS && data.tagCSS.trim() !== '' ? data.tagCSS : defaultCSS;
      const listMode = data.listMode || 'local'; // 默认仅本地
      const repoUrl = data.repoUrl || 'yptd-1024/mark5';
  
      let userList = [];
      if (listMode === 'local') {
        userList = localList;
      } else if (listMode === 'remote') {
        userList = await fetchRemoteUserList(repoUrl);
      } else if (listMode === 'both') {
        const remoteList = await fetchRemoteUserList(repoUrl);
        userList = [...new Set([...localList, ...remoteList])]; // 合并并去重
      }
  
      if (userList.length === 0) return;
  
      const allElements = document.querySelectorAll('th, li span a, td a:not(.w70)');
      allElements.forEach((element) => {
        let targetElement = element;
        let username = normalizeText(element.textContent);
  
        const bElement = element.querySelector('b');
        if (bElement) {
          username = normalizeText(bElement.textContent);
          targetElement = bElement;
        }
  
        if (!username || username === '' || /[\d\/]+/.test(username)) return;
  
        if (userList.includes(username) && !element.parentElement.querySelector('.custom-user-tag')) {
          const parent = targetElement.parentElement;
          if (window.getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
          }
  
          const tag = document.createElement('span');
          tag.textContent = tagContent;
          tag.style.cssText = tagCSS;
          tag.className = 'custom-user-tag';
          targetElement.insertAdjacentElement('afterend', tag);
        }
      });
    });
  }
  
  // 页面初次加载时执行
  document.addEventListener('DOMContentLoaded', applyTags);
  
  // 监听动态内容变化
  const observer = new MutationObserver(applyTags);
  observer.observe(document.body, { childList: true, subtree: true });
