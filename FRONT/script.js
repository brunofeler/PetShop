const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const petName = document.querySelector('#petName')
const specie = document.querySelector('#specie')
const breed = document.querySelector('#breed')
const height = document.querySelector('#height')
const weight = document.querySelector('#weight')
const furType = document.querySelector('#furType')
const owner = document.querySelector('#owner')
const btnSave = document.querySelector('#btnSave')

let pets
let id


function loadPets() {
    pets = getPetsDB()
    tbody.innerHTML = ''
    pets.forEach((item, index) => {
        insertItem(item, index)
    })
}

const getPetsDB = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setPetsDB = () => localStorage.setItem('dbfunc', JSON.stringify(pets))


loadPets()

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${item.petName}</td>
    <td>${item.specie}</td>
    <td>${item.breed}</td>
    <td>${item.height}</td>
    <td>${item.weight}</td>
    <td>${item.furType}</td>
    <td>${item.owner}</td>
    

    <td class="action">
    <button onclick="editItem(${index})">
    <i class= 'bx bx-edit'></i>
    </button>
    </td>
    <td class="action">
      <button onclick="deleteItem(${index})">
      <i class='bx bx-trash'></i>
      </button>
    </td>
    `
    tbody.appendChild(tr)
}

function editItem(index) {
    openModal(true, index)
}

function deleteItem(index) {
    pets.splice(index, 1)
    setPetsDB()
    loadPets()
}

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }

    if (edit) {
        petName.value = pets[index].petName
        specie.value = pets[index].specie
        breed.value = pets[index].breed
        height.value = pets[index].height
        weight.value = pets[index].weight
        furType.value = pets[index].furType
        owner.value = pets[index].owner
        id = index
    } else {

        petName.value = ''
        specie.value = ''
        breed.value = ''
        height.value = ''
        weight.value = ''
        furType.value = ''
        owner.value = ''
    }
}

btnSave.onclick = e => {
    if (petName.value == '' || specie.value == '' || breed.value == '' || height.value == '' || weight.value == '' || furType.value == '' || owner.value == '') {

        return
    }


    e.preventDefault();

    if (id !== undefined) {
        pets[id].petName = petName.value
        pets[id].specie = specie.value
        pets[id].breed = breed.value
        pets[id].height = height.value
        pets[id].weight = weight.value
        pets[id].furType = furType.value
        pets[id].owner = owner.value
    } else {
        pets.push({ 'petName': petName.value, 'specie': specie.value, 'breed': breed.value, 'height': height.value, 'weight': weight.value, 'furType': furType.value, 'owner': owner.value })
    }

    setPetsDB()

    modal.classList.remove('active')
    loadPets()
    id = undefined
}