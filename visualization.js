
document.addEventListener("DOMContentLoaded", () => {
  d3.json("/countries.json")
    .then(countries => {
      d3.csv("/europe-nato-members.csv")
        .then(members => {
          
          // Define the dimensions of your visualization
          const width = 800
          const height = 600
          
          // Get the visualization container
          const container = d3.select("#viz")

          // Append and configure your svg node
          const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height)

          // Configure a map projection for Europe
          const projection = d3.geoAzimuthalEqualArea()
            .rotate([-10.0, -52.0])
            .translate([width / 2, height / 2])
            .scale(700)
            .precision(.1)

          // Configure a pathGenerator based on your projection
          const pathGenerator = d3.geoPath().projection(projection)

          // Bind the `countries.features` to `paths`
          const shapes = svg.selectAll("path")
            .data(countries.features)
            .enter()
            .append("path")
              .attr("d", pathGenerator)
              .attr("fill", function(country) {
                const natoMetaData = members.find(member => member.iso3 === country.properties.ADM0_A3)
                if (natoMetaData) {
                  return +natoMetaData.year_of_accession <= 2019
                    ? "#004990"
                    : "#DDDDDD"
                }
                else {
                  return "#DDDDDD"
                }
              })

          // Button data
          const buttonData = [
            { label: "1949", value: 1949 },
            { label: "Today", value: 2019 },
          ]

          // Finde mit `d3.select` den Controls container `#controls`
          
          // 1. Binde `buttonData` an zwei Knöpfe mit `d3.selectAll("button")`, `data()`, `enter()` und `append("button")`

          // 2. Schliesse deine Buttons an click events um die Farben je nach Jahr zu wechseln

          // 3. Wechsle die Farbe der Länder, die in 1949 keine Natomitgliedstaaten waren.

        })
    })
})
