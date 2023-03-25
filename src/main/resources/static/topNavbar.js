const userURL = "http://localhost:8080/api/user/"

const fillNavbar = user => {
    if (user) {
        document.getElementById("user-authorized-navbar").innerHTML = `
            <span class="navbar-brand mb-0 h1">
        
                <!-- username and roles authorized user -->
        
                <a>${user.username}</a>
                <span class="text-start">with roles:
                    <a>${user.stringRoles}</a>
                </span>
            </span>
        
            <!-- logout link -->
        
            <ul class="navbar-nav px-4">
                <li class="nav-item text-nowrap">
                    <a class="nav-link" href="/logout">Logout</a>
                </li>
            </ul> `
    }
}

function authorizedUser() {
    fetch(userURL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => fillNavbar(data));
}

authorizedUser();