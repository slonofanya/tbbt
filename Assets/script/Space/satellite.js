#pragma strict

var target : Transform;
var speed : float = 1;
var direction : int = 1;

private var satelite : Transform;

function Start () {
	satelite = gameObject.transform;
}

function Update () {
	var dir = Vector3.forward;
	dir.z *= direction;

    satelite.RotateAround(target.position, dir, speed);
}