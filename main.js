async function getUsers() {
    const response = await fetch('https://67cf3cf6823da0212a81e687.mockapi.io/users/users');
    let people = await response.json();
    loadUsers(people);
}

getUsers();

let user = {
    name: "Marcello",
    surname:"Viani",
    phoneNumber:"722480856",
    status:"Focus"
};

const createUser = document.getElementById("createUser");
createUser.addEventListener("click",handleNewUser);
const userTable= document.getElementById("userTable");

function loadUsers(people){
    const tbody = userTable.childNodes[3];
    if(people.length===0){
        tbody.innerHTML="";
        return
    }
    tbody.innerHTML = "";
    people.forEach(person => {
        tbody.innerHTML+= `
        <tr id="${person.id}">
        <td> <span>${person.name} </span><input type="text" value="${person.name} "></td>
        <td> <span> ${person.surname}</span><input type="text" value="${person.surname}"></td>
        <td> <span>${person.phone}</span><input type="text" value="${person.phone}"></td>
        <td> <span>${person.gender}</span><input type="text" value="${person.gender}"></td>
        <td><div class="actionsButtons"><button class= "editData">Edit</button><button class="saveUser">Save</button>
        <button onclick="handleDeleteUser(${person.id})" class="deleteRow">Del</button></div></td>
        </tr> 
        `;
        document.querySelectorAll('.editData').forEach(editButton => {
            editButton.addEventListener('click', editUser);});
        document.querySelectorAll('.saveUser').forEach(saveButton=>{
            saveButton.addEventListener('click',saveUser);});
    })
    
}

async function handleNewUser(){
    const userFilled = getUserFilled()
    let isCreated = await createNewUserApi(userFilled);
    if(isCreated===true){
        getUsers();
    }
}

async function createNewUserApi(newUserData){
    const response = await fetch('https://67cf3cf6823da0212a81e687.mockapi.io/users/users',{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newUserData)
    });
    if(response.ok){
        return true;
    }else{
        return false;
    }

}

function getUserFilled (){
    const newUser = {
        name: "",
        surname: "",
        phone: "",
        gender: ""
    }
    const nombre  = document.getElementById("mainName");
    newUser["name"] = nombre.value;
    const apellido  = document.getElementById("mainSurname");
    newUser["surname"] = apellido.value;
    const tlf  = document.getElementById("mainPhoneNumber");
    newUser["phone"] = tlf.value;
    const estado  = document.getElementById("mainGender");
    newUser["gender"]= estado.value;
    return newUser;
}

function editUser(event){
    toggleClassRow(event.target.parentNode.parentNode.parentNode);
}

async function saveUser(event){
    let editedUser = getUserToEditData(event);
    let isFinallyUpdated = await updateUser(editedUser);
    if(isFinallyUpdated === true){
        getUsers();
    }
}

function getUserToEditData(event){
    let userEdit = {
        name: "",
        surname: "",
        phone: "",
        gender: "",
        id: ""
    }
    toggleClassRow(event.target.parentNode.parentNode.parentNode);
    userEdit.id = event.target.parentNode.parentNode.parentNode.id
    userEdit.name = event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[2].value;
    userEdit.surname= event.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[2].value;
    userEdit.phone= event.target.parentNode.parentNode.parentNode.childNodes[5].childNodes[2].value;
    userEdit.gender= event.target.parentNode.parentNode.parentNode.childNodes[7].childNodes[2].value;
    return userEdit;
}

async function updateUser(updatedUser){
    const response = await fetch(`https://67cf3cf6823da0212a81e687.mockapi.io/users/users/${updatedUser.id}`,{
        method: "PUT",
        headers: {
            "Content-Type":"application/json"},
        body:JSON.stringify(updatedUser)
    })
    if(response.ok){
        return true;
    }else{
        return false;
    }
}

function toggleClassRow(node){
    node.classList.toggle("editRow");
}

function editValue(inputNodes){
    for(let index = 0; index<inputNodes.length; index++){
        let spanNode = inputNodes[index].previousElementSibling;
        let newValue = inputNodes[index].value;
        spanNode.textContent= newValue;
    }
}

async function handleDeleteUser(personId){
    const isDeleted = await fetch(`https://67cf3cf6823da0212a81e687.mockapi.io/users/users/${personId}`,{
        method:"DELETE"
    })
    if(isDeleted.ok){
        getUsers();
    }
}







