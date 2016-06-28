// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var msj;
var INSURANCE = Alloy.createCollection('person_insurance');
INSURANCE.fetch();


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
		
		var new_insurance = Alloy.createModel("person_insurance");
		new_insurance.set({
			nombre:$.txt_aseguradora.value,
			no_seguro:$.txt_NoSeguro.value,
			vigencia:$.txt_vigencia.value,
			telefono:$.txt_telefono.value
		});
		new_insurance.save();
		Alloy.Collections.person_insurance.fetch();
		
		msj = Ti.UI.createAlertDialog({
			title:'Registro exitoso',
			message:'Los datos han sido guardado exitosamente',
			ok:'Aceptar'
		});
		
		msj.addEventListener('click', function(){
			$.seguro_persona.close();
		});
		
		msj.show();
		
	}	
};

function cleanUp(){
	$.destroy();
}