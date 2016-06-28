// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Collections.autos.fetch();

function removeRow (_row) {
      var table = Alloy.createCollection("autos");
          table.fetch({query:"SELECT * FROM autos where id = " + _row});
      if(table.length > 0)
          table.at(0).destroy();
          
      Alloy.Collections.autos.fetch(); 
};



$.list_autos.addEventListener('itemclick', function(e){
	var item = e.section.getItemAt(e.itemIndex);
	
	if(e.bindId=="eliminar"){
		
		var _msj = Ti.UI.createOptionDialog({
			title:'¿Estás seguro que deseas eliminar este registro?',
			options:['Aceptar', 'Cancelar'],
			cancel:1,
		});
		
		_msj.addEventListener('click', function(e){
			
			if(e.source.selectedIndex==0)
				removeRow(item.properties.idx);
		});
		
		
		_msj.show();
	}
	else if(e.bindId=="editar"){
		Alloy.createController('edit_auto',{id:item.properties.idx}).getView().open();
	};
});
