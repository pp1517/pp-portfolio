export function displayDialogue(text, onDisplayEnd) {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");
  const closeBtn = document.getElementById("close");

  dialogueUI.setAttribute("style", `
    display: block !important;
    position: fixed !important;
    bottom: 20px !important;
    left: 10% !important;
    width: 80% !important;
    min-height: 150px !important;
    background: #1a1a2e !important;
    border: 3px solid #e0a800 !important;
    border-radius: 8px !important;
    padding: 20px 24px !important;
    font-size: 18px !important;
    z-index: 999999 !important;
    color: white !important;
    font-family: monospace !important;
    line-height: 1.6 !important;
  `);

  closeBtn.setAttribute("style", `
    display: inline-block !important;
    margin-top: 12px !important;
    background: #e0a800 !important;
    color: #1a1a2e !important;
    border: none !important;
    padding: 6px 20px !important;
    cursor: pointer !important;
    font-size: 15px !important;
    font-weight: bold !important;
    border-radius: 4px !important;
  `);

  let index = 0;
  let currentText = "";
  const intervalRef = setInterval(() => {
    if (index < text.length) {
      currentText += text[index];
      dialogue.innerHTML = currentText;
      index++;
      return;
    }
    clearInterval(intervalRef);
  }, 1);

  function onCloseBtnClick() {
    onDisplayEnd();
    dialogueUI.setAttribute("style", "display: none !important;");
    dialogue.innerHTML = "";
    clearInterval(intervalRef);
    closeBtn.removeEventListener("click", onCloseBtnClick);
    document.getElementById("game").focus();
  }

  closeBtn.addEventListener("click", onCloseBtnClick);

  document.addEventListener("keypress", (key) => {
    if (key.code === "Enter") {
      onCloseBtnClick();
    }
  });
}

export function setCamScale(k) {
  const resizeFactor = k.width() / k.height();
  if (resizeFactor < 1) {
    k.setCamScale(k.vec2(1));
  } else {
    k.setCamScale(k.vec2(1.5));
  }
}
