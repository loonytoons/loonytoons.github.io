var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var projection = d3.geoMercator()
    .center([173, -41])                // GPS of location to zoom on
    .scale(980)                        // This is like the zoom
    .translate([ width/2, height/2 ])

var markers = [
    {long: 174.763336, lat: -36.848461}, // auckland
];

// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function(data){

    // Filter data
    data.features = data.features.filter(function(d){console.log(d.properties.name) ; return d.properties.name=="New Zealand"})
    console.log(data.features);

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
          .attr("fill", "#7F98B3")
          .attr("d", d3.geoPath()
              .projection(projection)
          )
        .style("stroke", "black")
        .style("opacity", .1)

    svg.selectAll("myCircles")
      .data(markers)
      .enter()
      .append("circle")
        .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
        .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
        .attr("r", 7)
        .style("fill", "#FFBAB5")
        .attr("stroke", "#FFBAB5")
        .attr("stroke-width", 3)
        .attr("fill-opacity", .4)
})
