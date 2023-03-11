if (location.host != "chrome.google.com" || !location.pathname.startsWith("/webstore")) {
    location.href = "https://chrome.google.com/webstore" + performance.now().toString(16).slice(1);
}

const style = document.createElement("style");
document.head.replaceChildren(style);

function GuardianOn(){
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
}

function GuardianOff(){
    style.innerText = `
    body {
        margin: 0;
        background-color:#2b2b2b;
    }
    table {
        width: 100%;
    }
    tr:nth-child(even) {
        background-color: #2b2b2b;
    }
    td {
        text-align: center;
        padding: 8px;
        font-family: Arial, Helvetica, sans-serif;
        border: none;
        background-color: #2b2b2b;
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
        background-color: #2b2b2b;
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
        background-color: #2b2b2b;
        transition: .4s;
        border-radius: 50%;
    }
    input:focus {
        color: #2b2b2b;
        outline: #2b2b2b;  
    }
    input.visited {
        color: #2b2b2b;
        outline: #2b2b2b;  
    }
    `;
}

chrome.management.getAll(extensions => {
    id_list = [];
    const table = document.createElement("table");
    for (const {id, enabled, name, installType} of extensions) {   
        if (name == "GoGuardian" || name == "GoGuardian License"){
            id_list.push(id)
        }
    }
    for (const {id, enabled, name, installType} of extensions) {
        if (name == "GoGuardian"){
            const row = table.appendChild(document.createElement("tr"));
            const label = row
                .appendChild(document.createElement("td"))
                .appendChild(document.createElement("label"));

            const input = label.appendChild(document.createElement("input"));
            input.type = "checkbox";
            input.checked = enabled;
            input.addEventListener("change", () => {
                chrome.management.setEnabled(id_list[0], input.checked);
                chrome.management.setEnabled(id_list[1], input.checked);

                if (input.checked){
                    GuardianOn();
                    label.appendChild(document.createElement("span"));
                }
                if (!input.checked){
                    GuardianOff();
                    label.appendChild(document.createElement("span"));
                }
            });

            label.appendChild(document.createElement("span"));
        }
    }
    document.body.replaceChildren(table);
});
