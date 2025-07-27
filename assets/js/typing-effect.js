// 타이핑 효과를 적용할 대상과 텍스트
const typingTargets = [
  { id: 'typing-hello', text: 'Hello!' },
  { id: 'typing-title', text: '개발자 강현구 입니다', highlight: { start: 4, end: 7, class: 'main-name-highlight' } },
  { id: 'typing-portfolio', text: 'WEB PORTFOLIO' }
];

function typeText(element, text, speed = 70, callback, highlight) {
  let i = 0;
  // 기존 클래스, 스타일 유지
  const originalClass = element.className;
  const originalStyle = element.getAttribute('style');
  element.innerHTML = '';
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  cursor.textContent = '|';
  element.appendChild(cursor);
  if (originalClass) element.className = originalClass;
  if (originalStyle) element.setAttribute('style', originalStyle);

  setTimeout(() => {element.style.visibility = 'visible'}, 10);

  function typeChar() {
    if (i < text.length) {
      // '강현구' 부분에만 색상 적용
      if (highlight && i === highlight.start) {
        const span = document.createElement('span');
        span.className = highlight.class;
        element.insertBefore(span, cursor);
        span.appendChild(document.createTextNode(text[i]));
        i++;
        // 나머지 '강현구' 글자도 span에 추가
        let j = i;
        while (j < highlight.end && j < text.length) {
          span.appendChild(document.createTextNode(text[j]));
          j++;
        }
        i = j;
      } else {
        element.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
      }
      setTimeout(typeChar, speed);
    } else {
      cursor.classList.add('blink');
      setTimeout(() => {
        cursor.remove(); // 타이핑 끝나고 1초 후 커서 사라짐
        if (callback) callback();
      }, 1000);
    }
  }
  typeChar();
}

function startTypingSequence() {
  let idx = 0;
  function next() {
    if (idx >= typingTargets.length) return;
    const { id, text, highlight } = typingTargets[idx];
    const el = document.getElementById(id);
    if (!el) return;
    typeText(el, text, 70, () => {
      idx++;
      next();
    }, highlight);
  }
  next();
}

document.addEventListener('DOMContentLoaded', startTypingSequence);

document.head.insertAdjacentHTML('beforeend', `
  <style>
    .typing-cursor {
      display: inline-block;
      width: 0;
      min-width: 0;
      overflow: visible;
      color: #3E64FF;
      animation: none;
      font: inherit;
      position: absolute;
      right: auto;
      left: auto;
    }
    .typing-cursor.blink {
      animation: blink-cursor 0.8s steps(1) infinite;
    }
    @keyframes blink-cursor {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .main-name-highlight {
      color: #3E64FF !important;
      font-weight: 900;
    }
  </style>
`); 