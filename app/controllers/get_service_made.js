// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

console.log('Valor de autoId en el listview: '+ args.id_auto);

function filter(collection) {
    return collection.where({id_auto:args.id_auto});
}

Alloy.Collections.servicios_auto.fetch();


function removeRow (_row) {
    
      var table = Alloy.createCollection("servicios_auto");
          table.fetch({query:"SELECT * FROM servicios_auto where id = " + _row});
      if(table.length > 0)
          table.at(0).destroy();
          
      Alloy.Collections.servicios_auto.fetch(); 
};


var _msj;

$.list_seguros.addEventListener('itemclick', function(e){
	console.log(e.bindId);
	var item = e.section.getItemAt(e.itemIndex);
	
	if(e.bindId =="eliminar"){
			
		console.log("row number: "+ item.properties.idx);
		
		 _msj = Ti.UI.createOptionDialog({
			title:'¿Estás seguro que deseas eliminar esta aseguradora?',
			options:['Aceptar', 'Cancelar'],
			cancel:1,
		});
		
		_msj.addEventListener('click', function(e){
			console.log("Opcion seleccionada: "+e.source.selectedIndex);
			if(e.source.selectedIndex==0)
				removeRow(item.properties.idx);
		});
		
		
		_msj.show();
		
	};
});




