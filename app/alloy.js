
Alloy.Globals.closePopUp = '';
Alloy.Globals.idAuto = '';

var _date = new Date();

Alloy.Globals.activeCamera = function(image_view, view){
	var num = _date.getDate()+"_"+ _date.getMonth()+"_"+_date.getFullYear()+"_"+_date.getHours()+"_"+_date.getMinutes()+"_"+_date.getSeconds()+"_"+_date.getMilliseconds();
	
	Titanium.Media.showCamera({
		success:function(event) {
				var image = event.media.imageAsResized(1024, 1024);
				var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'camera_photo'+num+'.png');
		            f.write(image);
		        var the_image = f.nativePath;
		        
		        image_view.url_path = the_image;
		        console.log(the_image);
			
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				if(view){
					var imageView = Ti.UI.createImageView({
						width:250,
						height:'auto',
						image:the_image
					});
					
					image_view.removeAllChildren();
					image_view.add(imageView);
				}
				else{
					 image_view.image = the_image;
					 image_view.width=250;
					 image_view.height='auto';
				}
				/*var imageView = Ti.UI.createImageView({
					width:win.width,
					height:win.height,
					image:event.media
				});
				win.add(imageView);*/
				//container.image=event.media;
				//console.log("inside function: "+ event.media);
				
				
		            //console.log("url_image: "+the_image);
		           

				
			} else {
				alert("got the wrong type back ="+event.mediaType);
			}
		},
		cancel:function() {
			// called when user cancels taking a picture
		},
		error:function(error) {
			// called when there's an error
			var a = Titanium.UI.createAlertDialog({title:'Camera'});
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Please run this test on device');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}
			a.show();
		},
		saveToPhotoGallery:true,
	    // allowEditing and mediaTypes are iOS-only settings
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
	});
	

};
