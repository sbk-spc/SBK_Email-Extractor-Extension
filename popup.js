document.getElementById("extract").addEventListener("click", async () => {

  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  chrome.scripting.executeScript(
    {
      target: {tabId: tab.id},
      function: extractEmails
    },
    (results) => {
      document.getElementById("result").value = results[0].result.join("\n");
    }
  );

});

function extractEmails() {

  let text = document.body.innerText;

  let regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/gi;

  let emails = text.match(regex) || [];

  let uniqueEmails = [...new Set(emails)];

  return uniqueEmails;
}