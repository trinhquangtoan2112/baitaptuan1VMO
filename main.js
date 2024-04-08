
const save_button = document.getElementById("save_button");
const cancel_button = document.getElementById("cancel_button");
const inputForm = document.querySelectorAll("input");
const alertDiv = document.getElementsByClassName('alert')[0];
const strongElement = alertDiv.querySelector('strong');
const spanElement = alertDiv.querySelector('span');
const userData = {
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    contactnumber: "",
    city: "s",
    state: "s",
    password: ""
};
const errorData = {
    firstname: null,
    lastname: null,
    email: null,
    address: null,
    contactnumber: null,
    password: null
};
function showhidePassword(e) {
    const passwordOn = document.getElementById("passwordon");
    const passwordOff = document.getElementById("passwordoff");
    const passwordInput = document.getElementById("password");
    if (e) {
        passwordInput.setAttribute("type", "password");
        passwordOn.classList.remove("off");
        passwordOn.classList.add("on");
        passwordOff.classList.add("off");
        passwordOff.classList.remove("on");

    }
    else {
        passwordInput.setAttribute("type", "text");
        passwordOn.classList.remove("on");
        passwordOn.classList.add("off");
        passwordOff.classList.add("on");
        passwordOff.classList.remove("off");



    }

}
function clearAll(e) {
    e.preventDefault();
    inputForm.forEach(input => input.value = "");
    for (const key in errorData) {
        errorData[key] = null;
        const error = document.getElementById(`error${key}`);
        error.innerHTML = null;
    }

}
function changeing(e) {
    userData[e.target.name] = e.target.value;
    if (e.target.name == "contactnumber") {
        Math.abs(e.target.value)
    }
    const error = document.getElementById(`error${e.target.name}`);
    error.innerHTML = null;
}
const SaveAll = (e) => {
    let inputName = "";
    save_button.setAttribute("disabled", "disabled");
    cancel_button.setAttribute("disabled", "disabled");
    save_button.style.cursor = "default";
    cancel_button.style.cursor = "default";
    setTimeout(() => {
        save_button.removeAttribute("disabled", "disabled");
        cancel_button.removeAttribute("disabled", "disabled");
        save_button.style.cursor = "pointer";
        cancel_button.style.cursor = "pointer";
    }, 3000)
    for (const key in userData) {
        if (key == "firstname" || key == "lastname") {

            checkLength(userData[key], 3, 20, key)
        }
        if (key == "email") {


            checkLength(userData[key], 8, 30, key)
            validateEmail(userData[key])
        }
        if (key == "address") {
            checkLength(userData[key], 0, 100, key)
        }
        if (key == "contactnumber") {
            checkLength(userData[key], 9, 13, key)
        }
        if (key == "password") {
            checkLength(userData[key], 1, 9999, key)
        }
    }
    for (const key in errorData) {
        const error = document.getElementById(`error${key}`);
        if (errorData[key] != null) {
            inputName = key;
            error.innerHTML = errorData[key];
            inputForm.forEach(input => {
                if (input.name == inputName) {
                    input.value = "";
                }
            });
        }
        else {
            error.innerHTML = "";
        }
    }
    let flag = false;
    for (const key in errorData) {
        if (errorData[key] != null) {
            inputName = key;
            for (let i = 0; i < inputForm.length; i++) {
                const input = inputForm[i];
                if (input.name == inputName && !flag) {
                    input.focus();
                    alertDiv.style.display = "inline-block";
                    alertDiv.style.backgroundColor = 'red';
                    strongElement.innerHTML = "Error!";
                    spanElement.innerHTML = "Something wrong"
                    alertDiv.classList.add('animate');
                    flag = true;

                }
            }
        }
    }
    if (!flag) {
        alertDiv.style.display = "inline-block";
        alertDiv.style.backgroundColor = 'green';
        strongElement.innerHTML = "Success";
        spanElement.innerHTML = "";
        alertDiv.classList.add('animate');
    }

    setTimeout(() => {
        alertDiv.style.display = "none";
        alertDiv.classList.remove('animate');
        alertDiv.style.display = 'none';
    }, 3000)
}

const checkLength = (stringCheck, min, max, name) => {
    stringCheck = stringCheck.trim();
    if (name !== "password" && (stringCheck.length < min || stringCheck.length > max)) {
        errorData[name] = `${name} bạn vừa nhập phải có độ dài từ ${min} và ${max}`;
    }
    else if (name === "password" && (stringCheck.length < min || stringCheck.length > max)) {
        errorData["password"] = "Xin hãy nhập mật khẩu";
    }
    else {
        errorData[name] = null;
    }

}

const validateEmail = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(email)) {
        errorData["email"] = `Sai định dạng email`

    }

};

const loadData = () => {
    inputForm.forEach(input => {
        userData[input.name] = input.value
    })
}