$(async function() {

    await allUsers();
    // await createUser();
    editUser();
    deleteUser();
});

async function allUsers() {
    const table = $('#adminTable').empty()

    fetch("http://localhost:8080/api/users")
        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                let tableWithUsers = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.full_name}</td>
                            <td>${user.email}</td>
                            <td>${user.phone_number}</td>
                            <td>${user.stringRoles}</td>
                            <td>
                                <button type="button" class="btn btn-primary my-edit-btn" data-toggle="modal" id="buttonEdit"
                                   data-id="${user.id}" data-target="#edit">Edit</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger my-delete-btn" data-toggle="modal" id="buttonDelete"
                                    data-action="delete" data-id="${user.id}" data-target="#delete">Delete</button>
                                </td>
                        </tr>)`;
                table.append(tableWithUsers);
            })
        })
        .then(() => editBtn())
        .then(() => deleteBtn())
}

const modal = document.getElementById('edit');


// EDIT

const editBtn = () => {
    const editBtns = Object.values(document.getElementsByClassName('my-edit-btn'));
    for(let item of editBtns) {
        item.addEventListener('click', async () => {
            $('#edit').modal('toggle');
            const id = Number(item.dataset?.id);

            await showEditModal(id);
        })
    }
}

const showEditModal = async (id) => {
    let user = await getUser(id);
    let form = document.forms["formEditUser"];
    form.id.value = user.id;
    form.username.value = user.username;
    form.full_name.value = user.full_name;
    form.email.value = user.email;
    form.phone_number.value = user.phone_number;
    form.password.value = user.password;
    form.role.value = user.role;


    $('#rolesEditUser').empty();
    await fetch("http://localhost:8080/api/roles")
        .then(res => res.json())
        .then(roles => {
            roles.forEach(role => {
                let el = document.createElement("option");
                el.text = role.name.substring(5);
                el.value = role.id;
                $('#rolesEditUser')[0].appendChild(el);
            })
        });
}


function editUser() {
    const editForm = document.forms["formEditUser"];
    editForm.addEventListener("submit", ev => {
        ev.preventDefault();
        let editUserRoles = [];
        for (let i = 0; i < editForm.roles.options.length; i++) {
            if (editForm.roles.options[i].selected) editUserRoles.push({
                id: editForm.roles.options[i].value,
                name: editForm.roles.options[i].text
            })
        }
        fetch("http://localhost:8080/api/" + editForm.id.value, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: editForm.id.value,
                username: editForm.username.value,
                full_name: editForm.full_name.value,
                email: editForm.email.value,
                phone_number: editForm.phone_number.value,
                roles: editUserRoles,
                password: editForm.password.value

            })
        }).then(() => {
            $('#editFormCloseButton').click();
            allUsers();
        })
    })
}







// DELETE

const deleteBtn = () => {
    const deleteBtns = Object.values(document.getElementsByClassName('my-delete-btn'));
    for(let item of deleteBtns) {
        item.addEventListener('click', async () => {
            $('#delete').modal('toggle');
            const id = Number(item.dataset?.id);

            await showDeleteModal(id);
        })
    }
}

const showDeleteModal = async (id) => {
    let user = await getUser(id);
    let form = document.forms["formDeleteUser"];
    form.id.value = user.id;
    form.username.value = user.username;
    form.full_name.value = user.full_name;
    form.email.value = user.email;
    form.phone_number.value = user.phone_number;
    form.roles.value = user.roles;



    $('#rolesDeleteUser').empty();
    await fetch("http://localhost:8080/api/roles")
        .then(res => res.json())
        .then(roles => {
            roles.forEach(role => {
                let el = document.createElement("option");
                el.text = role.name.substring(5);
                el.value = role.id;
                $('#rolesDeleteUser')[0].appendChild(el);
            })
        });

}

function deleteUser() {
    const deleteForm = document.forms["formDeleteUser"];
    deleteForm.addEventListener("submit", ev => {
        ev.preventDefault();
        fetch("http://localhost:8080/api/" + deleteForm.id.value, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                $('#deleteFormCloseButton').click();
                allUsers();
            })
    })
}



async function getUser(id) {
    let url = "http://localhost:8080/api/" + id;
    let response = await fetch(url);
    return await response.json();
}