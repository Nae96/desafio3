const fs = require("fs")

class contenedor{

    constructor(nombreArchivo){
     this.nombreArchivo =  nombreArchivo + ".json"
    }

  //   leer un archivo

   async getData(){
    // (try) Si el archivo existe me da conts...

    try {
        return await  fs.promises.readFile(this.nombreArchivo, "utf-8")
    } catch (error) {
       
        if (error.code == "ENOENT"){
         fs.writeFile(this.nombreArchivo,"[]",(error)=> {
             if (error){
                console.log("El archivo no pudo ser creado")
            }
            })
        }
    }
  
    
   }

   async getAll(){
      const datos= await this.getData()
      return JSON.parse(datos)
    }

 async save(objeto){

    try {
        let contenidoDeArchivo = await this.getData();
        let contenidoEnJson = JSON.parse(contenidoDeArchivo)
        let arreglo = [];
        const indice = contenidoEnJson.map(x=>x.id).sort();
        objeto.id = indice[indice.length-1]+1
        if(!objeto.id){
            objeto.id=1
            arreglo = [{...objeto}]
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arreglo))
            return arreglo[0].id
         //  console.log("entre al error");
        }

        contenidoEnJson.push(objeto)
        
    
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenidoEnJson));
    } catch (error) {
        console.log("No pude grabar el archivo");
    }
   

} 

getById= async (id)=>{
    try {
        let datos = await fs.promises.readFile(this.nombreArchivo,"utf-8");
        let parsedData = await JSON.parse(datos)
        if(parsedData.find(x=>x.id === id)) {
           console.log( parsedData.find(x=>x.id === id))
        } else {
           console.log('el elemento no existe')
        }
        
    } catch (error) {
        console.error(error)
        
    }

}

deleteById= async (id)=>{
    try {
        let datos = await fs.promises.readFile(this.nombreArchivo, "utf-8")
        let parseData = await JSON.parse(datos)
        if (parseData.some(x=>x.id === id)) {
            let objeto = parseData.find(x=>x.id===id)
            let objPosition = parseData.indexOf(objeto)
            parseData.splice(objPosition,1)
            fs.promises.writeFile(this.nombreArchivo, JSON.stringify(parseData, null, 2))
            console.log('el objeto fue eliminado')
        }
        
    } catch (error) {
        console.error(error)
    }

}
deleteAll= async()=>{
    try {
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]))
        console.log('el contenedor esta vacio')
        
    } catch (error) {
        console.error(error)
    }
} 

}
// const objetoInicial = {
//     nombre: "michel",
//     apellido:"chamarez"
// }
// const objeto2 = {
//     nombre: "nerea",
//     apellido:"Epulef"
// }

// const lenovo = {
//     name: "lenovo IdeaPad",
//     price: 129999,
//     thumbnail: "https://http2.mlstatic.com/D_NQ_NP_822706-MLA50208488284_062022-O.webp"
// }
// const apple = {
//     name: "apple MacBook Air",
//     price: 299999,
//     thumbnail: "https://images.fravega.com/f300/09ba4dd88b91d4c4759b5c2d66285158.jpg.webp"
// }
// const hp = {
//     name: "hp Probook",
//     price: 285384,
//     thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_732333-MLA49194493079_022022-F.webp"
// }


// // dentro de una función con async await, o fuera de una función con el .then.

// // async(){
// //     await 
// // }
// const objeto1 = new contenedor("producto")
// async function main(){
  
//     // await objeto1.getall();
//     //  await objeto1.save(lenovo);
//     //  await objeto1.save(apple);
//     // await objeto1.save(hp);

//     // await objeto1.getById(2);
//     // await objeto1.deleteById(1);
//     //   objeto1.deleteAll();

//     // console.log("FINNNNNN");
// }




module.exports = contenedor;


