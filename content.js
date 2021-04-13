var state,checkbox,timer,h,n,m,s,
  reset = false,
  request,
  data;
checkbox = document.getElementById("toggle");
checkbox.checked = true;
timer = setInterval(getTime, 1000);
reset = document.getElementById("reset");
state = localStorage["last_state"];
if (state == "true") {
  checkbox.checked = true;
  clearInterval(timer);
  timer = setInterval(getTime, 1000);
} else if (state == "false") checkbox.checked = false;
reset.addEventListener("click", Reset);
checkbox.addEventListener("change", function () {
  if (this.checked) {
    state = true;
    clearInterval(timer);
    timer = setInterval(getTime, 1000);
    localStorage["last_state"] = state;
    chrome.browserAction.setBadgeText({ text: "ON" });
  } else {
    state = false;
    clearInterval(timer);
    localStorage["last_state"] = state;
    chrome.browserAction.setBadgeText({ text: "OFF" });
  }
});
function getTime() {
  chrome.storage.local.get("total", function (result) {
    n = parseInt(result["total"]) || 0;
  });
  chrome.storage.local.get("seconds", function (result) {
    s = parseInt(result["seconds"]) || 0;
  });
  m = n / 60;
  h = m / 60;
  document.getElementById("hours").innerText = parseInt(h) || 0;
  document.getElementById("minutes").innerText = parseInt(m) || 0;
  document.getElementById("seconds").innerText = parseInt(s) || 0;
}

function Reset() {
  n = 0;
  s = 0;
  reset = true;
  localStorage["reset"] = reset;
  chrome.storage.local.set({ total: parseInt(n) }, function () {});
  chrome.storage.local.set({ seconds: parseInt(s) }, function () {});
  getTime();
}
