
var _USERS, _totalUser ;

_USERS = Alloy.createCollection('users');
_USERS.fetch();

function verify_user(){
	
	console.log('cantidad de usuarios:'+ _USERS.length);
	_totalUser = _USERS.length;
	
	if(_totalUser<1)
		Alloy.createController('new_user').getView().open();
	else
		$.index.open();
	
};

var _tmp = _USERS.at(0);

//console.log("Usuario: "+_tmp.get("email"));

function login(){
	//Alloy.createController('new_user').getView().open();
	//verify_user();
	//console.log('nothing to do');
	if($.txt_username.getValue()==''&&$.txt_password.getValue()==""){
		Ti.UI.createAlertDialog({
			title:'Error',
			message:'Favor de llenar todos los campos requeridos',
			ok:'Aceptar'
		}).show();
	}
	else{
		if($.txt_username.getValue()==_tmp.get("nickname") && $.txt_password.getValue()==_tmp.get("password")){
			Alloy.createController('dashboard').getView().open();
			$.index.close();
		}		
		else
			Ti.UI.createAlertDialog({
				title:'Error en login',
				message:'Contraseña o usuario incorrecto, favor de verificar.',
				ok:'Aceptar'
			}).show();
	};
	
};

verify_user();



