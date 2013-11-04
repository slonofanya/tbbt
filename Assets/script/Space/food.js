#pragma strict

//var direction = Vector3
private var x = 0;
private var y = 0;
var speed = 100.0;

function Start () {
	x = Random.Range(-1.0, 1.0) * speed;
	y = Random.Range(-1.0, 1.0) * speed;
}

function Update () {
	gameObject.transform.Translate(Vector3(x, y, 0));
}

function OnTriggerEnter (other : Collider) {
    if(other.gameObject.name == 'cometa') {	    
	    gameObject.AddComponent(trail);
	    
	    var current_trail = gameObject.GetComponent(trail);
	    var player_move = other.gameObject.GetComponent(player_move);
	    
    	current_trail.target = player_move.cur_trail;
    	
    	player_move.cur_trail = gameObject.transform;
    	
    	Destroy (this);
   	}
}