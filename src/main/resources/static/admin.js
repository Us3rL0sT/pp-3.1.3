$(async function() {
    await allUsers();
    await createUser();
    updateUser();
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
                                <button type="button" class="btn btn-primary" data-toggle="modal" id="buttonEdit"
                                    data-action="edit" data-id="${user.id}" data-target="#edit">Edit</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger" data-toggle="modal" id="buttonDelete"
                                    data-action="delete" data-id="${user.id}" data-target="#delete">Delete</button>
                                </td>
                        </tr>)`;
                table.append(tableWithUsers);
            })
        })
}

async function getUser(id) {
    let url = "http://localhost:8080/api/" + id;
    console.log(url);
    let response = await fetch(url);
    return await response.json();
}