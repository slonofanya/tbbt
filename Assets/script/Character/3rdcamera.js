var cameraTransform : Transform;

//private var player_move = gameObject.GetComponent();

function Awake () {
	if(!cameraTransform && Camera.main)
		cameraTransform = Camera.main.transform;
	if(!cameraTransform) {
		Debug.Log("Please assign a camera to the ThirdPersonCamera script.");
		enabled = false;
	}
}

function Update () {
	cameraTransform.position.x = gameObject.transform.position.x;
	cameraTransform.position.y = gameObject.transform.position.y;
	
	//Debug.Log(player_move);
}
