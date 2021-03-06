var GraphManager = {
  //Freebase Extractor Variables:
  graph: null,
  HOST: null,
  relationships:[],
  sigInst : null,
  isRunning:null,
  init: function () {
	GraphManager.isRunning=false;
    GraphManager.relationships=[];
    console.log('initing..');
    GraphManager.graph = new neo4j.GraphDatabase("http://localhost:7474/");
    GraphManager.HOST = "http://localhost:7474/";
  },
  initSigma: function ()
	{
	$('#sig').empty();
		var sigRoot = document.getElementById('sig');
		GraphManager.sigInst = sigma.init(sigRoot);
		GraphManager.sigInst.drawingProperties({
		    defaultLabelColor: '#fff',
			defaultLabelSize: 14,
			defaultLabelBGColor: '#fff',
			defaultLabelHoverColor: '#000',
			labelThreshold: 0,
		  }).graphProperties({
			minNodeSize: 1,
			maxNodeSize: 5
		  }).mouseProperties({
			maxRatio: 10,
		  });
/*		for(var i=0;i<GraphManager.playerPath.length;i++)
		{
			
			GraphManager.sigInst.addNode(GraphManager.playerPath[i],{
			  label: GraphManager.playerPath[i],
			  color: '#444400',
			  y:(i+1)/GraphManager.playerPath.length
			});
			if(i>0)	
			{
				console.log(GraphManager);
				GraphManager.sigInst.addEdge(GraphManager.playerEdgePath[i-1],GraphManager.playerPath[i-1],GraphManager.playerPath[i]);					
			}
		}
		GraphManager.sigInst.draw();*/
 	},
	manageShowEdges: function() {
		if(GraphManager.isRunning)
		{
			GraphManager.sigInst.stopForceAtlas2();
	    	GraphManager.isRunning=false;
		}
		else
		{	
			GraphManager.sigInst.startForceAtlas2();
			GraphManager.isRunning=true;
		}
	}

};

