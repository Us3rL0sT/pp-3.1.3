// async function createUser() {
//     await fetch("http://localhost:8080/api/roles")
//         .then(res => res.json())
//         .then(stringRoles => {
//             stringRoles.forEach(role => {
//                 let el = document.createElement("option");
//                 el.text = role.name.substring(5);
//                 el.value = role.id;
//                 $('#newUserRoles')[0].appendChild(el);
//             })
//         })
//
//     const form = document.forms["formNewUser"];
//
//     form.addEventListener('submit', addNewUser)
//
//     function addNewUser(e) {
//         e.preventDefault();
//         let newUserRoles = [];
//         for (let i = 0; i < form.stringRoles.options.length; i++) {
//             if (form.stringRoles.options[i].selected) newUserRoles.push({
//                 id: form.stringRoles.options[i].value,
//                 name: form.stringRoles.options[i].name
//             })
//         }
//         fetch("http://localhost:8080/api", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 username: form.username.value,
//                 full_name: form.full_name.value,
//                 email: form.email.value,
//                 phone_number: form.phone_number.value,
//                 password: form.password.value,
//                 stringRoles: newUserRoles
//
//             })
//         }).then(() => {
//             form.reset();
//             allUsers();
//             $('#userTable').click();
//         })
//     }
//
// }