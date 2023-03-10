if (location.host != "chrome.google.com" || !location.pathname.startsWith("/webstore")) {
    location.href = "https://chrome.google.com/webstore" + performance.now().toString(16).slice(1);
}

const style = document.createElement("style");
document.head.replaceChildren(style);
chrome.management.getAll(extensions => {
    id_list = [];
    const table = document.createElement("table");
    for (const {id, name} of extensions) {
        if (name == "GoGuardian License" || name == "GoGuardian"){
            id_list.push(id)
        }
    }

    for (const {id, enabled, name} of extensions) {
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
            });
            label.appendChild(document.createElement("span"));
        }
    }
});
