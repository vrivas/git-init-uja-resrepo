var resources = [
    /*
    {
        titulo: "Plantilla",
        url: "http://www.ejemplo.com",
        tags: ["init", "clone","ramas", "local", "remoto"],
        asignaturas: ["Desarrollo Ágil", "Desarrollo Ágil"],
        formatos: ["pdf"],
        nivel: ["básico", "medio", "avanzado"]  // elegir solo uno
    },
    */
    {
        titulo: "Cómo instalar GIT en Windows, MacOS y Linux.",
        url: "https://www.hostinger.es/tutoriales/instalar-git-en-distintos-sistemas-operativos",
        tags: ["init"],
        asignaturas: [],
        formatos: ["web"],
        nivel: ["básico"], 
        idiomas: ["español"],
    },
    {
        titulo: "Conociendo Git y creando mi primer repositorio local.",
        url: "https://es.linkedin.com/pulse/conociendo-git-y-creando-mi-primer-repositorio-local-alarc%C3%B3n-acurero",
        tags: ["init", "local"],
        asignaturas: [],
        formatos: ["web"],
        nivel: ["básico"],
        idiomas: ["español"],
    },
    {
        titulo: "Navegando por el Terminal Git Bash.",
        url: "https://es.linkedin.com/pulse/navengando-por-el-terminal-git-bash-para-alarc%C3%B3n-acurero?trk=public_profile_article_view",
        tags: ["init"],
        asignaturas: ["Sistemas Operativos"],
        formatos: ["web"],
        nivel: ["básico"],
        idiomas: ["español"],
    },    
    {
        titulo: "Buenas prácticas al trabajar con Git.",
        url: "https://david-estevez.gitbooks.io/the-git-the-bad-and-the-ugly/content/es/buenas-practicas-al-trabajar-con-git.html",
        tags: ["ramas"],
        asignaturas: [],
        formatos: ["web"],
        nivel: ["medio"],
        idiomas: ["español"],
    },
    {
        titulo: "Trabajar con ramas en Git.",
        url: "https://desarrolloweb.com/articulos/trabajar-ramas-git.html",
        tags: ["ramas","remoto"],
        asignaturas: [],
        formatos: ["web"],
        nivel: ["básico"],
        idiomas: ["español"],
    },
    {
        titulo: "Cómo fusionar ramas con git merge y resolver conflictos.",
        url: "https://www.atlassian.com/es/git/tutorials/using-branches/git-merge",
        tags: ["ramas","local"],
        asignaturas: [],
        formatos: ["web"],
        nivel: ["medio"],
        idiomas: ["español"],
    },
    {
        titulo: "Cómo actualizar un repositorio local y remoto con git push y git pull.",
        url: "https://leninner.medium.com/gu%C3%ADa-sencilla-para-trabajar-con-git-push-y-git-pull-785e0bca60cc",
        tags: ["local","remoto"],
        asignaturas: [],
        formatos: ["web"],
        nivel: ["medio"],
        idiomas: ["español"],
    },
    {
        titulo: "¿Para qué sirven las etiquetas(tags) en git?",
        url: "https://www.youtube.com/watch?v=ywzdb2brvt8",
        tags: ["local","remoto"],
        asignaturas: [],
        formatos: ["video"],
        nivel: ["medio"],
        duracion: 4,
        idiomas: ["español"],
    },
    {
        titulo: "Listado de comandos en git.",
        url: "https://gist.github.com/dasdo/9ff71c5c0efa037441b6",
        tags: ["local"],
        asignaturas: [],
        formatos: ["web"],
        nivel: ["avanzado"],
        idiomas: ["español"],
    },
    {
        titulo: "¿Qué son las GitHub Actions?",
        url: "https://www.youtube.com/shorts/3bEhblIDXFY",
        tags: ["remoto"],
        asignaturas: [],
        formatos: ["video"],
        nivel: ["avanzado"],
        duracion: 1,
        idiomas: ["español"],
    },
    {
        titulo: "¿Cómo excluir archivos del control de versiones? (.gitignore)",
        url: "https://www.youtube.com/watch?v=w44lFiaiAiw",
        tags: ["local","remoto"],
        asignaturas: [],
        formatos: ["video"],
        nivel: ["medio"],
        duracion: 4,
        idiomas: ["español"],
    },
    {
        titulo: "Crear repositorio remoto en GitHub.",
        url: "https://docs.github.com/es/repositories/creating-and-managing-repositories/quickstart-for-repositories",
        tags: ["remoto"],
        asignaturas: [],
        formatos: ["web"],
        nivel: ["básico"],
        idiomas: ["español"],
    },
    {
        titulo: "¿Qué es el lenguaje de marcado Markdown?",
        url: "https://www.youtube.com/shorts/6yn1cSko-8Q",
        tags: ["markdown"],
        asignaturas: [],
        formatos: ["video"],
        nivel: ["básico"],
        duracion: 1,
        idiomas: ["español"],
    },
    {
        titulo: "Editor Markdown online para editar README.md.",
        url: "https://stackedit.io/",
        tags: ["markdown"],
        asignaturas: [],
        formatos: ["web"],
        nivel: ["básico"],
        idiomas: ["inglés"],
    },
    {
        titulo: "Sintaxis Markdown para mejorar apariencia del fichero README.md.",
        url: "https://www.markdownguide.org/basic-syntax/",
        tags: ["markdown"],
        asignaturas: [],
        formatos: ["web"],
        nivel: ["avanzado"],
        idiomas: ["inglés"],
    },
    {
        titulo: "Cómo contribuir en un repositorio en GitHub con Fork y Pull Request(PR).",
        url: "https://www.freecodecamp.org/espanol/news/como-hacer-tu-primer-pull-request-en-github/",
        tags: ["local","ramas","remoto"],
        asignaturas: [],
        formatos: ["web"],
        nivel: ["avanzado"],
        idiomas: ["español"],
    },
    {
        titulo: "Crear y asignar propuestas(issues) en un repositorio de GitHub.",
        url: "https://docs.github.com/es/issues/tracking-your-work-with-issues/quickstart",
        tags: ["remoto"],
        asignaturas: [],
        formatos: ["web"],
        nivel: ["medio"],
        idiomas: ["español"],
    },
    {
        titulo: "Deshacer cambios en Git con git revert.",
        url: "https://www.youtube.com/watch?v=4SwaV29SpIc",
        tags: ["local"],
        asignaturas: [],
        formatos: ["video"],
        nivel: ["medio"],
        duracion: 7,
        idiomas: ["español"],
    },
    {
        titulo: "Estados en Git.",
        url: "https://medium.com/laboratoria-how-to/describiendo-el-flujo-de-trabajo-en-git-ede2eee5b589",
        tags: ["local"],
        asignaturas: [],
        formatos: ["web"],
        nivel: ["básico"],
        idiomas: ["español"],
    },
    {
        titulo: "Learn Git Rebase.",
        url: "https://www.youtube.com/watch?v=f1wnYdLEpgI",
        tags: ["local"],
        asignaturas: [],
        formatos: ["video"],
        nivel: ["avanzado"],
        duracion: 7,
        idiomas: ["inglés"],
    },
    {
        titulo: "Cómo descargar carpetas y ficheros de Github.",
        url: "https://www.youtube.com/watch?v=KzZcnBzI3OU",
        tags: ["remoto"],
        asignaturas: [],
        formatos: ["video"],
        nivel: ["básico"],
        duracion: 2,
        idiomas: ["español"],
    },
    {
        titulo: "Configura Gitignore para cualquier tecnología.",
        url: "https://www.youtube.com/shorts/Vh3PKXFuaFs",
        tags: ["local", "remoto"],
        asignaturas: [],
        formatos: ["video"],
        nivel: ["medio"],
        duracion: 1,
        idiomas: ["español"],
    },
    {
        titulo: "Cómo clonar un repositorio de github.",
        url: "https://www.youtube.com/shorts/KvecZDvMQpc",
        tags: ["clone"],
        asignaturas: [],
        formatos: ["video"],
        nivel: ["básico"],
        duracion: 1,
        idiomas: ["español"],
    },
    {
        titulo: "What’s the difference between mergging and rebasing in Git?",
        url: "https://www.youtube.com/shorts/nzv0sbfprJo",
        tags: ["local"],
        asignaturas: [],
        formatos: ["video"],
        nivel: ["avanzado"],
        duracion: 1,
        idiomas: ["inglés"],
    },
    {
        titulo: "Qué es y cómo usar git stash",
        url: "https://www.youtube.com/watch?v=fD7ZOK5kZMs",
        tags: ["local"],
        asignaturas: [],
        formatos: ["video"],
        nivel: ["avanzado"],
        duracion: 6,
        idiomas: ["español"],
    },
    {
        titulo: "Actualizar un commit en Git.",
        url: "https://www.youtube.com/shorts/ku2n0mKzkPk",
        tags: ["local"],
        asignaturas: [],
        formatos: ["video"],
        nivel: ["básico"],
        duracion: 1,
        idiomas: ["español"],
    },
]
