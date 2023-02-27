
const URLUserAPI = 'http://localhost:8080/api/users'
const usersTable = document.querySelector('#allUsersTable')
const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },

    updateUser: async (user) => await fetch(URLUserAPI, {
        method: 'PUT',
        headers: userFetchService.head,
        body: JSON.stringify(user)
    }),

    createUser: async (user) => await fetch(URLUserAPI, {
        method: 'POST',
        headers: userFetchService.head,
        body: JSON.stringify(user)
    }),

    deleteUser: async (id) => await fetch(URLUserAPI + `/${id}`, {
        method: 'DELETE',
        headers: userFetchService.head
    })
}

let fillTable = (users) => {
    let output = '';
    users.forEach(user => {
        let roleOfUser = '';
        for (let a of user.authorities) {
            roleOfUser += a.authority.replace("ROLE_", "") + " ";
        }
        output += `
                  <tr>
                    <th scope="row">${user.id}</th>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${roleOfUser}</td>
                    <td>
                    <a /*th:href="@{/api/users/${user.id}}"*/
                       class="edit btn btn-info text-white eBtn"
                       data-toggle="modal" value="${user.id}"><span>Изменить</span></a>
                </td>
                <td>
                    <a /*th:href="@{/api/users/${user.id}}"*/
                       class="btn btn-danger text-white delBtn"
                       data-toggle="modal" value="${user.id}"><span>Удалить</span></a>
                </td>
                  </tr>
    `;
    });
    usersTable.innerHTML = output;
}

function refreshTableUsers() {
    fetch(URLUserAPI)
        .then(response => response.json())
        .then((data) => {
            fillTable(data);
            allModalButtonRegistration();
            modalButtonListeners();
        });
}
refreshTableUsers();

let allModalButtonRegistration = () => {
    $(document).ready(function (event) {
        $('.table .eBtn').on('click', function (event) {
            event.preventDefault();
            const userId = $(this).attr('value');
            let href = URLUserAPI + "/" + userId;
            console.log('href=' + href)

            $.get(href, function (user, status) {
                $('.myEditForm #id').val(user.id);
                $('.myEditForm #name').val(user.name);
                $('.myEditForm #surname').val(user.surname);
                $('.myEditForm #username').val(user.username);
                $('.myEditForm #password').val(user.password);
                $('.myEditForm #authorities').val(user.authorities);
            });
            $('.myEditForm #editEmployeeModal').modal();
        });

        $('.table .delBtn').on('click', function (event) {
            event.preventDefault();
            const userId = $(this).attr('value');
            let href = URLUserAPI + "/" + userId;
            console.log('href=' + href);

            $.get(href, function (user, status) {
                $('.myDeleteForm #id').val(user.id);
                $('.myDeleteForm #name').val(user.name);
                $('.myDeleteForm #username').val(user.username);
                $('.myDeleteForm #password').val(user.password);
                $('.myDeleteForm #authorities').val(user.authorities);
                let dB = $('.myDeleteForm #modalDelButton');
                dB[0].setAttribute('data-userid', user.id);
            });
            $('.myDeleteForm #deleteEmployeeModal').modal();
        });
    });
};

let modalButtonListeners = () => {

    $("#deleteEmployeeModal").find('#modalDelButton').on('click', async (event) => {
        let delModal = $('#deleteEmployeeModal');
        let id = delModal.find('#id').val().trim();
        await userFetchService.deleteUser(id);
        delModal.modal('hide');
        fetch(URLUserAPI)
            .then(response => response.json())
            .then((data) => {
                fillTable(data);
                allModalButtonRegistration();
            });
    })


    $("#editEmployeeModal").find('#modalEditButton').on('click', async (event) => {

        let editModal = $('#editEmployeeModal');
        let id = editModal.find('#id').val();
        let name = editModal.find('#name').val();
        let surname = editModal.find('#surname').val();
        let username = editModal.find('#username').val();
        let password = editModal.find('#password').val();
        let rolS = editModal.find('#authorities').val();
        let roles = [];
        rolS.forEach(roleId => {
            roles.push({
                id: +roleId, authority: roleId == 2 ? "ROLE_USER" : "ROLE_ADMIN"
            });
        })

        let user = {
            id: id,
            name: name,
            surname: surname,
            username: username,
            password: password,
            authorities: roles
        }
        await userFetchService.updateUser(user);

        editModal.modal('hide');
        fetch(URLUserAPI)
            .then(response => response.json())
            .then((data) => {
                fillTable(data);
                allModalButtonRegistration();
            });
    })
};

$("#newUser").find('#addNewUserButton').on('click', async (event) => {

    let editModal = $('#newUser');

    let name = editModal.find('#name').val();
    let surname = editModal.find('#surname').val();
    let username = editModal.find('#username').val();
    let password = editModal.find('#password').val();
    let authorities = editModal.find('#authorities').val();
    let roles = [];

    authorities.forEach(roleId => {
        roles.push({
            id: +roleId, authority: roleId == 1 ? "ROLE_ADMIN" : "ROLE_USER"
        });
    })

    let user = {
        name: name,
        surname: surname,
        username: username,
        password: password,
        authorities: roles
    }
    await userFetchService.createUser(user);

    fetch(URLUserAPI)
        .then(response => response.json())
        .then((data) => {
            fillTable(data);
            allModalButtonRegistration();
        });
});