/**
* @file gui.js
* @desc Funciones para el parseador de recursos online de git-init-uja
* @author Víctor Rivas <vrivas@ujaen.es>
* @date 03-Feb-2024
*/

// Constantes
const ULTIMOS_RECURSOS = 5;
const MAX_URL_LENGTH = 50;

/**
 * Método de Array que devuelve todos los recursos que contienen alguno de los términos en el campo indicado
 * @param {Cadena} Campo
 * @param {Termino o Vector de Terminos} Terminos
 * @returns Vector con los recursos que contienen alguno de los términos en el campo indicado
 */
Array.prototype.selectPorCampo = function (campo, terminos) {
    let result = null;
    if (!campo) result = [];
    if (typeof terminos === "string") terminos = [terminos];
    if (!result) {
        result = this.filter(function (resource) {
            return terminos.reduce(function (accum, termino) {
                return accum || (typeof resource[campo] != "undefined"
                    && (resource[campo].includes(termino) || !termino));
            }, false);
        });
    }
    return result;
}

/**
 * Método de Array que devuelve todos los recursos que contienen la cadena en el título
 * @param {Cadena} Busqueda
 * @returns Vector con los recursos que contiene la cadena de busqueda en el título
 */
Array.prototype.selectPorCadenaEnTitulo = function (busqueda) {
    let result = null;
    if (!busqueda) result = [];
     if (!result) {
        result = this.filter(function (resource) {
            return resource.titulo.toLowerCase().includes(busqueda.toLowerCase());
        });
    }
    return result;
}

/**
 * Crea un vector de strings con un índice de los valores de un campo
 * @param {String} campo 
 * @returns Devuelve un índice de los valores de un campo
 */
Array.prototype.creaIndice = function (campo) {
    let result = [];
    if (campo) {
        this.forEach(function (resource) {
            if (typeof resource[campo] != "undefined") {
                resource[campo].forEach(function (termino) {
                    if (!result.includes(termino)) result.push(termino);
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
    let div = document.getElementById(divId);
    let html = "";
    valores.forEach(function (valor) {
        html += `<input type="checkbox" name="cb" value="${divId}_${valor}" id="${divId}_${valor}">
        <label for="${divId}_${valor}">${valor}</label><br>`;
    });
    div.innerHTML = html;
}

/**
 * Asigna eventos a los checkboxes para filtrar los recursos
 */
function asignaEventosCheckbox() {
    let cb = document.querySelectorAll("input[type=checkbox]");
    cb.forEach(function (checkbox) {
        checkbox.addEventListener("change", aplicarFiltros)
    });
}

/**
 * Muestra mensaje de error indicando que no se han encontrado recursos con el filtro seleccionado
 */
function mostrarMensajeNoSeEncontraronRecursos() {
    let div = document.getElementById("recursos");
    let html = `
        <div class="mensaje-error">
            <h3>No se encontraron recursos.</h3>
            <p>No ha marcado filtros de búsqueda o no se encontraron recursos para los filtros marcados.</p>
        </div>
    `;
    div.innerHTML = html;
}

/**
 * Compara dos recursos por nivel
 * @param {Recurso} a 
 * @param {Recurso} b 
 * @return Devuelve -1 si a es menor que b, 0 si son iguales y 1 si a es mayor que b,
 *         siendo básico < medio < avanzado
 */
function comparaPorNivel(a, b) {
    if( a.nivel==b.nivel ) return 0;
    if( a.nivel=="básico" ) return -1;
    if( a.nivel=="medio" && b.nivel=="avanzado" ) return -1;
    return 1;
}

/**
 * Muestra los recursos, cada uno en un div
 * @param {Objeto que contiene un título y un vector de recursos} objetoRecursos 
 */
function mostrarRecursos(objetoRecursos) {
    let titulo = document.getElementById("titulo-main");
    titulo.innerHTML = objetoRecursos.titulo+` (${objetoRecursos.recursos.length})`;
    let div = document.getElementById("recursos");
    let html = "";
    objetoRecursos.recursos.forEach(function (resource,i) {
        html += recurso2html(resource,i+1);
    });
    div.innerHTML = html;
}

/**
 * Convierte un recurso en un article con formato HTML
 * @param {Objeto} resource Recurso a convertir en HTML
 * @param {Number} num Número de recurso en orden de aparición
 * @returns Recurso convertido en HTML
 */
function recurso2html(resource, num) {
    return `
            <article class="recurso recurso-nivel-${resource.nivel}">
                <div class="contenedor-recurso-num"><p class="recurso-num">${num}</p></div>
                <div class="recurso-nivel">${resource.nivel}</div>
                <h3 class="recurso-titulo"><a href="${resource.url}" target="_blank">${resource.titulo}</a></h3>
                <div class="listados-chips">
                    <div class="listado-chips-tags">
                        <div class="listado-chips-label">Tags</div>
                        ${resource.tags.map(e=>"<span class='chip-tag'>"+e+"</span> ").join("")}
                    </div>
                    <div class="listado-chips-formatos">
                    <div class="listado-chips-label">Formatos</div>
                        ${resource.formatos.map(e=>"<span class='chip-formato'>"+e+"</span> ").join("")}
                    </div>
                </div>
                <div class="recurso-url">${resource.url.split("/")[2]}</div>
            </article>
        `;
}
/**
 * Elimina los criterios de búsqueda duplicados para que no haya valores repetidos 
 * en los vectores de tags, asignaturas y formatos.
 */
function eliminaCriteriosBusquedaDuplicados() {
    resources.forEach(function (resource) {
        if (resource.formatos) resource.formatos = resource.formatos.sort().filter((e, i, v) => v[i] != v[i + 1])
        if (resource.tags) resource.tags = resource.tags.sort().filter((e, i, v) => v[i] != v[i + 1])
        //if (resource.asignaturas) resource.asignaturas = resource.asignaturas.sort().filter((e, i, v) => v[i] != v[i + 1])
    });
}

/**
 * Obtiene los parámetros de location.search y los convierte en un objeto
 * @returns Objeto con los parámetros de location.search
 */
function getFiltrosPorParametro() {
    let filtros = {};
    let busqueda = "";
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    searchParams.forEach((value, key) => {
        if (key != "q") {
            filtros[key] = value.split(",").map((e) => e.trim());
        } else {
            busqueda = value;
        }
    });
    console.log("Filtros", filtros);
    return {filtros, busqueda};
}

/**
 * Aplica los filtros leidos en la llamada a la URL a los correspondientes checkboxes
 * @param {Objeto} filtros 
 * @param {Cadena} busqueda
 * @returns Objeto con los recursos filtrados por los checkbox y por la cadena de búsqueda
 */
function aplicarFiltros(filtros, busqueda ) {
    let cb = document.querySelectorAll("input[type=checkbox]");
    cb.forEach((checkbox) => {
        let [campo, valor] = checkbox.value.split("_");
        if (filtros[campo] && filtros[campo].includes(valor)) {
            checkbox.checked = true;
        }
    });
    if( busqueda ) document.getElementById("buscar-recurso").value = busqueda;

    let tmpSelec = Array.from(cb).filter((checkbox) => {
        return checkbox.checked;
    }).map((checkbox) => {
        return checkbox.value;
    });
    let result = tmpSelec.length ? {
        "titulo": "Recursos encontrados",
        "recursos": resources.filter(e => true)
    } : ultimosNRecursos();

    tmpSelec.forEach((selec) => {
        let [campo, valor] = selec.split("_");
        result.recursos = result.recursos.selectPorCampo(campo, valor);
    });

    // Cribamos por la cadena de búsqueda
    //busqueda=document.getElementById("buscar-recurso").value;
    if (busqueda) {
        result.recursos = result.recursos.selectPorCadenaEnTitulo(busqueda);
    }
    result.recursos.sort(comparaPorNivel);
    mostrarRecursos(result);
    mostrarURLGeneradaPorFiltros(decodeURIComponent(setFiltrosEnURL(setFiltrosPorCheckboxYBusqueda())));
    document.getElementById("buscar-recurso").focus();
}


 
/**
 * Crea un objeto con los filtros seleccionados en los checkboxes
 * @returns Vector con los filtros seleccionados
 */
function setFiltrosPorCheckboxYBusqueda() {
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
    filtros["q"] = [document.getElementById("buscar-recurso").value];
    return filtros;
}

/**
 * Crea una URL con los filtros de búsqueda
 * @param {Objeto con los filtros de búsqueda} filtros 
 * @returns 
 */
function setFiltrosEnURL(filtros) {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams("");
    for (let key in filtros) {
        searchParams.set(key, filtros[key].join(","));
    }
    url.search = searchParams.toString();
    //window.history.pushState({}, '', url);
    console.log("URL", url);
    return url;
}

/**
 * Busca recursos por contenido en el título
 */
function buscarPorContenidoTituloRecurso(ev) {
    let texto=document.getElementById("buscar-recurso").value;
    aplicarFiltros(setFiltrosPorCheckboxYBusqueda(), texto);
    ev.preventDefault();
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
    //escribeCheckbox("asignaturas", resources.creaIndice("asignaturas"));
    escribeCheckbox("formatos", resources.creaIndice("formatos"));
    let {filtros,busqueda} = getFiltrosPorParametro();
    aplicarFiltros(filtros, busqueda);
    asignaEventosCheckbox();
    document.getElementById("buscar-recurso-form").addEventListener("submit", buscarPorContenidoTituloRecurso)
    document.getElementById("buscar-recurso").focus();
}

/**
 * Función que devuelve los últimos recursos del vector si no hay filtros
 * @param {Number} n Número de recursos que se quieren obtener. Por defecto 5
 * @returns Los últimos N recursos del vector
 */
function ultimosNRecursos(n = resources.length) {
    return {
        "titulo": n<resources.length?"Mostrando los últimos recursos añadidos":"Mostrando todos los recursos",
        "recursos": resources.slice(-n)
    };
}