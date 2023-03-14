import {requestURL} from "./app.js";

const allUsersTable = document.getElementById("all users table-body");

// Код для заполнения таблицы пользователей
let renderUsersTable = data => {
    console.log(data)
    if (data.length > 0) {
        let tableHTML = "";
        data.forEach(user => {
            tableHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.full_name}</td>
                <td>${user.email}</td>
                <td>${user.phone_number}</td>
                <td>${user.stringRoles}</td>
                <td>
                <button type="button" class="btn btn-info" data-toggle="modal" id="buttonEdit"
                data-action="edit" data-id="${user.id}" data-target="#edit">Edit</button>
            </td>
            <td>
                <button type="button" class="btn btn-danger" data-toggle="modal" id="buttonDelete"
                data-action="delete" data-id="${user.id}" data-target="#delete">Delete</button>
            </td>
        </tr>`;
        })
        allUsersTable.innerHTML = tableHTML;
    }
}

export function printUsersTable() {
    fetch(requestURL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => renderUsersTable(data));
}

printUsersTable();