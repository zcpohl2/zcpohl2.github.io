async function loadSceneOne() {
    const data = await d3.csv("https://flunky.github.io/cars2017.csv");
    const svg = d3.select("svg").append("g").attr("transform", "translate(50,50)");

    const x_scale = d3.scaleLog().domain([10, 150]).range([0, 500]);
    const y_scale = d3.scaleLog().domain([10, 150]).range([500, 0]);
    const color_band = d3.scaleOrdinal().domain(["Gasoline", "Diesel", "Electricity"]).range(["red", "green", "yellow"])

    const xAxis = d3.axisBottom(x_scale)
        .tickValues([10, 20, 50, 100])
        .tickFormat(d3.format("~s"));

    const yAxis = d3.axisLeft(y_scale)
        .tickValues([10, 20, 50, 100])
        .tickFormat(d3.format("~s"));

    const xAxisG = svg.append("g")
        .attr("transform", "translate(0,500)")
        .call(xAxis);
    xAxisG.selectAll("path")
        .attr("stroke", "currentColor")
    xAxisG.selectAll("line")
        .attr("stroke", "currentColor")
        .attr("y2", "6");
    xAxisG.selectAll("text")
        .attr("fill", "currentColor")
        .attr("y", "9")
        .attr("dy", "0.71em");

   
    const yAxisG = svg.append("g")
        .call(yAxis);
    yAxisG.selectAll("path")
        .attr("stroke", "currentColor")
    yAxisG.selectAll("line")
        .attr("stroke", "currentColor")
        .attr("x2", "-6");
    yAxisG.selectAll("text")
        .attr("fill", "currentColor")
        .attr("x", "-9")
        .attr("dy", "0.32em");

        yAxisG.append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".6em")
        .style("text-anchor", "end")
        .attr("fill", "#5D6971")
        .text("Population)");
    

    four_cyl_data = data.filter(d => d.EngineCylinders < 5);
    svg.selectAll("circle")
        .data(four_cyl_data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {return x_scale(d.AverageCityMPG)})
        .attr("cy", function(d) {return y_scale(d.AverageHighwayMPG)})
        .attr("r", 3)
        .attr("fill", function(d) {return color_band(d.Fuel)});

}

