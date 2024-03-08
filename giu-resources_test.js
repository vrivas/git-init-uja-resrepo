// fichero de recursos de prueba
var resources_test = [
    {
        titulo: "T1",
        url: "http://www.ejemplo.com",
        tags: ["init", "local", "clone"],
        asignaturas: ["Fundamentos de Programación", "Programación Orientada a Objetos"],
        formatos: ["pdf", "video", "web"]
    },
    {
        titulo: "T2",
        url: "http://www.ejemplo.com",
        tags: ["ramas", "local", "remoto"],
        asignaturas: ["Desarrollo Ágil", "Desarrollo Ágil"],
        formatos: ["pdf"],
        campo: ["valor"],
    },    
    {
        titulo: "T3",
        url: "http://www.ejemplo.com",
        tags: ["ramas", "local", "remoto"],
        asignaturas: ["Desarrollo Ágil", "Desarrollo Ágil"],
        formatos: ["pdf"],
        campo: ["valor"],
    },
    {
        titulo: "T4",
        url: "http://www.ejemplo.com",
        tags: ["ramas", "local", "remoto"],
        asignaturas: ["Desarrollo Ágil", "Desarrollo Ágil"],
        formatos: ["pdf"],
        campo: ["valor"],
    },
    {
        titulo: "T5",
        url: "http://www.ejemplo.com",
        tags: ["ramas", "local", "remoto"],
        asignaturas: ["Desarrollo Ágil", "Desarrollo Ágil"],
        formatos: ["pdf"],
        campo: ["valor"],
    },
    {
        titulo: "T6",
        url: "http://www.ejemplo.com",
        tags: ["ramas", "local", "remoto"],
        asignaturas: ["Desarrollo Ágil", "Desarrollo Ágil"],
        formatos: ["pdf"],
        campo: ["valor"],
    },
    
]


// Une los ficheros de recursos de prueba con los recursos
function joinResourcesTest() {
    resources_test.forEach(e=>resources.push(e)) 
}