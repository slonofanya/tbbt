#pragma strict

var target: Transform;
var targetDistance: float = 800;

private var cometa_touch = false;
public var length = false;

function Update() {
    // направление на цель
    var direction = (target.position - transform.position);

    // дистанция до цели
    var distance = direction.magnitude;

    // если расстояние до цели хвоста больше заданного
    if (distance >= targetDistance) {
        // двигаем хвост
        transform.position += direction.normalized * (distance - targetDistance) / 1;
        // смотрим на цель
        transform.LookAt(target);
    }
}

function OnTriggerEnter (other : Collider) {	
    if(other.gameObject.name == 'cometa' && !true) {
		if(cometa_touch) {
		    	Application.LoadLevel('score');
		} else {
			cometa_touch = true;
		}
    }
}