d3.csv(".LivingAreaPerCapitaOfChina.csv").then(function(data) {
    

    
    var width = document.querySelector("body").clientWidth;
    var height = 800;

    var tooltip = d3.select("#chart")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip");

    var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    };

  //  var mousemove = function(d) {
  //   tooltip
  //     .html("The average Living area is: " )
  //     .style("left", (d3.mouse(this)[0]+90) + "px") 
  //     .style("top", (d3.mouse(this)[1]) + "px")
  // }

    var mouseleave = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
    };
 
    var svg = d3.select("#chart")
      .append("svg")
      .attr("width",width)
      .attr("height",height);

    var x = d3.scaleLinear()
      .domain([0,5])
      .range([50,300]);

    svg.append("g")
        .attr("transform", "translate(0,700)")
        .call(d3.axisBottom(x));

    svg.append("text")
      .attr("x", width/4)
      .attr("y", height* (4/5))
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Urban")
      .style("font-size", "16px");

    svg.append("text")
      .attr("x", width * (3/4))
      .attr("y", height* (4/5))
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Rural")
      .style("font-size", "16px");

    svg.append("text")
      .attr("x", width/2)
      .attr("y", height* (1/12))
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Living Area Per Capita of China")
      .style("font-size", "30px");

    var image1 = svg.append('image')
      .attr('xlink:href', 'HumanFigureWithBed.jpg')
      .attr('width', 120)
      .attr('height', 124)
      .attr('x', width * (3/4) - 60)
      .attr('y', height/2 -67);

    var image1 = svg.append('image')
      .attr('xlink:href', 'HumanFigureWithBed.jpg')
      .attr('width', 120)
      .attr('height', 124)
      .attr('x', width/4 - 60)
      .attr('y', height/2 - 67);

    var dataset1 = d3.map(data, function(d){return(d.Area_Urban)}).keys();
    
    //dataset1.forEach(myFunction)
    var testArry1 = [];
    var testArry2 = [];

    var n1 = [];
    var n2 = [];

     dataset1.forEach(function(d){
      testArry1.push(Math.sqrt(d) * 50) ;
    })
    //   function myFunction(item, index, arr) {
    //   return arr[index] = Math.sqrt(item) * 20;
    // };

    for(var i = 0; i < testArry1.length; i++){
      n1[i] = Math.round(testArry1[i])
    }
    console.log(dataset1);
    console.log(n1);


    var dataset2 = d3.map(data, function(d){return(d.Area_Rural)}).keys();
    
    //dataset2.forEach(myFunction)
     dataset2.forEach(function(d){
      testArry2.push(Math.sqrt(d) * 50) ;
    })
     

    for(var i = 0; i < testArry2.length; i++){
      n2[i] = Math.round(testArry2[i])
    }

    console.log(dataset2);
    console.log(n2);

    var y1 = d3.map(data, function(d) { return (d.Year)}).keys();

    console.log(y1);

    var i = 0;
    var rect = svg
        .append("rect")
        .attr("x", width/4-n1[i]/2)
        .attr("y", height/2-n1[i]/2)
        .attr("width", n1[i])
        .attr("height", n1[i])
        .attr("stroke", "#75a3a3")
        .attr("stroke-width", 2)
        .attr("fill", "#b3cccc")
        .attr("opacity", .4)
        .on("mouseover", mouseover)
        .on("mousemove", function(d){
           tooltip
            .html("The average Living area is: " + dataset1[currentIndex] + " Sqare meters")
            .style("left", (d3.mouse(this)[0]+90) + "px") 
            .style("top", (d3.mouse(this)[1]) + "px")
        })
        .on("mouseleave", mouseleave);

    var text1 =svg
      .append("text")
      .attr("x", width/2)
      .attr("y", height/3)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Year: " + y1[i])
      .style("font-size", "25px");

    var rect2 = svg
        .append("rect")
        .attr("x", width*(3/4)-n2[i]/2)
        .attr("y", height/2-n2[i]/2)
        .attr("width", n2[i])
        .attr("height", n2[i])
        .attr("stroke", "#993333")
        .attr("stroke-width", 2)
        .attr("fill", "#e6b3b3")
        .attr("opacity", .4)
        .on("mouseover", mouseover)
        .on("mousemove",  function(d){
           tooltip
            .html("The average Living area is: " + dataset2[currentIndex] + " Sqare meters")
            .style("left", (d3.mouse(this)[0]+90) + "px") 
            .style("top", (d3.mouse(this)[1]) + "px")
        })
        .on("mouseleave", mouseleave);
      
    var myDomian = [];
        for (var i = 0; i < y1.length; i++)
          myDomian[i]=i * 200;

    var myRange = [];
        for (var i = 0; i < y1.length; i++)
          myRange[i]=i;

    console.log(myDomian);
    console.log(myRange);
       
    var scrollScale = d3.scaleThreshold()
      .domain(myDomian)
      .range(myRange);

    var currentIndex = 0;
    window.addEventListener("scroll", function() {
      //console.log("test");
      var y = document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(y);
      // console.log(scrollScale(y));
      var i = scrollScale(y);
      if(i != currentIndex) {
        currentIndex = i;
        rect
          .transition()
          .duration(100)
          .attr("x", width/4-n1[i]/2)
          .attr("y", height/2-n1[i]/2)
          .attr("width", n1[i])
          .attr("height", n1[i]);
        
        rect2
          .transition()
          .duration(100)
          .attr("x", width*(3/4)-n2[i]/2)
          .attr("y", height/2-n2[i]/2)
          .attr("width", n2[i])
          .attr("height", n2[i]);

        text1
          .transition()
          .duration(50)
          .text("Year: " + y1[i]);
        
      
      }});

});
