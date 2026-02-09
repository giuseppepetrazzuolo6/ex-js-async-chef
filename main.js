/*In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). 
Questa funzione accetta un id di una ricetta e deve:
Recuperare la ricetta da https://dummyjson.com/recipes/{id}
Estrarre la proprietà userId dalla ricetta
Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
Restituire la data di nascita dello chef*/

/*🎯 Bonus 1
Attualmente, se la prima richiesta non trova una ricetta, 
la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.
Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.*/

async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj
}
async function getChefBirthday(id) {

    let ricetta;

    try {
        ricetta = await fetchJson(`https://dummyjson.com/recipes/${id}`)
    } catch (error) {
        throw new Error(`Non posso recuperare la ricetta con id: ${id}`)
    }

    if (ricetta.message) {
        throw new Error(ricetta.message)
    }

    let chef;
    try {
        chef = await fetchJson(`https://dummyjson.com/users/${ricetta.userId}`)
    } catch (error) {
        throw new Error(`Non posso recuperare lo chef per la ricetta: ${id}`)
    }

    if (chef.message) {
        throw new Error(chef.message)
    }

    return chef.birthDate
}

(async () => {
    try {
        const chefBirthday = await getChefBirthday(1)
        console.log('Data di nascita dello chef:', chefBirthday)
    } catch (error) {
        console.error('Errore', error.message)
    }
})()