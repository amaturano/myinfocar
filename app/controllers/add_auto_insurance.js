// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var msj;
var INSURANCE = Alloy.createCollection('autos_insurance');
INSURANCE.fetch({query:"SELECT * FROM autos_insurance where id_auto = "+'"'+args.id_auto+'"'});


function save_insurance(){
	if($.txt_aseguradora.value==""||$.txt_NoSeguro.value==""||$.txt_vigencia.value==""||$.txt_vigencia.value==""){
		Ti.UI.createAlertDialog({
			title:'Error al registrar',
			message:"Favor de llenar todos los campos requeridos",
			ok:'Aceptar'
		}).show();
	}
	else{
		if(INSURANCE.length==0)
			args.parent.remove(args.children);
		
		var new_insurance = Alloy.createModel("autos_insurance");
		new_insurance.set({
			nombre:$.txt_aseguradora.value,
			no_seguro:$.txt_NoSeguro.value,
			vigenvia:$.txt_vigencia.value,
			telefono:$.txt_telefono.value,
			id_auto:args.id_auto
		});
		new_insurance.save();
		Alloy.Collections.autos_insurance.fetch();
		
		msj = Ti.UI.createAlertDialog({
			title:'Registro exitoso',
			message:'Los datos han sido guardado exitosamente',
			ok:'Aceptar'
		});
		
		msj.addEventListener('click', function(){
			$.add_auto_insurance.close();
		});
		
		msj.show();
		
	}	
};


function cleanUp(){
	$.destroy();
}

