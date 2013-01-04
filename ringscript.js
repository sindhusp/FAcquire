var width = 900,
    height = 650,
	xval = -190,
	yval= -300,
    radius = 920,
	pi=Math.PI;

var color = d3.scale.ordinal()
    .range(["#9494E9", "#4747B5"]);

var arc = d3.svg.arc()
    .outerRadius(radius +40)
    .innerRadius(radius - 100);

var pie = d3.layout.pie()
    .sort(null)
	.startAngle(pi/2+pi/9)
	.endAngle(5*pi/6 + pi/10)
    .value(function(d) { return d.interval; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + xval + "," + yval + ")");
	
var i=0,
	temp,
	datetime= [],
	interval=[];

d3.csv("data2.csv", function(error, data){
	data.forEach(function(d){
	d.date=d.date.split(" ");
	if(d.date[0]=="January")
	d.date[0]=1; 
	if(d.date[0]=="February")
	d.date[0]=2; 
	if(d.date[0]=="March")
	d.date[0]=3; 
	if(d.date[0]=="April")
	d.date[0]=4; 
	if(d.date[0]=="May")
	d.date[0]=5; 
	if(d.date[0]=="June")
	d.date[0]=6; 
	if(d.date[0]=="July")
	d.date[0]=7; 
	if(d.date[0]=="August")
	d.date[0]=8; 
	if(d.date[0]=="September")
	d.date[0]=9; 
	if(d.date[0]=="October")
	d.date[0]=10; 
	if(d.date[0]=="November")
	d.date[0]=11; 
	if(d.date[0]=="December")
	d.date[0]=12; 

	temp = d.date[0] + "/" + d.date[1] + "/" + d.year;
	datetime[i] = (new Date(temp).getTime())/100000;
	if(i==0)
		d.interval+=1.2*0011994714;
	if(i!=0) {
		interval[i]=(datetime[i]+datetime[i-1])/2;
		d.interval += interval[i];
	}
	i++;
	});
	
var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");
	g.on('mouseover', showCaption)  
	.on('mouseout', function() {
	    	caption.html(hoveroption);
	    });
  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.interval); });
 
 
  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate("+ angle(d, 90, -90)+")"; })
      .attr("dy", "0.3px")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.company; });
	  
	 function angle(d, offset, threshold) {
          var a = (d.startAngle + d.endAngle) * 90 / Math.PI + offset;
          return a > threshold ? a - 180 : a;
        }
	
	var caption = d3.select('#caption')
	  , hoveroption = caption.html();
	
	function showCaption(d,i)
	{
	var date = [d.data.date[0],d.data.date[1], d.data.year].join('/');
	var name ="Facebook acquired " + d.data.company + " on " + date;
	caption.html(name);
	}
	  
	});
