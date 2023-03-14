export const requestURL = "http://localhost:8080/api/users/";


const columns = ["id", "username", "full_name", "email", "phone_number", "password", "roles"];

export function getRolesFromForm(userRolesSelect) {
    return Array.from(userRolesSelect.selectedOptions).map(option => option.text);
}


export default function getElementsById(e, prefix) {
    const userInfo = e.target.parentNode.parentNode;
    for (let i = 0; i < columns.length; i++) {
        document.getElementById(prefix + columns[i]).value = userInfo.children[i].innerHTML;
    }
    return userInfo;
}