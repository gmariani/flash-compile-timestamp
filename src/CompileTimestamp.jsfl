/*
  Name: CompileTimestamp 1.2.0
  Desc: Adds a trace with the filename and compile timestamp
  By:   James Efstathiou
  Date: 1/17/08
  Link: http://labs.coursevector.com
*/

myFrame = getFrame("CompileTimestamp");
trace(myFrame, "#### " + getFilename() + " - " + getTimestamp());
compile();
deleteFirstLayer();

function deleteFirstLayer() {
	var myTimeline_tl = fl.getDocumentDOM().timelines[0].deleteLayer(0);
}

//Creates a new layer with the name passed on the root timeline and locks that layer
function getFrame(layerName) {
	var myTimeline_tl = fl.getDocumentDOM().timelines[0];
	if (!myTimeline_tl.findLayerIndex(layerName)) {
		myTimeline_tl.setSelectedLayers(0, true);
		myTimeline_tl.setSelectedFrames(0,0);
		myTimeline_tl.addNewLayer(layerName);
		myTimeline_tl.layers[0].locked = true;
	}
	var idx = myTimeline_tl.findLayerIndex(layerName);
	return myFrame_frame = myTimeline_tl.layers[idx].frames[0];
}

//Compiles the current fla
function compile() { fl.getDocumentDOM().testMovie(); }

//Adds a trace to the following frame with str. CAUTION this will remove all code on that frame
function trace(frame, str) { frame.actionScript = "trace(\""+str+"\");"; }

//Returns the current fla filename
function getFilename() { return fl.getDocumentDOM().name; }

//Returns a string with the timestamp in the following format
function getTimestamp() {
	var t = new Date();
	var month = returnTwoDigit(t.getMonth()+1);
	var day = returnTwoDigit(t.getDate());
	var year = t.getFullYear();
	var hour = returnTwoDigit(t.getHours());
	var minute = returnTwoDigit(t.getMinutes());
	var second = returnTwoDigit(t.getSeconds());
	
	var ampm = (t.getHours() > 11) ? "pm" : "am";
	
	if (t.getHours() > 12) hour = returnTwoDigit(t.getHours()-12);
	
	var myDate = month + "/" + day + "/" + year;
	var myTime = hour + ":" + minute + ":" + second + ampm;
	return myDate + " " + myTime;
}

//Adds a 0 to any number that is only 1 digit
function returnTwoDigit(num) { return (num < 10) ? ("0" + num) : num; }