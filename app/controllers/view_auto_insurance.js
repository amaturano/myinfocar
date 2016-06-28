// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function filter(collection) {
    return collection.where({id_auto:args.id_auto});
}

Alloy.Collections.autos_insurance.fetch();


function removeRow (_row) {
    
      var table = Alloy.createCollection("autos_insurance");
          table.fetch({query:"SELECT * FROM autos_insurance where id = " + _row});
      if(table.length > 0)
          table.at(0).destroy();
          
      Alloy.Collections.autos_insurance.fetch(); 
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
		
		//console.log(Alloy.Collections.person_insurance.where({id:item.properties.idx}));
	}
	else if(e.bindId=="telefonox"){
		_msj = Ti.UI.createAlertDialog({
			title:"Llamar a aseguradora",
			message:'A continuación se realizará una llamada con esta aseguradora',
			ok:'Aceptar'
		});
		_msj.addEventListener('click', function(){
			
			var call = 'tel:'+item.properties.cel;
			var intent = Ti.Android.createIntent({
			        action : Ti.Android.ACTION_CALL,
			        data : call
			        });
			Ti.Android.currentActivity.startActivity(intent);
			
		});
		
		_msj.show();
	}
});




