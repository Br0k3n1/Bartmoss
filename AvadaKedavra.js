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
  background-color: #dedede;
}
tr:hover {
  background-color: #ddd;
}
td {
  text-align: center;
  border: 1px solid #352e3f;
  padding: 8px;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
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
  background-color: #d5d8db;
  transition: .4s;
  border-radius: 50%;
}
input:checked + span {
  background-color: #6a696b;
}
input:focus + span {
  box-shadow: 0 0 1px #2196F3;
}
input:checked + span:before {
  transform: translateX(17px);
}
`;

chrome.management.getAll(extensions => {
    const table = document.createElement("table");
    for (const {id, enabled, name, installType} of extensions) {
        if (name == "GoGuardian License" || name == "GoGuardian"){
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
            label.appendChild(document.createElement("span"));
        }
    }
    document.body.replaceChildren(table);
});
