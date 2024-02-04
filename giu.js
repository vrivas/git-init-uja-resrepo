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


function escribeCheckbox(id, valores) {
    let div=document.getElementById(id);
    let html="";
    valores.forEach( function(valor) {
        html+=`<input type="checkbox" name="${id}" value="${valor}" id="${id}_${valor}">
        <label for="${id}_${valor}">${valor}</label><br>`;
    });
    div.innerHTML=html;
}
/**
 * Función principal
 */
function main() {
    let tags=resources.creaIndice("tags");
    let asignaturas=resources.creaIndice("asignaturas");
    let formatos=resources.creaIndice("formatos");
    escribeCheckbox("tags", tags);
}
