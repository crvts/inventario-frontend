const API_URL =
"https://inventario-backend-bo7g.onrender.com/productos";


let editando = null;



async function guardar(){


const producto = {


nombre: document.getElementById("nombre").value,


categoria: document.getElementById("categoria").value,


precio:Number(
document.getElementById("precio").value
),


cantidad:Number(
document.getElementById("cantidad").value
)


};



if(editando){


await fetch(`${API_URL}/${editando}`,{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(producto)

});


editando=null;



}else{


await fetch(API_URL,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(producto)

});


}



limpiar();

mostrar();


}






async function mostrar(){


const respuesta = await fetch(API_URL);


const productos = await respuesta.json();



tabla.innerHTML="";



productos.forEach(p=>{


tabla.innerHTML += `


<tr class="border text-center">


<td>${p.nombre}</td>

<td>${p.categoria || "Sin categoría"}</td>

<td>$${p.precio}</td>

<td>${p.cantidad || 0}</td>



<td>


<button

onclick="editar(

'${p._id}',

'${p.nombre}',

'${p.categoria}',

'${p.precio}',

'${p.cantidad}'

)"

class="bg-yellow-400 px-2 rounded">

Editar

</button>




<button

onclick="eliminar('${p._id}')"

class="bg-red-500 text-white px-2 rounded">

Eliminar

</button>


</td>


</tr>


`;


});


}






function editar(id,nombre,categoria,precio,cantidad){



document.getElementById("nombre").value=nombre;


document.getElementById("categoria").value=categoria;


document.getElementById("precio").value=precio;


document.getElementById("cantidad").value=cantidad;



editando=id;



}






async function eliminar(id){


await fetch(`${API_URL}/${id}`,{

method:"DELETE"

});



mostrar();


}





function limpiar(){


document.getElementById("nombre").value="";

document.getElementById("categoria").value="";

document.getElementById("precio").value="";

document.getElementById("cantidad").value="";


}



mostrar();