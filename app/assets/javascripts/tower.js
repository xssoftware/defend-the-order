function turretClick(turret)
{
	function tclick(evt)
	{
		if(!isRunning || isPaused)
		{
			return;
		}
 
		// do we have enough money to make a tower?
		if(currentCash < turretValue(turret.id))
		{
			return;
		}
 
		evt = evt || window.evt;
 
		// find out the window coordinates
		var x = 0; var y = 0;
 
		if(evt.pageX)
		{
			x = evt.pageX;
			y = evt.pageY;
		}
		else if(evt.clientX)
		{
			var offsetX = 0; var offsetY = 0;
			if(document.documentElement.scrollLeft)
			{
				offsetX = document.documentElement.scrollLeft;
				offsetY = document.documentElement.scrollTop;
			}
			else if(document.body)
			{
				offsetX = document.body.scrollLeft;
				offsetY = document.body.scrollTop;
			}
			x = evt.clientX + offsetX;
			y = evt.clientY + offsetY;
		}		
 
		// create a new shaped turret at the mouse coords	
		var turretD = document.createElement("div");
		turretD.setAttribute("id",turret.id + ":" + turretDragCounter++);
		turretD.setAttribute("class","turretdrag");	
		turretD.style.left = x + "px";
		turretD.style.top = y + "px";
		turretD.style.backgroundColor = turretColor(turret.id);
		turretD.setAttribute("draggable","true");
		listenEvent(turretD,"dragstart",turretDrag(turretD));
		document.body.appendChild(turretD);
		// reduce our available cash by what we just spent
		currentCash -= turretValue(turret.id);
	}
	return tclick;
}


/*function turretDrag(turret)
{
	function drag(evt)
	{
		evt = evt || window.event;
		evt.dataTransfer.effectAllowed = 'copy';
		evt.dataTransfer.setData("Text",turret.id);	
	}
	return drag;
}
*/

function turretRange(turretID)
{
	switch(turretID)
	{
		case "turret0":
			return 3*TILE_W;
		case "turret1":
			return 5*TILE_W;
		case "turret2":
			return 10*TILE_W;
		case "turret3":	
			return 15*TILE_W;
		case "turret4":
			return 20*TILE_W;
	}
}
 
function turretDamage(turretID)
{
	switch(turretID)
	{
		case "turret0":
			return 1;
		case "turret1":
			return 3;
		case "turret2":
			return 5;
		case "turret3":	
			return 10;
		case "turret4":
			return 20;
	}
}


function anyTurretsInRange(minion,x,y)
{	
	var score = document.getElementById("score");
	var damage = 0;
	for(var i = 0; i < numTurrets; i++)
	{
		// get the x and y positions of the turret
		var xt = turretPos[i][2];
		var yt = turretPos[i][3];
 
		if(euclidDistance(x,xt,y,yt) <= turretPos[i][0])
		{		
			minion.style.backgroundColor = "#FF0000";
			damage += turretPos[i][1]; // return the damage
		}
	}
	if(damage == 0)
	{
		// nothing in range
		minion.style.backgroundColor = "#000000";
	}
	return damage;
}


 