// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function PixelsToDPUnits(ThePixels)
{
    if ( Titanium.Platform.displayCaps.dpi > 160 )
          return (ThePixels / (Titanium.Platform.displayCaps.dpi / 160));
    else 
        return ThePixels;
}


$.img_main.height = PixelsToDPUnits(Ti.Platform.displayCaps.platformHeight);
$.img_main.width = PixelsToDPUnits(Ti.Platform.displayCaps.platformHeight);


var _MODEL, msj;

var main_functions = {
	username:'',
	password1:'',
	password2:'',
	nombre:'',
	apellido_paterno:'',
	apellido_materno:'',
	init:function(e){
		this.username = e.username;
		this.password1 = e.pass1;
		this.password2 = e.pass2;
		this.nombre = e.name;
		this.apellido_paterno = e.apellidoP;
		this.apellido_materno = e.apellidoM;
	},
	checkPass: function(){
		var pass1 = this.password1;
		var pass2 = this.password2;
		
		if(pass1==pass2)
			return true;
		else
			return false;
	},
	save_register: function(){
		_MODEL = Alloy.createModel('users');
		_MODEL.set({
			nickname:this.username,
			password:this.password1,
			nombre:this.nombre,
			apellido_p: this.apellido_paterno,
			apellido_m: this.apellido_materno
		});
		_MODEL.save();
	},
	printValues:function(){
		console.log("username: "+this.username);
		console.log("pass1: "+this.password1);
		console.log("pass2: "+this.password2);
	},
	cleanTexfield:function(){
		$.txt_users.setValue("");
		$.txt_pass1.setValue("");
		$.txt_pass2.setValue("");
	},
	checkEmpty:function(){
		if(this.username==''||this.password1==''||this.password2==''||this.nombre==''||this.apellido_paterno==''||this.apellido_materno=='')
			return false;
		else
			return true;
	}
};

function register(){
	
	//inicializa los valores
	main_functions.init({
		username:$.txt_users.getValue(),
		pass1: $.txt_pass1.getValue(),
		pass2: $.txt_pass2.getValue(),
		name: $.txt_name.getValue(),
		apellidoP: $.txt_apellidoP.getValue(),
		apellidoM: $.txt_apellidoM.getValue()
	});
	
	//imprime los valores en consola 
	main_functions.printValues();
	
	//Verifica campos nulos
	if(main_functions.checkEmpty()){
		
		//Verifica que las contraseñas sean iguales
		if(main_functions.checkPass()){
			//Si las contraseñas coinciden
			
			//Guarda los datos en la BD
			main_functions.save_register();
			
			//limpia los Textfields
			main_functions.cleanTexfield();
			
			msj = Ti.UI.createAlertDialog({
				message:'Sus datos han sido almacenados correctamente',
				ok:'Aceptar',
				title:'Registor exitoso'
			});
			
			msj.addEventListener('click', function(){
				//Abre el controlador para la captura de los otros datos
				Alloy.createController('dashboard').getView().open();
			});
			
			msj.show();
			
		}
		else //Si las contraseñas no coinciden 
			Ti.UI.createAlertDialog({
				message:'Favor de verificar que las contraseñas sean iguales',
				ok:'Aceptar',
				title:'Contraseñas no coinciden'
			}).show();
		
	}
	else
		Ti.UI.createAlertDialog({
			message:'Favor de llenar todos los campos',
			ok:'Aceptar',
			title:'Error al registrar'
		}).show();
};

