angular.module('sioWebApp.common').factory('imageService', function(configuration,loadingService, notificationService,logger) {

	var LOG = logger.getInstance('imageService');

	var imageService = {};

	imageService.saveCanvas = function(canvas, successHandler, faultHandler) {
		if(!window.canvas2ImagePlugin) {
			faultHandler()
			return;
		}

		window.canvas2ImagePlugin.saveImageDataToLibrary(successHandler,faultHandler,canvas);
	};

	imageService.setWallpaper = function(imagePath,successHandler, faultHandler) {
		var imageTitle = "christmas";                     // Set title of your choice.
		var folderName = "PluginImages";                  // Set folder Name of your choice.
		imagePath = "www/img/christmas.jpeg";             // Mention the complete path to your image. If it contains under multiple folder then mention the path from level "www" to the level your image contains with its name including its extension.
		wallpaper.setImage(imagePath, imageTitle, folderName, successHandler, faultHandler);
		// For saving image
		//  wallpaper.saveImage(imagePath, imageTitle, folderName, success, error);
	};

	imageService.saveCanvasToFile = function(canvasId,successHandler){
		loadingService.show();
		imageService.imgToCanvas(canvasId,function(canvas){
			if(!configuration.isProd){  loadingService.hide(); window.open(canvas.toDataURL()) }
			else{
				imageService.saveCanvas(canvas,
						function(path){
							loadingService.hide();
							successHandler(canvas,path);
						},function(err){
							loadingService.hide();
							LOG.error("saveCanvasToFile err:{0}",[err])
							notificationService.showError("Ooops. Something went wrong.")
						});
			}
		});
	};

	imageService.imgToCanvas = function (canvasId,successHandler) {
        LOG.info("imgToCanvas canvasId:{0}",[canvasId])
		html2canvas( [ document.getElementById(canvasId) ], {
			onrendered: function (canvas) {
                LOG.info("imgToCanvas onrendered")
				successHandler(canvas)
			}
		});
	};

	return imageService;
});