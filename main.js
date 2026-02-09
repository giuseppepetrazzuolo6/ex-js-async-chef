/*In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). 
Questa funzione accetta un id di una ricetta e deve:
Recuperare la ricetta da https://dummyjson.com/recipes/{id}
Estrarre la proprietà userId dalla ricetta
Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
Restituire la data di nascita dello chef*/

async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj
}

async function getChefBirthday(id) {
    const ricetta = await fetchJson(`https://dummyjson.com/recipes/${id}`)
    const userId = ricetta.userId
    const chef = await fetchJson(`https://dummyjson.com/users/${userId}`)
    const chefBirthday = chef.birthDate
    return chefBirthday

}

(async () => {
    const chefBirthday = await getChefBirthday(1)
    console.log('Data di nascita dello chef:', chefBirthday)
})()