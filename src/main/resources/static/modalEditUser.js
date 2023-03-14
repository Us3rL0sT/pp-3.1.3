
$('#modalEdit').on('show.bs.modal', ev => {
    let button = $(ev.relatedTarget);
    let id = button.data('id');
    showEditModal(id);
})

async function showEditModal(id) {
    console.log("EDIT EDIT EDIT");
    let user = await getUser(id);
    let form = document.forms["formEditUser"];
    form.id.value = user.id;
    form.name.value = user.name;
    form.email.value = user.email;
    form.username.value = user.username;
    form.password.value = user.password;

    await fetch("http://localhost:8080/api/roles")
        .then(res => res.json())
        .then(roleList => {
            roleList.forEach(role => {
                let selectedRole = false;
                for (let i = 0; i < user.roleList.length; i++) {
                    if (user.roleList[i].role === role.role) {
                        selectedRole = true;
                        break;
                    }
                }
                let el = document.createElement("option");
                el.text = role.role.substring(5);
                el.value = role.id;
                if (selectedRole) el.selected = true;
                $('#rolesEditUser')[0].appendChild(el);
            })
        })
}