async function loadSceneOne() {
    const data = await d3.csv("https://flunky.github.io/cars2017.csv");
    const svg = d3.select("svg").append("g").attr("transform", "translate(150,100)");

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

    var lineLegend = svg.append("g").attr("transform", "translate(600,-25)");

    lineLegend.data(legend_keys)   
        .enter() 
        .append("text").text(function (d) {return d;})
        .attr("transform", "translate(15,9)");

    lineLegend.data(legend_keys)
        .enter()   
        .append("rect")
        .attr("fill", function (d, i) {return color_band(d); })
        .attr("width", 10).attr("height", 10);

}

