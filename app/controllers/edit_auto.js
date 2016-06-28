// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

console.log("edit_auto:auto_id--->"+args.id);


var autos = Alloy.createCollection("autos");
	autos.fetch({query:"SELECT * FROM autos where id = "+args.id});
var _item =autos.at(0);


var functions ={
	
	setValues:function(){
		$.txt_na_marca.value = _item.get("marca");
		$.txt_na_modelo.value = _item.get("modelo");
		$.txt_na_year.value = _item.get("year");
		$.txt_na_placas.value = _item.get("placas");
		$.txt_na_tipo.value = _item.get("tipo");
		$.txt_na_repuve.value = _item.get("repuve");
		$.txt_na_vin.value = _item.get("vin");
	},
	enableFields:function(_fields){
		for(var i = 0; i < _fields.length; i++){
			_fields[i].editable = true;
			_fields[i].color = "black";
		};
		
		$.auto_photo.enabled = true;
		$.repuve_photo.enabled = true;
		$.btn_seguro.enabled = true;
			
	},
	notEnableFields:function(_fields){
		for(var i = 0; i < _fields.length; i++){
			_fields[i].editable = false;
			_fields[i].color="gray";
		};
		
		$.auto_photo.enabled = false;
		$.repuve_photo.enabled = false;
		$.btn_seguro.enabled = false;
	}
};
var FIELDS = [];
FIELDS.push($.txt_na_marca);
FIELDS.push($.txt_na_modelo);
FIELDS.push($.txt_na_year);
FIELDS.push($.txt_na_placas);
FIELDS.push($.txt_na_tipo);
FIELDS.push($.txt_na_repuve);
FIELDS.push($.txt_na_vin);

functions.setValues();
functions.notEnableFields(FIELDS);


function editar(e){
	if(e.source.bandera==0){
		$.lbl_edit.text="Guardar";
		e.source.bandera=1;
		functions.enableFields(FIELDS);
		$.img_edit.image="/images/save.png";
		$.img_edit.right=70;
	}
	else{
		$.lbl_edit.text="Editar";
		e.source.bandera=0;
		functions.notEnableFields(FIELDS);
		$.img_edit.image="/images/edit.png";
		$.img_edit.right=60;
		
		_item.set({
			marca: $.txt_na_marca.value,
			modelo: $.txt_na_modelo.value,
			year: $.txt_na_year.value,
			placas: $.txt_na_placas.value,
			tipo: $.txt_na_tipo.value,
			repuve: $.txt_na_repuve.value,
			vin: $.txt_na_vin.value
		});
		_item.save();
		Alloy.Collections.autos.fetch();
	}
};

var auto_insurance = Alloy.createCollection("autos_insurance");
	auto_insurance.fetch({query:"SELECT * FROM autos_insurance where id_auto = "+'"'+args.id+'"'});

	if(auto_insurance.length>0)
		$.vista_seguro.remove($.lbl_aviso);
	

	
var services = Alloy.createCollection("servicios_auto");
      services.fetch({query:"SELECT * FROM servicios_auto where id_auto = " +'"'+ args.id+'"'});
 
  if(services.length > 0)
  	$.main_scrll.remove($.lbl_servicios);
  	
 var rows_servicios = services.length;

function add_insurance(){
	if(auto_insurance.length>0){
		Ti.UI.createAlertDialog({
			title:'Error',
			message:'No puedes agregar más de una aseguradora por vehiculo, favor de eliminar o editar la existente',
			ok:'Aceptar'
		}).show();
	}
	else{
		Alloy.createController('add_auto_insurance',{tipo:"autos", id_auto: args.id, parent:$.vista_seguro, children:$.lbl_aviso}).getView().open();
	}
};


//Agrega lista de seguros a la vista 
$.vista_seguro.add(Alloy.createController('view_auto_insurance',{id_auto:args.id}).getView());

//Agrega la vista del popup
$.get_service.add(Alloy.createController('add_service',{id_auto:args.id}).getView());

//Agrega la lista de servicios a la ventana principal 
$.main_scrll.add(Alloy.createController('get_service_made',{id_auto:args.id}).getView());


function agregarServicio(){
	$.get_service.visible=true;
};


Alloy.Globals.closePopUp = function(){
	$.get_service.visible=false;
	
	//Elimina el comentario de cuando no se encuentran registros
	if(rows_servicios==0)
		$.main_scrll.remove($.lbl_servicios);
	
};

function cleanUp(){
	$.destroy();
}
