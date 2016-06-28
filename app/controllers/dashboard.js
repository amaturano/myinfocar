// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var _USER = Alloy.createCollection('users');
_USER.fetch();
var mainUser = _USER.at(0);


//Verifica las aseguradoras almacenadas anteriormente
var INSURANCE = Alloy.createCollection('person_insurance');
INSURANCE.fetch();
console.log('numero de aseguranzas: '+ INSURANCE.length);

if(parseInt(INSURANCE.length)>0){
	console.log("Elimina la vista");
	$.scrll_main.remove($.noRegister);
};

var AUTOS = Alloy.createCollection('autos');
AUTOS.fetch();
if(parseInt(AUTOS.length)>0){
	$.vista_autos.remove($.img_sad);
	$.vista_autos.remove($.lbl_sin_autos);
};


var functions ={
	checkEmpy:function(_array){
		var cont = 0;
		
		for(var i=0; i < _array.length;i++){
			if(_array[i].value=='')
				cont++;
		}
		
		if(cont>0)
			return false;
		else
		 return true;
	},
	setValues:function(){
		$.txt_name.value = mainUser.get("nombre");
		$.txt_AP.value = mainUser.get("apellido_p");
		$.txt_AM.value = mainUser.get("apellido_m");
		$.txt_nick.value = mainUser.get("nickname");
		$.txt_pass.value = mainUser.get("password");
		$.txt_licencia.value = mainUser.get("licencia");
		$.txt_tipoLic.value = mainUser.get("tipo_licencia");	
		$.txt_email.value = mainUser.get("email");
		$.txt_phone.value = mainUser.get("telefono");
	},
	enableFields:function(_fields){
		for(var i = 0; i < _fields.length; i++){
			_fields[i].editable = true;
			_fields[i].color = "black";
		}
			
	},
	notEnableFields:function(_fields){
		for(var i = 0; i < _fields.length; i++){
			_fields[i].editable = false;
			_fields[i].color="gray";
		}
			
	},
	cleanFields:function(_array){
		for(var i=0; i < _array.length;i++)
			_array[i].value='';
	}
};



$.lbl_name.text = mainUser.get("nombre")+" "+mainUser.get("apellido_p")+" "+mainUser.get("apellido_m");

var ArrayTextFields = [];

ArrayTextFields.push($.txt_name);
ArrayTextFields.push($.txt_AP);
ArrayTextFields.push($.txt_AM);
ArrayTextFields.push($.txt_email);
ArrayTextFields.push($.txt_nick);
ArrayTextFields.push($.txt_pass);
ArrayTextFields.push($.txt_licencia);
ArrayTextFields.push($.txt_tipoLic);
ArrayTextFields.push($.txt_phone);

functions.notEnableFields(ArrayTextFields);

function editUser(e){
	if(e.source.bandera=="0"){
		functions.enableFields(ArrayTextFields);
		e.source.title="Guardar";
		e.source.setImage("/images/save.png");
		e.source.bandera="1";
		
		$.btn_photoProfile.enabled=true;
		$.btn_seguroAuto.enabled=true;
		$.btn_licencia.enabled = true;
	}
	else{
		
		//Guarda la información en el modelo 
		mainUser.set({
			nombre:$.txt_name.value,
			apellido_p:$.txt_AP.value,
			apellido_m:$.txt_AM.value,
			email: $.txt_email.value,
			nickname: $.txt_nick.value,
			password: $.txt_pass.value,
			licencia: $.txt_licencia.value,
			tipo_licencia: $.txt_tipoLic.value,
			telefono:$.txt_phone.value
		});
		mainUser.save();
		
		e.source.title="Editar";
		e.source.setImage("/images/edit.png");
		functions.notEnableFields(ArrayTextFields);
		e.source.bandera="0";
		
		
		$.btn_photoProfile.enabled =false;
		$.btn_seguroAuto.enabled =false;
		$.btn_licencia.enabled = false;
	}
		
	
};

function nuevo_seguro(){
	Alloy.createController('seguro_persona',{parent:$.perfil_win, children:$.noRegister}).getView().open();
};

functions.setValues();

var ARRAY_NUEVO_AUTO = [];

	ARRAY_NUEVO_AUTO.push($.txt_na_marca);
	ARRAY_NUEVO_AUTO.push($.txt_na_modelo);
	ARRAY_NUEVO_AUTO.push($.txt_na_year);
	ARRAY_NUEVO_AUTO.push($.txt_na_placas);
	ARRAY_NUEVO_AUTO.push($.txt_na_tipo);
	ARRAY_NUEVO_AUTO.push($.txt_na_repuve);
	ARRAY_NUEVO_AUTO.push($.txt_na_vin);
	
	


function save_auto(){
	
	console.log("photo auto: "+$.photo_car.url_path);
	console.log("photo repuve: "+$.view_repuve.url_path);
	
	if(functions.checkEmpy(ARRAY_NUEVO_AUTO)){
		console.log('no empty fields');
		
		if(AUTOS.length==0){
			$.vista_autos.remove($.img_sad);
			$.vista_autos.remove($.lbl_sin_autos);
		};		
		
		var model_Auto = Alloy.createModel('autos');
		model_Auto.set({
			marca:$.txt_na_marca.value,
			modelo:$.txt_na_modelo.value,
			year:$.txt_na_year.value,
			placas:$.txt_na_placas.value,
			tipo:$.txt_na_tipo.value,
			repuve:$.txt_na_repuve.value,
			vin:$.txt_na_vin.value
		});
		model_Auto.save();
		Alloy.Collections.autos.fetch();
		var msj = Ti.UI.createAlertDialog({
			title:'Registro exitoso',
			message:'Su auto se ha almacenado satisfactoriamente',
			ok:"Aceptar"
		});
		
		msj.addEventListener('click', function(){
			functions.cleanFields(ARRAY_NUEVO_AUTO);
		});
		
		msj.show();	
	}
	else{
		Ti.UI.createAlertDialog({
			title:'Error al registrar',
			message:'Favor de llenar todos los campos',
			ok:'Aceptar'
		}).show();
	}
};


function openCam(){
	Alloy.Globals.activeCamera($.img_profile, false);
};

function take_licencia(){
	Alloy.Globals.activeCamera($.view_licencia, true);
};

function take_car(){
	Alloy.Globals.activeCamera($.photo_car, false);
};

function take_repuve(){
	Alloy.Globals.activeCamera($.view_repuve, true);
};
	
	


