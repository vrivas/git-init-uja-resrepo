/**
* @file gui.js
* @desc Funciones para el parseador de recursos online de git-init-uja
* @author Víctor Rivas <vrivas@ujaen.es>
* @date 03-Feb-2024
*/

/**
 * Método de Array que devuelve todos los recursos que contienen alguno de los términos en el campo indicado
 * @param {Cadena} Campo
 * @param {Termino o Vector de Terminos} Terminos
 * @returns Vector con los recursos que contienen alguno de los términos en el campo indicado
 */
Array.prototype.selectPorCampo=function(campo, terminos) {
    let result = null;
    if( !campo ) result = [];
    if( typeof terminos==="string"  ) terminos=[terminos];
    if( !result) {
            result = this.filter(function (resource) {
            return terminos.reduce( function(accum, termino) {
                return accum || (typeof resource[campo]!="undefined" 
                    && ( resource[campo].includes(termino) || !termino)) ;
            }, false);
        });
    }
    return result;
}

/**
 * Crea un vector de strings con un índice de los valores de un campo
 * @param {String} campo 
 * @returns Devuelve un índice de los valores de un campo
 */
Array.prototype.creaIndice=function(campo) {
    let result = [];
    if( campo ) {
        this.forEach(function (resource) {
            if( typeof resource[campo]!="undefined" ) {
                resource[campo].forEach( function(termino) {
                    if( !result.includes(termino) ) result.push( termino );
                });
            }
        });
    }
    return result.sort();
}


/**
 * Muestra todos los elementos de un índice como checboxes
 * @param {String} divId Div en el que se van a mostrar los checkboxes 
 * @param {Vector de cadenas} valores Conjunto de valores que se van a mostrar
 */
function escribeCheckbox(divId, valores) {
    let div=document.getElementById(divId);
    let html="";
    valores.forEach( function(valor) {
        html+=`<input type="checkbox" name="cb" value="${divId}_${valor}" id="${divId}_${valor}">
        <label for="${divId}_${valor}">${valor}</label><br>`;
    });
    div.innerHTML=html;
}

/**
 * Asigna eventos a los checkboxes para filtrar los recursos
 */
function asignaEventosCheckbox() {
    let cb=document.querySelectorAll("input[type=checkbox]");
    cb.forEach( function(checkbox) {
        checkbox.addEventListener("change", function(event) {
            let tmpSelec = Array.from(cb).filter( function(checkbox) {
                return checkbox.checked;
            }).map( function(checkbox) {
                return checkbox.value;
            });
            let result=tmpSelec.length?resources.filter(e=>true):[]
            tmpSelec.forEach( function(selec) {
                let [campo, valor] = selec.split("_");
                result=result.selectPorCampo(campo, valor);
            });
            mostrarRecursos(result);
            mostrarURLGeneradaPorFiltros(setFiltrosEnURL(setFiltrosPorCheckbox()));
        });
    });
}


/**
 * Muestra los recursos, cada uno en un div
 * @param {Vector de recursos} recursos 
 */
function mostrarRecursos(recursos) {
    let div=document.getElementById("recursos");
    let html="";
    recursos.forEach( function(resource) {
        html+=`
            <div class="recurso">
                <h3><a href="${resource.url}" target="_blank">${resource.titulo}</a></h3>
                <p>${resource.url}</p>
                <p>Tags: ${resource.tags.join(", ")}</p>
                <p>Asignaturas: ${resource.asignaturas.join(", ")}</p>
                <p>Formatos: ${resource.formatos.join(", ")}</p>
            </div>
        `;
    });
    div.innerHTML=html;
}

/**
 * Elimina los criterios de búsqueda duplicados para que no haya valores repetidos 
 * en los vectores de tags, asignaturas y formatos.
 */
function eliminaCriteriosBusquedaDuplicados() {
    resources.forEach( function(resource) {
        if( resource.formatos ) resource.formatos=resource.formatos.sort().filter((e,i,v)=>v[i]!=v[i+1]) 
        if( resource.tags ) resource.tags=resource.tags.sort().filter((e,i,v)=>v[i]!=v[i+1]) 
        if( resource.asignaturas ) resource.asignaturas=resource.asignaturas.sort().filter((e,i,v)=>v[i]!=v[i+1]) 
    });
}

/**
 * Obtiene los parámetros de location.search y los convierte en un objeto
 * @returns Objeto con los parámetros de location.search
 */
function getFiltrosPorParametro() {
    let filtros = {};
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    searchParams.forEach((value, key) => {
        if (key != "q") {
            filtros[key] = value.split(",").map((e) => e.trim());
        }
    });
    console.log("Filtros", filtros);
    return filtros;
}

/**
 * Aplica los filtros leidos en la llamada a la URL a los correspondientes checkboxes
 * @param {Objeto} filtros 
 */
function aplicarFiltros(filtros) {
    let cb = document.querySelectorAll("input[type=checkbox]");
    cb.forEach((checkbox) => {
        let [campo, valor] = checkbox.value.split("_");
        if (filtros[campo] && filtros[campo].includes(valor)) {
            checkbox.checked = true;
        }
    });
    let tmpSelec = Array.from(cb).filter((checkbox) => {
        return checkbox.checked;
    }).map((checkbox) => {
        return checkbox.value;
    });
    let result = tmpSelec.length ? resources.filter(e => true) : []
    tmpSelec.forEach((selec) => {
        let [campo, valor] = selec.split("_");
        result = result.selectPorCampo(campo, valor);
    });

    mostrarRecursos(result);
}

/**
 * Crea un objeto con los filtros seleccionados en los checkboxes
 * @returns Vector con los filtros seleccionados
 */
function setFiltrosPorCheckbox() {
    let cb = document.querySelectorAll("input[type=checkbox]");
    let filtros = {};
    cb.forEach((checkbox) => {
        let [campo, valor] = checkbox.value.split("_");
        if (checkbox.checked) {
            if (filtros[campo]) {
                filtros[campo].push(valor);
            } else {
                filtros[campo] = [valor];
            }
        }
    });
    return filtros;
}

/**
 * Crea una URL con los filtros de búsqueda
 * @param {Objeto con los filtros de búsqueda} filtros 
 * @returns 
 */
function setFiltrosEnURL(filtros) {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    for (let key in filtros) {
        searchParams.set(key, filtros[key].join(","));
    }
    url.search = searchParams.toString();
    //window.history.pushState({}, '', url);
    console.log("URL", url);
    return url;
}

/**
 * Escribe la URL generada a partir de los filtros de los recursos
 * @param {URL generada a partir de los filtros de los recursos} url 
 */
function mostrarURLGeneradaPorFiltros(url) {
    let div = document.getElementById("url-generada");
    div.innerHTML = `<a href="${url}">${url}</a>`;
}
/**
 * Función principal
 */
function main() {
    eliminaCriteriosBusquedaDuplicados();
    escribeCheckbox("tags", resources.creaIndice("tags"));
    escribeCheckbox("asignaturas", resources.creaIndice("asignaturas"));
    escribeCheckbox("formatos", resources.creaIndice("formatos"));
    let filtros = getFiltrosPorParametro();
    aplicarFiltros(filtros);
    asignaEventosCheckbox();
    mostrarURLGeneradaPorFiltros(setFiltrosEnURL(setFiltrosPorCheckbox()));

}
