async function loadSceneOne() {
    const data = await d3.csv("https://flunky.github.io/cars2017.csv");
    const svg = d3.select("svg").append("g").attr("transform", "translate(50,50)");

    const x_scale = d3.scaleLinear().domain([10, 150]).range([0, 200]);
    const y_scale = d3.scaleLinear().domain([10, 150]).range([200, 0]);
    const color_band = d3.scaleOrdinal().domain(["Gasoline", "Diesel", "Electricity"]).range("red", "green", "yellow")

    const xAxis = d3.axisBottom(x_scale)
        .tickValues([10, 20, 50, 100])
        .tickFormat(d3.format("~s"));

    const yAxis = d3.axisLeft(y_scale)
        .tickValues([10, 20, 50, 100])
        .tickFormat(d3.format("~s"));

    const xAxisG = svg.append("g")
        .attr("transform", "translate(0,200)")
        .call(xAxis);
    xAxisG.selectAll("path")
        .attr("stroke", "currentColor")
        // .attr("d", "M0.5,6V0.5H200.5V6");
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
        .attr("d", "M-6,200.5H0.5V0.5H-6");
    yAxisG.selectAll("line")
        .attr("stroke", "currentColor")
        .attr("x2", "-6");
    yAxisG.selectAll("text")
        .attr("fill", "currentColor")
        .attr("x", "-9")
        .attr("dy", "0.32em");

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {return x_scale(d["AverageCityMPG"])})
        .attr("cy", function(d) {return y_scale(d["AverageHighwayMPG"])})
        .attr("r", 2)
        .attr("fill", function(d) {return color_band(d.Fuel)});

}

