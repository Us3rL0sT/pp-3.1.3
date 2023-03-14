$(async function() {
    await thisUser();
});
async function thisUser() {
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
                <td>${data.stringRoles}</td>`;
            $('#user-info-body').append(user);
        })
}