var isOpera = (window.opera) ? true : false;
var isIE    = (document.all && !isOpera) ? true : false;
var isNS    = (!isIE && !isOpera) ? true : false;
var mausP;
var divB;
var AnzBilder=0;
var px  = "";
var py  = "";
var ab  = "";
var form;
var XDat = new Array();
var YDat = new Array();
var Faktor = 15;
var Tempo = 12;
var aktiv;

function init() {
  Bilderzaehlen(AnzBilder);
  mausP = document.getElementById("mvb0");
  MouseMotion();
  aktiv = setInterval("GetPosPics()",Tempo);
}

function Bilderzaehlen(a) {
  var istDa = "mvb"+ a ;
  while (document.getElementById(istDa)) {
    a++;
    istDa = "mvb"+ a ;
  }
  AnzBilder = a;
}

function MouseMotion() {
  if(isIE) document.onmousemove = MouseMotionHandlerIE;
  else if(isOpera) {
    if (navigator.userAgent.indexOf("Opera 5")!= -1) {
      document.onmousemove = MouseMotionHandlerOpera5;
    }
    else {
      document.onmousemove = MouseMotionHandlerOpera;
    }
  }
  else {navigator.userAgent
    document.captureEvents(Event.MOUSEMOVE);
    document.onmousemove = MouseMotionHandlerNS;
  }
}

function MouseMotionHandlerNS(event) {
  MausPos(event.pageX, event.pageY);
}

function MouseMotionHandlerIE() {
  MausPos(Number(window.event.x)+Number(document.body.scrollLeft), Number(window.event.y) + Number(document.body.scrollTop));
}

function MouseMotionHandlerOpera() {
  MausPos(Number(window.event.x)+Number(document.body.scrollLeft), Number(window.event.y) + Number(document.body.scrollTop));
}

function MouseMotionHandlerOpera5 () {
  MausPos(Number(window.event.x), Number(window.event.y));

}

function MausPos(mausXpos,mausYpos) {
  mausP.style.left = mausXpos+2;
  mausP.style.top = mausYpos+5;
}

function GetPosPics() {
  for (i=0; i<AnzBilder; i++) {
    divB = eval(document.getElementById("mvb"+i));
    if (!divB.style.left) divB.style.left = 0;
    XDat[i] = divB.style.left;
    if (!divB.style.top) divB.style.top = 0;
    YDat[i] = divB.style.top;
  }
  for (i=1; i<AnzBilder; i++) {
    divB = eval(document.getElementById("mvb"+i));
    var a = XDat[i];
    if (isNaN(a)) {
      a = a.replace(/pt/,"");
      a = a.replace(/px/,"");
    }
    var b = XDat[i-1];
    if (isNaN(b)) {
      b = b.replace(/pt/,"");
      b = b.replace(/px/,"");
    }
    a = a*1;
    b = b*1;
    a = a + ((b-a)*(Faktor/30));
    b = a % 1;
    b = a - b;
    divB.style.left = b;

    var c = YDat[i];
    if (isNaN(c)) {
      c = c.replace(/pt/,"");
      c = c.replace(/px/,"");
    }
    var d = YDat[i-1];
    if (isNaN(d)) {
      d = d.replace(/pt/,"");
      d = d.replace(/px/,"");
    }
    c = c*1;
    d = d*1;
    c = c + ((d-c)*(Faktor/30));
    d = c % 1;
    d = c - d;
    divB.style.top = d;
  }
}