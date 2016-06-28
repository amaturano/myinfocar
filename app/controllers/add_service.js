// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;


//console.log("id del auto: "+$.id_auto);

var _newservice, msj;
function cancel(){
	Alloy.Globals.closePopUp();
};

function save(){
	console.log("id del auto: "+args.id_auto);
	
	if($.txt_empresa.getValue()==''||$.txt_kilometros.getValue()==''||$.txt_fecha.getValue()==''||$.txt_costo.getValue()==''){
		Ti.UI.createAlertDialog({
			title:'Error', 
			message:'Favor de llenar todos los campos requeridos',
			ok:'Aceptar'
		}).show();
	}
	else{
		_newservice = Alloy.createModel('servicios_auto');
		_newservice.set({
			empresa:$.txt_empresa.getValue(),
			kilometros: $.txt_kilometros.getValue(),
			fecha: $.txt_fecha.getValue(),
			detalle: $.txt_detalles.getValue(),
			costo:'$'+$.txt_costo.getValue(),
			id_auto: args.id_auto
		});
		_newservice.save();
		
		Alloy.Collections.servicios_auto.fetch();
		
		
		msj = Ti.UI.createAlertDialog({
			title:'Registro exitoso',
			message:'Tu servicio ha sido guardado exitosamente',
			ok:'Aceptar'
		});
		
		msj.addEventListener('click', function(){
			Alloy.Globals.closePopUp();
		});
		
		msj.show();
		
	}
};
