import {getRolesFromForm, requestURL} from "./app.js";
import {printUsersTable} from "./usersTable.js";


const addUserForm = document.querySelector(".add-user-form");

addUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(requestURL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: document.getElementById("add-user-field-username").value,
            firstName: document.getElementById("add-user-field-name").value,
            lastName: document.getElementById("add-user-field-surname").value,
            email: document.getElementById("add-user-field-email").value,
            age: document.getElementById("add-user-field-age").value,
            password: document.getElementById("add-user-field-password").value,
            roles: getRolesFromForm(document.getElementById("add-user-field-roles"))
        })
    })
        .then(() => {
            document.getElementById("all-users-admin-panel").click();
            printUsersTable()
        })
})