
$(async function() {
    deleteUser();
});
function deleteUser() {
    console.log("asdasdasdasdas");

    const deleteForm = document.forms["formDeleteUser"];
    deleteForm.addEventListener("submit", ev => {
        ev.preventDefault();
        fetch(`http://localhost:8080/api/` + deleteForm.id.value, {
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

$('#delete').on('show.bs.modal', ev => {
    console.log("DELETE DELETE DELTER")
    let button = $(ev.relatedTarget);
    let id = button.data('id');
    deleteUser2(id);
})

async function deleteUser2(id) {
    const user = await get(id);
    const form = document.forms["formDeleteUser"];
    form.id.value = user.id;
    form.name.value = user.name;
    form.age.value = user.age;
    form.email.value = user.email;
    form.password.value = user.password;
}

async function get(id) {
    const url = `http://localhost:8080/api/` + id;
    const response = await fetch(url);
    return await response.json();
}