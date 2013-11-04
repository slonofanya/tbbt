#pragma strict

var field_text : String = "Hello World";
var textStyle : GUIStyle;
var button_text : String = "Click";
//var buttonStyle : GUIStyle;

function Start () {
}

function OnGUI () {
	field_text = GUI.TextField (Rect (150, 300, 400, 50), field_text, 28, textStyle);

    if (GUI.Button(Rect(600,300,200,50), button_text)) btnLoginClick();
}

function btnLoginClick () {
	Application.LoadLevel('space');
}
