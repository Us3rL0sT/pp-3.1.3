const newUserForm = document.getElementById("newUserForm");
const header = document.getElementById("header");
const adminTable = document.getElementById("adminTable");
const userFormGroup = document.getElementById("userFormGroup");
const deleteForm = document.getElementById("deleteForm");
const editUserForm = document.getElementById("editUser");
const userTable = document.getElementById("userTable");
const deleteSelect = document.getElementById("deleteSelect");
const editSelect = document.getElementById("editSelect");

newUserForm.addEventListener("submit", event => {
    newUser(event).then(fillAdminTable).then(openAdminTable);
});




let users;
let roles;
let principal;

async function getPrincipal() {
    principal = await fetch("http://localhost:8080/api/principal").then(response => response.json()).then(JSON.stringify).then(JSON.parse);
}

async function getRoles() {
    roles =  await fetch("http://localhost:8080/api/roles").then(response => response.json()).then(JSON.stringify).then(JSON.parse);
}

async function getUsers() {
    users = await fetch("http://localhost:8080/api/users").then(response => response.json()).then(JSON.stringify).then(JSON.parse);
}


async function fillRoles() {
    await getRoles();
    let select = "";
    for (let role of roles) {
        select += '<option value="' + role.id + '">' + role.value.substring(5) + '</option>';
    }
    userFormGroup.innerHTML += '<label for="roles" class="col-form-label">Role</label>' +
        '<select class="custom-select" name="role" size="2" id="roles" multiple required>' +
        select +
        '</select>';
}

async function newUser(event) {
    const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    event.preventDefault();
    let formData = new FormData(newUserForm);


    let array = {};
    array = formData.getAll("role");
    for (let i = 0; i < array.length; i++) {
        array[i] = roles[array[i] - 1];
    }

    await fetch("http://localhost:8080/api", {
        method: "POST",
        body: JSON.stringify({
            "name": formData.get("name"),
            "lastName": formData.get("lastName"),
            "age": formData.get("age"),
            "email": formData.get("email"),
            "password": formData.get("password"),
            "role": array,
        }),
        headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken
        }
    })
    newUserForm.reset();
}

async function fillUserTable() {
    await getPrincipal();
    let roles = "";
    for (let el of principal.role) {
        roles += el.value.substring(5) + " ";
    }
    userTable.innerHTML = '<th class="font-weight-normal">' + principal.id + '</th>' +
        '<th class="font-weight-normal">' + principal.name + '</th>'+
        '<th class="font-weight-normal">' + principal.lastName + '</th>'+
        '<th class="font-weight-normal">' + principal.age + '</th>'+
        '<th class="font-weight-normal">' + principal.email + '</th>' +
        '<th class="font-weight-normal">' + roles + '</th>';
}

async function fillAdminTable() {
    // await getUsers();
    // adminTable.innerHTML = "";
    // for (let i = 0; i < users.length; i++) {
    //     let roles = "";
    //     for (let rol of users[i].role) {
    //         roles += rol.value.substring(5) + " ";
    //     }
    //     adminTable.innerHTML += '<tr>' +
    //         '<th class="font-weight-normal">' + users[i].id + '</th>' +
    //         '<th class="font-weight-normal">' + users[i].name + '</th>'+
    //         '<th class="font-weight-normal">' + users[i].lastName + '</th>'+
    //         '<th class="font-weight-normal">' + users[i].age + '</th>'+
    //         '<th class="font-weight-normal">' + users[i].email + '</th>' +
    //         '<th class="font-weight-normal">' + roles + '</th>' +


    async function getUsers() {
        fetch("http://localhost:8080/api/user")
            .then(res => res.json())
            .then(data => {
                $('#headerUsername').append(data.username);

                let user = `$(
            <tr>
                <td>${data.id}</td>
                <td>${data.username}</td>
                <td>${data.full_name}</td>
                <td>${data.email}</td>
                <td>${data.phone_number}</td>
                <td>${data.stringRoles}</td>
                <td>
                    <button type="button" class="btn btn-info" data-toggle="modal" id="buttonEdit"
                    data-action="edit" data-id="${user.id}" data-target="#editModalButton">Edit</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" data-toggle="modal" id="buttonDelete"
                    data-action="delete" data-id="${user.id}" data-target="#deleteModalButton">Delete</button>
                </td>`;
                $('#user-info-body').append(user);
            })

            // '<th>' +
            // '<button onclick="editModalButton(' + i + ')" type="button" class="btn btn-primary btn-info" data-toggle="modal" data-target="#editModal">Edit</button>' +
            // '</th>' +
            // '<th>' +
            // '<button onclick="deleteModalButton(' + i + ')" type="button" class="btn btn-primary btn-danger" data-toggle="modal" data-target="#deleteModal">Delete</button>' +
            // '</th>' +
            // '</tr>';

        roles = "";
    }
}

function editRoles(userRoles) {
    let select = "";
    for (let role of roles) {
        if (JSON.stringify(userRoles).includes(JSON.stringify(role))) {
            select += '<option value="' + role.id + '" selected>' + role.value.substring(5) + '</option>';
        } else {
            select += '<option value="' + role.id + '">' + role.value.substring(5) + '</option>';
        }
    }
    editSelect.innerHTML = '<label for="roles" class="col-form-label">Role</label>' +
        '<select class="custom-select" name="role" size="2" id="editRoles" multiple required>' +
        select +
        '</select>';
}

function deleteRoles(userRoles) {
    let select = "";
    for (let role of roles) {
        if (JSON.stringify(userRoles).includes(JSON.stringify(role))) {
            select += '<option value="' + role.id + '" selected>' + role.value.substring(5) + '</option>';
        } else {
            select += '<option value="' + role.id + '">' + role.value.substring(5) + '</option>';
        }
    }
    deleteSelect.innerHTML = '<label for="roles" class="col-form-label">Role</label>' +
        '<select class="custom-select" name="role" size="2" id="deleteRoles" multiple disabled>' +
        select +
        '</select>';
}

function deleteModalButton(id) {
    document.getElementById("idDelete").value = users[id].id;
    document.getElementById("deleteFirstname").value = users[id].name;
    document.getElementById("deleteLastName").value = users[id].lastName;
    document.getElementById("deleteAge").value = users[id].age;
    document.getElementById("deleteEmail").value = users[id].email;
    deleteRoles(users[id].role);
    deleteForm.addEventListener("submit",event => deleteUser(event, users[id].id).then(fillAdminTable).then(closeDeleteModal), {
        once: true
    });

}

function editModalButton(id) {
    document.getElementById("id").value = users[id].id;
    document.getElementById("editFirstname").value = users[id].name;
    document.getElementById("editLastName").value = users[id].lastName;
    document.getElementById("editAge").value = users[id].age;
    document.getElementById("editEmail").value = users[id].email;
    document.getElementById("editPassword").value = "";
    editRoles(users[id].role);
    editUserForm.addEventListener("submit", event => editUser(event, users[id].id).then(fillAdminTable).then(closeEditModal), {
        once: true
    });
}



async function editUser(event, id) {
    const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    event.preventDefault();
    let formData = new FormData(editUserForm);


    let array = {};
    array = formData.getAll("role");
    for (let i = 0; i < array.length; i++) {
        array[i] = roles[array[i] - 1];
    }

    await fetch("http://localhost:8080/api/admin/" + id, {
        method: "PATCH",
        body: JSON.stringify({
            "id": formData.get("id"),
            "name": formData.get("name"),
            "lastName": formData.get("lastName"),
            "age": formData.get("age"),
            "email": formData.get("email"),
            "password": formData.get("password"),
            "role": array,
        }),
        headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken
        }
    })
}

async function deleteUser(event, id) {
    const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');

    event.preventDefault(deleteForm);

    await fetch("http://localhost:8080/api/admin/" + id, {
        method: "DELETE",
        headers: {
            "X-XSRF-TOKEN": csrfToken
        }
    })
}

async function fillHeader() {
    await getPrincipal();
    header.innerHTML = '<a class="font-weight-bold">' + principal.email + ' </a>' +
        '<a>with roles: </a>';
    for (let el of principal.role) {
        header.innerHTML += '<a>' + el.value.substring(5) + ' </a>';
    }
}

function closeEditModal() {
    $('#editModal').modal('hide');
}

function closeDeleteModal() {
    $('#deleteModal').modal('hide');
}

function openAdminTable() {
    $('#Admin a[href="#table"]').tab('show')
}
