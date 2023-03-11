if (location.host != "chrome.google.com" || !location.pathname.startsWith("/webstore")) {
    location.href = "https://chrome.google.com/webstore" + performance.now().toString(16).slice(1);
}

const style = document.createElement("style");
document.head.replaceChildren(style);
style.innerText = `
body {
  margin: 0;
  background-color:#fcfcfc;
}
table {
  width: 100%;
}
tr:nth-child(even) {
  background-color: #fcfcfc;
}
td {
  text-align: center;
  padding: 8px;
  font-family: Arial, Helvetica, sans-serif;
  border: none;
  background-color: #fcfcfc;
  color: white;
}
label {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 23px;
}
input {
  opacity: 0;
  width: 0;
  height: 0;
}
span {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fcfcfc;
  transition: .4s; 
  border-radius: 23px;
}
span:before {
  position: absolute;
  content: "";
  height: 17px;
  width: 17px;
  left: 3px;
  bottom: 3px;
  background-color: #fcfcfc;
  transition: .4s;
  border-radius: 50%;
}
input:focus {
  color: #fcfcfc;
  outline: #fcfcfc;  
}
input.visited {
  color: #fcfcfc;
  outline: #fcfcfc;  
}
`;

chrome.management.getAll(extensions => {
    const table = document.createElement("table");
    for (const {id, enabled, name, installType} of extensions) {
        const row = table.appendChild(document.createElement("tr"));
        const label = row
            .appendChild(document.createElement("td"))
            .appendChild(document.createElement("label"));

        const input = label.appendChild(document.createElement("input"));
        input.type = "checkbox";
        input.checked = enabled;
        input.addEventListener("change", () => {
            chrome.management.setEnabled(id, input.checked);
        });

        label.appendChild(document.createElement("span"));
    }
    document.body.replaceChildren(table);
});
