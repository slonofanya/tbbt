#pragma strict

var speed = 10.0;
var max_speed = 100.0;
var min_speed = 0;
var rotationSpeed = 100.0;

public var cur_trail: Transform;

private var _DEAD_ZONE = 0.1f;
private var move = Vector3.zero;
private var angle = Vector3.zero;
private var player : Transform;

function Start() {
	cur_trail = player = gameObject.transform;
}

function Update () {
    var translation = Input.GetAxis("Vertical");
	var rotation = Input.GetAxis("Horizontal");
	
	Move(translation);
	Rotate(translation, rotation);
}

//===================================== getters ==========================================//

private function Move(translation: float) {
 	//move = Vector3.zero;
 	
    if (translation > _DEAD_ZONE && move.x < max_speed)
        move += new Vector3(translation * speed, 0);

	if (translation < -_DEAD_ZONE && move.x >= min_speed){
    	move -= new Vector3(-translation * speed / 2, 0);
    	if(move.x < Vector3.right.x)
    		move = Vector3.zero;
    }
    
    player.Translate(move);
}

private function Rotate(translation: float, rotation: float) {
 	angle = Vector3.zero;
	
    if (rotation)
		angle += new Vector3(0, 0, rotation * rotationSpeed);
		
    player.Rotate(angle);
}
