async function loadSceneOne() {
    const data = await d3.csv("https://flunky.github.io/cars2017.csv");
    const svg = d3.select("#scene_one").append("g").attr("transform", "translate(150,100)");

    const x_scale = d3.scaleLog().domain([10, 150]).range([0, 500]);
    const y_scale = d3.scaleLog().domain([10, 150]).range([500, 0]);
    const color_band = d3.scaleOrdinal().domain(["Gasoline", "Diesel", "Electricity"]).range(["red", "green", "yellow"])

    const x_axis = d3.axisBottom(x_scale)
        .tickValues([10, 20, 50, 100])
        .tickFormat(d3.format("~s"));

    const y_axis = d3.axisLeft(y_scale)
        .tickValues([10, 20, 50, 100])
        .tickFormat(d3.format("~s"));

    const x_axis_element = svg.append("g")
        .attr("transform", "translate(0,500)")
        .call(x_axis);
    x_axis_element.selectAll("path")
        .attr("stroke", "currentColor")
    x_axis_element.selectAll("line")
        .attr("stroke", "currentColor")
        .attr("y2", "6");
    x_axis_element.selectAll("text")
        .attr("fill", "currentColor")
        .attr("y", "9")
        .attr("dy", "0.71em");

    x_axis_element.append("text")
        .attr("y", 40)
        .attr("x", 250)
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .attr("fill", "black")
        .text("Average City MPG");

   
    const y_axis_element = svg.append("g")
        .call(y_axis);
    y_axis_element.selectAll("path")
        .attr("stroke", "currentColor")
    y_axis_element.selectAll("line")
        .attr("stroke", "currentColor")
        .attr("x2", "-6");
    y_axis_element.selectAll("text")
        .attr("fill", "currentColor")
        .attr("x", "-9")
        .attr("dy", "0.32em");

    y_axis_element.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -250)
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .attr("fill", "black")
        .text("Average Highway MPG");
    
    y_axis_element.append("text")
        .attr("y", -50)
        .attr("x", 0)
        .style("text-anchor", "Start")
        .style("font-size", "30px")
        .attr("fill", "black")
        .text("City vs Highway MPG in Cars with 4 Cylinders or less");
        
    four_cyl_data = data.filter(d => d.EngineCylinders < 5);
    svg.selectAll("circle")
        .data(four_cyl_data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {return x_scale(d.AverageCityMPG)})
        .attr("cy", function(d) {return y_scale(d.AverageHighwayMPG)})
        .attr("r", 5)
        .attr("fill", function(d) {return color_band(d.Fuel)});

    const legend_keys = ["Gasoline", "Diesel", "Electricity"]

    var lineLegend = svg.append("g").attr("transform", "translate(550,-25)");

    lineLegend.selectAll("text")
        .data(legend_keys)   
        .enter() 
        .append("text").text(function (d) {return d;})
        .attr("x", 15)
        .attr("y", function(d, i) {return 10 + (20 * i)})

    lineLegend.selectAll("rect")
        .data(legend_keys)
        .enter()   
        .append("rect")
        .attr("fill", function (d, i) {return color_band(d); })
        .attr("width", 10).attr("height", 10)
        .attr("y", function(d, i) {return (20 * i)})

}

async function loadSceneTwo() {
    const data = await d3.csv("https://flunky.github.io/cars2017.csv");
    const svg = d3.select("#scene_two").append("g").attr("transform", "translate(150,100)");

    const x_scale = d3.scaleLog().domain([10, 150]).range([0, 500]);
    const y_scale = d3.scaleLog().domain([10, 150]).range([500, 0]);
    const color_band = d3.scaleOrdinal().domain(["Gasoline", "Diesel", "Electricity"]).range(["red", "green", "yellow"])

    const x_axis = d3.axisBottom(x_scale)
        .tickValues([10, 20, 50, 100])
        .tickFormat(d3.format("~s"));

    const y_axis = d3.axisLeft(y_scale)
        .tickValues([10, 20, 50, 100])
        .tickFormat(d3.format("~s"));

    const x_axis_element = svg.append("g")
        .attr("transform", "translate(0,500)")
        .call(x_axis);
    x_axis_element.selectAll("path")
        .attr("stroke", "currentColor")
    x_axis_element.selectAll("line")
        .attr("stroke", "currentColor")
        .attr("y2", "6");
    x_axis_element.selectAll("text")
        .attr("fill", "currentColor")
        .attr("y", "9")
        .attr("dy", "0.71em");

    x_axis_element.append("text")
        .attr("y", 40)
        .attr("x", 250)
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .attr("fill", "black")
        .text("Average City MPG");

   
    const y_axis_element = svg.append("g")
        .call(y_axis);
    y_axis_element.selectAll("path")
        .attr("stroke", "currentColor")
    y_axis_element.selectAll("line")
        .attr("stroke", "currentColor")
        .attr("x2", "-6");
    y_axis_element.selectAll("text")
        .attr("fill", "currentColor")
        .attr("x", "-9")
        .attr("dy", "0.32em");

    y_axis_element.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -250)
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .attr("fill", "black")
        .text("Average Highway MPG");
    
    y_axis_element.append("text")
        .attr("y", -50)
        .attr("x", 0)
        .style("text-anchor", "Start")
        .style("font-size", "30px")
        .attr("fill", "black")
        .text("City vs Highway MPG in Cars with 5 to 8 Cylinders");
        
    four_cyl_data = data.filter(d => d.EngineCylinders > 4 && d.EngineCylinders < 9);
    svg.selectAll("circle")
        .data(four_cyl_data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {return x_scale(d.AverageCityMPG)})
        .attr("cy", function(d) {return y_scale(d.AverageHighwayMPG)})
        .attr("r", 5)
        .attr("fill", function(d) {return color_band(d.Fuel)});

    const legend_keys = ["Gasoline", "Diesel", "Electricity"]

    var lineLegend = svg.append("g").attr("transform", "translate(550,-25)");

    lineLegend.selectAll("text")
        .data(legend_keys)   
        .enter() 
        .append("text").text(function (d) {return d;})
        .attr("x", 15)
        .attr("y", function(d, i) {return 10 + (20 * i)})

    lineLegend.selectAll("rect")
        .data(legend_keys)
        .enter()   
        .append("rect")
        .attr("fill", function (d, i) {return color_band(d); })
        .attr("width", 10).attr("height", 10)
        .attr("y", function(d, i) {return (20 * i)})

}

async function loadSceneThree() {
    const data = await d3.csv("https://flunky.github.io/cars2017.csv");
    const svg = d3.select("#scene_three").append("g").attr("transform", "translate(150,100)");

    const x_scale = d3.scaleLog().domain([10, 150]).range([0, 500]);
    const y_scale = d3.scaleLog().domain([10, 150]).range([500, 0]);
    const color_band = d3.scaleOrdinal().domain(["Gasoline", "Diesel", "Electricity"]).range(["red", "green", "yellow"])

    const x_axis = d3.axisBottom(x_scale)
        .tickValues([10, 20, 50, 100])
        .tickFormat(d3.format("~s"));

    const y_axis = d3.axisLeft(y_scale)
        .tickValues([10, 20, 50, 100])
        .tickFormat(d3.format("~s"));

    const x_axis_element = svg.append("g")
        .attr("transform", "translate(0,500)")
        .call(x_axis);
    x_axis_element.selectAll("path")
        .attr("stroke", "currentColor")
    x_axis_element.selectAll("line")
        .attr("stroke", "currentColor")
        .attr("y2", "6");
    x_axis_element.selectAll("text")
        .attr("fill", "currentColor")
        .attr("y", "9")
        .attr("dy", "0.71em");

    x_axis_element.append("text")
        .attr("y", 40)
        .attr("x", 250)
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .attr("fill", "black")
        .text("Average City MPG");

   
    const y_axis_element = svg.append("g")
        .call(y_axis);
    y_axis_element.selectAll("path")
        .attr("stroke", "currentColor")
    y_axis_element.selectAll("line")
        .attr("stroke", "currentColor")
        .attr("x2", "-6");
    y_axis_element.selectAll("text")
        .attr("fill", "currentColor")
        .attr("x", "-9")
        .attr("dy", "0.32em");

    y_axis_element.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -250)
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .attr("fill", "black")
        .text("Average Highway MPG");
    
    y_axis_element.append("text")
        .attr("y", -50)
        .attr("x", 0)
        .style("text-anchor", "Start")
        .style("font-size", "30px")
        .attr("fill", "black")
        .text("City vs Highway MPG in Cars with 9 Cylinders or more");
        
    four_cyl_data = data.filter(d => d.EngineCylinders > 8);
    svg.selectAll("circle")
        .data(four_cyl_data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {return x_scale(d.AverageCityMPG)})
        .attr("cy", function(d) {return y_scale(d.AverageHighwayMPG)})
        .attr("r", 5)
        .attr("fill", function(d) {return color_band(d.Fuel)});

    const legend_keys = ["Gasoline", "Diesel", "Electricity"]

    var lineLegend = svg.append("g").attr("transform", "translate(550,-25)");

    lineLegend.selectAll("text")
        .data(legend_keys)   
        .enter() 
        .append("text").text(function (d) {return d;})
        .attr("x", 15)
        .attr("y", function(d, i) {return 10 + (20 * i)})

    lineLegend.selectAll("rect")
        .data(legend_keys)
        .enter()   
        .append("rect")
        .attr("fill", function (d, i) {return color_band(d); })
        .attr("width", 10).attr("height", 10)
        .attr("y", function(d, i) {return (20 * i)})

}


async function loadSceneFour() {
    const data = await d3.csv("https://flunky.github.io/cars2017.csv");
    const svg = d3.select("#scene_four").append("g").attr("transform", "translate(150,100)");

    const x_scale = d3.scaleLog().domain([10, 150]).range([0, 500]);
    const y_scale = d3.scaleLog().domain([10, 150]).range([500, 0]);
    const color_band = d3.scaleOrdinal().domain(["Gasoline", "Diesel", "Electricity"]).range(["red", "green", "yellow"])

    const tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("width", "200px")
        .style("overflow-wrap", "break-word")

    const x_axis = d3.axisBottom(x_scale)
        .tickValues([10, 20, 50, 100])
        .tickFormat(d3.format("~s"));

    const y_axis = d3.axisLeft(y_scale)
        .tickValues([10, 20, 50, 100])
        .tickFormat(d3.format("~s"));

    const x_axis_element = svg.append("g")
        .attr("transform", "translate(0,500)")
        .call(x_axis);
    x_axis_element.selectAll("path")
        .attr("stroke", "currentColor")
    x_axis_element.selectAll("line")
        .attr("stroke", "currentColor")
        .attr("y2", "6");
    x_axis_element.selectAll("text")
        .attr("fill", "currentColor")
        .attr("y", "9")
        .attr("dy", "0.71em");

    x_axis_element.append("text")
        .attr("y", 40)
        .attr("x", 250)
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .attr("fill", "black")
        .text("Average City MPG");

   
    const y_axis_element = svg.append("g")
        .call(y_axis);
    y_axis_element.selectAll("path")
        .attr("stroke", "currentColor")
    y_axis_element.selectAll("line")
        .attr("stroke", "currentColor")
        .attr("x2", "-6");
    y_axis_element.selectAll("text")
        .attr("fill", "currentColor")
        .attr("x", "-9")
        .attr("dy", "0.32em");

    y_axis_element.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -250)
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .attr("fill", "black")
        .text("Average Highway MPG");
    
    y_axis_element.append("text")
        .attr("y", -50)
        .attr("x", 0)
        .style("text-anchor", "Start")
        .style("font-size", "30px")
        .attr("fill", "black")
        .text("City vs Highway MPG in All Cars");
        
    four_cyl_data = data.filter(d => d.EngineCylinders >= 0);
    svg.selectAll("circle")
        .data(four_cyl_data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {return x_scale(d.AverageCityMPG)})
        .attr("cy", function(d) {return y_scale(d.AverageHighwayMPG)})
        .attr("r", 5)
        .attr("fill", function(d) {return color_band(d.Fuel)})
        .on("mouseover", function(d) {
            tooltip.text("Make: " + d.Make + " Fuel: " + d.Fuel + " Num of Cylinders: " + d.EngineCylinders + " Avg Highway MPG: " + d.AverageHighwayMPG + " Avg City MPG: " + d.AverageCityMPG);
            return tooltip.style("visibility", "visible");
          })
          .on("mousemove", function() {
            return tooltip.style("top",
              (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
          })
          .on("mouseout", function() {
            return tooltip.style("visibility", "hidden");
          });

    const legend_keys = ["Gasoline", "Diesel", "Electricity"]

    var lineLegend = svg.append("g").attr("transform", "translate(550,-25)");

    lineLegend.selectAll("text")
        .data(legend_keys)   
        .enter() 
        .append("text").text(function (d) {return d;})
        .attr("x", 15)
        .attr("y", function(d, i) {return 10 + (20 * i)})

    lineLegend.selectAll("rect")
        .data(legend_keys)
        .enter()   
        .append("rect")
        .attr("fill", function (d, i) {return color_band(d); })
        .attr("width", 10).attr("height", 10)
        .attr("y", function(d, i) {return (20 * i)})
    


}


async function changeScenes() {
    d3.select("#scenes").on("click", transition);
    
    function transition() {
        this.textContent  = "Next";
        if (this.value == "0") {
            document.getElementById("scene_one").style.display = "None"
            document.getElementById("scene_two").style.display = ""
            this.value = "1"
        }
        else if(this.value == "1") {
            this.value = "2"
            document.getElementById("scene_two").style.display = "None"
            document.getElementById("scene_three").style.display = ""
        }
        else if(this.value == "2") {
            document.getElementById("scene_three").style.display = "None"
            document.getElementById("scene_four").style.display = ""
            document.getElementById("scenes").style.display = "None"
        }

    }
}

async function addAnnotations() {
    
    const annotations_scene_one = [
        {
          note: {
            label: "In a category of their own with MPG well over 50mpg",
            title: "Electric Cars",
            wrap: 150,
            align: "left"
          },
          connector: {
            end: "arrow"
          },
          x: 650,
          y: 180,
          dy: 50,
          dx: 50
        },
        {
            note: {
              label: "Most cars have slightly better mpg on highway vs. city. 4 cylinder and less cars are clustered between 20-50 MPG",
              title: "Highway better than City",
              wrap: 200,
              align: "left"
            },
            connector: {
              end: "arrow"
            },
            x: 375,
            y: 400,
            dy: 50,
            dx: 50
        }
    ].map(function(d){ d.color = "Red"; return d})

    const make_scene_one_annotations = d3.annotation()
        .type(d3.annotationLabel)
        .annotations(annotations_scene_one)

    d3.select("#scene_one")
        .append("g")
        .attr("class", "annotation-group")
        .call(make_scene_one_annotations)

    const annotations_scene_two = [
        {
            note: {
                label: "Cars with 4-8 cylinders have an mpg ranging 10-30 which is noticeably worse than under 4 cyclinder vehicles",
                title: "Slightly Worse",
                wrap: 200,
                align: "left"
            },
            connector: {
                end: "arrow"
            },
            x: 290,
            y: 450,
            dy: 50,
            dx: 50
        }
    ].map(function(d){ d.color = "Red"; return d})

    const make_scene_two_annotations = d3.annotation()
        .type(d3.annotationLabel)
        .annotations(annotations_scene_two)

    d3.select("#scene_two")
        .append("g")
        .attr("class", "annotation-group")
        .call(make_scene_two_annotations)

    const annotations_scene_three = [
        {
            note: {
                label: "Cars with more than 8 cylinders have the worst mpg especially city with most falling under 20mpg. Showing a general trend of more cylinders having worse fuel economy.",
                title: "Even Worse",
                wrap: 200,
                align: "left"
            },
            connector: {
                end: "arrow",
                lineType : "horizontal"
            },
            x: 300,
            y: 400,
            dy: 50,
            dx: 25
        }
    ].map(function(d){ d.color = "Red"; return d})

    const make_scene_three_annotations = d3.annotation()
        .type(d3.annotationLabel)
        .annotations(annotations_scene_three)

    d3.select("#scene_three")
        .append("g")
        .attr("class", "annotation-group")
        .call(make_scene_three_annotations)

    d3.select("#scene_three")
    .select()
    .attr("transform", "rotate(-90)")

}

async function LoadViz() {
    loadSceneOne(); 
    loadSceneTwo(); 
    loadSceneThree(); 
    loadSceneFour(); 
    changeScenes();
    addAnnotations();
    document.getElementById("scene_two").style.display = "None"
    document.getElementById("scene_three").style.display = "None"
    document.getElementById("scene_four").style.display = "None"
}