let contenido = document.querySelector('.contenido')

function traerPokemon(id) {

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(resultadoTabla => resultadoTabla.json()) // FORMATO QUE VAMOS A RECIBIR NUESTRA INFORMACIÓN
        .then((datos) => {
            pokemones.push(datos);// SE MOVIO PARA PODER OCUPAR FUNCION TABLA SIN MODIFICAR ORIGINAL
            tabla(datos);
        });
}
// FUNCION PARA QUE NOS MUESTRE UNA CANTIDAD ESPECIFICA DE POKEMONES
function traerPokemons(number){
    for (let i = 1; i <= number; i++){
         traerPokemon(i);
    }
}

// ACA ES DONDE SE ARMA LA ESTRUCTURA, datos ES EL NOMBRE QUE LE DAMOS, SPRITES, NAME E ID DE LA LINEA 23 A 25 SON DATOS EXCLUSIVOS DE LA API QUE NOS DAN
// EL NUMERO NOMBRE E IMAGEN DEL POKEMON
let pokemones = [];
function tabla(datos) {
    
    contenido.innerHTML += `
    <div class="card-father col-12 col-md-6 col-lg-4 mb-3 ">
				<div class="card d-flex flex-row shadow rounded">
					<img src="${ datos.sprites.front_default}" class="card__img img-fluid" alt="">
					<div class="card-body d-flex justify-content-center flex-column align-items-center p-0">
                    <p class="h5 m-0">#${datos.id}</p>
                    <h2 class="card-title h5 m-1">${datos.name}</h2>
					</div>
        
					<div class="d-flex flex-column justify-content-center p-2">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${datos.id}">
                    Detalles
                  </button>
					
						<a href="#" class="btn btn-danger card__button" data-bs-toggle="tooltip" data-bs-placement="top" title="Añadir a favoritos" onclick="agregarFavorito(${datos.id})">Favorito</a>
					</div>
				</div>
			</div>
            <div class="modal fade" id="exampleModal${datos.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  
               
                <img src="${ datos.sprites.front_default}" class="card__img img-fluid" alt="">
                <div class="card-body d-flex justify-content-center flex-column align-items-center p-0">
                <p class="h5 m-0">#${datos.id}</p>
                <p class="h5 m-0">#${datos.weight}</p>
                <h2 class="card-title h5 m-1">${datos.name}</h2>
                </div>
                    
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
    `
}

// SE LLAMA LA FUNCION Y SE INDICA CUANTOS DATOS SE MOSTRARA EN LA PANTALLA, EN ESTE CASO 10, SI SE CAMBIA SE MUESTRAN MAS O MENOS

traerPokemons(10);
let favoritos = []
function agregarFavorito(idPokemon){
    nuevoFavorito = pokemones.filter(item=>item.id === idPokemon)
    let favoritoExiste = favoritos.some(item=>item.id === idPokemon)
    if (favoritoExiste){
        alert("El pokémon ya esta en tus favoritos");
    }else{
        favoritos.push(nuevoFavorito[0])
    }
  imprimirFavorito()
}
//Pinta los favoritos en el HTML
function imprimirFavorito(){
    document.querySelector(".favoritos").innerHTML= "";

    document.querySelector(".favoritos").innerHTML += `<h3 class=" col-12 text-center m-3">Pokémones Favoritos</h3>`;
    
    
    favoritos.forEach(datos=>{
        document.querySelector(".favoritos").innerHTML += `
    
    <div class="card-father col-12 col-md-6 col-lg-4 mb-3 ">
				<div class="card d-flex flex-row shadow rounded">
					<img src="${ datos.sprites.front_default}" class="card__img img-fluid" alt="">
					<div class="card-body d-flex justify-content-center flex-column align-items-center p-0">
                    <p class="h5 m-0">#${datos.id}</p>
                    <h2 class="card-title h5 m-1">${datos.name}</h2>
					</div>
					<div class="d-flex flex-column justify-content-center p-2">
						<a class="btn btn-primary h6 card__button mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Más detalles">Detalles</a>
						<a class="btn btn-danger card__button" data-bs-toggle="tooltip" data-bs-placement="top" title="Añadir a favoritos" onclick="eliminarFavorito(${datos.id})">Eliminar</a>
					</div>
				</div>
			</div>
    `
    })
    if(favoritos.length == 0){
        document.querySelector(".favoritos").innerHTML= "";
    }
    
}
//Permite eliminar los favoritos dando click al boton eliminar 
function eliminarFavorito(idPokemon) {
    favoritos = favoritos.filter(item => item.id != idPokemon)
    document.querySelector(".favoritos").innerHTML= "";
    imprimirFavorito()
}
const btnSearch =  document.getElementById("btn-search")
//condicionales para validar busqueda.
const validar = new RegExp('^[A-Z]+$', 'i');  

btnSearch.addEventListener("click", (e) => {
   const inputSearch = document.getElementById("input-search")
   const textSearch = inputSearch.value
   if ((inputSearch.value === "" )){
    alert("no puede estar vacio");
    return false; }

   else if ((!validar.test(inputSearch.value))){
    alert("ingresar solo letras");
    return false;
  }

   const newPokemones = pokemones.filter(function(pokemon){

    if(pokemon.name.includes(`${textSearch}`)) {
        return  pokemon 

        
    }
   })
   contenido.innerHTML = ""
   newPokemones.forEach(function(pokemon){
    tabla(pokemon)
   })
});
//Muestra los favoritos en pantalla al darle click a favoritos en el nav
let x = document.querySelector(".mostrar");
x.style.display = "none";

function mostrarFavoritos() {
    
    x = document.querySelector(".mostrar");

    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}


window.addEventListener("load",function(){
    document.getElementById("wrapper").classList.toggle("wrapper2")

})
