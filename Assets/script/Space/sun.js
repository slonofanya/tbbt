#pragma strict

var rotateSpeed : float = 1;

private var sun : Transform;

//var space : Component;

function Start () {
	sun = transform;
	
//	space = GameObject.Find('space').gameObject.GetComponent('space');
	
//	Debug.Log(space.ToString);
}

function Update () {
	//sun.Rotate(Vector3(1,1,1));
}

function OnTriggerEnter (other : Collider) {
    if(other.gameObject.name == 'cometa' && !true) {
    	Application.LoadLevel('score');
    }
}