#pragma strict
 
//var sun : GameObject;
//private var started_anim = false;

function Update () {
//	if (!started_anim && !sun.animation.isPlaying){
//		animation.Play();
//		started_anim = true;
//	}
	
	if (!animation.isPlaying){
		Application.LoadLevel('login');
	}
}